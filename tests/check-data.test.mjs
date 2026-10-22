import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = path => JSON.parse(fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const pharmacy = read('biblioteca-farmacos.json');
const matrix = read('matriz-concentraciones-publicadas.json');
const uk = read('marco-neonatal-bandas-nppg.json');
const audit = read('auditoria-fuentes.json');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const ids = ['adrenalina','noradrenalina','dopamina','dobutamina','milrinona'];

test('ningún conjunto documental autoriza uso clínico', () => {
  for (const data of [pharmacy,matrix,uk,audit]) assert.equal(data.clinical_use_allowed,false);
  assert.ok(pharmacy.drugs.every(d => d.validation === 'PENDIENTE' && Array.isArray(d.preparations) && d.preparations.length===0));
  assert.deepEqual(uk.local_validation.approved_preparations, []);
  assert.deepEqual(uk.local_validation.approved_concentrations, []);
  assert.ok(matrix.drugs.every(d => d.candidate_sets.every(s => !s.validated_locally && s.requires_preparation_review)));
});

test('cinco sustancias: identidad y unicidad coherentes', () => {
  for (const data of [pharmacy,matrix,uk]) assert.deepEqual(data.drugs.map(d=>d.id),ids);
  assert.deepEqual(audit.coverage.map(d=>d.drug_id),ids);
});

test('valores españoles: solo adrenalina verificada en tabla principal', () => {
  const verified = audit.coverage.filter(x => x.spanish_consensus_status==='VERIFICADO_TABLA_PRINCIPAL');
  assert.deepEqual(verified.map(x=>x.drug_id),['adrenalina']);
  assert.deepEqual(verified[0].population_rows.find(x=>x.population==='neonatologia').values,[20,40,60]);
  assert.deepEqual(verified[0].population_rows.find(x=>x.population==='pediatria').values,[20,40,60,100]);
  for (const row of audit.coverage.filter(x=>x.drug_id!=='adrenalina')) {
    assert.equal(row.spanish_consensus_status,'PENDIENTE_SUPLEMENTO');
    assert.deepEqual(row.population_rows,[]);
  }
  assert.equal(audit.spanish_consensus.inaccessible_attachment.access,'NO_RECUPERADO_EN_LA_REVISION');
});

test('el nombre de fichero del suplemento pendiente se conserva',()=>{
 assert.equal(audit.spanish_consensus.inaccessible_attachment.filename,'ejhpharm-2022-003316supp001.pdf');
});

test('las alertas AEMPS cubren confusión base/sal y dopamina pediátrica',()=>{
 const nor=audit.high_priority_alerts.find(a=>a.drug_id==='noradrenalina');
 assert.equal(nor.source_reference,'MUH 10/2022');
 assert.deepEqual(nor.examples_of_label_equivalence.map(x=>[x.base_mg_per_ml,x.bitartrate_mg_per_ml]),[[0.5,1],[1,2]]);
 const dop=audit.high_priority_alerts.find(a=>a.drug_id==='dopamina');
 assert.ok(dop.verified_statement.includes('no se recomienda'));
 for(const a of audit.high_priority_alerts) assert.ok(a.url.startsWith('https://'));
});

test('NPPG y NHS regional se mantienen independientes; milrinona <2 kg sin fila',()=>{
 assert.equal(uk.drugs.flatMap(d=>d.nppg).length,18);
 assert.equal(uk.drugs.flatMap(d=>d.eoe).length,18);
 const mil=uk.drugs.find(d=>d.id==='milrinona');
 assert.ok(!mil.nppg.some(r=>r.weight_band_id==='lt2'));
 const dop=uk.drugs.find(d=>d.id==='dopamina');
 assert.ok(dop.nppg.some(r=>r.concentration.value===2 && r.concentration.unit==='mg/mL'));
 assert.ok(dop.nppg.some(r=>r.concentration.value===5 && r.concentration.unit==='mg/mL'));
 assert.ok(dop.eoe.some(r=>r.concentration.value===1.5 && r.concentration.unit==='mg/mL'));
 assert.ok(dop.eoe.some(r=>r.concentration.value===4.5 && r.concentration.unit==='mg/mL'));
});

test('las opciones regionales tienen equivalencia aritmética correcta',()=>{
 for(const d of uk.drugs) for(const x of d.eoe){
  const numerator=x.published_amount.value*(x.published_amount.unit==='mg'?1000:1);
  const value=x.concentration.value*(x.concentration.unit==='mg/mL'?1000:1);
  assert.ok(Math.abs(numerator/x.published_total_volume_ml-value)<1e-9, d.id);
 }
});

test('JavaScript de la interfaz sintácticamente válido y visible v0.7',()=>{
 const script=html.match(/<script>([\s\S]*?)<\/script>/);
 assert.ok(script);
 assert.doesNotThrow(()=>new vm.Script(script[1]));
 assert.match(html,/v0\.7/);
 assert.match(html,/id="auditDetails"/);
 assert.match(html,/NO APTO PARA USO CLÍNICO/);
 assert.match(html,/function isAuditSafe/);
});

test('motor aritmético directo/inverso y rechazo de dimensiones incompatibles',()=>{
 const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
 const start=script.indexOf('const units=');
 const end=script.indexOf("$('mode').onchange=");
 assert.ok(start>0&&end>start);
 const computation=script.slice(start,end);
 const ctx=vm.createContext({Number,Error});
 const compute=vm.runInContext(computation+'\ncompute;',ctx);
 const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-9, `${a} vs ${b}`);
 eq(compute(12,.1,10,'ugkgmin','ugml',false),7.2);
 eq(compute(12,7.2,10,'ugkgmin','ugml',true),.1);
 eq(compute(5,1,1,'mgkgh','mgml',false),5);
 eq(compute(10,2,20,'uikgh','uiml',false),1);
 assert.throws(()=>compute(10,2,20,'uikgh','ugml',false));
 assert.throws(()=>compute(0,2,20,'uikgh','uiml',false));
 assert.throws(()=>compute(10,2,0,'ugkgh','ugml',false));
 assert.throws(()=>compute(10,Infinity,20,'ugkgh','ugml',false));
 for(const w of [0.5,1,2,5,20,100]) for(const dose of [0.01,0.1,1,7.5]) for(const c of [1,10,100]){
  const v=compute(w,dose,c,'ugkgmin','ugml',false);
  eq(compute(w,v,c,'ugkgmin','ugml',true),dose);
 }
});

test('ningún panel bibliográfico alimenta por sí mismo el campo de concentración',()=>{
 const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
 const bibliography=script.slice(script.indexOf('function renderEvidence()'),script.indexOf('const units='));
 assert.ok(!bibliography.includes("$('conc').value="));
 assert.ok(!bibliography.includes("$('conc').value ="));
 assert.match(html,/No equivalen a protocolos españoles aprobados/);
});

test('service worker incorpora auditoría y versión',()=>{
 assert.match(sw,/perfusiones-simulador-v07/);
 for(const item of ['biblioteca-farmacos.json','matriz-concentraciones-publicadas.json','marco-neonatal-bandas-nppg.json','auditoria-fuentes.json']) assert.ok(sw.includes(item),item);
});

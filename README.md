# Perfusiones Pediátricas — v0.8

[**Abrir simulador documental**](https://gonzaloares.github.io/perfusiones-pediatricas/)

> ⚠️ **NO APTO PARA USO CLÍNICO.** No utilizar para prescripción, preparación, programación de bomba ni administración de medicamentos a pacientes. Herramienta de investigación y simulación matemática con parámetros ficticios.

## Novedad v0.8 — Verificación farmacotécnica y rectificación documentada

**CORRECCIÓN DE LA VERSIÓN ANTERIOR:** la publicación principal de Taladriz-Sender y colaboradores (Eur J Hosp Pharm, 2024) muestra en la tabla 2 un extracto de la lista y remite el resto al fichero `ejhpharm-2022-003316supp001.pdf`, que no hemos logrado recuperar por la vía disponible. En v0.7 se adjudicaron erróneamente concentraciones de adrenalina a la tabla principal. **Se han retirado esas concentraciones atribuidas al consenso español de la matriz activa y ahora los cinco fármacos aparecen PENDIENTES del anexo.** Esto no significa que sus concentraciones sean incorrectas; significa que no se ha verificado la fuente exacta. No rellenarlas desde ASHP, NPPG o rangos observacionales.

- **Nuevo fichero `matriz-presentaciones-aemps.json`:** 5 presentaciones comerciales específicas, concentración del envase original, diluyentes enumerados en su ficha CIMA, condiciones fisicoquímicas y microbiológicas diferenciadas, observaciones sobre vía IV y advertencias de incompatibilidad.
- **Dos alertas bloqueantes:** Noradrenalina (base vs. tartrato, AEMPS MUH 10/2022) y Dopamina Grifols (población pediátrica no recomendada en la ficha de esa presentación).
- **Adrenalina Basi**: la ficha contempla anafilaxia y reanimación; su dilución intravenosa descrita **no** se transforma en protocolo de perfusión continua.
- **Vía periférica/central:** ninguna preparación ha sido clasificada como apta por la app; la ficha de Dobutamina Hikma establece que las concentraciones superiores descritas se infunden solo por catéter central, lo cual no define la concentración pediátrica aprobada por el hospital.
- **Estabilidad:** por ejemplo, 48 h de estabilidad fisicoquímica de Noradrenalina Basi a 25 °C **no equivalen** a poder conservar una preparación durante 48 h bajo cualquier condición microbiológica o ambiental. Ningún plazo de uso se calcula ni se prescribe en la app.
- **Diluentes:** confirmar siempre la presentación; Noradrenalina Basi 0,5 mg/mL describe glucosa 5% o glucosa 5% + NaCl 0,9%, **no NaCl 0,9% solo** para su dilución.
- **Compatibilidad en Y:** no se deduce de que dos diluyentes estén citados en la ficha técnica; queda SIN VALIDAR.

El panel **«Presentación española: diluyentes, estabilidad y vía»** se encuentra dentro de la ficha de cada medicamento. La calculadora ficticia sigue independiente de las concentraciones documentales.

### Pruebas automáticas

- [Suite de tests Node](tests/check-data.test.mjs): comprueba la retirada de atribuciones no verificadas, las cinco fichas españolas, el bloqueo de preparación, límites de fuentes y cálculo matemático directo/inverso.
- [Workflow GitHub Actions](.github/workflows/verificar.yml): ejecuta `node --test tests/check-data.test.mjs` con Node.js 22 en cada push y pull request.

La comprobación automática es una herramienta de desarrollo, **NO validación asistencial, farmacológica ni regulatoria**. Solo podrá avanzarse con aprobación y trazabilidad de Farmacia Hospitalaria y servicios clínicos.

## Base documental v0.6: neonatología y peso

Se ha añadido una consulta **documental** por bandas de peso de la publicación británica NPPG/RCPCH/BAPM/PCCS de noviembre de 2024 y una comparación **independiente** con la guía neonatal regional NHS East of England 2025.

- Los valores figuran con **origen, página, población y unidad**. No son concentraciones hospitalarias validadas.
- Las bandas originales son **etiquetas publicadas**, no un algoritmo de selección clínica. No se resuelven automáticamente los límites exactos 2, 5 y 20 kg.
- El marco NPPG consultado **no tiene una fila de milrinona para <2 kg**. No extrapolar la banda 2–5 kg.
- En dopamina se observan diferencias: **NPPG 2/5 mg/mL** y **EoE 1,5/4,5 mg/mL** entre opciones regionales comparables. No fusionar.
- Noradrenalina: mantener la advertencia sobre **base frente a tartrato** y revisar cada presentación comercial.
- La guía EoE 2025 advierte de posibles variaciones de administración a caudales **≤0,5 mL/h** y por diferencias de altura jeringa-paciente. Sugiere jeringas de **20 o 30 mL** para vasoactivos de vida media corta. Estas observaciones **no sustituyen** la validación del modelo de bomba ni autorizan un caudal mínimo universal.

## Datos y controles

| Archivo | Función | Uso clínico |
|---|---|---|
| `biblioteca-farmacos.json` | Fichas técnicas AEMPS para 5 sustancias | Bloqueado |
| `matriz-concentraciones-publicadas.json` | Consenso español, ASHP y observaciones de 9 UCIN | Bloqueado |
| `marco-neonatal-bandas-nppg.json` | **18 filas NPPG por peso** y **18 opciones EoE** para 5 fármacos | Bloqueado |
| `auditoria-fuentes.json` | Estado comprobación del consenso español y alertas AEMPS | Bloqueado |
| `matriz-presentaciones-aemps.json` | Diluyentes, vía y estabilidad por producto comercial español | Bloqueado |
| `index.html` | Selector documental y simulador matemático independiente | Solo demostración |
| `sw.js` | Caché de consulta offline (con carga previa correcta) | No implica uso clínico |

Los conjuntos documentales contienen `clinical_use_allowed: false` y **cero preparaciones aprobadas**. La interfaz no permite copiar ni pasar una concentración publicada automáticamente a la calculadora, y no permite recomendar concentraciones por peso.

**Aviso:** la validación de datos en un navegador y un JSON público no es un control de seguridad certificado; no debe tratarse como barrera suficiente para el uso clínico. Antes de un despliegue sanitario se requiere evaluación de riesgos y normativa aplicable, revisión profesional y verificación en equipamiento real.

## Fuentes primarias

- [NPPG/RCPCH/BAPM/PCCS: marco nacional, noviembre de 2024](https://nppg.org.uk/wp-content/uploads/2025/01/Standard-Infusions-Nov-2024-Final.pdf) (tablas de bandas de peso, págs. 2–3).
- [East of England Neonatal ODN: Neonatal Drug Infusion Guideline, junio de 2025](https://eoeneonatalpccsicnetwork.nhs.uk/wp-content/uploads/2025/08/EoE-Neonatal-Infusion-guideline-Final-Aug-2025.pdf) (opciones págs. 3–5; caudales pág. 6; comportamiento de jeringas pág. 10).
- [BAPM: Drug Safety Bulletin, enero de 2025](https://www.bapm.org/articles/bapm-drug-safety-bulletin-jan-25).
- [Consenso español sobre estandarización pediátrica, European Journal of Hospital Pharmacy 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11042264/).
- [ASHP Standardize 4 Safety: concentraciones pediátricas](https://www.ashp.org/-/media/assets/pharmacy-practice/s4s/docs/Pediatric-Infusion-Standards.ashx).
- [AEMPS/CIMA](https://cima.aemps.es/cima/publico/home.html), enlaces a fichas técnicas individuales dentro de `biblioteca-farmacos.json`.

## Pendientes priorizados

1. Recuperar y cotejar directamente el PDF suplementario original del consenso español para **los cinco fármacos**; sin ello ninguna concentración española se clasificará como verificada.
2. Resolver explícitamente el caso de **milrinona en RN <2 kg** sin suponer que una opción de la guía regional equivale a una recomendación nacional.
3. Evaluar diferencias NPPG/EoE y adaptar únicamente los estándares aprobados por Farmacia Hospitalaria y Neonatología.
4. Verificar concentraciones base/sal, formulaciones comercializadas, diluyentes, acceso vascular, compatibilidades y estabilidad para cada preparación.
5. Validación de límites de bomba, incrementos, precisión, aportes líquidos, pausas/cambios de jeringa y efectos a caudales muy bajos.
6. Pruebas independientes, análisis de riesgos, control de versiones, trazabilidad de aprobaciones y revisión de requisitos regulatorios.

[**Seguimiento de validación (incidencia bloqueante #1)**](https://github.com/gonzaloares/perfusiones-pediatricas/issues/1)

**Fecha de esta revisión documental:** 22 de octubre de 2026.

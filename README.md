# Perfusiones Pediátricas — v0.7

[**Abrir simulador documental**](https://gonzaloares.github.io/perfusiones-pediatricas/)

> ⚠️ **NO APTO PARA USO CLÍNICO.** No utilizar para prescripción, preparación, programación de bomba ni administración de medicamentos a pacientes. Herramienta de investigación y simulación matemática con parámetros ficticios.

## Novedad v0.7: auditoría de fuentes españolas y alertas oficiales

La aplicación conserva **modo de simulación exclusivamente**. Se ha añadido el archivo `auditoria-fuentes.json`, que distingue:

- **Verificado en tabla principal del artículo español de Taladriz-Sender et al. (2024):** solo adrenalina. Pediatría: 20, 40, 60 y 100 µg/mL; neonatología: 20, 40 y 60 µg/mL. Son cifras documentales sin validación local.
- **Pendiente de comprobación de tabla suplementaria española:** noradrenalina, dopamina, dobutamina y milrinona. El artículo remite a `ejhpharm-2022-003316supp001.pdf` (3,2 MB), pero el archivo no se pudo recuperar durante esta revisión. No deducir valores españoles desde tablas británicas o estadounidenses.
- **Advertencia AEMPS MUH 10/2022 sobre noradrenalina:** los cambios de expresión de nombre **bitartrato → base** de presentaciones B. Braun, Normon y Norages no cambiaron la composición. Confundir etiquetas puede producir errores de dosis; comprobar siempre fabricante, presentación y unidad declarada. Fuente: https://www.aemps.gob.es/informa/notasinformativas/medicamentosusohumano-3/informacion-relevante-sobre-los-medicamentos-que-contienen-noradrenalina-norepinefrina/
- **Dopamina Grifols:** la ficha técnica del producto declara que la seguridad y eficacia en población pediátrica no están establecidas y no recomienda su uso en niños: https://cima.aemps.es/cima/dochtml/ft/55454/FichaTecnica_55454.html
- **Límite metodológico del consenso:** los autores indican expresamente que sus concentraciones no han sido validadas en la práctica asistencial. El artículo de 2024, disponible en https://pmc.ncbi.nlm.nih.gov/articles/PMC11042264/, deriva de una publicación electrónica de diciembre de 2022.

El panel **«Estado del consenso español y alertas AEMPS»** se despliega dentro de la ficha de cada fármaco. Los archivos bibliográficos no tienen conexión de lectura con los campos del motor matemático. La vista móvil coloca ahora la calculadora ficticia antes de la biblioteca documental.

### Pruebas automáticas

El archivo `tests/check-data.test.mjs` comprueba, entre otros puntos, la coherencia entre los cinco medicamentos, la presencia de alertas oficiales, las filas nacionales/regionales, el estado pendiente del anexo español, las conversiones y el bloqueo de preparaciones clínicas. Ejecutar en entorno Node 22+:

```bash
node --test tests/check-data.test.mjs
```

GitHub Actions dispone de `.github/workflows/verificar.yml` para ejecutar estas pruebas cuando se suben cambios. **Pasar estas comprobaciones no supone validación clínica o regulatoria.** La publicación en GitHub Pages permanece configurada desde la rama `main`, no desde el workflow de pruebas.

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

1. Obtener y comprobar las tablas suplementarias completas del consenso español para noradrenalina, dopamina, dobutamina y milrinona.
2. Resolver explícitamente el caso de **milrinona en RN <2 kg** sin suponer que una opción de la guía regional equivale a una recomendación nacional.
3. Evaluar diferencias NPPG/EoE y adaptar únicamente los estándares aprobados por Farmacia Hospitalaria y Neonatología.
4. Verificar concentraciones base/sal, formulaciones comercializadas, diluyentes, acceso vascular, compatibilidades y estabilidad para cada preparación.
5. Validación de límites de bomba, incrementos, precisión, aportes líquidos, pausas/cambios de jeringa y efectos a caudales muy bajos.
6. Pruebas independientes, análisis de riesgos, control de versiones, trazabilidad de aprobaciones y revisión de requisitos regulatorios.

[**Seguimiento de validación (incidencia bloqueante #1)**](https://github.com/gonzaloares/perfusiones-pediatricas/issues/1)

**Fecha de esta revisión documental:** 22 de octubre de 2026.

# Perfusiones Pediátricas — v0.6

[**Abrir simulador documental**](https://gonzaloares.github.io/perfusiones-pediatricas/)

> ⚠️ **NO APTO PARA USO CLÍNICO.** No utilizar para prescripción, preparación, programación de bomba ni administración de medicamentos a pacientes. Herramienta de investigación y simulación matemática con parámetros ficticios.

## Novedad v0.6: neonatología y peso

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

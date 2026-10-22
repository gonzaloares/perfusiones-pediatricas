# Perfusiones pediátricas — Prototipo v0.5

> **NO APTO PARA USO CLÍNICO.** Solo simulador matemático con datos ficticios y fuentes publicadas para revisión documental. No utilizar para prescribir, preparar, programar bombas o administrar medicación a pacientes.

**Aplicación:** https://gonzaloares.github.io/perfusiones-pediatricas/

## Capacidades
- Cálculo directo e inverso de velocidades a partir de cifras ficticias introducidas por el usuario; no existe cálculo vinculado al selector farmacológico.
- Biblioteca de cinco fármacos con fichas técnicas concretas de AEMPS: adrenalina, noradrenalina, dopamina, dobutamina, milrinona. **Ninguna concentración clínica está validada.**
- Selector de bibliografía **Neonatología / Pediatría**, con concentraciones expresamente publicadas y enlazadas a la fuente original, sin seleccionar preparaciones ni trasladar cifras a la calculadora.
- Rango **observado** en 9 UCIN españolas, identificado expresamente como observacional, no estándar ni recomendación.
- Lista de ocho tareas formales de validación pendiente.
- PWA estática con manifest, iconos PNG y servicio de caché.

## Datasets versionados

| Archivo | Contenido | Estado |
|---|---|---|
| `biblioteca-farmacos.json` | Ficha de cada presentación española | No validado |
| `matriz-concentraciones-publicadas.json` | Concentraciones en consenso y estándares con población y fuente | Literatura, no validado |
| `index.html` | Calculadora ficticia y vista documental | Prototipo |
| `sw.js` | Caché offline | Prototipo |

**Regla:** Los datasets llevan `clinical_use_allowed: false`. No crear preparaciones clínicas ni recomendaciones automáticas a partir de esta matriz.

## Resumen de fuentes con concentraciones contrastadas

1. **Consenso español (2024):** adrenalina pediatría 20, 40, 60, 100 µg/mL; neonatología 20, 40, 60 µg/mL. Las demás concentraciones del anexo suplementario siguen pendientes de lectura y contraste: https://pmc.ncbi.nlm.nih.gov/articles/PMC11042264/
2. **ASHP Standardize 4 Safety (actualizado junio 2026), sin desglose neonatal específico para las filas recogidas:** epinefrina 10/20/40 µg/mL; noradrenalina 16/32/64 µg/mL; dopamina 0,8/1,6/3,2 mg/mL; dobutamina 1/2/4 mg/mL; milrinona 0,1/0,2 mg/mL: https://www.ashp.org/-/media/assets/pharmacy-practice/s4s/docs/Pediatric-Infusion-Standards.ashx
3. **Observacional 9 UCIN españolas:** intervalos reportados por los centros; no han sido añadidos como concentraciones candidatas. https://pmc.ncbi.nlm.nih.gov/articles/PMC8717789/
4. **RCPCH / NPPG 2024:** documento fuente a analizar detalladamente por bandas de peso y dispositivo antes de incorporar cifras a la matriz. https://www.rcpch.ac.uk/resources/standardising-intravenous-infusion-concentrations-neonates-children-uk-framework

## Restricciones críticas
- **Noradrenalina:** diferencia entre noradrenalina base y tartrato según presentación; confirmar declaración exacta de concentraciones de cualquier fuente.
- **Dopamina Grifols:** la ficha española consultada no recomienda uso en niños debido a insuficiencia de datos.
- **Neonatología:** no trasladar automáticamente concentraciones pediátricas generales; validar edad, peso y estabilidad, incluidas bandas inferiores a 2 kg.
- **Vía y diluyente:** ni el consenso ni ASHP garantizan aptitud para una combinación específica de fabricante, formulación, concentración, diluyente, material, tipo de acceso y vida útil.
- **Bomba:** no utilizar para programar equipos sin validación independiente.

## Criterios de aprobación institucional pendientes
Farmacia Hospitalaria, pediatras de Urgencias/Neonatología/UCIP, enfermería, ingeniería clínica y Seguridad del Paciente; actualización de fichas técnicas y productos vigentes; pruebas automáticas exhaustivas; análisis de riesgos; control de cambios; evaluación regulatoria para software sanitario.

Revisión documental: 22 octubre 2026.

# Plantilla de validación institucional de una perfusión pediátrica

**Estado por defecto:** PENDIENTE / NO AUTORIZADA. Esta ficha es una herramienta de revisión, **no una receta**, ni permite habilitar preparaciones en la aplicación.

**Regla:** nunca interpretar la aprobación editorial de esta ficha o un commit de GitHub como autorización de uso clínico. Toda aprobación formal debe gestionarse y custodiarse en el sistema documental del hospital.

## Identificación y trazabilidad

| Campo | Valor / firma |
|---|---|
| Fármaco (nombre DCI, sal y forma química) | Por completar |
| Presentación comercial **realmente dispensada** (marca, CN y concentración etiquetada) | Por completar |
| Referencia a FT CIMA vigente (URL, fecha y sección) | Por completar |
| Protocolo hospitalario de referencia, código y versión | Por completar |
| Servicio / indicación / entorno (UCIN, UCIP, Urgencias, Hospitalización) | Por completar |
| Población (edad gestacional, posnatal, peso, función renal, otros) | Por completar |
| Fecha propuesta, responsable redactor y revisor independiente | Por completar |
| Estado (borrador, en revisión, **aprobado formalmente**, suspendido, retirado) | BORRADOR |

## Concentración candidata (una fila por combinación separada)

| Campo obligatorio | Contenido pendiente de validación |
|---|---|
| Concentración final: **principio activo base/sal + unidad por mL** | Sin propuesta aprobada |
| Origen bibliográfico exacto (tabla, fila y población) | Pendiente |
| Correspondencia con presentación hospitalaria (base/sal, equivalencias) | Pendiente |
| Preparación y trazabilidad: cantidad, volumen **final** y número de envases | Pendiente |
| Diluyente admitido **para esa presentación** (ficha técnica + bibliografía) | Pendiente |
| Envase, material, sistema de infusión y protección de luz | Pendiente |
| Estabilidad fisicoquímica (concentración, temperatura, material, fuente) | Pendiente |
| Caducidad / BUD **microbiológica** y condiciones asépticas | Pendiente |
| Acceso vascular periférico/central, irritación, vesicancia, extravasación | Pendiente |
| Compatibilidad en Y **por pareja** y concentración (no inferir por diluyente) | Pendiente |
| Volumen máximo de aporte hídrico/día/kg y restricciones por edad | Pendiente |
| Perfusión continua, concentración en jeringa y compatibilidad con bomba | Pendiente |
| Caudal mínimo/máximo y resolución/precisión del dispositivo validado | Pendiente |
| Alertas específicas de paciente y parámetros de monitorización | Pendiente |
| Contraindicaciones, restricciones en FT y medidas ante extravasación | Pendiente |
| Evaluación riesgo clínico y mitigaciones documentadas | Pendiente |

## Especial atención por fármaco

- **Adrenalina**: tabla 2 del consenso español documenta 20/40/60 µg/mL para neonatología y 20/40/60/100 µg/mL para pediatría; no transforma la FT de Adrenalina Basi en una preparación clínica validada. Medicamento vesicante/de alto riesgo.
- **Noradrenalina**: especificar siempre mg de **base** frente a mg de **tartrato** por producto y etiqueta. Revisar alerta AEMPS MUH 10/2022.
- **Dopamina**: revisar expresamente la falta de recomendación de uso pediátrico de la presentación Grifols y la discrepancia entre estándares NPPG y guía regional EoE.
- **Dobutamina**: condiciones de acceso central para concentraciones elevadas en la ficha Hikma; no inferir reglas generales de administración periférica.
- **Milrinona**: revisar insuficiencia renal, prematuridad y la ausencia de una banda específica <2 kg en el marco británico NPPG de 2024.

## Pruebas independientes imprescindibles (por combinación candidata)

- [ ] Identidad y unidad (µg frente a mg, base frente a sal), semántica de la dosis y del volumen final.
- [ ] Cálculo directo de dosis a mL/h y cálculo inverso con resultados de referencia independientes.
- [ ] Pacientes ficticios en límites de banda de peso: por debajo, exactamente en el límite y por encima.
- [ ] Caudales extremadamente bajos, volumetría día/kg, resolución de bomba y redondeo.
- [ ] Rechazo de datos ausentes, cero, negativos, NaN, infinito y unidades incompatibles.
- [ ] Comprobación de caducidad microbiológica separada de estabilidad físico-química.
- [ ] Incompatibilidad con diluyentes, líneas en Y, otras vías o presentaciones no autorizadas.
- [ ] Casos de edema/restricción hídrica, cambio de jeringa, desconexión accidental, cebado y extravasación según protocolo.
- [ ] Verificación manual independiente por dos profesionales clínicos.
- [ ] Evaluación de riesgos, análisis regulatorio y aprobación de puesta en servicio.

## Firmas / aprobación (fuera de GitHub)

| Responsabilidad | Estado |
|---|---|
| Farmacia Hospitalaria | Pendiente |
| Servicio clínico (Neonatología/UCIP/Pediatría según aplique) | Pendiente |
| Enfermería y bomba de infusión | Pendiente |
| Seguridad del Paciente | Pendiente |
| Evaluación regulatoria/software sanitario y dirección responsable | Pendiente |

**Criterio de bloqueo actual:** no hay aprobaciones firmadas, protocolo local vigente ni preparación clínica parametrizada. Mantener `clinical_use_allowed: false` y `preparations: []` en los datos públicos.

## Referencias para arrancar

- [Consenso español Taladriz-Sender et al., 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11042264/) — tabla 2 solo para adrenalina entre los cinco seleccionados.
- [Anexo pendiente: ejhpharm-2022-003316supp001.pdf](https://pmc.ncbi.nlm.nih.gov/articles/PMC11042264/) — acceder desde materiales suplementarios del artículo.
- [Biblioteca de presentaciones AEMPS](../matriz-presentaciones-aemps.json)
- [Auditoría de fuentes](../auditoria-fuentes.json)
- [Incidencia de validación bloqueante](https://github.com/gonzaloares/perfusiones-pediatricas/issues/1)

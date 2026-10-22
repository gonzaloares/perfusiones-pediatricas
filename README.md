# Perfusiones pediátricas — Prototipo v0.4

> **NO APTO PARA USO CLÍNICO.** La aplicación es una prueba matemática y un catálogo de **documentación por revisar**. No prescribe, no prepara, no recomienda concentraciones y no valida vías de administración. No introducir datos reales de pacientes.

## Acceso
GitHub Pages: https://gonzaloares.github.io/perfusiones-pediatricas/

## Contenido
- Calculadora matemática directa e inversa basada en datos ficticios.
- Biblioteca de **cinco fichas técnicas específicas**: adrenalina Basi, noradrenalina Basi, dopamina Grifols, dobutamina Hikma y milrinona Lorien.
- Fuente primaria de cada monografía: enlace directo a **CIMA/AEMPS**.
- Cada documento está marcado **PENDIENTE DE VALIDACIÓN** y tiene lista vacía de preparaciones aprobadas.
- Notas sobre población pediátrica, forma comercial, diluyentes, compatibilidades, estabilidad y precauciones específicas.
- Service worker con caché de los archivos para prueba sin conexión, después de la primera carga exitosa.

## Hallazgos que condicionan validación
1. **Dopamina Grifols**: la ficha técnica indica que el uso pediátrico no está recomendado por falta de seguridad y eficacia establecidas para esta presentación.
2. **Noradrenalina Basi**: distinguir mg de **base** y mg de **tartrato**.
3. **Adrenalina Basi**: sus indicaciones y diluciones para inyección IV no autorizan por sí mismas una concentración de perfusión pediátrica.
4. **Dobutamina Hikma**: la ficha técnica recoge poblaciones pediátricas y condiciones especiales para concentraciones superiores, lo cual **no sustituye** la validación de protocolos locales.
5. **Milrinona Lorien**: destacar precauciones pediátricas/renales y compatibilidad de líneas.

## Bloqueo clínico
`biblioteca-farmacos.json` contiene `clinical_use_allowed: false`, `validation: "PENDIENTE"` y `preparations: []` para cada medicamento. La interfaz aplica un cierre por defecto si no se cumple este contrato. Esto **no** equivale a un mecanismo de seguridad certificado; una aplicación pública estática es modificable por usuarios técnicos.

## Antes de cualquier uso asistencial
- Validación formal y trazable por Farmacia Hospitalaria y Pediatría/Neonatología/UCIP.
- Verificación de ficha técnica vigente y presentaciones disponibles en farmacia.
- Revisión de concentraciones, diluyentes, compatibilidad en línea, estabilidad microbiológica, edad, peso y acceso vascular.
- Límites de bomba, precisión, redondeo y tolerancias.
- Suite de pruebas matemáticas con casos extremos y revisión independiente.
- Análisis de riesgos, control de versiones y evaluación regulatoria aplicable.

## Referencias AEMPS
- Adrenalina Basi: https://cima.aemps.es/cima/dochtml/ft/89175/FT_89175.html
- Noradrenalina Basi: https://cima.aemps.es/cima/dochtml/ft/90792/FT_90792.html
- Dopamina Grifols: https://cima.aemps.es/cima/dochtml/ft/55454/FichaTecnica_55454.html
- Dobutamina Hikma: https://cima.aemps.es/cima/dochtml/ft/85914/FT_85914.html
- Milrinona Lorien: https://cima.aemps.es/cima/dochtml/ft/91153/FT_91153.html

Fuentes consultadas el **22 de octubre de 2026**. La descripción de una FT concreta no implica comercialización, disponibilidad hospitalaria ni autorización universal de otras presentaciones.

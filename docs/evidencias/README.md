# Evidencias del laboratorio S10

Esta carpeta conserva las salidas reales de las pruebas por etapa, la observación
del navegador y las capturas usadas en `../../ENTREGABLE.md`.

- Los archivos JSON de Vitest incluyen el resultado de cada prueba.
- Los archivos TXT conservan la salida de consola de los comandos ejecutados.
- Las pruebas se mantienen sin modificaciones.
- Las pruebas iniciales y las de la IA original fallan deliberadamente: son la
  línea base del ejercicio, no el estado final del proyecto.
- Las comprobaciones visuales se realizan sobre la aplicación local, sin backend.

## Lectura rápida

- [Resumen de todas las etapas y pruebas fallidas](resumen-pruebas.json).
- [Entorno y comandos](01-entorno.txt).
- [Comprobaciones del navegador](navegador.md).
- [Reproducción del algoritmo de hash de la S08](02-hashes-s08.json).
- [Consola del error intencional, ya deshecho](13-error-intencional.txt).
- [Equipo final: 61/61](16-team-final.txt).
- [IA final: 61/61](16-ai-final.txt).
- [Compilación](16-build.txt).

Los TXT son salidas sin normalizar: pueden incluir color de terminal y espacios
que las herramientas de pruebas imprimen al representar el DOM. Para analizar
los resultados automáticamente, utiliza los JSON.

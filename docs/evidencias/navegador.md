# Comprobaciones en el navegador real

URL: `http://localhost:5173/`. Fecha: 13/11/2026. Se usaron herramientas de
automatización del navegador para hacer clic, escribir, recargar e inspeccionar
el DOM, estilos, consola y almacenamiento. No son afirmaciones de pruebas manuales
realizadas personalmente por el alumno. No hubo backend ni operaciones de borrado.

| Etapa | Acción y resultado observado |
| --- | --- |
| Inicial | Seis tarjetas. P-01 tiene Aprobar habilitado con entrada vacía. Clic en Aprobar de P-03 no lo retira. Contadores 6/0 y almacenamiento ausente antes y después del clic |
| Button | Clases `btn btn-primary`, `btn btn-danger` y `btn btn-ghost`; todos de tipo `button`. Fondos calculados: azul `rgb(29, 78, 216)`, rojo `rgb(185, 28, 28)` y transparente |
| HashConfirm | P-01: vacío, `d68ebfa913`, `d68ebfa913ecx` y `D68EBFA913EC` dejan Aprobar deshabilitado. `d68ebfa913ec` lo habilita |
| Búsqueda | `zzz-sin-coincidencias` muestra «No hay planes que coincidan» y Limpiar búsqueda. Clic en Limpiar búsqueda vacía el campo y devuelve las tarjetas |
| Persistencia | Clic en Aprobar de P-03 produce 5/1 y `{"P-03":"approved"}`. Al recargar se conserva ese estado y P-03 no está en Pendientes |
| Limpieza del almacenamiento | Se elimina solo `dae-s10-decisions`; al recargar se recuperan seis tarjetas, 6/0 y `{}` recreado por el efecto |
| Capturas | `14-bandeja-decision.png`: decisión P-03 recuperada tras recargar. `14-busqueda-vacia.png`: sin coincidencias, decisión conservada y contador 5/1 |
| Evento incorrecto temporal | Aprobar de R1 llama `onDecide` durante el render. Sin clic, P-03 y P-05 quedan aprobados, contador 4/2 y almacenamiento `{"P-03":"approved","P-05":"approved"}`. Mensaje de React en `13-error-intencional.txt` |
| Restauración | Función flecha restablecida; clave eliminada y página recargada. Seis tarjetas, 6/0, almacenamiento `{}` y cero errores de consola |
| Datos hostiles | P-02 conserva su texto literal. En su tarjeta se cuentan cero elementos `img`, `b` o `script` inyectados |
| Manipulación deliberada de almacenamiento | Escribir `{"P-01":"approved"}` y recargar simula una aprobación R2 sin escribir hash. La UI muestra 5/1 y el examen en Decididos. No se contacta con un servidor. Después se elimina la clave y se vuelve a 6/0 con `{}` |

Al terminar se dejó la bandeja sin decisiones ni búsqueda, con el servidor de
desarrollo corriendo. Los borradores de hash de las comprobaciones se perdieron
al desmontar o recargar, de acuerdo con su estado local.

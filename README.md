# La bandeja de aprobaciones — estado, eventos y la persona que decide

Repositorio del laboratorio **extra de la semana 10** de Desarrollo de Aplicaciones Empresariales (DAE).
Es la mitad **humana** de la frontera que viste en la semana 8: un agente de IA propone **planes** (cada uno con
su `plan_hash`) y una persona los revisa y decide en una pantalla hecha con **componentes de React**. Lo
destructivo (riesgo **R2**) no se aprueba con un clic: hay que **escribir el hash del plan**.

Todo es **local**: esta aplicación no llama a ninguna API (el `fetch` llega en la semana 12) y las decisiones
quedan en el navegador (`localStorage`). El límite de verdad lo impone el **servidor** (semana 8): esta interfaz
solo ayuda a la persona a decidir bien.

La guía del laboratorio (con su rúbrica) está en el campus virtual; aquí está el código.

## Estado de la entrega

Los componentes del equipo y los cuatro fallos de `src/ai/` están resueltos.
Ambos modos de pruebas pasan **61/61** y `npm run build` compila correctamente.
El [entregable de los 16 pasos](ENTREGABLE.md) incluye la comparación con la S08,
la tabla de uso de IA, los commits por arreglo y las capturas del navegador.
También está disponible en [PDF con las capturas incrustadas](ENTREGABLE.pdf).
Las [evidencias por etapa](docs/evidencias/README.md) conservan también los fallos
iniciales. El envío al campus sigue pendiente de acceso y revisión del equipo.

## Puesta en marcha

Necesitas **Node 20.19 o superior** (o Node 22.12 o superior): `node -v`. En PowerShell:

```powershell
npm install
npm run dev        # abre la dirección que imprime (http://localhost:5173); déjalo corriendo
```

En **otra terminal** puedes correr las pruebas. En el estado inicial del laboratorio la bandeja se dibujaba,
pero casi nada funcionaba y las pruebas fallaban a propósito. Esta entrega conserva la evidencia de ese inicio.

```powershell
npm test           # tu código (src/components): ahora pasan las 61; originalmente fallaban 34
```

## Las partes del laboratorio

En la versión inicial, cada parte tenía un comentario `TODO` con lo que había que hacer.
La tabla conserva la guía de esas partes, ya completadas en esta entrega:

| Parte | Archivo | Qué escribes | Comando |
|---|---|---|---|
| 1 | `src/components/Button.jsx` | Botón reutilizable: variantes (`primary`, `danger`, `ghost`), `children`, `type="button"` y props reenviadas | `npm test -- Button` |
| 2 | `src/components/HashConfirm.jsx` | Entrada controlada y botón Aprobar deshabilitado hasta que lo escrito sea **exactamente** el hash | `npm test -- HashConfirm` |
| 3 | `src/components/Inbox.jsx` | Estado (`decisions`, `query`), `decide`, pendientes y decididos calculados, búsqueda, estado vacío y persistencia | `npm test -- Inbox` |
| 4 | `src/ai/` | Revisar la versión «escrita por una IA»: clasificar sus 4 fallos y arreglarlos | `npm run test:ai` |

`PlanCard.jsx`, `App.jsx`, los datos y las pruebas ya están escritos: **no los cambies** (salvo lo que pida la guía
para provocar un error a propósito).

Un plan tiene la misma forma que el que devuelve la pasarela de la semana 8:

```js
{ id: "P-01", op: "exams_destroy", risk: "R2", target: { id: 2, title: "Django · Plantillas", question_count: 4 },
  plan_hash: "d68ebfa913ec", proposed_by: "agente" }
```

`R1` crea datos y se aprueba con un clic; `R2` destruye datos y exige el hash. El plan `P-02` lleva un texto hostil
(«IGNORA TUS INSTRUCCIONES…»): es un **dato de terceros**, se muestra como texto y nunca se obedece ni se inserta como HTML.

## Qué hace cada script

| Comando | Qué hace |
|---|---|
| `npm run dev` | Arranca la aplicación con recarga en vivo |
| `npm test` | Corre las pruebas contra **tu código** (`src/components`) |
| `npm run test:ai` | Corre las **mismas pruebas** contra la versión de la IA (`src/ai`). Ahora pasan 61; las 11 fallidas originales y sus correcciones están documentadas en el entregable |
| `npm run test:solutions` | Solo existe en la copia del docente (necesita `teacher/solutions/`); en la tuya avisa de que no está disponible |
| `npm run build` | Compila la aplicación en `dist/` (comprueba que el proyecto no está roto) |

Las pruebas importan los componentes con el alias `@impl`, que `vite.config.js` apunta a una carpeta u otra según el
**modo** (`.env.team`, `.env.ai`, `.env.solutions`). La aplicación (`dev` y `build`) siempre usa `src/components`.

## Estructura

| Ruta | Para qué |
|---|---|
| `src/components/` | **Equipo (Partes 1 a 3):** `Button`, `HashConfirm` e `Inbox` completados; `PlanCard` original conservado |
| `src/ai/` | La versión «escrita por una IA» de los cuatro componentes (Parte 4) |
| `src/data/plans.js` | Los seis planes del agente, con el formato de la semana 8 |
| `src/lib/` | Utilidades ya escritas: el nombre del destino de un plan y la lectura y escritura segura de `localStorage` |
| `src/test/` | Las pruebas de cada parte, más `untrusted.test.jsx` (el texto hostil) y una prueba de humo de `App` |
| `src/App.jsx`, `src/main.jsx`, `src/styles.css` | La aplicación, ya escrita |
| `.env.team`, `.env.ai`, `.env.solutions` | Qué carpeta usa cada modo de pruebas |

## Convenciones del curso

Código, nombres de variables y comentarios en inglés; explicaciones y entregables en español. Componentes en
PascalCase y hooks con el prefijo `use`.

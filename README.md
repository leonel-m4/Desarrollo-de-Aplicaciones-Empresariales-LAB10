# Cineclub · Laboratorio 11

Cartelera React con adaptador de películas, favoritos persistentes, avisos desacoplados, hooks propios, diseño adaptable y estrenos simulados.

**Rama:** `lab11` · **Entregable:** [ENTREGABLE.md](ENTREGABLE.md) y `ENTREGABLE.pdf`.

## Ejecutar

Node 20.19+ o 22.12+.

```powershell
npm.cmd ci
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Abrir http://localhost:5173. En PowerShell se usa `npm.cmd` para evitar el bloqueo de `npm.ps1`.

```powershell
npm.cmd test
npm.cmd run build
```

## Qué probar

- Pulsa el corazón de una tarjeta: cambia el contador y aparece un aviso. Pulsa otra vez para quitarla.
- Busca por título: el campo responde inmediatamente; la lista espera 300 ms.
- Combina géneros y “Mis favoritas”. “Limpiar filtros” en el banner restablece los tres filtros.
- Redimensiona: 1 columna (<560 px), 2 (<800), 3 (<1120), 4 (desde 1120).
- “Recargar estrenos” muestra el esqueleto y luego el carrusel.
- Marca “Simular error de conexión”: aparece el error con “Reintentar”; desmárcalo para recuperar los datos.
- El carrusel admite flechas, desplazamiento horizontal y teclado.

Los ocho títulos de cartelera son una selección de demostración. Los cuatro próximos estrenos son ficticios; no se consulta una API real. Los pósteres son ilustraciones SVG locales, no carteles oficiales. Las tipografías web tienen alternativas del sistema si no hay conexión.

## Estructura

```text
src/App.jsx                 Estado compartido y composición de la cartelera
src/components/Movie*.jsx   Cabecera, banner, tarjeta y esqueleto
src/components/Toast.jsx    Presentación y duración de los avisos
src/components/Premiere*   Sección y carrusel de estrenos
src/hooks/useDebounce.js    Valor con retardo y limpieza
src/hooks/useWindowSize.js  Tamaño de ventana y limpieza del listener
src/hooks/usePremieres.js   Petición simulada: loading / ready / error
src/lib/movieAdapter.js    Datos externos -> modelo de película
src/data/movies.js         Datos de demostración
src/cinema.css             Tipografía, utilidades y estilos adaptables
public/posters/            Ilustraciones locales
src/test/                  Pruebas de cartelera y de regresión
```

La bandeja anterior se conserva en `src/ApprovalApp.jsx` para no perder su implementación ni sus pruebas. `src/test/App.test.jsx` ahora importa esa composición archivada; sus expectativas originales no se cambiaron. La pantalla principal y sus nuevas pruebas están en `src/App.jsx` y `src/test/Cinema.test.jsx`. La documentación de esa aplicación permanece en `README-APROBACIONES.md`. Los entregables de esta rama corresponden únicamente al laboratorio 11.

## Entrega

Consultar el árbol de componentes, la justificación del contador y las comprobaciones en [ENTREGABLE.md](ENTREGABLE.md). Subir `ENTREGABLE.pdf` al campus personalmente; publicar el repositorio no realiza ese envío.

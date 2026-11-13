import fs from "node:fs";

// Small dependency-free renderer for this document: headings, paragraphs, code,
// lists and tables. The HTML can be printed to PDF with the browser.
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const inline = (value) => escape(value)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const lines = fs.readFileSync("ENTREGABLE.md", "utf8").split(/\r?\n/);
let html = "";
let code = false;
let table = false;
for (const line of lines) {
  if (line.startsWith("```")) {
    if (table) { html += "</tbody></table>"; table = false; }
    html += code ? "</code></pre>" : "<pre><code>";
    code = !code;
    continue;
  }
  if (code) { html += `${escape(line)}\n`; continue; }
  if (line.startsWith("|")) {
    if (/^\|[\s:|-]+\|$/.test(line)) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (!table) {
      html += `<table><thead><tr>${cells.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>`;
      table = true;
    } else {
      html += `<tr>${cells.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`;
    }
    continue;
  }
  if (table) { html += "</tbody></table>"; table = false; }
  if (!line.trim()) continue;
  const heading = line.match(/^(#{1,3}) (.+)$/);
  if (heading) { html += `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`; continue; }
  html += `<p>${inline(line)}</p>`;
}
if (table) html += "</tbody></table>";
fs.writeFileSync("ENTREGABLE.html", `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Laboratorio 11 — Cineclub</title><style>
@page{size:A4;margin:18mm}*{box-sizing:border-box}body{font:11px/1.55 Arial,sans-serif;color:#243b32;max-width:800px;margin:30px auto}h1{font-size:27px;line-height:1.2;border-bottom:3px solid #8da86c;padding-bottom:14px}h2{font-size:17px;margin-top:25px;break-after:avoid}h3{font-size:14px;break-after:avoid}p{margin:8px 0}table{border-collapse:collapse;width:100%;font-size:10px;margin:14px 0}th,td{border:1px solid #d4ddcd;text-align:left;padding:7px;vertical-align:top}th{background:#e9eedf}tr{break-inside:avoid}thead{display:table-header-group}pre{background:#f0f3eb;border:1px solid #dbe2d3;padding:12px;white-space:pre-wrap;overflow-wrap:anywhere;font:9px/1.5 Consolas,monospace}code{font-family:Consolas,monospace;font-size:.95em}p code{background:#edf1e7;padding:1px 3px}strong{color:#244b3e}@media print{body{margin:0;max-width:none}a{color:inherit}}
pre{break-inside:avoid}
</style></head><body>${html}</body></html>`, "utf8");
console.log("ENTREGABLE.html generado.");

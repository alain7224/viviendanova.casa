import fs from "fs";
import path from "path";

const csvPath = path.resolve("data/properties.csv");
const outPath = path.resolve("src/data/properties.generated.json");

if (!fs.existsSync(csvPath)) {
  console.error("❌ No existe data/properties.csv");
  process.exit(1);
}

const raw = fs.readFileSync(csvPath, "utf8").trim();
const lines = raw.split(/\r?\n/);

if (lines.length < 2) {
  console.error("❌ CSV vacío o sin filas");
  process.exit(1);
}

const headers = lines[0].split(",").map(h => h.trim());

function parseCSVLine(line) {
  // parser simple con comillas
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && line[i + 1] === '"') {
      cur += '"';
      i++;
    } else if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

const items = lines.slice(1).map((line, idx) => {
  const cols = parseCSVLine(line);
  const row = {};
  headers.forEach((h, i) => row[h] = cols[i] ?? "");

  return {
    id: row.id || `prop-${idx + 1}`,
    title: row.title || "Vivienda",
    zone: row.zone || "",
    city: row.city || "",
    price: Number(row.price || 0),
    bedrooms: Number(row.bedrooms || 0),
    bathrooms: Number(row.bathrooms || 0),
    area_m2: Number(row.area_m2 || 0),
    type: row.type || "vivienda",
    operation: row.operation || "venta",
    image: row.image || "",
    images: (row.images || "").split("|").map(x => x.trim()).filter(Boolean),
    description: row.description || "",
    status: row.status || "disponible",
    source_note: "Contenido adaptado para viviendanova.casa"
  };
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(items, null, 2), "utf8");

console.log(`✅ Importadas ${items.length} viviendas`);
console.log(`📁 Archivo generado: ${outPath}`);

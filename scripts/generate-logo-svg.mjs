import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";

const FONT_PATH = "/tmp/BarlowCondensed-Bold.ttf";
const FONT_SIZE = 1000;
const LETTER_SPACING = FONT_SIZE * -0.055;
const TEXT = "JOHNWAY.";
const PERIOD_COLOR = "#2f8f55";
const PAD = 20;

const variants = [
  { name: "johnway-logo-dark.svg", fill: "#2d2d2d" },
  { name: "johnway-logo-light.svg", fill: "#f4ebcf" },
];

const fontBuffer = fs.readFileSync(FONT_PATH);
const font = opentype.parse(fontBuffer.buffer);
const scale = FONT_SIZE / font.unitsPerEm;
const baseline = (font.ascender / font.unitsPerEm) * FONT_SIZE;

let x = 0;
const paths = [];
let previousGlyph = null;
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

for (let index = 0; index < TEXT.length; index += 1) {
  const char = TEXT[index];
  const glyph = font.charToGlyph(char);

  if (previousGlyph) {
    x += font.getKerningValue(previousGlyph, glyph) * scale;
  }

  const glyphPath = glyph.getPath(x, baseline, FONT_SIZE);
  const bbox = glyphPath.getBoundingBox();

  minX = Math.min(minX, bbox.x1);
  minY = Math.min(minY, bbox.y1);
  maxX = Math.max(maxX, bbox.x2);
  maxY = Math.max(maxY, bbox.y2);

  paths.push({
    data: glyphPath.toPathData(2),
    fill: char === "." ? PERIOD_COLOR : null,
  });

  x += glyph.advanceWidth * scale;
  if (index < TEXT.length - 1) x += LETTER_SPACING;
  previousGlyph = glyph;
}

const width = Math.ceil(maxX - minX + PAD * 2);
const height = Math.ceil(maxY - minY + PAD * 2);

function buildSvg(fill) {
  const pathMarkup = paths
    .map(({ data, fill: overrideFill }) => {
      const color = overrideFill ?? fill;
      return `  <path fill="${color}" d="${data}"/>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Johnway.">
  <title>Johnway.</title>
  <g transform="translate(${(-minX + PAD).toFixed(2)} ${(-minY + PAD).toFixed(2)})">
${pathMarkup}
  </g>
</svg>
`;
}

const outputDir = path.resolve("public/brand");
fs.mkdirSync(outputDir, { recursive: true });

for (const variant of variants) {
  fs.writeFileSync(path.join(outputDir, variant.name), buildSvg(variant.fill));
  console.log(`Wrote ${variant.name} (${width}x${height})`);
}

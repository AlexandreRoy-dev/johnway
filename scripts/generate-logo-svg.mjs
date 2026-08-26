import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";

const FONT_PATH = "/tmp/BarlowCondensed-Bold.ttf";
const FONT_SIZE = 1000;
// Tight brand spacing — matches truck mockup (font metrics + slight negative track)
const LETTER_SPACING_EM = -0.055;
const LETTER_SPACING = FONT_SIZE * LETTER_SPACING_EM;
const TEXT = "JOHNWAY.";
const PERIOD_COLOR = "#2f8f55";

const variants = [
  { name: "johnway-logo-dark.svg", fill: "#2d2d2d" },
  { name: "johnway-logo-light.svg", fill: "#f4ebcf" },
];

const fontBuffer = fs.readFileSync(FONT_PATH);
const font = opentype.parse(fontBuffer.buffer);
const scale = FONT_SIZE / font.unitsPerEm;

let x = 0;
const paths = [];
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
let previousGlyph = null;

for (let index = 0; index < TEXT.length; index += 1) {
  const char = TEXT[index];
  const glyph = font.charToGlyph(char);

  if (previousGlyph) {
    x += font.getKerningValue(previousGlyph, glyph) * scale;
  }

  const glyphPath = glyph.getPath(x, 0, FONT_SIZE);
  const data = glyphPath.toPathData(2);

  const bbox = glyphPath.getBoundingBox();
  minX = Math.min(minX, bbox.x1);
  minY = Math.min(minY, bbox.y1);
  maxX = Math.max(maxX, bbox.x2);
  maxY = Math.max(maxY, bbox.y2);

  paths.push({
    char,
    data,
    fill: char === "." ? PERIOD_COLOR : null,
  });

  x += glyph.advanceWidth * scale;
  if (index < TEXT.length - 1) {
    x += LETTER_SPACING;
  }

  previousGlyph = glyph;
}

const padding = FONT_SIZE * 0.04;
const flipY = -(minY + maxY);
const viewMinX = minX - padding;
const viewMinY = minY - padding;
const viewWidth = maxX - minX + padding * 2;
const viewHeight = maxY - minY + padding * 2;

function buildSvg(fill) {
  const pathMarkup = paths
    .map(({ data, fill: overrideFill }) => {
      const color = overrideFill ?? fill;
      return `  <path fill="${color}" d="${data}"/>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewMinX.toFixed(2)} ${viewMinY.toFixed(2)} ${viewWidth.toFixed(2)} ${viewHeight.toFixed(2)}" role="img" aria-label="Johnway.">
  <title>Johnway.</title>
  <g transform="translate(0 ${flipY.toFixed(2)}) scale(1 -1)">
${pathMarkup}
  </g>
</svg>
`;
}

const outputDir = path.resolve("public/brand");
fs.mkdirSync(outputDir, { recursive: true });

for (const variant of variants) {
  const svg = buildSvg(variant.fill);
  fs.writeFileSync(path.join(outputDir, variant.name), svg);
  console.log(`Wrote ${variant.name} (${viewWidth.toFixed(0)}w)`);
}

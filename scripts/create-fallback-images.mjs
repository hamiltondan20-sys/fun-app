import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WIDTH = 1200;
const HEIGHT = 630;
const pixels = new Uint8Array(WIDTH * HEIGHT * 4);

const color = (hex) => {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16));
};

const setPixel = (x, y, fill) => {
  if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return;
  const offset = (y * WIDTH + x) * 4;
  pixels[offset] = fill[0];
  pixels[offset + 1] = fill[1];
  pixels[offset + 2] = fill[2];
  pixels[offset + 3] = 255;
};

const fill = (fillColor) => {
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) setPixel(x, y, fillColor);
  }
};

const rect = (x0, y0, x1, y1, fillColor) => {
  for (let y = Math.max(0, y0); y < Math.min(HEIGHT, y1); y += 1) {
    for (let x = Math.max(0, x0); x < Math.min(WIDTH, x1); x += 1) setPixel(x, y, fillColor);
  }
};

const circle = (cx, cy, radius, fillColor) => {
  const radiusSquared = radius * radius;
  for (let y = Math.max(0, cy - radius); y <= Math.min(HEIGHT - 1, cy + radius); y += 1) {
    for (let x = Math.max(0, cx - radius); x <= Math.min(WIDTH - 1, cx + radius); x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= radiusSquared) setPixel(x, y, fillColor);
    }
  }
};

const polygon = (points, fillColor) => {
  const minY = Math.max(0, Math.floor(Math.min(...points.map((point) => point[1]))));
  const maxY = Math.min(HEIGHT - 1, Math.ceil(Math.max(...points.map((point) => point[1]))));
  for (let y = minY; y <= maxY; y += 1) {
    const intersections = [];
    for (let index = 0; index < points.length; index += 1) {
      const [x1, y1] = points[index];
      const [x2, y2] = points[(index + 1) % points.length];
      if ((y1 <= y && y < y2) || (y2 <= y && y < y1)) {
        intersections.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1));
      }
    }
    intersections.sort((left, right) => left - right);
    for (let index = 0; index < intersections.length; index += 2) {
      const start = Math.max(0, Math.ceil(intersections[index]));
      const end = Math.min(WIDTH - 1, Math.floor(intersections[index + 1] ?? intersections[index]));
      for (let x = start; x <= end; x += 1) setPixel(x, y, fillColor);
    }
  }
};

function drawCity() {
  const sky = color("#d9f0eb");
  const dark = color("#1d2930");
  const ocean = color("#176765");
  const water = color("#3f8790");
  const coral = color("#b95138");
  const sun = color("#f7c978");
  fill(sky);
  circle(940, 132, 82, sun);
  rect(0, 390, WIDTH, HEIGHT, water);
  polygon([[0, 455], [180, 420], [360, 468], [550, 430], [760, 470], [970, 422], [1200, 454], [1200, 630], [0, 630]], ocean);
  const buildings = [[72, 220, 170, 390], [192, 155, 318, 390], [340, 250, 410, 390], [432, 188, 548, 390], [580, 130, 662, 390], [700, 232, 828, 390], [858, 180, 956, 390], [1006, 238, 1076, 390], [1092, 192, 1164, 390]];
  buildings.forEach(([x0, y0, x1, y1]) => rect(x0, y0, x1, y1, dark));
  [[218, 190], [262, 190], [458, 220], [505, 220], [600, 166], [644, 166], [886, 214], [930, 214]].forEach(([x, y]) => rect(x, y, x + 18, y + 26, sun));
  polygon([[0, 540], [200, 510], [420, 548], [650, 516], [860, 550], [1050, 520], [1200, 544], [1200, 630], [0, 630]], coral);
}

function drawRegion() {
  const sky = color("#e2f1ee");
  const dark = color("#176765");
  const green = color("#3f725e");
  const water = color("#82c2c1");
  const coral = color("#b95138");
  fill(sky);
  circle(930, 138, 86, color("#f7c978"));
  polygon([[0, 430], [220, 198], [402, 366], [570, 118], [784, 420], [942, 226], [1200, 426], [1200, 630], [0, 630]], green);
  polygon([[0, 480], [220, 326], [366, 420], [574, 260], [802, 438], [968, 306], [1200, 460], [1200, 630], [0, 630]], dark);
  polygon([[500, 630], [610, 478], [694, 418], [774, 500], [826, 630]], water);
  polygon([[0, 544], [220, 522], [420, 556], [650, 530], [870, 566], [1080, 530], [1200, 548], [1200, 630], [0, 630]], coral);
}

function drawLandmark() {
  const sand = color("#f9dfbd");
  const dark = color("#1d2930");
  const ocean = color("#176765");
  const coral = color("#b95138");
  const sun = color("#f7c978");
  fill(sand);
  circle(958, 142, 78, coral);
  rect(0, 420, WIDTH, HEIGHT, ocean);
  polygon([[280, 420], [420, 178], [780, 178], [942, 420]], dark);
  polygon([[440, 420], [490, 246], [706, 246], [760, 420]], sun);
  rect(518, 298, 680, 420, coral);
  polygon([[0, 520], [190, 484], [442, 548], [650, 520], [880, 550], [1080, 500], [1200, 532], [1200, 630], [0, 630]], color("#3f725e"));
}

function drawCountry() {
  const sand = color("#fff4e7");
  const green = color("#3f725e");
  const ocean = color("#176765");
  const water = color("#3f8790");
  const coral = color("#b95138");
  fill(sand);
  circle(940, 138, 84, color("#f7c978"));
  polygon([[0, 316], [150, 344], [300, 298], [480, 342], [650, 316], [820, 354], [1010, 292], [1200, 326], [1200, 630], [0, 630]], water);
  polygon([[0, 420], [180, 376], [390, 438], [610, 402], [820, 448], [1020, 382], [1200, 420], [1200, 630], [0, 630]], ocean);
  polygon([[160, 304], [196, 214], [306, 164], [390, 188], [458, 248], [530, 292], [438, 334], [280, 338]], green);
  polygon([[0, 492], [300, 478], [520, 526], [760, 490], [1000, 518], [1200, 488], [1200, 630], [0, 630]], coral);
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

const crc32 = (buffer) => {
  let value = 0xffffffff;
  for (const byte of buffer) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
};

const chunk = (type, data) => {
  const typeBuffer = Buffer.from(type);
  const combined = Buffer.concat([typeBuffer, data]);
  const output = Buffer.alloc(data.length + 12);
  output.writeUInt32BE(data.length, 0);
  typeBuffer.copy(output, 4);
  data.copy(output, 8);
  output.writeUInt32BE(crc32(combined), data.length + 8);
  return output;
};

function writePng(filename, draw) {
  draw();
  const raw = Buffer.alloc((WIDTH * 4 + 1) * HEIGHT);
  const source = Buffer.from(pixels.buffer);
  for (let y = 0; y < HEIGHT; y += 1) {
    const row = y * (WIDTH * 4 + 1);
    raw[row] = 0;
    source.copy(raw, row + 1, y * WIDTH * 4, (y + 1) * WIDTH * 4);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(WIDTH, 0);
  header.writeUInt32BE(HEIGHT, 4);
  header[8] = 8;
  header[9] = 6;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
  fs.writeFileSync(path.join(ROOT, "assets", filename), png);
}

writePng("guide-city.png", drawCity);
pixels.fill(0);
writePng("guide-region.png", drawRegion);
pixels.fill(0);
writePng("guide-landmark.png", drawLandmark);
pixels.fill(0);
writePng("guide-country.png", drawCountry);
console.log("Created four fallback social preview images.");

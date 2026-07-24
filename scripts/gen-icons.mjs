/* Génère les icônes PWA (PNG solides, motif « point » de la marque) sans dépendance.
   À relancer si l'on change la palette : `node scripts/gen-icons.mjs`. */
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Palette
const BG = [146, 95, 49]; // accent #925f31
const FG = [255, 254, 252]; // cream #fffefc

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function pngRGBA(size, draw) {
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = draw(x, y);
      const o = (y * size + x) * 4;
      px[o] = r;
      px[o + 1] = g;
      px[o + 2] = b;
      px[o + 3] = a;
    }
  }
  // scanlines avec filtre 0
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// Rayon de coin arrondi pour un carré centré.
function makeDraw(size, { maskable = false } = {}) {
  const inner = maskable ? 0.5 : 0.46; // fraction du côté occupée par le carré
  const side = size * inner;
  const x0 = (size - side) / 2;
  const y0 = (size - side) / 2;
  const r = side * 0.28;
  return (x, y) => {
    // dans le carré arrondi ?
    const cx = Math.min(Math.max(x, x0 + r), x0 + side - r);
    const cy = Math.min(Math.max(y, y0 + r), y0 + side - r);
    const inSquare = x >= x0 && x <= x0 + side && y >= y0 && y <= y0 + side;
    const dist = Math.hypot(x - cx, y - cy);
    if (inSquare && dist <= r + 0.5) return [...FG, 255];
    return [...BG, 255];
  };
}

function write(path, buf) {
  const full = resolve(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, buf);
  console.log('écrit', path, `(${buf.length} o)`);
}

write('public/icons/icon-192.png', pngRGBA(192, makeDraw(192)));
write('public/icons/icon-512.png', pngRGBA(512, makeDraw(512)));
write('public/icons/icon-512-maskable.png', pngRGBA(512, makeDraw(512, { maskable: true })));
write('public/apple-touch-icon.png', pngRGBA(180, makeDraw(180)));

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#925f31"/>
  <rect x="9" y="9" width="14" height="14" rx="4" fill="#fffefc"/>
</svg>
`;
write('public/favicon.svg', Buffer.from(favicon, 'utf8'));

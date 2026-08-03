import {existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {dirname, extname, join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {imageSizeFromFile} from 'image-size/fromFile';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMG_DIR = join(ROOT, 'static', 'img');
const OUT_FILE = join(ROOT, 'src', 'data', 'image-sizes.json');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

function listFiles(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function toImageSrc(filePath) {
  const rel = relative(IMG_DIR, filePath).split(sep).join('/');
  return `/img/${rel}`;
}

const manifest = {};
let measured = 0;
let skipped = 0;

for (const filePath of listFiles(IMG_DIR)) {
  const ext = extname(filePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) {
    skipped += 1;
    continue;
  }

  try {
    const {width, height} = await imageSizeFromFile(filePath);
    if (!width || !height) {
      skipped += 1;
      console.warn(`[build-image-sizes] Pominieto bez wymiarow: ${filePath}`);
      continue;
    }
    manifest[toImageSrc(filePath)] = {w: width, h: height};
    measured += 1;
  } catch (error) {
    skipped += 1;
    console.warn(`[build-image-sizes] Nie udalo sie zmierzyc: ${filePath}`);
    console.warn(error.message);
  }
}

const sortedManifest = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);

mkdirSync(dirname(OUT_FILE), {recursive: true});
writeFileSync(OUT_FILE, JSON.stringify(sortedManifest, null, 2) + '\n');

console.log(`[build-image-sizes] OK: measured=${measured}, skipped=${skipped}`);

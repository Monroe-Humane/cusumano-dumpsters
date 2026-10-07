import type { ImageMetadata } from 'astro';

// Project photos live in src/assets/work/ so Astro can resize and compress them.
// site.json refers to them by file name only (e.g. "three-car-garage.jpg").
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*.{jpg,jpeg,png,webp}', { eager: true });

export function workPhoto(file: string): ImageMetadata {
  const hit = photos[`../assets/work/${file}`];
  if (!hit) throw new Error(`Photo not found: src/assets/work/${file} (check the name in src/data/site.json)`);
  return hit.default;
}

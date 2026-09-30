// Run after replacing source images. Only re-encodes/resizes; does not alter content.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
const files = [
  'projects/newstapri-clean.png',
  'projects/khajanchi-account-clean.png',
  'projects/khajanchi-login-clean.png',
  'projects/khajanchi-register-clean.png',
  'projects/achideal-mobile.jpg',
  'projects/achideal-shop.jpg',
  'Ankit.png',
];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  let original = 0,
    optimized = 0;
  for (const file of files) {
    const input = `public/${file}`;
    const output = input.replace(/\.(png|jpg)$/, '.webp');
    const data = readFileSync(input).toString('base64');
    const result = await page.evaluate(
      async ({ data, file }) => {
        const img = new Image();
        img.src = `data:image/${file.endsWith('.png') ? 'png' : 'jpeg'};base64,${data}`;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(img.width, 780);
        canvas.height = Math.round((img.height * canvas.width) / img.width);
        canvas
          .getContext('2d')
          .drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/webp', 0.88).split(',')[1];
      },
      { data, file },
    );
    writeFileSync(output, Buffer.from(result, 'base64'));
    original += statSync(input).size;
    optimized += statSync(output).size;
    console.log(output);
  }
  console.log(
    `Image bytes: ${original} → ${optimized} (${Math.round((1 - optimized / original) * 100)}% smaller)`,
  );
} finally {
  await browser.close();
}

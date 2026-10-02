import fs from 'node:fs/promises';
import QRCode from 'qrcode';
import presentations from '../src/data/presentations.js';
for (const item of presentations) {
  const path = `dist/docks/${item.slug}`;
  await fs.mkdir(path, { recursive: true });
  const url = `https://fernandoparreiras.com.br/docks/${item.slug}/?utm_source=${item.eventId}&utm_medium=qr&utm_campaign=${item.eventId}`;
  await QRCode.toFile(`${path}/qr.png`, url, { width: 1024, margin: 4, errorCorrectionLevel: 'M' });
}
console.log(`QR codes Docks: ${presentations.length}.`);

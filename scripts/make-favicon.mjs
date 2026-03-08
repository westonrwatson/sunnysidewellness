import toIco from 'to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const png = readFileSync(join(__dirname, '../public/favicon.png'));
const ico = await toIco([png]);
writeFileSync(join(__dirname, '../public/favicon.ico'), ico);
console.log('Created public/favicon.ico');

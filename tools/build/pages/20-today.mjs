// 落地頁 today/index.html：今日這條（讀 data/today.json）＋情境入口＋搜尋框。來源 tools/build/src/today.html。
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteUrl } from '../lib/helpers.mjs';

export async function build(ctx) {
  const raw = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'today.html'), 'utf8');
  const m = /^<!--meta (\{.*\}) -->\n/.exec(raw), cut = raw.indexOf('<!--script-->\n');
  if (!m || cut < 0) throw new Error('src/today.html 格式錯誤（需要 <!--meta {...} --> 與 <!--script-->）');
  const meta = JSON.parse(m[1]);
  ctx.writeFile('today/index.html', ctx.layout({
    title: '今日這條', description: meta.description,
    body: raw.slice(m[0].length, cut).replace(/\n$/, ''),
    depth: 1, canonical: siteUrl('today/'),
    scripts: raw.slice(cut + '<!--script-->\n'.length).replace(/\n$/, '')
  }));
  ctx.addUrl('today/', { priority: '0.8' });
}

// 試算頁：calc/severance.html、overtime.html、leave.html，加上試算入口 calc/index.html。
// 來源在 tools/build/src/calc/<slug>.html：第一行 <!--meta {json} -->，接著是 <main> 內的 HTML，
// 最後 <!--script--> 之後是計算腳本。腳本一個字都不改、原樣輸出（計算結果關乎法律金額）；verify-site.mjs 會拿 git HEAD 的舊檔比對雜湊。
// 要新增試算器：在 src/calc/ 放一個同格式的檔，並把 slug 加進下面的 CALCS。
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, siteUrl } from '../lib/helpers.mjs';

const CALCS = [
  { slug: 'severance', blurb: '輸入到職日、離職日和月薪，試算新制、舊制資遣費與預告工資' },
  { slug: 'overtime', blurb: '平日、休息日、國定假日的加班費怎麼算' },
  { slug: 'leave', blurb: '輸入到職日，看現在有幾天特休、沒休完折算多少工資' }
];

export async function build(ctx) {
  const src = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'calc');
  const cards = [];
  for (const { slug, blurb } of CALCS) {
    const raw = readFileSync(join(src, slug + '.html'), 'utf8');
    const m = /^<!--meta (\{.*\}) -->\n/.exec(raw);
    if (!m) throw new Error(`src/calc/${slug}.html 缺 <!--meta {...} --> 第一行`);
    const meta = JSON.parse(m[1]);
    const cut = raw.indexOf('<!--script-->\n');
    if (cut < 0) throw new Error(`src/calc/${slug}.html 缺 <!--script--> 標記`);
    const body = raw.slice(m[0].length, cut).replace(/\n$/, '');
    const script = raw.slice(cut + '<!--script-->\n'.length).replace(/\n$/, '');
    ctx.writeFile(`calc/${slug}.html`, ctx.layout({
      title: meta.title, description: meta.description, ogDescription: meta.ogDescription,
      body, depth: 1, canonical: siteUrl(`calc/${slug}.html`), active: 'calc',
      mainClass: 'doc calc', css: ['assets/calc.css'],
      siteJs: false,        // 計算腳本自帶主題切換處理，不再載 site.js，免得點一下切換兩次
      scripts: script
    }));
    ctx.addUrl(`calc/${slug}.html`, { priority: '0.8' });
    cards.push(`<li><a class="tile" href="${slug}.html"><b>${esc(meta.name)}試算</b><small>${esc(blurb)}</small></a></li>`);
  }
  const body = `<nav class="crumb" aria-label="導覽"><a href="../">台灣生存包</a> › 試算</nav>
<h1>試算</h1>
<p class="lead">輸入幾個數字，馬上看到法定最低的金額與天數。每個結果附法條與算式，計算全在你的瀏覽器裡完成，不收集你輸入的資料。</p>
<ul class="tiles">
${cards.join('\n')}
</ul>`;
  ctx.writeFile('calc/index.html', ctx.layout({
    title: '試算：資遣費、加班費、特休', description: '資遣費、加班費、特別休假三個試算器，每個結果附勞動法規條號與算式，計算全在瀏覽器完成。',
    body, depth: 1, canonical: siteUrl('calc/'), active: 'calc'
  }));
  ctx.addUrl('calc/', { priority: '0.8' });
}

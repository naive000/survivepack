// 建置產物驗證：npm run verify（先 npm run build）。任何一項失敗就 exit 1。只用 node 內建模組、只讀本機檔案與 git HEAD，不連網。
//  (a) 每個 e/ 頁含核實日期、免責聲明、assets/site.css 連結
//  (b) 沒有外部字型、外部腳本、追蹤碼（唯一例外：Cloudflare Web Analytics 官方 snippet，只限首頁與 e/ 頁，token 為空時全站不得出現 cloudflareinsights）
//  (c) 待專業審核條目（docs/needs-professional-review.md）的頁面都有徽章與橫幅
//  (d) 電話號碼樣式字串只能是 docs/hotlines.md 白名單，或建置前 git HEAD 同一頁已有的
//  (e) calc 計算腳本與 git HEAD 逐字相同（雜湊比對）
//  (f) 大小統計與預算（e/ 平均 ≤ 12 KB、首頁首載 ≤ 400 KB）
//  (g) 手機版面：CSS 沒有固定寬度超過 360px 的元素
//  (h) 首頁搜尋與篩選：index.json／search.json／home.js 的結果與直接用 book/ 算的一致
//  另外：站內相對連結都指得到檔案、沒有寫死絕對路徑、沒有 "Inter" 字型與母專案色票、無斜體。
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { loadBook } from './lib/entry.mjs';
import { SHOW_PATHS, SITE, cfBeaconToken } from './lib/helpers.mjs';   // 與 build 同一個旗標：SHOW_PATHS=0 npm run verify 驗公開匯出版（沒有 s/、沒有任何指向 s/ 的連結）

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = p => readFileSync(join(root, p), 'utf8');
const failures = [], warnings = [];
let section = '';
const fail = m => failures.push(`[${section}] ${m}`);
const warn = m => warnings.push(`[${section}] ${m}`);
const ok = (name, detail = '') => console.log(`  ${failures.some(f => f.startsWith(`[${name}]`)) ? 'x' : 'ok'}  ${name}${detail ? '  ' + detail : ''}`);
const kb = n => (n / 1024).toFixed(1) + ' KB';

// RTK 的 git 包裝會截斷輸出，這裡直接用系統的 git
const GIT = ['/usr/bin/git', '/bin/git', '/usr/local/bin/git'].find(existsSync) || 'git';
const git = (args, input) => spawnSync(GIT, args, { cwd: root, input, maxBuffer: 512 * 1024 * 1024 });
const headFiles = prefix => git(['ls-tree', '-r', '--name-only', 'HEAD', prefix]).stdout.toString('utf8').split('\n').filter(Boolean);
// 一次讀多個 HEAD 檔案（git cat-file --batch）
function headBlobs(paths) {
  const r = git(['cat-file', '--batch'], paths.map(p => `HEAD:${p}`).join('\n') + '\n');
  const buf = r.stdout, out = new Map(); let pos = 0;
  for (const p of paths) {
    const nl = buf.indexOf(10, pos); const head = buf.slice(pos, nl).toString('utf8'); pos = nl + 1;
    const m = /^[0-9a-f]+ blob (\d+)$/.exec(head);
    if (!m) { out.set(p, null); continue; }
    const size = +m[1]; out.set(p, buf.slice(pos, pos + size).toString('utf8')); pos += size + 1;
  }
  return out;
}

/* ---------- 讀取產物 ---------- */
function walkHtml(dir, acc = []) {
  for (const n of readdirSync(join(root, dir), { withFileTypes: true })) {
    const p = posix.join(dir, n.name);
    if (n.isDirectory()) { if (!['book', 'drafts', 'docs', 'data', 'tools', 'node_modules', '.git', '.claude', '.github-public'].includes(n.name)) walkHtml(p, acc); }
    else if (n.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}
const htmlFiles = [...walkHtml('.').map(p => p.replace(/^\.\//, ''))].sort();
const entryPages = htmlFiles.filter(p => /^e\/[^/]+\/index\.html$/.test(p));
const pages = new Map(htmlFiles.map(p => [p, read(p)]));
const F = createRequire(import.meta.url)(join(root, 'assets/home.js'));
const index = F.expand(JSON.parse(read('assets/index.json')));   // 磁碟格式 v2 → 展開成 buildIndex() 的形狀
const DISCLAIMER = '本站為一般資訊整理，不構成法律或醫療建議，個案請洽專業人員。';

console.log(`驗證 ${htmlFiles.length} 個 HTML（e/ ${entryPages.length} 頁），HEAD ${git(['rev-parse', '--short', 'HEAD']).stdout.toString().trim()}`);

/* ---------- (a) e/ 頁基本內容 ---------- */
section = 'a';
if (entryPages.length !== index.count) fail(`e/ 頁數 ${entryPages.length} 與 index.json 的 ${index.count} 不符`);
for (const p of entryPages) {
  const h = pages.get(p);
  if (!/<dt>核實日期<\/dt><dd><time datetime="\d{4}-\d{2}-\d{2}">\d{4}-\d{2}-\d{2}<\/time>/.test(h)) fail(`${p} 沒有核實日期`);
  if (!h.includes(DISCLAIMER)) fail(`${p} 沒有免責聲明`);
  if (!/<link rel="stylesheet" href="\.\.\/\.\.\/assets\/site\.css">/.test(h)) fail(`${p} 沒有連到 assets/site.css`);
  if (/<style[\s>]/.test(h)) fail(`${p} 仍有內嵌 <style>`);
  if (!h.includes('application/ld+json') || !h.includes('"FAQPage"') || !h.includes('property="og:title"')) fail(`${p} 缺 OG 或 FAQ 結構化資料`);
  if (!/<nav class="toolbar"/.test(h)) fail(`${p} 沒有底部工具列`);
  const rid = p.split('/')[1];
  const rm = h.match(/<a class="btn ghost report" rel="noopener" href="(https:\/\/github\.com\/naive000\/survivepack\/issues\/new\?[^"]*)">回報錯誤<\/a>/);
  if (!rm) fail(`${p} 沒有回報錯誤連結`);
  else if (!rm[1].includes('template=' + encodeURIComponent('1-糾錯.yml')) || decodeURIComponent(rm[1].replace(/&amp;/g, '&').split('entry=')[1] || '') !== rid) fail(`${p} 回報連結缺範本或條目 id ${rid}`);
}
for (const p of ['index.html', 'today/index.html', 'calc/index.html', 'calc/severance.html', 'calc/overtime.html', 'calc/leave.html']) {
  const h = pages.get(p);
  if (!h) { fail(`缺 ${p}`); continue; }
  if (!h.includes(DISCLAIMER)) fail(`${p} 沒有免責聲明`);
  if (!/assets\/site\.css/.test(h)) fail(`${p} 沒有連到 assets/site.css`);
  if (!/<nav class="toolbar"/.test(h)) fail(`${p} 沒有底部工具列`);
}
ok('a');

/* ---------- (b) 外部資源 ---------- */
section = 'b';
const BANNED = /googleapis|gstatic|googletagmanager|google-analytics|cloudflareinsights|plausible|fonts\.|typekit|fontawesome|jsdelivr|unpkg|cdnjs|\bcdn\b|cdn\./i;
const assetFiles = readdirSync(join(root, 'assets')).filter(n => /\.(css|js)$/.test(n)).map(n => 'assets/' + n);
// 窄例外：Cloudflare Web Analytics 官方 snippet，字串必須完全相同（src 正好是下列網址，屬性只有 defer 與 data-cf-beacon），
// 且只能出現在首頁與 e/ 條目頁、每頁至多一個。其餘外部 script、plausible、其他網域照樣擋。
const BEACON_RE = /<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js" data-cf-beacon='\{"token": "([A-Za-z0-9]{16,64})"\}'><\/script>\n?/g;
const beaconAllowed = p => p === 'index.html' || /^e\/[^/]+\/index\.html$/.test(p);
const stripBeacon = (p, h) => {
  const found = [...h.matchAll(BEACON_RE)];
  if (!found.length) return h;
  if (!beaconAllowed(p)) fail(`${p} 不該有統計碼（只允許首頁與 e/ 頁）`);
  else if (found.length > 1) fail(`${p} 統計碼出現 ${found.length} 次`);
  else if (!cfBeaconToken) fail(`${p} 有統計碼，但建置設定 cfBeaconToken 為空`);
  else if (found[0][1] !== cfBeaconToken) fail(`${p} 統計碼的 token 與建置設定不符`);
  return h.replace(BEACON_RE, '');
};
let beaconPages = 0;
for (const [p, h0] of pages) {
  const h = stripBeacon(p, h0);
  if (h !== h0) beaconPages++;
  // 資源型標籤的 src/href 不得是外部網址（<a> 與 canonical 例外）
  for (const m of h.matchAll(/<(script|img|iframe|source|video|audio|embed|object|link)\b([^>]*)>/g)) {
    const tag = m[1], attrs = m[2];
    const u = /\b(?:src|href|data)="([^"]*)"/.exec(attrs);
    if (!u) continue;
    if (tag === 'link' && /rel="(canonical|alternate)"/.test(attrs)) continue;
    if (/^(?:https?:)?\/\//i.test(u[1])) fail(`${p} 載入外部資源 <${tag}> ${u[1]}`);
  }
  // 只掃標籤屬性與 <script>/<style> 內容；正文文字（條目內容）可能自然出現 cdn. 之類的字串
  const noLd = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const code = [...noLd.matchAll(/<(script|style)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(x => x[2]).join('\n');
  const markup = noLd.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '').match(/<[^>]+>/g).filter(t => !/^<a\s/.test(t)).join('\n');
  const hit = BANNED.exec(code + '\n' + markup);
  if (hit) fail(`${p} 出現外部資源關鍵字 "${hit[0]}"`);
  if (/@import|url\(\s*["']?(?:https?:)?\/\//i.test(h)) fail(`${p} 內嵌 CSS 有 @import 或外部 url()`);
  if (/\bInter\b/.test(code + '\n' + markup)) fail(`${p} 出現 Inter`);
}
// 自測：token 為空 → 任何產物（html、assets、llms、sitemap、feed）都不得出現 cloudflareinsights；有 token → 首頁與每個 e/ 頁都要有
if (!cfBeaconToken) {
  for (const [p, h] of pages) if (/cloudflareinsights/i.test(h)) fail(`cfBeaconToken 為空，但 ${p} 出現 cloudflareinsights`);
  for (const f of ['llms.txt', 'llms-full.txt', 'sitemap.xml', 'feed.xml', ...assetFiles]) if (/cloudflareinsights/i.test(read(f))) fail(`cfBeaconToken 為空，但 ${f} 出現 cloudflareinsights`);
  if (beaconPages) fail('cfBeaconToken 為空，但仍輸出了統計碼');
} else {
  const want = ['index.html', ...entryPages];
  for (const p of want) if (!new RegExp(BEACON_RE.source).test(pages.get(p))) fail(`${p} 缺統計碼（cfBeaconToken 已設）`);
  if (beaconPages !== want.length) fail(`統計碼頁數 ${beaconPages} ≠ 預期 ${want.length}（首頁＋e/）`);
}
for (const f of assetFiles) {
  const t = read(f);
  if (/@import|url\(\s*["']?(?:https?:)?\/\//i.test(t)) fail(`${f} 有 @import 或外部 url()`);
  if (BANNED.test(t)) fail(`${f} 出現外部資源關鍵字 ${BANNED.exec(t)[0]}`);
  if (/\bInter\b/.test(t)) fail(`${f} 出現 Inter`);
  if (/--bg:\s*#1b1b1f/i.test(t)) fail(`${f} 還有母專案色票 --bg:#1b1b1f`);
  if (/fetch\(\s*['"`]https?:|XMLHttpRequest|sendBeacon|new Image\(\)/.test(t)) fail(`${f} 有對外請求的程式碼`);
  if (f.endsWith('.css') && /font-style:\s*italic/.test(t)) fail(`${f} 用了斜體`);
}
// 內嵌 script（calc、today）也不得對外請求
for (const [p, h] of pages) for (const m of h.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  if (/fetch\(\s*['"`]https?:|XMLHttpRequest|sendBeacon|document\.write/.test(m[1])) fail(`${p} 內嵌 script 有對外請求`);
}
const siteCss = read('assets/site.css');
if (!/line-break:\s*strict/.test(siteCss) || !/text-wrap:\s*pretty/.test(siteCss) || !/font:\s*17px\/1\.8/.test(siteCss) || !/tabular-nums/.test(siteCss)) fail('site.css 缺 17px/1.8、line-break:strict、text-wrap:pretty 或 tabular-nums');
if (!/prefers-color-scheme:\s*dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)/.test(siteCss) || !/:root\[data-theme="dark"\]/.test(siteCss)) fail('site.css 缺深色模式的兩處選擇器');
ok('b', cfBeaconToken ? `統計碼已啟用，${beaconPages} 頁（首頁＋e/）` : '統計碼未啟用（cfBeaconToken 為空）');

/* ---------- (c) 待專業審核 ---------- */
section = 'c';
const reviewMd = existsSync(join(root, 'docs/needs-professional-review.md')) ? read('docs/needs-professional-review.md') : (warn('docs/needs-professional-review.md 不存在（公開 repo 不含），只用條目本身的標記檢查'), '');
const reviewIds = new Set();
{
  let cur = '';
  for (const line of reviewMd.split('\n')) {
    if (/^## /.test(line)) cur = line;
    const m = /^\|\s*(tw-[a-z0-9-]+)\s*\|/.exec(line);
    if (m && /^## (高|中|低)風險/.test(cur)) reviewIds.add(m[1]);
  }
}
for (const e of index.entries) if (e.review) reviewIds.add(e.id);   // review＝任何欄位含「待專業審核」（首頁篩選與 e/ 橫幅同一口徑）
let reviewChecked = 0;
for (const id of reviewIds) {
  const p = `e/${id}/index.html`, h = pages.get(p);
  if (!h) { fail(`${id} 在待審清單但沒有 ${p}`); continue; }
  reviewChecked++;
  if (!/<span class="badge review"[^>]*>待專業審核<\/span>/.test(h)) fail(`${p} 缺待專業審核徽章`);
  if (!/<div class="review" role="note">/.test(h)) fail(`${p} 缺待專業審核橫幅`);
}
for (const p of entryPages) {   // 反向：沒被標的頁面不該出現橫幅
  const id = p.split('/')[1];
  if (!reviewIds.has(id) && /<div class="review" role="note">/.test(pages.get(p))) fail(`${p} 不在待審清單卻有橫幅`);
}
ok('c', `${reviewChecked} 頁（待審清單 + 條目任何欄位含「待專業審核」）`);

/* ---------- (d) 電話號碼 ---------- */
section = 'd';
const PHONE_RES = [
  /\(0\d{1,2}\)\s*\d{3,4}[- ]?\d{3,4}/g,
  /(?<![\d-])0\d{1,2}-\d{3,4}-?\d{3,4}(?![\d])/g,
  /(?<![\d-])0800-?\d{3}-?\d{3}(?![\d])/g,
  /(?<![\d,.\-A-Za-z])1\d{2,3}(?![\d,.%年月日元萬]|\s*(?:[指人名期例起件筆次位(]|分鐘|mg|至\s*\d+\s*mg))/g,   // 2026-11-09：後接計量單位（指、人、名、期、例、起、件、筆、次）或期刊卷號括號的數字不是電話；2026-11-10 再加計量單位：位、分鐘、mg，以及「100 至 125 mg/dL」這類範圍起點；只放行「分鐘」，不放行單獨的「分」（避免漏掉「1955 分機」「1955 分局」，2026-11-10 Opus 複驗）
  /(?<![\d,.\-])\d{4}-\d{3,4}(?![\d])/g
];
const visible = h => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/&[a-z]+;/g, ' ')
  .replace(/第[\d\s、,，\-~～至及和或與之]+(?:條|項|款|目|章|節|編|號)/g, ' ').replace(/§\s*[\d-]+/g, ' ');   // 法條序號（第 1148 條、第 100-1 條、第 8、9 條、第 2 項）不是電話
const phonesOf = h => { const s = new Set(); const t = visible(h); for (const re of PHONE_RES) for (const m of t.matchAll(re)) s.add(m[0].replace(/\D/g, '')); return s; };
const white = phonesOf(read('docs/hotlines.md'));
['41286', '4128678', '0241286', '0224128678'].forEach(x => white.add(x));
const headHtml = headBlobs([...pages.keys()].filter(p => p === 'index.html' || p === 'today/index.html' || p.startsWith('e/') || p.startsWith('calc/')));
let newPhones = 0, phonePages = 0;
for (const [p, h] of pages) {
  const now = phonesOf(h), old = headHtml.get(p) ? phonesOf(headHtml.get(p)) : new Set();
  if (now.size) phonePages++;
  for (const n of now) if (!old.has(n) && !white.has(n)) { newPhones++; fail(`${p} 新出現不在白名單也不在 HEAD 版本的號碼樣式：${n}`); }
}
ok('d', `${phonePages} 頁含號碼樣式字串，新增且非白名單 ${newPhones} 個`);

/* ---------- (e) calc 腳本雜湊 ---------- */
section = 'e';
const lastScript = h => { const i = h.lastIndexOf('<script>'); const j = h.indexOf('</script>', i); return i < 0 ? null : h.slice(i + 8, j); };
const sha = s => createHash('sha256').update(s).digest('hex').slice(0, 16);
const calcHashes = [];
for (const f of headFiles('calc/').filter(f => f.endsWith('.html') && f !== 'calc/index.html')) {
  const old = git(['show', `HEAD:${f}`]).stdout.toString('utf8'), now = pages.get(f);
  if (!now) { fail(`${f} 在 HEAD 有，現在沒有`); continue; }
  // HEAD 版與新版各取「最後一個 <script>」（計算腳本）；HEAD 若已是新版格式，最後一個一樣是計算腳本
  const a = lastScript(old), b = lastScript(now);
  if (a === null || b === null || a !== b) fail(`${f} 計算腳本與 HEAD 不同（${a && sha(a)} vs ${b && sha(b)}）`);
  else calcHashes.push(`${f.replace('calc/', '')} ${sha(a)}`);
}
if (calcHashes.length < 3) fail(`只比對到 ${calcHashes.length} 個 calc 檔（應為 3）`);
ok('e', calcHashes.join('；'));

/* ---------- (f) 大小 ---------- */
section = 'f';
const sz = p => statSync(join(root, p)).size;
const gz = p => gzipSync(readFileSync(join(root, p))).length;
const eSizes = entryPages.map(p => Buffer.byteLength(pages.get(p)));
const eAvg = eSizes.reduce((a, b) => a + b, 0) / eSizes.length;
const first = ['index.html', 'assets/site.css', 'assets/home.css', 'assets/home.js', 'assets/site.js', 'assets/favicon.svg', 'assets/index.json'];
const firstRaw = first.reduce((a, p) => a + sz(p), 0), firstGz = first.reduce((a, p) => a + gz(p), 0);
const assetsRaw = readdirSync(join(root, 'assets')).reduce((a, n) => a + sz('assets/' + n), 0);
console.log(`  e/ 平均 ${kb(eAvg)}（最大 ${kb(Math.max(...eSizes))}，最小 ${kb(Math.min(...eSizes))}；舊版平均約 25.4 KB）`);
console.log(`  首頁首載 ${kb(firstRaw)} 未壓縮 / ${kb(firstGz)} gzip（${first.map(p => p.replace('assets/', '')).join(' + ')}）`);
console.log(`  延後載入 search.json ${kb(sz('assets/search.json'))} / ${kb(gz('assets/search.json'))} gzip；assets 全部 ${kb(assetsRaw)}`);
console.log(`  今日 ${kb(sz('today/index.html'))}、calc ${['index', 'severance', 'overtime', 'leave'].map(n => `${n} ${kb(sz(`calc/${n}.html`))}`).join('、')}`);
if (eAvg > 12 * 1024) fail(`e/ 平均 ${kb(eAvg)} 超過 12 KB`);
if (firstRaw > 400 * 1024) fail(`首頁首載未壓縮 ${kb(firstRaw)} 超過 400 KB`);
ok('f');

/* ---------- (g) 手機版面（CSS 靜態檢查） ---------- */
section = 'g';
function fixedWidths(css, file) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const stack = [], re = /([^{}]*)\{|\}/g; let m;
  while ((m = re.exec(css))) {
    if (m[0] === '}') {
      const blk = stack.pop();
      if (!blk.at && !stack.some(b => b.skip) && !blk.skip) check(blk.sel, css.slice(blk.from, m.index));
      continue;
    }
    const sel = m[1].trim(), at = sel.startsWith('@');
    stack.push({ sel, at, from: re.lastIndex, skip: at && /min-width\s*:/.test(sel) });   // min-width 媒體查詢只在大螢幕生效，不算手機版面
  }
  function check(sel, decls) {
    for (const d of decls.split(';')) {
      const m = /^\s*(width|min-width|flex-basis)\s*:\s*(.+?)\s*$/.exec(d); if (!m) continue;
      const v = m[2];
      if (/min\(|max\(|clamp\(|calc\(|%|vw|auto|inherit/.test(v)) continue;
      const px = /^(-?[\d.]+)px$/.exec(v), rem = /^(-?[\d.]+)rem$/.exec(v);
      const n = px ? +px[1] : rem ? +rem[1] * 16 : null;
      if (n !== null && n > 360) fail(`${file} ${sel} { ${m[1]}:${v} } 超過 360px`);
    }
  }
}
for (const f of assetFiles.filter(f => f.endsWith('.css'))) fixedWidths(read(f), f);
const tapSmall = [];
for (const f of assetFiles.filter(f => f.endsWith('.css'))) {   // 提醒：可點元素宣告了 <44px 的高度
  for (const m of read(f).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!m[1].split(',').some(sel => /(^|\s)(button|\.chip|\.btn|\.share|\.theme-btn|\.menu-btn|\.hsearch|\.sec-link|\.reset)(:[a-z-]+)*$/.test(sel.trim()) || /\.toolbar a$/.test(sel.trim()))) continue;
    const h = /(?<!line-)(?<!max-)(?<!min-)height:\s*(\d+)px/.exec(m[2]);
    if (h && +h[1] < 44) tapSmall.push(`${f} ${m[1].trim()} height:${h[1]}px`);
  }
}
if (tapSmall.length) for (const t of tapSmall) fail(`可點元素高度小於 44px：${t}`);
for (const [p, h] of pages) if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/.test(h) || !/<html lang="zh-TW">/.test(h)) fail(`${p} 缺 viewport 或 lang`);
ok('g');

/* ---------- 站內連結、絕對路徑 ---------- */
section = 'links';
const EXPECTED_MISSING = new Set(['changes/', 'book/']);   // changes/：工具列已放連結，頁面由下一階段補；book/：舊首頁就有的連結（指到倉庫的 Markdown 目錄，Pages 上沒有索引頁）
const sPending = SHOW_PATHS && !existsSync(join(root, 's/index.html'));   // 首頁情境入口連到 s/；情境頁模組還沒建好之前只警告，建好之後就嚴格檢查
const missing = new Set();
for (const [p, h] of pages) {
  if (/\b(?:href|src|action)="\/(?!\/)/.test(h)) fail(`${p} 有寫死的絕對路徑（以 / 開頭）`);
  const dir = posix.dirname(p);
  for (const m of h.matchAll(/\b(?:href|src)="([^"#?]*)(?:[#?][^"]*)?"/g)) {
    const u = m[1]; if (!u || /^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//')) continue;
    const target = posix.normalize(posix.join(dir, u));
    const isDir = u.endsWith('/') || u === '.' || u === '..' || u.endsWith('/..');
    const full = join(root, target);
    const okTarget = isDir ? existsSync(join(full, 'index.html')) : existsSync(full);
    if (!okTarget) {
      const key = target.replace(/\/?$/, '/');
      if (EXPECTED_MISSING.has(key) || (sPending && /^s\//.test(key))) missing.add(key); else fail(`${p} 的連結 ${u} 指到不存在的 ${target}`);
    }
  }
}
for (const k of missing) warn(`${k} 尚未建立（預期：changes/ 下一階段補；book/ 是舊首頁就有的倉庫目錄連結）`);
{   // 站內產生的 ?sec= 連結一律用章節 slug（數字有 0 起算與顯示 1 起算兩種讀法，產生的連結不使用；舊的 0 起算數字連結由 home.js 的 resolveSec 相容）
  const slugs = new Set(index.secs.map(x => x.slug));
  let secLinks = 0;
  for (const [p, h] of pages) for (const m of h.matchAll(/\bhref="[^"]*\?sec=([^"&#]*)/g)) { secLinks++; if (!slugs.has(m[1])) fail(`${p} 的 ?sec=${m[1]} 不是章節 slug`); }
  if (!secLinks) fail('找不到任何 ?sec= 章節連結（e/ 頁的章節連結不見了？）');
}
if (!SHOW_PATHS) {   // 公開匯出版：s/ 不存在，也沒有任何連結（頁面、sitemap、feed、llms）指向它
  if (existsSync(join(root, 's'))) fail('SHOW_PATHS=0 但 s/ 目錄還在');
  const isS = t => t === 's' || t.startsWith('s/');
  for (const [p, h] of pages) for (const m of h.matchAll(/\bhref="([^"#?]*)/g)) {
    const u = m[1]; let t;
    if (u.startsWith(SITE)) t = u.slice(SITE.length);
    else if (!u || /^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//') || u.startsWith('/')) continue;
    else t = posix.normalize(posix.join(posix.dirname(p), u));
    if (isS(t)) fail(`${p} 有指向 s/ 的連結：${u}`);
  }
  for (const f of ['sitemap.xml', 'feed.xml', 'llms.txt', 'llms-full.txt']) if (existsSync(join(root, f)) && read(f).includes(SITE + 's/')) fail(`${f} 有 s/ 網址`);
}
const sitemap = read('sitemap.xml');
if ((sitemap.match(/<loc>/g) || []).length < 1 + index.count) fail('sitemap.xml 網址數不足');
ok('links');

/* ---------- (h) 首頁搜尋與篩選 ---------- */
section = 'h';
{
  const search = JSON.parse(read('assets/search.json')).text;
  const secs = loadBook(join(root, 'book'));
  const ref = secs.flatMap(s => s.entries.map(e => ({
    sec: s.index, ratio: e.ratio, lens: e.lens, grade: e.grade, money: e.money, time: e.time, will: e.will, dispute: e.dispute, review: [e.title, e.cost, e.human, e.gain, e.proc, e.note].some(t => t.includes('待專業審核')),
    hay: [e.title, e.human, e.cost, e.gain, e.proc, e.note, e.src, e.grade, e.meta['法源條號'] || ''].join('\n').replace(/\*\*/g, '').toLowerCase()
  })));
  if (ref.length !== index.entries.length) fail(`book/ ${ref.length} 條，index.json ${index.entries.length} 條`);
  const cases = [
    ['搜尋「資遣」', { q: '資遣' }], ['搜尋「加班 職災」（兩詞皆要命中）', { q: '加班 職災' }], ['搜尋「詐騙」', { q: '詐騙' }],
    ['性價比「極高」', { ratio: ['極高'] }], ['性價比「極高」或「高」', { ratio: ['極高', '高'] }], ['只看待專業審核', { review: ['only'] }], ['隱藏待專業審核', { review: ['hide'] }],
    ['口徑「金錢」＋花錢「0」＋證據「A」', { lens: ['金錢'], money: ['0'], grade: ['A'] }], ['只看爭議', { dispute: true }],
    ['章節 4＋搜尋「資遣」', { sec: '4', q: '資遣' }], ['搜尋「LAW.MOJ」（大小寫不拘）', { q: 'LAW.MOJ' }]
  ];
  const report = [];
  // 直接用 book/ 的欄位算；第二個參數是章節條件（''＝不含章節條件，用來算側欄各節數字）
  const wantOf = (st, sec = st.sec) => {
    const terms = F.terms(st.q);
    return ref.map(r => {
      if (sec !== '' && String(r.sec) !== sec) return false;
      if (st.ratio.size && !st.ratio.has(r.ratio)) return false; if (st.lens.size && !st.lens.has(r.lens)) return false;
      if (st.grade.size && !st.grade.has(r.grade)) return false; if (st.money.size && !st.money.has(r.money)) return false;
      if (st.time.size && !st.time.has(r.time)) return false; if (st.will.size && !st.will.has(r.will)) return false;
      if (st.dispute && !r.dispute) return false;
      if (st.review.has('only') && !r.review) return false; if (st.review.has('hide') && r.review) return false;
      return terms.every(t => r.hay.includes(t));
    });
  };
  const sum = a => a.filter(Boolean).length;
  for (const [name, c] of cases) {
    const st = F.newState();
    for (const [k, v] of Object.entries(c)) st[k] = Array.isArray(v) ? new Set(v) : v;
    const got = index.entries.filter(e => F.match(e, st, search[e.id])).length;
    const want = sum(wantOf(st));
    if (got !== want) fail(`${name}：首頁 ${got} 條，直接算 book/ 是 ${want} 條`);
    report.push(`${name}=${got}`);
  }
  // 側欄篩選欄：sec 用 slug 或數字、多組合、網址往返、各節數字（不含章節條件）
  const bySlug = Object.fromEntries(index.secs.map((s, i) => [s.slug, String(i)]));
  const same = (a, b) => ['q', 'sec', 'dispute'].every(k => a[k] === b[k]) && F.DIMS.every(d => [...a[d]].join() === [...b[d]].join());
  const urlCases = [
    ['?sec=labor&ratio=極高,高&q=資遣', ['?sec=4&ratio=極高,高&q=資遣']],   // slug 與舊的純數字連結結果相同
    ['?sec=labor', ['?sec=4']], ['?sec=health', ['?sec=0']], ['?sec=startup', ['?sec=15']],
    ['?sec=scam&lens=金錢,自由&money=0,少&grade=A,B&time=少&will=否&dispute=1', []],
    ['?sec=nhi&review=only', []], ['?review=hide&ratio=一般&q=詐騙', []], ['?sec=disability&grade=A,B,C', []],
    ['?lens=死亡率,健康&will=否,些&money=0', []], ['?sec=rent&q=押金 租約&time=少,中&dispute=1&review=hide', []],
    ['?sec=nope', []], ['?sec=99', []], ['', []]
  ];
  for (const [qs, alts] of urlCases) {
    const st = F.readParams(qs, index.secs);
    const exp = new URLSearchParams(qs).get('sec');
    if (exp && bySlug[exp] !== undefined && st.sec !== bySlug[exp]) fail(`${qs} 的 sec 應解析為 ${bySlug[exp]}，得 ${JSON.stringify(st.sec)}`);
    if (exp && bySlug[exp] === undefined && st.sec !== '') fail(`${qs} 不認得的 sec 應當成沒選，得 ${JSON.stringify(st.sec)}`);
    const t = F.tally(index.entries, st, search);
    const want = wantOf(st), wantAll = wantOf(st, '');
    if (t.shown !== sum(want)) fail(`${qs}：tally 顯示 ${t.shown} 條，直接算 ${sum(want)} 條`);
    if (t.shown !== index.entries.filter(e => F.match(e, st, search[e.id])).length) fail(`${qs}：tally 與 match 結果數不同`);
    if (t.matched !== sum(wantAll)) fail(`${qs}：側欄「全部章節」數字 ${t.matched}，直接算（不含章節條件）${sum(wantAll)}`);
    index.secs.forEach((s, i) => {   // 各節數字＝不含章節條件的命中數；節標題旁的 k／總數＝再加章節條件
      const wantI = ref.reduce((n, r, j) => n + (r.sec === i && wantAll[j] ? 1 : 0), 0);
      if ((t.tocSec[i] || 0) !== wantI) fail(`${qs}：${s.slug} 側欄數字 ${t.tocSec[i] || 0}，直接算 ${wantI}`);
      if ((t.perSec[i] || 0) !== (st.sec === '' || st.sec === String(i) ? wantI : 0)) fail(`${qs}：${s.slug} 節內數字不對`);
    });
    for (const alt of alts) {
      const st2 = F.readParams(alt, index.secs);
      if (!same(st, st2)) fail(`${qs} 與 ${alt} 解析結果不同`);
      if (F.tally(index.entries, st2, search).shown !== t.shown) fail(`${qs} 與 ${alt} 結果數不同`);
    }
    const out = F.toQuery(st, index.secs), back = F.readParams(out, index.secs);   // URL 往返
    if (!same(st, back) || F.toQuery(back, index.secs) !== out) fail(`${qs} 網址往返不一致：${out}`);
    if (st.sec !== '' && !new RegExp(`(^|&)sec=${index.secs[+st.sec].slug}(&|$)`).test(out)) fail(`${qs} 輸出的網址沒有用 slug：${out}`);
    report.push(`${qs || '（空）'}=${t.shown}`);
  }
  // 首頁結構：情境入口（data/paths.json 的每個情境一塊磚，連到 s/<id>/）、側欄、篩選鈕、noscript、MIT 改編聲明
  {
    const home = pages.get('index.html'), paths = SHOW_PATHS && existsSync(join(root, 'data/paths.json')) ? JSON.parse(read('data/paths.json')).scenarios : [];
    const tiles = [...home.matchAll(/<a class="tile" href="(s\/[^"]+\/)"/g)].map(m => m[1]);
    if (!/<h2 id="paths-t">你現在遇到什麼事？<\/h2>/.test(home) && paths.length) fail('首頁缺「你現在遇到什麼事？」情境入口');
    if (tiles.join() !== paths.map(s => `s/${s.id}/`).join()) fail(`首頁情境磚 ${tiles.join(' ')} 與 data/paths.json 不一致`);
    if (paths.length && !/<a href="s\/">看全部情境<\/a>/.test(home)) fail('首頁缺「看全部情境」連結');
    if (home.indexOf('id="paths-t"') > home.indexOf('id="list"')) fail('情境入口應在清單之上');
    if (!/<aside class="sidebar" id="sidebar"/.test(home) || !/id="menu"[^>]*aria-expanded="false"/.test(home)) fail('首頁缺側欄或 #menu 按鈕');
    if (!/<noscript>[\s\S]*book\/health\.md[\s\S]*<\/noscript>/.test(home)) fail('首頁 noscript 沒有章節連結');
    for (const f of ['assets/home.js', 'assets/home.css']) if (!/eternity4719\/HowToLiveBetter index\.html（MIT，Copyright \(c\) 2026 eternity4719）/.test(read(f).slice(0, 200))) fail(`${f} 檔頭缺 MIT 改編聲明`);
    if (!/Copyright \(c\) 2026 eternity4719/.test(read('NOTICES.md')) || !/assets\/home\.js/.test(read('NOTICES.md'))) fail('NOTICES.md 沒涵蓋 assets/home.js');
    report.push(`情境磚 ${tiles.length} 塊`);
  }
  const badRow = index.entries.filter(e => !e.id || typeof e.sec !== 'number' || !index.secs[e.sec] || !e.title).length;
  if (badRow) fail(`index.json 有 ${badRow} 列缺 id／sec／title`);
  const missingText = index.entries.filter(e => typeof search[e.id] !== 'string').length;
  if (missingText) fail(`search.json 缺 ${missingText} 條的搜尋文字`);
  console.log('  ' + report.join('；'));
}
ok('h');

/* ---------- 結果 ---------- */
console.log('');
for (const w of warnings) console.log('警告 ' + w);
if (failures.length) {
  console.log(`\n失敗 ${failures.length} 項：`);
  for (const f of failures.slice(0, 60)) console.log(' - ' + f);
  if (failures.length > 60) console.log(` … 還有 ${failures.length - 60} 項`);
  process.exit(1);
}
console.log('verify 全綠');

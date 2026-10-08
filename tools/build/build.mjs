// 預渲染：把 book/ 的每個條目輸出成獨立靜態頁 e/<id>/index.html，並產生 sitemap.xml、llms.txt、llms-full.txt。
// 用法：node tools/build/build.mjs（建議先跑 node tools/check-entries.mjs，錯誤清到 0 再建）
// 無依賴、只讀 book/、只寫 e/ 與三個根目錄檔案；輸出是確定性的（不含建置時間），內容沒變就不會產生 git 差異。
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBook, DISPUTE_HELP, LENS_LABEL, LABEL, RATIO_RANK, REVERIFY_DAYS } from './lib/entry.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = (process.env.SITE_URL || 'https://naive000.github.io/survivepack/').replace(/\/?$/, '/');
const NAME = '台灣生存包', SLOGAN = '遇到事就打開';
const SITE_DESC = '按性價比排序的台灣生活法規查詢工具：每條寫明成本、收益、證據等級，附官方原文出處、法源條號與核實日期。涵蓋健保看病、勞動權益、詐騙防範與法律紅線。';
const DISCLAIMER = '本站為一般資訊整理，不構成法律或醫療建議，個案請洽專業人員。法律與福利規定常修正，請以條目標示的核實日期和官方最新公告為準。';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hant';
const REVIEW_FLAG = '待專業審核';

const secs = loadBook(join(root, 'book'));
const all = secs.flatMap(s => s.entries);
const IDS = new Set(all.map(e => e.id));
if (all.some(e => !e.id) || IDS.size !== all.length) { console.error('有條目缺 id 或 id 重複，請先跑 node tools/check-entries.mjs'); process.exit(1); }

/* ---------- 文字工具 ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const URL_RE = /https?:\/\/[A-Za-z0-9\-._~:\/?#\[\]@!$&'()*+,=%]+/g;
function trimUrl(u) {
  let t = '';
  while (/[.,)\]']$/.test(u)) { const c = u.slice(-1); if (c === ')' && (u.match(/\(/g) || []).length >= (u.match(/\)/g) || []).length) break; t = c + t; u = u.slice(0, -1); }
  return [u, t];
}
const plainText = s => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
function clip(s, n) { const a = [...s]; return a.length > n ? a.slice(0, n).join('') + '…' : s; }
const entryUrl = id => `${SITE}e/${id}/`;

// 與 index.html 的 inline() 同規則：連結、粗體、條目 id 交叉引用（本條自己的 id 不連）
function inline(s, selfId) {
  let html = '', pos = 0, m;
  const plain = t => esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\btw-[a-z0-9]+(?:-[a-z0-9]+)*\b/g, id => (IDS.has(id) && id !== selfId) ? `<a class="xr" href="../${id}/">${id}</a>` : id);
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(s))) {
    const [u, tail] = trimUrl(m[0]);
    html += plain(s.slice(pos, m.index)) + `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>` + esc(tail);
    pos = m.index + m[0].length;
  }
  return html + plain(s.slice(pos));
}
function lines(s, selfId) {
  if (s.length < 90) return inline(s, selfId);
  return s.split(/(?<=。)(?=\S)/).map(x => `<span class="ln">${inline(x.trim(), selfId)}</span>`).join('');
}
// 來源之間用「 ；」（前面有空格）分隔；沒有這個分隔就整段當一條
function sourceItems(src) {
  return src.split(/\s+；\s*/).map(x => x.trim()).filter(Boolean).map(p => {
    const urls = (p.match(URL_RE) || []).map(u => trimUrl(u)[0]);
    let text = p; for (const u of p.match(URL_RE) || []) text = text.replace(u, '');
    return { text: text.trim(), urls };
  });
}
function sourcesHtml(e) {
  const items = sourceItems(e.src);
  return '<ol>' + items.map(it => `<li>${inline(it.text, e.id)}${it.urls.map(u => `<a class="url" href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>`).join('')}</li>`).join('') + '</ol>';
}
const jsonLd = o => JSON.stringify(o).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
// 條目任何欄位含「待專業審核」都標示（目前出現在備註、過程成本、收益三欄；只看備註會漏 4 頁）
const needsReview = e => [e.title, e.cost, e.human, e.gain, e.proc, e.note].some(t => t.includes(REVIEW_FLAG));

/* ---------- 樣式（沿用 index.html 的色票與元件寫法，內嵌） ---------- */
const CSS = `
:root{--bg:#ffffff;--bg-alt:#f6f6f7;--bg-soft:#f6f6f7;--bg-mute:#f1f1f2;--bg-elv:#ffffff;--divider:#e2e2e3;
--t1:rgba(60,60,67,1);--t2:rgba(60,60,67,.78);--t3:rgba(60,60,67,.56);
--brand-1:#3451b2;--brand-2:#3a5ccc;--brand-3:#5672cd;--brand-soft:rgba(100,108,255,.14);
--green-1:#18794e;--green-soft:rgba(16,185,129,.14);--yellow-1:#915930;--yellow-soft:rgba(234,179,8,.14);
--red-1:#b8272c;--red-soft:rgba(244,63,94,.14);--gray-1:#565a5f;--gray-soft:rgba(142,150,170,.14);
--shadow:0 1px 2px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.06);
--font:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"PingFang TC","Hiragino Sans","Microsoft JhengHei","Noto Sans TC",sans-serif;
--nav-h:56px;color-scheme:light}
html.dark{--bg:#1b1b1f;--bg-alt:#161618;--bg-soft:#202127;--bg-mute:#2b2b2f;--bg-elv:#202127;--divider:#2e2e32;
--t1:rgba(255,255,245,.86);--t2:rgba(235,235,245,.6);--t3:rgba(235,235,245,.38);
--brand-1:#a8b1ff;--brand-2:#5c73e7;--brand-3:#3e63dd;--brand-soft:rgba(100,108,255,.16);
--green-1:#3dd68c;--green-soft:rgba(16,185,129,.16);--yellow-1:#f9b44e;--yellow-soft:rgba(234,179,8,.16);
--red-1:#f66f81;--red-soft:rgba(244,63,94,.16);--gray-1:#a4a8ae;--gray-soft:rgba(142,150,170,.16);
--shadow:0 1px 2px rgba(0,0,0,.3);color-scheme:dark}
*{box-sizing:border-box}
html{scrollbar-gutter:stable}
body{margin:0;background:var(--bg);color:var(--t1);font:15px/1.75 var(--font);-webkit-font-smoothing:antialiased}
a{color:var(--brand-1);text-decoration:none}
a:hover{color:var(--brand-2);text-decoration:underline;text-underline-offset:2px}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
:focus-visible{outline:2px solid var(--brand-1);outline-offset:2px;border-radius:4px}
.nav{position:sticky;top:0;z-index:30;height:var(--nav-h);background:var(--bg);border-bottom:1px solid var(--divider)}
.nav-in{max-width:820px;height:100%;margin:0 auto;padding:0 20px;display:flex;align-items:center;gap:12px}
.brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:16px;color:var(--t1);white-space:nowrap}
.brand:hover{text-decoration:none;color:var(--t1)}
.logo{width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,var(--brand-3),var(--brand-1));display:grid;place-items:center;color:#fff}
.logo svg{width:15px;height:15px}
.slogan{color:var(--t3);font-size:13px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.switch{position:relative;width:40px;height:22px;border-radius:11px;border:1px solid var(--divider);background:var(--bg-mute);flex:none}
.switch .knob{position:absolute;top:1px;left:1px;width:18px;height:18px;border-radius:50%;background:var(--bg-elv);box-shadow:var(--shadow);transition:transform .25s}
html.dark .switch .knob{transform:translateX(18px)}
.doc{max-width:820px;margin:0 auto;padding:24px 20px 96px}
.crumb{font-size:13px;color:var(--t3);margin-bottom:14px}
.crumb a{color:var(--t2)}
.review{margin:0 0 16px;padding:12px 16px;border:1px solid var(--red-1);border-radius:8px;background:var(--red-soft);color:var(--red-1);font-weight:600;font-size:14px;line-height:1.7}
.review span{display:block;font-weight:400;color:var(--t1);font-size:13px}
h1{margin:0 0 12px;font-size:26px;line-height:1.4;font-weight:700;letter-spacing:-.01em;overflow-wrap:anywhere}
.badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.badge{display:inline-block;border-radius:10px;padding:0 10px;line-height:20px;font-size:12px;font-weight:600;white-space:nowrap}
.badge.A{background:var(--green-soft);color:var(--green-1)}
.badge.B{background:var(--yellow-soft);color:var(--yellow-1)}
.badge.C{background:var(--gray-soft);color:var(--gray-1)}
.badge.danger{background:var(--red-soft);color:var(--red-1)}
.badge.warn{background:var(--yellow-soft);color:var(--yellow-1)}
.badge.plain{background:var(--gray-soft);color:var(--t2);font-weight:500}
.badge.r3{background:var(--brand-soft);color:var(--brand-1)}
.badge.r2{background:var(--green-soft);color:var(--green-1)}
.badge.r1{background:var(--gray-soft);color:var(--gray-1)}
.dhelp{margin:-6px 0 14px;font-size:13px;color:var(--t2)}
.trust{margin:0 0 18px;padding:14px 16px;border:1px solid var(--divider);border-left:3px solid var(--green-1);border-radius:8px;background:var(--bg-alt)}
.trust h2{margin:0 0 8px;font-size:13px;font-weight:600;color:var(--t2)}
.trust dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font-size:14px;line-height:1.7}
.trust dt{color:var(--t3);font-size:13px;font-weight:500;padding-top:1px}
.trust dd{margin:0;min-width:0;overflow-wrap:anywhere}
.trust ol{margin:0;padding:0;list-style:none;counter-reset:s}
.trust li{counter-increment:s;position:relative;padding-left:20px;margin-bottom:8px}
.trust li:last-child{margin-bottom:0}
.trust li::before{content:counter(s) ".";position:absolute;left:0;top:0;font-size:12px;color:var(--t3)}
.trust a.url{display:block;font-size:12px;color:var(--brand-1)}
.human{margin:0 0 16px;padding:10px 14px;border-left:2px solid var(--brand-1);background:var(--brand-soft);border-radius:0 6px 6px 0;font-size:16px;line-height:1.8;overflow-wrap:anywhere}
.rows{display:grid;grid-template-columns:auto 1fr;gap:10px 16px;font-size:15px}
.rows .k{color:var(--t3);font-weight:500;font-size:13px;padding-top:2px;white-space:nowrap}
.rows .v{min-width:0;overflow-wrap:anywhere}
.rows .v.note{color:var(--t2)}
.ln{display:block;margin-bottom:5px}.ln:last-child{margin-bottom:0}
.xr{color:var(--brand-1);border-bottom:1px dashed currentColor}
.disclaimer{margin:28px 0 20px;padding:10px 14px;border:1px solid var(--divider);border-radius:8px;background:var(--bg-alt);color:var(--t2);font-size:13px;line-height:1.7}
.home-cta{display:inline-block;margin:0 0 8px;padding:8px 16px;border-radius:8px;background:var(--brand-1);color:#fff;font-size:14px;font-weight:600}
.home-cta:hover{color:#fff;text-decoration:none;background:var(--brand-2)}
html.dark .home-cta{color:#1b1b1f}html.dark .home-cta:hover{color:#1b1b1f}
.more{margin-top:28px;padding-top:18px;border-top:1px solid var(--divider)}
.more h2{margin:0 0 10px;font-size:15px;font-weight:600}
.more ul{margin:0;padding:0;list-style:none;display:grid;gap:2px}
.more li{font-size:14px;line-height:1.6;padding:3px 0}
.more li[aria-current]{font-weight:600;color:var(--t1)}
.foot{margin-top:32px;padding-top:18px;border-top:1px solid var(--divider);color:var(--t3);font-size:13px;line-height:1.7}
.foot p{margin:0 0 8px}
@media (max-width:640px){
  .doc{padding:18px 16px 72px}.nav-in{padding:0 16px}
  h1{font-size:21px}.human{font-size:15px;padding:9px 12px}
  .rows,.trust dl{grid-template-columns:1fr;gap:2px}
  .rows .k,.trust dt{padding-top:8px}.rows .k:first-child,.trust dt:first-child{padding-top:0}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}`;
// 沒有 JS 時，深色模式退回系統偏好
const NOSCRIPT_CSS = `@media (prefers-color-scheme:dark){:root{--bg:#1b1b1f;--bg-alt:#161618;--bg-soft:#202127;--bg-mute:#2b2b2f;--bg-elv:#202127;--divider:#2e2e32;--t1:rgba(255,255,245,.86);--t2:rgba(235,235,245,.6);--t3:rgba(235,235,245,.38);--brand-1:#a8b1ff;--brand-2:#5c73e7;--brand-soft:rgba(100,108,255,.16);--green-1:#3dd68c;--green-soft:rgba(16,185,129,.16);--yellow-1:#f9b44e;--yellow-soft:rgba(234,179,8,.16);--red-1:#f66f81;--red-soft:rgba(244,63,94,.16);--gray-1:#a4a8ae;--gray-soft:rgba(142,150,170,.16);color-scheme:dark}.home-cta,.home-cta:hover{color:#1b1b1f}}`;
const THEME_INIT = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})();`;
const FAVICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%233451b2'/%3E%3Cpath d='M17 33l10 11 20-24' fill='none' stroke='white' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E`;
const PAGE_JS = `(function(){
var b=document.getElementById('theme');
if(b)b.addEventListener('click',function(){var d=document.documentElement.classList.toggle('dark');try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}});
var t=document.querySelector('[data-verified]');
if(t){var m=/^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(t.getAttribute('data-verified'));
if(m){var n=Math.floor((Date.now()-Date.UTC(+m[1],+m[2]-1,+m[3]))/864e5);
if(n>${REVERIFY_DAYS}){var s=document.createElement('span');s.className='badge warn';s.textContent='核實已 '+n+' 天';s.title='核實日期距今已久，法規與金額可能變動，請對照來源';document.querySelector('.badges').appendChild(s)}}}
})();`;

/* ---------- 單頁 ---------- */
function renderPage(e) {
  const sec = e.sec, url = entryUrl(e.id);
  const title = `${e.title}｜${NAME}`;
  const human = plainText(e.human);
  const desc = clip(plainText(e.human.replace(URL_RE, '')) || plainText(e.title), 120);
  const verified = e.meta['核實日期'] || '', law = e.meta['法源條號'] || '', region = e.meta['適用地區'] || '', expiry = e.meta['失效條件'] || '';
  const review = needsReview(e);

  const badges = [];
  const add = (cls, text, tip) => badges.push(`<span class="badge ${cls}"${tip ? ` title="${esc(tip)}"` : ''}>${esc(text)}</span>`);
  if (e.ratio) add('r' + RATIO_RANK[e.ratio], '性價比 ' + e.ratio, `編輯判斷：由收益量級（${e.level}）和三項成本合成，只在同一口徑（${LENS_LABEL[e.lens] || e.lens}）內可比，與證據等級無關`);
  add(e.grade || 'C', `證據 ${e.grade || '?'} 級`, e.gradeText);   // 收益 ? 時沒有性價比檔，由證據等級頂上
  if (e.lens) add('plain', LENS_LABEL[e.lens] || e.lens);
  for (const d of ['money', 'time', 'will']) if (e[d]) add('plain', LABEL[d][e[d]] || e[d]);
  if (e.dispute) add('danger', e.disputeType ? '爭議・' + e.disputeType : '爭議', DISPUTE_HELP[e.disputeType]);

  const trust = [
    `<dt>核實日期</dt><dd><time datetime="${esc(verified)}">${esc(verified || '未標')}</time></dd>`,
    law ? `<dt>法源條號</dt><dd>${inline(law, e.id)}</dd>` : '',
    `<dt>適用地區</dt><dd>${esc(region || '未標')}</dd>`,
    expiry ? `<dt>何時失效</dt><dd>${inline(expiry, e.id)}</dd>` : '',
    `<dt>來源</dt><dd>${sourcesHtml(e)}</dd>`
  ].join('');

  const rows = [
    ['成本', inline(e.cost, e.id), ''], ['收益', inline(e.gain, e.id), ''],
    e.proc ? ['過程成本', lines(e.proc, e.id), ''] : null,
    ['備註', lines(e.note, e.id), 'note'],
    ['證據等級', esc(e.gradeText || e.grade), '']
  ].filter(Boolean).map(([k, v, c]) => `<div class="k">${k}</div><div class="v${c ? ' ' + c : ''}">${v}</div>`).join('\n');

  const others = sec.entries.map(x => x.id === e.id
    ? `<li aria-current="page">${esc(x.title)}</li>`
    : `<li><a href="../${x.id}/">${esc(x.title)}</a></li>`).join('\n');

  const article = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: e.title, description: desc, inLanguage: 'zh-TW', url, mainEntityOfPage: url,
    dateModified: verified || undefined, articleSection: sec.title, license: LICENSE_URL,
    author: { '@type': 'Organization', name: NAME, url: SITE },
    publisher: { '@type': 'Organization', name: NAME, url: SITE },
    isPartOf: { '@type': 'WebSite', name: NAME, url: SITE }
  };
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [{ '@type': 'Question', name: e.title, acceptedAnswer: { '@type': 'Answer', text: human } }]
  };

  return `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#3451b2" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1b1b1f" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${FAVICON}">
<meta property="og:type" content="article">
<meta property="og:locale" content="zh_TW">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(e.title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(e.title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">${jsonLd(article)}</script>
<script type="application/ld+json">${jsonLd(faq)}</script>
<script>${THEME_INIT}</script>
<style>${CSS}</style>
<noscript><style>${NOSCRIPT_CSS}</style></noscript>
</head>
<body>
<header class="nav"><div class="nav-in">
  <a class="brand" href="../../"><span class="logo" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>${NAME}</span></a>
  <span class="slogan">${SLOGAN}</span>
  <button class="switch" id="theme" aria-label="切換深色模式" title="切換深色模式"><span class="knob"></span></button>
</div></header>
<main class="doc">
<nav class="crumb" aria-label="導覽"><a href="../../">${NAME}</a> › <a href="../../?sec=${sec.index}">${esc(sec.title)}</a></nav>
${review ? `<div class="review" role="note">本條有待專業審核的內容<span>本條正文標出了尚待專業人員確認的部分，使用前請特別留意，個案請洽專業人員。</span></div>\n` : ''}<article data-verified="${esc(verified)}">
<h1>${esc(e.title)}</h1>
<div class="badges">${badges.join('')}</div>
${e.dispute && DISPUTE_HELP[e.disputeType] ? `<p class="dhelp">${esc(DISPUTE_HELP[e.disputeType])}。</p>\n` : ''}<section class="trust" aria-label="核實資訊"><h2>核實資訊</h2><dl>${trust}</dl></section>
<p class="human">${inline(e.human, e.id)}</p>
<div class="rows">
${rows}
</div>
</article>
<div class="disclaimer">${DISCLAIMER}</div>
<a class="home-cta" href="../../#${e.id}">回首頁看完整清單與篩選</a>
<nav class="more" aria-label="同章其他條目"><h2>同章：${esc(sec.title)}（${sec.entries.length} 條）</h2>
<ul>
${others}
</ul></nav>
<footer class="foot">
<p><a href="../../">${NAME}</a>（${SLOGAN}）。內容採 <a href="${LICENSE_URL}" target="_blank" rel="noopener">CC BY-NC 4.0</a>，程式碼 MIT；啟發自 <a href="https://github.com/eternity4719/HowToLiveBetter" target="_blank" rel="noopener">eternity4719/HowToLiveBetter</a>，條目依台灣制度重寫。</p>
<p>法規條文取自全國法規資料庫，依「政府資料開放授權條款－第 1 版」使用。性價比檔由收益量級加花錢、花時間、要毅力三項成本合成，是編輯判斷，不是證據。</p>
</footer>
</main>
<script>${PAGE_JS}</script>
</body>
</html>
`;
}

/* ---------- 輸出 ---------- */
const outDir = join(root, 'e');
if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
for (const e of all) {
  const d = join(outDir, e.id);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'index.html'), renderPage(e));
}

// sitemap.xml：首頁 lastmod 取全部條目核實日期的最大值，保持輸出確定性
const dates = all.map(e => e.meta['核實日期']).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d || ''));
const maxDate = dates.slice().sort().pop();
const urlEntry = (loc, lastmod, pri) => `  <url><loc>${esc(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${pri ? `<priority>${pri}</priority>` : ''}</url>`;
writeFileSync(join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [urlEntry(SITE, maxDate, '1.0'), ...['calc/severance.html','calc/overtime.html','calc/leave.html','today/'].map(x => urlEntry(SITE + x, null, '0.8')), ...all.map(e => urlEntry(entryUrl(e.id), e.meta['核實日期'], '0.6'))].join('\n') + `\n</urlset>\n`);

// llms.txt：站名、一句話、授權、各章連結
const llms = [
  `# ${NAME}`, '',
  `> ${SLOGAN}。${SITE_DESC}`, '',
  `每條都回答兩個問題：花掉什麼，換回什麼。只引官方原文與原始文獻，每條標核實日期。${DISCLAIMER}`, '',
  `- 首頁（篩選與搜尋）：${SITE}`,
  `- 全部條目純文字版：${SITE}llms-full.txt`,
  `- 站點地圖：${SITE}sitemap.xml`, '',
  '## 授權', '',
  `- 內容：CC BY-NC 4.0（姓名標示、非商業性）。引用請註明出處「${NAME}」並附連結。${LICENSE_URL}`,
  '- 程式碼：MIT', '',
  ...secs.flatMap(s => [`## ${s.title}`, '', ...s.entries.map(e => `- [${e.title}](${entryUrl(e.id)})`), ''])
].join('\n');
writeFileSync(join(root, 'llms.txt'), llms);

// llms-full.txt：全部條目純文字，含 id、核實日期、法源、來源 URL
const bare = s => plainText(s);
const full = [
  `# ${NAME}（完整內容）`, '',
  `> ${SLOGAN}。${SITE_DESC}`, '',
  DISCLAIMER, `授權：內容 CC BY-NC 4.0（${LICENSE_URL}），程式碼 MIT。條目共 ${all.length} 條，分 ${secs.length} 章。`, '',
  ...secs.flatMap(s => [
    '', `## ${s.title}`, '',
    ...s.intro.map(bare).filter(Boolean),
    ...s.entries.flatMap(e => [
      '', `### ${e.title}`, '',
      `網址：${entryUrl(e.id)}`,
      `id：${e.id}`,
      `核實日期：${e.meta['核實日期'] || '未標'}`,
      e.meta['法源條號'] ? `法源條號：${e.meta['法源條號']}` : null,
      `適用地區：${e.meta['適用地區'] || '未標'}`,
      e.meta['失效條件'] ? `失效條件：${e.meta['失效條件']}` : null,
      e.ratio ? `性價比：${e.ratio}（口徑：${LENS_LABEL[e.lens] || e.lens}）` : `性價比：未判定（收益 ?）`,
      `證據等級：${e.gradeText || e.grade}`,
      e.dispute ? `爭議類型：${e.disputeType || '未標'}` : null,
      needsReview(e) ? `提醒：本條有待專業審核的內容` : null,
      `說人話：${bare(e.human)}`,
      `成本：${bare(e.cost)}`,
      `收益：${bare(e.gain)}`,
      e.proc ? `過程成本：${bare(e.proc)}` : null,
      `備註：${bare(e.note)}`,
      `來源：${bare(e.src)}`
    ].filter(l => l !== null))
  ])
].join('\n') + '\n';
writeFileSync(join(root, 'llms-full.txt'), full);

console.log(`e/：${all.length} 頁；sitemap.xml：${all.length + 1} 個網址；llms.txt、llms-full.txt 已寫入（${secs.length} 章）。站點根：${SITE}`);

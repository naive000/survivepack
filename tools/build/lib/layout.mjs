// 共用版面：所有 build 產生的頁面都從這裡出（頁首、底部工具列、頁尾免責聲明、共用 CSS）。
// 路徑一律依 depth 算相對路徑，站放在 /survivepack/ 子路徑或網域根目錄都能動；只有 canonical 與 OG 網址用絕對網址（SITE_URL）。
import { esc, rel, jsonLd, NAME, SLOGAN, DISCLAIMER, LICENSE_URL, siteUrl, AI_NOTE, beaconSnippet } from './helpers.mjs';

// <head> 內的主題初始化：class 'dark' 是狀態（calc 頁自帶的切換處理也只動 class），data-theme 是給 CSS 讀的鏡像。
// 沒有 JS 就不會有 data-theme，CSS 退回 prefers-color-scheme。
const THEME_INIT = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem('theme')}catch(e){}try{var k=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(k)d.classList.add('dark');d.setAttribute('data-theme',k?'dark':'light');new MutationObserver(function(){d.setAttribute('data-theme',d.classList.contains('dark')?'dark':'light')}).observe(d,{attributes:true,attributeFilter:['class']})}catch(e){}})();`;

const ICON = {
  calc: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/></svg>',
  changes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17.5V11a6 6 0 0 1 12 0v6.5l1.5 1.5h-15zM10 21h4"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
  all: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6.5h11M8 12h11M8 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/></svg>'
};
const LOGO = depth => `<img class="logo" src="${rel(depth, 'assets/favicon.svg')}" alt="" width="22" height="30">`;

/** 底部工具列的四個入口。key 對應 page() 的 active 參數。 */
export const TOOLBAR = [
  { key: 'calc', label: '試算', to: 'calc/' },
  { key: 'changes', label: '變動', to: 'changes/' },
  { key: 'search', label: '搜尋', to: '#search', home: true },
  { key: 'all', label: '全部', to: '#list', home: true }
];

export function toolbar(depth, active = '') {
  const links = TOOLBAR.map(t => {
    const href = t.home ? rel(depth, '') + t.to : rel(depth, t.to);
    return `<a href="${href}"${t.key === active ? ' aria-current="page"' : ''}>${ICON[t.key]}<span>${t.label}</span></a>`;
  }).join('');
  return `<nav class="toolbar" aria-label="工具列"><div class="toolbar-in">${links}</div></nav>`;
}

/**
 * 回傳完整 HTML 字串。
 * @param {object} o
 * @param {string} o.title        頁面標題；沒帶站名時自動加「｜台灣生存包」
 * @param {string} o.description  meta description / OG 描述
 * @param {string} o.body         <main> 內的 HTML（預設包在 <main class="doc"> 裡）
 * @param {number} o.depth        頁面所在目錄深度：index.html＝0、calc/x.html 與 today/＝1、e/<id>/＝2
 * @param {string} o.canonical    絕對網址（用 helpers.siteUrl('path/')）；省略就不輸出 canonical 與 og:url
 * @param {string} [o.ogImage]    絕對網址；省略就不輸出 og:image
 * @param {string} [o.extraHead]  塞進 <head> 尾端的 HTML（頁面專屬 CSS、JSON-LD 等）
 * @param {string} [o.active]     'calc' | 'changes' | 'search' | 'all'，工具列標示目前所在
 * 進階（都有預設值）：
 * @param {string} [o.ogType='website']
 * @param {string} [o.ogDescription]  og:description；省略就不輸出（臉書、X 會退回 meta description，每頁省一份重複文字）
 * @param {string[]} [o.jsonLd]   要輸出的 JSON-LD 物件（陣列，會自動跳脫）
 * @param {string} [o.robots='index,follow']
 * @param {boolean} [o.raw=false]   true：body 不包 <main>，由頁面自己負責（首頁清單用）
 * @param {string} [o.mainClass='doc'] <main> 的 class
 * @param {boolean} [o.siteJs=true]    false：不載 assets/site.js（calc 頁自帶主題切換）
 * @param {string} [o.scripts]    </body> 前的 HTML（頁面自己的 <script>）
 * @param {string} [o.headerSearch]  取代頂部列的「搜尋」連結（首頁放真正的輸入框）
 * @param {string} [o.headerLead]    頂部列站名前面的 HTML（首頁放篩選選單鈕）
 * @param {string} [o.aiNote]       AI 協助揭露句；省略用 helpers.AI_NOTE 全文；傳空字串＝不輸出（條目頁因 e/ 平均 ≤ 12 KB 預算，加上統計碼後塞不下，暫不輸出）
 * @param {boolean} [o.beacon=false]  true：token 非空時在 </body> 前輸出 Cloudflare Web Analytics snippet（只有首頁與 e/ 傳 true）
 * @param {string} [o.footNote]      免責聲明下方的補充說明 HTML
 * @param {string[]} [o.css]         額外的 CSS 檔（相對站根，如 'assets/calc.css'），接在 site.css 後
 */
export function page(o) {
  const { title, description = '', body, depth = 0, canonical, ogImage, extraHead = '', active = '' } = o;
  const full = title === NAME || title.endsWith('｜' + NAME) ? title : `${title}｜${NAME}`;
  const a = p => rel(depth, p);
  const css = ['assets/site.css', ...(o.css || [])].map(p => `<link rel="stylesheet" href="${a(p)}">`).join('\n');
  const ogType = o.ogType || 'website';
  const ld = (o.jsonLd || []).map(x => `<script type="application/ld+json">${jsonLd(x)}</script>`).join('\n');
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(full)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<meta name="robots" content="${o.robots || 'index,follow'}">`,
    canonical ? `<link rel="canonical" href="${esc(canonical)}">` : '',
    '<meta name="theme-color" content="#FBF8F3" media="(prefers-color-scheme: light)">',
    '<meta name="theme-color" content="#12110F" media="(prefers-color-scheme: dark)">',
    `<link rel="icon" href="${a('assets/favicon.svg')}" type="image/svg+xml">`,
    `<meta property="og:type" content="${ogType}">`,
    '<meta property="og:locale" content="zh_TW">',
    `<meta property="og:site_name" content="${NAME}">`,
    `<meta property="og:title" content="${esc(title.replace('｜' + NAME, ''))}">`,
    o.ogDescription ? `<meta property="og:description" content="${esc(o.ogDescription)}">` : '',   // 省略時各平台退回 meta description
    canonical ? `<meta property="og:url" content="${esc(canonical)}">` : '',
    ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : '',
    `<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}">`,
    ld,
    `<script>${THEME_INIT}</script>`,
    css,
    extraHead
  ].filter(Boolean).join('\n');

  const search = o.headerSearch ?? `<a class="hsearch" href="${a('#search')}" aria-label="搜尋條目"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span>搜尋條目</span></a>`;
  const header = `<header class="site-head"><div class="head-in">
${o.headerLead || ''}<a class="brand" href="${a('')}">${LOGO(depth)}<span>${NAME}</span></a><span class="slogan">${SLOGAN}</span>
<span class="head-sp"></span>
${search}
<button class="theme-btn" id="theme" type="button" aria-label="切換深色模式" title="切換深色模式"><span class="switch"><span class="knob"></span></span></button>
</div></header>`;

  const footer = `<footer class="site-foot">
<p class="disclaimer">${DISCLAIMER}</p>
${(o.aiNote ?? AI_NOTE) ? `<p class="ai-note">${o.aiNote ?? AI_NOTE}</p>\n` : ''}<p><a href="${a('')}">${NAME}</a>（${SLOGAN}）。內容採 <a href="${LICENSE_URL}" target="_blank" rel="noopener">CC BY-NC 4.0</a>，程式碼 MIT；啟發自 <a href="https://github.com/eternity4719/HowToLiveBetter" target="_blank" rel="noopener">eternity4719/HowToLiveBetter</a>，條目依台灣制度重寫。不收集個人資料。</p>
<p>法規條文取自全國法規資料庫，依「政府資料開放授權條款－第 1 版」使用。</p>${o.footNote ? `\n<p class="foot-note">${o.footNote}</p>` : ''}
</footer>`;

  const main = o.raw ? body : `<main class="${o.mainClass || 'doc'}" id="main">\n${body}\n</main>`;
  return `<!doctype html>
<html lang="zh-TW">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">跳到本文</a>
${header}
${main}
${footer}
${toolbar(depth, active)}
${o.siteJs === false ? '' : `<script src="${a('assets/site.js')}" defer></script>\n`}${o.scripts || ''}${o.beacon ? beaconSnippet() : ''}
</body>
</html>
`;
}

export { siteUrl };

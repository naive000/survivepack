// 首頁 index.html：情境入口＋完整清單頁（母專案式左側篩選欄＋清單）。資料來自 assets/index.json，搜尋文字 assets/search.json 延後載入。
// 情境入口讀 data/paths.json 的 id 與 title，連到 s/<id>/（s/ 由 pages/ 下的情境頁模組建置，這裡只放連結）。
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { esc, NAME, REVERIFY_DAYS, siteUrl } from '../lib/helpers.mjs';

const GROUPS = [
  { dim: 'ratio', title: '性價比', small: '編輯判斷，同口徑內可比', chips: [['極高', '極高'], ['高', '高'], ['一般', '一般']], note: '收益量級未判定的條目不列入性價比篩選，請改用證據等級篩選。' },
  { dim: 'lens', title: '換回什麼', small: '口徑，不跨口徑比較', chips: [['死亡率', '壽命'], ['健康', '健康'], ['金錢', '錢'], ['時間', '時間精力'], ['自由', '人身自由']] },
  { dim: 'grade', title: '證據等級', small: '原文可對應 · 需判斷 · 經驗', chips: [['A', 'A 級'], ['B', 'B 級'], ['C', 'C 級']] },
  { dim: 'money', title: '花錢', chips: [['0', '不花錢'], ['少', '少'], ['多', '多']] },
  { dim: 'time', title: '花時間', chips: [['少', '順手'], ['中', '幾小時'], ['多', '每天佔用']] },
  { dim: 'will', title: '要毅力', chips: [['否', '不用'], ['些', '一點'], ['是', '很多']] }
];
const chips = g => `<div class="chips" data-dim="${g.dim}">${g.chips.map(([v, t]) => `<button class="chip" data-v="${esc(v)}">${t}</button>`).join('')}</div>`;

export async function build(ctx) {
  const { layout, helpers: H } = ctx;
  const sidebar = `<div class="backdrop" id="backdrop"></div>
<aside class="sidebar" id="sidebar" aria-label="篩選條件">
  <div class="group"><div class="gt">章節</div><div class="sec-links" id="f-sec"></div></div>
${GROUPS.map(g => `  <div class="group"><div class="gt">${g.title}${g.small ? ` <small>${g.small}</small>` : ''}</div>${chips(g)}${g.note ? `<p class="gt-note">${g.note}</p>` : ''}</div>`).join('\n')}
  <div class="group">
    <label class="toggle"><input type="checkbox" id="f-dispute"> 只看標了爭議的</label>
    <div class="gt gt-sub">專業審核 <small>條文任一處標「待專業審核」</small></div>
    <div class="chips" data-dim="review"><button class="chip" data-v="only">只看待專業審核</button><button class="chip" data-v="hide">隱藏待專業審核</button></div>
    <button class="reset" id="reset" type="button">清空篩選</button>
  </div>
  <div class="hint">
    <p>章節一次只看一個，其他條件可多選。同一組多選是「或」，不同組之間是「且」。再點一次已選的章節，只會收起或展開它的條目目錄。</p>
    <p>章節旁的數字是符合其他條件的條數。每節內按性價比由高到低排，搜尋不改變順序。</p>
  </div>
</aside>`;

  // 情境入口：5 個大按鈕磚。data/paths.json 缺檔、或 SHOW_PATHS=0（公開匯出）就不輸出這一區
  const pathsFile = join(ctx.outDir, 'data', 'paths.json');
  const scenarios = H.SHOW_PATHS && existsSync(pathsFile) ? (JSON.parse(readFileSync(pathsFile, 'utf8')).scenarios || []) : [];
  const paths = scenarios.length ? `<section class="paths" aria-labelledby="paths-t">
      <h2 id="paths-t">你現在遇到什麼事？</h2>
      <ul class="tiles">
${scenarios.map(s => `        <li><a class="tile" href="s/${esc(s.id)}/"><b>${esc(s.title)}</b></a></li>`).join('\n')}
      </ul>
      <p class="paths-all"><a href="s/">看全部情境</a></p>
    </section>` : '';

  const noscript = `<noscript><div class="note-line"><p>篩選與搜尋需要 JavaScript。沒有 JavaScript 時，可以直接讀各章的 Markdown 原文：</p><ul class="ns">${ctx.index.secs.map(s => `<li><a href="book/${esc(s.slug)}.md">${esc(s.title)}（${s.n} 條）</a></li>`).join('')}</ul><p>每一條也有獨立網頁，網址列在 <a href="sitemap.xml">sitemap.xml</a>。底部的「試算」「變動」不需要 JavaScript。</p></div></noscript>`;

  const main = `<main class="content" id="main">
  <div class="home-doc" id="home" data-site="${esc(ctx.site)}" data-reverify="${REVERIFY_DAYS}">
    <div class="doc-head">
      <h1>${NAME}</h1>
      <p>每一條都回答兩個問題：花掉什麼，換回什麼。</p>
    </div>
    ${paths}
    <div class="doc-head list-head">
      <p>這是一份按性價比排好的備選單，不是任務清單。挑走一兩條就算數，其餘需要時再回來查。</p>
      <p>每條附官方原文出處與核實日期，沒查到官方原文的不寫。</p>
      <div class="stat" aria-live="polite">目前顯示 <b id="cnt">–</b> 條，共 <span id="tot">–</span> 條</div>
    </div>
    ${noscript}
    <p class="note-line" id="search-note" hidden></p>
    <div id="list">
      <div class="status" id="status" hidden><span id="status-t">正在讀取清單 …</span></div>
      <div class="empty" id="empty" hidden>沒有匹配的條目。去掉一個篩選條件，或換個更短的關鍵詞。<div><button class="reset" id="reset2" type="button">清空篩選</button></div></div>
    </div>
    <div class="foot-home">
      <p>性價比檔由收益量級加花錢、花時間、要毅力三項成本合成，是編輯判斷，不是證據；規則：收益「大」且三項成本全零為極高；「大」且成本分 ≤ 2，或「中」且成本全零為高；其餘為一般；收益未定（?）者不標檔。成本分：花錢 少=1、多=2；花時間 中=1、多=2；要毅力 些=1、是=2。</p>
      <p>版面與前端程式改編自 <a href="https://github.com/eternity4719/HowToLiveBetter" target="_blank" rel="noopener">eternity4719/HowToLiveBetter</a>（MIT），聲明見 <a href="NOTICES.md">NOTICES.md</a>。</p>
    </div>
  </div>
</main>`;

  const headerLead = `<button class="menu-btn" id="menu" type="button" aria-label="開啟篩選" aria-expanded="false" aria-controls="sidebar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>\n`;
  const headerSearch = `<label class="hbox" id="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" type="search" placeholder="搜尋條目" autocomplete="off" aria-label="搜尋條目"></label>`;

  const html = layout({
    title: NAME,
    description: '遇到事就打開。按性價比排序的台灣生活法規查詢工具：每條寫明成本、收益、證據等級，附官方原文出處與核實日期。涵蓋健保看病、勞動權益、詐騙防範與法律紅線。',
    body: (sidebar + '\n' + main).replace(/\n\s+/g, '\n'),   // 去掉縮排省首載位元組
    raw: true, depth: 0, canonical: siteUrl(), active: 'all',
    beacon: true, css: ['assets/home.css'], headerLead, headerSearch,
    scripts: '<script src="assets/home.js" defer></script>'
  });
  ctx.writeFile('index.html', html);
}

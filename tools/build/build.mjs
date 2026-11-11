// 預渲染：把 book/ 的每個條目輸出成獨立靜態頁 e/<id>/index.html，並產生 assets/index.json、assets/search.json、
// sitemap.xml、llms.txt、llms-full.txt，最後依序執行 tools/build/pages/*.mjs（首頁清單、試算、今日這條，以及之後新增的頁面）。
// 用法：node tools/build/build.mjs（建議先跑 node tools/check-entries.mjs，錯誤清到 0 再建）
// 無依賴；輸出是確定性的（不含建置時間），內容沒變就不會產生 git 差異。
// 頁面模組的介面與寫法見 tools/build/pages/_example.mjs.disabled 與 docs/build-notes-phase0.md。
import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadBook } from './lib/entry.mjs';
import * as H from './lib/helpers.mjs';
import * as layoutLib from './lib/layout.mjs';
import { makeEntryRenderer } from './lib/entry-page.mjs';
import { buildIndex, compactIndex } from './lib/index-data.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const { NAME, SLOGAN, SITE_DESC, DISCLAIMER, LICENSE_URL, SITE, esc, plainText, entryUrl, needsReview, LENS_LABEL } = H;

const secs = loadBook(join(root, 'book'));
const all = secs.flatMap(s => s.entries);
const IDS = new Set(all.map(e => e.id));
if (all.some(e => !e.id) || IDS.size !== all.length) { console.error('有條目缺 id 或 id 重複，請先跑 node tools/check-entries.mjs'); process.exit(1); }

const writeOut = H.makeWriter(root);

/* ---------- 精簡索引（首頁清單與搜尋用；其他頁面模組也可讀） ---------- */
const { index, search } = buildIndex(secs);
writeOut('assets/index.json', JSON.stringify(compactIndex(index)) + '\n');   // 磁碟格式 v2（縮短欄位名），home.js expand() 讀回
writeOut('assets/search.json', JSON.stringify(search) + '\n');

/* ---------- 條目頁 ---------- */
const renderEntry = makeEntryRenderer(IDS);
const outDir = join(root, 'e');
if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
for (const e of all) writeOut(`e/${e.id}/index.html`, renderEntry(e));

/* ---------- llms.txt、llms-full.txt ---------- */
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

/* ---------- 頁面模組（tools/build/pages/*.mjs，檔名排序，依序執行） ---------- */
const extraUrls = [];   // [{ path, lastmod?, priority? }]，各模組用 ctx.addUrl 回報，最後併入 sitemap.xml
const ctx = {
  entries: all,             // 全部條目（含解析後欄位：id、title、ratio、grade、meta、sec…），章內已按性價比排序
  secs,                     // 章節（含 entries）
  index,                    // assets/index.json 的內容（物件）
  outDir: root,             // repo 根目錄（頁面就地寫在這裡的 s/、changes/ 等）
  layout: layoutLib.page,   // page({title, description, body, depth, canonical, …}) → 完整 HTML
  layoutLib,                // { page, toolbar, TOOLBAR }
  helpers: H,               // esc、rel、makeInline、ratioFor、needsReview、siteUrl、entryUrl…
  site: SITE,
  today: new Date().toLocaleDateString('sv', { timeZone: 'Asia/Taipei' }),   // YYYY-MM-DD（台北時間）
  writeFile: writeOut,      // (相對 repo 根的路徑, 內容)，自動建目錄
  addUrl(path, opts = {}) { if (!extraUrls.some(u => u.path === path)) extraUrls.push({ path, ...opts }); }
};

const pagesDir = join(here, 'pages');
const mods = existsSync(pagesDir) ? readdirSync(pagesDir).filter(f => f.endsWith('.mjs') && !f.startsWith('_')).sort() : [];
for (const f of mods) {
  try {
    const mod = await import(pathToFileURL(join(pagesDir, f)).href);
    if (typeof mod.build !== 'function') throw new Error('模組沒有 export async function build(ctx)');
    await mod.build(ctx);
  } catch (err) {
    console.error(`\n頁面模組 tools/build/pages/${f} 失敗，整個建置中止：\n${err && err.stack || err}`);
    process.exit(1);
  }
}

/* ---------- sitemap.xml：首頁、各模組回報的網址、全部條目 ---------- */
const dates = all.map(e => e.meta['核實日期']).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d || ''));
const maxDate = dates.slice().sort().pop();
const urlEntry = (loc, lastmod, pri) => `  <url><loc>${esc(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${pri ? `<priority>${pri}</priority>` : ''}</url>`;
writeFileSync(join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [urlEntry(SITE, maxDate, '1.0'),
    ...extraUrls.map(u => urlEntry(SITE + u.path.replace(/^\/+/, ''), u.lastmod || null, u.priority || '0.8')),
    ...all.map(e => urlEntry(entryUrl(e.id), e.meta['核實日期'], '0.6'))].join('\n') + `\n</urlset>\n`);

console.log(`e/：${all.length} 頁；assets/index.json、assets/search.json 已寫入；頁面模組 ${mods.length} 個（${mods.join('、') || '無'}）；sitemap.xml：${1 + extraUrls.length + all.length} 個網址；llms.txt、llms-full.txt 已寫入（${secs.length} 章）。站點根：${SITE}`);

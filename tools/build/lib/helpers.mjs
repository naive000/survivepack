// 建置共用函式：build.mjs、layout.mjs 與 pages/*.mjs 共用。無依賴。
// 頁面模組透過 ctx.helpers 取得這裡的全部匯出。
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { RATIO_RANK, COST_W, ratioOf, LENS_LABEL, LABEL, DISPUTE_HELP, REVERIFY_DAYS } from './entry.mjs';

export { RATIO_RANK, COST_W, ratioOf, LENS_LABEL, LABEL, DISPUTE_HELP, REVERIFY_DAYS };

export const NAME = '台灣生存包', SLOGAN = '遇到事就打開';
export const SITE_DESC = '按性價比排序的台灣生活法規查詢工具：每條寫明成本、收益、證據等級，附官方原文出處、法源條號與核實日期。涵蓋健保看病、勞動權益、詐騙防範與法律紅線。';
export const DISCLAIMER = '本站為一般資訊整理，不構成法律或醫療建議，個案請洽專業人員。法律與福利規定常修正，請以條目標示的核實日期和官方最新公告為準。';
// AI 協助揭露（2026-11-13）：首頁與非條目頁頁尾輸出全文；條目頁（e/）不輸出（實測 +55 B/頁，加上統計碼 +134 B/頁會讓 e/ 平均 12299 B 超過 12288 B 預算）。
export const AI_NOTE = '本站條目由 Claude Code（AI）協助蒐集與撰寫，每條對照官方原文或原始文獻核實並標核實日期。仍可能有錯，歡迎回報。';
// Cloudflare Web Analytics（無 cookie、不收個資）token。預設空字串＝建置時不輸出任何統計碼。
// 拿到 token 後以環境變數 CF_BEACON_TOKEN 傳入建置（32 位英數字）；只有首頁 index.html 與 e/ 條目頁會輸出官方 snippet（見 layout.mjs 的 beacon 選項）。
// 環境變數 CF_BEACON_TOKEN 可臨時覆蓋（測試用）。verify-site.mjs 只放行這一個完全相同格式的 script 標籤。
export const cfBeaconToken = (process.env.CF_BEACON_TOKEN ?? '').trim();
if (cfBeaconToken && !/^[A-Za-z0-9]{16,64}$/.test(cfBeaconToken)) throw new Error('cfBeaconToken 格式不正確（只能是 16–64 位英數字）');
/** 官方 snippet；token 為空回傳空字串。verify-site.mjs 依同一格式驗證。 */
export const beaconSnippet = () => cfBeaconToken
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${cfBeaconToken}"}'></script>\n`
  : '';
export const LICENSE_URL = 'https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hant';
export const REVIEW_FLAG = '待專業審核';
// 站根網址的唯一設定位置：sitemap、canonical、OG、llms、feed.xml（pages/40-changes.mjs 用 siteUrl()）都從這裡來。環境變數 SITE_URL 可覆蓋。
// 換網域（例如 survivepack.tw）只改這一行的預設值。tools/publish/robots.txt 與 tools/lawwatch/lawwatch.py 各有一份獨立寫死的網址，換網域時要一併改。
export const DEFAULT_SITE = 'https://naive000.github.io/survivepack/';
export const SITE = (process.env.SITE_URL || DEFAULT_SITE).replace(/\/?$/, '/');
// 情境路徑頁（s/）與首頁的情境磚是否輸出。預設開（本機預覽）；環境變數 SHOW_PATHS=0（或 false／off）關閉＝公開匯出用，
// 關閉時不產生 s/、首頁沒有情境磚、sitemap 沒有 s/ 網址、404 頁不連 s/，且會刪掉工作區既有的 s/ 目錄（讓死連結檢查有意義）。
// tools/publish/export.sh 以 SHOW_PATHS=0 建置，匯出後再用預設值重建，所以預覽站不受影響。
export const SHOW_PATHS = !/^(0|false|off|no)$/i.test(process.env.SHOW_PATHS || '');

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const plainText = s => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
export function clip(s, n) { const a = [...s]; return a.length > n ? a.slice(0, n).join('') + '…' : s; }
export const jsonLd = o => JSON.stringify(o).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
export const entryUrl = id => `${SITE}e/${id}/`;
export const siteUrl = (path = '') => SITE + path.replace(/^\/+/, '');

/** 站內相對路徑：從 depth 層深的頁面指到站根的 to（站同時放 /survivepack/ 與網域根目錄，所以一律相對）。
 *  depth 0＝站根（index.html）、1＝calc/x.html 或 today/、2＝e/<id>/。rel(2,'assets/site.css') → '../../assets/site.css' */
export function rel(depth, to = '') {
  const up = depth > 0 ? '../'.repeat(depth) : './';
  return up + String(to).replace(/^\/+/, '');
}

/** 性價比：與 index.html 舊版、tools/build/lib/entry.mjs 同一套（COST_W、ratioOf）。收益 ? 時回傳 ''。 */
export function ratioFor(e) {
  const cs = (COST_W.money[e.money] ?? 0) + (COST_W.time[e.time] ?? 0) + (COST_W.will[e.will] ?? 0);
  return ratioOf(e.level, cs);
}

/** 條目任何欄位含「待專業審核」都算（e/ 頁用；比首頁篩選用的「只看備註」寬，見 docs/build-notes-phase0.md）。 */
export const needsReview = e => [e.title, e.cost, e.human, e.gain, e.proc, e.note].some(t => t.includes(REVIEW_FLAG));

/* ---------- 內文轉 HTML（連結、粗體、條目 id 交叉引用） ---------- */
export const URL_RE = /https?:\/\/[A-Za-z0-9\-._~:\/?#\[\]@!$&'()*+,=%]+/g;
export function trimUrl(u) {
  let t = '';
  while (/[.,)\]']$/.test(u)) { const c = u.slice(-1); if (c === ')' && (u.match(/\(/g) || []).length >= (u.match(/\)/g) || []).length) break; t = c + t; u = u.slice(0, -1); }
  return [u, t];
}
/** 條目 id → 標題。buildIndex() 與 pages/30-paths.mjs 登記；inline() 用它把 tw-… 換成條目標題。 */
export const TITLES = new Map();
const MISSED = new Set();
/** 回傳 inline(s, selfId)；ids 是合法條目 id 集合，hrefPrefix 預設 '../'（e/<id>/ 之間互連）。
 *  文字裡的條目 id（tw-…）換成連到該條目頁、文字為條目標題的連結；本條自己只換成標題文字；
 *  找不到對應條目的 id 保持原文，並在 build 時警告一次。URL 內的 id 不會被換（URL 先被切出去）。 */
export function makeInline(ids, hrefPrefix = '../') {
  return function inline(s, selfId) {
    let html = '', pos = 0, m;
    const plain = t => esc(t.replace(/(?<=[^\x00-\x7f]) +(?=tw-[a-z0-9])/g, ''))
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\btw-[a-z0-9]+(?:-[a-z0-9]+)*\b/g, id => {
        const title = TITLES.get(id);
        if (!ids.has(id) || title === undefined) { if (!MISSED.has(id)) { MISSED.add(id); console.warn(`[inline] 找不到條目 ${id}（保持原文）`); } return id; }
        return id === selfId ? esc(title) : `<a class="xr" href="${hrefPrefix}${id}/">「${esc(title)}」</a>`;
      });
    URL_RE.lastIndex = 0;
    while ((m = URL_RE.exec(s))) {
      const [u, tail] = trimUrl(m[0]);
      html += plain(s.slice(pos, m.index)) + `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>` + esc(tail);
      pos = m.index + m[0].length;
    }
    return html + plain(s.slice(pos));
  };
}

/* ---------- 檔案 ---------- */
/** 寫檔（自動建目錄）。path 是相對 repo 根的路徑。 */
export function makeWriter(root) {
  return function writeOut(path, content) {
    const full = join(root, path);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  };
}

export const todayString = () => new Date().toISOString().slice(0, 10);

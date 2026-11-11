// 產生 assets/index.json（列表與篩選用，首頁首載只讀這份）與 assets/search.json（全文搜尋用，使用者開始搜尋才載入）。
// 缺欄位＝空字串或 0。欄位定義見 docs/build-notes-phase0.md。entries 的順序＝首頁顯示順序：章節依序，章內按性價比由高到低（同檔維持檔案內順序）。
import { clip, TITLES, needsReview } from './helpers.mjs';

const HUMAN_CLIP = 80;   // 列表卡片與搜尋預覽用的「說人話」前 N 字
const LAW_CLIP = 28;

export function buildIndex(secs) {
  const entries = [];
  const text = {};
  secs.forEach(s => s.entries.forEach(e => {
    TITLES.set(e.id, e.title);   // 登記給 helpers.makeInline：條目 id 換成標題連結
    const row = {
      id: e.id,
      sec: s.index,
      title: e.title,
      human: clip(e.human.replace(/\*\*/g, ''), HUMAN_CLIP),   // 前約 80 字，純文字
      lens: e.lens,                  // 口徑：死亡率｜健康｜金錢｜時間｜自由
      grade: e.grade,                // 證據等級 A｜B｜C
      money: e.money, time: e.time, will: e.will,   // 成本標籤（錢 0｜少｜多；時間 少｜中｜多；毅力 否｜些｜是）
      level: e.level,                // 收益量級 大｜中｜小｜?
      ratio: e.ratio,                // 性價比檔 極高｜高｜一般｜''（收益 ? 時為空）
      verified: e.meta['核實日期'] || '',
      law: clip(e.meta['法源條號'] || '', LAW_CLIP),
      review: needsReview(e) ? 1 : 0,   // 任何欄位含「待專業審核」（首頁篩選與 e/ 頁橫幅同一口徑，helpers.needsReview）
      dispute: e.dispute ? 1 : 0,    // 備註以「爭議」開頭
      disputeType: e.disputeType     // 證據｜個案認定｜法規修正中｜立場｜''
    };
    // 為了縮小檔案，空字串與 0 的欄位不輸出；讀的人把缺欄位當成 ''／0
    for (const k of Object.keys(row)) if (k !== 'sec' && (row[k] === '' || row[k] === 0)) delete row[k];
    entries.push(row);
    // 全文搜尋文字：與舊版首頁 x.hay 同一組欄位，搜尋結果因此與改版前一致
    text[e.id] = [e.title, e.human, e.cost, e.gain, e.proc, e.note, e.src, e.grade, e.meta['法源條號'] || ''].join('\n').replace(/\*\*/g, '').toLowerCase();
  }));
  const index = {
    v: 1,
    count: entries.length,
    secs: secs.map(s => ({ i: s.index, title: s.title, slug: s.slug, n: s.entries.length, intro: s.intro.filter(Boolean) })),
    entries
  };
  return { index, search: { v: 1, text } };
}

/* ---------- 磁碟格式（assets/index.json，v2）----------
   首頁首載預算 400 KB，index.json 是最大一塊，所以寫檔時縮短欄位名、核實日期改查表、拿掉可由章節筆數推得的 sec。
   build.mjs 寫檔用 compactIndex()；assets/home.js 的 expand() 讀回成上面 buildIndex() 的形狀（ctx.index 與 verify 都用展開後的形狀）。
   對照表在 KEYS；改這裡要同步 assets/home.js 的 KEYS。 */
export const KEYS = { id: 'i', title: 't', human: 'h', lens: 'l', grade: 'g', money: 'm', time: 'ti', will: 'w', level: 'lv', ratio: 'r', law: 'lw', review: 'rv', dispute: 'ds', disputeType: 'dt' };

export function compactIndex(index) {
  const dates = [...new Set(index.entries.map(e => e.verified).filter(Boolean))].sort();
  // entries 必須按章節連續排列（sec 由 secs[].n 推回）
  let at = 0;
  index.secs.forEach(s => { for (let k = 0; k < s.n; k++, at++) if (!index.entries[at] || index.entries[at].sec !== s.i) throw new Error('index entries 未按章節連續排列，無法省略 sec'); });
  if (at !== index.entries.length) throw new Error('secs[].n 加總與 entries 數不符');
  return {
    v: 2, count: index.count, secs: index.secs, dates,
    entries: index.entries.map(e => {
      const o = {};
      for (const k of Object.keys(e)) {
        if (k === 'sec') continue;
        if (k === 'verified') o.d = dates.indexOf(e.verified);
        else if (KEYS[k]) o[KEYS[k]] = e[k];
        else throw new Error(`index 欄位 ${k} 沒有縮寫對照`);
      }
      return o;
    })
  };
}

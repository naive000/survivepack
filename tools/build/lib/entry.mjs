// 條目解析與性價比檔：邏輯與 index.html 的 parseChapter、COST_W、x.ratio 同一套（2026-10-08 對照）。
// index.html 自己內嵌一份，改規則時兩邊要一起改（CLAUDE.md「改動時要同步的檔案」）。
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const REVERIFY_DAYS = 180;   // 與 index.html 同值，暫定
export const DISPUTE_HELP = {
  '證據': '醫學或研究證據彼此衝突或強度有限，備註列出正反兩方',
  '個案認定': '法律效果要由法院或主管機關依個案認定，結果可能不同，備註列出正反兩方',
  '法規修正中': '法規剛修正或新舊版本交替，適用時點請對照官方最新公告',
  '立場': '涉及價值或倫理立場的不同主張，備註列出各方說法'
};
export const COST_W = { money: { '0': 0, '少': 1, '多': 2 }, time: { '少': 0, '中': 1, '多': 2 }, will: { '否': 0, '些': 1, '是': 2 } };
export const LENS_LABEL = { '死亡率': '壽命', '健康': '健康', '金錢': '錢', '時間': '時間精力', '自由': '人身自由' };
export const LABEL = {
  money: { '0': '不花錢', '少': '花錢少', '多': '花錢多' },
  time: { '少': '順手', '中': '花幾小時', '多': '每天佔用' },
  will: { '否': '不用毅力', '些': '要一點毅力', '是': '要很多毅力' }
};
export const META_KEYS = ['id', '適用地區', '核實日期', '法源條號', '失效條件'];
export const RATIO_RANK = { '極高': 3, '高': 2, '一般': 1 };

export function parseMeta(str, keys) {
  const re = new RegExp('(' + keys.join('|') + ')=', 'g');
  const hits = [...str.matchAll(re)], out = {};
  hits.forEach((h, i) => { out[h[1]] = str.slice(h.index + h[0].length, i + 1 < hits.length ? hits[i + 1].index : undefined).trim(); });
  return out;
}

export function ratioOf(level, cs) {
  return level === '大' ? (cs === 0 ? '極高' : (cs <= 2 ? '高' : '一般'))
    : level === '中' ? (cs === 0 ? '高' : '一般')
    : level === '小' ? '一般' : '';
}

export function parseChapter(md, file, order) {
  const sec = { order, file, slug: file.replace(/\.md$/, ''), title: '', intro: [], entries: [] };
  let e = null;
  const flush = () => { if (e) sec.entries.push(e); e = null; };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd(); let m;
    if (!e && (m = /^# (.+)$/.exec(line))) { sec.title = m[1].trim(); continue; }
    if ((m = /^### (.+)$/.exec(line))) { flush(); e = { title: m[1].trim(), cost: '', human: '', gain: '', proc: '', grade: '', gradeText: '', src: '', note: '', money: '', time: '', will: '', level: '', lens: '', meta: {} }; continue; }
    if (!e) { if (line && !/^---/.test(line)) sec.intro.push(line); continue; }
    if ((m = /^<!--\s*成本標籤:\s*(.*?)\s*-->/.exec(line))) {
      const t = parseMeta(m[1], ['錢', '時間', '毅力', '收益', '口徑']);
      e.money = t['錢'] || ''; e.time = t['時間'] || ''; e.will = t['毅力'] || ''; e.level = t['收益'] || ''; e.lens = t['口徑'] || ''; continue;
    }
    if ((m = /^<!--\s*(id=.*?)\s*-->/.exec(line))) { e.meta = parseMeta(m[1], META_KEYS); continue; }
    if ((m = /^- 成本：(.*)$/.exec(line))) e.cost = m[1];
    else if ((m = /^- 說人話：(.*)$/.exec(line))) e.human = m[1];
    else if ((m = /^- 收益：(.*)$/.exec(line))) e.gain = m[1];
    else if ((m = /^- 過程成本：(.*)$/.exec(line))) e.proc = m[1];
    else if ((m = /^- 證據等級：\s*([ABC])(.*)$/.exec(line))) { e.grade = m[1]; e.gradeText = (m[1] + m[2]).trim(); }
    else if ((m = /^- 來源：(.*)$/.exec(line))) e.src = m[1];
    else if ((m = /^- 備註：(.*)$/.exec(line))) e.note = m[1];
  }
  flush();
  sec.entries.forEach((x, i) => {
    x.id = x.meta.id || ''; x.seq = i;
    x.dispute = /^爭議/.test(x.note);
    x.disputeType = ((/^爭議（([^）]+)）/.exec(x.note) || [])[1]) || '';
    x.cs = (COST_W.money[x.money] ?? 0) + (COST_W.time[x.time] ?? 0) + (COST_W.will[x.will] ?? 0);
    x.ratio = ratioOf(x.level, x.cs);
  });
  // 每節內按性價比由高到低，同檔維持檔案內順序（與 index.html 一致）
  sec.entries.sort((a, b) => (RATIO_RANK[b.ratio] || 0) - (RATIO_RANK[a.ratio] || 0) || a.seq - b.seq);
  return sec;
}

// 讀 book/manifest.json 與各章。回傳的章節與 index.html 的 SECTIONS 相同（濾掉沒有條目的章）。
export function loadBook(bookDir) {
  const man = JSON.parse(readFileSync(join(bookDir, 'manifest.json'), 'utf8'));
  const secs = man.chapters.map((f, i) => parseChapter(readFileSync(join(bookDir, f), 'utf8'), f, i)).filter(s => s.entries.length);
  secs.forEach((s, si) => { s.index = si; s.entries.forEach((e, i) => { e.sec = s; e.pos = i; }); });
  return secs;
}

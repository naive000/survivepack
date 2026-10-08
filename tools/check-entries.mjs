// 檢查 book/ 底下的條目是否符合 CLAUDE.md 的格式與核實規則。用法：node tools/check-entries.mjs
// 只讀本機檔案，不連網。有錯誤時結束碼為 1。
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const book = join(root, 'book');
const manifest = JSON.parse(readFileSync(process.argv[2] || join(book, 'manifest.json'), 'utf8'));   // 可傳入別的 manifest 做測試
const errors = [], warns = [], ids = new Map();
const err = (f, t, m) => errors.push(`${f} 〈${t}〉 ${m}`);
const warn = (f, t, m) => warns.push(`${f} 〈${t}〉 ${m}`);

const LEVELS = ['大', '中', '小', '?'], LENS = ['死亡率', '健康', '金錢', '時間', '自由'];
const FIELDS = ['成本', '說人話', '收益', '證據等級', '來源', '備註'];
const OPTIONAL = ['過程成本'];
const KEYS = ['id', '適用地區', '核實日期', '法源條號', '失效條件'];
const BAD_JARGON = /\b(HR|RR|OR|CI)\b/;   // 「說人話」欄不得出現統計術語
let total = 0;

function kv(str, keys) {
  const hits = [...str.matchAll(new RegExp(`(${keys.join('|')})=`, 'g'))], o = {};
  hits.forEach((h, i) => { o[h[1]] = str.slice(h.index + h[0].length, i + 1 < hits.length ? hits[i + 1].index : undefined).trim(); });
  return o;
}

for (const file of manifest.chapters) {
  const path = join(book, file);
  if (!existsSync(path)) { errors.push(`manifest 列了 ${file}，檔案不存在`); continue; }
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  let cur = null; const entries = [];
  for (const l of lines) {
    if (/^### /.test(l)) { cur = { title: l.slice(4).trim(), lines: [] }; entries.push(cur); }
    else if (cur) cur.lines.push(l);
  }
  for (const e of entries) {
    total++;
    const t = e.title, body = e.lines.join('\n');
    const c1 = e.lines.find(l => /^<!--\s*成本標籤:/.test(l)), c2 = e.lines.find(l => /^<!--\s*id=/.test(l));
    if (!c1) err(file, t, '缺「成本標籤」註解行');
    if (!c2) err(file, t, '缺「id=…」註解行');
    if (c1) {
      const m = kv(c1.replace(/^<!--\s*成本標籤:\s*|\s*-->$/g, ''), ['錢', '時間', '毅力', '收益', '口徑']);
      if (!['0', '少', '多'].includes(m['錢'])) err(file, t, `錢=${m['錢']} 不合法（0|少|多）`);
      if (!['少', '中', '多'].includes(m['時間'])) err(file, t, `時間=${m['時間']} 不合法（少|中|多）`);
      if (!['否', '些', '是'].includes(m['毅力'])) err(file, t, `毅力=${m['毅力']} 不合法（否|些|是）`);
      if (!LEVELS.includes(m['收益'])) err(file, t, `收益=${m['收益']} 不合法`);
      if (!LENS.includes(m['口徑'])) err(file, t, `口徑=${m['口徑']} 不合法`);
      if (m['收益'] === '?') warn(file, t, '收益=?，不標性價比檔，待判定');
      if (m['口徑'] === '自由' && c2 && !/法源條號=\S/.test(c2)) err(file, t, '口徑=自由的條目要填法源條號');
    }
    if (c2) {
      const m = kv(c2.replace(/^<!--\s*|\s*-->$/g, ''), KEYS);
      if (!/^tw-[a-z0-9]+(-[a-z0-9]+)*$/.test(m.id || '')) err(file, t, `id 格式不合（tw-小寫英數與連字號）：${m.id}`);
      else if (ids.has(m.id)) err(file, t, `id 重複：${m.id}（另見 ${ids.get(m.id)}）`); else ids.set(m.id, file);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(m['核實日期'] || '')) err(file, t, '缺核實日期或格式不是 YYYY-MM-DD，沒有核實日期不得進正文');
      if (!m['適用地區']) err(file, t, '缺適用地區');
      if (!m['失效條件']) err(file, t, '缺失效條件');
    }
    const fieldLines = e.lines.filter(l => /^- /.test(l));
    if (fieldLines.length > 10) err(file, t, `欄位行 ${fieldLines.length} 行，超過 10 行`);
    for (const f of FIELDS) if (!fieldLines.some(l => l.startsWith(`- ${f}：`))) err(file, t, `缺欄位「${f}」`);
    for (const l of fieldLines) {
      const name = /^- ([^：]+)：/.exec(l)?.[1];
      if (name && ![...FIELDS, ...OPTIONAL].includes(name)) err(file, t, `不認得的欄位「${name}」`);
      if (name && name !== '證據等級' && l.length - name.length - 3 < 2) err(file, t, `欄位「${name}」是空的`);
    }
    const g = fieldLines.find(l => l.startsWith('- 證據等級：'));
    if (g && !/^- 證據等級：\s*[ABC]/.test(g)) err(file, t, '證據等級要以 A、B 或 C 開頭');
    const src = fieldLines.find(l => l.startsWith('- 來源：')) || '';
    if (!/https?:\/\//.test(src)) err(file, t, '來源沒有連結');
    if (/(TODO|待核實)/.test(body)) err(file, t, '含 TODO／待核實，未核實的條目放 drafts/，不進 book/');
    const human = fieldLines.find(l => l.startsWith('- 說人話：')) || '';
    if (BAD_JARGON.test(human)) err(file, t, '「說人話」出現統計術語（HR／RR／OR／CI）');
    const note = fieldLines.find(l => l.startsWith('- 備註：')) || '';
    if (/^- 備註：爭議/.test(note) && !/^- 備註：爭議（(證據|個案認定|法規修正中|立場)）：/.test(note)) err(file, t, '備註以「爭議」開頭時要標類型：爭議（證據／個案認定／法規修正中／立場）：');
    if (/[一-鿿]/.test(t) === false) err(file, t, '標題沒有中文');
  }
}

for (const w of warns) console.log('警告', w);
for (const e of errors) console.log('錯誤', e);
console.log(`${total} 條，${errors.length} 個錯誤，${warns.length} 個警告`);
process.exit(errors.length ? 1 : 0);

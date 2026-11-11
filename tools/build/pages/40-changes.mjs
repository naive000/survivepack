// 變動快報：changes/index.html 與 feed.xml（Atom 1.0）。
// 資料來源 data/changes.json（tools/lawwatch/changes_json.py 產生）。檔案不存在就輸出「尚無資料」頁，不讓建置失敗。
// lawwatch 快照只存條文雜湊，沒有舊條文：本頁只轉錄「哪部法、哪天監測、修正日期、哪幾條有變、本站哪些條目引用」，
// 不呈現修了什麼、不比對新舊、不評估影響。這個頁面模組也不得加任何分析文字。
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// 條號顯示用（verify-site.mjs 的電話偵測已排除「第 N 條」，不需要特殊跳脫）。
const escArt = (s, esc) => esc(s);
const list = v => Array.isArray(v) ? v.filter(x => typeof x === 'string' && x) : [];

export async function build(ctx) {
  const { helpers: H, layout } = ctx;
  const { esc, rel, siteUrl, NAME } = H;
  const file = join(ctx.outDir, 'data', 'changes.json');
  let data = null, readErr = '';
  if (existsSync(file)) {
    try { data = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { readErr = String(e.message || e); }
  }
  if (readErr) console.warn(`[40-changes] data/changes.json 讀取失敗，輸出「尚無資料」頁：${readErr}`);

  const items = data && Array.isArray(data.items) ? data.items.filter(i => i && typeof i === 'object') : [];
  const generated = data && DATE_RE.test(data.generated || '') ? data.generated : '';
  const knownIds = new Set(ctx.entries.map(e => e.id));

  // 新到舊：先依監測日（新→舊），同日依資料原順序
  const sorted = items.map((it, n) => ({ it, n })).sort((a, b) => String(b.it.date).localeCompare(String(a.it.date)) || a.n - b.n).map(x => x.it);
  const anchorOf = it => `c-${it.date}-${String(it.pcode || 'x').toLowerCase()}`;

  /* ---------- 頁面 ---------- */
  const cites = (a, changed) => {
    const cited = list(a.cited_articles);
    const hit = Array.isArray(a.cited_changed_articles) ? list(a.cited_changed_articles) : cited.filter(x => changed.includes(x));
    return { cited, hit };
  };
  const entryRow = (a, changed, it) => {
    const { cited, hit } = cites(a, changed);
    const t = esc(a.title || a.id);
    const title = knownIds.has(a.id) ? `<a class="ch-et" href="../e/${esc(a.id)}/">${t}</a>` : `<span class="ch-et">${t}</span>`;
    // 中性事實句，不加警示色；只轉錄「修正的條文」與「本條引用的條號」有交集，不推論法規內容
    const tag = hit.length ? `<span class="ch-hit">這次修正的條文包含本條引用的${escArt(hit.join('、'), esc)}</span>` : '';
    const small = [
      hit.length && it.amended_date ? `修正日期 ${esc(it.amended_date)}` : '',
      a.verified ? `本條核實日期 ${esc(a.verified)}` : '',
      cited.length ? `引用 ${escArt(cited.join('、'), esc)}` : ''
    ].filter(Boolean).join('　');
    return `<li>${title}${tag}${small ? `<small>${small}</small>` : ''}</li>`;
  };
  const card = it => {
    const changed = list(it.changed_articles);
    const aff = Array.isArray(it.affected_entries) ? it.affected_entries : [];
    const name = esc(it.law_name || '（未載法規名）');
    const nameHtml = it.law_url ? `<a href="${esc(it.law_url)}" target="_blank" rel="noopener">${name}</a>` : name;
    return `<article class="ch-card" id="${esc(anchorOf(it))}">
<h3>${nameHtml}</h3>
<dl>
<dt>修正日期</dt><dd>${esc(it.amended_date || '—')}${it.previous_amended_date ? `（前次 ${esc(it.previous_amended_date)}）` : ''}</dd>
<dt>內容有變的條號</dt><dd>${changed.length ? escArt(changed.join('、'), esc) : '—'}</dd>
</dl>
<h4>本站引用這部法的條目（${aff.length}）</h4>
${aff.length ? `<ul class="ch-list">\n${aff.map(a => entryRow(a, changed, it)).join('\n')}\n</ul>` : '<p class="ch-none">本站沒有條目引用這部法。</p>'}
</article>`;
  };

  let groups = '';
  if (sorted.length) {
    const byDate = new Map();
    for (const it of sorted) { const k = it.date || '—'; if (!byDate.has(k)) byDate.set(k, []); byDate.get(k).push(it); }
    groups = [...byDate].map(([d, arr]) => `<section class="ch-day" aria-labelledby="d-${esc(d)}">
<h2 id="d-${esc(d)}">監測日 ${esc(d)}<small>${arr.length} 部</small></h2>
${arr.map(card).join('\n')}
</section>`).join('\n');
  } else if (data && !readErr) {
    const last = (data.stats && DATE_RE.test(data.stats.date_max || '')) ? data.stats.date_max : '';
    groups = `<div class="callout"><h2>最近一次監測沒有發現變動</h2><p>最近監測日：${last ? esc(last) : '—'}</p></div>`;
  } else {
    groups = `<div class="callout"><h2>尚無資料</h2><p>變動快報的資料還沒產生，之後的監測有結果就會列在這裡。</p></div>`;
  }

  const body = `<nav class="crumb" aria-label="導覽"><a href="../">${NAME}</a> › 變動快報</nav>
<div class="changes">
<h1>變動快報</h1>
<p class="lead">我們定期比對全國法規資料庫，列出本站條目引用的法規哪天被修正、哪幾條的內容有變。系統只存條文的雜湊值、沒有舊條文，所以這裡不會寫修了什麼，也不比較新舊。要看新條文，點法規名連到官方頁面。</p>
<div class="ch-sub">
<a class="btn ghost" href="../feed.xml" type="application/atom+xml">Atom 訂閱</a>
<p>用 RSS 或 Atom 閱讀器訂閱。不用註冊、不收資料。</p>
</div>
<p class="ch-note">核實日期晚於修正日期，不代表已逐條對照新條文；以條目頁為準。</p>
${groups}
<p class="ch-src">資料產生日：${generated ? esc(generated) : '—'}。資料來源：全國法規資料庫 Open API，依「政府資料開放授權條款－第1版」使用。條文以官方原文為準。</p>
</div>`;

  const pageUrl = siteUrl('changes/');
  ctx.writeFile('changes/index.html', layout({
    title: '變動快報',
    description: '本站條目引用的法規最近被修正的清單：法規名、修正日期、內容有變的條號，以及本站哪些條目引用。可用 Atom 訂閱。',
    body, depth: 1, canonical: pageUrl, active: 'changes', mainClass: 'doc changes-doc', css: ['assets/changes.css'],
    extraHead: `<link rel="alternate" type="application/atom+xml" title="${esc(NAME)}｜變動快報" href="../feed.xml">`
  }));
  ctx.addUrl('changes/', { priority: '0.7', ...(generated ? { lastmod: generated } : {}) });

  /* ---------- Atom 1.0 ---------- */
  const ts = d => `${d}T00:00:00+08:00`;
  const latest = sorted.length && DATE_RE.test(sorted[0].date || '') ? sorted[0].date : (generated || ctx.today);
  const entries = sorted.filter(it => DATE_RE.test(it.date || '')).map(it => {
    const changed = list(it.changed_articles);
    const aff = Array.isArray(it.affected_entries) ? it.affected_entries : [];
    const summary = [
      `法規：${it.law_name || ''}`,
      `修正日期：${it.amended_date || '—'}`,
      `內容有變的條號：${changed.length ? changed.join('、') : '—'}`,
      `本站受影響條目：${aff.length} 條`
    ].join('；');
    return `<entry>
<title>${esc(`《${it.law_name || ''}》修正`)}</title>
<id>${esc(siteUrl('changes/#' + anchorOf(it)))}</id>
<link rel="alternate" type="text/html" href="${esc(siteUrl('changes/#' + anchorOf(it)))}"/>
<updated>${ts(it.date)}</updated>
<summary type="text">${esc(summary)}</summary>
</entry>`;
  });
  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="zh-TW">
<title>${esc(NAME)}｜變動快報</title>
<subtitle>本站條目引用的法規被修正的紀錄（只列法規名、修正日期、有變條號與受影響條目數）</subtitle>
<id>${esc(pageUrl)}</id>
<link rel="self" type="application/atom+xml" href="${esc(siteUrl('feed.xml'))}"/>
<link rel="alternate" type="text/html" href="${esc(pageUrl)}"/>
<updated>${ts(latest)}</updated>
<author><name>${esc(NAME)}</name></author>
${entries.join('\n')}
</feed>
`;
  ctx.writeFile('feed.xml', feed);   // 不進 sitemap
}

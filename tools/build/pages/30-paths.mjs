// 情境路徑頁：s/index.html（情境列表）與 s/<情境id>/index.html（分流題目＋路徑）。
// 資料：data/paths.json（編輯判斷：題目、路徑、步驟順序、why_here）；條目欄位（標題、核實日期、法源條號、過程成本、證據等級）
// 一律從 ctx.entries 逐字取用，這個模組不改寫、不摘要、不補充任何條目內容、數字、條號、金額、天數。
// 專線只用 paths.json 的 find_help（來自 docs/hotlines.md 白名單），原文帶入。
// 無 JS 也完整：題目與全部路徑都在 HTML 裡，選項是指向下一題或路徑的錨點連結；assets/paths.js 只負責「一次一題」。
import { readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const REVIEW_BADGE = '待專業審核';
const TOOL_LABEL = { severance: '資遣費', overtime: '加班費', leave: '特別休假' };   // 試算器按鈕上的名稱（介面文字，不是條目內容）

export async function build(ctx) {
  const { layout, helpers: H } = ctx;
  if (!H.SHOW_PATHS) { rmSync(join(ctx.outDir, 's'), { recursive: true, force: true }); return; }   // SHOW_PATHS=0（公開匯出）：不產生 s/，並清掉舊的
  const { esc, rel, siteUrl, makeInline, needsReview, NAME, REVERIFY_DAYS } = H;

  const data = JSON.parse(readFileSync(join(ctx.outDir, 'data/paths.json'), 'utf8'));
  const byId = new Map(ctx.entries.map(e => [e.id, e]));
  const ids = new Set(byId.keys());
  for (const e of ctx.entries) H.TITLES.set(e.id, e.title);   // inline() 把條目 id 換成標題連結

  // 待專業審核：沿用 e/ 頁的兩個來源（待審清單表格 ＋ 條目任何欄位含「待專業審核」），讓徽章與條目頁一致
  const reviewIds = new Set();
  const reviewMd = join(ctx.outDir, 'docs/needs-professional-review.md');
  if (existsSync(reviewMd)) {
    let cur = '';
    for (const line of readFileSync(reviewMd, 'utf8').split('\n')) {
      if (/^## /.test(line)) cur = line;
      const m = /^\|\s*(tw-[a-z0-9-]+)\s*\|/.exec(line);
      if (m && /^## (高|中|低)風險/.test(cur)) reviewIds.add(m[1]);
    }
  }
  for (const e of ctx.entries) if (needsReview(e)) reviewIds.add(e.id);

  // s/<id>/ 在 depth 2：條目連結 ../../e/<id>/；條目文字裡的 tw-… 交叉引用也指到 ../../e/
  const inline = makeInline(ids, '../../e/');
  const lines = (s, selfId) => s.length < 90 ? inline(s, selfId)
    : s.split(/(?<=。)(?=\S)/).map(x => `<span class="ln">${inline(x.trim(), selfId)}</span>`).join('');

  // 整頁說明只留這一處：中性色小橫幅（不用紅框；紅色留給條目頁的個別待審提醒）
  const BANNER = `<p class="pnote" role="note"><b>整頁待專業審核</b>　以下路徑是依處理先後編排的編輯建議，不是法律意見；內容尚未經專業人員審核，個案請洽專業人員。</p>`;
  const errs = [];

  /* ---------- 單一步驟 ---------- */
  function stepHtml(st, where) {
    const e = byId.get(st.entry);
    if (!e) { errs.push(`${where}：條目 ${st.entry} 不存在`); return ''; }
    const verified = e.meta['核實日期'] || '', law = e.meta['法源條號'] || '';
    // 卡片上只放提醒類徽章（待審、爭議；「核實已 N 天」由 paths.js 補在 .badges）；證據等級移進「依據與過程成本」
    const badges = [];
    if (reviewIds.has(e.id)) badges.push(`<span class="badge review" title="此條尚未經專業人員審核，請對照來源原文，個案請洽專業人員">${REVIEW_BADGE}</span>`);
    if (e.dispute) badges.push(`<span class="badge danger">${esc(e.disputeType ? '爭議・' + e.disputeType : '爭議')}</span>`);
    const dl = [
      ['核實日期', `<time datetime="${esc(verified)}" data-vd="${esc(verified)}">${esc(verified || '未標')}</time>`],
      law ? ['法源條號', inline(law, e.id)] : null,
      e.proc ? ['過程成本', lines(e.proc, e.id)] : null,
      ['證據等級', `<span class="badge ${e.grade || 'C'}">證據 ${esc(e.grade || '?')} 級</span>`]
    ].filter(Boolean).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    let tool = '';
    if (st.tool) {
      const slug = (/([a-z0-9-]+)\.html$/.exec(st.tool) || [])[1];
      tool = `<p class="tool"><a class="btn ghost" href="${esc(rel(2, st.tool))}">${esc(TOOL_LABEL[slug] ? `開啟${TOOL_LABEL[slug]}試算器` : '開啟試算器')}</a></p>`;
    }
    return `<li class="step">
<h3><a href="${rel(2, 'e/' + e.id + '/')}">${esc(e.title)}</a></h3>
<p class="why">${esc(st.why_here)}</p>
<div class="badges">${badges.join('')}</div>
${tool}
<details class="step-d"><summary>依據與過程成本</summary><dl class="basis-mini">${dl}</dl></details></li>`;
  }

  /* ---------- 單一情境頁 ---------- */
  for (const sc of data.scenarios) {
    const W = `s/${sc.id}`;
    const qs = sc.questions, ps = sc.paths;
    const qIds = new Set(qs.map(q => q.id));
    const targetHref = g => qIds.has(g) ? `#q-${g}` : `#path-${g}`;

    const qHtml = qs.map((q, qi) => `<section class="q" id="q-${esc(q.id)}" data-q="${esc(q.id)}" aria-labelledby="qt-${esc(q.id)}">
<h2 id="qt-${esc(q.id)}" tabindex="-1">${qs.length > 1 ? `<small class="qn">第 ${qi + 1} 題</small>` : ''}${esc(q.text)}</h2>
<ul class="opts">
${q.options.map((o, oi) => `<li><a class="opt" href="${esc(targetHref(o.goto))}" data-i="${oi}" data-goto="${esc(o.goto)}">${esc(o.label)}</a></li>`).join('\n')}
</ul>
</section>`).join('\n');

    const pHtml = ps.map(p => `<section class="path" id="path-${esc(p.id)}" data-path="${esc(p.id)}" aria-labelledby="pt-${esc(p.id)}">
<h2 id="pt-${esc(p.id)}" tabindex="-1"><small class="qn">適用情形</small>${esc(p.title)}</h2>
<ol class="steps">
${p.steps.map((st, si) => stepHtml(st, `${W}/${p.id} step${si + 1}`)).join('\n')}
</ol>
</section>`).join('\n');

    const help = (sc.find_help || []).length ? `<section class="help" aria-labelledby="help-t">
<h2 id="help-t">可以問誰</h2>
<ul>
${sc.find_help.map(h => `<li><span class="num">${/^\d+$/.test(h.number) ? `<a href="tel:${h.number}">${esc(h.number)}</a>` : esc(h.number)}</span><span class="say">${inline(h.say)}</span></li>`).join('\n')}
</ul>
</section>` : '';

    const body = `<nav class="crumb" aria-label="導覽"><a href="${rel(2, '')}">${NAME}</a> › <a href="../">情境路徑</a> › ${esc(sc.title)}</nav>
${BANNER}
<h1>${esc(sc.title)}</h1>
<div class="paths" id="paths" data-scenario="${esc(sc.id)}" data-start="${esc(sc.start)}">
<p class="lead">先回答幾個問題，找到最接近你的處理順序。每一步都連到條目原文與出處。</p>
<div class="wiz" id="wiz">
<p class="wiz-bar" id="wiz-bar" hidden><button class="btn ghost" type="button" id="wiz-back">上一步</button><button class="btn ghost" type="button" id="wiz-reset">重選</button></p>
<p class="wiz-trail" id="wiz-trail" hidden></p>
<div class="qs">
${qHtml}
</div>
</div>
<div class="ps">
${pHtml}
</div>
</div>
${help}`;

    const desc = `${sc.title}：回答 ${qs.length} 題以內，依處理先後列出該做的事，每一步連到條目原文與出處。整頁待專業審核，不是法律意見。`;
    const crumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: NAME, item: siteUrl() },
      { '@type': 'ListItem', position: 2, name: '情境路徑', item: siteUrl('s/') },
      { '@type': 'ListItem', position: 3, name: sc.title, item: siteUrl(`s/${sc.id}/`) }
    ] };
    ctx.writeFile(`s/${sc.id}/index.html`, layout({
      title: `情境：${sc.title}`, description: desc, ogDescription: desc, body, depth: 2,
      canonical: siteUrl(`s/${sc.id}/`), jsonLd: [crumbLd], css: ['assets/paths.css'],
      mainClass: 'doc paths-page',
      scripts: `<script>window.PATHS_REVERIFY=${Number(REVERIFY_DAYS) || 180}</script>\n<script src="${rel(2, 'assets/paths.js')}" defer></script>`
    }));
    ctx.addUrl(`s/${sc.id}/`, { priority: '0.7' });
  }

  /* ---------- 情境列表 s/ ---------- */
  const tiles = data.scenarios.map(sc =>
    `<li><a class="tile" href="${esc(sc.id)}/"><b>${esc(sc.title)}</b><small>回答 ${sc.questions.length} 題以內，分流到 ${sc.paths.length} 條處理路徑</small></a></li>`).join('\n');
  const idxBody = `<nav class="crumb" aria-label="導覽"><a href="../">${NAME}</a> › 情境路徑</nav>
${BANNER}
<h1>情境路徑</h1>
<p class="lead">遇到事不知道從哪下手時，選最接近的情境，回答幾個問題，就能看到「先做什麼、再做什麼」。每一步連到條目原文與出處。</p>
<ul class="tiles one">
${tiles}
</ul>`;
  const idxDesc = '遇到資遣、加班費、職災、詐騙、親人過世時，回答幾個問題，看到先做什麼、再做什麼，每一步連到條目原文與出處。整頁待專業審核。';
  ctx.writeFile('s/index.html', layout({
    title: '情境路徑：遇到事先做什麼', description: idxDesc, ogDescription: idxDesc, body: idxBody, depth: 1,
    canonical: siteUrl('s/'), css: ['assets/paths.css'], mainClass: 'doc paths-page'
  }));
  ctx.addUrl('s/', { priority: '0.8' });

  if (errs.length) throw new Error('情境路徑資料錯誤：\n' + errs.join('\n'));
}

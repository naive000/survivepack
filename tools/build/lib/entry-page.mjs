// 條目頁 e/<id>/index.html。頁面順序：標題 → 訊號列 → 說人話與收益（先給重點）→ 依據（<details> 預設收合，摘要一行：核實日期、法源條號）→ 成本、備註 → 試算按鈕 → 同章導覽。
// 樣式全在 assets/site.css，不內嵌。結構化資料（Article、FAQPage）與 OG 維持。
import { page } from './layout.mjs';
import {
  esc, clip, plainText, entryUrl, siteUrl, makeInline, URL_RE, trimUrl, needsReview,
  NAME, LICENSE_URL, REVERIFY_DAYS, LENS_LABEL, LABEL, DISPUTE_HELP, RATIO_RANK
} from './helpers.mjs';

// 摘要裡的法源條號：取前 40 字，並退回到最後一個頓號／分號，免得把「第1111條」切成「第1111…」
function lawClip(law) {
  const t = plainText(law);
  if ([...t].length <= 40) return t;
  const cut = [...t].slice(0, 40).join(''), k = Math.max(cut.lastIndexOf('、'), cut.lastIndexOf('；'), cut.lastIndexOf('，'));
  return (k >= 10 ? cut.slice(0, k) : cut) + '…';
}

export function makeEntryRenderer(ids) {
  const inline0 = makeInline(ids, '../');
  const inline = (t, id) => calcLinks(inline0(t, id));

  // 長欄位按句號分行，一行一件事
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
  // 連結文字用來源名稱（法規名、機關與標題），不顯示整串網址（網址在 href）。一項只有一個網址時，名稱本身就是連結。
  const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return '來源網頁'; } };
  const aOpen = u => `<a href="${esc(u)}" target="_blank" rel="noopener">`;
  function sourcesHtml(e) {
    return '<ol>' + sourceItems(e.src).map(it => {
      if (it.urls.length === 1 && it.text) return `<li>${aOpen(it.urls[0])}${esc(it.text)}</a></li>`;
      if (!it.urls.length) return `<li>${inline(it.text, e.id)}</li>`;
      return `<li>${it.text ? esc(it.text) + ' ' : ''}${it.urls.map(u => `${aOpen(u)}${esc(host(u))}</a>`).join('　')}</li>`;
    }).join('') + '</ol>';
  }
  // 備註或本文裡的「試算：calc/xxx.html」改成連結；條目頁底部另有按鈕
  const TOOL_LABEL = { severance: '資遣費', overtime: '加班費', leave: '特別休假' };
  const CALC_RE = /試算：calc\/([a-z0-9-]+)\.html/g;
  const calcLinks = html => html.replace(CALC_RE, (_, slug) => `<a class="xr" href="../../calc/${slug}.html">試算：${TOOL_LABEL[slug] || ''}試算器</a>`);

  return function renderEntry(e) {
    const sec = e.sec, url = entryUrl(e.id);
    const human = plainText(e.human);
    const desc = clip(plainText(e.human.replace(URL_RE, '')) || plainText(e.title), 120);
    const verified = e.meta['核實日期'] || '', law = e.meta['法源條號'] || '', region = e.meta['適用地區'] || '', expiry = e.meta['失效條件'] || '';
    const review = needsReview(e);

    // 訊號列：性價比只在收益已判定時顯示；收益 ? 時由證據等級頂上，並註明沒有檔位的原因
    const sig = [];
    const add = (cls, text, tip) => sig.push(`<span class="badge ${cls}"${tip ? ` title="${esc(tip)}"` : ''}>${esc(text)}</span>`);
    if (e.ratio) add('r' + RATIO_RANK[e.ratio], '性價比 ' + e.ratio, `編輯判斷，只在同一口徑（${LENS_LABEL[e.lens] || e.lens}）內可比，與證據等級無關`);
    add(e.grade || 'C', `證據 ${e.grade || '?'} 級`);
    if (!e.ratio) add('unk', '收益量級未判定，依證據等級參考');
    if (review) add('review', REVIEW_BADGE, '此條尚未經專業人員審核，請對照來源原文，個案請洽專業人員');
    if (e.dispute) add('danger', e.disputeType ? '爭議・' + e.disputeType : '爭議', DISPUTE_HELP[e.disputeType]);
    const tags = [e.lens && (LENS_LABEL[e.lens] || e.lens), ...['money', 'time', 'will'].map(d => e[d] && (LABEL[d][e[d]] || e[d]))].filter(Boolean);
    if (tags.length) add('plain', tags.join('・'));

    const basis = [
      ['核實日期', `<time datetime="${esc(verified)}">${esc(verified || '未標')}</time>`],
      law ? ['法源條號', inline(law, e.id)] : null,
      ['來源', sourcesHtml(e)],
      e.proc ? ['過程成本', lines(e.proc, e.id)] : null,
      ['證據等級', esc(e.gradeText || e.grade)],
      ['適用地區', esc(region || '未標')],
      expiry ? ['什麼情況要重查', inline(expiry, e.id)] : null
    ].filter(Boolean).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    const sum = `核實日期 ${esc(verified || '未標')}${law ? '　' + esc(lawClip(law)) : ''}`;

    // 試算按鈕：任何欄位出現「試算：calc/xxx.html」就在底部放一個
    const tools = [...new Set([e.cost, e.human, e.gain, e.proc, e.note].flatMap(t => [...t.matchAll(CALC_RE)].map(m => m[1])))];
    const calcBtn = tools.map(t => `<p class="calc-cta"><a class="btn" href="../../calc/${t}.html">開啟${TOOL_LABEL[t] || ''}試算器</a></p>\n`).join('');

    // 同章導覽：以本條為中心的 NEAR 條（章首章尾往內擠），全章清單改走首頁的章節篩選，避免每頁多帶 4–7 KB
    const list = sec.entries, n = list.length;
    const from = Math.max(0, Math.min(e.pos - (NEAR >> 1), n - NEAR)), to = Math.min(n, from + NEAR);
    const others = list.slice(from, to).map(x => x.id === e.id
      ? `<li aria-current="page">${esc(x.title)}</li>`
      : `<li><a href="../${x.id}/">${esc(x.title)}</a></li>`).join('\n');

    const body = `<nav class="crumb" aria-label="導覽"><a href="../../">${NAME}</a> › <a href="../../?sec=${sec.slug}">${esc(sec.title)}</a></nav>
${review ? `<div class="review" role="note">本條有待專業審核的內容<span>本條正文標出了尚待專業人員確認的部分，使用前請特別留意，個案請洽專業人員。</span></div>\n` : ''}<article data-verified="${esc(verified)}" data-reverify="${REVERIFY_DAYS}">
<h1>${esc(e.title)}</h1>
<div class="signals">${sig.join('')}</div>
${e.dispute && DISPUTE_HELP[e.disputeType] ? `<p class="dhelp">${esc(DISPUTE_HELP[e.disputeType])}。</p>\n` : ''}<div class="blk human"><h2>說人話</h2><p>${inline(e.human, e.id)}</p></div>
<div class="blk"><h2>收益</h2><p>${inline(e.gain, e.id)}</p></div>
<details class="basis"><summary><span class="b-t">依據、來源與過程成本</span><span class="b-v">${sum}</span></summary><dl>${basis}</dl></details>
<div class="blk"><h2>成本</h2><p>${inline(e.cost, e.id)}</p></div>
<div class="blk note"><h2>備註</h2><p>${lines(e.note, e.id)}</p></div>
</article>
${calcBtn}<p><a class="btn ghost" href="../../#${e.id}">回首頁看完整清單與篩選</a> <a class="btn ghost report" rel="noopener" href="${esc(reportUrl(e))}">回報錯誤</a></p>
<nav class="more" aria-label="同章其他條目"><h2>同章：${esc(sec.title)}（${n} 條）</h2>
<ul>
${others}
<li><a href="../../?sec=${sec.slug}">看本章全部 ${n} 條</a></li>
</ul></nav>`;

    // 結構化資料：Article 只留識別與日期欄位（說明文字已在 meta description 與 FAQPage 裡，不重複第三份），合成一個 @graph
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [{
        '@type': 'Article', headline: e.title, inLanguage: 'zh-TW', url, dateModified: verified || undefined, articleSection: sec.title, license: LICENSE_URL,
        author: { '@type': 'Organization', name: NAME, url: siteUrl() }, publisher: { '@type': 'Organization', name: NAME, url: siteUrl() }
      }, {
        '@type': 'FAQPage',
        mainEntity: [{ '@type': 'Question', name: e.title, acceptedAnswer: { '@type': 'Answer', text: human } }]
      }]
    };

    return page({
      title: e.title, description: desc, body, depth: 2, canonical: url, ogType: 'article', jsonLd: [graph], aiNote: '', beacon: true,
      footNote: '性價比檔由收益量級加花錢、花時間、要毅力三項成本合成，是編輯判斷，不是證據。'
    });
  };
}
// 回報錯誤：普通連結，開公開 repo 的糾錯 issue form 並預填 entry 欄（只放 id：標題 URL 編碼後每頁多約 0.3 KB，會破 12 KB 預算），不送任何資料
const REPORT_BASE = 'https://github.com/naive000/survivepack/issues/new';
const reportUrl = e => `${REPORT_BASE}?template=${encodeURIComponent('1-糾錯.yml')}&entry=${e.id}`;
const REVIEW_BADGE = '待專業審核';
const NEAR = 5;   // 同章導覽顯示的鄰近條數

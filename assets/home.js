/* 改編自 eternity4719/HowToLiveBetter index.html（MIT，Copyright (c) 2026 eternity4719），全文見 NOTICES.md */
/* 台灣生存包 首頁清單：讀 assets/index.json 畫卡片、篩選欄與章節目錄；search.json 搜尋時才載入。
   章節單選，其他多選（同組或、不同組且）；網址 ?q=&sec=<slug 或舊的數字>&ratio=…&dispute=1&review=。
   module.exports 只給 verify-site.mjs 比對結果數。 */
(function () {
  'use strict';

  var DIMS = ['ratio', 'lens', 'grade', 'money', 'time', 'will', 'review'];
  var RATIO_RANK = { '極高': 3, '高': 2, '一般': 1 };
  var LENS_LABEL = { '死亡率': '壽命', '健康': '健康', '金錢': '錢', '時間': '時間精力', '自由': '人身自由' };
  var LABEL = {
    money: { '0': '不花錢', '少': '花錢少', '多': '花錢多' },
    time: { '少': '順手', '中': '花幾小時', '多': '每天佔用' },
    will: { '否': '不用毅力', '些': '要一點毅力', '是': '要很多毅力' }
  };
  var DISPUTE_HELP = {
    '證據': '醫學或研究證據彼此衝突或強度有限，備註列出正反兩方',
    '個案認定': '法律效果要由法院或主管機關依個案認定，結果可能不同，備註列出正反兩方',
    '法規修正中': '法規剛修正或新舊版本交替，適用時點請對照官方最新公告',
    '立場': '涉及價值或倫理立場的不同主張，備註列出各方說法'
  };

  /* ---------- 篩選規則（純函式，node 測試共用） ---------- */
  function newState() {
    var s = { q: '', sec: '', dispute: false };
    DIMS.forEach(function (d) { s[d] = new Set(); });
    return s;
  }
  function terms(q) { return q.toLowerCase().split(/\s+/).filter(Boolean); }
  // 不含章節條件的比對。hay：全文搜尋文字（尚未載入傳 null，退回標題與說人話）；t：terms(state.q)
  function baseMatch(e, state, hay, t) {
    if (state.ratio.size && !state.ratio.has(e.ratio)) return false;
    if (state.lens.size && !state.lens.has(e.lens)) return false;
    if (state.grade.size && !state.grade.has(e.grade)) return false;
    if (state.money.size && !state.money.has(e.money)) return false;
    if (state.time.size && !state.time.has(e.time)) return false;
    if (state.will.size && !state.will.has(e.will)) return false;
    if (state.dispute && !e.dispute) return false;
    if (state.review.has('only') && !e.review) return false;
    if (state.review.has('hide') && e.review) return false;
    if (!t.length) return true;
    var h = hay != null ? hay : (e.title + '\n' + e.human).toLowerCase();
    return t.every(function (x) { return h.indexOf(x) !== -1; });
  }
  // e：index.json 的一列
  function match(e, state, hay) {
    if (state.sec !== '' && String(e.sec) !== state.sec) return false;
    return baseMatch(e, state, hay, terms(state.q));
  }
  // matched／tocSec：不含章節條件的命中（側欄各節數字）；shown／perSec：再加章節條件
  function tally(entries, state, search) {
    var t = terms(state.q), r = { shown: 0, matched: 0, ok: [], base: [], perSec: {}, tocSec: {} };
    entries.forEach(function (e) {
      var b = baseMatch(e, state, search ? search[e.id] : null, t), o = b && (state.sec === '' || String(e.sec) === state.sec);
      r.base.push(b); r.ok.push(o);
      if (b) { r.matched++; r.tocSec[e.sec] = (r.tocSec[e.sec] || 0) + 1; }
      if (o) { r.shown++; r.perSec[e.sec] = (r.perSec[e.sec] || 0) + 1; }
    });
    return r;
  }
  // sec：slug 或純數字（舊連結）→ 章節索引字串；不認得的當沒選
  function resolveSec(v, secs) {
    v = String(v || '');
    if (/^\d+$/.test(v)) return +v < secs.length ? String(+v) : '';
    for (var i = 0; i < secs.length; i++) if (secs[i].slug === v) return String(i);
    return '';
  }
  // 磁碟格式 v2（縮短欄位名、核實日期查表、省略 sec）→ 展開成 match／tally／畫面共用的列。對照表同 tools/build/lib/index-data.mjs 的 KEYS
  var KEYS = { i: 'id', t: 'title', h: 'human', l: 'lens', g: 'grade', m: 'money', ti: 'time', w: 'will', lv: 'level', r: 'ratio', lw: 'law', rv: 'review', ds: 'dispute', dt: 'disputeType' };
  function expand(d) {
    if (d.v !== 2) return d;   // 舊版（欄位名未縮短）原樣用
    var at = 0, entries = [];
    d.secs.forEach(function (s, si) {
      for (var k = 0; k < s.n; k++, at++) {
        var c = d.entries[at], o = { sec: si };
        for (var key in c) { if (key === 'd') o.verified = d.dates[c.d]; else if (KEYS[key]) o[KEYS[key]] = c[key]; }
        entries.push(o);
      }
    });
    return { v: d.v, count: d.count, secs: d.secs, entries: entries };
  }
  function readParams(qs, secs) {
    var p = new URLSearchParams(qs), s = newState();
    s.q = p.get('q') || ''; s.sec = resolveSec(p.get('sec'), secs); s.dispute = p.get('dispute') === '1';
    DIMS.forEach(function (d) { s[d] = new Set((p.get(d) || '').split(',').filter(Boolean)); });
    return s;
  }
  function toQuery(s, secs) {
    var p = new URLSearchParams();
    if (s.q) p.set('q', s.q);
    if (s.sec !== '' && secs[+s.sec]) p.set('sec', secs[+s.sec].slug);
    DIMS.forEach(function (d) {
      if (d === 'review') return;
      if (s[d].size) p.set(d, Array.from(s[d]).join(','));
    });
    if (s.dispute) p.set('dispute', '1');
    if (s.review.size) p.set('review', Array.from(s.review).join(','));
    return p.toString().replace(/%2C/g, ',');
  }

  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = { match: match, baseMatch: baseMatch, tally: tally, newState: newState, terms: terms, resolveSec: resolveSec, expand: expand, readParams: readParams, toQuery: toQuery, DIMS: DIMS };
    return;
  }

  /* ---------- 瀏覽器端 ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var root = document.getElementById('home');
  var SITE = (root && root.getAttribute('data-site')) || '';
  var REVERIFY = parseInt(root && root.getAttribute('data-reverify'), 10) || 180;
  var DATA = null, CARDS = [], EN = [], BY_ID = {}, IDS = new Set(), SEARCH = null, searchLoading = null, searchFailed = false;
  var state = newState();
  var mq = window.matchMedia('(max-width:960px)');
  var TOC_SEC = [], TOC_ON = null, TOC_SELK = null, TOC_MAN = {}, spyT = 0, spyLast = '';

  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\btw-[a-z0-9]+(?:-[a-z0-9]+)*\b/g, function (id) { return IDS.has(id) ? '<a class="xr" href="e/' + id + '/">' + id + '</a>' : id; });
  }
  function daysSince(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return null;
    return Math.floor((Date.now() - Date.UTC(+m[1], +m[2] - 1, +m[3])) / 864e5);
  }
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    return new Promise(function (res, rej) {
      var ta = document.createElement('textarea'); ta.value = t; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? res() : rej(); } catch (e) { rej(e); } ta.remove();
    });
  }
  function shareUrl(id) { return (SITE || new URL('./', location.href).href) + 'e/' + id + '/'; }
  function mk(tag, cls, html) { var el = document.createElement(tag); if (cls) el.className = cls; if (html != null) el.innerHTML = html; return el; }

  /* ---------- 建頁 ---------- */
  var FOLD = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function build() {
    var list = $('#list'), side = $('#f-sec');
    var all = mk('button', 'sec-link all', '<span class="st">全部章節</span><i id="n-all"></i>'); all.type = 'button'; all.dataset.sec = ''; all.setAttribute('aria-pressed', 'true'); side.appendChild(all);
    DATA.entries.forEach(function (e) { IDS.add(e.id); });
    var bySec = DATA.secs.map(function () { return []; });
    DATA.entries.forEach(function (e) { bySec[e.sec].push(e); });
    DATA.secs.forEach(function (s, si) {
      // 側欄：章節列（編號、名稱、符合數、折疊鈕）＋ 條目目錄
      var row = mk('div', 'sec-row'); row.dataset.sec = String(si);
      var b = mk('button', 'sec-link', '<span class="sn">' + (si + 1) + '.</span><span class="st">' + esc(s.title) + '</span><i>' + s.n + '</i>'); b.type = 'button'; b.dataset.sec = String(si); b.setAttribute('aria-pressed', 'false');
      var fold = mk('button', 'fold', FOLD); fold.type = 'button'; fold.setAttribute('aria-expanded', 'false'); fold.setAttribute('aria-controls', 'toc-' + si); fold.setAttribute('aria-label', '展開或收起「' + s.title + '」的條目目錄');
      row.appendChild(b); row.appendChild(fold); side.appendChild(row);
      var sub = mk('div', 'toc-sub'); sub.id = 'toc-' + si; sub.hidden = true; TOC_SEC[si] = sub;
      var none = mk('p', 'toc-none', '沒有符合目前篩選的條目'); none.hidden = true;
      var block = mk('section', 'sec-block', '<div class="sec-h"><h2>' + (si + 1) + '. ' + esc(s.title) + '</h2><span class="shown"><span class="k"></span> / ' + s.n + '</span></div>'); block.dataset.sec = String(si);
      s.intro.forEach(function (p) { block.appendChild(mk('p', 'intro', inline(p))); });
      bySec[si].forEach(function (e, i) {
        var a = mk('a', '', '<i>' + (i + 1) + '</i><span>' + esc(e.title) + '</span>'); a.href = '#' + e.id; a.dataset.go = e.id; a.title = e.title; sub.appendChild(a);
        var c = mk('article', 'card'); c.id = e.id;
        var badges = [];
        var add = function (cls, text, title) { badges.push('<span class="badge ' + cls + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + esc(text) + '</span>'); };
        if (e.ratio) {
          add('r' + RATIO_RANK[e.ratio], '性價比 ' + e.ratio, '編輯判斷：由收益量級（' + e.level + '）和三項成本合成，只在同一口徑（' + (LENS_LABEL[e.lens] || e.lens) + '）內可比，與證據等級無關');
          add(e.grade || 'C', '證據 ' + (e.grade || '?') + ' 級');
        } else {
          add(e.grade || 'C', '證據 ' + (e.grade || '?') + ' 級', '收益量級未判定，依證據等級參考');
          add('unk', '收益量級未判定，依證據等級參考');
        }
        if (e.review) add('review', '待專業審核', '此條尚未經專業人員審核，請對照來源原文，個案請洽專業人員');
        if (e.lens) add('plain', LENS_LABEL[e.lens] || e.lens);
        ['money', 'time', 'will'].forEach(function (d) { if (e[d]) add('plain', LABEL[d][e[d]] || e[d]); });
        if (e.dispute) add('danger', e.disputeType ? '爭議・' + e.disputeType : '爭議', DISPUTE_HELP[e.disputeType] || '備註裡有反方意見或證據衝突，請看備註');
        var age = daysSince(e.verified);
        if (age !== null && age > REVERIFY) add('warn', '核實已 ' + age + ' 天', '核實日期距今已久，法規與金額可能變動，請對照來源');
        var law = e.law && !/^(無|—|-)$/.test(e.law) ? ' ・ 法源：<b>' + esc(e.law) + '</b>' : '';
        c.innerHTML =
          '<div class="card-h"><span class="idx">' + (i + 1) + '</span><h3><a href="e/' + esc(e.id) + '/">' + esc(e.title) + '</a></h3></div>' +
          '<div class="badges">' + badges.join('') + '</div>' +
          '<p class="human">' + inline(e.human) + '</p>' +
          '<p class="trust">核實日期 <b' + (age !== null && age > REVERIFY ? ' class="old"' : '') + '>' + esc(e.verified || '未標') + '</b>' + law + '</p>' +
          '<div class="acts"><a class="btn sm" href="e/' + esc(e.id) + '/">看完整條文與來源</a>' +
          '<button class="share" type="button" data-share="' + esc(e.id) + '" aria-label="複製本條公開網址">分享</button></div>';
        block.appendChild(c);
        var card = { e: e, el: c, si: si, id: e.id, toc: a, h: $('.card-h', c), bh: $('.sec-h', block), i0: i === 0 };
        CARDS.push(card); EN.push(e); BY_ID[e.id] = card;
      });
      sub.appendChild(none); side.appendChild(sub);
      list.appendChild(block);
    });
    $('#tot').textContent = CARDS.length;
    $('#status').hidden = true;
  }

  /* ---------- 搜尋文字（延後載入） ---------- */
  function loadSearch() {
    if (SEARCH || searchFailed) return Promise.resolve();
    if (!searchLoading) {
      searchLoading = fetch('assets/search.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (d) { SEARCH = d.text; })
        .catch(function () { searchFailed = true; })
        .then(function () { searchLoading = null; });
    }
    return searchLoading;
  }
  function needSearch() { return terms(state.q).length > 0; }

  /* ---------- 網址與控制項 ---------- */
  function writeUrl() {
    var qs = toQuery(state, DATA.secs), h = location.hash, keep = '';
    if (h.length > 1) { try { var el = document.getElementById(decodeURIComponent(h.slice(1))); if (el && !el.hidden) keep = h; } catch (e) { } }   // 指向已被篩掉的條目的 #id 不留
    history.replaceState(null, '', (qs ? '?' + qs : location.pathname) + keep);
  }
  function syncControls() {
    $('#q').value = state.q; $('#f-dispute').checked = state.dispute;
    document.querySelectorAll('[data-dim] [data-v]').forEach(function (b) { b.setAttribute('aria-pressed', String(state[b.parentElement.dataset.dim].has(b.dataset.v))); });
    document.querySelectorAll('#f-sec .sec-link').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.sec === state.sec)); });
  }

  /* ---------- 章節目錄：選了節就展開；沒選時展開正在讀的那節。手動折疊優先，換章節就作廢 ---------- */
  function tocSync(hit, follow) {
    if (state.sec !== TOC_SELK) { TOC_MAN = {}; TOC_SELK = state.sec; }
    var open = state.sec !== '' ? state.sec : (hit && BY_ID[hit] ? String(BY_ID[hit].si) : '');
    TOC_SEC.forEach(function (sub, n) {
      var on = (n in TOC_MAN) ? TOC_MAN[n] : String(n) === open, row = sub.previousElementSibling;
      if (sub.hidden === on) sub.hidden = !on;
      row.classList.toggle('open', on); row.lastChild.setAttribute('aria-expanded', String(on));
    });
    if (TOC_ON) { TOC_ON.classList.remove('on'); TOC_ON.removeAttribute('aria-current'); }
    TOC_ON = hit && BY_ID[hit] ? BY_ID[hit].toc : null;
    if (!TOC_ON) return;
    TOC_ON.classList.add('on'); TOC_ON.setAttribute('aria-current', 'location');
    if (follow === false || !TOC_ON.offsetParent) return;   // 手動折疊不追蹤捲動；被藏起來的量不出位置
    var sb = $('#sidebar'), r = TOC_ON.getBoundingClientRect(), br = sb.getBoundingClientRect();
    if (r.top < br.top + 48 || r.bottom > br.bottom - 48) sb.scrollTop += r.top - br.top - sb.clientHeight / 3;   // 只動側欄自己的 scrollTop
  }
  // 捲動 spy：第一個沒被頂欄擋住的標題就是正在讀的那條（節標題算那節第一條）。只同步目錄高亮，不寫 hash
  function spy() {
    clearTimeout(spyT);
    spyT = setTimeout(function () {
      var vis = CARDS.filter(function (c) { return !c.el.hidden; }), hit = '';
      if (vis.length && vis[0].el.parentNode.getBoundingClientRect().top <= innerHeight * 0.3) {
        var top = Math.max(0, $('.site-head').getBoundingClientRect().bottom), above = '', prev = -1;
        hit = null;
        for (var i = 0; i < vis.length; i++) {
          var c = vis[i], t = c.h.getBoundingClientRect().top;
          if (c.si !== prev) { prev = c.si; t = Math.min(t, c.bh.getBoundingClientRect().top); }
          if (t < top) { above = c.id; continue; }
          hit = t < innerHeight ? c.id : above; break;
        }
        if (hit === null) hit = above;
      }
      if (hit === spyLast) return;
      spyLast = hit; tocSync(hit);
    }, 160);
  }
  function toggleToc(n) { TOC_MAN[n] = TOC_SEC[n].hidden; tocSync(spyLast, false); }

  /* ---------- 篩選 ---------- */
  function apply() {
    var wait = needSearch() && !SEARCH && !searchFailed;
    if (wait) loadSearch().then(function () { apply(); });
    var r = tally(EN, state, SEARCH);
    CARDS.forEach(function (c, i) {
      var ok = r.ok[i], b = r.base[i];
      if (c.el.hidden === ok) c.el.hidden = !ok;
      if (c.toc.hidden === b) c.toc.hidden = !b;   // 目錄行不跟章節篩選走：展開別節看到的是符合其他條件的條目
    });
    document.querySelectorAll('.sec-block').forEach(function (b) { var k = r.perSec[b.dataset.sec] || 0; b.hidden = k === 0; $('.shown .k', b).textContent = k; });
    TOC_SEC.forEach(function (sub, n) { var k = r.tocSec[n] || 0; sub.previousElementSibling.firstChild.lastChild.textContent = k; sub.lastChild.hidden = k !== 0; });
    $('#n-all').textContent = r.matched;
    $('#cnt').textContent = r.shown; $('#empty').hidden = r.shown !== 0 || wait;
    var note = $('#search-note');
    note.hidden = !(wait || (searchFailed && needSearch()));
    note.textContent = wait ? '正在載入全文搜尋 …' : '全文搜尋沒載入成功，目前只比對標題與說人話前 80 字。';
    syncControls(); writeUrl(); tocSync(spyLast);
  }
  function clearAll() { state.q = ''; state.sec = ''; state.dispute = false; DIMS.forEach(function (d) { state[d].clear(); }); }
  function resetAll() { clearAll(); apply(); toTop(); }
  // #q=關鍵字 → ?q=；與 #<條目id> 並存，只有 #q= 開頭才當搜尋
  function hashQuery() {
    var m = /^#q=(.*)$/.exec(location.hash); if (!m) return null;
    try { return decodeURIComponent(m[1].replace(/\+/g, ' ')).trim(); } catch (e) { return m[1].trim(); }
  }
  function applyHashQuery() {
    var q = hashQuery(); if (q === null) return false;
    clearAll(); state.q = q;
    history.replaceState(null, '', location.pathname);
    apply(); window.scrollTo({ top: 0 });
    return true;
  }
  // 離螢幕的卡片是估計高度，沿途渲染會推開目標，所以校正到兩次一致（最多 8 次）
  function settle(el) {
    var n = 0, last = NaN;
    (function go() { el.scrollIntoView({ block: 'start' }); var y = Math.round(el.getBoundingClientRect().top); if (++n < 8 && y !== last) { last = y; setTimeout(go, 50); } })();
  }
  function goTo(id, push) {
    var c = BY_ID[id]; if (!c) return;
    if (c.el.hidden) { clearAll(); apply(); }   // 目標被篩選藏起來了：清掉篩選再跳（母專案同做法）
    settle(c.i0 ? c.bh : c.el); c.el.classList.remove('flash'); void c.el.offsetWidth; c.el.classList.add('flash');
    if (location.hash !== '#' + id) history[push ? 'pushState' : 'replaceState'](null, '', location.pathname + location.search + '#' + id);
    spyLast = id; tocSync(id);
  }
  function onHash() {
    if (applyHashQuery()) return;
    var id = ''; try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
    if (id === 'search') { $('#q').focus(); return; }
    if (id === 'filter') { openFilter(); return; }
    if (id) goTo(id);
  }

  /* ---------- 手機抽屜（≤960px）；關著時 inert，Tab 不會跑進看不見的欄位 ---------- */
  function setMenu(on) {
    var sb = $('#sidebar');
    sb.classList.toggle('open', on); $('#backdrop').classList.toggle('on', on); $('#menu').setAttribute('aria-expanded', String(on));
    sb.inert = mq.matches && !on;
  }
  function toTop() { setMenu(false); window.scrollTo({ top: 0 }); spy(); }
  function openFilter() { if (mq.matches) setMenu(true); else { var f = $('#f-sec .sec-link'); if (f) f.focus(); } }

  function wire() {
    // 底部工具列「全部」在清單頁改成「篩選」（沒有 JS 時維持「全部」→ #list）
    var tl = $('.toolbar a[href$="#list"]');
    if (tl) { tl.setAttribute('href', '#filter'); $('span', tl).textContent = '篩選'; tl.addEventListener('click', function (ev) { ev.preventDefault(); openFilter(); }); }
    document.addEventListener('click', function (ev) {
      var chip = ev.target.closest('[data-dim] [data-v]');
      if (chip) {
        var dim = chip.parentElement.dataset.dim, set = state[dim], v = chip.dataset.v;
        var was = set.has(v); if (dim === 'review') set.clear();   // 只看／隱藏互斥
        if (!was) set.add(v); else set.delete(v);
        apply(); toTop(); return;
      }
      var sh = ev.target.closest('button[data-share]');
      if (sh) {
        var url = shareUrl(sh.dataset.share);
        copyText(url).then(function () { sh.textContent = '已複製'; sh.classList.add('ok'); setTimeout(function () { sh.textContent = '分享'; sh.classList.remove('ok'); }, 1600); },
          function () { window.prompt('複製這條的公開網址', url); });
        return;
      }
      var fd = ev.target.closest('#f-sec .fold');
      if (fd) { toggleToc(fd.parentNode.dataset.sec); return; }
      var sl = ev.target.closest('#f-sec .sec-link');
      if (sl) {
        var s = sl.dataset.sec;
        if (s !== '' && s === state.sec) { toggleToc(s); return; }   // 再點已選的章節：只收起或展開目錄，不取消
        state.sec = s; apply(); toTop(); return;
      }
      var go = ev.target.closest('#f-sec .toc-sub a[data-go]');
      if (go) { ev.preventDefault(); setMenu(false); goTo(go.dataset.go, true); }
    });
    var t = null, q = $('#q');
    q.addEventListener('focus', function () { loadSearch(); });
    q.addEventListener('input', function (ev) { loadSearch(); clearTimeout(t); t = setTimeout(function () { state.q = ev.target.value.trim(); apply(); }, 120); });
    $('#f-dispute').addEventListener('change', function (ev) { state.dispute = ev.target.checked; apply(); toTop(); });
    $('#reset').addEventListener('click', resetAll); $('#reset2').addEventListener('click', resetAll);
    $('#menu').addEventListener('click', function () { setMenu(!$('#sidebar').classList.contains('open')); });
    $('#backdrop').addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { ev.preventDefault(); q.focus(); }
      if (ev.key === 'Escape') { setMenu(false); if (document.activeElement === q) q.blur(); }
    });
    if (mq.addEventListener) mq.addEventListener('change', function () { setMenu(false); });
    addEventListener('scroll', spy, { passive: true });
    addEventListener('hashchange', onHash);
  }

  /* ---------- 啟動 ---------- */
  $('#status').hidden = false; $('#sidebar').inert = mq.matches;
  fetch('assets/index.json').then(function (r) { if (!r.ok) throw new Error('index.json ' + r.status); return r.json(); })
    .then(function (d) {
      DATA = expand(d); state = readParams(location.search, DATA.secs); build(); wire(); apply();
      if (!applyHashQuery()) onHash();
    })
    .catch(function (err) {
      $('#status-t').textContent = '讀取清單失敗（' + String(err && err.message) + '）。請透過網站開啟，不要直接開本機檔案。';
    });
})();

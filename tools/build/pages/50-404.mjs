// 404.html（站根）。GitHub Pages 對任何找不到的網址都回這一頁，所以它可能被放在 /a/b/c/ 這種任意深度的路徑下。
// 理由：站內其他頁一律用相對路徑（depth 算出 ../），在 404 頁會因網址深度不同而失效，所以這一頁
//  1) 樣式內聯（極小一段，不連 assets/site.css；verify 的外部資源檢查也不允許絕對網址的 <link>），用 prefers-color-scheme 跟系統深淺色；
//  2) 站內連結一律用 helpers.siteUrl() 的絕對網址（吃環境變數 SITE_URL，與 canonical 同一套）。
// 不進 sitemap（不呼叫 ctx.addUrl），robots noindex。
export async function build(ctx) {
  const { helpers: H } = ctx;
  const { esc, siteUrl, NAME, SLOGAN, DISCLAIMER } = H;
  const links = [
    ['首頁', siteUrl(), '回到條目清單與篩選'],
    H.SHOW_PATHS ? ['情境路徑', siteUrl('s/'), '遇到資遣、加班費、職災、詐騙、親人過世時，先做什麼'] : null,   // SHOW_PATHS=0（公開匯出）不連 s/
    ['搜尋條目', siteUrl('#search'), '用關鍵字找條目']
  ].filter(Boolean);
  const css = ':root{color-scheme:light dark;--p:#FBF8F3;--c:#fff;--l:#E3DACB;--i:#1C1A17;--i2:#4A453E;--b:#C2410C;--ob:#fff}' +
    '@media(prefers-color-scheme:dark){:root{--p:#12110F;--c:#1C1A17;--l:#34302A;--i:#F5F1EA;--i2:#D2CABD;--b:#FB923C;--ob:#12110F}}' +
    '*{box-sizing:border-box}body{margin:0;background:var(--p);color:var(--i);font:17px/1.8 -apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif;line-break:strict}' +
    'main{max-width:40rem;margin:0 auto;padding:32px 16px}h1{font-size:26px;line-height:1.4;margin:0 0 8px}p{margin:0 0 12px;color:var(--i2)}' +
    'ul{list-style:none;margin:20px 0;padding:0;display:grid;gap:12px}a.t{display:block;min-height:44px;padding:12px 16px;border:1px solid var(--l);border-radius:12px;background:var(--c);color:var(--i);text-decoration:none}' +
    'a.t b{display:block;color:var(--b);font-size:18px}a.t small{display:block;color:var(--i2);font-size:15px;line-height:1.6}' +
    '.d{margin-top:24px;padding:12px 16px;border:1px solid var(--l);border-radius:10px;font-size:15px;line-height:1.75;color:var(--i2)}:focus-visible{outline:3px solid var(--b);outline-offset:2px}';
  const html = `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>找不到這個頁面｜${NAME}</title>
<meta name="robots" content="noindex">
<style>${css}</style>
</head>
<body>
<main>
<p><b>${NAME}</b>（${SLOGAN}）</p>
<h1>找不到這個頁面</h1>
<p>網址可能打錯了，或這一頁已經搬家。從下面${links.length === 3 ? '三' : '兩'}個地方開始找：</p>
<ul>
${links.map(([t, u, d]) => `<li><a class="t" href="${esc(u)}"><b>${t}</b><small>${d}</small></a></li>`).join('\n')}
</ul>
<p class="d">${DISCLAIMER}</p>
</main>
</body>
</html>
`;
  ctx.writeFile('404.html', html);
}

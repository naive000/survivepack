# 台灣生存包

遇到事就打開。按性價比排序的台灣生活法規查詢工具：每條寫明成本、收益、證據等級，附官方原文、法源條號與核實日期。啟發自 [eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter)，內容依台灣制度重寫。

本站為一般資訊整理，不構成法律或醫療建議，個案請洽專業人員。

## 本機預覽

```
python3 -m http.server 8000
```

打開 `http://localhost:8000`。首頁是純靜態單頁（`index.html`），讀取 `book/manifest.json` 列出的 Markdown 章節檔，看首頁不需要建置。

## 建置（預渲染條目頁）

```
npm run build        # 先跑 check-entries，0 錯誤才建；或直接 node tools/build/build.mjs
npm run check        # 只檢查條目
```

建置把 `book/` 每個條目輸出成獨立靜態頁 `e/<id>/index.html`（含 OG 標籤、Article 與 FAQPage 結構化資料、信任區塊），並產生 `sitemap.xml`、`llms.txt`、`llms-full.txt`。這些輸出要一起提交，Pages 直接吃。改了 `book/` 就要重建。輸出是確定性的，內容沒變不會產生差異。站點網址預設 `https://naive000.github.io/survivepack/`，要改用環境變數 `SITE_URL`。無依賴，只需要 node。本機預覽條目頁：`http://localhost:8000/e/<id>/`。

## 檔案

| 路徑 | 內容 |
|---|---|
| `index.html` | 網頁（篩選、搜尋、深色模式） |
| `book/` | 已核實的章節與 `manifest.json` |
| `drafts/` | 未核實的草稿，不上網頁 |
| `docs/verification/` | 已上線條目的核實紀錄 |
| `docs/hotlines.md` | 專線白名單 |
| `e/`、`sitemap.xml`、`llms.txt`、`llms-full.txt` | 建置輸出（`tools/build/build.mjs` 產生，不要手改） |
| `tools/build/` | 預渲染腳本與共用的條目解析（`lib/entry.mjs`） |
| `tools/check-entries.mjs` | 條目格式與核實規則檢查：`node tools/check-entries.mjs` |
| `CLAUDE.md` | 專案規則（給協作者與 AI 代理） |
| `NOTICES.md` | 第三方授權聲明 |

## 授權

程式碼 MIT（`LICENSE`）；內容 CC BY-NC 4.0（`LICENSE-CONTENT.md`），商業使用請另洽。第三方聲明見 `NOTICES.md`。

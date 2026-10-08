# 核實紀錄：tw-health-dental-scaling-nhi

進 `book/`：2026-10-01（第 2 輪，題目編號 bk-023）。

## 自行核對（2026-10-01）

- 條文：全國法規資料庫 Open API 本機檔（整編日 2026-09-18）。草稿裡每個法條引文，都由程式從官方 JSON 抽出（`quote.py`），再由檢查腳本（`verify_r2.py`）逐字比對，全部一致，沒有不符。引用的法規與條號：全民健康保險法第68、82條。
- 條目裡的條號都有對應引文；草稿裡的數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現的屬於民國年換算、一次、算例等，已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.nhi.gov.tw/ch/cp-6968-7f6d8-3255-1.html（頁面日期 2023-11-29）：BrowserOS 重開頁面逐句比對
- https://med.nhi.gov.tw/ihqe0000/pepT228.html?ind=228&type=3（頁面日期 無）：BrowserOS 重開頁面逐句比對
- https://pubmed.ncbi.nlm.nih.gov/22483056/（頁面日期 2012-06（Am J Med 2012 Jun;125(6):568-75；只讀摘要））：NCBI E-utilities efetch 摘要逐字比對
- https://pubmed.ncbi.nlm.nih.gov/42400461/（頁面日期 2026-07-04（J Periodontol 線上先行版；只讀摘要））：NCBI E-utilities efetch 摘要逐字比對

## agent 回報

- 背景 agent（Sonnet）產出卷宗與草稿；我用上述腳本核對引文，再讀過整份草稿。

## 已知限制與「本條不寫」（agent 列出）

- 全口牙結石清除的給付間隔（每半年一次）與孕婦、糖尿病、高風險疾病者的較短間隔：只在 2012 年支付標準 PDF 與 2022-11-11 衛福部頁找到，都早於 2023-10，現行支付標準全文未取得，待核實。
- 洗牙的部分負擔金額與支付點數：未取得現行官方頁，不寫。
- 牙周病統合照護的給付點數與完整條件細節：只引頁面的概述，細節與現行版本未核實。
- 健保署與牙醫師公會的申訴電話：頁面所列電話不在 docs/hotlines.md 白名單，不寫。
- 洗牙是否「傷牙」「越洗越鬆」等民間說法：無官方或文獻依據，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-dental-scaling-nhi.med.md` 一點發現修改。

### 逐點處理
1. 漏了直接檢驗洗牙間隔的 Cochrane 2018 反方 → **採納**。備註爭議段補：Cochrane 2018 納入英國兩個試驗，對象是沒有嚴重牙周炎、本來就定期看牙的成人；每半年或每年例行洗牙，和不排定洗牙相比，2 到 3 年內牙齦炎與牙周囊袋深度幾乎沒有差別，只有牙結石略少。來源新增 PMID 30590875（只讀摘要）。
   - 依據：PMID 30590875 摘要「Both studies were conducted in UK general dental practices and involved adults without severe periodontitis who were regular attenders at dental appointments.」「Two studies compared planned, regular interval (six- and 12-monthly) scale and polish treatments versus no scheduled treatment. We found little or no difference between groups over a two- to three-year period for gingivitis, probing depths, oral health-related quality of life (all high-certainty evidence)」「Regular planned scale and polish treatments produced a small reduction in calculus levels」。

### 沒改的點（預審列為需牙醫判斷）
- Cochrane 對象對台灣一般民眾或牙周病者的適用性、健保建議間隔要不要改說法：不改；說人話仍照健保署指標頁原句。
- Gandhi 2026 的「牙周治療」是否含齦下刮除：條目已寫「做的是牙周治療」，不改。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 30590875，只讀摘要。
- curl（2026-10-03，自行開啟核對）：健保署醫療品質資訊公開網指標頁 https://med.nhi.gov.tw/ihqe0000/pepT228.html?ind=228&type=3（頁面無日期），原句「一般每半年至一年要作一次全口牙結石清除，維持牙周健康」一致。
- 核實日期未改（仍 2026-10-01）：健保署 nhi.gov.tw 頁面無法自動抓取，「民國84年3月」「美容用途的牙面色素去除不在給付內」本次未核對、未改動；健保法條文與 PMID 22483056、42400461 本次未重開。

## 2026-10-07 標籤修正

口徑 死亡率→健康，收益維持 ?（引用的心肌梗塞資料是觀察性關聯，主要收益是口腔健康）。依據：2026-10-07 健康口徑。

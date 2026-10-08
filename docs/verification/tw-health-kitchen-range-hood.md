# 核實紀錄：tw-health-kitchen-range-hood

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-552）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.bsmi.gov.tw/wSite/public/Data/f1698903419678.pdf（頁面日期 2023-10-29）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-62351-1.html（頁面日期 2024-08-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-62351-1.html（頁面日期 2024-08-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=29164315&rettype=abstract&retmode=text（頁面日期 2018-02-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=27284248&rettype=abstract&retmode=text（頁面日期 2016-05-19）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 以死亡為終點、證明使用抽油煙機能降低肺癌死亡的研究：查無。
- 抽油煙機的電費或換機成本：未查。
- 國民健康署 hpa.gov.tw 的油煙衛教頁：curl 讀不到（憑證問題），未引用。
- 台灣本土的烹調油煙暴露與肺癌風險數字：未取得官方統計。
- 特定機型、風量、安裝高度的數值標準：BSMI 指南只寫「依安裝說明」，未寫數字。
- 抽油煙機清潔頻率的數字：指南寫「經常」，未寫天數或月數。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-kitchen-range-hood.med.md` 一點發現，自行重讀摘要後修改。核實日期改為 2026-10-03。

### 逐點處理
1. 1.98 倍漏了「不吸菸」條件——**採納**。
   - PMID 29164315 摘要：「for cooking female, the pooled OR of cooking oil fume exposure was 1.98 (95% CI 1.54, 2.54, I 2 = 79%, n = 15) among non-smoking population and 2.00 (95% CI 1.46, 2.74, I 2 = 75%, n = 10) among partly smoking population. For cooking males, the pooled OR of lung cancer was 1.15 (95% CI 0.71, 1.87; I 2 = 80%, n = 4).」
   - 改法：收益改為「不吸菸女性中…1.98 倍」，並補部分吸菸女性 2.00 倍（1.46–2.74）、男性 1.15 倍（0.71–1.87）未達統計顯著。

### 沒改的點（預審列為需人類判斷）
- 兩篇統合分析多為病例對照研究，用於台灣女性並標 A 是否合適：條目證據等級括號與備註已寫明觀察性、不能證明因果；等級依機械規則維持 A，是否降級留給專業審核。
- 「開始就開、結束後多開約 5 分鐘」出自 BSMI 器具使用指南，不是醫學研究；條目沒有聲稱它有降低肺癌的數據，不改。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 29164315（通風不良 1.20、快炒 1.89、油炸 1.41 與條目一致）、27284248（「three population-based case-control and ten hospital-based case-control studies」、未使用排煙設備 RR 2.11（1.54-2.89）與條目一致）。只讀摘要。
- curl＋markitdown（2026-10-03）：BSMI PDF https://www.bsmi.gov.tw/wSite/public/Data/f1698903419678.pdf（「烹調開始時即應開啟抽油煙機，另於烹調結束後多運轉約5分鐘」「可將門窗開個小縫，但若窗戶正對抽油煙機，則不…」「須由專業人員依安裝說明執行安裝」）。
- curl（2026-10-03）：https://www.mohw.gov.tw/cp-16-62351-1.html，建檔 110-07-23、更新 113-08-19，與條目一致。
- 未能重讀：無。

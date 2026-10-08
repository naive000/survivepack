# 核實紀錄：tw-health-hepatitis-b-hcc-surveillance

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-006）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://pubmed.ncbi.nlm.nih.gov/15042359/（頁面日期 2004-07-01）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/37667043/（頁面日期 2023-09-04）：NCBI E-utilities 摘要比對
- https://dep.mohw.gov.tw/PRO/fp-2731-87266-120.html（頁面日期 2026-07-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/pro/fp-2731-84593-120.html（頁面日期 2025-11-20）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://pubmed.ncbi.nlm.nih.gov/22972059/（頁面日期 2012-09-12）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 健保給付「腹部超音波追蹤」的現行給付條件與次數；健保署網站（nhi.gov.tw）連線被拒，讀不到官方頁面，不用記憶補。
- 台灣現行官方統一的 B 肝帶原者追蹤間隔；只找到超過 3 年的舊頁面，不作為現行規則依據。
- 追蹤檢查的自付金額。
- 個別讀者適用何種追蹤間隔（不下個案結論）。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-hepatitis-b-hcc-surveillance.med.md` 兩點發現，逐點自行重讀摘要後修改。核實日期改為 2026-10-03。

### 逐點處理
1. Zeng 2023 的風險比被讀成帶原者整體死亡率——**採納**。
   - PMID 37667043 摘要：「the adjusted hazard ratios of death after correction for lead-time and length-time biases for screen-detected cancers at the prevalent and incident rounds were 0.74 (95% confidence interval = 0.60-0.91) and 0.52 (95% confidence interval = 0.40-0.68), respectively.」
   - 改法：寫明是「篩檢發現的肝癌病人（第一輪與後續輪）」、校正「領先時間與病程長度」偏差、是肝癌病人的存活比較、不是帶原者整體死亡率。摘要沒寫比較對象，條目也寫「摘要未寫比較對象」，不自行推斷。
2. 考科藍回顧沒進來源、沒點明它對上海試驗的評價——**採納**。
   - PMID 22972059 摘要：「Three randomised clinical trials were included in this review. All of them had a high risk of bias. One trial was conducted in Shanghai, China. ... According to the 2004 trial report ... We could not draw any definite conclusions from it.」
   - 改法：來源補 PMID 22972059；爭議句補「考科藍對本條引用的 2004 年上海試驗也無法下確定結論」，並補 PMID 15042359 的「The screened group completed 58.2 percent of the screening offered.」

### 待專業審核／沒改的點
- 證據等級 A：機械規則（RCT、有具體數字）可標 A，但唯一的 RCT 被考科藍評為高偏差風險；已在備註加「待專業審核」，等級暫不改。
- 標題只寫「腹部超音波」，研究介入是超音波加胎兒蛋白：說人話已寫兩者，標題要不要改留給使用者或醫師決定，本次未改。
- 哪些帶原者適用每 6 個月追蹤：臨床判斷，條目已寫由醫師依病情決定。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 15042359（18,816 人、0.63，95%CI 0.41-0.98、35-59 歲，與條目一致）、37667043、22972059。只讀摘要，未讀全文。
- curl（2026-10-03）：https://dep.mohw.gov.tw/PRO/fp-2731-87266-120.html（建檔／更新 115-07-28）、https://dep.mohw.gov.tw/pro/fp-2731-84593-120.html（建檔／更新 114-11-20），日期與條目一致；本次只核日期，內容未變動部分沿用 2026-10-01 核對。
- 未能重讀：無。

## 2026-10-07 標籤修正

錢 0→少：成本欄寫在健保院所追蹤、自付額未核實、沒寫金額。依據：2026-10-07 部分負擔另計統一標少。

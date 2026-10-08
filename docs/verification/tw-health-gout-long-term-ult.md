# 核實紀錄：tw-health-gout-long-term-ult

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-038）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://dep.mohw.gov.tw/pro/cp-2731-76110-120.html（頁面日期 2023-09-27）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=32391934&rettype=abstract&retmode=text（頁面日期 2020-05-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39636389&rettype=abstract&retmode=text（頁面日期 2024-12-05）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38771265&rettype=abstract&retmode=text（頁面日期 2024-05-21）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各降尿酸藥品的健保給付價格、部分負擔與自費金額，本條未引官方現行資料。
- 首次開立 allopurinol 前 HLA-B*5801 基因檢測的現行健保給付條件（來源頁面建檔 112-09-27，略超過三年）。
- ACR 指引為 2020 年版本，本條核實日查無更新版。
- 各降尿酸藥品的起始劑量、調整方式與停藥時機，屬醫師個別判斷，本條不寫。
- 痛風急性發作的止痛藥選擇與劑量，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-gout-long-term-ult.med.md` 兩點發現，逐點自行重讀摘要後修改。核實日期改為 2026-10-03。

### 逐點處理
1. 收益漏了族群與研究設計——**採納**。
   - 自行重讀 PMID 39636389 摘要：「in patients diagnosed with gout or hyperuricemia」「This meta-analysis included 11 comparative studies encompassing 38,396 ULT users and 47,530 controls」「compared to patients not receiving ULT (HR = 0.783, 95% confidence interval [CI] = 0.702-0.874」。
   - 改法：收益補「痛風或高尿酸血症病人中」「研究對象含沒有痛風的高尿酸者」「比的是有用藥與沒用藥的人，摘要未說是隨機分派，只能看出相關，不能證明因果」。證據等級括號補「比的是用藥者與未用藥者，摘要未說是隨機試驗」。
   - 部分不採：預審建議直接寫「非隨機比較研究」「研究為觀察性」。Lee 摘要只寫 comparative studies，沒寫設計；「real-world setting」是另一篇（PMID 38771265）的用語，不能套到本篇。故只寫「摘要未說是隨機」。證據等級依機械規則（統合分析、有具體數字）維持 A。
   - 備註補交叉引用 tw-health-asymptomatic-hyperuricemia-no-drug，避免讀者混淆。
2. 「預防治療」不清楚——**採納**。PMID 32391934 摘要：「When initiating ULT, concomitant antiinflammatory prophylaxis therapy for a duration of at least 3-6 months was strongly recommended.」改為「抗發炎藥預防發作」。

### 待專業審核／沒改的點
- 已有心血管疾病者用 febuxostat 是否加提醒：本條來源未涉及（預審另讀的 PMID 33342914 不是本條來源，本次未讀），已在備註加「待專業審核」。
- HLA-B*5801 要不要寫成「開 allopurinol 前先問醫師要不要驗」：臨床判斷，不改。
- Lee 2024 與 Nowak 2024 哪一篇當收益依據：兩篇方向不同，已列爭議，不改。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 39636389、32391934、38771265（Nowak：「no effect of the therapy on all-cause mortality」「heart failure (28% risk increase)」與備註一致）。只讀摘要。
- curl（2026-10-03）：https://dep.mohw.gov.tw/pro/cp-2731-76110-120.html，建檔與更新 112-09-27（2023-09-27），與條目一致，條目已標超過三年。
- 未能重讀：無。

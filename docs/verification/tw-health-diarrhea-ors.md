# 核實紀錄：tw-health-diarrhea-ors

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-055）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://dep.mohw.gov.tw/pro/cp-2731-71748-120.html（頁面日期 2022-09-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/QAPage/h5jfdG8vi3tGUDO8fNAoFQ（頁面日期 2025-04-21）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41504802&rettype=abstract&retmode=text（頁面日期 2026-01-08）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42003168&rettype=abstract&retmode=text（頁面日期 2026-04-16）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 口服電解液的售價：查不到可引用的官方價格，不寫金額。
- 脫水嚴重程度的分級與靜脈輸液時機：本條不寫。
- 細菌性腸胃炎是否要用抗生素：本條不寫，洽醫師。
- 各年齡層的補充量：查不到可引用的官方數字，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

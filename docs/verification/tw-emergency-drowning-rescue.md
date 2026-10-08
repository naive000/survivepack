# 核實紀錄：tw-emergency-drowning-rescue

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-113）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：災害防救法第29條；水域遊憩活動管理辦法第8、9條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://dep.mohw.gov.tw/PRO/cp-2731-83067-120.html（頁面日期 2025-07-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/PRO/cp-2731-83067-120.html（頁面日期 2025-07-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/PRO/cp-2731-83067-120.html（頁面日期 2025-07-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/PRO/cp-2731-83067-120.html（頁面日期 2025-07-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=26156246&rettype=abstract&retmode=text（頁面日期 2015-07-10）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34205391&rettype=abstract&retmode=text（頁面日期 2021-06-19）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=32936817&rettype=abstract&retmode=text（頁面日期 2020-09-16）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=33578330&rettype=abstract&retmode=text（頁面日期 2021-06-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 台灣官方的溺水救援統計（沒查到可直接引用的中央統計）
- 心肺復甦術的按壓深度與速率（急症先求助，操作見 tw-emergency-cpr-aed）
- 個別水域的救生員配置與禁止區域公告（依各管理機關公告）
- 教育部體育署原始頁面（curl 讀取不到，改用衛福部轉載頁）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

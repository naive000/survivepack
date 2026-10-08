# 核實紀錄：tw-health-no-extreme-weight-control

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-018）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.mohw.gov.tw/cp-16-81687-1.html（頁面日期 2025-03-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-81687-1.html（頁面日期 2025-03-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-81687-1.html（頁面日期 2025-03-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=31787929&rettype=abstract&retmode=text（頁面日期 2019-11-08）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=32991309&rettype=abstract&retmode=text（頁面日期 2020-10-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=26169883&rettype=abstract&retmode=text（頁面日期 2016-01-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 極低熱量飲食的每日熱量門檻與需要醫療監督的條件：國健署相關頁面在 hpa.gov.tw，本環境無法以 curl 讀取，不寫。
- 催吐與濫用瀉藥的個別併發症清單與發生率：只讀到回顧摘要的概括敘述，沒有可引用的具體數字，不寫。
- 極端節食與復胖的因果關係：現有證據多為觀察性關聯，不寫成因果。
- 每週減重幾公斤才算安全的官方數字：沒有可重複抓取且未超過三年的現行官方頁面，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

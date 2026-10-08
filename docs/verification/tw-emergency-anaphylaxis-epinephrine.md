# 核實紀錄：tw-emergency-anaphylaxis-epinephrine

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-528）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39654057&rettype=abstract&retmode=text（頁面日期 2024-12-09）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38344051&rettype=abstract&retmode=text（頁面日期 2024-01-31）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=28888247&rettype=abstract&retmode=text（頁面日期 2017-09）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=24951238&rettype=abstract&retmode=text（頁面日期 2014-08）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=24251536&rettype=abstract&retmode=text（頁面日期 2014-02）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各廠牌腎上腺素注射筆的劑量、兒童劑量與施打後觀察時間（未查證現行台灣許可證的完整仿單內容，本條不寫）
- 抗組織胺或類固醇能不能取代腎上腺素（未取得可直接引用的現行官方資料，本條不寫）
- 到院後的進一步處置與出院標準（本條不寫）
- 119 以外的急救專線（白名單外，本條不寫）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-health-visible-hematuria-evaluation

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-013）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30411661&rettype=abstract&retmode=text（頁面日期 2018-08-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30411661&rettype=abstract&retmode=text（頁面日期 2018-08-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30411661&rettype=abstract&retmode=text（頁面日期 2018-08-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38346808&rettype=abstract&retmode=text（頁面日期 2024-02-12）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=31886075&rettype=abstract&retmode=text（頁面日期 2019-11-13）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 肉眼血尿最常見的良性原因與各自比例：只讀到癌症偵測率，沒有完整病因分布，不寫。
- 台灣的肉眼血尿轉診標準與膀胱鏡檢查時程：查到的指引不是台灣現行版本，不寫。
- 台北榮總、台大等國內醫院的實際檢查流程與費用：沒有可重複抓取的官方頁面，不寫。
- 出現血尿時自行觀察多久算太久：沒有官方或指引訂出的天數，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

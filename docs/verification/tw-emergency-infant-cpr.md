# 核實紀錄：tw-emergency-infant-cpr

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-529）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=36966408&rettype=abstract&retmode=text（頁面日期 2023-03-26）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=32422246&rettype=abstract&retmode=text（頁面日期 2020-07）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38602429&rettype=abstract&retmode=text（頁面日期 2024-04-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37421276&rettype=abstract&retmode=text（頁面日期 2023-07-18）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39931503&rettype=abstract&retmode=text（頁面日期 2025-02-09）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=20202679&rettype=abstract&retmode=text（頁面日期 2010-04-17）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=35939436&rettype=abstract&retmode=text（頁面日期 2022-08-08）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30853623&rettype=abstract&retmode=text（頁面日期 2019-05）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 新生兒的復甦術流程（與嬰兒不同，本條不寫）
- 到院前給氧、AED 在嬰兒的使用時機與貼片位置（本條不寫）
- 各縣市消防局執勤員實際會下達的指令內容（本條不寫）
- 嬰兒按壓深度到底要用「約 4 公分」或「胸廓前後徑三分之一」（研究未定論，本條只並列，不擇一）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-health-medication-overuse-headache

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-056）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42723131&rettype=abstract&retmode=text（頁面日期 2026-09-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=29262094&rettype=abstract&retmode=text（頁面日期 2025-01-19）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=40011869&rettype=abstract&retmode=text（頁面日期 2025-02-26）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 每週兩天這個上限的中文數字：指引摘要原文用英文 two days per week，為避免逐字比對不符，條目不寫出具體天數。
- 何時該掛神經內科或頭痛特別門診的院所名單：本條不寫。
- 偏頭痛預防藥物的品項與給付條件：本條不寫，洽醫師與健保規定。
- 止痛藥造成肝腎損傷的機轉與劑量：本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 時間→健康、收益 大→?（每月頭痛天數是症狀，不是時間口徑定義的每天／每週小時）。依據：2026-10-07 健康口徑。

# 核實紀錄：tw-emergency-heat-illness-first-aid

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-097）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://mohw.gov.tw/cp-7178-82518-1.html（頁面日期 2025-05-16）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/pro/cp-2731-79099-120.html（頁面日期 2024-06-20）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/pro/fp-2731-84135-120.html（頁面日期 2025-10-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=31981710&rettype=abstract&retmode=text（頁面日期 2020-03-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 「不出汗」：所引官方頁面沒有列這個徵兆，未寫入。
- 降溫可降低多少死亡：查無帶數字的死亡降幅研究，收益標「?」。
- 就醫費用與給付：本條未引，未寫入。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

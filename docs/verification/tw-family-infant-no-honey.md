# 核實紀錄：tw-family-infant-no-honey

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-375）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Category/ListContent/VcPB0U_CRS5XTD-LZQPKbw?uaid=se7JbDLRAT0tJNJuHYVxYQ（頁面日期 2025-01-21）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/fp-16-54698-1.html（頁面日期 2020-07-08）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=12432974&rettype=abstract&retmode=text（頁面日期 2002-11-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39138824&rettype=abstract&retmode=text（頁面日期 2024-08-13）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=2741856&rettype=abstract&retmode=text（頁面日期 1989-07-01）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 蜂蜜製品（蜂蜜蛋糕、蜂蜜水、含蜂蜜的副食品）是否同樣要避免，官方頁面沒有逐項列出。
- 一歲以上兒童或成人吃蜂蜜的風險。
- 台灣嬰兒肉毒桿菌中毒的發生率或死亡率數字。
- 嬰兒肉毒桿菌中毒的治療方式與抗毒素。
- 蜂蜜以外的嬰兒食品（如玉米糖漿）風險，只引到的舊研究有提到，未在現行官方頁面查證。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

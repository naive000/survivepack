# 核實紀錄：tw-emergency-tia-stroke-signs

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-527）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://dep.mohw.gov.tw/pro/fp-2731-22688-120.html（頁面日期 2013-12-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-44431-1.html（頁面日期 2023-07-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-44431-1.html（頁面日期 2023-07-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.tph.mohw.gov.tw/?aid=801&pid=5&page_name=detail&iid=897&textStyle=f_small（頁面日期 2026-09-29）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.tph.mohw.gov.tw/?aid=801&pid=5&page_name=detail&iid=897&textStyle=f_small（頁面日期 2026-09-29）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=33044505&retmode=text&rettype=abstract（頁面日期 2021-01-01）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 「看東西變兩個」（複視）列為中風徵兆：未查到可重新抓取的官方頁面，不寫。
- 各醫院急診的部分負擔金額：每年可能調整，本條不寫。
- 血栓溶解劑的適應條件與時間窗：屬醫療處置，本條不寫。
- 症狀持續多久才算短暫性腦缺血發作、要做哪些檢查：由醫師判斷，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

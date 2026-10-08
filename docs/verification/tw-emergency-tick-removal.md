# 核實紀錄：tw-emergency-tick-removal

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-546）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Uploads/67f999f2-3c6b-4e76-8f12-7cc80fe10d00.pdf（頁面日期 2025-08-07）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/67f999f2-3c6b-4e76-8f12-7cc80fe10d00.pdf（頁面日期 2025-08-07）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/67f999f2-3c6b-4e76-8f12-7cc80fe10d00.pdf（頁面日期 2025-08-07）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=41341672（頁面日期 2025-12-02）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=28464468（頁面日期 2017-08-01）：NCBI E-utilities 摘要比對
- https://www.cdc.gov.tw/Uploads/files/201205/c7f545a2-0117-4e03-acc5-90eec68960b1.pdf（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 塗油、塗凡士林後再用火燒等坊間做法：火燒查無可重抓的現行官方明文；凡士林只在系統性回顧中被當作受比較的化學方式，本條不寫成指令。
- 蜱蟲口器斷在皮膚裡該怎麼處理：查無可重抓的官方明文，本條不寫。
- 蜱蟲保存、送驗或通報流程：本條不寫。
- 各縣市或各季節的蜱蟲分布數字：本條不寫。
- 萊姆病以外的蜱媒疾病在台灣的發生率：本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

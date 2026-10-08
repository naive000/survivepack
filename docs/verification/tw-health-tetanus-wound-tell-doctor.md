# 核實紀錄：tw-health-tetanus-wound-tell-doctor

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-007）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Uploads/422258c2-ff62-4833-a87a-e792817e82de.pdf（頁面日期 2017-08-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/422258c2-ff62-4833-a87a-e792817e82de.pdf（頁面日期 2017-08-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/422258c2-ff62-4833-a87a-e792817e82de.pdf（頁面日期 2017-08-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/Page/MXy9TPGNNXMS_rzotG7xzQ（頁面日期 2025-03-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/Page/MXy9TPGNNXMS_rzotG7xzQ（頁面日期 2025-03-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/files/2256d2d9-fece-4139-ae16-137ab231d342.pdf（頁面日期 2024-06-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/files/2256d2d9-fece-4139-ae16-137ab231d342.pdf（頁面日期 2024-06-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/422258c2-ff62-4833-a87a-e792817e82de.pdf（頁面日期 2017-08-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/files/2256d2d9-fece-4139-ae16-137ab231d342.pdf（頁面日期 2024-06-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 破傷風疫苗或免疫球蛋白的自費金額：疾管署頁面未公告統一價目，各院所不同，不寫。
- 髒傷口在最後一劑已超過 5 年時要追加的表格細節：該表在 PDF 中轉成文字易有落差，且屬醫師依傷口與接種史判斷，不寫。
- 目前台灣每年破傷風病例數與死亡數：疾病介紹的統計只到 1981 年起每年通報 20 例以下，未提供最新年度數字，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

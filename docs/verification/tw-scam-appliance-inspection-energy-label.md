# 核實紀錄：tw-scam-appliance-inspection-energy-label

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-279）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：商品檢驗法第6、12、59、60、60-2條；商品檢驗標識使用辦法（91.01.09訂定）第1、2、3、8、9條；能源管理法第14、24條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031245/ch04/type3/gov31/num8/Eg.pdf（頁面日期 2025-12-29）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031245/ch04/type3/gov31/num8/Eg.pdf（頁面日期 2025-12-29）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031245/ch04/type3/gov31/num8/Eg.pdf（頁面日期 2025-12-29）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 能源效率分級標示的級數細節（官方查詢系統憑證有問題，curl 讀不到）。
- 冷氣、冰箱以外其他電器的汰舊換新或節能補助，以及各縣市加碼。
- 補助專線（不在本站白名單）。
- 各電器實際省下的電費金額。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-overseas-customs-declare

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-476）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：入境旅客攜帶行李物品報驗稅放辦法第7、11、12條；海關緝私條例第36、39、44、47、48條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://web.customs.gov.tw/singlehtml/2597?cntId=cus1_114543_2597（頁面日期 2025-08-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/singlehtml/2597?cntId=cus1_114543_2597（頁面日期 2025-08-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/singlehtml/2597?cntId=cus1_114543_2597（頁面日期 2025-08-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/singlehtml/2597?cntId=cus1_114543_2597（頁面日期 2025-08-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/taipei/singlehtml/3392?cntId=cus2_3392_3392_1343（頁面日期 2026-08-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/taipei/singlehtml/3392?cntId=cus2_3392_3392_1343（頁面日期 2026-08-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/taipei/singlehtml/3392?cntId=cus2_3392_3392_1343（頁面日期 2026-08-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/taipei/singlehtml/3392?cntId=cus2_3392_3392_1343（頁面日期 2026-08-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://web.customs.gov.tw/taipei/singlehtml/3392?cntId=cus2_3392_3392_1343（頁面日期 2026-08-24）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各類物品的進口稅則稅率與實際稅額。
- 罰鍰的實際金額與裁量基準。
- 旅客申報E指通的線上操作流程。
- 被查扣後的退運、放棄或購回程序細節。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

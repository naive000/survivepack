# 核實紀錄：tw-scam-prepay-escrow-refund

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-281）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：補習及進修教育法第2條；消費者保護法第17條；短期補習班設立及管理準則第3、22、24、25、30條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://ws.moe.edu.tw/Download.ashx?u=LzAwMS9VcGxvYWQvMS9yZWxmaWxlLzc2MzIvNjMzMjMvY2U3Nzk2NDMtYTFmYi00MTg1LTk1MmEtMjM1OWE3NzExN2ZhLnBkZg%3d%3d&n=KOmZhOS7tinnn63mnJ%2foo5znv5Lnj63lsaXntITkv53orYnmqZ%2fliLbkuIDopr3ooagucGRm&icon=..pdf（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 健身中心、健身教練定型化契約應記載及不得記載事項的條文（運動部法規系統 curl 被擋、讀不到）。
- 履約保證各機制的保障比例與履約保證保險的最低金額（來源頁面無日期，只當背景）。
- 各縣市自治法規的具體加碼退費規定（各縣市可能不同）。
- 健身房或補習班倒閉後的個案求償結果。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

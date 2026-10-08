# 核實紀錄：tw-rent-utility-fee-cap

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-308）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：租賃住宅市場發展及管理條例第5、16條；消費者保護法第17、56-1條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvOTA4Mi8zMTc2NTcvMDY0NWFhNmMtYTcyMy00ZmQ1LWE1YmUtMDY4NTQ4NWYzZTQ2LnBkZg%3d%3d&n=5YWs5ZGK5L%2bu5q2j5qKd5paHXyjmoLjlrprniYgpLnBkZg%3d%3d（頁面日期 2024-07-08）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/News_Content.aspx?Create=1&n=145&s=317657&sms=9082（頁面日期 2024-07-08）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/news_content.aspx?n=145&sms=9082&s=327340（頁面日期 2025-04-18）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.klcg.gov.tw/wSite/public/Attachment/01906/f1749189307246.pdf（頁面日期 2025-06-19）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 水費的法定上限（沒有這種上限，水費由雙方約定）。
- 台電當期每度平均電價的具體數字（會隨電價調整，以電費單為準）。
- 分租套房或分租雅房的電費分攤公式，本條不寫。
- 電費收取的頻率、每次收取金額與短溢收處理方式，由雙方協議，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

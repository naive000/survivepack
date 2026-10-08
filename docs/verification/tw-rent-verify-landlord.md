# 核實紀錄：tw-rent-verify-landlord

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-302）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：民法第425條；租賃住宅市場發展及管理條例第5、7、13、16條；土地登記規則第24-1條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvOTA4Mi8zMTc2NTcvMDY0NWFhNmMtYTcyMy00ZmQ1LWE1YmUtMDY4NTQ4NWYzZTQ2LnBkZg%3d%3d&n=5YWs5ZGK5L%2bu5q2j5qKd5paHXyjmoLjlrprniYgpLnBkZg%3d%3d（頁面日期 2024-07-08）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 定金（訂金）能不能退、退還多少，本條不寫。
- 房屋是違建、被查封或設有他項權利時對租約的影響，本條不寫。
- 第二類謄本的規費金額與申請管道，本條不寫。
- 包租代管業者應出示哪些文件，條文只寫「有權出租之證明文件」，具體清單本條不寫。
- 租屋詐騙的報案與追償流程，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

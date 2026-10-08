# 核實紀錄：tw-scam-influencer-endorsement-disclosure

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-292）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：公平交易法第21、25、42條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.ftc.gov.tw/internet/enterprise/doc/docDetail.aspx?uid=165&docid=13021（頁面日期 2017-01-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.ftc.gov.tw/internet/enterprise/doc/docDetail.aspx?uid=165&docid=13021（頁面日期 2017-01-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.ftc.gov.tw/internet/enterprise/doc/docDetail.aspx?uid=165&docid=13021（頁面日期 2017-01-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.ftc.gov.tw/internet/enterprise/doc/docDetail.aspx?uid=165&docid=13021（頁面日期 2017-01-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031121/ch04/type2/gov34/num14/Eg.pdf（頁面日期 2025-07-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 特定網紅或個案的違法認定：公平會要就具體事實個別認定，本條不寫。
- 網路廣告平臺依詐欺犯罪危害防制條例應揭露的資訊：屬另一套規定，本條不寫。
- 檢舉是否有獎金：本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-emergency-electric-shock

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-537）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：用戶用電設備裝置規則第87、88、89條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvNDUzL3JlbGZpbGUvMjIyOTgvNzkyNDM3My8yZjVjYTgxZS00MzUyLTQyNTEtOTM0YS1jMTBlY2FkZmZiZTAucGRm&n=5oSf6Zu754G95a6z6aCQ6Ziy5omL5YaKLnBkZg%3D%3D（頁面日期 2023-10-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvNDUzL3JlbGZpbGUvMjIyOTgvNzkyNDM3My8yZjVjYTgxZS00MzUyLTQyNTEtOTM0YS1jMTBlY2FkZmZiZTAucGRm&n=5oSf6Zu754G95a6z6aCQ6Ziy5omL5YaKLnBkZg%3D%3D（頁面日期 2023-10-24）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 家用漏電斷路器的安裝價格與施工細節：查不到費用原文，不寫。
- 台電的停電通報與高壓電專業救援程序：手冊只寫「聯絡台電以切斷電源」，號碼與程序未查，不寫。
- 觸電後要觀察多久才不會延遲性心律不整：來源只說可能隔一段時間再發生，未給天數，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

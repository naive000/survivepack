# 核實紀錄：tw-rent-disclosure-statement-review

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-317）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：不動產經紀業管理條例第22、23、24、29、31條；消費者保護法第11-1條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.moi.gov.tw/News_Content.aspx?n=145&sms=9082&s=336119（頁面日期 2026-01-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvOTA4Mi8zMzYxMTkvM2RhYzdmNjEtNDkwMi00NDEyLTg5YTQtMTA2ZTY1MDE2YjRhLnBkZg%3d%3d&n=5LiN5YuV55Si6Kqq5piO5pu456ysMum7nuOAgeesrDPpu57kv67mraPopo%2flrpoucGRm（頁面日期 2026-01-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://glrs.moi.gov.tw/LawContent.aspx?id=GL000442（頁面日期 2025-12-19）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 不經經紀業的私下買賣，不適用不動產說明書的規定；此時的瑕疵擔保與通知期限回歸民法。
- 檢舉或消費申訴的處理天數與是否收費，法條沒寫。
- 不動產說明書應記載事項中與本次交易無關的細項（例如周邊三百公尺環境設施清單）不逐一列出。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

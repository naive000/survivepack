# 核實紀錄：tw-elder-unnatural-death-report

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-398）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：刑事訴訟法第218、230、231條；法醫師法第9、10、11條；中華民國刑法第165條；殯葬管理條例第69條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://mojlaw.moj.gov.tw/LawContent.aspx?LSID=FL010180（頁面日期 2024-12-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://mojlaw.moj.gov.tw/LawContent.aspx?LSID=FL010180（頁面日期 2024-12-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://mojlaw.moj.gov.tw/LawContent.aspx?LSID=FL010180（頁面日期 2024-12-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.npa.gov.tw/ch/app/artwebsite/view?module=artwebsite&id=1048&serno=e3ad2889-4dee-41cf-aef8-9b9d26dc6950（頁面日期 2025-07-28）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 家屬自行付費另找鑑定的做法與費用：查無官方說明。
- 解剖後遺體發還的時間：查無官方期限。
- 各地方檢察署的相驗流程說明書：屬地方機關文件，本條未引用。
- 「非病死」的個案判斷：由檢察官與司法警察機關認定，本條不寫判斷標準。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-elder-asset-inventory

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-396）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://law-out.mof.gov.tw/LawContent.aspx?media=print&id=GL010834（頁面日期 2023-12-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202508190001&toolsflag=Y&dtable=News（頁面日期 2025-08-19）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 保發中心（tii.org.tw）的查詢服務內容：curl 讀取時 TLS 憑證驗證失敗，不引用。
- 每年會變的遺產稅免稅額與扣除額：本條不寫，見 tw-elder-estate-tax-filing。
- 金融聯合徵信中心個人信用報告的查詢方式：另屬信用資料，本條不寫。
- 保管箱開啟與會同點驗的程序：涉及個案與金融機構規定，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

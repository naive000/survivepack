# 核實紀錄：tw-money-insurance-contract-rescission

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-247）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：金融消費者保護法第13條；消費者保護法第43、44條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.ib.gov.tw/ch/home.jsp?id=239&parentpath=0&mcustomize=news_view.jsp&dataserno=202408220002&dtable=News（頁面日期 2024-08-22）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://moneywise.fsc.gov.tw/tabf/FW/FW11_page_E.html（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=201403180004&toolsflag=Y&dtable=News（頁面日期 2014-03-18）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://law.fsc.gov.tw/LawContent.aspx?media=print&id=GL001024（頁面日期 2014-01-02）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 保險法沒有契約撤銷權的條號，本條不引保險法。
- 契約撤銷權的一般規則，找不到三年內且標有日期的官方頁面。
- 退還保費的通用金額或算例。
- 投資型保單、旅行平安保險與財產保險的撤銷期限。
- 保險公司不依規定退費時的罰則與救濟金額。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

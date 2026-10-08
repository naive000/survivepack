# 核實紀錄：tw-law-redlines-fake-loan-docs

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-534）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：中華民國刑法第210、215、216、339、339-4條；民法第474、478條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202506120010&dtable=News（頁面日期 2025-06-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0&mcustomize=news_view.jsp&dataserno=202608200002&dtable=News（頁面日期 2026-08-20）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 個案是否成立偽造文書、詐欺或加重詐欺，本條不寫，由檢警與法院依事證認定。
- 代辦業者契約上的違約金或顧問費爭議怎麼處理，本條不寫。
- 銀行內部徵信或核准貸款的實務標準，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

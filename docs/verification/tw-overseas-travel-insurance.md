# 核實紀錄：tw-overseas-travel-insurance

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-471）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：保險法第131、133條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202607230001&aplistdn=ou=news,ou=multisite,ou=chinese,ou=ap_root,o=fsc,c=tw&dtable=News（頁面日期 2026-07-23）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202607230001&aplistdn=ou=news,ou=multisite,ou=chinese,ou=ap_root,o=fsc,c=tw&dtable=News（頁面日期 2026-07-23）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202607230001&aplistdn=ou=news,ou=multisite,ou=chinese,ou=ap_root,o=fsc,c=tw&dtable=News（頁面日期 2026-07-23）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202607230001&aplistdn=ou=news,ou=multisite,ou=chinese,ou=ap_root,o=fsc,c=tw&dtable=News（頁面日期 2026-07-23）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://moneywise.fsc.gov.tw/home.jsp?id=10&parentpath=0&mcustomize=publicizeinfo_view.jsp&dataserno=202511070001（頁面日期 2025-11-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.boca.gov.tw/cp-37-223-809d4-1.html（頁面日期 2026-02-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.boca.gov.tw/np-278-1.html（頁面日期 2024-06-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.boca.gov.tw/np-278-1.html（頁面日期 2024-06-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.boca.gov.tw/np-278-1.html（頁面日期 2024-06-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.boca.gov.tw/np-88-1.html（頁面日期 2026-07-07）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各家保險公司的保費金額、理賠上限與具體除外條款。
- 旅平險理賠要檢附的文件清單（依各保單條款）。
- 海外急難救助（醫療轉送）的金額上限與派遣條件。
- 財團法人保險事業發展中心的商品比較內容（網站憑證無法以 curl 讀取）。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

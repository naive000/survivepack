# 核實紀錄：tw-elder-deceased-deposit-withdrawal

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-416）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：遺產及贈與稅法第8、23、42條；民法第828、1151條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/estate-tax/certification/QN716Kb（頁面日期 2024-01-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/estate-tax/certification/2zMYZga（頁面日期 2024-01-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202210060003&toolsflag=Y&dtable=News（頁面日期 2022-10-06）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://law-out.mof.gov.tw/LawContent.aspx?id=GL006995（頁面日期 1995-03-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 存款餘額一定金額以下免附遺產稅繳清或免稅證明的門檻：查到的最新官方頁面是財政部民國84年函令（新臺幣20萬元以下），發布已超過三年，依本卷宗規則不作為現行金額的依據；發布前應洽國稅局與往來銀行確認現行門檻。
- 銀行辦理的實際文件清單、手續費與作業天數：各銀行內規不同，本條不寫。
- 繼承人之間對遺產分配的爭執如何處理、多久、多少錢：屬民事程序，條文沒寫，本條不寫。
- 拋棄繼承、限定繼承與遺產分割：屬其他條目，本條不寫。
- 被繼承人為大陸地區人民或涉兩岸條例的特殊情形：本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

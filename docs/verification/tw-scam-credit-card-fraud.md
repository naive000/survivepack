# 核實紀錄：tw-scam-credit-card-fraud

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-270）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：金融消費者保護法第13、29、30條；信用卡業務機構管理辦法第40、52條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202605190002&dtable=News（頁面日期 2026-05-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202602130007&dtable=News（頁面日期 2026-02-16）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=609&parentpath=0,2&mcustomize=disputearea_view.jsp&dataserno=202603250002&dtable=News（頁面日期 2026-03-25）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://law.fsc.gov.tw/LawContent.aspx?id=FL049905（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各發卡機構實際的掛失手續費與掛失前自負額金額：定型化契約該欄位是空白，由各銀行自行約定，本條不寫金額。
- 申請金融消費評議要不要收費、評議要多久、律師費由誰出：條文沒寫，本條不寫。
- 發現盜刷後要不要一律報警、報警的期限：定型化契約只在發卡機構認有必要時，要求持卡人於受通知日起三日內報案或書面補通知；一般情形是否報警，本條不寫。
- 「爭議款」一詞在定型化契約與管理辦法中沒有這個名詞：本條改寫成帳款疑義與掛失停用，本條不寫「爭議款」的法條用語。
- 行動支付綁定後被盜刷的責任歸屬與各國際信用卡組織的作業細節：本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-scam-otp-never-share

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-268）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：詐欺犯罪危害防制條例第7條；電子支付機構資訊系統標準及安全控管作業基準辦法第7條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0&mcustomize=news_view.jsp&dataserno=202609220003&dtable=News（頁面日期 2026-09-22）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://moneywise.fsc.gov.tw/home.jsp?id=24&parentpath=0&mcustomize=antifraud_view.jsp&dataserno=202502260002&dtable=Message103（頁面日期 2025-02-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cib.npa.gov.tw/ch/app/data/view?module=wg116&id=1909&serno=a2f50753-ab28-469a-a6ce-59368758d083（頁面日期 2026-10-01）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 被盜轉金額的官方統計：金管會與刑事警察局的頁面都沒有金額，本條不寫。
- OTP 的有效秒數：電子支付安控辦法只寫「應設定密碼有效時間」，沒有寫幾秒，本條不寫。
- 各銀行客服專線：不在本站專線白名單，本條不寫。
- 金管會的聯絡電話：金管會新聞稿有寫，但不在本站專線白名單，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

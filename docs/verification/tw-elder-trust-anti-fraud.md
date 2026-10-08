# 核實紀錄：tw-elder-trust-anti-fraud

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-391）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：信託法第1、6、12、22、23、24、31、38、52、63條；信託業法第2、3、19、22、31、33條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202609010002&aplistdn=ou=news,ou=multisite,ou=chinese,ou=ap_root,o=fsc,c=tw&dtable=News（頁面日期 2026-09-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202603260001&toolsflag=Y&dtable=News（頁面日期 2026-03-26）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各銀行信託簽約費與管理費的金額：查無官方統一公告，各受託機構不同，不寫。
- 信託財產運用標的的投資報酬率與風險：涉及個案契約，不寫。
- 信託能否完全對抗所有債權人：條文有例外，個案判斷，不寫。
- 監護或輔助宣告與信託的搭配：屬另一制度，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

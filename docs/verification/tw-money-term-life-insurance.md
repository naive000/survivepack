# 核實紀錄：tw-money-term-life-insurance

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-550）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：保險法第16、101、102、107條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fsc.gov.tw/ch/home.jsp?dataserno=202508080001&dtable=News&id=96&mcustomize=news_view.jsp&parentpath=0,2（頁面日期 2025-08-08）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202605050002&toolsflag=Y&dtable=News（頁面日期 2026-05-05）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 建議保額的倍數或具體金額：官方頁面沒有可核對的建議數字，故不寫。
- 各保險公司的保費與商品比較：未引官方來源，不寫。
- 定期壽險是否有解約金、保單價值準備金怎麼算：法條與官方頁面沒有針對定期壽險寫明，本條不寫。
- 幫孩子買醫療險或傷害險：本條只談壽險死亡給付的限制，其餘不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

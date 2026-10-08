# 核實紀錄：tw-health-no-whole-body-cancer-screening

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-046）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/pancreatic-cancer-screening（頁面日期 2019-08-06）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/ovarian-cancer-screening（頁面日期 2018-02-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://pubmed.ncbi.nlm.nih.gov/39302525/（頁面日期 2024-09-20）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/42522803/（頁面日期 2026-07-01）：NCBI E-utilities 摘要比對
- https://www.mohw.gov.tw/cp-16-82810-1.html（頁面日期 2025-06-27）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 自費全身正子掃描或腫瘤標記套餐在台灣的實際價格：自費價格由各醫療院所自行訂定，查不到官方定價，不寫。
- 台灣衛福部中央機關對自費全身正子掃描或腫瘤標記套餐的明文反對：中央機關頁面查不到，只有 USPSTF 與期刊，不寫。
- 多癌症早期偵測（MCED）或液態切片的效果：查不到可靠官方或期刊結論，不寫。
- 正子掃描在健保的給付條件與適應症：本條不寫。
- 有症狀或已知高風險族群的個別檢查：應直接就醫，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

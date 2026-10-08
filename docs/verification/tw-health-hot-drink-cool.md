# 核實紀錄：tw-health-hot-drink-cool

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-031）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.iarc.who.int/news-events/a-very-hot-food-and-beverage-thermal-exposure-index-and-esophageal-cancer-risk-in-malawi-and-tanzania-findings-from-the-esccape-case-control-studies（頁面日期 2022-06-30）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.iarc.who.int/wp-content/uploads/2018/07/pr244_E.pdf（頁面日期 2016-06-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34818954&rettype=abstract&retmode=text（頁面日期 2021-11-24）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- IARC 沒有說「低於某個溫度就安全」，只把超過 65 度的飲料列為 2A；安全溫度界線本條不寫。
- 改變飲用溫度後死亡風險下降多少，查無研究。
- 台灣官方針對熱飲溫度的中文衛教頁面，以 curl 讀取會失敗，本條未引用。
- IARC 對非常熱的飲料的原始評估在 2016 年，本條核實日查無三年內重新評估或更新的官方頁面。
- 食道癌的篩檢資格與治療，不屬本條。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-health-aqi-activity

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-040）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：空氣污染防制法第14條；室內空氣品質管理法第7條；空氣品質嚴重惡化警告發布及緊急防制辦法第2條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://airtw.moenv.gov.tw/CHT/Information/Standard/AirQualityIndicatorNew.aspx（頁面日期 2018-11-09）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://airtw.moenv.gov.tw/CHT/Information/Standard/AirQualityIndicatorNew.aspx（頁面日期 2018-11-09）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://airtw.moenv.gov.tw/CHT/Information/Standard/AirQualityIndicatorNew.aspx（頁面日期 2018-11-09）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://airtw.moenv.gov.tw/CHT/Information/Standard/AirQualityIndicatorNew.aspx（頁面日期 2018-11-09）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://iaq.moenv.gov.tw/indoorair/show_sign_strategy.aspx（頁面日期 2026-09-25）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://law.moj.gov.tw/LawClass/LawGetFile.ashx?FileId=0000310197（頁面日期 2026-03-18）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=24706041（頁面日期 2014-07）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=24706041（頁面日期 2014-07）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 開窗通風的最佳時機（官方沒有對照 AQI 的開窗建議；室內空氣品質資訊網只說「加強自然通風」是改善措施之一）
- 室內空氣品質標準的數值（該標準只管經公告的公共場所）
- 口罩、空氣清淨機的實際防護效果
- 個別族群（孕婦、兒童、呼吸道疾病患者）的個別建議

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

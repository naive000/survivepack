# 核實紀錄：tw-health-zoster-vaccine-selfpaid

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-003）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Category/Page/WzNj0ONng_AdPtlJc4XDhA（頁面日期 2023-06-14）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/Page/WzNj0ONng_AdPtlJc4XDhA（頁面日期 2023-06-14）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/files/2256d2d9-fece-4139-ae16-137ab231d342.pdf（頁面日期 2024-06-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/files/2256d2d9-fece-4139-ae16-137ab231d342.pdf（頁面日期 2024-06-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=25916341&rettype=abstract&retmode=text（頁面日期 2015-05-28）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=27626517&rettype=abstract&retmode=text（頁面日期 2016-09-15）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34283213&rettype=abstract&retmode=text（頁面日期 2022-04-28）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34283213&rettype=abstract&retmode=text（頁面日期 2022-04-28）：NCBI E-utilities 摘要比對
- https://www.cdc.gov.tw/Uploads/files/2256d2d9-fece-4139-ae16-137ab231d342.pdf（頁面日期 2024-06-03）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 帶狀疱疹疫苗的自費價格：疾管署與食藥署頁面沒有公告統一售價，各院所不同，不寫。
- 公費接種的可行性：疾管署把帶狀疱疹疫苗列在自費疫苗，沒有查到現行公費接種公告，不寫。
- 疫苗接種後保護力隨年齡衰退的年度數字：只讀到延伸研究的整體數字，沒有逐年的完整資料，不寫。
- 接種禁忌與注意事項的完整清單：只寫孕婦應避免與免疫不全者需醫師評估，其餘不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

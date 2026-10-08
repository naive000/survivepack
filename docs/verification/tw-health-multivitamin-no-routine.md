# 核實紀錄：tw-health-multivitamin-no-routine

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-042）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=35727271&rettype=abstract&retmode=text（頁面日期 2022-06-21）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=35727272&rettype=abstract&retmode=text（頁面日期 2022-06-21）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=8127329&rettype=abstract&retmode=text（頁面日期 1994-04-14）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=8602180&rettype=abstract&retmode=text（頁面日期 1996-05-02）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 國內綜合維生素的售價與各品牌實際金額，未引官方來源，無法計算省下的錢。
- 國民健康署（hpa.gov.tw）的維生素補充衛教頁面，以 curl 讀取會憑證失敗，本條未引用。
- USPSTF 建議出自 2022 年，本條核實日查無更新版；三年內沒有新的官方建議頁面。
- 懷孕、哺乳、慢性病或已知缺乏者的補充建議，屬個別醫療判斷，本條不寫。
- 各年齡層的建議攝取量數字，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

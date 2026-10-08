# 核實紀錄：tw-scam-organic-label-health

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-276）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：有機農業促進法第3、16、18、19、20、29、31、32條；有機農產品有機轉型期農產品標示及標章管理辦法第5、6、7、8條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39261657&retmode=text&rettype=abstract（頁面日期 2024-09-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39101594&retmode=text&rettype=abstract（頁面日期 2025-03-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 有機農產品標章的實際圖樣，本條沒讀到圖檔。
- 「有機」與「產銷履歷」、「CAS」等標章的比較，本條不寫。
- 有機食品的價格與價差，沒有官方數字可引。
- 《有機農產品及有機農產加工品驗證管理辦法》在全國法規資料庫已標示廢止，不引用。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

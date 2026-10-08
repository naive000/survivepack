# 核實紀錄：tw-overseas-travel-medicine

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-484）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：傳染病防治法第5、58條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.mohw.gov.tw/cp-7177-82793-1.html（頁面日期 2025-06-17）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/Page/dWNtdVFuemNKUHVlNzdxSHQwSVhlZz09（頁面日期 2026-03-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=39507166（頁面日期 2024-10-07）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各項旅遊疫苗的公費或自費身分、價格與接種地點：查不到可逐字引用的中央公告，本條不寫。
- 除瘧疾以外，各目的地建議接種的特定疫苗清單：疾管署國際旅遊處方箋是動態查詢頁面，未逐國核對，本條不寫。
- 旅遊醫學門診的掛號費與看診費用：各院自訂，查無中央公告，本條不寫。
- 預防接種受害救濟的申請方式：屬另一條題材，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-health-blue-light-glasses

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-049）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37593770&rettype=abstract&retmode=text（頁面日期 2023-08-18）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42783403&rettype=abstract&retmode=text（頁面日期 2026-08-30）：NCBI E-utilities 摘要比對
- https://dep.mohw.gov.tw/pro/cp-2731-36773-120.html（頁面日期 2017-11-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 抗藍光眼鏡的售價與省下的金額：查不到可引用的官方價格，收益不寫數字。
- 一般近視、老花、眼睛疲勞的處置：本條不寫，另洽眼科。
- 眼睛不適的完整就醫警訊清單：衛生福利部國民健康署網站 curl 取不到（憑證失敗），不引用；只保留國健署舊頁面提到的孩童瞇眼、揉眼、近距離看東西三項。
- 3C 產品使用時數的硬性上限：本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

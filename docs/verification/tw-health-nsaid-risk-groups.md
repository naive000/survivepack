# 核實紀錄：tw-health-nsaid-risk-groups

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-052）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：藥事法第50條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://mcp.fda.gov.tw/comparepdf/%E8%A1%9B%E7%BD%B2%E8%97%A5%E8%BC%B8%E5%AD%97%E7%AC%AC025050%E8%99%9F（頁面日期 2024-10-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://mcp.fda.gov.tw/exportpdf/%E8%A1%9B%E7%BD%B2%E8%97%A5%E8%A3%BD%E5%AD%97%E7%AC%AC041833%E8%99%9F（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://pubmed.ncbi.nlm.nih.gov/40833918/（頁面日期 2025-12-19）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/23726390/（頁面日期 2013-08-31）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/36028798/（頁面日期 2022-08-26）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/39412516/（頁面日期 2025-03-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 中醫藥發展法與本條的消炎止痛藥風險無關，未引用。
- 食藥署「藥品安全資訊」列表（查詢日 2026-10-01）沒有找到非類固醇抗發炎藥的更新版風險溝通表，本條不寫。
- 懷孕 20 週之前的用藥建議，未找到可逐字引用的官方頁面，本條不寫。
- 各別藥品（ibuprofen、naproxen、celecoxib 等）之間的風險高低比較，本條不寫。
- 要不要加胃藥、自費或健保給付條件，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

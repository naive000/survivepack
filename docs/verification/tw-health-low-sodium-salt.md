# 核實紀錄：tw-health-low-sodium-salt

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-022）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34459569&rettype=abstract&retmode=text（頁面日期 2021-09-16）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41578335&rettype=abstract&retmode=text（頁面日期 2026-01-23）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38588546&rettype=abstract&retmode=text（頁面日期 2024-04-09）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38284271&rettype=abstract&retmode=text（頁面日期 2024-01-29）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 國民健康署（hpa.gov.tw）的低鈉鹽衛教頁面：curl 讀不到（TLS 憑證驗證失敗），未引用。
- 低鈉鹽的官方定價或與一般食鹽的價差：查不到官方數字，不寫金額。
- 高血鉀的發生率或血鉀檢驗閾值：摘要未提供具體數字，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

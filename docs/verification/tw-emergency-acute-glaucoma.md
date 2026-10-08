# 核實紀錄：tw-emergency-acute-glaucoma

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-549）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=42589938（頁面日期 2026-07-26）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=32435123（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=31822188（頁面日期 2019-12-02）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 台灣官方（國民健康署 hpa.gov.tw）頁面：curl 憑證失敗，未引用，因此台灣官方的現行就醫流程與建議不寫。
- 會誘發急性青光眼的藥品清單：各文獻列出的藥品不同，未逐項核對台灣核准仿單，故不寫。
- 治療方式（降眼壓藥、雷射、手術）與自行點藥：本條不教自行處理，不寫。
- 就醫費用與健保給付：未引官方公告，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 死亡率→健康，收益維持 ?（收益是避免永久視力喪失）。依據：2026-10-07 健康口徑。

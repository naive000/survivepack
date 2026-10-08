# 核實紀錄：tw-elder-fall-prevention

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-382）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：長期照顧服務法第10條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30703272&rettype=abstract&retmode=text（頁面日期 2019-01-31）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=36893804&rettype=abstract&retmode=text（頁面日期 2023-03-10）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42764178&rettype=abstract&retmode=text（頁面日期 2026-09-21）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 具體的扶手、防滑與施工費用，以及長照補助的金額：屬於 tw-disability-home-accessibility-improvement 的範圍。
- 國民健康署的長者防跌衛教頁面：hpa.gov.tw 的 TLS 憑證驗證失敗，curl 讀不到，不用二手來源頂替。
- 個別化的運動處方（頻率、強度、組數）：本條引用的回顧沒有可直接套用的處方劑量。
- 台灣的跌倒死亡統計：沒有查到 curl 讀得到的官方頁面，不寫。
- 跌倒後的骨折處置與復健。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

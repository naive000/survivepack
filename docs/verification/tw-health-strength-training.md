# 核實紀錄：tw-health-strength-training

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-025）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=35228201&rettype=abstract&retmode=text（頁面日期 2022-02-28）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=40042073&rettype=abstract&retmode=text（頁面日期 2025-04）：NCBI E-utilities 摘要比對
- https://www.who.int/news-room/fact-sheets/detail/physical-activity（頁面日期 2024-06-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.who.int/news-room/fact-sheets/detail/physical-activity（頁面日期 2024-06-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/PRO/fp-2731-85653-120.html（頁面日期 2026-03-09）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 國民健康署（hpa.gov.tw）的肌力訓練衛教頁面：curl 讀不到（TLS 憑證驗證失敗），未引用。
- 肌力訓練的具體動作、器材與每週天數：未取得官方指引可引用的數字，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

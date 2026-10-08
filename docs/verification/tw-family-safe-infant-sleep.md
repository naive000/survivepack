# 核實紀錄：tw-family-safe-infant-sleep

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-372）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://mohw.gov.tw/cp-2704-82210-1.html（頁面日期 2025-04-17）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38684567&rettype=abstract&retmode=text（頁面日期 2024-04-29）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=35726558&rettype=abstract&retmode=text（頁面日期 2022-07-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 嬰兒床、床墊、睡袋的價格與品牌（沒有官方數字）。
- 母奶哺餵、奶嘴對嬰兒猝死症候群的個別數字（可讀到的回顧有，但沒有寫進本條）。
- 早產兒或有特殊疾病嬰兒的睡眠安排。
- 托嬰中心、保母的睡眠環境查核與補助。
- 趴睡時間（tummy time）的建議時數。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

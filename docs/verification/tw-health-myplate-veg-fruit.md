# 核實紀錄：tw-health-myplate-veg-fruit

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-030）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：營養及健康飲食促進法第10條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.mohw.gov.tw/cp-7175-83441-1.html（頁面日期 2025-09-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=33641343&rettype=abstract&retmode=text（頁面日期 2021-04-27）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=33641343&rettype=abstract&retmode=text（頁面日期 2021-04-27）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 每日飲食指南每一類食物的公克數與「份」的換算，國健署網頁（hpa.gov.tw）curl 抓不到。
- 「我的餐盤」是依每日飲食指南製作；該指南之後有無更新版本，本條未核實。
- 蔬果與死亡的因果關係。研究是觀察性世代研究，只能說相關。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

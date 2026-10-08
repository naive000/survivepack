# 核實紀錄：tw-emergency-pesticide-storage

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-539）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：農藥管理法第14、29、32條；農藥標示管理辦法第5、12條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=28807587&rettype=abstract&retmode=text（頁面日期 2017-08-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30885286&rettype=abstract&retmode=text（頁面日期 2019-03-19）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42155406&rettype=abstract&retmode=text（頁面日期 2026-05-19）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34455184&rettype=abstract&retmode=text（頁面日期 2021-08-26）：NCBI E-utilities 摘要比對
- https://kmweb.moa.gov.tw/redirect_files.php?id=161112（頁面日期 2010-10-09）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 台灣本地農藥誤食與中毒的發生率、死亡率：官方統計報告的相關表格文字 curl 抓不到，不寫。
- 個別農藥的解毒劑與催吐與否的差異：不同農藥處置不同，本條只寫通則，個別毒物不寫。
- 家庭加鎖收納能降低多少中毒：查不到直接研究，不寫。
- 農藥廢容器的處理方式：與本條儲存主題無關，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

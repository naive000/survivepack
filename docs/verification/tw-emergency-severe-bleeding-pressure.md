# 核實紀錄：tw-emergency-severe-bleeding-pressure

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-093）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37983353&rettype=abstract&retmode=text（頁面日期 2026-06-07）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=29262126&rettype=abstract&retmode=text（頁面日期 2022-09-19）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37984259&rettype=abstract&retmode=text（頁面日期 2023-11-18）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 內政部消防署官網的止血指引：curl 連線時憑證驗證失敗，讀不到，不引。
- 衛生福利部可直接對應的民眾版大量出血止血指引：查不到可重抓的官方頁面，不引。
- 止血帶的適用傷口與綁法、多久要鬆一次：本條不教，未引用。
- 傷口有異物時的固定方式：只寫「不要自己拔」，未寫如何固定。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

### 2026-11-09 元敘述移出

以下核實方式說明原寫在 book/ 條目正文，依寫作規則（不用元敘述）移出。

- 原位置：備註；原句：「期刊都只讀 PubMed 摘要，未讀全文。」（整句刪除）

### 2026-11-09 備註更新：防災館「如何止血」頁
- 起因：階段 3 新條目 tw-emergency-amputation-first-aid 的 Opus 驗收發現，備註「查不到可直接引用的消防署或衛福部民眾止血指引網頁」不成立：內政部消防署消防防災館有「如何止血」民眾頁。
- 來源：https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=66&article_id=204（頁尾更新日期 113-03-07 = 2024-03-07）。Opus 驗收 2026-11-09 自行重開，原句：「若是血流不止或很嚴重的傷口，先用紗布或乾淨毛巾對傷口直接加壓並抬高患肢止血，並儘速送醫治療。」這頁講一般傷口，沒有提到止血帶或彈繃，也不是針對斷肢。
- 修改：備註該句改為轉述上述原句，並加一句指向 tw-emergency-amputation-first-aid（斷指、斷肢的止血與保存）；來源欄補這個網址。
- 條目其餘內容未重驗，核實日期維持 2026-10-01；下次重驗時一併處理。

# 核實紀錄：tw-family-child-outdoor-myopia-prevention

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-360）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：學校衛生法第8、11條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=26372583&rettype=abstract&retmode=text（頁面日期 2015-09-15）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=23462271&rettype=abstract&retmode=text（頁面日期 2013-05-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41062253&rettype=abstract&retmode=text（頁面日期 2026-03-20）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 國健署與教育部的現行戶外時數建議（頁面太舊或 hpa.gov.tw 擋 curl）
- 近視的藥物與光學治療（散瞳劑、角膜塑型片、眼鏡）
- 視力篩檢與轉診的資格、流程與費用
- 戶外活動與近視的劑量關係（除摘要所載外）
- 螢幕時間與近視的關係

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 死亡率→健康、收益 小→?（終點是近視發生率，屬視力，不是死亡）；刪除原「替代終點取小」判定句。依據：2026-10-07 健康口徑。

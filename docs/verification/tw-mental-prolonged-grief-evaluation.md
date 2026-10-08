# 核實紀錄：tw-mental-prolonged-grief-evaluation

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-086）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：精神衛生法第20、28、45條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34233500&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39129485&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38573714&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38389981&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://dep.mohw.gov.tw/DOMHAOH/np-4906-107.html（頁面日期 2025-08-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34233500&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39129485&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38573714&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38389981&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://dep.mohw.gov.tw/DOMHAOH/np-4906-107.html（頁面日期 2025-08-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34233500&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39129485&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38573714&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38389981&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 台灣官方對「延長哀傷障礙」的診斷名稱與採用的時間門檻，查不到中央主管機關的正式公告，本條不寫。
- 各縣市身心科門診或心理諮商的實際費用與補助，本條不寫。
- 延長哀傷障礙的藥物治療，摘要顯示資料不足，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 死亡率→健康，收益維持 ?（研究終點是症狀分數）。依據：2026-10-07 健康口徑。

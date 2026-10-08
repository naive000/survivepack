# 核實紀錄：tw-health-antacid-label

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-053）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：藥事法第8、75條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f637117473161352338&type=1（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f637117473161352338&type=1（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f637117473161352338&type=1（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f637117473161352338&type=1（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=36146999&rettype=abstract&retmode=text（頁面日期 2022-06-17）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 自購制酸劑的具體天數上限。食藥署抓到的那份 PDF 沒有標示日期、屬較舊素材，數字的現行依據留給藥品仿單。
- 胃食道逆流或消化不良的診斷與處置，以及所謂「警訊」的完整清單。那些要由醫師評估。
- 制酸劑與處方胃藥（例如氫離子幫浦抑制劑）的差別與長期風險。兩者不是同一類藥品。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

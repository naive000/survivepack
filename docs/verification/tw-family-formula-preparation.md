# 核實紀錄：tw-family-formula-preparation

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-374）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：食品安全衛生管理法第22條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f638562328624429239&type=4（頁面日期 2024-07-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/PRO/fp-2731-80962-120.html（頁面日期 2024-12-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42723919&retmode=text&rettype=abstract（頁面日期 2026-08-27）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=14717352&retmode=text&rettype=abstract（頁面日期 2004-01-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30024862&retmode=text&rettype=abstract（頁面日期 2018-10-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=9023998&retmode=text&rettype=abstract（頁面日期 1997-01-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- WHO 的嬰兒配方奶安全調製指引：本專案只引台灣官方與 PubMed 摘要，未引 WHO 網頁，本條不寫。
- 《嬰兒與較大嬰兒配方食品廣告及促銷管理辦法》：查核後，內容是廣告與促銷限制，未規定沖泡水溫，與本條無關，不引。
- 奶粉罐是否強制標示70°C：查無食藥署標示規定要求標70°C，法定警語是「經煮沸之溫水」，本條不寫該強制標示。
- 不同廠牌配方奶的沖泡水溫差異：官方頁面沒有逐牌說明，本條不寫。
- 早產兒或免疫不全嬰兒的個別沖泡建議：屬個案醫療判斷，本條不寫。
- 台灣阪崎腸桿菌感染的現行病例數或發生率：官方頁面沒有帶數字的現行統計，本條不寫。
- 配方奶的保存溫度與時間在冷凍或解凍後的情形：官方頁面未寫，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 收益量級判定

- 依據：PMID 42723919（Front Microbiol 2026）：70°C 沖泡約 2-3 log CFU/mL 減少，85 與 100°C >4 log；PMID 14717352（J Food Prot 2004）：70°C 以上 >4 log 減少；PMID 30024862（JPGN 2018）：70°C 仍有病原存活；PMID 9023998（1997）：致死率 40-80%。
- 方式：2026-10-07 以 NCBI E-utilities efetch 重新取得四篇摘要核對，數字相符。只讀摘要，未讀全文。
- 判定：數字只有實驗室細菌減少量（替代終點），沒有嬰兒感染或死亡的相對降幅，依規則標小。

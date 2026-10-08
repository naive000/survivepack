# 核實紀錄：tw-family-neonatal-jaundice-signs

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-377）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Uploads/1ff345df-6f53-4a65-9a59-e89740d84408.pdf（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://dep.mohw.gov.tw/pro/cp-2731-74129-120.html（頁面日期 2023-03-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39197055&rettype=abstract&retmode=text（頁面日期 2024-08-28）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=18306391&rettype=abstract&retmode=text（頁面日期 2008-04-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41966723&rettype=abstract&retmode=text（頁面日期 2026-07-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42782394&rettype=abstract&retmode=text（頁面日期 2026-09-24）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 黃疸數值到多少要就醫、要照光：官方指引未取得原文。
- 不吃奶、活動力變差算不算危險徵兆：本次可引的官方與期刊摘要都沒有逐字寫到，故不寫。
- 母乳性黃疸的處置：未取得官方原文。
- 膽道閉鎖的手術成功率與存活率：本次引用的摘要只到手術時機，未引數字。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 收益量級判定

- 依據：Gopal SH 等，PLoS One 2024（PMID 39197055）：大便卡 1 個月篩檢敏感性 79.6%（70.6-86.4）、特異性 99.9%；DB/CB 敏感性 100%、特異性 98.8%。Ding Z 等，Pediatr Surg Int 2026（PMID 42782394）：晚期手術組 48.33% 轉診前未被發現白便；早期手術組黃疸清除率與原肝存活率較高（無組間相對降幅）。
- 方式：2026-10-07 以 NCBI E-utilities efetch 重新取得摘要核對，數字相符。只讀摘要，未讀全文。
- 判定：數字只有篩檢準確度與手術時機（替代終點），沒有死亡或重大事件的相對降幅，依規則標小。

## 2026-10-07 標籤修正

錢 0→少：成本欄只寫部分負擔另計、沒寫金額。依據：2026-10-07 部分負擔另計統一標少。

# 核實紀錄：tw-family-fluoride-sealant

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-380）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：口腔健康法第8條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.mohw.gov.tw/dl-100166-1816ada6-3af3-4720-8b94-0decc79ebb31.html（頁面日期 2024-11-27）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=23846772&rettype=abstract&retmode=text（頁面日期 2013-07-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=28759120&rettype=abstract&retmode=text（頁面日期 2017-07-31）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 家長實際自付的掛號費或自費差額：查不到官方數字。
- 政府付給院所的補助金額：那是付給機構，不是家長省下的金額。
- 氟化物濃度下限與窩溝封填牙位代碼：在注意事項其他頁，本次未引。
- 塗氟或封填的副作用發生率：本次引用的摘要未提供。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 金錢→健康（收益是蛀牙預防），收益維持 ?；錢 0→少（成本欄只寫掛號費等自付額另計、沒寫金額，依 2026-10-07 決定統一標少）。

### 2026-11-10 母專案複查補強

來源報告：recheck-5 的 30-13（必補）。

自行重開的來源（2026-11-10，NCBI E-utilities efetch，只讀摘要）：
- Cochrane 2017 窩溝封填回顧，PMID 28759120：「at 24 months follow-up: OR 0.12, 95% CI 0.08 to 0.19, 7 trials」（條目原有數字，核對一致）；「at 48 to 54 months of follow-up: OR 0.21, 95% CI 0.16 to 0.28, 4 trials, 482 children evaluated」；「this caries-preventive effect was maintained at longer follow-up but evidence quality and quantity was reduced」；「only four trials assessed adverse events. No adverse events were reported.」

改了哪些句子：
- 收益：24 個月 OR 之後加「追蹤到48至54個月，OR 為0.21（95%信賴區間0.16到0.28，4項試驗、482名兒童），證據品質與數量比24個月時少。該回顧只有4項試驗評估不良事件，這些試驗沒有通報不良事件。」
- 備註：加「OR 是比值比，不能直接讀成蛀牙機率少幾成，也不能說成「只剩幾分之一」。」
- 台灣版原本就沒有誤讀成八分之一，沒有需要刪的句子。
- 核實日期維持 2026-10-01（氟漆 Cochrane 2013、法條、衛福部注意事項這次未重開）。
- 不寫：摘要中「若對照組 16% 蛀牙則封填後約 5.2%」是作者的假設換算，不放。

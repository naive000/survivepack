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

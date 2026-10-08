# 核實紀錄：tw-emergency-fracture-immobilize

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-548）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：緊急醫療救護法第12條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=53&article_id=135（頁面日期 2023-07-27）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=66&article_id=204（頁面日期 2024-03-07）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=32491635（頁面日期 2026-02-15）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 冷敷或冰敷：消防署急救頁面沒有提到，未找到現行官方頁面，故不寫。
- 止血帶的綁法：本條不寫，見 tw-emergency-severe-bleeding-pressure。
- 119 救護車收費：緊急醫療救護法沒有規定，本條不寫。
- 夾板材料的實證比較：消防署頁面只列舉報紙、紙箱等替代物，未提供研究，故不寫。
- 骨折要不要開刀、石膏要打多久：本條不寫，需由醫師判斷。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

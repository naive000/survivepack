# 核實紀錄：tw-health-smoke-free-places

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-019）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：菸害防制法第18、19、20、21、40、44條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=39537242（頁面日期 2024-11-13）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=39537242（頁面日期 2024-11-13）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=26188829（頁面日期 2015-11-15）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=26188829（頁面日期 2015-11-15）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 私人住宅、私人車輛的全面禁菸規定（法律未普遍規定；各縣市可能不同）
- 二手菸對兒童的個別疾病風險數字（本條引的是成人不吸菸者的肺癌與死亡風險）
- 對罰鍰不服的救濟流程

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

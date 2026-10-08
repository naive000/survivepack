# 核實紀錄：tw-health-prep-access

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-009）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：人類免疫缺乏病毒傳染防治及感染者權益保障條例第6、15條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/e5f6e563-f6d8-46d5-bc4e-ee6e84b26fa2.pdf（頁面日期 2025-04-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/e5f6e563-f6d8-46d5-bc4e-ee6e84b26fa2.pdf（頁面日期 2025-04-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/e5f6e563-f6d8-46d5-bc4e-ee6e84b26fa2.pdf（頁面日期 2025-04-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/e5f6e563-f6d8-46d5-bc4e-ee6e84b26fa2.pdf（頁面日期 2025-04-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/e5f6e563-f6d8-46d5-bc4e-ee6e84b26fa2.pdf（頁面日期 2025-04-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/e1a411a0-eca7-4367-9259-0a98c451a851.pdf（頁面日期 2025-02-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=21091279（頁面日期 2010-12-30）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=21091279（頁面日期 2010-12-30）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=22784037（頁面日期 2012-08-02）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=22784037（頁面日期 2012-08-02）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=26364263（頁面日期 2016-01-02）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=26364263（頁面日期 2016-01-02）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 公費 PrEP 的完整資格條件、名額與補助金額（需查疾管署當年度公告，未取得可直接引用的公告全文）
- PrEP 藥品的實際價格與各院所收費
- 各縣市提供 PrEP 的院所名單（會變動，請查疾管署網站；本條只寫疾管署有這份官方名單）
- PrEP 指引 PDF 全文未逐字讀完，只讀取相關段落

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

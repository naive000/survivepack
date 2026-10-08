# 核實紀錄：tw-health-condom-needle

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-014）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：人類免疫缺乏病毒傳染防治及感染者權益保障條例第9、10條；針具服務實施辦法第3、4、5、6條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=11869658（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=11869658（頁面日期 無）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 保險套的價格
- 各縣市清潔針具服務點的位置與服務時間（會變動）
- 戒毒相關專線（不在 hotlines.md 白名單，故不寫）
- 傳染病防治法沒有直接對應「個人性行為使用保險套」的條文，故未引

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

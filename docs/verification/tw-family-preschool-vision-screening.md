# 核實紀錄：tw-family-preschool-vision-screening

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-379）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://mohw.gov.tw/cp-7398-85990-1.html（頁面日期 2026-04-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-2704-83963-1.html（頁面日期 2025-10-15）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.mohw.gov.tw/cp-16-86998-1.html（頁面日期 2026-06-25）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=21746970&rettype=abstract&retmode=text（頁面日期 2011-11-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=39321931&rettype=abstract&retmode=text（頁面日期 2025-03-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41752860&rettype=abstract&retmode=text（頁面日期 2026-01-28）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 弱視單獨的台灣盛行率：查不到官方全國數字。
- 篩檢直接降低失明或終身視力損失的相對風險：本次引用的摘要沒有這種數字。
- 各縣市試辦計畫的申請方式與費用：只有部分縣市，未逐一核實。
- 學齡前視力篩檢的準確度（敏感性、特異性）：本次未引到可直接對應的文獻。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 金錢→健康（收益是弱視治療與視力，不是金錢），收益維持 ?；收益欄與備註的量級說明同步改寫。依據：2026-10-07 使用者新增健康口徑（非致死健康與功能，量級一律 ?）。

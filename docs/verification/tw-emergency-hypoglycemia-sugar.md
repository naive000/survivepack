# 核實紀錄：tw-emergency-hypoglycemia-sugar

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-536）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://org.vghtpe.gov.tw/vhyl/files/files/02-016%E7%B3%96%E5%B0%BF%E7%97%85%E6%80%A5%E7%97%87%E4%BD%8E%E8%A1%80%E7%B3%96%E4%B9%8B%E8%99%95%E7%90%86.pdf（頁面日期 2024-08-06）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41821607&rettype=abstract&retmode=text（頁面日期 2026-03-07）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41572243&rettype=abstract&retmode=text（頁面日期 2026-01-22）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 「說話不清」是否列為低血糖症狀：查到的官方文件只逐字寫視線模糊、無力、意識昏迷，沒有「說話不清」，不寫。
- 意識不清時在齒間塗蜂蜜的做法：玉里分院文件有寫，但情況嚴重，本條不教家人自行處理，不寫。
- 低血糖與高血糖的區分、血糖機的操作與校正：未查，不寫。
- 不同糖尿病藥物的低血糖風險差異：未查，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

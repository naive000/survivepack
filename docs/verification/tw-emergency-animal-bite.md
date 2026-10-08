# 核實紀錄：tw-emergency-animal-bite

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-098）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：傳染病防治法第3條；動物傳染病防治條例第13-1條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Category/ListContent/Sfl3Z4bGwA8hoZiiEI1k1A?uaid=EIzPUZsJx4y2Ana1D4soeg（頁面日期 2026-02-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.aphia.gov.tw/upload/aphia//files/web_structure/10980/Rabies%20ppt%201150831(2).pdf（頁面日期 2026-08-31）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Disease/SubIndex/EV01ORLYYgeN-4LdmfQZOw（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 破傷風疫苗追加間隔：疾管署 Q&A 頁面已超過三年未更新，未寫入。
- 疾管署「寵物或其他動物抓咬傷」Q&A：頁面已超過三年未更新，未引為現行依據。
- 就醫與疫苗是否公費：所引疾管署新聞未寫，未寫入。
- 各接種醫院的院名與電話：未引，未寫入。
- 狂犬病暴露後處置的直接死亡降幅數字：官方資料只說降低發病風險，未提供數字，收益標「?」。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

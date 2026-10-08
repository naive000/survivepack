# 核實紀錄：tw-emergency-go-bag-family-plan

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-118）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：災害防救法第22、23、25條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://prepare.mnd.gov.tw/emergency-supplies/go-bag（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-supplies/go-bag（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-supplies/go-bag（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-supplies/go-bag（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-supplies/go-bag（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-supplies/go-bag（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-supplies/household-supplies（頁面日期 無）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/emergency-supplies/household-supplies（頁面日期 無）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/emergency-supplies/household-supplies（頁面日期 無）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/emergency-supplies/household-supplies（頁面日期 無）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/News_Content.aspx?n=2&sms=9009&s=338532（頁面日期 2026-05-22）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/News_Content.aspx?n=2&sms=9009&s=338532（頁面日期 2026-05-22）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各縣市避難收容處所的位置與開放時間（依地方政府公告）
- 個人常用藥物的品項與數量（問醫師或藥師）
- 防災包的市售價格與品牌
- 家庭成員各自的避難路線（依住家與工作地不同）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

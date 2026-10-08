# 核實紀錄：tw-emergency-home-extinguisher-escape

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-104）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：消防法第6條；各類場所消防安全設備設置標準第12、14、31條；公寓大廈管理條例第10、16條；租賃住宅市場發展及管理條例第8條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=55&article_id=152（頁面日期 2024-11-01）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=54&article_id=145（頁面日期 2024-03-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=55&article_id=1741（頁面日期 2025-05-12）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=54&article_id=137（頁面日期 2023-08-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 滅火器的價格區間與各縣市補助金額（官方頁面未提供現行數字）。
- 一般自用住宅強制設滅火器的個案結論（法規以場所分類與總樓地板面積認定，需個案判斷）。
- 「每6個月演練一次」的頻率（來源頁面更新日2023-08-10已超過三年，不當現行期限依據）。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

# 核實紀錄：tw-money-child-care-deduction

進 `book/`：2026-10-01（第 2 輪，題目編號 bk-215）。

## 自行核對（2026-10-01）

- 條文：全國法規資料庫 Open API 本機檔（整編日 2026-09-18）。草稿裡每個法條引文，都由程式從官方 JSON 抽出（`quote.py`），再由檢查腳本（`verify_r2.py`）逐字比對，全部一致，沒有不符。引用的法規與條號：所得稅法第5、17、71條；稅捐稽徵法第35條。
- 條目裡的條號都有對應引文；草稿裡的數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現的屬於民國年換算、一次、算例等，已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/individual-income-tax/exemption-scope/filling/RvOb1Q2（頁面日期 2026-04-10）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/individual-income-tax/exemption-scope/filling/Q93kjbx（頁面日期 2026-04-10）：curl 重新抓取並逐字比對（符合 80% 以上）

## agent 回報

- 背景 agent（Sonnet）產出卷宗與草稿；我用上述腳本核對引文，再讀過整份草稿。

## 已知限制與「本條不寫」（agent 列出）

- 幼兒學前特別扣除額的子女出生年份限制、申報文件：頁面未載，不寫。
- 身心障礙特別扣除額的證明文件細節：財政部 1206 頁面讀取不到正文，不寫。
- 長期照顧特別扣除額每種資格的診斷書、病症清單細節：條目過長，不逐項寫，請讀者看財政部頁面。
- 衛生福利部 113-03-26 令全文：未讀取，只引財政部頁面轉述。
- 實際省稅金額：級距每年調整，不寫具體金額。
- 1966 長照專線：不是本條決策點，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

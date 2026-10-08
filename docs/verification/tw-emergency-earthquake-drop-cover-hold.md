# 核實紀錄：tw-emergency-earthquake-drop-cover-hold

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-116）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：災害防救法第22、24、27條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://scweb.cwa.gov.tw/webdata/PDF/Earthquake_precautions.pdf（頁面日期 2024-09-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://scweb.cwa.gov.tw/webdata/PDF/Earthquake_precautions.pdf（頁面日期 2024-09-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://scweb.cwa.gov.tw/webdata/PDF/Earthquake_precautions.pdf（頁面日期 2024-09-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://scweb.cwa.gov.tw/webdata/PDF/Earthquake_precautions.pdf（頁面日期 2024-09-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/assets/pdf/manual.zh-Hant.pdf（頁面日期 2025-11-04）：curl 重新抓取，比對率偏低，另以人工或其他方式複查
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://prepare.mnd.gov.tw/emergency-responses（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/News_Content.aspx?n=2&s=336760（頁面日期 2026-02-08）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/News_Content.aspx?n=8&s=314634（頁面日期 2024-04-06）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.moi.gov.tw/News_Content.aspx?n=8&s=325250（頁面日期 2025-01-24）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 瓦斯開關的具體操作、聞到瓦斯味的處理（沒查到可逐字引用的中央主管機關現行頁面）
- 個別建築物震後能不能住（不下個案結論，由專業技師與主管建築機關認定）
- 房屋受災後的災害救助與稅捐減免（本條不重複，另見相關條目）
- 中央氣象署「地震百問」第96問網頁（沒標更新日期，內容說要奔逃至室外，與現行就地掩護指引不一致，不引用）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

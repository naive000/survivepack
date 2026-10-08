# 核實紀錄：tw-emergency-chemical-burn

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-538）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：危害性化學品標示及通識規則第12、17、19條；職業安全衛生設施規則第318條；特定化學物質危害預防標準第36條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=35662479&rettype=abstract&retmode=text（頁面日期 2022-05-14）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=27819881&rettype=abstract&retmode=text（頁面日期 2010-01-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=29083604&rettype=abstract&retmode=text（頁面日期 2026-01-31）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 眼睛要撐開眼皮沖：查到的官方文件與期刊摘要沒有逐字寫「撐開眼皮」，不寫。
- 不要用中和劑：查到的期刊摘要有相反結果（大鼠實驗支持用醋酸中和鹼性灼傷），沒有一致結論，不寫。
- 沖洗的水溫、水柱壓力與眼睛要沖幾分鐘：皮膚回顧寫 60 分鐘，眼睛沒有可寫的分鐘數，不寫。
- 氫氟酸等個別化學品的特殊處理：未查，不寫。
- 安全資料表附表四的完整「急救措施」文字：法規條文資料未含附表四內容，讀不到，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 死亡率→健康，收益維持 ?（終點是住院時間、疤痕與眼睛結果）。依據：2026-10-07 健康口徑。

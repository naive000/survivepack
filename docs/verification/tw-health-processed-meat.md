# 核實紀錄：tw-health-processed-meat

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-027）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.iarc.who.int/wp-content/uploads/2018/07/pr240_E.pdf（頁面日期 2015-10-26）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42130892&rettype=abstract&retmode=text（頁面日期 2026-04-28）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=42130892&rettype=abstract&retmode=text（頁面日期 2026-04-28）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37571311&rettype=abstract&retmode=text（頁面日期 2023-07-29）：NCBI E-utilities 摘要比對
- https://www.mohw.gov.tw/cp-16-51721-1.html（頁面日期 2020-03-02）：curl 重新抓取並逐字比對（符合 80% 以上）
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 衛生福利部食品藥物管理署的加工肉品官方衛教靜態頁：查不到 curl 可讀的頁面，未引用。
- 亞硝酸鹽或硝酸鹽的每日可接受攝取量：查不到官方現行數字，不寫。
- 加工肉品的「安全食用量」：國際癌症研究總署說資料不足以判定，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-processed-meat.med.md` 兩點發現，逐點自行重開來源核對後處理。核實日期改為 2026-10-03。

### 逐點處理
1. 「國際癌症研究總署是研究機構，不做健康建議；各國政府與世界衛生組織才訂飲食指引」在新聞稿找不到——**不採納改寫；改補來源**。
   - 預審只讀了新聞稿。我自行下載 IARC 問答集 https://www.iarc.who.int/wp-content/uploads/2018/07/Monographs-QA_Vol114.pdf（curl＋markitdown，2026-10-03；文件標「© IARC 2015」，伺服器 Last-Modified 2018-07-19），原文：「IARC is a research organization that evaluates the evidence available on the causes of cancer but does not make health recommendations as such. National governments and WHO are responsible for developing nutritional guidelines.」原句有出處，只是來源欄漏列。
   - 改法：來源補問答集；備註改為「國際癌症研究總署的問答集說…各國政府與世界衛生組織負責訂飲食指引」；問答集加入「超過三年」註記清單。
2. 「每天 50 公克加工肉與全因死亡風險增加約 20% 有關」——**採納**。
   - PMID 37571311 摘要：「a risk reduction (20%) from 39.5 min/week of MSA or 4100 steps/d was equivalent to an increased risk of all-cause mortality from a daily intake of 103.4 g/d of red meat or 50 g/d of processed meat.」
   - 另讀 Europe PMC 開放全文（PMC10421417，2026-10-03）想找原始劑量反應估計：加工肉與全因死亡是非線性關係，攝取超過每天 60–80 公克時風險增加 26%，沒有給 50 公克的信賴區間；最高對最低攝取量比較寫成「17% (HR: 0.77; 95% CI 0.61–0.98) increased risk」，HR 小於 1 卻寫增加，原文自相矛盾，不採用。
   - 改法：改寫為與運動效果對照的換算值，並寫明摘要沒有這個換算值的信賴區間。
3. 順帶（非預審發現，預審在範圍說明提到）：「同一份回顧指出，這類風險沒有可放心食用的量」——PMID 42130892 摘要原文是「Based on the report from the International Agency for Research on Cancer (WHO-IARC) and the World Cancer Research Fund (WCRF), no level of PM intake can be confidently considered safe」，是轉述，不是回顧自己的分析。改為「同一份回顧引述國際癌症研究總署與世界癌症研究基金會的報告」。

### 沒改的點
- 說人話「確定會致癌」會不會讓讀者以為和菸一樣危險：預審列為需人類判斷；備註已寫個人風險增加幅度小，本次未改。

### 這次重讀的來源
- curl＋markitdown（2026-10-03）：IARC 新聞稿 pr240_E.pdf（「each 50 gram portion of processed meat eaten daily increases the risk of colorectal cancer by 18%」「For an individual, the risk … remains small」與條目一致）；IARC 問答集（引文見上）。
- NCBI E-utilities 摘要（2026-10-03）：PMID 42130892（50 g/day 大腸癌 17%、GRADE 低到極低，與條目一致）、37571311。
- Europe PMC 全文（2026-10-03）：PMC10421417（Wu 2023）。
- curl（2026-10-03）：https://www.mohw.gov.tw/cp-16-51721-1.html，建檔 109-02-28、更新 109-03-02，與條目一致。
- 未能重讀：無。

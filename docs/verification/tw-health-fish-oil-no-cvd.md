# 核實紀錄：tw-health-fish-oil-no-cvd

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-043）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=32114706&rettype=abstract&retmode=text（頁面日期 2020-02-29）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30415637&rettype=abstract&retmode=text（頁面日期 2019-01-03）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=33190147&rettype=abstract&retmode=text（頁面日期 2020-12-08）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30415628&rettype=abstract&retmode=text（頁面日期 2019-01-03）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 一般市售魚油的實際售價與每月支出金額，未引官方來源。
- 衛生福利部食品藥物管理署關於魚油的頁面，只有食品原料使用限制與標示，沒有心血管預防效果的官方結論，本條未引用。
- Cochrane 回顧為 2020 年、所引隨機試驗為 2019 至 2020 年，本條核實日查無更新版。
- 魚油對高三酸甘油酯的療效與處方藥品的健保給付，本條不寫。
- 各魚油產品的 EPA 與 DHA 含量差異，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-fish-oil-no-cvd.med.md` 三點發現，逐點自行重讀摘要後修改。本條四篇來源全部重讀，核實日期改為 2026-10-03。

### 逐點處理
1. Cochrane 結論寫得比來源絕對，漏了冠心病死亡與事件可能略降 → **採納**。說人話補「它可能略降冠心病死亡與冠心病事件，但證據確定性低，效果很小，約 334 人吃才少 1 例冠心病死亡」；收益補 Cochrane 心血管事件 RR 0.96（0.92–1.01，高確定性）、冠心病死亡 RR 0.90（0.81–1.00）、冠心病事件 RR 0.91（0.85–0.97），後兩者低確定性。「對死亡與心血管事件」改為「對總死亡與心血管事件」。
   - 依據：PMID 32114706 摘要「cardiovascular events (RR 0.96, 95% CI 0.92 to 1.01; …high-certainty evidence)」「Increasing LCn3 may slightly reduce coronary heart disease mortality (number needed to treat for an additional beneficial outcome (NNTB) 334, RR 0.90, 95% CI 0.81 to 1.00 … low-certainty evidence) and coronary heart disease events (NNTB 167, RR 0.91, 95% CI 0.85 to 0.97 … low-certainty evidence)」；AUTHORS' CONCLUSIONS「Moderate- and low-certainty evidence suggests that increasing LCn3 slightly reduces risk of coronary heart disease mortality and events, and reduces serum triglycerides」。
2. REDUCE-IT 把心房顫動住院與出血並列為「增加」→ **採納**。備註改為「心房顫動或撲動住院增加（3.1% 對 2.1%，P=0.004）；嚴重出血也較多（2.7% 對 2.1%），但未達統計顯著（P=0.06）」。「flutter」改台灣用語「撲動」。
   - 依據：PMID 30415628 摘要「hospitalized for atrial fibrillation or flutter (3.1% vs. 2.1%, P=0.004). Serious bleeding events occurred in 2.7% of the patients in the icosapent ethyl group and in 2.1% in the placebo group (P=0.06).」
3. STRENGTH 沒寫是特定配方與受試者條件、漏腸胃副作用 → **採納**。說人話改為「已在吃史他汀類降血脂藥、三酸甘油酯偏高的高風險病人，每天吃 4 公克特定配方的 omega-3，心血管事件也沒有比玉米油少，腸胃副作用反而較多」；收益補 STRENGTH 13,078 人、HR 0.99（0.90–1.09）、腸胃不良事件 24.7% 對 14.7%。預審建議句的「HDL 低」未放進說人話，避免句子過長。
   - 依據：PMID 33190147 摘要「a carboxylic acid formulation of EPA and DHA (omega-3 CA)」「statin-treated participants with high cardiovascular risk, hypertriglyceridemia, and low levels of high-density lipoprotein cholesterol」「A total of 13 078 patients were randomized」「hazard ratio, 0.99 [95% CI, 0.90-1.09]」「A greater rate of gastrointestinal adverse events was observed in the omega-3 CA group (24.7%) compared with corn oil-treated patients (14.7%).」

### 沒改的點（預審列為需醫師判斷）
- REDUCE-IT 能否套用到台灣病人、icosapent ethyl 在台灣的取得與給付：未查，不寫。
- VITAL 次要結果心肌梗塞 HR 0.72（0.59–0.90）：摘要確有此數字（PMID 30415637「for total myocardial infarction, 0.72 (95% CI, 0.59 to 0.90)」），是否寫入次要結果屬判斷，本次不加。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 32114706、30415637、33190147、30415628。只讀摘要，未讀全文。VITAL 每天 1 公克、主要終點 HR 0.92（0.80–1.06）與條目一致。

# 核實紀錄：tw-health-asymptomatic-hyperuricemia-no-drug

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-048）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=30177485（頁面日期 2018-09-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=33342914（頁面日期 2020-12-18）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=32391934（頁面日期 2020-05-11）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=29363262（頁面日期 2018-01-24）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=35739495（頁面日期 2022-06-23）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 無症狀高尿酸何時該開始用藥的統一數值門檻（指引沒有一致規定）
- 降尿酸藥的價格、健保給付條件（未查得可逐字引用的官方公告）
- 個別病人該不該用藥（個案，應由醫師評估）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-asymptomatic-hyperuricemia-no-drug.med.md` 兩點發現，逐點自行重讀摘要後修改。本條五篇來源全部重讀，核實日期改為 2026-10-03。

### 逐點處理
1. 只寫 FEATHER 主要終點陰性，漏了痛風關節炎較少與無蛋白尿次群組 → **採納**。說人話補「但吃藥組後來發生痛風關節炎的人較少」；收益補「痛風關節炎發生率吃藥組 0.91%、安慰劑組 5.86%（P=0.007）；沒有蛋白尿的次群組，吃藥組腎功能較好（次群組分析，P=0.005）」。同時把「467 位病人」改為「467 位收案病人（隨機分派 443 人）」。
   - 依據：PMID 30177485 摘要「467 patients with stage 3 CKD and asymptomatic hyperuricemia」「Of 443 patients who were randomly assigned」「Subgroup analysis demonstrated a significant benefit from febuxostat in patients without proteinuria (P=0.005)」「The incidence of gouty arthritis was significantly lower (P=0.007) in the febuxostat group (0.91%) than in the placebo group (5.86%).」
2. 「有痛風發作、痛風石、關節破壞或頻繁發作的人，指引才建議長期用藥」混了兩份文件 → **採納**。改為「美國風濕病學會強烈建議有痛風石、影像上看到關節損傷或頻繁發作的人用藥；台灣共識則建議曾有痛風發作的高尿酸病人長期用藥」。
   - 依據：PMID 32391934 摘要「Strong recommendations included initiation of ULT for all patients with tophaceous gout, radiographic damage due to gout, or frequent gout flares」；PMID 29363262 摘要「patients with hyperuricemia and previous episodes of acute gouty arthritis should receive long-term urate-lowering treatment」。

### 沒改的點（預審列為需醫師判斷）
- 尿酸極高、尿酸結石、化療中等特殊情況是否另提醒：摘要未涉及，不寫。
- 與 tw-health-gout-long-term-ult 引用的死亡率統合分析如何對齊：不是本人負責的條目，不動。
- 網絡統合分析（PMID 35739495，23 項 RCT；allopurinol RR 0.39、febuxostat RR 0.68）與 FEATHER 的分量權衡：備註已列為爭議（證據），不另加待專業審核。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 30177485、33342914、32391934、29363262、35739495。只讀摘要，未讀全文。ACR 2020 不建議對 CKD／CVD 無症狀高尿酸用藥、日本指引建議 CKD 用藥（33342914），台灣共識目標 <6.0、痛風石 <5.0 mg/dL（29363262），與條目一致。

### 2026-11-09 元敘述移出

- 欄位「備註」原句：「本條只讀摘要，不下個案結論。」（已從 book/health.md 移除）

### 2026-11-10 母專案複查補強

來源報告：recheck-2 的 06-19（數字複查）。

自行重開的來源（2026-11-10，PMC 全文，PMC10563586，ACR 2020 Gout Guideline，PMID 32391934）：
- Table 1：「For patients with asymptomatic hyperuricemia (SU >6.8 mg/dl with no prior gout flares or subcutaneous tophi), we conditionally recommend against initiating any pharmacologic ULT (allopurinol, febuxostat, probenecid)」。
- 「For patients with 1 or more subcutaneous tophi, we strongly recommend initiating ULT」；「radiographic damage (any modality) attributable to gout, we strongly recommend」；「frequent gout flares (≥2/year), we strongly recommend」；「previously experienced >1 flare but have infrequent flares (<2/year), we conditionally recommend initiating ULT」。
- 內文：「The Voting Panel felt that, on average, for the majority of patients with asymptomatic hyperuricemia (including those with comorbid CKD, CVD, urolithiasis, or hypertension), the benefits of ULT would not outweigh potential treatment costs or risks」。

複查結果（兩處與條目不符）：
1. 條目寫「ACR 2020 指引不建議對有慢性腎臟病或心血管疾病的無症狀高尿酸病人用藥」。原文是對無症狀高尿酸整體「有條件地建議不要」，共病（CKD、CVD 等）只是投票小組理由中提到的族群，指引另寫它「不直接處理」高尿酸對共病的影響。強度是「有條件」，不是「不建議」。
2. 條目寫「頻繁發作」沒有門檻與強度分級，原文是每年 2 次以上強烈建議；發作過不只 1 次但每年少於 2 次是有條件建議。

改了哪些句子（說人話）：
- 「美國風濕病學會 2020 指引不建議對有慢性腎臟病或心血管疾病的無症狀高尿酸病人用藥」→「美國風濕病學會 2020 指引對這類人有條件地建議不要開始用降尿酸藥，也就是血尿酸高於 6.8 mg/dL、沒有痛風發作、沒有痛風石的人。指引說明，多數這類病人即使合併慢性腎臟病或心血管疾病，用藥的好處也不大於成本與風險。」
- 「強烈建議有痛風石、影像上看到關節損傷或頻繁發作的人用藥」→「強烈建議有痛風石、影像上看到痛風造成的關節損傷，或每年發作 2 次以上的人用藥；發作過不只 1 次、但每年少於 2 次的人，則是有條件地建議用藥。」
- 核實日期維持 2026-10-03（其他四個來源這次未重開）。
- 日本指引、台灣共識的句子未動（這次沒重開）。

### 2026-11-10 Opus 驗收後修正
- 說人話：ACR 句拆成「…不要開始用降尿酸藥。這類人指…的人。」；「指引說明」改「指引的投票小組認為」；試驗句與「強烈建議…」句各在分號或逗號處拆成兩句。數字未動。
- 核實日期與「待專業審核」字面未動。

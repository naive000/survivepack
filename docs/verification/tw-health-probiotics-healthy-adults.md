# 核實紀錄：tw-health-probiotics-healthy-adults

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-047）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=36001877（頁面日期 2022-08-24）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=36570133（頁面日期 2022-12-07）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=35284446（頁面日期 2022-02-23）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 益生菌的售價與一年花費（查無可逐字引用的官方價格）
- 特定菌株、菌數或產品是否有效（摘要未逐項列出）
- 有腸胃疾病或正在生病的人該不該吃（個案，應問醫師）

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-probiotics-healthy-adults.med.md` 三點發現，逐點自行重讀摘要後修改。核實日期改為 2026-10-03。**本次改了標題與證據等級，請使用者過目。**

### 逐點處理
1. 23 項／6950 人與 RR 0.76 對不上、族群與結果寫錯——**採納**。
   - PMID 36001877 摘要：「we could only meta-analyse data from 23 trials, involving a total of 6950 participants including children (aged from one month to 11 years old), adults (mean age 37.3), and older people (mean age 84.6 years)」「may reduce the number of participants diagnosed with URTIs (at least one event) (RR 0.76, 95% CI 0.67 to 0.87; P < 0.001; 16 studies, 4798 participants; low-certainty evidence)」。
   - 改法：收益改為「Cochrane 回顧（兒童、成人、老人都有）中，16 項試驗、4798 人…急性上呼吸道感染…0.76」；備註補受試者年齡範圍。
2. 標題「不要買來防病」與 Cochrane 結論方向相反——**採納**。
   - 同摘要：「likely reduce the number of participants diagnosed with URTIs (at least three events) (RR 0.59, 95% CI 0.38 to 0.91; P = 0.02; 4 studies, 763 participants; moderate-certainty evidence)」「likely reduce the number of participants who used prescribed antibiotics for acute URTIs (RR 0.58, 95% CI 0.42 to 0.81; P = 0.001; 6 studies, 1548 participants; moderate-certainty evidence)」「AUTHORS' CONCLUSIONS: Overall, we found that probiotics were better than placebo or no treatment in preventing acute URTIs.」
   - 改法：標題由「沒有腸胃問題的健康成人，不要長期買益生菌來防病」收斂為「沒有腸胃問題的健康成人，不必為了顧腸胃長期買益生菌」；說人話寫明預防急性上呼吸道感染可能有一點效果、證據多數低少數中等；收益補兩項中等確定性結果；備註改寫 Cochrane 結論。id 不變。
3. 證據等級 A 與主張不符——**採納**。標題收斂到腸胃後，支持「沒有明顯幫助」的是 PMID 36570133（系統性文獻回顧，無統合分析；「Methodological issues and high risk of bias were identified in several studies」）與 PMID 35284446（「A qualitative synthesis…」「Overall, studies provided inconsistent observations.」）。依規則「有研究但難量化」改為 B，並在括號寫明上呼吸道感染的 Cochrane 統合分析方向相反。

### 待專業審核／沒改的點
- 免疫功能低下、重症或有中心靜脈導管者的安全性：三篇摘要都沒涉及，已在備註加「待專業審核」。
- 不良事件 RR 1.02（0.90 到 1.15，低確定性）在「沒壞處但花錢」框架下建議強度怎麼寫：判斷題，未改。
- 成本標籤、收益「?」、口徑「金錢」未動。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 36001877、36570133、35284446。病程縮短 1.22 天（-2.12 到 -0.33；6 項、2406 人；低確定性）與條目一致。只讀摘要，未讀全文。
- 本條沒有官方網頁來源。未能重讀：無。

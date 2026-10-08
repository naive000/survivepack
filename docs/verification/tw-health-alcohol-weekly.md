# 核實紀錄：tw-health-alcohol-weekly

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-028）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://mohw.gov.tw/cp-6651-78622-1.html（頁面日期 2024-05-06）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://pubmed.ncbi.nlm.nih.gov/30146330/（頁面日期 2018-09-22）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/37684424/（頁面日期 2023-09-08）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/33892007/（頁面日期 2021-04-20）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/17159008/（頁面日期 2006-12-11）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 衛福部 2024-05-06 頁面列出的免付費戒酒專線：不在 ./hotlines.md 白名單，不寫入。
- 酒癮治療費用補助的金額與申請方式：本輪未寫入。
- 官方「暴飲」的單次公克門檻：只查到早於本專案規定日期下限的頁面，不寫。
- 每週飲酒上限的官方建議量：查不到現行中央主管機關的數字，不寫。
- 台灣本地的酒精與死亡率世代研究數字：本輪未找到可引用的官方或 PubMed 研究，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-02 修訂（AI 預審 C 級）

依 `docs/review-packets/ai-review/tw-health-alcohol-weekly.med.md` 三點發現，逐點自行重讀摘要後修改。核實日期改為 2026-10-02。

### 改了什麼
1. 收益：「每天每多一杯（12公克純酒精），風險約增加11%。」→「另一統合分析只看 C 型肝炎感染者：每天每多一杯（12公克純酒精），肝硬化風險約增加11%。這個數字不適用沒有 C 肝的人。」
   - 依據：PMID 33892007「This contribution quantifies the relationship between alcohol use and the progression of liver disease in people with HCV infections.」「Each standard drink of 12 grams of pure alcohol per day increases the risk by about 11%.」Lay summary「…associated with an increase in the risk of cirrhosis of 11%.」
2. 來源：「Rehm 等相關分析」→「Llamosas-Falcón 等…J Hepatol 2021」。依據：PMID 33892007 作者列第一作者 Llamosas-Falcón L，Rehm J 為末位。
3. 說人話：刪「酒精沒有一個可以安心喝的量。」；「國際大型研究指出…零杯」改為「國際大型研究在 2018 年指出…零杯」，並補「同一團隊 2022 年改為依年齡與地區分開估計。15 到 39 歲，風險最低的量很低，有些地區就是零；40 歲以上則大於零，依地區不同。」
   - 依據：PMID 30146330（GBD 2016，Lancet 2018）「The level of alcohol consumption that minimised harm across health outcomes was zero (95% UI 0·0-0·8) standard drinks per week.」；PMID 35843246（GBD 2020，Lancet 2022）「Among individuals aged 15-39 years in 2020, the TMREL varied between 0 (95% uncertainty interval 0-0) and 0·603 (0·400-1·00) standard drinks per day」「Among individuals aged 40 years and older, the burden-weighted relative risk curve was J-shaped for all regions, with a 2020 TMREL that ranged from 0·114 (0-0·403) to 1·87 (0·500-3·30) standard drinks per day」。
4. 收益：首句改標「GBD 2016 以『標準杯』（10公克純酒精）計」，並補 GBD 2020 分年齡數字（每天 0 到 0·603、0·114 到 1·87 標準杯）。GBD 2016 是「每週」，GBD 2020 是「每天」，分句寫，不混用。
   - 依據：PMID 30146330「standard drinks daily (defined as 10 g of pure ethyl alcohol)」。GBD 2020 摘要沒定義一標準杯幾公克，條目不套 10 公克，備註寫明。
5. 備註：補 Zhao 2023 回應 Di Castelnuovo 2006：「校正偏差後，少量飲酒者的總死亡率沒有顯著低於終生不飲者（每天1.3到24公克，RR 0.93，P=.07）」；補「GBD 2020 認為40歲以上最低風險量大於零；摘要沒寫一標準杯是幾公克」。
   - 依據：PMID 37000449「found no significantly reduced risk of all-cause mortality among occasional (>0 to <1.3 g of ethanol per day; relative risk [RR], 0.96; 95% CI, 0.86-1.06; P = .41) or low-volume drinkers (1.3-24.0 g per day; RR, 0.93; P = .07) compared with lifetime nondrinkers」；107 cohort studies。
6. 來源新增：PMID 35843246、37000449（皆僅讀摘要）。

### 沒改的點
- 標題「把目標訂在零」：GBD 2020 對 40 歲以上的估計大於零，是否仍以零為所有年齡的預設目標，預審列為需醫師與公衛判斷，不自行改。
- 失效條件「有新的統合分析改變『無安全劑量』的結論」：GBD 2020 已部分觸及此條件，是否據此改寫條目方向，待使用者決定；本次未改失效條件。
- 「49%的人天生缺少代謝酒精的酵素」的簡化（原文為缺乏乙醛去氫酶 ALDH2）：預審列為需醫師判斷，不改。
- 一杯換算成常見酒類份量：無官方來源，不寫。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-02）：PMID 33892007、30146330、37684424、17159008、35843246、37000449。37684424 的 2.65／6.83／16.38 與 17159008 的 18%／17%（99% 信賴區間）與條目一致。
- curl（2026-10-02）：https://mohw.gov.tw/cp-6651-78622-1.html（頁面自身「建檔日期 113-05-06、更新時間 113-05-06」即 2024-05-06，與條目一致；「酒精與7種癌症有關」「49%民眾缺乏『乙醛去氫酶』(ALDH2)」原文在頁中；本次未改相關句）。
- 限制：只讀摘要，未讀全文。PMID 37000449 有勘誤（JAMA Netw Open 2023;6(5):e2315283），勘誤內容未讀。
- 未能重讀：無。

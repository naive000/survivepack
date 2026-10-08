# 核實紀錄：tw-emergency-choking-first-aid

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-095）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.tfdp.com.tw/cht/index.php?code=list&flag=detail&ids=66&article_id=203（頁面日期 2023-08-14）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://jinshan.health.ntpc.gov.tw/news/115%e5%b9%b4%e7%9d%a1%e7%9c%a0%e5%ae%89%e5%85%a8%e3%80%81%e7%87%92%e7%87%99%e5%82%b7%e9%98%b2%e5%88%b6%e3%80%81%e7%95%b0%e7%89%a9%e5%93%bd%e5%a1%9e%e9%98%b2%e5%88%b6%e3%80%81%e5%ac%b0%e5%b9%bc%e5%85%92%e6%b1%bd%e8%bb%8a%e5%ae%89%e5%85%a8%e5%ba%a7%e6%a4%85%e4%b9%8b%e5%85%92%e7%ab%a5%e5%b1%85%e5%ae%b6%e5%ae%89%e5%85%a8%e5%ae%a3%e5%b0%8e（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://pubmed.ncbi.nlm.nih.gov/41122891/（頁面日期 2025-10-21）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/42299758/（頁面日期 2026-07-01）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/32949674/（頁面日期 2020-11-01）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/39597012/（頁面日期 2024-11-07）：NCBI E-utilities 摘要比對
- 機械修正：收益標籤調整：證據確定性很低，數字不足以判定，標「?」
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 1歲以下嬰兒胸部按壓的深度（英吋或公分）：台南市政府消防局舊頁有寫，但該頁上版日期 2015-07-09，不合現行依據，不寫。
- 失去意識後的完整心肺復甦術步驟與按壓次數：屬另一條，見 tw-emergency-cpr-aed，不重複。
- 自行用手指盲挖異物：回顧提到可能造成傷害，但未查到現行官方逐字建議，不寫。
- 內政部消防署官網（nfa.gov.tw、ebook.nfa.gov.tw）憑證鏈不完整，curl 無法通過驗證，未引用其原文。
- 消防防災館哽塞頁的頁面日期是 2023-08-14，早於 2023-10；它的現行處置只作輔助，主要依 2025 年 AHA 指引摘要。
- 2020 年的系統性回顧早於 2023-10，只作為勝算比與傷害風險的來源；現行技術建議以 2025 年 AHA 指引為準。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-02 修訂（AI 預審 C 級）

依 `docs/review-packets/ai-review/tw-emergency-choking-first-aid.med.md` 兩點發現，逐點自行重讀後修改。核實日期改為 2026-10-02。

### 改了什麼
1. 備註：刪「收益量級取『大』，是依勝算比6.0的效應大小判斷，不是死亡率降幅；這個數字來自證據確定性很低的回顧。」改為「勝算比6.0來自證據確定性很低的回顧，不足以判定收益量級，標『?』。」與註解行「收益=?」一致。
   - 依據：PMID 32949674「For all interventions and associated outcomes, evidence certainty was very low. Early removal of FBAO by bystanders was associated with improved neurological survival (odds ratio 6.0, 95% confidence interval 1.5 to 23.4).」
2. 備註補：「內政部消防署消防防災館 2023 年頁面，對 1 歲以上清醒的人只教腹部推擠，沒有拍背。本條 1 歲以上的作法依美國心臟協會 2025 年指引與金山區衛生所頁面，先拍背再推擠。成人部分出自 PMID 42299758 對該指引的整理。」
   - 依據：curl 消防防災館頁（2026-10-02，頁面「更新日期：112-08-14」）「1.清除呼吸道異物（適用年齡1歲以上）」重度哽塞步驟 C、D 只有「一手握拳…放於上腹部正中線…雙手用力向病人的後上方快速瞬間重複推擠」，無背部拍擊。curl 金山區衛生所頁（頁面無日期）「成人或1歲以上兒童 1.先進行 5次背部拍擊 2.再進行 5次腹部推壓（哈姆立克法）」。PMID 42299758「back blows and abdominal thrusts in the management of severe foreign body obstruction in the conscious adult」；PMID 41122891「in children with severe foreign-body airway obstruction repeated cycles of 5 back blows alternating with 5 abdominal thrusts」。

### 沒改的點
- 嬰兒胸部推壓是否改單手或雙拇指環抱法（PMID 41122891 取消嬰兒兩指按壓，但摘要講的是 CPR 胸部按壓）：預審列為需醫師判斷，不改。
- 輕度哽塞是否「馬上打119」（消防署頁只寫鼓勵咳嗽、不干擾）：屬臨床判斷，不改。
- 「孕婦」是否收窄為「懷孕後期」（消防署頁原文「例如懷孕後期或肥胖者」）：預審列為需醫師判斷，不改。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-02）：PMID 32949674、41122891、42299758。PMID 39597012 這次未重開，相關句未改。
- curl（2026-10-02）：消防防災館異物哽塞頁、新北市金山區衛生所頁。
- 只讀摘要，未讀全文。未能重讀：無。

## 2026-10-07 收益量級判定
- 依據數字：旁觀者及早排除呼吸道異物，與較好的神經學存活有關，勝算比 6.0（95% 信賴區間 1.5 到 23.4）；所有介入與結果的證據確定性皆為很低（GRADE very low）。
- 出處：Couper K, et al. Resuscitation 2020;156:174-181，PMID 32949674；2026-10-07 以 NCBI E-utilities efetch 重開摘要核對，數字與條目一致。
- 只讀摘要，未讀全文。
- 判定：數字是勝算比，終點是神經學存活（存活加神經學預後的複合結果），不是死亡風險的相對降幅；比照同章 tw-emergency-infant-cpr 的處理，依判定規則標「小」。

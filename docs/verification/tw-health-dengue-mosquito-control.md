# 核實紀錄：tw-health-dengue-mosquito-control

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-015）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：傳染病防治法第3、25、70條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Bulletin/Detail/RTOLyxGFrmZuIi_H8SXAgA?typeid=11（頁面日期 2025-11-11）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://pubmed.ncbi.nlm.nih.gov/26986468/（頁面日期 2016-03-18）：NCBI E-utilities 摘要比對
- https://pubmed.ncbi.nlm.nih.gov/37352828/（頁面日期 2023-06-24）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 登革熱疫苗：本次查到的疾管署頁面未涵蓋，不寫。
- 個別縣市對孳生源清除的公告、裁罰基準與複查程序：只查到疾管署與中央法規，不寫。
- 防蚊藥劑的濃度、適用年齡、使用頻率與不同成分的效果比較：官方頁面只寫成分名稱，沒寫濃度與年齡，不寫。
- 登革熱快篩、通報、隔離治療與重症處置的細節，不寫。
- 疾管署「病媒孳生源有那些？如何清除孳生源？」頁面發佈日期為 2002-07-31，早於 2023-10，不單獨作為現行規則的依據，不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-health-dengue-mosquito-control.med.md` 三點發現，自行重開摘要與疾管署頁面後修改。

### 逐點處理
1. 2023 統合分析被寫成「針對幼蟲期的介入」→ **採納**。收益改為「把住家層級的各種防蚊介入與登革熱血清轉陽做統合」。
   - 依據：PMID 37352828 摘要「We performed a qualitative content analysis and a meta-analysis for 13 entries on dengue seroconversion data.」「A meta-analysis on seroconversion outcomes showed a not-statistically significant reduction for interventions (log odds-ratio: -0.18 [-0.51, 0.14 95% CI]).」針對幼蟲期的 21 篇是質性分析的分組。
2. 紗窗、社區環境管理加容器加蓋用因果語氣「可降低」→ **採納**。收益改為「與較低的登革熱風險相關」，紗窗補「信賴區間很寬」，並補「這個回顧收錄各種研究設計，41 篇中只有 9 篇是隨機試驗；以登革熱發生率為結果的 2 個隨機試驗都沒有顯著效果」。備註「清除積水容器與裝紗窗紗門是這個回顧裡有看到效果的做法」同步改為「社區環境管理加容器加蓋、裝紗窗紗門，是這個回顧裡與較低風險相關的做法，但多為非隨機研究」。
   - 依據：PMID 26986468 摘要「Studies of any design published since 1980 were included」「Only 9/41 reports were randomized controlled trials (RCTs). Two out of 19 studies evaluating dengue incidence were RCTs, and neither reported any statistically significant impact.」「house screening significantly reduced dengue risk, OR 0.22 (95% CI 0.05-0.93, p = 0.04), as did combining community-based environmental management and water container covers, OR 0.22 (95% CI 0.15-0.32, p<0.0001)」。
3. 「每週」與「發燒就醫告知活動地點」在所列來源找不到 → **採納（補來源並改寫）**。原列的 2025-11-11 公告確實只有「定期巡視」、沒有發燒就醫建議（curl 重開確認）。另找到疾管署登革熱疾病介紹頁，加入來源，並依原文改寫：
   - 成本時間：「每週巡一次室內外可能積水的地方……雨後再加強一次」→「花瓶和盛水容器每週清洗一次並刷內壁，陰暗處、地下室、排水溝等定期巡檢，約十幾分鐘；大雨過後再加強清理」。「約十幾分鐘」是成本估計，沒有官方依據，保留為估計。毅力欄「每週持續做」改為「持續做」。
   - 說人話：「如果出現發燒等疑似症狀，就醫時告訴醫師你的活動地點」→「從登革熱流行地區回來後 14 天內，如果出現發燒等疑似症狀，要儘速就醫，並告訴醫師你的旅遊活動史」。
   - 依據（curl，2026-10-03，自行開啟核對）：https://www.cdc.gov.tw/Category/Page/e6K1xXr0VJQ7FuxsMtMVhw（最後更新日期 2025/4/21）原句「家中的花瓶和盛水的容器必須每週清洗一次，清洗時要記得刷洗內壁」「家中的陰暗處、地下室、屋簷排水槽或水溝應定期巡檢與清理」「家中應該裝設紗窗、紗門」「從登革熱流行地區返回後請自我健康監測14天，如有發燒、頭痛、後眼窩痛、肌肉痛、關節痛、骨頭痛、出疹等疑似症狀，請儘速就醫，並告知醫師您旅遊活動史與暴露史」；2025-11-11 公告原句「大雨過後要注意：雨後環境清理刻不容緩」。
   - 標題「每週清除住家積水容器」：新來源有「每週清洗」，標題不改。

### 沒改的點（預審列為需人類判斷）
- 殺蟲噴霧（OR 2.03）與蚊香（OR 1.44）和較高風險相關，可能是反向因果：要不要提屬判斷，不寫。
- 防蚊液在兒童、孕婦的適用年齡與濃度：核實紀錄原已列「本條不寫」，不改。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 26986468、37352828。只讀摘要，未讀全文。
- curl（2026-10-03，自行開啟核對）：疾管署 2025-11-11 公告、疾管署登革熱疾病介紹頁（最後更新 2025/4/21）。
- 核實日期未改（仍 2026-10-01）：《傳染病防治法》第3、25、70條本次未重開。

## 2026-10-07 標籤修正

錢 少→多：成本欄寫新裝或修紗窗紗門可能數千元，且標題含裝好紗窗紗門。依據：2026-10-07 錢標籤門檻（多＝NT$2,000 以上）。

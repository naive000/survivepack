# 核實紀錄：tw-health-motorcycle-helmet

進 `book/`：2026-10-01（第 2 輪，題目編號 bk-017）。

## 自行核對（2026-10-01）

- 條文：全國法規資料庫 Open API 本機檔（整編日 2026-09-18）。草稿裡每個法條引文，都由程式從官方 JSON 抽出（`quote.py`），再由檢查腳本（`verify_r2.py`）逐字比對，全部一致，沒有不符。引用的法規與條號：道路交通管理處罰條例第7-1、8、31、87條；道路交通安全規則第88條。
- 條目裡的條號都有對應引文；草稿裡的數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現的屬於民國年換算、一次、算例等，已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://pubmed.ncbi.nlm.nih.gov/18254047/（頁面日期 2008-01-23）：NCBI E-utilities efetch 摘要逐字比對

## agent 回報

- 背景 agent（Sonnet）產出卷宗與草稿；我用上述腳本核對引文，再讀過整份草稿。

## 已知限制與「本條不寫」（agent 列出）

- 「扣緊扣環」對傷亡風險的影響（未查到研究）
- 安全帽價格與購買建議
- 附載座人的年齡限制（安全規則第88條以外的規定，這次未讀）
- 違規是否記點：處罰條例第63條針對汽車駕駛人，機車駕駛人不適用，不在本條範圍
- 半罩、全罩式安全帽的保護力比較（未查到官方或原始文獻）
- 機車駕駛人戴安全帽的實施日期與歷史沿革
- 訴訟費用誰出、行政訴訟審理時程

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

### 2026-11-09 元敘述移出

- 欄位「證據等級」原句：「；只讀過摘要）」（已從 book/health.md 移除，改為「）」）

### 2026-11-10 母專案複查補強

來源報告：recheck-1 的 01-2（數字複查）。

自行重開的來源（2026-11-10，NCBI E-utilities efetch，只讀摘要）：
- Liu BC 等，Cochrane 2008，PMID 18254047：「Sixty-one observational studies were selected of varying quality.」「From four higher quality studies helmets were estimated to reduce the risk of death by 42% (OR 0.58, 95% CI 0.50 to 0.68) and from six higher quality studies helmets were estimated to reduce the risk of head injury by 69% (OR 0.31, 95% CI 0.25 to 0.38).」「Insufficient evidence was found to estimate the effect of motorcycle helmets compared with no helmet on facial or neck injuries.」

複查結果：條目的數字（OR 0.58／0.50-0.68、OR 0.31／0.25-0.38）與原文一致，「42%」「69%」也是 Cochrane 作者自己寫在摘要的說法，不是台灣版自行換算。但 OR 是比值比，條目原本把它直接寫成「降低 42% 的死亡風險」，讀者容易當成精確機率降幅。

改了哪些句子：
- 收益：原「Cochrane 2008（觀察性研究的統合分析）：品質較高的研究估計，戴安全帽可降低42%的死亡風險（OR 0.58，95% CI 0.50 to 0.68）；另有品質較高的研究估計，可降低69%的頭部受傷風險（OR 0.31，95% CI 0.25 to 0.38）。」→ 新句：先寫 61 項品質不一的觀察性研究、只看發生車禍的騎士，再以 OR 為主（4 項、6 項較高品質研究），註明 42%、69% 是作者把 OR 寫成降幅的簡化說法，OR 不等於風險比。
- 核實日期維持 2026-10-01（法條這次未重開）。

### 2026-11-10 Opus 驗收後修正
- 收益：第一句在分號處拆成兩句（4 項較高品質研究的死亡 OR；另 6 項的頭部受傷 OR）。數字未動。
- 核實日期與「待專業審核」字面未動。

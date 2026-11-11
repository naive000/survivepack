# 核實紀錄：tw-mental-bereavement-health-watch

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-084）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：無。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=22427278&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=22230481&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://dep.mohw.gov.tw/DOMHAOH/np-4906-107.html（頁面日期 2025-08-28）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=22427278&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=22230481&retmode=text&rettype=abstract（頁面日期 無）：NCBI E-utilities 摘要比對
- https://dep.mohw.gov.tw/DOMHAOH/np-4906-107.html（頁面日期 2025-08-28）：curl 重新抓取並逐字比對（符合 80% 以上）

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 「固定的人多久看一次」最有效，沒有直接研究，本條不寫。
- 三餐或睡眠要達到什麼標準才算異常，沒有官方門檻，本條不寫。
- 慢性病用藥調整的個別做法，屬於醫囑，本條不寫。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

### 2026-11-09 元敘述移出

以下核實方式說明原寫在 book/ 條目正文，依寫作規則（不用元敘述）移出。

- 原位置：備註；原句：「本條醫學數字只讀 PubMed 摘要，未讀全文。」（整句刪除）

### 2026-11-10 母專案複查補強

來源報告：docs/upstream-sync/2026-11-09-recheck-5.md（29-1、29-5，必補）。母專案文字只當線索，未沿用。

自行重開的來源（2026-11-10，NCBI E-utilities efetch 摘要；Moon 另用 Europe PMC 全文 XML 與 PMC 頁）：
- Carey IM 等，JAMA Intern Med 2014，PMID 24566983：「Within 30 days of their partner's death, 50 of the bereaved group (0.16%) experienced an MI or a stroke compared with 67 of the matched nonbereaved controls (0.08%) during the same period (IRR, 2.20 [95% CI, 1.52-3.15])」；「MI (IRR, 2.14 [95% CI, 1.20-3.81]) and stroke (2.40 [1.22-4.71])」；「30 447 individuals aged 60 to 89」「control group (n = 83 588)」；「attenuated after 30 days」。
- Moon JR 等，PLoS One 2011，PMID 21858130（摘要＋全文）：「the widowhood effect was stronger in the period earlier than six months since bereavement (overall RR = 1.41, 95% CI: 1.26, 1.57) compared to the effect after six months (overall RR = 1.14, 95% CI: 1.10, 1.18)」；「for women the RR was not statistically significantly different from the null (overall RR = 1.04, 95% CI: 1.00, 1.08), while it was for men (overall RR = 1.23, 95% CI: 1.18, 1.28)」；「not different for those aged younger than 65 years compared to those older than 65 (P = 0.25)」；全文前言：「In any existing population, the majority of widowers have already survived the highest risk period, which occurs immediately post-bereavement.」
- Shor E 等，Demography 2012，PMID 22427278（摘要，條目原有來源）：HR 1.23（1.19-1.28）、男 1.27（1.19-1.35）、女 1.15（1.08-1.22）、「HRs decreasing more rapidly for men than for women as age increased」。
- Mostofsky E 等，Circulation 2012，PMID 22230481（摘要，條目原有來源）：21.1-fold（13.1-34.1）。
- 衛生福利部心理健康司 1925 頁（瀏覽器開啟）：更新時間 114-08-28，「可撥打本部1925安心專線（依舊愛我），提供24小時免付費心理諮詢服務」。
- 以上來源皆重開，核實日期改 2026-11-10。論文均只讀摘要（Moon 加讀全文片段）。

改了哪些句子：
- 說人話：加「英國一項研究追蹤 60 至 89 歲的人：伴侶過世後 30 天內，發生心肌梗塞或中風的有 0.16%，伴侶健在的同齡對照組是 0.08%，30 天後差距變小。」
- 收益：加 Carey 全部數字（IRR 2.20、心梗 2.14、中風 2.40、樣本數）與 Moon 的 6 個月分段 RR（1.41、1.14）。
- 來源：新增 Carey、Moon。
- 備註：原「研究是觀察性研究……喪偶後死亡風險升高在男性與年紀較輕者較明顯。」改成以「爭議（證據）：」開頭，列 Shor 女性 HR 1.15 對 Moon 女性 RR 1.04（無顯著差異）、年齡影響兩篇結論不同（Moon P=0.25；Shor 男性 HR 隨年齡下降較女性快），並寫 Moon 排除「已度過最危險階段」的喪偶者、只納入從喪偶當下追蹤的研究。原「較年輕者較明顯」一句由兩篇的差異取代（Moon 找不到年齡差異）。
- 沒抄母專案的「每 1394 人多出 1 例」（那是 Mostofsky 摘要的原句，但母專案另行換算，這次不用）。報告說「Shor 沒有按喪偶時間分段」：Shor 摘要提到 follow-up duration 是檢視的調節因子，無法只憑摘要斷言，故不寫這句，改引 Moon 全文自己的說法。
- 不寫：NHS 症狀頁（報告列的新增來源，未開、非台灣來源）。

### 2026-11-10 Opus 驗收後修正
- 說人話：Carey 句拆成三句，改用「約千分之 1.6」「約千分之 0.8」（Opus 建議句）。
- 備註 a：Moon 2011 句補上前提「直接拿現有的喪偶者和非喪偶者比，多數喪偶者已過了最危險的頭幾個月，估計會有很大偏差」，再接「所以只納入從喪偶當下開始追蹤的研究」。
- 備註 b：「兩者納入的研究與追蹤起點不同」（Shor 只讀過摘要，推論無依據）改成「兩者納入的研究不同：Moon 只收 15 項從喪偶當下開始追蹤的研究，Shor 收的文獻篇數較多」。
- 核實日期與「待專業審核」字面未動。

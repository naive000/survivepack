# 核實紀錄：tw-family-maternal-vaccination

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-369）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：傳染病防治法第27、28、30條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Category/QAPage/UVXtkUrPYdBmTg3eDN93Bg（頁面日期 2026-08-14）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/MPage/JNTC9qza3F_rgt9sRHqV2Q（頁面日期 2026-07-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/QAPage/T93ZfoLyyuCaZvKf7v9eww（頁面日期 2026-08-07）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/Page/MXy9TPGNNXMS_rzotG7xzQ（頁面日期 2025-03-05）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Category/ListContent/Hh094B49-DRwe2RR4eFfrQ?uaId=kq6Xn1xiIPblasGj5P2JRw（頁面日期 2024-03-19）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41263480&retmode=text&rettype=abstract（頁面日期 2025-11-20）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=38041469&retmode=text&rettype=abstract（頁面日期 2024-02-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34224687&retmode=text&rettype=abstract（頁面日期 2021-07-02）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37899087&retmode=text&rettype=abstract（頁面日期 2023-10-01）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 百日咳疫苗（Tdap）自費的實際價格：官方頁面沒有寫，本條不寫。
- 各縣市或醫療院所是否有自費 Tdap 的優惠或公費試辦：未查到中央官方頁面，本條不寫。
- 流感疫苗的廠牌、病毒株與各廠牌差異：官方頁面有列，但與本條決策無關，不寫。
- 孕婦接種疫苗的個別禁忌與不良反應處理：屬個案醫療判斷，本條不寫。
- 新生兒出生後自身的百日咳疫苗接種時程：見 tw-family-child-vaccination-schedule。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-03 修訂（AI 預審 B 級）

依 `docs/review-packets/ai-review/tw-family-maternal-vaccination.med.md` 三點發現，逐點自行重開來源後修改。

### 逐點處理
1. 收益量級完全建立在觀察性世代研究的全死因嬰兒死亡 → **部分採納＋待專業審核**。收益欄補「降幅主要來自出生 0 到 7 天的死亡，出生 8 到 28 天的死亡則沒有關聯；這是觀察性關聯，不能直接當成疫苗造成的死亡降幅」，量級字樣改為「暫標『大』」。量級本身沒改：判定規則是機械套用（相對降幅 ≥20% 為大），改成 ? 屬判斷，不自行決定；備註加「待專業審核：……收益量級是否該依這個結果標『大』，需專業判斷」。
   - 依據：PMID 41263480 摘要「to evaluate the risk of all-cause neonatal and infant mortality」「predominantly attributed to reduction in early neonatal (0-7 d) death. No association was observed between influenza or pertussis vaccine and post-neonatal (8-28 d) mortality.」（摘要原文把 8–28 天稱 post-neonatal，條目照數字寫天數，不用該術語）。
2. 證據等級寫「隨機對照試驗的統合分析」→ **採納**。改為「隨機試驗與觀察性研究混合的統合分析，加大型世代研究」。依判定規則（醫學 A＝統合分析、大型隊列或 RCT，有具體數字）仍為 A。
   - 依據：PMID 34224687 摘要「RCTs, cohort studies, case-control studies, and case series were included」「Overall, 29 studies were included」。
3. 「出生後6個月內的嬰兒較不易感染流感與百日咳」把兩種疾病併成同一時段 → **採納**。說人話改為分開寫：流感「疾管署說，孕期打流感疫苗可間接保護出生後6個月內的嬰兒」；百日咳「統合分析顯示，媽媽孕期接種後，3個月以下嬰兒較少感染」。
   - 依據：疾管署季節性流感疫苗 Q&A 孕婦篇（curl，最後更新日期 2026/8/14）「準媽媽接種流感疫苗，不僅保護自己與肚子裡的胎兒，也間接保護出生後6個月內的嬰兒」；疾管署破傷風、白喉及百日咳相關疫苗頁（curl，最後更新日期 2025/3/5）只寫「建議於懷孕第27-36週接種」，沒有寫保護嬰兒多久；PMID 34224687「reduced the incidence rates of infected infants below 3 months of age (odds ratio, 0.22; 95% confidence interval, 0.14-0.33)」。

### 沒改的點
- Tdap 2026 年是否有公費或地方試辦：預審列需人類判斷；本次只確認疾管署頁面仍列「自費疫苗」（更新 2025/3/5），未另查地方試辦，不改。
- Psaras 2024 與 Sarna 2025 是否真構成爭議：屬流行病學判斷，維持原「爭議（證據）」寫法。重讀 PMID 38041469 摘要，「not associated with a population-level change in the trend in mortality, but were potentially associated with a decrease in incidence」與備註描述一致。

### 這次重讀的來源
- NCBI E-utilities 摘要（2026-10-03）：PMID 41263480、34224687、38041469。只讀摘要，未讀全文。
- curl（2026-10-03，自行開啟核對）：疾管署孕婦篇 Q&A（最後更新 2026/8/14）、百日咳相關疫苗頁（最後更新 2025/3/5）。
- 核實日期未改（仍 2026-10-01）：115年度公費流感疫苗接種對象頁、公費流感疫苗接種計畫 Q&A、2024-03-19 新聞稿與《傳染病防治法》條文本次未重開。

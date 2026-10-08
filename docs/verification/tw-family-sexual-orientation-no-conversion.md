# 核實紀錄：tw-family-sexual-orientation-no-conversion

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-553）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：醫師法第28-4條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.mohw.gov.tw/dl-93173-004db30b-167b-4359-9f61-f5faa844aa8a.html（頁面日期 2024-12-13）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg022247/ch08/type3/gov70/num34/Eg.pdf（頁面日期 2016-12-30）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=19117902&rettype=abstract&retmode=text（頁面日期 2009-01-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=21073595&rettype=abstract&retmode=text（頁面日期 2010-11-01）：NCBI E-utilities 摘要比對
- 機械修正：已在備註標註超過三年的官方頁面

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 「性傾向扭轉治療」現行是否已列入《醫師法》第28條之4第1款的「不得執行之醫療行為」：只查到 105年12月28日預告，查無正式公告全文。
- 另有衛福部函釋的官方全文：只在非官方網站看到轉載，未引用。
- 違反時的具體罰則、刑事責任與救濟：未取得官方公告原文，不寫。
- 台灣本土的性傾向扭轉治療盛行率或傷害數字：未查。
- 專線與求助管道：白名單外的號碼不寫。
- 性傾向扭轉治療在其他國家的法律狀態：本條只談台灣。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-02 修訂（AI 預審 C 級）

依據：`docs/review-packets/ai-review/tw-family-sexual-orientation-no-conversion.med.md`（C）與 `.law.md`（B）。自行重讀來源（2026-10-02）：
- PMID 19117902、21073595：NCBI E-utilities efetch 摘要（只讀摘要，未讀全文）。
- 衛福部「LGBT+民眾醫療照護參考指引」PDF：curl 下載後 markitdown 轉文字。第1頁確認「同性戀不是疾病，亦不需治療，也不存在具有實證療效的治療方式。」與「113年12月13日衛部醫字第1131671660號函頒」。全文搜尋「扭轉」「矯正」「轉化」無結果，指引沒有談扭轉處遇對心理健康的影響。
- 政府公報 105年12月28日預告 PDF：curl 下載後 markitdown 轉文字。第1頁主旨可讀：「預告訂定『醫師執行性傾向扭轉（迴轉）治療之行為，為醫師法第二十八條之四第一款規定不得執行之醫療行為』」。第2頁「草案總說明」字型無法解碼（cid 亂碼），讀不到理由內容。

改了哪幾句：
- 說人話「把青少年送去接受這類處遇，研究顯示與較差的心理健康有關」→ 刪除。已列兩篇研究測的是家庭反應，不是扭轉處遇暴露：PMID 19117902「We examined specific family rejecting reactions to sexual orientation and gender expression during adolescence」；PMID 21073595「retrospectively assessed family accepting behaviors」。另找不到可逐字核對的扭轉處遇研究，不補。
- 說人話「家庭拒絕程度較高的年輕人，自殺企圖與憂鬱風險較高，家庭接納則與較好的心理健康有關」→「美國研究發現，青少年期遭家庭拒絕較多的年輕人，較常自述曾企圖自殺或憂鬱程度高。家庭接納則與較好的身心健康有關。這些研究測的是家庭態度，不是扭轉處遇本身。」依據 19117902「more likely to report having attempted suicide……more likely to report high levels of depression」；21073595「family acceptance of LGBT adolescents is associated with positive young adult mental and physical health」。
- 收益「自殺企圖風險為拒絕程度低者的 8.4 倍、重度憂鬱 5.9 倍、非法藥物使用 3.4 倍、未保護性行為 3.4 倍」→ 改寫為勝算比，比較組改為「沒有或低度家庭拒絕者」，「重度憂鬱」改為「自述高度憂鬱」，並加「這是勝算比，不等於風險倍數」。依據 19117902「On the basis of odds ratios……8.4 times more likely to report having attempted suicide, 5.9 times more likely to report high levels of depression, 3.4 times more likely to use illegal drugs, and 3.4 times more likely to report having engaged in unprotected sexual intercourse compared with peers from families that reported no or low levels of family rejection」。摘要沒有信賴區間，條目不寫。
- 備註「部分宗教與民間團體主張家長有權為孩子尋求改變性傾向的協助，認為醫療倫理不應限制；另一方主張這類處遇違反人權且有害。」→ 兩方都沒有可查核的原始文件（公報預告的總說明讀不到），刪除。改為「家長能否為孩子尋求這類處遇、法律是否禁止，各方立場本條未取得原始文件，不列各方主張，待專業審核。」

沒改的點及原因：
- 「同性戀不是疾病，不需要治療」：與指引原文一致，保留。是否補 DSM／ICD 依據，預審列為醫師判斷，不自行補。
- Ryan 2009／2010 用於台灣家庭的外推性：備註原已寫「以美國樣本為主……不能直接套用到台灣」，保留；要不要加本土研究，屬醫師判斷。
- 醫師法第28條之4第1款是否已涵蓋扭轉治療、非醫師處遇與兒少法效果：預審列為律師判斷，備註原句「本條不敢斷定」保留，不新增罰鍰金額或兒少法條號。
- 證據等級 B、收益量級「?」、失效條件：不變。

## 2026-10-03 修訂（AI 預審 B 級）

依據：`docs/review-packets/ai-review/tw-family-sexual-orientation-no-conversion.law.md`（B 級）。`.med.md` 由另一個 agent 處理，本節不涉及。

- 發現 1（反方「部分宗教與民間團體主張……」沒有來源）：不採納（已處理）。2026-10-02 C 級修訂已刪除該反方句，改為「各方立場本條未取得原始文件，不列各方主張，待專業審核」。2026-10-03 重讀 `book/family.md` 本條，確認原句已不存在。
- 自行核對：ChLaw.json（資料日期 2026/9/18）《醫師法》第28條之4，第1款「執行中央主管機關規定不得執行之醫療行為」與備註描述一致。
- 「需人類律師判斷」三點（扭轉治療是否已正式公告列入第28條之4第1款、非醫師處遇的其他法律、家長送處遇在兒少法上的效果）：備註已有「本條不敢斷定」與「待專業審核」，不新增。
- book 本條未改動；核實日期不變（2026-10-02）。

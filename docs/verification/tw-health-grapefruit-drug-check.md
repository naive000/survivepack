# 核實紀錄：tw-health-grapefruit-drug-check

進 `book/`：2026-11-10（階段 3 第三批，草稿 docs/new-entries/2026-11-10-13.md）。以下為草稿「核實紀錄」原文，小標題降級，內容未改；草稿的「建議放置」「給收錄者」「格式自查」等舊說明隨之保留，以本檔末段為準。

- 核實日期：2026-11-10。母專案原文只用來理解題意，未複製。所有頁面都由撰寫本草稿的 agent 以 BrowserOS（browserclaw）、curl、NCBI E-utilities 或 PMC 親自讀到，沒有採用其他背景 agent 的回報。

## 條目 2：葡萄柚與藥物（母專案 34-13）

- 母專案編號：34-13「长期吃降脂药、降压药这类药的，先看说明书里有没有写葡萄柚（西柚），写了就别吃西柚和柚子，也别喝西柚汁」。差異：母專案以「說明書有寫就別吃」為核心，並給出辛伐他汀 330%、阿托伐他汀 180–250%、非洛地平 3 倍等數字；台灣食藥署頁面沒有這些數字，只寫「儘量避免，要吃先看仿單或問藥師」，並點名四類藥（降血壓藥、statin 類降血脂藥、抗心律不整藥、免疫抑制劑）。本條也不寫母專案的「換成普伐他汀、瑞舒伐他汀」，該說法只出現在 CMAJ 綜述，放在備註並標「台灣官方沒有此建議」。台灣對應的「藥害救濟」已有 `tw-nhi-drug-injury-relief`，不重寫。
- 自行開啟核對的頁面：
  1. https://www.mohw.gov.tw/cp-2648-20155-1.html （BrowserOS，2026-11-10）：衛福部頁面「中秋吃柚，小心藥物交互作用」，「建檔日期：104-09-27　更新時間：115-09-22　資料來源：食品藥物管理署」。逐字：「柚子跟葡萄柚與某些藥物併用，可能增加藥物不良反應(風險)發生之機率，例如某些降血壓藥、statin類降血脂藥、抗心律不整藥、免疫抑制劑等(常見成分如附件)，故建議正在服藥之民眾，可應景淺嚐幾瓣無妨，但切勿大量食用，如有交互作用之疑問，可諮詢藥師」；「該成分會不可逆地抑制小腸及肝臟中的代謝酵素CYP450 3A4」；「其抑制藥物代謝的作用可長達數小時甚至兩三天，即使間隔服藥也無法完全避免」；「食藥署建議正在服藥之民眾，應儘量避免食用該類水果，如欲食用，淺嚐幾瓣即可，切勿大量食用，或是於食用前，詳閱藥品仿單(說明書)或諮詢藥師，確認是否有藥物交互作用之風險，服藥期間若有不尋常的症狀亦應立即就醫」。
  2. https://www.fda.gov.tw/tc/newsContent.aspx?id=14111&chk=c88ab28e-e7cc-4b27-9238-61370f885e0c （BrowserOS，2026-11-10）：食藥署本署新聞同名稿，「發布日期：2015-09-27｜維護日期：2015-09-27　發布單位：藥品組」，內文與上同；附件「1040927附表常見容易與柚子交互作用表」（https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f636694553407691459 ，以 curl 下載 docx 後轉文字）：「常見容易與柚子、葡萄柚產生交互作用的藥物列舉如下」，降血壓藥 Nifedipine、Lercanidipine、Felodipine、Amlodipine；降血脂藥 Atorvastatin、Lovastatin、Simvastatin；抗凝血藥 Warfarin；抗心律不整藥 Amiodarone、Dronedarone；心衰竭用藥 Ivabradine；性功能障礙用藥 Tadalafil；鎮靜安眠藥 Diazepam；抗癲癇藥 Carbamazepine；免疫抑制劑 Tacrolimus、Cyclosporin；抗癌藥 Axitinib。
  3. https://www.hwln.mohw.gov.tw/?aid=302&pid=0&page_name=detail&iid=429 （BrowserOS，2026-11-10）：衛生福利部花蓮醫院新聞稿「從柚到藥：當水果遇上處方箋」，「張貼日期 2025-09-24」。逐字：「呋喃香豆素的作用可能長達數小時，甚至延續2至3天，即使將吃柚子與吃藥時間錯開2至4小時，也難以完全避免交互作用風險」；「呋喃香豆素的藥物抑制效果不容小覷，即便只食用少量柚子，仍可能導致藥物濃度異常。民眾如在服藥期間計劃食用柚子類水果（如葡萄柚、文旦等），務必事先諮詢醫師或藥師」；藥類含降血脂藥（Simvastatin、Atorvastatin、Lovastatin）、降血壓／心血管藥物（Amlodipine、Felodipine、Nifedipine；Amiodarone）、免疫抑制劑（Cyclosporine、Tacrolimus）。這是衛福部所屬醫院的新聞稿，不是食藥署公告。
  4. https://pmc.ncbi.nlm.nih.gov/articles/PMC3589309/ （BrowserOS，2026-11-10，全文）：CMAJ 2013;185(4):309-316。逐字：「Currently, more than 85 drugs have the possibility of interacting with grapefruit; of these drugs, 43 have interactions that can result in serious adverse effects.」「One whole grapefruit or 200 mL of grapefruit juice is sufficient to cause clinically relevant increased systemic drug concentration and subsequent adverse effects.」「an interval of 10 hours produced an effect that was 50% of the maximum, and an interval of 24 hours produced an effect that was 25% of the maximum」；「Varieties of sweet orange, such as navel or valencia, do not contain furanocoumarins and do not produce this interaction.」；表 1「Felodipine … Hypotension, peripheral edema … Amlodipine」（替代藥欄）；「pravastatin does not produce a pharmacokinetic interaction with grapefruit, rosuvastatin is eliminated unchanged, and fluvastatin is metabolized by an enzyme (cytochrome P450 2C9) that is not affected by grapefruit」。PubMed PMID 23184849 無摘要，因此直接讀 PMC 全文。
  5. https://mcp.fda.gov.tw/ （BrowserOS，2026-11-10）：藥品仿單查詢平台首頁；查詢需輸入驗證碼，未能逐一查個別藥品仿單。
  6. Google 搜尋（2026-11-10，關鍵字：藥害救濟 正當使用 葡萄柚 併用 不予救濟）：前幾筆結果沒有官方文件說明柚藥交互作用與藥害救濟的關係；結果中有藥害救濟基金會 2018-09-14 文章「葡萄柚與藥不可同吃，其他水果就安全？」與食藥署 2016-03-10「吃藥時配果汁應該沒關係吧？」，只讀到摘要片段，未開啟，未採用。
- 未核實（TODO）：
  - TODO：待核實 個別降血壓藥、降血脂藥的中文仿單是否都寫了葡萄柚（仿單查詢平台要驗證碼，本次未逐一查）；標題只寫「先看仿單」，沒有說「仿單一定有寫」。
  - TODO：待核實 食藥署較新（3 年內）的葡萄柚用藥提醒；本次找到的食藥署頁面都是 2015 年與 2016 年，只有衛福部頁面「更新時間 115-09-22」與花蓮醫院 2025-09-24 較新。
  - TODO：待核實 Amlodipine 是否與葡萄柚交互作用：食藥署附表、花蓮醫院稿與 CMAJ 表 1 不一致，已在備註標「爭議（證據）」，需藥學專業人員判斷。
  - TODO：待核實 柚藥交互作用受傷是否屬藥害救濟「正當使用」；本次未找到官方說明。
- 建議章節：`book/health.md`（與 `tw-health-drug-duplication-check`、`tw-health-acetaminophen-duplicate` 同屬用藥安全）。
- 收益量級與口徑判斷：口徑=健康，依 CLAUDE.md 一律標 `?`。
- 進 `book/` 前還要處理：條目含「待核實」不得進 `book/`——此草稿的 TODO 只放在核實紀錄；條目本文已不含 TODO 字樣，但若審核者認為「Amlodipine 不一致」尚未釐清，就留在 drafts。核實紀錄移到 `docs/verification/tw-health-grapefruit-drug-check.md`。

## 2026-11-10 合併

- 合併位置：book/health.md，放在 tw-health-drug-duplication-check 之後。
- 條目本文自草稿逐字搬入 `book/`（僅去行尾空白），核實日期 2026-11-10；核實紀錄移到本檔，`book/` 內不留核實紀錄。合併前後檢查：條目本文無 TODO、無「待核實」字樣；互相引用的 id 皆存在於 `book/`。
- 合併時 verify 的電話樣式檢查擋下來源欄的民國日期「104-09-27」，已刪去「104-09-27，即」，保留西元「2015-09-27」。合併者本次未重開來源，進 `book/` 前建議自行重開。

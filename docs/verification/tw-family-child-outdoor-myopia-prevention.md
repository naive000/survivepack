# 核實紀錄：tw-family-child-outdoor-myopia-prevention

進 `book/`：2026-10-01（DSH 批次，題目編號 bk-360）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：學校衛生法第8、11條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=26372583&rettype=abstract&retmode=text（頁面日期 2015-09-15）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=23462271&rettype=abstract&retmode=text（頁面日期 2013-05-01）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=41062253&rettype=abstract&retmode=text（頁面日期 2026-03-20）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 國健署與教育部的現行戶外時數建議（頁面太舊或 hpa.gov.tw 擋 curl）
- 近視的藥物與光學治療（散瞳劑、角膜塑型片、眼鏡）
- 視力篩檢與轉診的資格、流程與費用
- 戶外活動與近視的劑量關係（除摘要所載外）
- 螢幕時間與近視的關係

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

## 2026-10-07 標籤修正

口徑 死亡率→健康、收益 小→?（終點是近視發生率，屬視力，不是死亡）；刪除原「替代終點取小」判定句。依據：2026-10-07 健康口徑。

## 2026-10-08 修訂（法規修正）

- 依據：法規監測 `docs/lawwatch/2026-10-08.md`。《學校衛生法》2026-09-23（民國115年9月23日總統華總一義字第11500093331號令）修正第5、6、11、16、17、19、24條。第29條「本法自公布日施行」，LawEffectiveNote 空白，已施行。
- 自行核對方式：2026-10-08 下載 Open API ChLaw.json（UpdateDate 2026/9/24），逐字讀第11條；第8條與進 book/ 時的引文（`dsh-runs/out/r2/bk-360.md`）去空白後一致。
- 第11條 舊：「學校對罹患視力不良、齲齒、寄生蟲病、肝炎、脊椎彎曲、運動傷害、肥胖及營養不良等學生常見體格缺點或疾病，應加強預防及矯治工作。」
- 第11條 新：在「視力不良」後加「聽力不良」，其餘文字不變。
- 條目影響：條目只寫「對視力不良學生應加強預防及矯治」，新條文仍包含，正文不改。只改核實日期為 2026-10-08。

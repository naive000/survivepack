# 核實紀錄：tw-elder-solitary-contact

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-386）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：老人福利法第16、17、18、43條；衛生福利部關懷弱勢加發生活補助及擴大獨居老人服務補助辦法第5、6、7條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://dep.mohw.gov.tw/pro/cp-2731-88069-120.html（頁面日期 2026-09-24）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://ccare.sfaa.gov.tw/home/other/about（頁面日期 無）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=20668659&rettype=abstract&retmode=text（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=25910392&rettype=abstract&retmode=text（頁面日期 無）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 各縣市獨居老人服務的實際申請窗口、資格門檻與服務內容：全國法規與中央頁面沒有逐縣市規定。
- 個人向社區照顧關懷據點辦「登記」的程序：查不到這種個人登記程序，據點是參與活動與接受關懷訪視，不是會員登記；本條不寫。
- 緊急救援裝置的補助金額、自付額與安裝條件：中央補助辦法與新聞稿沒有寫數字。
- 獨居老人服務要不要付費、申請後多久處理、如何申訴：補助辦法沒寫。
- 各縣市訪查員查證窗口名單：社家署把名單放在 PDF 附件，下載網址帶一次性參數，無法穩定重抓，不引用。
- 各縣市社會局網頁與長照服務的申請細節：未逐一下載核對，長照見 tw-welfare-ltc-apply。

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

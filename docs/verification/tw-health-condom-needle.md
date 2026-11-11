# 核實紀錄：tw-health-condom-needle

進 `book/`：2026-10-02（DSH 批次，題目編號 bk-014）。

## 自行核對

- 條文：全國法規資料庫 Open API 本機檔，逐字比對（`verify_r2.py`），全部一致、沒有不符。引用的法規與條號：人類免疫缺乏病毒傳染防治及感染者權益保障條例第9、10條；針具服務實施辦法第3、4、5、6條。
- 草稿裡出現的條號都有對應引文；每個數字（金額、天數、年齡、月數）由腳本比對是否出現在引文，少數未出現者（民國年換算、一次、算例等）已人工看過。
- 網頁與論文引文（重新抓取或重開，逐字比對）：
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://www.cdc.gov.tw/Uploads/89b40d97-be6f-4e24-b6fe-96ca44e3f7b7.pdf（頁面日期 2025-11-04）：curl 重新抓取並逐字比對（符合 80% 以上）
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=11869658（頁面日期 無）：NCBI E-utilities 摘要比對
- https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=11869658（頁面日期 無）：NCBI E-utilities 摘要比對

## 產出方式

- 由 DeepSeek（dsh headless）產出卷宗與草稿，Claude 用上述腳本核對引文，再讀過草稿全文才進 book/。

## 已知限制與「本條不寫」（agent 列出）

- 保險套的價格
- 各縣市清潔針具服務點的位置與服務時間（會變動）
- 戒毒相關專線（不在 hotlines.md 白名單，故不寫）
- 傳染病防治法沒有直接對應「個人性行為使用保險套」的條文，故未引

- 重驗：條目「失效條件」所列法規或公告修正就要重核；金額與年度數字每年重驗。

### 2026-11-09 元敘述移出

- 欄位「備註」原句：「研究只讀摘要（NCBI E-utilities efetch），未讀全文。」（已從 book/health.md 移除）

### 2026-11-10 母專案複查補強

來源報告：recheck-1 的 01-30（報告列「補強優先序」第 1，非標「必補」；依任務指示列入處理）。

自行重開的來源（2026-11-10）：
- WHO，Sexually transmitted infections (STIs) fact sheet（10 September 2025，瀏覽器開啟）：「When used correctly and consistently, condoms offer one of the most effective methods of protection against STIs, including HIV. Although highly effective, condoms do not offer protection for STIs that cause extra-genital ulcers (i.e., syphilis or genital herpes).」
- 疾管署〈梅毒〉疾病介紹（https://www.cdc.gov.tw/Category/Page/pzPKSi2S4zCt94DDnwqVNg，最後更新日期 2026/9/14）：「由於梅毒潰瘍可能出現在生殖器以外的部位，保險套無法提供百分之百的保護。」
- 疾管署《壹、預防策略》PDF（條目原有來源，重新下載）第二節：「保險套除可預防HIV感染外，亦可預防其他性傳染病」（原條目「也能預防其他性病」的出處）。
- 找不到疾管署生殖器疱疹專頁，疱疹部分只引 WHO。

改了哪些句子：
- 說人話：「也能預防其他性病。」→「對其他性病也有保護，但梅毒、生殖器疱疹的潰瘍可能長在套子蓋不住的地方，保險套保護不完整，有疑慮要去篩檢。」
- 收益：加 WHO 與疾管署梅毒頁兩句，並寫「這部分沒有可換算的百分比」。
- 備註：加「80% 只是 HIV 的數字」、WHO 與疾管署措辭差異（沒有保護／無法百分之百），並寫疾管署預防策略文件另寫可預防其他性傳染病，兩處合讀。
- 來源：新增 WHO、疾管署梅毒頁。
- 核實日期維持 2026-10-01（兩條法條與 Cochrane 2002 這次未重開）。

### 2026-11-10 Opus 驗收後修正
- 備註 a：移除「得不到保護」「唯一辦法」「兩處合讀，才是完整範圍」。改為 WHO 寫對會造成生殖器以外潰瘍的性病沒有保護、疾管署梅毒頁寫無法提供百分之百的保護、預防策略文件另寫也可預防其他性傳染病。
- 說人話 b：「有疑慮要去篩檢」改為「性行為活躍、特別是有多位性伴侶的人，可以考慮定期做梅毒篩檢」（疾管署梅毒頁原意），並拆句。
- 核實日期與「待專業審核」字面未動。

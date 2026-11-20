[簡體中文](README.md) ｜ **繁體中文** ｜ [English](README.en.md) ｜ [日本語](README.ja.md)

> **安卓直裝版**：[android-xinganhua](https://github.com/SiqYin/android-xinganhua) —— 小企鵝輸入法（Fcitx5 for Android）的西安話直裝包：裝上本體與 Rime 插件就能在手機上打西安話，不必自己導入方案。

# 西安話輸入法 · xinganhua-fuvufa

> 用**西安話拼音**（全拼 + 調號 1/2/3/4）在 Rime 裏打西安話。**城區音、南郊音各一套方案**：`chengqyu` 與 `nanjiao`。城區音字音逐條來自 [osfans/MCPDict《西安》數據表](https://github.com/osfans/MCPDict/blob/master/tools/tables/data/%E8%A5%BF%E5%AE%89.tsv)（國際音標），南郊音據 1,882 字的逐字裁定表（2026-11-20）與兩地一致讀音折出。

![西安話聲母圖（城區音 26；南郊音 25——多 rh，無 bf、pf）](figures/onsets.hant.svg)

![西安話韻母圖（城區音 40；南郊音 38，無 uu、iai）](figures/rhymes.hant.svg)

- **方案代碼**：`chengqyu`（西安話城區音）、`nanjiao`（西安話南郊音）；倉庫名 `xinganhua-fuvufa` 是「西安話輸入法」的舊拼寫（西 xi1 安 ngan1 話 hua4 ｜ 輸 fu1 入 vu1 法 fa1）
- **字表**：城區音 3,648 條、南郊音 4,350 條；城區 3,345 字頭，南郊 4,065 字頭（含渭南獨有等新增 720 字）
- **音系**：兩套共用 24 聲母、38 韻母、四聲（陰平 21、陽平 24、上聲 53、去聲 44）；城區音另有 `bf`、`pf` 兩個聲母與 `uu`、`iai` 兩個韻母（26 / 40），南郊音另有 `rh` 聲母（25 / 38）
- **適用**：Rime 系輸入法（小狼毫 Weasel / 鼠須管 Squirrel / Trime / fcitx-rime 等）
- **正文用簡體**；表格裏的例字保持詞庫的繁體字形（鵝、軍、豬、來、溫……），因爲那是要能對上詞庫的數據
- **四種語言**：簡體 / 繁體 / English / 日本語，頂部的鏈接可直接切換；四版內容一致，以簡體版爲準

| 方案 | 名稱 | 聲母 | 韻母 | 字表 |
|---|---|---|---|---|
| `chengqyu` | 西安話城區音 | 26（含 `bf`、`pf`） | 40（含 `uu`、`iai`） | `chengqyu.word.dict.yaml`，3,648 條 |
| `nanjiao` | 西安話南郊音 | 25（含 `rh`） | 38 | `nanjiao.word.dict.yaml`，4,350 條 |

---

## 目錄

1. [這個方案是什麼](#一這個方案是什麼)
2. [聲母](#二聲母)
3. [韻母](#三韻母)
4. [聲調](#四聲調)
5. [正字法細則](#五正字法細則)
6. [與普通話拼音的異同](#六與普通話拼音的異同)
7. [快速上手](#七快速上手)
8. [允許的簡化拼寫](#八允許的簡化拼寫)
9. [詞庫與字表](#九詞庫與字表)
10. [文件與安裝](#十文件與安裝)
11. [複覈辦法](#十一複覈辦法)
12. [待定與後續](#十二待定與後續)
13. [數據與致謝](#十三數據與致謝)
14. [授權](#十四授權)

---

## 一、這個方案是什麼

西安話（陝西方言·關中片）的拼音輸入方案，分**城區音**與**南郊音**兩套，共用一套拼寫：一個音節寫成「聲母 + 韻母 + 調號」，例如 `ba1 巴`、`jyuen1 軍`；`bfeng4 中` 是城區音，南郊音作 `zuong4`。

![音節結構圖](figures/syllable.hant.svg)

城區音 3,648 條字音由腳本從 MCPDict 的國際音標逐條轉寫而來，轉寫後 392 個音節的拼寫**兩兩不同（零同形衝突）**；南郊音 4,350 條折自南郊音字表，389 個音節同樣零衝突。也就是說這套羅馬字是可逆的：拿拼音能原樣還原成音標。

---

## 二、聲母

兩套共用 **24 個聲母**（23 個輔音 + 零聲母）；城區音另有 `bf`、`pf` 兩個，共 26 個；南郊音另有 `rh` 一個，共 25 個。下面幾條分佈規則，涉及 `bf`、`pf` 的只指城區音，涉及 `rh` 的只指南郊音：

- `z c s`（ʦ ʦʰ s）只接 `ɿ` 和洪音韻母；細音（i、y 起頭）一律 `j q x`（ʨ ʨʰ ɕ）。這一點跟普通話一樣：z c s 後面本來也不會跟 i、y 打頭的韻母。
- `bf pf`（pf pfʰ）只出現在合口/洪音韻母前：`bfu 豬`、`bfuo 捉`、`bfan 磚`、`pfang 窗`。南郊音沒有這兩個聲母，讀 z／c，韻母同時增生 u 介音：`zu 豬`、`zuo 捉`、`zuan 磚`、`cuang 窗`。
- `rh`（z）爲南郊音獨有，只配合口韻母（u ua uo uai uei uan uen uong），對應的城區音讀 v：`入 vu1→rhu1`、`若 vo1→rhuo1`、`軟 van3→rhuan3`、`潤 ven4→rhuen4`、`戎 veng2→rhuong2`。
- `r`（ʐ）只配 7 個洪音韻母：`re 熱`、`rao 饒`、`ren 人`、`rou 揉`、`ran 然`、`rang 瓤`、`reng 扔`；「日 而 兒 耳 二」不讀 r-，讀零聲母 `er`。
- `ng`（ŋ）只配洪音：`nge 我`、`ngan 安`、`ngen 恩`、`ngang 昂`、`ngai 哀`、`ngei 額`、`ngao 熬`、`ngou 歐`。
- `v` 與 `f` 對立：`ven 文` ⟂ `fen 分`、`va 襪` ⟂ `fa 法`。

---

## 三、韻母

兩套共用 **38 個韻母**（開 15 / 齊 8 / 合 9 / 撮 6）；城區音另有 `uu`、`iai` 兩個，共 40 個。零聲母寫法兩套相同：

| 呼 | 零聲母規則 | 例 |
|---|---|---|
| 開呼 | 不加字母 | `a 阿 a1`、`er 日 er1`、`ai`、`ao`、`an`、`ei`、`en`、`ou`、`ang`、`eng` |
| 齊呼 | `i` 改 `y` | `i→yi 衣`、`ia→ya 丫`、`ie→ye 也`、`ian→yan 煙`、`ien→yen 音`、`ieng→yeng 英`、`iou→you 有`、`iang→yang 央` |
| 合呼 | `u` 改 `w` | `u→wu 烏`、`ua→wa 挖`、`uo→wo 窩`、`uai→wai 外`、`uan→wan 彎`、`uei→wei 威`、`uen→wen 溫`、`uong→wong 翁`、`uang→wang 汪` |
| 撮呼 | 照寫 `yu-` | `yu 魚`、`yue 月`、`yuo 樂`、`yuan 冤`、`yuen 勻`、`yuong 容` |

撮呼一律帶 `y`，聲母后也不省：`jyu 居`、`qyuo 卻`、`xyuen 燻`、`nyu 女`、`lyu 律`。

城區音的 `uu`（`guu 胳`）在南郊音讀 `e`（`ge`），`iai`（`jiai 皆`）讀 `ie`（`jie`）。

---

## 四、聲調

![西安話聲調圖](figures/tones.hant.svg)

調號緊跟在音節後，不另加空格。入聲已歸併到這四個調裏，歸派與普通話不同：`立 li1`（陰平，普通話去聲）、`白 bei2`（陽平，普通話陽平）、`藥 yuo1`（陰平，普通話去聲）、`六 liou1`（陰平，普通話去聲）、`十 shi2`（陽平，普通話陽平）、`大 duo4`（去聲，普通話去聲）。

---

## 五、正字法細則

1. **舌尖元音**：`ɿ`（z c s 後）、`ʅ`（zh ch sh r 後）都寫 `i`，靠聲母限定不會混：`zi 指`、`chi 喫`。與普通話的 `zi ci si / zhi chi shi` 寫法一致。
2. **鼻音韻母**：`ã ẽ ɑɣ̃ əɣ̃` 及各呼變體一律寫成 `n/ŋ` 尾（`an en ang eng`、`ian ien ieng iang`、`uan uen uong uang`、`yuan yuen yuong`）。注意 `uong`/`yuong` 對的是 `uoɣ̃`/`yoɣ̃`，跟普通話的 `ong/iong` 不同形。
3. **音節邊界用撇號**：兩音節連寫會被切錯時加 `'`，與普通話 `xi'an` 同一個道理。本方案最典型的例子就是「西安」本身：`xi1 + ngan1 → xi'ngan1`；若連寫成 `xingan`，就能被重新切成 `xin`（心的簡拼）+ `gan`（幹）。倉庫名因此去掉了撇號。
4. **對外注音永遠帶調**，詞庫行也是帶調全拼；簡拼與省調只存在於輸入端（見第八節）。

---

## 六、與普通話拼音的異同

面向會普通話拼音的人：字母系統大體相同，差別集中在少數聲母、少數韻母的拼寫、以及調值上。

**① 完全一樣的（直接照打）**

`b p m f d t n l g k h z c s zh ch sh r j q x` 這些聲母字母與讀音跟普通話一致（不送氣/送氣關係也一致）；`a i u e er ai ei ao ou ia ie iao ian iang ua uo uai uan uang` 這些韻母拼寫也一致。例：`巴 ba1`、`天 tian1`、`小 xiao3`、`到 dao4`、`走 zou3`、`家 jia1`、`花 hua1`、`快 kuai4`、`光 guang1`、`窩 wo1`、`烏 wu1`、`衣 yi1`、`兒 er2`。零聲母的 y/w 規則與普通話完全相同。

**② 字母相同、音值不同（形同音異）**

所有 `-n / -ng` 結尾的韻母在西安話裏是**鼻化元音**，不是普通話那樣收鼻音尾：`an = ã`、`en = ẽ`、`ang = ɑɣ̃`、`eng = əɣ̃`。所以 `山 san1`、`人 ren2`、`上 shang4`、`中 bfeng4` 的字母跟普通話一樣，念法不一樣。

**③ 拼寫不同（要重記的）**

| 普通話 | 西安話拼音（兩音相同） | 例 | 說明 |
|---|---|---|---|
| in | ien | 心 xien1 | 全拼不簡；輸入時可簡拼 in |
| ing | ieng | 明 mieng2 | 同上 |
| iu | iou | 牛 niou2 | 同上 |
| ui | uei | 回 huei2 | 輸入時可簡拼 ui |
| un | uen | 溫 wen1 | 零聲母時與普通話同形 wen |
| ong | uong | 東 duong1 | 零聲母 wong 翁 |
| iong | yuong | 容 yuong2 | 撮呼帶 y |
| ü / üe / üan / ün | yu / yue / yuan / yuen | 魚 yu2、月 yue1、元 yuan2、軍 jyuen1 | 一律帶 y，聲母后也不省 |

**④ 城區音多出來的（南郊音沒有）**

- 聲母：`bf pf`（豬 bfu1、窗 pfang1）。南郊音沒有這兩個聲母，讀 z、c：豬 zu1、窗 cuang1；南郊音另有一個 rh，城區音沒有（見本節②的聲母分佈）。
- 韻母：`uu`（胳 guu1）、`iai`（皆 jiai1）。其中 uu、iai 南郊音讀 e、ie：胳 ge1、皆 jie1。

**⑤ 聲母對不上的字（記例不記規則）**

| 普通話 | 城區音 | 南郊音 | 例 |
|---|---|---|---|
| shuǐ | fei3 | suei3 | 水 |
| shū | fu1 | su1 | 書 |
| shuō | she1 | she1 | 說 |
| shān / shì | san1 / si4 | san1 / si4 | 山 / 是 |
| zhū / chū | bfu1 / pfu1 | zu1 / cu1 | 豬 / 出 |
| zhōng / chūn | bfeng4 / pfen1 | zuong4 / cuen1 | 中 / 春 |
| wén | ven2 | ven2 | 文 |
| é / ān | nge2 / ngan1 | nge2 / ngan1 | 鵝 / 安 |
| rì | er1 | er1 | 日 |
| rù | vu1 | rhu1 | 入 |

**⑥ 調號位置一樣、調值完全不同**：普通話的 ā á ǎ à 對應本方案的 1 2 3 4，但西安話是 21 / 24 / 53 / 44（見聲調圖）。母語者按本地調值念即可，不需要換算。

---

## 七、快速上手

| 字 | 普通話 | 西安話碼 | | 字 | 普通話 | 西安話碼 |
|---|---|---|---|---|---|---|
| 我 | wǒ | `nge3` | | 魚 | yú | `yu2` |
| 你 | nǐ | `ni3` | | 軍 | jūn | `jyuen1` |
| 他 | tā | `ta1` | | 東 | dōng | `duong1` |
| 人 | rén | `ren2` | | 心 | xīn | `xien1` |
| 山 | shān | `san1` | | 明 | míng | `mieng2` |
| 水 | shuǐ | `fei3` | | 有 | yǒu | `you3` |
| 中 | zhōng | `bfeng4` | | 不 | bù | `bu1` |
| 天 | tiān | `tian1` | | 是 | shì | `si4` |
| 家 | jiā | `jia1` | | 立 | lì | `li1` |
| 日 | rì | `er1` | | 大 | dà | `da4` |

- 表中是城區音碼；`水 fei3` 南郊作 `suei3`、`中 bfeng4` 作 `zuong4`，其餘字兩套同碼。
- 調號可省：打 `ba` 出四個調的候選，打 `ba1` 只出陰平。
- 常用簡拼：`in / ing / iu / ui / un / ung / yun / yung` 分別對應 `ien / ieng / iou / uei / uen / uong / yuen / yuong`（零聲母的 `you 有`、`wen 溫`、`wei 威` 不簡）。
- 反查：`q` + 普通話拼音、`x` + 筆畫，候選註釋會顯示西安話讀音（城區音、南郊音）。

---

## 八、允許的簡化拼寫

### 8.1 韻母簡拼（只在輸入端兼容，詞庫與注音仍寫全拼）

| 全拼 | 簡拼 | 條件 | 例 |
|---|---|---|---|
| `ien` | `in` | 僅限前面有聲母 | `jien 今 → jin`、`xien 新 → xin` |
| `ieng` | `ing` | 僅限前面有聲母 | `mieng 明 → ming`、`xieng 行 → xing` |
| `iou` | `iu` | 僅限前面有聲母 | `jiou 究 → jiu`、`niou 牛 → niu` |
| `uei` | `ui` | 僅限前面有聲母 | `huei 回 → hui`、`duei 對 → dui` |
| `uen` | `un` | 僅限前面有聲母 | `suen 孫 → sun`、`duen 墩 → dun` |
| `uong` | `ung` | 僅限前面有聲母 | `duong 冬 → dung`、`huong 烘 → hung` |
| `yuen` | `yun` | 零聲母也放行 | `yuen 勻 → yun`、`jyuen 軍 → jyun` |
| `yuong` | `yung` | 零聲母也放行 | `yuong 容 → yung`、`qyuong 瓊 → qyung` |

![西安話簡拼對照圖（輸入端 8 條縮寫規則）](figures/abbrev.hant.svg)

**不允許的簡寫**（會撞車或造出方案外的碼）：

| 想簡 | 結果 | 爲什麼不行 |
|---|---|---|
| `you 有` → `yu` | ✗ | 與 `魚 yu` 同形 |
| `wen 溫` → `wn`／`wun` | ✗ | 方案裏沒有這種切分 |
| `yen 音`、`yeng 英` → `in`、`ing` | ✗ | 零聲母不簡，`in` 只能指向 `ien` |
| `wong 翁` → `ung` | ✗ | 同上，`wong` 保持全拼 |
| `yue`、`yuo`、`yuan`、`yu` | 不簡 | 本表未定簡寫式 |
| 聲母只打首字母 | 暫不開放 | 單字層面同音太多，等詞庫做齊再啓 `abbrev` |

放行條件在 `chengqyu.schema.yaml` 的 `speller/algebra` 裏用聲母錨點表達，不能圖省事寫成裸規則：`derive/uen/un/` 會把 `yuong`、`yuen` 這類零聲母全拼也咬穿，產出錯碼。`nanjiao.schema.yaml` 規則相同，聲母錨點裏沒有 `bf`、`pf`，多了 `rh`。

### 8.2 聲調不輸入

**輸入碼裏沒有數字。** `alphabet` 只收 26 個字母，`speller/algebra` 用 `xform/\d//` 把字音表裏的調號整條去掉——調號只留在註釋（候選右側的注音）和字表裏，不參與打字。

原因很直接：Rime 的 `1`–`9` 是選詞鍵，調號若也當輸入碼，兩者會撞車。同音字（`ba` 對應 ba1/ba2/ba3/ba4 全部）一併進候選，按詞頻與上下文排序。

### 8.3 簡拼歧義校驗

把 algebra 全部規則分別跑在城區 392 個、南郊 389 個音節上：各衍生 56 與 62 個簡拼碼（去調形式），**跨音節歧義 0 個**，簡拼碼與其他音節的全拼同形 0 個。簡拼只增加輸入寬容度，不會讓一個碼出兩批不相干的字。

---

## 九、詞庫與字表

| 項 | 城區音 | 南郊音 |
|---|---|---|
| 字音條目（一字一音一行） | 3,648 | 4,350 |
| 不同漢字 | 3,345 | 4,065（含渭南獨有等新增 720 字） |
| 多音字 | 275 | 256 |
| 分調條目 1/2/3/4 | 1,148 / 826 / 639 / 1,035 | 1,356 / 995 / 788 / 1,205（另輕聲 6） |

- 詞庫嚴格 `字<TAB>單音節`，碼列從不出現空格，免得被 Rime 當成多音節詞組。
- 源表自帶的同字又音，校表時重點看：`勻 yen2 / yuen2`、`你 ni1 / ni3`、`不 bu1 / bu2`、`來 lai1 / lai2`、`大 da4 / duo4`、`行 hang2 / hang4 / xieng2`。
- 有音無字（源表只給 `□`，未進詞庫）：`zou2`「~幹：精幹」、`tai3`「打~：賭木柴遊戲」、`sao2`「用鞭梢打」。
- 用字是繁體（源表如此），簡體輸出要靠 opencc。

---

## 十、文件與安裝

```
chengqyu.schema.yaml           西安話城區音方案：字母表、簡拼演算、反查 Q/X
chengqyu.dict.yaml             城區音主詞典，導入 chengqyu.word
chengqyu.word.dict.yaml        城區音字音表 3,648 條（腳本生成，勿手改）
nanjiao.schema.yaml            西安話南郊音方案（聲母 25 含 rh、韻母 38）
nanjiao.dict.yaml              南郊音主詞典，導入 nanjiao.word
nanjiao.word.dict.yaml         南郊音字音表 4,350 條（腳本生成，勿手改）
figures/onsets.hant.svg        聲母圖（另有 .hant / .en / .ja 三版）
figures/rhymes.hant.svg        韻母圖（同上）
figures/tones.hant.svg         聲調圖（同上）
figures/syllable.hant.svg      音節結構圖（同上）
figures/abbrev.hant.svg        簡拼對照圖（同上）
tools/ipa2pinyin.mjs           IPA → 城區音拼音轉寫腳本
tools/make_nanjiao_dict.py     南郊音字表 → nanjiao.word.dict.yaml
tools/make-figures.mjs         五張圖 × 四種語言的生成腳本
tools/chengqyu.ipa對照.tsv    城區音逐音對照：IPA / 調名 / 拼音 / 聲母 / 韻母 / 轄字
tools/chengqyu.詳注.tsv       城區音逐字詳註，含源表 {} 釋義與白讀標記
```

（兩張對照表的文件名沿用繁體寫法，與倉庫裏實際文件名一致。）

1. 把下列文件放進 Rime 用戶目錄
   - Windows（小狼毫）：`%APPDATA%\Rime`
   - macOS（鼠須管）：`~/Library/Rime`
   - Linux：`~/.config/ibus/rime` 或 `~/.local/share/fcitx5/rime`

   ```
   chengqyu.schema.yaml
   chengqyu.dict.yaml
   chengqyu.word.dict.yaml
   nanjiao.schema.yaml
   nanjiao.dict.yaml
   nanjiao.word.dict.yaml
   ```

2. 在 `default.custom.yaml` 裏掛上方案：

   ```yaml
   patch:
     schema_list:
       - schema: chengqyu
       - schema: nanjiao
       # 其他方案照樣往下追加即可
   ```

3. 重新部署（小狼毫：右鍵托盤圖標 →「重新部署」）。

---

## 十一、複覈辦法

轉寫規則全部集中在 `tools/ipa2pinyin.mjs` 頂部三張映射表（`MR` 聲母、`FR` 韻母、`ZR` 零聲母）。改完在倉庫根目錄跑：

```sh
node tools/ipa2pinyin.mjs /path/to/西安.tsv
```

詞庫與兩張對照表一起重生，腳本自報：未映射音節、同形衝突、不含調/含調音節數、字音條目與多音字數。南郊音字表改過之後跑 `python tools/make_nanjiao_dict.py` 重生 `nanjiao.word.dict.yaml`。四張圖用 `node tools/make-figures.mjs` 重生，一次寫出 `figures/` 下 16 個文件（四張圖 × 簡 / 繁 / 英 / 日）。algebra 的簡拼衍生碼另可寫個模擬器逐條跑 schema 裏的規則，檢查歧義（開發時用過，未隨倉庫發佈，需要可以再補進來）。

---

## 十二、待定與後續

1. **撮呼 `y` 是否保留**：現行 `jyu/qyuo/xyuen/nyu/lyu`；普通話式 `ju/qu/xu/nü/lü` 的兼容規則已在 schema 註釋裏預留。
2. **零聲母 `yen/yeng`**：機械 `i→y` 的結果。普通話式 `yin/ying` 會與簡拼 `in/ing` 撞車，故未採。
3. **詞組庫**：按「詞中每字只有一個讀音」批量折算，多音字詞條人工裁音；這一步做完才談得上句子輸入體驗。
4. **字頻權重**：現在借 `use_preset_vocabulary` 用普通話詞頻，是臨時的。
5. **語法模型**：`.gram` 未建，`contextual_suggestions` 暫關。
6. `reverse_lookup_translator` 在新版 librime 裏屬舊式寫法，先與 wugniu_suwu 保持一致，部署報錯再換。

---

## 十三、數據與致謝

- [osfans/MCPDict](https://github.com/osfans/MCPDict)（`tools/tables/data/西安.tsv`）——城區音字音數據源，國際音標
- 《西安南郊音》逐字裁定表（1,882 字，2026-11-20 覈定）——南郊音字音來源，與兩地一致讀音合併折出，見 `nanjiao.word.dict.yaml`
- [wugniu_suwu](https://github.com/SiqYin/wugniu_suwu)（雪螢）——方案架構、詞典組織方式與反查寫法
- [bepemefeve_flypy](https://github.com/SiqYin/bepemefeve_flypy)（雪螢）——本 README 的排版與配圖方式參照

**驗證**：城區音字表 3,648 條與原表逐字比對無一缺失，392 個音節拼寫兩兩不同；南郊音字表 4,350 條，389 個音節同樣零衝突；algebra 簡拼衍生碼跨音節歧義 0。

---

## 十四、授權

方案配置（`chengqyu.schema.yaml`、`nanjiao.schema.yaml`、`figures/` 下的四語配圖、本說明）可自由使用、修改、再分發。城區音字音數據來自 MCPDict《西安》數據表，版權與授權請遵循原項目說明。

---

## 聲明

簡體版爲源文；繁體版由 OpenCC 從簡體轉出，英文與日文版爲對應譯本。四版內容一致，如有出入以簡體版爲準。本文由 AI 輔助撰寫與翻譯。

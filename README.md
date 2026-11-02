# 西安話輸入方案（仙話拼音）· 草稿

Rime 平台的西安話（關中片）輸入方案。字音取自 [osfans/MCPDict《西安》數據表](https://github.com/osfans/MCPDict/blob/master/tools/tables/data/%E8%A5%BF%E5%AE%89.tsv)（國際音標），按下面的西安話拼音方案逐條轉寫；方案結構參照 [wugniu_suwu](https://github.com/SiqYin/wugniu_suwu)。

版本 `0.1-draft`：**字表已可校對，方案待你定稿四項（見文末）**。

---

## 一、音系

| | 數量 |
|---|---|
| 聲母 | 26（25 輔音 + 零聲母） |
| 韻母 | 40（開 15 / 齊 10 / 合 9 / 撮 6） |
| 聲調 | 4：陰平 21、陽平 24、上聲 53、去聲 44 |
| 不含調音節 | 392 |
| 含調音節 | 1158（其中 3 個有音無字） |

### 聲母

| 寫法 | b | p | m | f | v | bf | pf | d | t | n | l | z | c | s | j | q | x | zh | ch | sh | r | g | k | h | ng | （不標） |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| IPA | p | pʰ | m | f | v | pf | pfʰ | t | tʰ | n | l | ʦ | ʦʰ | s | ʨ | ʨʰ | ɕ | tʂ | tʂʰ | ʂ | ʐ | k | kʰ | x | ŋ | Ø |

### 韻母

* 開呼 15：`a[a] o[o] er[ɚ] e[ɤ] uu[ɯ] i[ɿ] i[ʅ] ai[ai] ao[au] an[ã] ei[ei] en[ẽ] ou[ɤu] ang[ɑɣ̃] eng[əɣ̃]`
  —— `ɿ`（精組 z c s 後）與 `ʅ`（知組 zh ch sh r 後）都寫作 `i`，只出现在這兩類聲母後，不與 `i[i]` 混淆；開呼因此是 40 個韻母裏的 15 個、拉丁層面 14 種寫法。
* 齊呼 10：`i[i] ia[ia] ie[iɛ] iai[iai] iao[iau] ian[iã] ien[iẽ] ieng[iɣ̃] iou[iɤu] iang[iɑɣ̃]`
* 合呼 9：`u[u] ua[ua] uo[uɤ] uai[uai] uan[uã] uei[uei] uen[uẽ] uong[uoɣ̃] uang[uɑɣ̃]`
* 撮呼 6：`yu[y] yue[yɛ] yuo[yɤ] yuan[yã] yuen[yẽ] yuong[yoɣ̃]`

`ã ẽ` 是鼻化元音、`ɑɣ̃ əɣ̃` 是鼻化成分加鼻化元音，方案裏一律寫成鼻音韻母：開呼 `an en ang eng`、齊呼 `ian ien ieng iang`、合呼 `uan uen uong uang`、撮呼 `yuan yuen yuong`（共 15 個，佔 40 韻母的三分之一以上）。

### 聲調

| 調號 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 調名 | 陰平 | 陽平 | 上聲 | 去聲 |
| 調值 | 21 | 24 | 53 | 44 |

---

## 二、拼寫規則

1. **零聲母**：齊呼 `i` 行改 `y`（`i→yi`、`ia→ya`、`iɛ→ye`、`iã→yan`、`iɤu→you`…），合呼 `u` 行改 `w`（`u→wu`、`uei→wei`、`uẽ→wen`、`uoɣ̃→wong`…），撮呼與開呼照寫（`yu yue yuo yuan yuen yuong`、`a er ai ao an ei en ou ang eng`）。
2. **聲調**：調號緊寫在音節後，如 `ba1 巴`、`shou3 手`、`yuong2 容`。
3. **注音一律全拼**；詞庫 `xianhua.word.dict.yaml` 裏只有全拼。
4. **簡拼只在輸入端兼容**，由方案 `speller/algebra` 衍生，共七條：

| 全拼 | 簡拼 | 例 | | 全拼 | 簡拼 | 例 |
|---|---|---|---|---|---|---|
| ien | in | jien 今 => jin | | uong | ung | duong 東 => dung |
| ieng | ing | mieng 明 => ming | | yuen | yun | yuen 勻 => yun、jyuen 軍 => jyun |
| iou | iu | jiou 究 => jiu | | yuong | yung | yuong 容 => yung、qyuong 瓊 => qyung |
| uen | un | suen 孫 => sun | | | | |

   零聲母裏頭只有撮呼鼻音這兩條允許簡拼（`yun`、`yung` 不與任何全拼撞）；其余一律不簡：`you 優`不縮成 `yu`（會與「魚」撞），`wen 溫`不縮成 `wn/wun`，`yen 音`、`yeng 英`、`wong 翁`、`yue/yuo/yuan` 照全拼。方案用聲母錨點寫規則，正是為了區分「`yuong` 裸形式該不該簡」這一類情況——裸的 `derive/uong/ung/` 會把 `yuong` 咬出 `yung` 之外的錯碼。

5. **聲調可打可省**：打 `ba1` 只出陰平，打 `ba` 四聲都出。草稿如此設定，要強制帶調就把 `algebra` 裏四條 `derive/(.)n(?=…)/$1/` 註釋掉。
6. 轉寫零衝突：392 個音節的拼寫兩兩不同，這套羅馬字可逆，字表能原樣還原成 IPA。

---

## 三、文件

```
xianhua_xian.schema.yaml      方案（音標字母表、簡拼演算、反查 Q/X）
xianhua_xian.dict.yaml        主詞典，導入 xianhua.word
xianhua.word.dict.yaml        字音表 3647 條：字<TAB>全拼+調號
```

字表統計：字音條目 3647、不同漢字 3344、多音字 275。詞庫嚴格按「一字一音一行」排，同一字重複出現佔多行（`着` 佔 5 行：bfuo2 / pfuo2 / zhao1 / zhao2 / zhe1；`卡` 佔 4 行），碼列內從不出現空格，免得被 Rime 當成多音節詞組。分調條目數 1/2/3/4 = 1148 / 825 / 639 / 1035。

原表自帶的同字又音，校表時值得留意：`勻 yen2 / yuen2`、`你 ni1 / ni3`、`不 bu1 / bu2`、`來 lai1 / lai2`。用字沿用原表繁體字形（豬、啓、雲一类），簡體輸出要靠 opencc。

有音無字（原表只給 `□`，未進字表，方案要不要留這幾個空音节待定）：`zou2`「~幹：精幹」、`tai3`「打~：賭木柴遊戲」、`sao2`「用鞭梢打」。

## 四、安裝

把三個文件放進 Rime 用戶目錄（Windows `%APPDATA%\Rime`，macOS/Linux `~/.config/rime`），在 `default.custom.yaml` 裏加上方案後重新部署：

```yaml
patch:
  schema_list:
    - schema: xianhua_xian
    - schema: luna_pinyin
```

## 五、待你定稿 / 後續工作

1. **撮呼在 j q x n l 後是否保留 `y`**：現行 `jyu 居、jyue 掘、jyuo 腳、jyuan 捐、jyuen 軍、jyuong 瓊、nyu 女、lyu 律`。要普通話式 `ü→u`（ju jue juan jun / nü lü）就把 schema 裏那組註釋規則打開，字表同時改寫。
2. **零聲母 i + 鼻音**：現行 `yen 音、yeng 英`（機械 i→y）。若按普通話式 `yin/ying`，就與簡拼 `in/ing` 撞車。
3. **撮呼零聲母的簡拼**：已按你定的放行 `yuen=>yun`、`yuong=>yung`（注意是 `yung`，不是最初寫法的 `yong`；兩種都要就在 algebra 裏補一行 `derive/yuong(?=\d?$)/yong/`）。開合呼零聲母仍不簡：`wong 翁`、`wen 溫`、`yen 音`、`yeng 英`、`you 優` 保持全拼，確認接受度。
4. **注音與輸入的分際**：詞庫和本字表只存全拼帶調；簡拼、省調全部由 `algebra` 衍生，不污染字表。
5. 詞庫：按「詞中每字單讀」批量折算，多音字詞條人工裁音。
6. 字頻權重與語法模型（`.gram`）：目前靠 `use_preset_vocabulary` 借用普通話詞頻，是臨時做法。
7. 簡繁／訓讀用字：原表已是繁體，輸出口要不要開 `simplification`、要不要做 `opencc` 轉換，等方案定稿再定。
8. `reverse_lookup_translator` 在新版 librime 裏已算舊式寫法，先照 wugniu_suwu 保留，部署異常再換 `switches` 式反查。

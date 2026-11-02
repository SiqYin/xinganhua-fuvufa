# 西安話輸入方案 · 仙話拼音

西安話（陝西方言·關中片）的 Rime 輸入方案。字音資料來自 [osfans/MCPDict《西安》數據表](https://github.com/osfans/MCPDict/blob/master/tools/tables/data/%E8%A5%BF%E5%AE%89.tsv)（國際音標），按本方案逐條轉寫；方案架構參照 [wugniu_suwu](https://github.com/SiqYin/wugniu_suwu)。

方案代號 `xianhua_xian`，版本 `0.1-draft`：字音表已可校對，詞組庫尚未做。

| 項目 | 規模 |
|---|---|
| 聲母 | 26（25 個輔音 + 零聲母） |
| 韻母 | 40（開 15 / 齊 10 / 合 9 / 撮 6） |
| 聲調 | 4（陰平 21、陽平 24、上聲 53、去聲 44） |
| 音節 | 不含調 392、含調 1158（其中 3 個有音無字） |
| 聲韻配合 | 392 種，轉寫後拼寫兩兩不同，**零同形衝突** |

---

## 一、聲母正字法

方括號內是國際音標，例字給「全拼+調號」，末尾數字是該聲母在本表裏的音節數。字例字形沿用源表繁體。

| 寫法 | IPA | 例 | 音節數 | | 寫法 | IPA | 例 | 音節數 |
|---|---|---|---|---|---|---|---|---|
| `b` | p | 巴 ba1 | 18 | | `j` | ʨ | 家 jia1 | 15 |
| `p` | pʰ | 朋 peng2 | 18 | | `q` | ʨʰ | 妻 qi1 | 15 |
| `m` | m | 明 mieng2 | 16 | | `x` | ɕ | 西 xi1 | 15 |
| `f` | f | 夫 fu1 | 10 | | `zh` | tʂ | 站 zan4 | 9 |
| `v` | v | 文 ven2 | 9 | | `ch` | tʂʰ | 吃 chi1 | 8 |
| `bf` | pf | 中 bfeng4 | 8 | | `sh` | ʂ | 上 shang4 | 9 |
| `pf` | pfʰ | 窗 pfang1 | 9 | | `r` | ʐ | 人 ren2 | 7 |
| `d` | t | 的 di1 | 20 | | `g` | k | 狗 gou3 | 20 |
| `t` | tʰ | 他 ta1 | 19 | | `k` | kʰ | 口 kou3 | 20 |
| `n` | n | 你 ni3 | 21 | | `h` | x | 花 hua1 | 19 |
| `l` | l | 立 li1 | 24 | | `ng` | ŋ | 安 ngan1 | 8 |
| `z` | ʦ | 字 zi4 | 16 | | （不標） | Ø | 衣 yi1 | 27 |
| `c` | ʦʰ | 茶 ca2 | 16 | | | | | |
| `s` | s | 山 san1 | 16 | | | | | |

分佈上的幾條硬規則（是本表數據的共時分佈描述，不涉及音類考證）：

* `ʦ ʦʰ s`（z c s）只與 `ɿ` 及洪音韻母相拼；遇到 `i`、`y` 起頭的細音韻母一律是 `ʨ ʨʰ ɕ`（j q x）。所以 `zi 指` ⟂ `ji 基`、`su 蘇` ⟂ `xyu 需` 之類對立不存在，兩組按韻母互補分工。
* `pf pfʰ`（bf pf）只出現在合口/洪音韻母前：`bfu 豬`、`bfuo 捉`、`bfan 磚`、`pfang 窗`。
* `ʐ`（r）只配 7 個洪音韻母：`re 熱`、`rao 饒`、`ren 人`、`rou 揉`、`ran 然`、`rang 瓤`、`reng 扔`；「日而兒耳二」這組字讀零聲母 `er`。
* `ŋ`（ng）只配洪音：`nge 我`、`ngan 安`、`ngen 恩`、`ngang 昂`、`ngai 哀`、`ngei 額`、`ngao 熬`、`ngou 歐`。
* `v` 獨立於 `f`：`ven 文` ⟂ `fen 分`、`va 襪` ⟂ `fa 法`。

## 二、韻母正字法

`寫法 [IPA] 例`；「零聲母式」指該韻母前面不接聲母時怎麼寫。

### 開呼 15

| 韻母 | | 例 | 零聲母式 |
|---|---|---|---|
| `a` | a | 巴 ba1 | `a 阿 a1` |
| `o` | o | 若 vo1 | 不獨立成音节 |
| `er` | ɚ | 兒 er2 | `er 日 er1` |
| `e` | ɤ | 鵝 nge2 | 不獨立成音节 |
| `uu` | ɯ | 胳 guu1 | 不獨立成音节 |
| `i` | ɿ | 字 zi4（僅 z c s 後） | 不獨立成音节 |
| `i` | ʅ | 吃 chi1（僅 zh ch sh r 後） | 不獨立成音节 |
| `ai` | ai | 菜 cai4 | `ai` |
| `ao` | au | 到 dao4 | `ao` |
| `an` | ã | 山 san1 | `an` |
| `ei` | ei | 水 fei3 | `ei` |
| `en` | ẽ | 人 ren2 | `en` |
| `ou` | ɤu | 狗 gou3 | `ou` |
| `ang` | ɑɣ̃ | 上 shang4 | `ang` |
| `eng` | əɣ̃ | 中 bfeng4 | `eng` |

### 齊呼 10

| 韻母 | | 例 | 零聲母式 |
|---|---|---|---|
| `i` | i | 基 ji1 | `yi 衣 yi1` |
| `ia` | ia | 家 jia1 | `ya 丫 ya1` |
| `ie` | iɛ | 姐 jie3 | `ye 也 ye3` |
| `iai` | iai | 皆 jiai1 | `yai 癌 yai2` |
| `iao` | iau | 小 xiao3 | `yao 腰 yao1` |
| `ian` | iã | 年 nian2 | `yan 煙 yan1` |
| `ien` | iẽ | 新 xien1 | `yen 音 yen1` |
| `ieng` | iɣ̃ | 行 xieng2 | `yeng 英 yeng1` |
| `iou` | iɤu | 九 jiou3 | `you 有 you3` |
| `iang` | iɑɣ̃ | 香 xiang1 | `yang 央 yang1` |

### 合呼 9

| 韻母 | | 例 | 零聲母式 |
|---|---|---|---|
| `u` | u | 夫 fu1 | `wu 烏 wu1` |
| `ua` | ua | 花 hua1 | `wa 挖 wa1` |
| `uo` | uɤ | 大 duo4 | `wo 窩 wo1` |
| `uai` | uai | 快 kuai4 | `wai 外 wai4` |
| `uan` | uã | 短 duan3 | `wan 彎 wan1` |
| `uei` | uei | 回 huei2 | `wei 威 wei1` |
| `uen` | uẽ | 墩 duen1 | `wen 溫 wen1` |
| `uong` | uoɣ̃ | 冬 duong1 | `wong 翁 wong1` |
| `uang` | uɑɣ̃ | 光 guang1 | `wang 汪 wang1` |

### 撮呼 6

| 韻母 | | 例 | 零聲母式 |
|---|---|---|---|
| `yu` | y | 曲 qyu1、魚 yu2 | `yu 魚 yu2` |
| `yue` | yɛ | 雪 xyue1、月 yue1 | `yue 月 yue1` |
| `yuo` | yɤ | 削 xyuo1、樂 yuo1 | `yuo 岳 yuo1` |
| `yuan` | yã | 捐 jyuan1、元 yuan2 | `yuan 冤 yuan1` |
| `yuen` | yẽ | 軍 jyuen1、雲 yuen2 | `yuen 勻 yuen2` |
| `yuong` | yoɣ̃ | 瓊 qyuong2、容 yuong2 | `yuong 容 yuong2` |

撮呼一律帶 `y`，聲母後也不省：`jyu 居`、`qyuo 卻`、`xyuen 熏`、`nyu 女`、`lyu 律`。（普通話式 `ü→u` 的兼容寫法在 schema 裏預留了開關，未啟用。）

## 三、聲調

| 調號 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 調名 | 陰平 | 陽平 | 上聲 | 去聲 |
| 調值 | 21 | 24 | 53 | 44 |
| 例 | 天 tian1 | 年 nian2 | 小 xiao3 | 去 qi4 |

調號緊跟在音節後，不另加空格。入聲已歸並到以上四調，表內如 `立 li1`、`月 yue1`、`大 duo4`。

## 四、正字法细则

1. **零聲母的 y / w**：齊呼 `i` 行首字母改 `y`（`i→yi`、`ia→ya`、`iẽ→yen`、`iɤu→you`…）；合呼 `u` 行改 `w`（`u→wu`、`uei→wei`、`uẽ→wen`、`uoɣ̃→wong`…）；撮呼 `yu` 行照寫；開呼不加字母（`a ai ao an ei en ou ang eng er`）。
2. **舌尖元音**：`ɿ`（z c s 後）、`ʅ`（zh ch sh r 後）都寫 `i`，靠聲母限定不會混：`zi 指`、`chi 吃`。
3. **鼻音韻母**：`ã ẽ ɑɣ̃ əɣ̃` 及各呼變體一律寫成 `n/ŋ` 尾（`an en ang eng`、`ian ien ieng iang`、`uan uen uong uang`、`yuan yuen yuong`）。注意 `uong`/`yuong` 對應的是 `uoɣ̃`/`yoɣ̃`，与普通話的 `ong/iong` 不同形。
4. **音節邊界用撇號**：前後兩音節相連可能被重新切分時加 `'`。最典型的就是本項目的名字：`西安 = xi1 ngan1`，連寫成 `xingan` 就能被切成 `xin(心 的簡拼) + gan(干)`，必須寫 **`xi'ngan`**。Rime 裏 `delimiter` 已設為空格與 `'`，多音節輸入可用撇號強切。

## 五、允許的簡化拼寫

### 5.1 韻母簡拼（輸入端兼容，詞庫與注音仍寫全拼）

| 全拼 | 簡拼 | 條件 | 例 |
|---|---|---|---|
| `ien` | `in` | 僅限前面有聲母 | `jien 今 → jin`、`xien 新 → xin` |
| `ieng` | `ing` | 僅限前面有聲母 | `mieng 明 → ming`、`xieng 行 → xing` |
| `iou` | `iu` | 僅限前面有聲母 | `jiou 究 → jiu`、`niou 牛 → niu` |
| `uen` | `un` | 僅限前面有聲母 | `suen 孫 → sun`、`duen 墩 → dun` |
| `uong` | `ung` | 僅限前面有聲母 | `duong 冬 → dung`、`huong 烘 → hung` |
| `yuen` | `yun` | 零聲母也放行 | `yuen 勻 → yun`、`jyuen 軍 → jyun` |
| `yuong` | `yung` | 零聲母也放行 | `yuong 容 → yung`、`qyuong 瓊 → qyung` |

**不允許的簡寫**（會撞車或造出方案外的碼）：

| 想簡 | 結果 | 為什麼不行 |
|---|---|---|
| `you 優` → `yu` | ✗ | 與 `魚 yu` 同形 |
| `wen 溫` → `wn`／`wun` | ✗ | 方案裏沒有零聲母 `w+韻母`以外的切分 |
| `yen 音`、`yeng 英` → `in`、`ing` | ✗ | 零聲母不簡，`in` 之類只能指向 `ien` |
| `wong 翁` → `ung` | ✗ | 同上，`wong` 保持全拼 |
| `yue`、`yuo`、`yuan`、`yu` | 不簡 | 本表未定簡寫式 |
| 聲母只打首字母 | 暫不開放 | 單字層面同音太多，等詞庫做齊再啟 `abbrev` |

放行條件在 `xianhua_xian.schema.yaml` 的 `speller/algebra` 裏用聲母錨點表達，不能圖省事寫成裸規則：`derive/uen/un/` 會把 `yuong`、`yuen` 这类零聲母全拼也咬穿，產出錯碼。改動之後請跑本倉庫的校驗腳本（見 §八）。

### 5.2 聲調可省

`alphabet` 收 `1234`，調號是輸入碼的一部分，同時 algebra 生成去調變體：

* 打 `ba1` 只出陰平；打 `ba` 陰平陽平上聲去聲全出。
* 多音節要麼全打調、要麼全省，混打（`ba1 da`）不支持。
* 對外注音永遠帶調，詞庫行也是帶調全拼。

### 5.3 簡拼歧義校驗

把 algebra 全部規則跑在 392 個音節上：衍生 48 個簡拼碼（去調形式），**跨音節歧義 0 個**，簡拼碼與任何其他音節的全拼同形 0 個。也就是説簡拼只增加輸入寬容度，不會讓一個碼出兩批不相干的字。

## 六、词庫與字表

| 項 | 數 |
|---|---|
| 字音條目 | 3647（一字一音一行） |
| 不同漢字 | 3344 |
| 多音字 | 275（`着` 5 行、`卡` 4 行、`側` 3 行…） |
| 分調條目 | 1/2/3/4 = 1148 / 825 / 639 / 1035 |

* 詞庫嚴格 `字<TAB>單音節`，碼列從不出現空格，免得被 Rime 當成多音節詞組。
* 源表自帶的同字又音，校表時重點看：`勻 yen2 / yuen2`、`你 ni1 / ni3`、`不 bu1 / bu2`、`來 lai1 / lai2`、`大 da4 / duo4`、`行 hang2 / hang4 / xieng2`。
* 有音無字（源表只給 `□`，未進詞庫）：`zou2`「~幹：精幹」、`tai3`「打~：賭木柴遊戲」、`sao2`「用鞭梢打」。
* 用字是繁體（源表如此），簡體輸出要靠 opencc。

## 七、文件與安裝

```
xianhua_xian.schema.yaml      方案：輸入字母表、簡拼演算、反查 Q/X
xianhua_xian.dict.yaml        主詞典，導入 xianhua.word
xianhua.word.dict.yaml        字音表 3647 條（腳本生成，勿手改）
tools/ipa2pinyin.mjs          IPA → 仙話拼音轉寫腳本
tools/xianhua.ipa對照.tsv     逐音對照：IPA / 調名 / 拼音 / 聲母 / 韻母 / 轄字
tools/xianhua.詳注.tsv        逐字詳注，含源表 {} 釋義與白讀標記
```

放進 Rime 用戶目錄（Windows `%APPDATA%\Rime`，macOS/Linux `~/.config/rime`），在 `default.custom.yaml` 加：

```yaml
patch:
  schema_list:
    - schema: xianhua_xian
    - schema: luna_pinyin
```

重新部署即可。反查：`q` + 普通話拼音、`x` + 筆畫，候選註釋會顯示西安話讀音。

## 八、複核辦法

轉寫規則全部集中在 `tools/ipa2pinyin.mjs` 頂部三張映射表（`MR` 聲母、`FR` 韻母、`ZR` 零聲母）。改完在倉庫根目錄跑：

```sh
node tools/ipa2pinyin.mjs /path/to/西安.tsv
```

詞庫與兩張對照表一起重生，腳本自報：未映射音節、同形衝突、不含調/含調音節數、字音條目與多音字數。algebra 的簡拼衍生碼另可用 `sim2.mjs` 那類模拟器校驗（讀 schema 的規則逐條跑，檢查歧義）。

## 九、待定與後續

1. **撮呼 `y` 是否保留**：現行 `jyu/qyuo/xyuen/nyu/lyu`；普通話式 `ju/qu/xu/nü/lü` 的兼容規則已在 schema 註釋裏預留。
2. **零聲母 `yen/yeng`**：機械 `i→y` 的結果。普通話式 `yin/ying` 會與簡拼 `in/ing` 撞車，故未採。
3. **詞組庫**：按「詞中每字只有一個讀音」批量折算，多音字詞條人工裁音；這一步做完才能談句間输入體驗。
4. **字頻權重**：現在借 `use_preset_vocabulary` 用普通話詞頻，是臨時的。
5. **語法模型**：`.gram` 未建，`contextual_suggestions` 暫關。
6. `reverse_lookup_translator` 在新版 librime 裏屬舊式寫法，先與 wugniu_suwu 保持一致，部署報錯再換。

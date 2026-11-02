# 西安话输入法（Rime 方案 `xinganhua`）

仓库名 `xinganhua-fuvufa` 用的就是这套拼音：**西** xi1 **安** ngan1 **话** hua4 ｜ **输** fu1 **入** vu1 **法** fa1。两个音节连写会被切错时要加撇号——`xi1 ngan1` 连写成 `xingan` 就能重新切成 `xin`（心的简拼）+ `gan`（干），所以正字法上是 **`xi'ngan`**；GitHub 仓库名不允许撇号，于是落成 `xinganhua-fuvufa`。

西安话（陕西方言·关中片）的 Rime 输入方案，拼写系统就叫**西安话拼音**，不另立名目。字音数据来自 [osfans/MCPDict《西安》数据表](https://github.com/osfans/MCPDict/blob/master/tools/tables/data/%E8%A5%BF%E5%AE%89.tsv)（国际音标），逐条转写成这套拼音；方案架构参照 [wugniu_suwu](https://github.com/SiqYin/wugniu_suwu)。

正文用简体，表格里的**字例保持词库的繁体字形**（鵝、軍、豬、來、溫……），因为词库的条目就是那些字形，改成简体就成了词库里不存在的字。

| 项目 | 规模 |
|---|---|
| 声母 | 26（25 个辅音 + 零声母） |
| 韵母 | 40（开 15 / 齐 10 / 合 9 / 撮 6） |
| 声调 | 4（阴平 21、阳平 24、上声 53、去声 44） |
| 音节 | 不含调 392、含调 1158（其中 3 个有音无字） |
| 声韵配合 | 392 种，转写后拼写两两不同，**零同形冲突** |

---

## 一、声母正字法

第二列是国际音标，例字给「全拼+调号」。

| 写法 | IPA | 例 | | 写法 | IPA | 例 |
|---|---|---|---|---|---|---|
| `b` | p | 巴 ba1 | | `j` | ʨ | 家 jia1 |
| `p` | pʰ | 朋 peng2 | | `q` | ʨʰ | 妻 qi1 |
| `m` | m | 明 mieng2 | | `x` | ɕ | 西 xi1 |
| `f` | f | 夫 fu1 | | `zh` | tʂ | 站 zan4 |
| `v` | v | 文 ven2 | | `ch` | tʂʰ | 吃 chi1 |
| `bf` | pf | 中 bfeng4 | | `sh` | ʂ | 上 shang4 |
| `pf` | pfʰ | 窗 pfang1 | | `r` | ʐ | 人 ren2 |
| `d` | t | 的 di1 | | `g` | k | 狗 gou3 |
| `t` | tʰ | 他 ta1 | | `k` | kʰ | 口 kou3 |
| `n` | n | 你 ni3 | | `h` | x | 花 hua1 |
| `l` | l | 立 li1 | | `ng` | ŋ | 安 ngan1 |
| `z` | ʦ | 字 zi4 | | （不标） | Ø | 衣 yi1 |
| `c` | ʦʰ | 茶 ca2 | | | | |
| `s` | s | 山 san1 | | | | |

分布上的几条硬规则（只描述本表的共时分布，不做音类考证）：

* `ʦ ʦʰ s`（z c s）只跟 `ɿ` 和洪音韵母相拼；遇到 `i`、`y` 起头的细音一律用 `ʨ ʨʰ ɕ`（j q x）。所以不存在 `zi 指` ⟂ `ji 基`、`su 蘇` ⟂ `xyu 需` 这样的对立，两组按韵母洪细互补分工。
* `pf pfʰ`（bf pf）只出现在合口/洪音韵母前：`bfu 豬`、`bfuo 捉`、`bfan 磚`、`pfang 窗`。
* `ʐ`（r）只配 7 个洪音韵母：`re 熱`、`rao 饒`、`ren 人`、`rou 揉`、`ran 然`、`rang 瓤`、`reng 扔`；「日而兒耳二」这组字读零声母 `er`。
* `ŋ`（ng）只配洪音：`nge 我`、`ngan 安`、`ngen 恩`、`ngang 昂`、`ngai 哀`、`ngei 額`、`ngao 熬`、`ngou 歐`。
* `v` 与 `f` 对立：`ven 文` ⟂ `fen 分`、`va 襪` ⟂ `fa 法`。

## 二、韵母正字法

`写法 [IPA] 例`；「零声母式」指该韵母前面不接声母时怎么写。

### 开呼 15

| 韵母 | | 例 | 零声母式 |
|---|---|---|---|
| `a` | a | 巴 ba1 | `a 阿 a1` |
| `o` | o | 若 vo1 | 不独立成音节 |
| `er` | ɚ | 兒 er2 | `er 日 er1` |
| `e` | ɤ | 鵝 nge2 | 不独立成音节 |
| `uu` | ɯ | 胳 guu1 | 不独立成音节 |
| `i` | ɿ | 字 zi4（仅 z c s 后） | 不独立成音节 |
| `i` | ʅ | 吃 chi1（仅 zh ch sh r 后） | 不独立成音节 |
| `ai` | ai | 菜 cai4 | `ai` |
| `ao` | au | 到 dao4 | `ao` |
| `an` | ã | 山 san1 | `an` |
| `ei` | ei | 水 fei3 | `ei` |
| `en` | ẽ | 人 ren2 | `en` |
| `ou` | ɤu | 狗 gou3 | `ou` |
| `ang` | ɑɣ̃ | 上 shang4 | `ang` |
| `eng` | əɣ̃ | 中 bfeng4 | `eng` |

### 齐呼 10

| 韵母 | | 例 | 零声母式 |
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

| 韵母 | | 例 | 零声母式 |
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

| 韵母 | | 例 | 零声母式 |
|---|---|---|---|
| `yu` | y | 曲 qyu1、魚 yu2 | `yu 魚 yu2` |
| `yue` | yɛ | 雪 xyue1、月 yue1 | `yue 月 yue1` |
| `yuo` | yɤ | 削 xyuo1、樂 yuo1 | `yuo 岳 yuo1` |
| `yuan` | yã | 捐 jyuan1、元 yuan2 | `yuan 冤 yuan1` |
| `yuen` | yẽ | 軍 jyuen1、雲 yuen2 | `yuen 勻 yuen2` |
| `yuong` | yoɣ̃ | 瓊 qyuong2、容 yuong2 | `yuong 容 yuong2` |

撮呼一律带 `y`，声母后也不省：`jyu 居`、`qyuo 卻`、`xyuen 熏`、`nyu 女`、`lyu 律`。（普通话式 `ü→u` 的兼容写法在 schema 里留了注释开关，未启用。）

## 三、声调

| 调号 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 调名 | 阴平 | 阳平 | 上声 | 去声 |
| 调值 | 21 | 24 | 53 | 44 |
| 例 | 天 tian1 | 年 nian2 | 小 xiao3 | 去 qi4 |

调号紧跟在音节后，不另加空格。入声已归并到这四个调里，表内如 `立 li1`、`月 yue1`、`大 duo4`。

## 四、正字法细则

1. **零声母的 y / w**：齐呼 `i` 行首字母改 `y`（`i→yi`、`ia→ya`、`iẽ→yen`、`iɤu→you`…）；合呼 `u` 行改 `w`（`u→wu`、`uei→wei`、`uẽ→wen`、`uoɣ̃→wong`…）；撮呼 `yu` 行照写；开呼不加字母（`a ai ao an ei en ou ang eng er`）。
2. **舌尖元音**：`ɿ`（z c s 后）、`ʅ`（zh ch sh r 后）都写 `i`，靠声母限定不会混：`zi 指`、`chi 吃`。
3. **鼻音韵母**：`ã ẽ ɑɣ̃ əɣ̃` 及各呼变体一律写成 `n/ŋ` 尾（`an en ang eng`、`ian ien ieng iang`、`uan uen uong uang`、`yuan yuen yuong`）。注意 `uong`/`yuong` 对的是 `uoɣ̃`/`yoɣ̃`，跟普通话的 `ong/iong` 不同形。
4. **音节边界用撇号**：两音节连写可能被重新切分时加 `'`，最典型的就是本项目的名字 `xi'ngan`（见开头）。Rime 的 `delimiter` 已设为空格与 `'`，多音节输入可以用撇号强切。

## 五、允许的简化拼写

### 5.1 韵母简拼（只在输入端兼容，词库与注音仍写全拼）

| 全拼 | 简拼 | 条件 | 例 |
|---|---|---|---|
| `ien` | `in` | 仅限前面有声母 | `jien 今 → jin`、`xien 新 → xin` |
| `ieng` | `ing` | 仅限前面有声母 | `mieng 明 → ming`、`xieng 行 → xing` |
| `iou` | `iu` | 仅限前面有声母 | `jiou 究 → jiu`、`niou 牛 → niu` |
| `uen` | `un` | 仅限前面有声母 | `suen 孫 → sun`、`duen 墩 → dun` |
| `uong` | `ung` | 仅限前面有声母 | `duong 冬 → dung`、`huong 烘 → hung` |
| `yuen` | `yun` | 零声母也放行 | `yuen 勻 → yun`、`jyuen 軍 → jyun` |
| `yuong` | `yung` | 零声母也放行 | `yuong 容 → yung`、`qyuong 瓊 → qyung` |

**不允许的简写**（会撞车或造出方案外的码）：

| 想简 | 结果 | 为什么不行 |
|---|---|---|
| `you 有` → `yu` | ✗ | 与 `魚 yu` 同形 |
| `wen 溫` → `wn`／`wun` | ✗ | 方案里没有这种切分 |
| `yen 音`、`yeng 英` → `in`、`ing` | ✗ | 零声母不简，`in` 只能指向 `ien` |
| `wong 翁` → `ung` | ✗ | 同上，`wong` 保持全拼 |
| `yue`、`yuo`、`yuan`、`yu` | 不简 | 本表未定简写式 |
| 声母只打首字母 | 暂不开放 | 单字层面同音太多，等词库做齐再启 `abbrev` |

放行条件在 `xinganhua.schema.yaml` 的 `speller/algebra` 里用声母锚点表达，不能图省事写成裸规则：`derive/uen/un/` 会把 `yuong`、`yuen` 这类零声母全拼也咬穿，产出错码。改动之后请跑仓库里的校验脚本（见第八节）。

### 5.2 声调可省

`alphabet` 收了 `1234`，调号是输入码的一部分，同时 algebra 生成去调变体：

* 打 `ba1` 只出阴平；打 `ba` 四个调全出。
* 多音节要么全打调、要么全省，混打（`ba1 da`）不支持。
* 对外注音永远带调，词库行也是带调全拼。

### 5.3 简拼歧义校验

把 algebra 全部规则跑在 392 个音节上：衍生 48 个简拼码（去调形式），**跨音节歧义 0 个**，简拼码与其他音节的全拼同形 0 个。也就是说简拼只增加输入宽容度，不会让一个码出两批不相干的字。

## 六、词库与字表

| 项 | 数 |
|---|---|
| 字音条目 | 3647（一字一音一行） |
| 不同汉字 | 3344 |
| 多音字 | 275（`着` 占 5 行、`卡` 占 4 行、`側` 占 3 行……） |
| 分调条目 | 1/2/3/4 = 1148 / 825 / 639 / 1035 |

* 词库严格 `字<TAB>单音节`，码列从不出现空格，免得被 Rime 当成多音节词组。
* 源表自带的同字又音，校表时重点看：`勻 yen2 / yuen2`、`你 ni1 / ni3`、`不 bu1 / bu2`、`來 lai1 / lai2`、`大 da4 / duo4`、`行 hang2 / hang4 / xieng2`。
* 有音无字（源表只给 `□`，未进词库）：`zou2`「~幹：精幹」、`tai3`「打~：赌木柴游戏」、`sao2`「用鞭梢打」。
* 用字是繁体（源表如此），简体输出要靠 opencc。

## 七、文件与安装

```
xinganhua.schema.yaml          方案：输入字母表、简拼演算、反查 Q/X
xinganhua.dict.yaml            主词典，导入 xinganhua.word
xinganhua.word.dict.yaml       字音表 3647 条（脚本生成，勿手改）
tools/ipa2pinyin.mjs           IPA → 西安话拼音转写脚本
tools/xinganhua.ipa對照.tsv    逐音对照：IPA / 调名 / 拼音 / 声母 / 韵母 / 辖字
tools/xinganhua.詳注.tsv       逐字详注，含源表 {} 释义与白读标记
```

（两张对照表的文件名沿用繁体写法，与仓库里实际文件名一致。）

放进 Rime 用户目录（Windows `%APPDATA%\Rime`，macOS/Linux `~/.config/rime`），在 `default.custom.yaml` 加：

```yaml
patch:
  schema_list:
    - schema: xinganhua
    - schema: luna_pinyin
```

重新部署即可。反查：`q` + 普通话拼音、`x` + 笔画，候选注释会显示西安话读音。

## 八、复核办法

转写规则全部集中在 `tools/ipa2pinyin.mjs` 顶部三张映射表（`MR` 声母、`FR` 韵母、`ZR` 零声母）。改完在仓库根目录跑：

```sh
node tools/ipa2pinyin.mjs /path/to/西安.tsv
```

词库与两张对照表一起重生，脚本自报：未映射音节、同形冲突、不含调/含调音节数、字音条目与多音字数。algebra 的简拼衍生码另可写个模拟器逐条跑 schema 里的规则，检查歧义（本仓库开发时用过一个 `sim2.mjs`，未随仓库发布，需要可以再补进来）。

## 九、待定与后续

1. **撮呼 `y` 是否保留**：现行 `jyu/qyuo/xyuen/nyu/lyu`；普通话式 `ju/qu/xu/nü/lü` 的兼容规则已在 schema 注释里预留。
2. **零声母 `yen/yeng`**：机械 `i→y` 的结果。普通话式 `yin/ying` 会与简拼 `in/ing` 撞车，故未采。
3. **词组库**：按「词中每字只有一个读音」批量折算，多音字词条人工裁音；这一步做完才谈得上句子输入体验。
4. **字频权重**：现在借 `use_preset_vocabulary` 用普通话词频，是临时的。
5. **语法模型**：`.gram` 未建，`contextual_suggestions` 暂关。
6. `reverse_lookup_translator` 在新版 librime 里属旧式写法，先与 wugniu_suwu 保持一致，部署报错再换。

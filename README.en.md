[简体中文](README.md) ｜ [繁體中文](README.zh-Hant.md) ｜ **English** ｜ [日本語](README.ja.md)

> **Android package**: [android-xinganhua](https://github.com/SiqYin/android-xinganhua) bundles both Xi'an Rime schemes inside Fcitx5 for Android, so you can install the app and Rime plugin on your phone and type right away without importing files by hand.

# Xi'an Dialect Input Method · xinganhua-fuvufa

A Rime pinyin input scheme for the Xi'an dialect (Guanzhong subgroup of Central Plains Mandarin). The repository maintains two accents side by side: **urban Xi'an** (`chengqyu`) and **southern-suburb Xi'an** (`nanjiao`). Urban readings come directly from MCPDict's Xi'an table; southern-suburb readings were established character by character with reference to Xi'an, Weinan, Huaxian, and Lintong sound data and checked against native speech.

![Xi'an initials (urban 26; southern 25 — adds rh, no bf, pf)](figures/onsets.en.svg)

![Xi'an finals (urban 39; southern 37 — no uu, iae)](figures/rhymes.en.svg)

- **Schema IDs**: `chengqyu` (urban) and `nanjiao` (southern suburb). The repository name `xinganhua-fuvufa` preserves an earlier spelling of "Xi'an dialect input method" (西 `xi1` 安 `ngan1` 话 `hua4` | 输 `fu1` 入 `vu1` 法 `fa1`).
- **Dictionary size**: 3,649 urban readings (3,346 characters) and 4,594 southern readings (4,065 characters, including 720 additions from Weinan-only and reviewed entries).
- **Phonology overview**: 24 initials and 4 tones (Yinping 31, Yangping 24, Shangsheng 53, Qusheng 55) are shared. Urban Xi'an has 26 initials and 39 finals (`bf`, `pf`, `uu`, `iae`, and `uong`); the southern suburb has 25 initials and 37 finals (`rh`, no `uu`/`iae`, spelling `uong` directly as `ung`).
- **Supported frontends**: Rime clients including Weasel, Squirrel, Trime, and fcitx-rime.
- **Conventions**: Character examples keep the dictionary's traditional glyphs (`鵝`, `軍`, `豬`, `來`, `溫`, etc.) so they match the tables verbatim. Use the top bar to switch between Simplified Chinese, Traditional Chinese, English, and Japanese.

| Schema | Variety | Initials | Finals | Dictionary |
|---|---|---|---|---|
| `chengqyu` | Urban Xi'an | 26 (incl. `bf`, `pf`) | 39 (`uu`, `iae`, `uong`) | `chengqyu.word.dict.yaml` (3,649) |
| `nanjiao` | Southern-suburb Xi'an | 25 (incl. `rh`) | 37 (`ung`) | `nanjiao.word.dict.yaml` (4,594) |

---

## Contents

1. [Overview and design](#s1)
2. [Initials](#s2)
3. [Finals](#s3)
4. [Tones](#s4)
5. [Orthographic notes](#s5)
6. [Comparison with Mandarin pinyin](#s6)
7. [Quick start](#s7)
8. [Input-side abbreviations](#s8)
9. [Dictionary statistics](#s9)
10. [Files and installation](#s10)
11. [Rebuilding and verification](#s11)
12. [Open items](#s12)
13. [Sources and credits](#s13)
14. [License](#s14)

---

<a id="s1"></a>

## 1. Overview and design

The romanisation is called **Xi'an pinyin** and serves both varieties with one unified phonological convention. Each syllable is written as `initial + final + tone digit`, such as `ba1` 巴 and `jyuen1` 軍 (`bfeng4` 中 in urban speech, `zung4` in the southern suburb).

![Syllable structure](figures/syllable.en.svg)

All 392 urban toneless syllables and 420 southern toneless syllables are pairwise distinct. Every spelling maps unambiguously back to a single IPA representation.

---

<a id="s2"></a>

## 2. Initials

Both varieties share 24 initials (23 consonants plus the zero initial). Urban Xi'an retains the labiodental affricates `bf` and `pf` (26 total), while southern Xi'an has the voiced dental sibilant `rh` (25 total). Ordered by place of articulation across six rows plus the zero initial:

- **Labial**: `b [p]`, `p [pʰ]`, `m [m]`, `bf [pf]` (urban), `pf [pfʰ]` (urban), `f [f]`, `v [v]`
- **Alveolar**: `d [t]`, `t [tʰ]`, `n [n]`, `l [l]`
- **Velar**: `g [k]`, `k [kʰ]`, `h [x]`, `ng [ŋ]`
- **Alveolo-palatal**: `j [tɕ]`, `q [tɕʰ]`, `x [ɕ]`
- **Retroflex**: `zh [ʈʂ]`, `ch [ʈʂʰ]`, `sh [ʂ]`, `r [ɻ]`
- **Dental**: `z [ts]`, `c [tsʰ]`, `s [s]`, `rh [z]` (southern)

Distributional rules:

- **Palatalized `n`**: Before narrow finals starting with `i` or `y`, `n` is realised as `[ȵ]` (`你 ni3`, `女 nyu3`); before open or `u`-medial finals it remains `[n]` (`南 nan2`, `挪 nuo2`).
- **Sibilant split**: `z c s` (`[ts tsʰ s]`) combine only with `[ɿ]` and broad finals; narrow `i`/`y` finals always take `j q x` (`[tɕ tɕʰ ɕ]`).
- **Labiodental affricates `bf`, `pf`**: Urban-only before broad or `u`-medial finals (`bfu` 豬, `bfuo` 捉, `bfan` 磚, `pfang` 窗). Southern Xi'an merges them into `z`, `c` with a `u` medial (`zu` 豬, `zuo` 捉, `zuan` 磚, `cuang` 窗).
- **Southern `rh`**: Realised as `[z]`, occurring only before `u`-series finals (`u ua uo uae uei uan uen ung`) where urban speech has `v` (`入 vu1→rhu1`, `若 vuo1→rhuo1`, `軟 van3→rhuan3`, `潤 ven4→rhuen4`).
- **Retroflex `r`**: Combines with 7 broad finals only (`re` 熱, `rao` 饒, `ren` 人, `rou` 揉, `ran` 然, `rang` 瓤, `reng` 扔); characters such as 日 而 兒 耳 二 take zero-initial `er`.
- **Velar nasal `ng`**: Occurs before broad finals only (`nge` 鵝, `ngan` 安, `ngen` 恩, `ngang` 昂, `ngae` 哀, `ngei` 額, `ngao` 熬, `ngou` 歐).
- **`v` vs. `f`**: Contrastive, e.g. `ven` 文 vs. `fen` 分, `va` 襪 vs. `fa` 法.

---

<a id="s3"></a>

## 3. Finals

Urban Xi'an has 39 finals (14 open / 10 `i`-medial / 9 `u`-medial / 6 `ü`-medial), and southern Xi'an has 37 (13 / 9 / 9 / 6; no `uu [ɯ]` or `iae [iæ]`, and `ung [uŋ]` in place of `uong`):

- **Open (14)**: `a [a]`, `e [ɤ]`, `uu [ɯ]` (urban), `i [ɿ]` (`zi ci si rhi`), `i [ʅ]` (`zhi chi shi ri`), `ae [æ]`, `ei [ei]`, `ao [au]`, `ou [ɤu]`, `an [ã]`, `en [ẽ]`, `ang [aŋ]`, `eng [əŋ]`, `er [ɚ]`
- **Medial `i` (10)**: `i [i]`, `ia [ia]`, `ie [iɛ]`, `iae [iæ]` (urban), `iao [iau]`, `iou [iɤu]`, `ian [iã]`, `ien [iɛ̃]`, `iang [iaŋ]`, `ing [iŋ]`
- **Medial `u` (9)**: `u [u]`, `ua [ua]`, `uo [uɤ]`, `uae [uæ]`, `uei [uei]`, `uan [uã]`, `uen [uẽ]`, `uang [uaŋ]`, `uong [uɤŋ]` (urban) / `ung [uŋ]` (southern)
- **Medial `ü` (6)**: `yu [y]`, `yuo [yɤ]`, `yue [yɛ]`, `yuan [yã]`, `yuen [yɛ̃]`, `yung [yŋ]`

Zero-initial spellings:

| Class | Rule | Examples |
|---|---|---|
| Open | no onset letter | `a` 阿, `er` 日, `ae`, `ao`, `an`, `ei`, `en`, `ou`, `ang`, `eng` |
| Medial `i` | `i` → `y` | `yi` 衣, `ya` 丫, `ye` 也, `yae` 涯, `yao` 耀, `you` 有, `yan` 煙, `yen` 音, `yang` 央, `ying` 英 |
| Medial `u` | `u` → `w` | `wu` 烏, `wa` 挖, `wo` 窩, `wae` 外, `wei` 威, `wan` 彎, `wen` 溫, `wang` 汪, `wong` 翁 (urban) / `wung` 翁 (southern) |
| Medial `ü` | keep `yu-` | `yu` 魚, `yuo` 樂, `yue` 月, `yuan` 冤, `yuen` 勻, `yung` 容 |

The `ü`-series keeps `y` even after initials (`jyu` 居, `qyuo` 卻, `xyuen` 熏, `nyu` 女, `lyu` 律). Urban `uu` (`guu` 胳) and `iae` (`jiae` 皆) merge into `e` (`ge`) and `ie` (`jie`) in the southern suburb.

---

<a id="s4"></a>

## 4. Tones

![Xi'an tones](figures/tones.en.svg)

Tone digits `1`–`4` follow the syllable without a space. Historical entering-tone syllables have distributed across all four tones: `立 li1` (Yinping), `白 bei2` (Yangping), `藥 yuo1` (Yinping), `六 liou1` (Yinping), `十 shi2` (Yangping), `大 duo4` (Qusheng).

**Tone sandhi**: Disyllabic tone sandhi affects the first syllable in two cases — two consecutive Yinping syllables (`31-31`) shift the first to Yangping (`24-31`), and two consecutive Shangsheng syllables (`53-53`) shift the first to Yinping (`31-53`).

---

<a id="s5"></a>

## 5. Orthographic notes

1. **Apical vowels**: Both `[ɿ]` (after `z c s rh`) and `[ʅ]` (after `zh ch sh r`) are written `i` (`zi` 指, `chi` 吃), disambiguated by the initial.
2. **Nasalised vs. velar-coda finals**: Finals ending in `-n` (`an en ian ien uan uen yuan yuen`) are nasalised vowels `[ã ẽ iã iɛ̃ uã uẽ yã yɛ̃]` with no alveolar closure; finals ending in `-ng` (`ang eng iang ing uang`, urban `uong` / southern `ung`, `yung`) close with velar `[-ŋ]`. Urban Xi'an keeps a `[ɤ]` glide as `uong [uɤŋ]`, while southern Xi'an pronounces `[uŋ]` directly and spells it `ung`.
3. **Apostrophe boundary**: Insert `'` where concatenation would cause mis-segmentation, notably `xi'ngan1` 西安 (without `'`, `xingan` would split as `xin` + `gan`).
4. **Full spelling in notation**: Dictionaries and canonical citations always keep full toned spellings (`vuo1`, `ying1`, `yung2`); abbreviations and toneless input apply only while typing (see §8).

---

<a id="s6"></a>

## 6. Comparison with Mandarin pinyin

**① Matching letters and values**

The 21 initials `b p m f d t n l g k h z c s zh ch sh r j q x` share Mandarin's letter assignments and aspiration contrasts (`n` takes `[ȵ]` before `i`/`y`). Finals `a i u e er ae ei ao ou ia ie iao ian iang ing ua uo uae uan uang` behave similarly: `巴 ba1`, `天 tian1`, `小 xiao3`, `到 dao4`, `走 zou3`, `家 jia1`, `明 ming2`, `花 hua1`, `快 kuae4`, `光 guang1`, `窩 wo1`, `烏 wu1`, `衣 yi1`, `兒 er2`.

**② Same shape, different phonetic value**

`-n` finals are nasalised vowels (`山 san1`, `人 ren2`, `音 yen1`, `溫 wen1`). Yinping has a low falling `31` contour and Qusheng a high level `55` contour.

**③ Spelled differently from Mandarin**

| Mandarin | Xi'an pinyin | Example | Notes |
|---|---|---|---|
| in | `ien` | 心 `xien1` | full spelling keeps `e`; `in` allowed on input |
| iu | `iou` | 牛 `niou2` | full spelling keeps `o`; `iu` allowed on input |
| ui | `uei` | 回 `huei2` | full spelling keeps `e`; `ui` allowed on input |
| un | `uen` | 溫 `wen1` | zero initial matches Mandarin `wen` |
| ong | urban `uong` / southern `ung` | 東 `duong1` / `dung1` | urban `[uɤŋ]` (`wong`), southern `[uŋ]` (`wung`) |
| iong | `yung` | 容 `yung2` | keeps `y` |
| ü / üe / üan / ün | `yu / yue / yuan / yuen` | 魚 `yu2`, 月 `yue1`, 元 `yuan2`, 軍 `jyuen1` | `y` never dropped |

**④ Urban vs. southern distinctions**

- Urban retains `bf`, `pf` (`豬 bfu1`, `窗 pfang1`) and `uu`, `iae` (`胳 guu1`, `皆 jiae1`), where the south uses `z/c` with a `u` medial (`zu1`, `cuang1`) and `e/ie` (`ge1`, `jie1`).
- Southern Xi'an has `rh` (`入 rhu1`, `若 rhuo1`), corresponding to urban `v` (`vu1`, `vuo1`).

**⑤ Common shifted initials**

| Mandarin | Urban | Southern | Char |
|---|---|---|---|
| shuǐ | `fei3` | `suei3` | 水 |
| shū | `fu1` | `su1` | 書 |
| shuō | `she1` | `she1` | 說 |
| shān / shì | `san1 / si4` | `san1 / si4` | 山 / 是 |
| zhū / chū | `bfu1 / pfu1` | `zu1 / cu1` | 豬 / 出 |
| zhōng / chūn | `bfeng4 / pfen1` | `zung4 / cuen1` | 中 / 春 |
| wén | `ven2` | `ven2` | 文 |
| é / ān | `nge2 / ngan1` | `nge2 / ngan1` | 鵝 / 安 |
| rì | `er1` | `er1` | 日 |
| rù | `vu1` | `rhu1` | 入 |

---

<a id="s7"></a>

## 7. Quick start

| Char | Mandarin | Xi'an | | Char | Mandarin | Xi'an |
|---|---|---|---|---|---|---|
| 我 | wǒ | `nge3` | | 魚 | yú | `yu2` |
| 你 | nǐ | `ni3` | | 軍 | jūn | `jyuen1` |
| 他 | tā | `ta1` | | 東 | dōng | `duong1` |
| 人 | rén | `ren2` | | 心 | xīn | `xien1` |
| 山 | shān | `san1` | | 明 | míng | `ming2` |
| 水 | shuǐ | `fei3` | | 有 | yǒu | `you3` |
| 中 | zhōng | `bfeng4` | | 不 | bù | `bu1` |
| 天 | tiān | `tian1` | | 是 | shì | `si4` |
| 家 | jiā | `jia1` | | 立 | lì | `li1` |
| 日 | rì | `er1` | | 大 | dà | `da4` |

The codes above follow the urban table (`水 suei3`, `中 zung4`, and `東 dung1` in the south). Tone digits are omitted while typing (`ba` offers all tones). Reverse lookup by Mandarin pinyin starts with `` ` `` (e.g. `` `zhong ``, optional trailing `;`). Stroke lookup was removed so `x` and `q` serve normally as initials.

---

<a id="s8"></a>

## 8. Input-side abbreviations

### 8.1 Short spellings (8 in urban · 7 in southern)

Now that the `o` final has merged into `uo`, `uo` may be abbreviated to `o` after an initial and `yuo` to `yo`; meanwhile `ing` and `yung` are full spellings directly. For `uong → ung`: **urban Xi'an pinyin can be simplified this way, whereas `ung` is already the original spelling in the southern suburb** (so `nanjiao` needs no `uong→ung` rule):

| Full | Short | Condition | Examples |
|---|---|---|---|
| `ien` | `in` | after an initial consonant | `jien` 今 → `jin`, `xien` 新 → `xin` |
| `iou` | `iu` | after an initial consonant | `jiou` 究 → `jiu`, `niou` 牛 → `niu` |
| `uo` | `o` | after an initial consonant | `duo` 多 → `do`, `vuo` 勿 → `vo` |
| `uei` | `ui` | after an initial consonant | `huei` 回 → `hui`, `duei` 對 → `dui` |
| `uen` | `un` | after an initial consonant | `suen` 孫 → `sun`, `duen` 墩 → `dun` |
| `uong` | `ung` | **urban only** (after an initial consonant) | urban `duong` 冬 → `dung` (south natively `dung`) |
| `yuo` | `yo` | including zero initial | `yuo` 藥 → `yo`, `jyuo` 覺 → `jyo` |
| `yuen` | `yun` | including zero initial | `yuen` 勻 → `yun`, `jyuen` 軍 → `jyun` |

![Input-side short forms](figures/abbrev.en.svg)

![Southern-suburb variants](figures/variant.en.svg)

**Southern-suburb variants**: Before `u`-series finals, southern `z`, `c`, `s`, `rh` also have retroflex variants `zh`, `ch`, `sh`, `r`, and `sh+u` has an `f` variant. These appear on characters whose urban reading starts with `bf`, `pf`, `f`, or `v`, plus reviewed Weinan-only characters (e.g. 水 `suei3` with variants `shuei3`, `fei3`).

**Disallowed shortcuts**: `you` → `yu` (collides with `魚 yu`), zero-initial `yen`/`wo`/`wei`/`wen` and urban `wong` / southern `wung` (kept full to prevent collisions), and `yue`/`yuan`/`yu`/`yung`.

### 8.2 Tone-free typing

Keys `1`–`9` select candidates in Rime, so `speller/algebra` strips tone digits via `xform/\d//` while preserving them in candidate annotations.

### 8.3 Ambiguity check

Verified via `librime` across all 392 urban and 420 southern syllables: each scheme's abbreviation rules yield **0 cross-syllable ambiguities** and **0 collisions** with full spellings.

---

<a id="s9"></a>

## 9. Dictionary statistics

| Metric | Urban (`chengqyu`) | Southern (`nanjiao`) |
|---|---|---|
| Entries (one reading per line) | 3,649 | 4,594 |
| Distinct characters | 3,346 | 4,065 (incl. 720 added characters) |
| Polyphonic characters | 275 | 428 (256 excluding variants) |
| Tone distribution 1/2/3/4 | 1,149 / 826 / 639 / 1,035 | 1,431 / 1,044 / 842 / 1,271 (plus 6 neutral) |

Every dictionary row follows `char<TAB>syllable+tone`. Noteworthy source doublets include `勻 yen2 / yuen2`, `你 ni1 / ni3`, `不 bu1 / bu2`, `來 lae1 / lae2`, `大 da4 / duo4`, `行 hang2 / hang4 / xing2`. Three characterless (`□`) syllables remain excluded: `zou2`, `tae3`, `sao2`.

---

<a id="s10"></a>

## 10. Files and installation

```
chengqyu.schema.yaml           urban schema (alphabet, abbreviations, ` reverse lookup)
chengqyu.dict.yaml             urban main dictionary
chengqyu.word.dict.yaml        urban character-reading table (generated)
nanjiao.schema.yaml            southern-suburb schema
nanjiao.dict.yaml              southern main dictionary
nanjiao.word.dict.yaml         southern character-reading table (generated)
figures/*.svg                  24 diagrams (6 figures × 4 languages)
tools/ipa2pinyin.mjs           IPA → urban pinyin converter
tools/make_nanjiao_dict.py     southern TSV → nanjiao.word.dict.yaml
tools/make-figures.mjs         SVG figure generator
tools/chengqyu.ipa對照.tsv    urban syllable-to-IPA reference
tools/chengqyu.詳注.tsv       urban character-gloss reference
```

Copy the six `.yaml` files into your Rime user folder (`%APPDATA%\Rime` on Windows, `~/Library/Rime` on macOS, `~/.config/ibus/rime` or `~/.local/share/fcitx5/rime` on Linux), add `chengqyu` and `nanjiao` to `schema_list` in `default.custom.yaml`, and redeploy.

---

<a id="s11"></a>

## 11. Rebuilding and verification

Run `node tools/ipa2pinyin.mjs /path/to/西安.tsv` from the repository root to rebuild the urban dictionary and TSV references, `python tools/make_nanjiao_dict.py` for `nanjiao.word.dict.yaml`, and `node tools/make-figures.mjs` to regenerate all 24 SVGs.

---

<a id="s12"></a>

## 12. Open items

1. **Medial `ü` spelling**: Currently `jyu/qyuo/xyuen/nyu/lyu`; commented compatibility rules for `ju/qu/xu/nü/lü` are ready in both schemas.
2. **Zero-initial `yen`**: Follows `i→y` directly; `yin` is avoided because `in` is the abbreviation for `ien`.
3. **Phrase lexicon and frequency weights**: Currently relies on `use_preset_vocabulary`; a dedicated Xi'an phrase dictionary and `.gram` model are planned once single-character readings stabilize.
4. `reverse_lookup_translator` is kept aligned with `wugniu_suwu` until migration to newer librime syntax is needed.

---

<a id="s13"></a>

## 13. Sources and credits

- [Xi'an table](https://github.com/osfans/MCPDict/blob/master/tools/tables/data/%E8%A5%BF%E5%AE%89.tsv), [Weinan table](https://github.com/osfans/MCPDict/blob/master/tools/tables/data/%E6%B8%AD%E5%8D%97.tsv), [Huaxian table](https://github.com/osfans/MCPDict/blob/master/tools%2Ftables%2Fdata%2F%E5%8D%8E%E5%8E%BF.tsv), and [Lintong table](https://github.com/osfans/MCPDict/blob/master/tools%2Ftables%2Fdata%2F%E4%B8%B4%E6%BD%BC%E6%96%B9%E8%A8%80%E8%AF%AD%E9%9F%B3%E7%A0%94%E7%A9%B6.tsv) from [osfans/MCPDict](https://github.com/osfans/MCPDict) (urban data source and southern references).
- **Southern-suburb data**: No pre-existing table exists; compiled from the four MCPDict tables above alongside Zhihu discussions on suburban sibilant mergers and checked character by character against the author's family pronunciation — offered **for reference only**.
- [wugniu_suwu](https://github.com/SiqYin/wugniu_suwu) and [bepemefeve_flypy](https://github.com/SiqYin/bepemefeve_flypy) for schema structure and figure layout conventions.

---

<a id="s14"></a>

## 14. License

Schema files, figures, and documentation in this repository may be freely used, modified, and redistributed. Underlying reading data follows MCPDict's terms.

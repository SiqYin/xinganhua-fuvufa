// 生成 README 用的六张图，简体 / 繁体 / 英文 / 日文各一套：
//   onsets.svg   声母    rhymes.svg   韵母
//   tones.svg    声调    syllable.svg 音节结构
//   abbrev.svg   简拼对照 variant.svg 南郊音变体
// 用法：node tools/make-figures.mjs [hans|hant|en|ja|all]     默认 all
// 输出：figures/*.svg 共 24 个文件（README 按语言引用）
import fs from 'fs';

const LANGS = ['hans', 'hant', 'en', 'ja'];

const FONT = {
  hans: `'Noto Sans SC','PingFang SC','Microsoft YaHei','Hiragino Sans GB',sans-serif`,
  hant: `'Noto Sans TC','PingFang TC','Microsoft JhengHei','Noto Sans SC',sans-serif`,
  en: `'Noto Sans','Helvetica Neue',Arial,'Noto Sans SC',sans-serif`,
  ja: `'Noto Sans JP','Hiragino Sans','Yu Gothic','Meiryo','Noto Sans SC',sans-serif`,
};

const C = {
  ink: '#1b2a3a', sub: '#6b7b8c', line: '#d8cec6',
  paper: '#FBF7F4',
  cq: { f: '#f7e6e2', s: '#9f363a', dash: true },
  nj: { f: '#e6eef6', s: '#2f5d8c', dash: true },
  blue: '#2f5d8c',
  red: '#9f363a',
  same: { f: '#f1ece7', s: '#bfb2a6' },
  new: { f: '#f7e6e2', s: '#9f363a' },
  diff: { f: '#faf0d2', s: '#d0b45a' },
  plain: { f: '#f1ece7', s: '#bfb2a6' },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const isWide = ch => /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6\u3000-\u303F]/.test(ch);
const tw = (s, size) => [...s].reduce((w, ch) => w + (isWide(ch) ? size : ch === ' ' ? size * 0.3 : size * 0.56), 0);

function wrap(s, maxW, size) {
  const out = [];
  let line = '';
  for (const ch of s) {
    if (line && tw(line + ch, size) > maxW) {
      const cut = line.lastIndexOf(' ');
      if (cut > 0 && !isWide(ch) && !isWide(line[cut - 1])) {
        out.push(line.slice(0, cut));
        line = line.slice(cut + 1) + ch;
      } else {
        out.push(line);
        line = ch;
      }
    } else {
      line += ch;
    }
  }
  if (line) out.push(line);
  return out;
}

// 将音标字段格式化为带方括号形式（上标数字留在 ] 之外，如 n¹ -> [n]¹，uɤŋ/uŋ³ -> [uɤŋ]/[uŋ]³）
function fmtIpa(raw) {
  if (raw.includes('/')) {
    const m = /^(.+?)\/(.+?)([¹²³]?)$/.exec(raw);
    if (m) return `[${m[1]}]/[${m[2]}]${m[3]}`;
  }
  const m = /^(.+?)([¹²³]?)$/.exec(raw);
  return m ? `[${m[1]}]${m[2]}` : `[${raw}]`;
}

// ── 文案 ────────────────────────────────────────────────────
const STR = {
  hans: {
    oTitle: '西安话声母：城区音 26 个、南郊音 25 个（含零声母）',
    oSub: '格内自上而下：拼写 · 国际音标 · 例字；红字城区音、蓝字南郊音',
    oLeg1: '与普通话同字母同音',
    oLeg2: '普通话没有的声母',
    oLegCq: '城区音特有（红虚线）',
    oLegN: '南郊音特有（蓝虚线）',
    oRows: ['唇音', '舌尖中', '舌根', '舌面前', '舌尖后', '舌尖前', '零声母'],
    oZero: '（不标）',
    oFoot: [
      '¹ 音节内 n 与 i、y 起头的细音韵母相拼时音值为 [ȵ]（如 南 nan2 为 [n]，你 ni3、女 nyu3 为 [ȵ]）。',
      'z c s 只接 ɿ 和洪音韵母，细音一律 j q x；r 只配 7 个洪音韵母（日 而 兒 耳 二 读零声母 er）；ng 只配洪音。',
      'bf、pf 为城区音特有：南郊音读 z、c，韵母同时增生 u 介音（中 bfeng4/zung4、窗 pfang1/cuang1）。',
      'rh（[z]）为南郊音特有：城区音读 v（入 vu1→rhu1、若 vuo1→rhuo1、軟 van3→rhuan3、潤 ven4→rhuen4）。',
    ],
    rTitle: '西安话韵母：城区音 39 个、南郊音 37 个',
    rSub: '城区音开 14 / 齐 10 / 合 9 / 撮 6；红字城区音、蓝字南郊音',
    rLeg: ['城区音特有（红虚线）'],
    rGroups: ['开呼 14', '齐呼 10', '合呼 9', '撮呼 6'],
    rFoot: [
      '¹ ɿ 用于 zi ci si rhi；² ʅ 用于 zhi chi shi ri；³ 城区音写作 uong [uɤŋ]（零声母 wong），南郊音写作 ung [uŋ]（零声母 wung）。',
      '-n 尾韵母（an en ian ien uan uen yuan yuen）读鼻化元音 [ã ẽ iã iɛ̃ uã uẽ yã yɛ̃]；-ng 尾韵母收舌根鼻音 [-ŋ]。',
      '撮呼一律带 y，声母后也不省（jyuen 軍、qyuo 卻、nyu 女）；城区音的 uu、iae 在南郊音读 e、ie（胳 guu1→ge1、皆 jiae1→jie1）。',
    ],
    tTitle: '西安话四声：城区音、南郊音相同（五度标记法）',
    tSub: '竖轴 5 最高、1 最低；调号 1/2/3/4 写在音节末尾',
    tNames: ['阴平', '阳平', '上声', '去声'],
    tTag: '调号 {n} · {ex}',
    tFoot: [
      '入声已归并到这四调，归派与普通话不同：立 li1（阴平）、白 bei2（阳平）、藥 yuo1（阴平）、大 duo4（去声）。',
      '四个调号数字分别对应阴平 31、阳平 24、上声 53、去声 55。母语者按本地调值念即可。',
    ],
    tSandhiTitle: '连读变调：变调落在前字',
    tSandhiLead: '西安话的连读变调主要是前字变调，分为两类：',
    tSandhi: [
      ['阴平 + 阴平', '31-31', '24-31', '前一字改读阳平'],
      ['上声 + 上声', '53-53', '31-53', '前一字改读阴平'],
    ],
    sTitle: '音节结构：声母 + 韵母 + 调号（城区音、南郊音结构相同）',
    sSub: '韵母含介音；零声母不写字母，齐呼改 y、合呼改 w、撮呼照写 yu-',
    sHead: ['声母', '韵母', '调号', '例字'],
    sEx: [
      ['ba1', ['b', 'a', '1'], '巴'],
      ['tian1', ['t', 'ian', '1'], '天'],
      ['bfeng4', ['bf', 'eng', '4'], '中（城区音）'],
      ['zung4', ['z', 'ung', '4'], '中（南郊音）'],
      ['rhu1', ['rh', 'u', '1'], '入（南郊音）'],
      ['jyuen1', ['j', 'yuen', '1'], '軍'],
      ['a1', ['—', 'a', '1'], '阿（零声母）'],
      ['you3', ['—', 'you', '3'], '有（零声母 iɤu → you）'],
    ],
    sNoteTitle: '音节边界：撇号',
    sNotes: [
      "两个音节连写会被切错时加 '，与普通话 xi'an 同一个道理。",
      '本方案最典型的例子就是「西安」本身：',
      '',
      "    西 xi1 + 安 ngan1  →  xi'ngan1",
      '',
      '若连写成 xingan，就能被重新切成 xin（心的简拼）+ gan（干），',
      '所以必须加撇号。仓库名 xinganhua-fuvufa 因此去掉了撇号。',
      '输入端可用简拼：ien→in、iou→iu、uo→o、uei→ui、uen→un、yuo→yo、yuen→yun；城区音 uong 也可简打 ung（南郊音本来的拼写就是 ung）。',
    ],
    aTitle: '西安话简拼对照：输入端缩写规则（城区 8 条 · 南郊 7 条）',
    aSub: '格内：全拼 → 简拼；只用于键盘输入，词库与注音仍写全拼',
    vTitle: '南郊音的变体：z c s rh 遇 u 的翘舌变体，shu 还有 f 变体',
    vSub: '每条南郊读音下另列变体（四声相同）；变体只在城区音读 bf、pf、f、v 的字与审定字上加注',
    vHead: ['字', '南郊音', '变体', '城区音'],
    vRows: [
      ['出', 'cu1', 'chu1', 'pfu1'],
      ['住', 'zu4', 'zhu4', 'bfu4'],
      ['書', 'su1', 'shu1 · fu1', 'fu1'],
      ['水', 'suei3', 'shuei3 · fei3', 'fei3'],
      ['入', 'rhu1', 'ru1', 'vu1'],
      ['中', 'zung4', 'zhung4', 'bfeng4'],
    ],
    vFoot: [
      '南郊音 z、c、s、rh 四组声母与 u 相接时，分别存在 zhu、chu、shu、ru 的对应翘舌变体；',
      '其中 sh 与 u 相拼（shu）另有 f 声母变体，如 水 suei3 → shuei3、fei3。',
      '变体与基本读音同调；字表与输入法均保留两读，卡片上以「变体」标出。',
    ],
    aZero: '含零声母',
    aCqOnly: '城区简拼 · 南郊本即 ung',
    aFoot: [
      'uong → ung：城区音中拼音可以这样简化，南郊音本来的拼写就是后者（ung）。',
      '除 yuo→yo、yuen→yun 含零声母外，其余仅限前有辅音声母时简拼（wo、wei、wen、城区 wong 与南郊 wung 保持全拼）。',
    ],
  },

  en: {
    oTitle: 'Xi’an initials: urban 26 · southern 25 (incl. zero initial)',
    oSub: 'Top to bottom: spelling · IPA · example; red = urban, blue = southern',
    oLeg1: 'Same letter and sound as Mandarin',
    oLeg2: 'Not found in Mandarin',
    oLegCq: 'Urban-only (red dashed)',
    oLegN: 'Southern-only (blue dashed)',
    oRows: ['Labial', 'Alveolar', 'Velar', 'Alveolo-palatal', 'Retroflex', 'Dental', 'Zero initial'],
    oZero: '(none)',
    oFoot: [
      '¹ Initial n is realised as [ȵ] before narrow finals starting with i or y (e.g. 南 nan2 [n], 你 ni3 / 女 nyu3 [ȵ]).',
      'z c s take only ɿ and broad finals; narrow (i / y) finals always take j q x. r takes 7 broad finals (日 而 兒 耳 二 take zero initial er); ng takes broad finals only.',
      'bf and pf are urban-only: southern Xi’an reads z and c with a u medial (中 bfeng4/zung4, 窗 pfang1/cuang1).',
      'rh ([z]) is southern-only: the urban reading has v (入 vu1→rhu1, 若 vuo1→rhuo1, 軟 van3→rhuan3, 潤 ven4→rhuen4).',
    ],
    rTitle: 'Xi’an finals: urban 39 · southern 37',
    rSub: 'Urban: 14 open · 10 i-medial · 9 u-medial · 6 ü-medial; red = urban, blue = southern',
    rLeg: ['Urban-only (red dashed)'],
    rGroups: ['Open 14', 'i-medial 10', 'u-medial 9', 'ü-medial 6'],
    rFoot: [
      '¹ ɿ after z c s rh; ² ʅ after zh ch sh r; ³ spelled uong [uɤŋ] (zero-initial wong) in urban Xi’an, and ung [uŋ] (zero-initial wung) in the southern suburb.',
      'Finals written with -n (an en ian ien uan uen yuan yuen) are nasalised vowels [ã ẽ iã iɛ̃ uã uẽ yã yɛ̃]; -ng finals end in [-ŋ].',
      'The ü-series always keeps y, even after an initial (jyuen 軍, qyuo 卻, nyu 女); urban uu and iae are e and ie in the southern suburb.',
    ],
    tTitle: 'The four Xi’an tones, identical in both varieties (five-level pitch scale)',
    tSub: 'Vertical axis: 5 is highest, 1 is lowest; the tone digit 1/2/3/4 follows the syllable',
    tNames: ['Yinping', 'Yangping', 'Shangsheng', 'Qusheng'],
    tTag: 'Tone {n} · {ex}',
    tFoot: [
      'The entering tone has merged into these four, with a different split from Mandarin: 立 li1 (Yinping), 白 bei2 (Yangping), 藥 yuo1 (Yinping), 大 duo4 (Qusheng).',
      'Tone digits 1–4 denote Yinping 31, Yangping 24, Shangsheng 53 and Qusheng 55; speakers simply use their local pitch.',
    ],
    tSandhiTitle: 'Tone sandhi: the change falls on the first syllable',
    tSandhiLead: 'Xi’an tone sandhi mainly alters the first syllable, in two patterns:',
    tSandhi: [
      ['Yinping + Yinping', '31-31', '24-31', 'first syllable becomes Yangping'],
      ['Shangsheng + Shangsheng', '53-53', '31-53', 'first syllable becomes Yinping'],
    ],
    sTitle: 'Syllable structure: initial + final + tone (same structure in both varieties)',
    sSub: 'The final includes the medial; zero initial writes no letter — i→y, u→w, ü→yu-',
    sHead: ['Initial', 'Final', 'Tone', 'Character'],
    sEx: [
      ['ba1', ['b', 'a', '1'], '巴'],
      ['tian1', ['t', 'ian', '1'], '天'],
      ['bfeng4', ['bf', 'eng', '4'], '中 (urban)'],
      ['zung4', ['z', 'ung', '4'], '中 (southern)'],
      ['rhu1', ['rh', 'u', '1'], '入 (southern)'],
      ['jyuen1', ['j', 'yuen', '1'], '軍'],
      ['a1', ['—', 'a', '1'], '阿 (zero initial)'],
      ['you3', ['—', 'you', '3'], '有 (zero initial iɤu → you)'],
    ],
    sNoteTitle: 'Syllable boundary: the apostrophe',
    sNotes: [
      "Insert ' when two syllables written together would split wrongly, as in Mandarin xi'an.",
      'The clearest example is 「西安」 itself:',
      '',
      "    西 xi1 + 安 ngan1  →  xi'ngan1",
      '',
      'Written together, xingan can be re-split into xin (short for 心) + gan (干),',
      'so the apostrophe is required. The repository name therefore drops it.',
      'Input shortcuts: ien→in, iou→iu, uo→o, uei→ui, uen→un, yuo→yo, yuen→yun; urban uong also shortens to ung (native spelling in southern).',
    ],
    aTitle: 'Input-side short forms (8 in urban · 7 in southern)',
    aSub: 'In each cell: full spelling → short form; keyboard input only — dictionary keeps full spelling',
    vTitle: 'Southern-suburb variants: zh ch sh r before u, plus f for shu',
    vSub: 'Variants share the base tone; marked for urban bf/pf/f/v characters and reviewed Weinan-only entries',
    vHead: ['Char', 'Southern', 'Variant', 'Urban'],
    vRows: [
      ['出', 'cu1', 'chu1', 'pfu1'],
      ['住', 'zu4', 'zhu4', 'bfu4'],
      ['書', 'su1', 'shu1 · fu1', 'fu1'],
      ['水', 'suei3', 'shuei3 · fei3', 'fei3'],
      ['入', 'rhu1', 'ru1', 'vu1'],
      ['中', 'zung4', 'zhung4', 'bfeng4'],
    ],
    vFoot: [
      'Where southern z, c, s and rh combine with u, retroflex zh, ch, sh and r variants also exist;',
      'and where sh combines with u (shu) there is also an f variant, e.g. 水 suei3 → shuei3, fei3.',
      'Variants keep the base tone; both forms remain in the table and IME, tagged “variant” on cards.',
    ],
    aZero: 'incl. zero initial',
    aCqOnly: 'urban only · native ung in south',
    aFoot: [
      'uong → ung: urban Xi’an pinyin can be simplified this way, whereas ung is already the original spelling in the southern suburb.',
      'Except yuo→yo and yuen→yun (incl. zero initial), shortcuts apply only after a consonant initial (wo, wei, wen, urban wong, southern wung stay full).',
    ],
  },

  ja: {
    oTitle: '西安方言の声母：城区音 26・南郊音 25（零声母を含む）',
    oSub: '各枠は上から 綴り・国際音声記号・例字。赤字＝城区音、青字＝南郊音',
    oLeg1: '普通話と字も音も同じ',
    oLeg2: '普通話にない声母',
    oLegCq: '城区音のみ（赤破線）',
    oLegN: '南郊音のみ（青破線）',
    oRows: ['唇音', '舌尖中', '舌根', '舌面前', '舌尖後', '舌尖前', '零声母'],
    oZero: '（表記なし）',
    oFoot: [
      '¹ n は i・y で始まる細音の韻母と結合するとき [ȵ] となります（南 nan2 は [n]、你 ni3・女 nyu3 は [ȵ]）。',
      'z c s は ɿ と洪音のみ、細音は必ず j q x。r は洪音 7 種のみ（日 而 兒 耳 二 は零声母 er）、ng も洪音のみ。',
      'bf・pf は城区音特有です。南郊音では z・c となり、韻母に u 介音が加わります（中 bfeng4/zung4、窗 pfang1/cuang1）。',
      'rh（[z]）は南郊音特有です。城区音では v で読みます（入 vu1→rhu1、若 vuo1→rhuo1、軟 van3→rhuan3、潤 ven4→rhuen4）。',
    ],
    rTitle: '西安方言の韻母：城区音 39・南郊音 37',
    rSub: '城区音は開 14 / 斉 10 / 合 9 / 撮 6；赤字＝城区音、青字＝南郊音',
    rLeg: ['城区音のみ（赤破線）'],
    rGroups: ['開口呼 14', '斉歯呼 10', '合口呼 9', '撮口呼 6'],
    rFoot: [
      '¹ ɿ は zi ci si rhi に、² ʅ は zhi chi shi ri に用います；³ 城区音は uong [uɤŋ]（零声母 wong）、南郊音は ung [uŋ]（零声母 wung）と綴ります。',
      '-n で終わる韻母（an en ian ien uan uen yuan yuen）は鼻母音 [ã ẽ iã iɛ̃ uã uẽ yã yɛ̃]、-ng 韻母は [-ŋ] です。',
      '撮口呼はつねに y を保ちます（jyuen 軍、qyuo 卻、nyu 女）。城区音の uu・iae は南郊音で e・ie となります。',
    ],
    tTitle: '西安方言の四声：城区音・南郊音とも同じ（五度式音調表記）',
    tSub: '縦軸は 5 が最高、1 が最低。声調番号 1/2/3/4 は音節の末尾に書きます',
    tNames: ['陰平', '陽平', '上声', '去声'],
    tTag: '声調 {n} · {ex}',
    tFoot: [
      '入声はすでにこの四声に統合され、配分は普通話と異なります：立 li1（陰平）、白 bei2（陽平）、藥 yuo1（陰平）、大 duo4（去声）。',
      '番号 1〜4 は陰平 31・陽平 24・上声 53・去声 55 に対応します。話者は地元の調値で読めば十分です。',
    ],
    tSandhiTitle: '連続変調：変わるのは前の字',
    tSandhiLead: '西安方言の連続変調は主に前の字が変わるもので、二種類あります：',
    tSandhi: [
      ['陰平＋陰平', '31-31', '24-31', '前の字が陽平に変わる'],
      ['上声＋上声', '53-53', '31-53', '前の字が陰平に変わる'],
    ],
    sTitle: '音節の構造：声母＋韻母＋声調番号（城区音・南郊音とも同じ構造）',
    sSub: '韻母は介音を含む。零声母は字母を書かず、斉呼は y、合呼は w、撮呼は yu- のまま',
    sHead: ['声母', '韻母', '声調番号', '例字'],
    sEx: [
      ['ba1', ['b', 'a', '1'], '巴'],
      ['tian1', ['t', 'ian', '1'], '天'],
      ['bfeng4', ['bf', 'eng', '4'], '中（城区音）'],
      ['zung4', ['z', 'ung', '4'], '中（南郊音）'],
      ['rhu1', ['rh', 'u', '1'], '入（南郊音）'],
      ['jyuen1', ['j', 'yuen', '1'], '軍'],
      ['a1', ['—', 'a', '1'], '阿（零声母）'],
      ['you3', ['—', 'you', '3'], '有（零声母 iɤu → you）'],
    ],
    sNoteTitle: '音節の境界：撇号（アポストロフィ）',
    sNotes: [
      "2 音節を続けて書くと切り分けを誤るときに ' を置きます。普通話の xi'an と同じ理屈です。",
      '最も典型的な例が「西安」そのもの：',
      '',
      "    西 xi1 + 安 ngan1  →  xi'ngan1",
      '',
      'xingan と続けて書くと xin（心の簡拼）＋ gan（干）に切り直されてしまうため、',
      '撇号が必要です。リポジトリ名 xinganhua-fuvufa はこの理由で撇号を外しています。',
      '入力側の略式綴り：ien→in、iou→iu、uo→o、uei→ui、uen→un、yuo→yo、yuen→yun。城区音 uong は ung と略せますが、南郊音は元々 ung です。',
    ],
    aTitle: '入力側の略式綴り（城区音 8 種・南郊音 7 種）',
    aSub: '各枠は 全拼 → 略拼。キーボード入力専用で、辞書と表記は全拼のまま',
    vTitle: '南郊音の変体：z c s rh が u と結合するときのそり舌変体、shu には f 変体も',
    vSub: '各南郊音の下に変体も並べます（声調は同じ）。城区音が bf・pf・f・v の字および審定済みの字にのみ付与',
    vHead: ['字', '南郊音', '変体', '城区音'],
    vRows: [
      ['出', 'cu1', 'chu1', 'pfu1'],
      ['住', 'zu4', 'zhu4', 'bfu4'],
      ['書', 'su1', 'shu1 · fu1', 'fu1'],
      ['水', 'suei3', 'shuei3 · fei3', 'fei3'],
      ['入', 'rhu1', 'ru1', 'vu1'],
      ['中', 'zung4', 'zhung4', 'bfeng4'],
    ],
    vFoot: [
      '南郊音の z・c・s・rh の四組の声母が u と結合するとき、zh・ch・sh・r のそり舌の変体もあります。',
      'また sh と u が結合する場合（shu）には f の変体もあり、例：水 suei3 → shuei3、fei3。',
      '変体は基本の読みと同じ声調です。字表と入力方案はいずれも両方を残し、カードでは「変体」と表示します。',
    ],
    aZero: '零声母も可',
    aCqOnly: '城区のみ・南郊は元々 ung',
    aFoot: [
      'uong → ung：城区音のピンインはこのように簡略化できますが、南郊音は本来の綴りそのものが後者（ung）です。',
      'yuo→yo・yuen→yun（零声母を含む）以外は子音声母の後に限ります（wo・wei・wen・城区 wong・南郊 wung は全拼のまま）。',
    ],
  },
};

const S2T = {
  来: '來', 除: '除', 话: '話', 个: '個', 内: '內', 写: '寫', 国: '國', 际: '際', 标: '標', 词: '詞', 库: '庫', 体: '體',
  与: '與', 语: '語', 没: '沒', 双: '雙', 齿: '齒', 后: '後', 细: '細', 韵: '韻', 读: '讀',
  开: '開', 齐: '齊', 为: '爲', 实: '實', 变: '變', 里: '裏', 对: '對', 应: '應', 带: '帶',
  声: '聲', 记: '記', 竖: '豎', 轴: '軸', 调: '調', 号: '號', 节: '節', 阴: '陰', 阳: '陽',
  归: '歸', 并: '併', 这: '這', 数: '數', 构: '構', 边: '邊', 两: '兩', 连: '連', 会: '會',
  错: '錯', 时: '時', 简: '簡', 须: '須', 仓: '倉', 样: '樣', 结: '結',
  区: '區', 虚: '虛', 线: '線', 红: '紅', 蓝: '藍', 计: '計', 猪: '豬',
  条: '條', 缩: '縮', 规: '規', 则: '則', 输: '輸', 键: '鍵', 盘: '盤', 专: '專', 别: '別',
  起: '起', 头: '頭', 值: '值', 仅: '僅', 限: '限', 辅: '輔', 鼻: '鼻', 化: '化', 尾: '尾',
  收: '收', 审: '審', 定: '定', 另: '另', 列: '列', 均: '均', 保: '保', 留: '留', 卡: '卡',
  片: '片', 上: '上', 以: '以', 出: '出', 自: '自', 下: '下', 而: '而', 拼: '拼',
  无: '無', 省: '省', 增: '增', 生: '生', 独: '獨', 有: '有', 其: '其', 他: '他', 余: '餘',
  分: '分', 类: '類', 前: '前', 落: '落', 在: '在', 改: '改', 念: '念', 即: '即', 可: '可',
  按: '按', 本: '本', 地: '地', 者: '者', 末: '末', 入: '入', 派: '派', 同: '同', 不: '不',
  如: '如', 含: '含', 照: '照', 写: '寫', 最: '最', 典: '典', 型: '型', 例: '例',
  就: '就', 是: '是', 本: '本', 身: '身', 若: '若', 能: '能', 被: '被', 重: '重', 新: '新',
  切: '切', 成: '成', 心: '心', 所: '所', 必: '必', 加: '加', 撇: '撇', 因: '因', 此: '此',
  去: '去', 掉: '掉', 端: '端', 用: '用', 仍: '仍', 仅: '僅', 注: '注', 当: '當', 于: '於',
  逢: '逢', 接: '接', 配: '配', 洪: '洪', 零: '零', 满: '滿', 舌: '舌', 尖: '尖', 根: '根',
  面: '面', 唇: '唇', 见: '見', 四: '四', 五: '五', 度: '度', 法: '法', 高: '高', 低: '低',
  每: '每', 遇: '遇', 翘: '翹', 还: '還', 存: '存', 中: '中', 复: '複', 统: '統', 一: '一',
  的: '的', 门: '門', 组: '組', 合: '合', 相: '相', 撮: '撮', 呼: '呼', 介: '介', 元: '元',
  普: '普', 通: '通', 字: '字', 母: '母', 音: '音', 格: '格', 名: '名',
  夹: '夾', 软: '軟', 润: '潤', 几: '幾', 儿: '兒', 乐: '樂', 药: '藥', 军: '軍', 匀: '勻',
  却: '卻', 觉: '覺', 书: '書', 荣: '榮', 容: '容', 乡: '鄉', 归: '歸', 办: '辦', 持: '持',
  只: '只', 干: '干', 吃: '吃', 唇: '唇', 东: '東', 温: '溫', 弯: '彎', 窝: '窩', 乌: '烏',
  鸟: '鳥', 妈: '媽', 爱: '愛', 财: '財', 飞: '飛', 丰: '豐', 义: '義', 门: '門',
};
const s2t = s => [...s].map(ch => S2T[ch] || ch).join('');
const conv = o => Array.isArray(o) ? o.map(conv) : (typeof o === 'object' && o ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, conv(v)])) : (typeof o === 'string' ? s2t(o) : o));
STR.hant = conv(STR.hans);

const svg = (w, h, body, font) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${font}">
<rect width="${w}" height="${h}" fill="${C.paper}"/>
${body}
</svg>
`;

const text = (x, y, s, { size = 13, fill = C.ink, weight = 'normal', anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;

const dashAttr = kind => (kind === 'cq' || kind === 'nj') ? ' stroke-dasharray="4 3"' : '';

function renderCellExamples(x, yBase, ex, njEx, size) {
  if (njEx) {
    return text(x, yBase, ex, { size, fill: C.red })
         + text(x, yBase + 14, njEx, { size, fill: C.blue });
  }
  return text(x, yBase + 5, ex, { size, fill: C.ink });
}

// ── 1. 声母图（按 7/4/4/3/4/4/1 排列） ───────────────────────
const ON = [
  ['唇音', [
    ['b', 'p', '巴 ba1', 'same'],
    ['p', 'pʰ', '朋 peng2', 'same'],
    ['m', 'm', '明 ming2', 'same'],
    ['bf', 'pf', '中 bfeng4', 'cq', 'zung4'],
    ['pf', 'pfʰ', '窗 pfang1', 'cq', 'cuang1'],
    ['f', 'f', '夫 fu1', 'same'],
    ['v', 'v', '文 ven2', 'new'],
  ]],
  ['舌尖中', [
    ['d', 't', '的 di1', 'same'],
    ['t', 'tʰ', '他 ta1', 'same'],
    ['n', 'n¹', '南 nan2', 'same'],
    ['l', 'l', '立 li1', 'same'],
  ]],
  ['舌根', [
    ['g', 'k', '狗 gou3', 'same'],
    ['k', 'kʰ', '口 kou3', 'same'],
    ['h', 'x', '花 hua1', 'same'],
    ['ng', 'ŋ', '安 ngan1', 'new'],
  ]],
  ['舌面前', [
    ['j', 'tɕ', '家 jia1', 'same'],
    ['q', 'tɕʰ', '妻 qi1', 'same'],
    ['x', 'ɕ', '西 xi1', 'same'],
  ]],
  ['舌尖后', [
    ['zh', 'ʈʂ', '張 zhang1', 'same'],
    ['ch', 'ʈʂʰ', '吃 chi1', 'same'],
    ['sh', 'ʂ', '上 shang4', 'same'],
    ['r', 'ɻ', '人 ren2', 'same'],
  ]],
  ['舌尖前', [
    ['z', 'ts', '字 zi4', 'same'],
    ['c', 'tsʰ', '茶 ca2', 'same'],
    ['s', 's', '山 san1', 'same'],
    ['rh', 'z', '入 vu1', 'nj', 'rhu1'],
  ]],
  ['零声母', [
    ['（不标）', 'Ø', '衣 yi1 / 阿 a1', 'same'],
  ]],
];

function figOnsets(T, lang, font) {
  const CW = 104, CH = 68, PAD = 18, ROWH = CH + 10, PER = 7;
  const LX = lang === 'en' ? 114 : lang === 'ja' ? 84 : 80;
  const w = LX + PER * CW + PAD * 2;
  const leg = [
    ['same', T.oLeg1],
    ['new', T.oLeg2],
    ['cq', T.oLegCq],
    ['nj', T.oLegN],
  ];
  let lx = PAD, ly = 66, legRows = 1;
  const legend = [];
  for (const [k, s] of leg) {
    const itemW = 19 + tw(s, 11);
    if (lx > PAD && lx + itemW > w - PAD) { lx = PAD; ly += 20; legRows++; }
    legend.push([k, s, lx, ly]);
    lx += itemW + 22;
  }
  const gridTop = 98 + (legRows - 1) * 20;
  const gridBottom = gridTop + ON.length * ROWH;
  const fl = T.oFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = gridBottom + 24 + (fl.length - 1) * 19 + 16;

  let b = text(PAD, 30, T.oTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.oSub, { size: 12, fill: C.sub });
  legend.forEach(([k, s, x, y]) => {
    b += `<rect x="${x}" y="${y}" width="13" height="13" fill="${C[k].f}" stroke="${C[k].s}"${dashAttr(k)}/>` + text(x + 18, y + 11, s, { size: 11 });
  });
  ON.forEach(([, cells], i) => {
    const y = gridTop + i * ROWH;
    b += text(PAD, y + 39, T.oRows[i], { size: lang === 'en' ? 11.5 : 13, weight: 'bold', fill: C.sub });
    cells.forEach(([lat, ipa, ex, kind, njEx], j) => {
      const x = LX + j * CW, col = C[kind] || C.plain;
      const boxW = (lat === '（不标）') ? Math.max(CW * 1.4, CW - 8) : CW - 8;
      b += `<rect x="${x}" y="${y}" width="${boxW}" height="${CH}" rx="6" fill="${col.f}" stroke="${col.s}"${dashAttr(kind)}/>`;
      b += text(x + 9, y + 20, lat === '（不标）' ? T.oZero : lat, { size: lat === '（不标）' ? 11.5 : 16, weight: 'bold' });
      b += text(x + 9, y + 35, fmtIpa(ipa), { size: 11.5, fill: C.sub });
      b += renderCellExamples(x + 9, y + 49, ex, njEx, 11);
    });
  });
  fl.forEach((s, i) => { b += text(PAD, gridBottom + 24 + i * 19, s, { size: 12, fill: C.sub }); });
  fs.writeFileSync(`figures/onsets.${lang}.svg`, svg(w, h, b, font), { encoding: 'utf8' });
  return `onsets.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行）`;
}

// ── 2. 韵母图（开 14 / 齐 10 / 合 9 / 撮 6） ───────────────────
const RH = [
  ['开呼', [
    ['a', 'a', '巴 ba1'], ['e', 'ɤ', '鵝 nge2'], ['uu', 'ɯ', '胳 guu1', 'cq', 'ge1'],
    ['i', 'ɿ¹', '字 zi4'], ['i', 'ʅ²', '吃 chi1'], ['ae', 'æ', '菜 cae4'],
    ['ei', 'ei', '水 fei3', 'plain', 'suei3'], ['ao', 'au', '到 dao4'], ['ou', 'ɤu', '狗 gou3'],
    ['an', 'ã', '山 san1'], ['en', 'ẽ', '人 ren2'], ['ang', 'aŋ', '上 shang4'],
    ['eng', 'əŋ', '中 bfeng4', 'plain', 'zung4'], ['er', 'ɚ', '兒 er2'],
  ]],
  ['齐呼', [
    ['i', 'i', '衣 yi1'], ['ia', 'ia', '家 jia1'], ['ie', 'iɛ', '姐 jie3'],
    ['iae', 'iæ', '皆 jiae1', 'cq', 'jie1'], ['iao', 'iau', '小 xiao3'], ['iou', 'iɤu', '有 you3'],
    ['ian', 'iã', '煙 yan1'], ['ien', 'iɛ̃', '音 yen1'], ['iang', 'iaŋ', '央 yang1'],
    ['ing', 'iŋ', '英 ying1'],
  ]],
  ['合呼', [
    ['u', 'u', '烏 wu1'], ['ua', 'ua', '花 hua1'], ['uo', 'uɤ', '窩 wo1'],
    ['uae', 'uæ', '快 kuae4'], ['uei', 'uei', '回 huei2'], ['uan', 'uã', '彎 wan1'],
    ['uen', 'uẽ', '溫 wen1'], ['uang', 'uaŋ', '汪 wang1'], ['uong / ung', 'uɤŋ/uŋ³', '東 duong1', 'plain', 'dung1'],
  ]],
  ['撮呼', [
    ['yu', 'y', '魚 yu2'], ['yuo', 'yɤ', '樂 yuo1'], ['yue', 'yɛ', '月 yue1'],
    ['yuan', 'yã', '元 yuan2'], ['yuen', 'yɛ̃', '勻 yuen2'], ['yung', 'yŋ', '容 yung2'],
  ]],
];

function figRhymes(T, lang, font) {
  const CW = 104, CH = 68, PAD = 18, PER = 7;
  const LX = lang === 'en' ? 88 : 74;
  const maxLines = RH.reduce((a, [, c]) => a + Math.ceil(c.length / PER), 0);
  const w = LX + PER * CW + PAD * 2;
  const leg = [['cq', T.rLeg[0]]];
  let lx = PAD, ly = 66, legRows = 1;
  const legend = [];
  for (const [k, s] of leg) {
    const itemW = 19 + tw(s, 11);
    if (lx > PAD && lx + itemW > w - PAD) { lx = PAD; ly += 19; legRows++; }
    legend.push([k, s, lx, ly]);
    lx += itemW + 26;
  }
  const gridTop = 98 + (legRows - 1) * 19;
  const gridBottom = gridTop + maxLines * (CH + 10);
  const fl = T.rFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = gridBottom + 24 + (fl.length - 1) * 19 + 16;

  let b = text(PAD, 30, T.rTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.rSub, { size: 12, fill: C.sub });
  legend.forEach(([k, s, x, y]) => {
    b += `<rect x="${x}" y="${y}" width="13" height="13" fill="${C[k].f}" stroke="${C[k].s}"${dashAttr(k)}/>` + text(x + 19, y + 11, s, { size: 11 });
  });
  let y = gridTop;
  RH.forEach(([, cells], gi) => {
    const lines = Math.ceil(cells.length / PER);
    b += text(PAD, y + 36, T.rGroups[gi], { size: lang === 'en' ? 11.5 : 13, weight: 'bold', fill: C.sub });
    cells.forEach(([lat, ipa, ex, kind, njEx], i) => {
      const cx = LX + (i % PER) * CW, cy = y + Math.floor(i / PER) * (CH + 10), col = C[kind] || C.plain;
      const ipaTxt = fmtIpa(ipa);
      const ipaSize = ipaTxt.length > 9 ? 10 : 11.5;
      const latSize = lat.length > 5 ? 12.5 : 14.5;
      b += `<rect x="${cx}" y="${cy}" width="${CW - 8}" height="${CH}" rx="6" fill="${col.f}" stroke="${col.s}"${dashAttr(kind)}/>`;
      b += text(cx + 9, cy + 20, lat, { size: latSize, weight: 'bold' });
      b += text(cx + 9, cy + 35, ipaTxt, { size: ipaSize, fill: C.sub });
      b += renderCellExamples(cx + 9, cy + 49, ex, njEx, 10.5);
    });
    y += lines * (CH + 10);
  });
  fl.forEach((s, i) => { b += text(PAD, gridBottom + 24 + i * 19, s, { size: 12, fill: C.sub }); });
  fs.writeFileSync(`figures/rhymes.${lang}.svg`, svg(w, h, b, font), { encoding: 'utf8' });
  return `rhymes.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行）`;
}

// ── 3. 声调图（31 / 24 / 53 / 55） ───────────────────────────
const TONES = [
  ['1', '31', [[3, 1]], '巴 ba1'],
  ['2', '24', [[2, 4]], '年 nian2'],
  ['3', '53', [[5, 3]], '小 xiao3'],
  ['4', '55', [[5, 5]], '去 qi4'],
];

function figTones(T, lang, font) {
  const PW = 150, PH = 130, PAD = 24, TOP = 84;
  const w = PAD * 2 + TONES.length * PW;
  const gridBottom = TOP + PH + 46;
  const fl = T.tFoot.flatMap(s => wrap(s, w - PAD * 2, 12));

  const SW = w - PAD * 2;
  const sTop = gridBottom + 22 + fl.length * 19;
  const sRows = T.tSandhi.length;
  const sH = 22 + 24 + 10 + sRows * 30 + 12;
  const h = sTop + sH + 16;

  let b = text(PAD, 30, T.tTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.tSub, { size: 12, fill: C.sub });
  const colors = ['#3f7fd0', '#2fa36b', '#d0703f', '#9a5fc0'];
  TONES.forEach(([num, val, seg, ex], i) => {
    const x0 = PAD + i * PW, gx = x0 + 44, gw = PW - 74, step = gw;
    const yy = lv => TOP + PH - (lv - 1) / 4 * PH;
    for (let lv = 1; lv <= 5; lv++) b += `<line x1="${x0 + 30}" y1="${yy(lv)}" x2="${x0 + PW - 16}" y2="${yy(lv)}" stroke="${C.line}" stroke-dasharray="2 3"/>`;
    b += text(x0 + 22, yy(5) + 4, '5', { size: 10, fill: C.sub, anchor: 'end' });
    b += text(x0 + 22, yy(1) + 4, '1', { size: 10, fill: C.sub, anchor: 'end' });
    seg.forEach(([a, z]) => {
      b += `<line x1="${gx}" y1="${yy(a)}" x2="${gx + step}" y2="${yy(z)}" stroke="${colors[i]}" stroke-width="4" stroke-linecap="round"/>`;
      b += `<circle cx="${gx}" cy="${yy(a)}" r="4" fill="${colors[i]}"/><circle cx="${gx + step}" cy="${yy(z)}" r="4" fill="${colors[i]}"/>`;
    });
    b += text(x0 + PW / 2 - 10, TOP + PH + 26, T.tNames[i] + ' ' + val, { size: 15, weight: 'bold', anchor: 'middle' });
    b += text(x0 + PW / 2 - 10, TOP + PH + 46, T.tTag.replace('{n}', num).replace('{ex}', ex), { size: 12, fill: C.sub, anchor: 'middle' });
  });
  fl.forEach((s, i) => { b += text(PAD, gridBottom + 30 + i * 19, s, { size: 12, fill: C.sub }); });

  b += `<rect x="${PAD}" y="${sTop}" width="${SW}" height="${sH}" rx="8" fill="#fffbe6" stroke="${C.diff.s}"/>`;
  b += text(PAD + 14, sTop + 22, T.tSandhiTitle, { size: 14, weight: 'bold' });
  b += text(PAD + 14, sTop + 44, T.tSandhiLead, { size: 12, fill: C.sub });

  const colX = [PAD + 18 + Math.round(SW * 0.33), PAD + 18 + Math.round(SW * 0.46), PAD + 18 + Math.round(SW * 0.62)];
  const rowsTop = sTop + 56;
  T.tSandhi.forEach(([label, before, after, note], i) => {
    const y = rowsTop + i * 30 + 6;
    b += text(colX[0], y, label, { size: 13, fill: C.sub, anchor: 'end' });
    b += text(colX[1], y, before, { size: 13, fill: C.sub });
    b += text(colX[1] + tw(before, 13) + 10, y, '→', { size: 13, fill: C.sub });
    b += text(colX[2], y, after, { size: 13, weight: 'bold', fill: C.diff.s });
    b += text(colX[2] + tw(after, 13) + 16, y, note, { size: 12, fill: C.sub });
  });

  fs.writeFileSync(`figures/tones.${lang}.svg`, svg(w, h, b, font), { encoding: 'utf8' });
  return `tones.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行 + 连读变调 ${sRows} 条）`;
}

// ── 4. 音节结构图 ────────────────────────────────────────────
function figSyllable(T, lang, font) {
  const EX = T.sEx;
  const CW = [92, 132, 66, 216], PAD = 24, ROWH = 48, TOP = 96, NOTE_W = 330;
  const w = PAD * 2 + CW.reduce((a, c) => a + c, 0) + 24 + NOTE_W;
  const noteLines = T.sNotes.flatMap(s => s ? wrap(s, NOTE_W - 36, 12) : ['']);
  const noteH = 56 + noteLines.length * 19;
  const rowsH = EX.length * ROWH;
  const h = Math.max(TOP + rowsH, TOP - 6 + noteH) + 42;

  let b = text(PAD, 30, T.sTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.sSub, { size: 12, fill: C.sub });
  let x = PAD;
  T.sHead.forEach((t, i) => {
    b += `<rect x="${x}" y="${TOP - 26}" width="${CW[i] - 8}" height="22" rx="4" fill="#eef2f6" stroke="${C.line}"/>`;
    b += text(x + (CW[i] - 8) / 2, TOP - 10, t, { size: 12, fill: C.sub, anchor: 'middle' });
    x += CW[i];
  });
  EX.forEach(([, parts, cn], i) => {
    const y = TOP + i * ROWH;
    let cx = PAD;
    parts.forEach((p, j) => {
      b += `<rect x="${cx}" y="${y}" width="${CW[j] - 8}" height="38" rx="6" fill="${j === 2 ? '#fff4f0' : '#f7fafc'}" stroke="${C.line}"/>`;
      b += text(cx + (CW[j] - 8) / 2, y + 25, p, { size: 15, weight: j === 0 ? 'bold' : 'normal', anchor: 'middle' });
      cx += CW[j];
    });
    b += text(cx + 4, y + 25, cn, { size: 12.5, fill: C.sub });
  });
  const nx = PAD + CW.reduce((a, c) => a + c, 0) + 24, ny = TOP - 6;
  b += `<rect x="${nx}" y="${ny}" width="${NOTE_W}" height="${noteH}" rx="8" fill="#fffbe6" stroke="${C.diff.s}"/>`;
  b += text(nx + 14, ny + 26, T.sNoteTitle, { size: 13.5, weight: 'bold' });
  noteLines.forEach((s, i) => {
    b += text(nx + 18, ny + 50 + i * 19, s, { size: 12, fill: /^\s{2,}/.test(s) ? C.ink : C.sub, weight: /^\s{2,}/.test(s) ? 'bold' : 'normal' });
  });
  fs.writeFileSync(`figures/syllable.${lang}.svg`, svg(w, h, b, font), { encoding: 'utf8' });
  return `syllable.${lang}.svg ${w}x${h}（注释 ${noteLines.length} 行）`;
}

// ── 5. 简拼对照图 ────────────────────────────────────────────
const ABBR = [
  ['ien', 'in'], ['iou', 'iu'], ['uo', 'o'],
  ['uei', 'ui'], ['uen', 'un'], ['uong', 'ung'],
  ['yuo', 'yo'], ['yuen', 'yun'],
];

function figAbbrev(T, lang, font) {
  const CW = 196, CH = 66, PAD = 24, PER = 3, TOP = 84;
  const rows = Math.ceil(ABBR.length / PER);
  const w = PAD * 2 + PER * CW;
  const gridBottom = TOP + rows * (CH + 12);
  const fl = T.aFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = gridBottom + 18 + (fl.length ? 22 + (fl.length - 1) * 19 : 0) + 14;

  let b = text(PAD, 30, T.aTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.aSub, { size: 12, fill: C.sub });
  ABBR.forEach(([full, short], i) => {
    const x = PAD + (i % PER) * CW, y = TOP + Math.floor(i / PER) * (CH + 12);
    const isZero = full === 'yuo' || full === 'yuen';
    b += `<rect x="${x}" y="${y}" width="${CW - 14}" height="${CH}" rx="6" fill="#f7fafc" stroke="${C.line}"/>`;
    b += text(x + (CW - 14) / 2, y + 30, `${full} → ${short}`, { size: 17, weight: 'bold', anchor: 'middle' });
    if (isZero) b += text(x + (CW - 14) / 2, y + 52, T.aZero, { size: 11, fill: C.sub, anchor: 'middle' });
    else if (full === 'uong') b += text(x + (CW - 14) / 2, y + 52, T.aCqOnly, { size: 10.5, fill: C.sub, anchor: 'middle' });
  });
  fl.forEach((s, i) => { b += text(PAD, gridBottom + 22 + i * 19, s, { size: 12, fill: C.sub }); });
  fs.writeFileSync(`figures/abbrev.${lang}.svg`, svg(w, h, b, font), { encoding: 'utf8' });
  return `abbrev.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行）`;
}

// ── 6. 南郊音变体图 ──────────────────────────────────────────
function figVariant(T, lang, font) {
  const PAD = 24, TOP = 88, RH = 44;
  const CW = [68, 150, 218, 132];
  const w = PAD * 2 + CW.reduce((a, c) => a + c, 0);
  const rows = T.vRows.length;
  const tabBottom = TOP + rows * RH;
  const fl = T.vFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = tabBottom + 22 + fl.length * 19 + 16;

  let b = text(PAD, 30, T.vTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.vSub, { size: 12, fill: C.sub });

  let x = PAD;
  T.vHead.forEach((hd, i) => {
    b += text(x + 6, TOP - 10, hd, { size: 12, fill: C.sub, weight: 'bold' });
    x += CW[i];
  });

  T.vRows.forEach((row, r) => {
    const y = TOP + r * RH;
    if (r % 2 === 0) b += `<rect x="${PAD}" y="${y}" width="${w - PAD * 2}" height="${RH}" fill="#f4ece6"/>`;
    let cx = PAD;
    b += text(cx + 6, y + 28, row[0], { size: 19, weight: 'bold' });
    cx += CW[0];
    b += text(cx + 6, y + 28, row[1], { size: 15, fill: C.blue });
    cx += CW[1];
    b += `<rect x="${cx - 2}" y="${y + 8}" width="${CW[2] - 12}" height="${RH - 16}" rx="5" fill="${C.nj.f}" stroke="${C.nj.s}" stroke-dasharray="4 3"/>`;
    b += text(cx + 8, y + 28, row[2], { size: 15, fill: C.nj.s, weight: 'bold' });
    cx += CW[2];
    b += text(cx + 6, y + 28, row[3], { size: 15, fill: C.red });
  });

  fl.forEach((s, i) => { b += text(PAD, tabBottom + 22 + i * 19, s, { size: 12, fill: C.sub }); });
  fs.writeFileSync(`figures/variant.${lang}.svg`, svg(w, h, b, font), { encoding: 'utf8' });
  return `variant.${lang}.svg ${w}x${h}（${rows} 行 + 脚注 ${fl.length} 行）`;
}

// ── 跑 ──────────────────────────────────────────────────────
fs.mkdirSync('figures', { recursive: true });
const want = process.argv[2] || 'all';
for (const lang of LANGS) {
  if (want !== 'all' && want !== lang) continue;
  console.log(figOnsets(STR[lang], lang, FONT[lang]));
  console.log(figRhymes(STR[lang], lang, FONT[lang]));
  console.log(figTones(STR[lang], lang, FONT[lang]));
  console.log(figSyllable(STR[lang], lang, FONT[lang]));
  console.log(figAbbrev(STR[lang], lang, FONT[lang]));
  console.log(figVariant(STR[lang], lang, FONT[lang]));
}

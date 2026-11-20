// 生成 README 用的四张图，简体 / 繁体 / 英文 / 日文各一套：
//   onsets.svg   声母    rhymes.svg   韵母
//   tones.svg    声调    syllable.svg 音节结构
// 用法：node tools/make-figures.mjs [hans|hant|en|ja|all]     默认 all
// 输出：figures/onsets.hans.svg 等 16 个文件（README 按语言引用）
//
// 繁体不手写：hant 由 S2T 字表从 hans 逐字转出；该字表取自 OpenCC 的 s2t，
// 只收本文件里出现过的字（改文案后如出现新字，需补表，见 tools/README-figures 说明）。
import fs from 'fs';

const LANGS = ['hans', 'hant', 'en', 'ja'];

const FONT = {
  hans: `'Noto Sans SC','PingFang SC','Microsoft YaHei','Hiragino Sans GB',sans-serif`,
  hant: `'Noto Sans TC','PingFang TC','Microsoft JhengHei','Noto Sans SC',sans-serif`,
  en: `'Noto Sans','Helvetica Neue',Arial,'Noto Sans SC',sans-serif`,
  ja: `'Noto Sans JP','Hiragino Sans','Yu Gothic','Meiryo','Noto Sans SC',sans-serif`,
};

const C = {
  ink: '#1b2a3a', sub: '#6b7b8c', line: '#c9d4de',
  cq: { f: '#faf1ee', s: '#9f363a', dash: true },   // 城区音特有
  nj: { f: '#eef4fb', s: '#2f5d8c' },                // 南郊音特有
  blue: '#2f5d8c',                                   // 南郊音读音
  red: '#9f363a',                                    // 城区音读音
  same: { f: '#f2f7ff', s: '#8fb6e4' },      // 与普通话同字母同音
  new: { f: '#fff1e0', s: '#e0973c' },       // 普通话没有的声母
  diff: { f: '#fffbe6', s: '#dcc05a' },      // 字母与普通话拼写不同
  nasal: { f: '#eaf7ea', s: '#7fbf7f' },     // 字母相同但音值是鼻化元音
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 简易字宽估算：全角按 1em，拉丁按 0.56em，空格 0.3em。只用于折行，不求精确。
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

// ── 文案 ────────────────────────────────────────────────────
// 例字一律用词库的繁体字形，不随界面语言变；只翻译标签与说明。
const STR = {
  hans: {
    oTitle: '西安话声母：城区音 26 个、南郊音 25 个（含零声母）',
    oSub: '格内三行：拼写 · 国际音标 · 例字；红字城区音、蓝字南郊音',
    oLeg1: '与普通话同字母同音',
    oLeg2: '普通话没有的声母',
    oLegN: '南郊音特有',
    oRows: ['双唇', '唇齿', '舌尖中', '舌尖前', '舌面前', '舌尖后', '舌根', '零声母'],
    oZero: '（不标）',
    oFoot: [
      'z c s 只接 ɿ 和洪音韵母，细音一律 j q x；r 只配 7 个洪音韵母；ng 只配洪音。',
      '「日 而 兒 耳 二」不读 r-，读零声母 er。',
      'bf、pf 为城区音特有：南郊音读 z、c，韵母同时增生 u 介音（中 zuong4、窗 cuang1）。',
      'rh（z）为南郊音特有：城区音读 v（入 vu1→rhu1、軟 van3→rhuan3、潤 ven4→rhuen4）；其余声母两音相同。',
    ],
    rTitle: '西安话韵母：城区音 40 个、南郊音 39 个（开 15 / 齐 10 / 合 9 / 撮 6 为城区音计数）',
    rSub: '格内三行：拼写 · 国际音标 · 例字；红字城区音、蓝字南郊音',
    rLeg: ['与普通话同形同值', '字母同、实为鼻化元音', '拼写与普通话不同', '普通话没有的韵母', '南郊音特有'],
    rGroups: ['开呼 15', '齐呼 10', '合呼 9', '撮呼 6'],
    rFoot: [
      '鼻音韵母 an en ang eng（及各呼变体）在西安话里是鼻化元音，不是普通话那样收 -n / -ng。',
      'uong / yuong 对应普通话的 ong / iong；撮呼一律带 y，声母后也不省（jyuen 軍、nyu 女）。',
      '城区音的 uu、iai 在南郊音读 e、ie（胳 guu1→ge1、皆 jiai1→jie1）；南郊音的 yua（髽 zyua4）为南郊特有；其余韵母两音相同。',
    ],
    tTitle: '西安话四声：城区音、南郊音相同（五度标记法）',
    tSub: '竖轴 5 最高、1 最低；调号 1/2/3/4 写在音节末尾',
    tNames: ['阴平', '阳平', '上声', '去声'],
    tTag: '调号 {n} · {ex}',
    tFoot: [
      '入声已归并到这四调，归派与普通话不同：立 li1（阴平）、白 bei2（阳平）、藥 yuo1（阴平）、大 duo4（去声）。',
      '四个调号数字与普通话的 ā á ǎ à 位置一一对应，但音高走向完全不同，母语者按本地调值念即可。',
    ],
    sTitle: '音节结构：声母 + 韵母 + 调号（城区音、南郊音写法相同）',
    sSub: '韵母含介音；零声母不写字母，齐呼改 y、合呼改 w、撮呼照写 yu-',
    sHead: ['声母', '韵母', '调号', '例字'],
    sEx: [
      ['ba1', ['b', 'a', '1'], '巴'],
      ['tian1', ['t', 'ian', '1'], '天'],
      ['bfeng4', ['bf', 'eng', '4'], '中（城区音）'],
      ['zuong4', ['z', 'uong', '4'], '中（南郊音）'],
      ['rhu1', ['rh', 'u', '1'], '入（南郊音）'],
      ['jyuen1', ['j', 'yuen', '1'], '軍'],
      ['a1', ['—', 'a', '1'], '阿（零声母）'],
      ['you1', ['—', 'you', '1'], '有（零声母 iɤu → you）'],
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
    ],
  },

  en: {
    oTitle: 'Xi’an initials: urban 26 · southern 25',
    oSub: 'Incl. the zero initial. spelling · IPA · example; red = urban, blue = southern',
    oLeg1: 'Same letter and sound as Mandarin',
    oLeg2: 'Not found in Mandarin',
    oLegN: 'Southern suburb only',
    oRows: ['Bilabial', 'Labiodental', 'Alveolar', 'Dental', 'Alveolo-palatal', 'Retroflex', 'Velar', 'Zero initial'],
    oZero: '(none)',
    oFoot: [
      'z c s take only ɿ and broad finals; narrow (i / y) finals always take j q x. bf pf occur only before u-medial or broad finals; r takes 7 broad finals; ng takes broad finals only.',
      '日 而 兒 耳 二 are not read r-; they take the zero initial er.',
      'bf and pf are urban-only: the southern suburb reads z and c with a u medial (中 zuong4, 窗 cuang1).',
      'rh (z) is southern-only: the urban reading has v (入 vu1→rhu1, 軟 van3→rhuan3, 潤 ven4→rhuen4); the other initials are the same in both.',
    ],
    rTitle: 'Xi’an finals: urban 40 · southern 39',
    rSub: 'Open 15 · i-medial 10 · u-medial 9 · ü-medial 6 (urban count); red = urban, blue = southern, dashed = one variety only',
    rLeg: ['Same form and value as Mandarin', 'Same letters, nasalised vowel', 'Spelled differently', 'Not found in Mandarin', 'Southern suburb only'],
    rGroups: ['Open 15', 'i-medial 10', 'u-medial 9', 'ü-medial 6'],
    rFoot: [
      'The nasal finals an en ang eng (and their variants in the other classes) are nasalised vowels, with no -n / -ng coda as in Mandarin.',
      'uong / yuong match Mandarin ong / iong; the ü-series always keeps y, even after an initial (jyuen 軍, nyu 女).',
      'The urban uu and iai are e and ie in the southern suburb (胳 guu1→ge1, 皆 jiai1→jie1); the southern yua (髽 zyua4) is southern-only; the other finals are the same in both.',
    ],
    tTitle: 'The four Xi’an tones, identical in both varieties (five-level pitch scale)',
    tSub: 'Vertical axis: 5 is highest, 1 is lowest; the tone number 1/2/3/4 follows the syllable',
    tNames: ['Yinping', 'Yangping', 'Shangsheng', 'Qusheng'],
    tTag: 'Tone {n} · {ex}',
    tFoot: [
      'The entering tone has merged into these four, with a different split from Mandarin: 立 li1 (Yinping), 白 bei2 (Yangping), 藥 yuo1 (Yinping), 大 duo4 (Qusheng).',
      'Tone numbers 1–4 line up with Mandarin ā á ǎ à, but the pitch contours are entirely different; speakers simply use the local values.',
    ],
    sTitle: 'Syllable structure: initial + final + tone (the same spelling in both varieties)',
    sSub: 'The final includes the medial; the zero initial writes no letter — i becomes y, u becomes w, ü stays yu-',
    sHead: ['Initial', 'Final', 'Tone', 'Character'],
    sEx: [
      ['ba1', ['b', 'a', '1'], '巴'],
      ['tian1', ['t', 'ian', '1'], '天'],
      ['bfeng4', ['bf', 'eng', '4'], '中 (urban)'],
      ['zuong4', ['z', 'uong', '4'], '中 (southern)'],
      ['rhu1', ['rh', 'u', '1'], '入 (southern)'],
      ['jyuen1', ['j', 'yuen', '1'], '軍'],
      ['a1', ['—', 'a', '1'], '阿 (zero initial)'],
      ['you1', ['—', 'you', '1'], '有 (zero initial iɤu → you)'],
    ],
    sNoteTitle: 'Syllable boundary: the apostrophe',
    sNotes: [
      "When two syllables would be split wrongly, insert ', exactly as in Mandarin xi'an.",
      'The clearest example is 「西安」 itself:',
      '',
      "    西 xi1 + 安 ngan1  →  xi'ngan1",
      '',
      'Written together, xingan can be re-split into xin (short for 心) + gan (干),',
      'so the apostrophe is required. The repository name therefore drops it.',
    ],
  },

  ja: {
    oTitle: '西安方言の声母：城区音 26、南郊音 25（零声母を含む）',
    oSub: '各枠は上から 綴り・国際音声記号・例字。赤字＝城区音、青字＝南郊音',
    oLeg1: '普通話と字も音も同じ',
    oLeg2: '普通話にない声母',
    oLegN: '南郊音のみ',
    oRows: ['両唇', '唇歯', '舌尖中', '舌尖前', '舌面前', '舌尖後', '舌根', '零声母'],
    oZero: '（表記なし）',
    oFoot: [
      'z c s は ɿ と洪音の韻母にのみ付き、細音は必ず j q x。bf pf は合口・洪音の前にのみ現れ、r は洪音韻母 7 つと、ng は洪音とのみ結びつきます。',
      '「日 而 兒 耳 二」は r- ではなく、零声母 er で読みます。',
      'bf・pf は城区音特有です。南郊音では z・c となり、韻母に u 介音が加わります（中 zuong4、窗 cuang1）。',
      'rh（z）は南郊音特有です。城区音では v で読みます（入 vu1→rhu1、軟 van3→rhuan3、潤 ven4→rhuen4）。その他の声母は両系統で同じです。',
    ],
    rTitle: '西安方言の韻母：城区音 40、南郊音 39（開 15 / 斉 10 / 合 9 / 撮 6 は城区音の数え方）',
    rSub: '各枠は上から 綴り・国際音声記号・例字。赤字＝城区音、青字＝南郊音',
    rLeg: ['普通話と形も値も同じ', '字は同じで鼻母音', '綴りが普通話と異なる', '普通話にない韻母', '南郊音のみ'],
    rGroups: ['開口呼 15', '斉歯呼 10', '合口呼 9', '撮口呼 6'],
    rFoot: [
      '鼻音韻母 an・en・ang・eng（および各呼の変種）は西安方言では鼻母音で、普通話のように -n / -ng で閉じません。',
      'uong / yuong は普通話の ong / iong に対応します。撮口呼はつねに y を伴い、声母の後でも省略しません（jyuen 軍、nyu 女）。',
      '城区音の uu・iai は南郊音で e・ie（胳 guu1→ge1、皆 jiai1→jie1）。南郊音の yua（髽 zyua4）は南郊音特有です。その他の韻母は両系統で同じです。',
    ],
    tTitle: '西安方言の四声：城区音・南郊音とも同じ（五度式音調表記）',
    tSub: '縦軸は 5 が最高、1 が最低。声調番号 1/2/3/4 は音節の末尾に書きます',
    tNames: ['陰平', '陽平', '上声', '去声'],
    tTag: '声調 {n} · {ex}',
    tFoot: [
      '入声はすでにこの四声に統合され、配分は普通話と異なります：立 li1（陰平）、白 bei2（陽平）、藥 yuo1（陰平）、大 duo4（去声）。',
      '声調番号 1〜4 は普通話の ā á ǎ à と位置が対応しますが、音の高低はまったく異なります。話者は地元の調値で読めば十分です。',
    ],
    sTitle: '音節の構造：声母＋韻母＋声調番号（城区音・南郊音とも同じ書き方）',
    sSub: '韻母は介音を含む。零声母は字母を書かず、斉呼は y、合呼は w、撮呼は yu- のまま',
    sHead: ['声母', '韻母', '声調番号', '例字'],
    sEx: [
      ['ba1', ['b', 'a', '1'], '巴'],
      ['tian1', ['t', 'ian', '1'], '天'],
      ['bfeng4', ['bf', 'eng', '4'], '中（城区音）'],
      ['zuong4', ['z', 'uong', '4'], '中（南郊音）'],
      ['rhu1', ['rh', 'u', '1'], '入（南郊音）'],
      ['jyuen1', ['j', 'yuen', '1'], '軍'],
      ['a1', ['—', 'a', '1'], '阿（零声母）'],
      ['you1', ['—', 'you', '1'], '有（零声母 iɤu → you）'],
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
    ],
  },
};

// ── 繁体：OpenCC s2t 的字表，只收本文件用到的字 ───────────────
// 例外三字按通行繁体保留，不取 OpenCC 的异体：吃（不作喫）、唇（不作脣）、
// 干（此处是字例「干」，不是「幹」）。
const S2T = {
  话: '話', 个: '個', 内: '內', 写: '寫', 国: '國', 际: '際', 标: '標', 词: '詞', 库: '庫', 体: '體',
  与: '與', 语: '語', 没: '沒', 双: '雙', 齿: '齒', 后: '後', 细: '細', 韵: '韻', 读: '讀',
  开: '開', 齐: '齊', 为: '爲', 实: '實', 变: '變', 里: '裏', 对: '對', 应: '應', 带: '帶',
  声: '聲', 记: '記', 竖: '豎', 轴: '軸', 调: '調', 号: '號', 节: '節', 阴: '陰', 阳: '陽',
  归: '歸', 并: '併', 这: '這', 数: '數', 构: '構', 边: '邊', 两: '兩', 连: '連', 会: '會',
  错: '錯', 时: '時', 简: '簡', 须: '須', 仓: '倉', 样: '樣', 结: '結',
  区: '區', 虚: '虛', 线: '線', 红: '紅', 蓝: '藍', 计: '計', 猪: '豬',
};
const s2t = s => [...s].map(ch => S2T[ch] || ch).join('');
const conv = o => Array.isArray(o) ? o.map(conv) : (typeof o === 'object' && o ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, conv(v)])) : (typeof o === 'string' ? s2t(o) : o));

STR.hant = conv(STR.hans);

// ── 画布 ────────────────────────────────────────────────────
const svg = (w, h, body, font) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${font}">
<rect width="${w}" height="${h}" fill="#ffffff"/>
${body}
</svg>
`;

const text = (x, y, s, { size = 13, fill = C.ink, weight = 'normal', anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;

// 例字两读：城区音（红）／南郊音（蓝）；两音相同则只写一个
const dualEx = (x, y, a, b, size) => a && b
  ? `<text x="${x}" y="${y}" font-size="${size}"><tspan fill="${C.red}">${esc(a)}</tspan><tspan fill="#8a8a8a"> / </tspan><tspan fill="${C.blue}">${esc(b)}</tspan></text>`
  : b ? `<text x="${x}" y="${y}" font-size="${size}" fill="${C.blue}">${esc(b)}</text>`
      : text(x, y, a, { size });

const dashAttr = kind => (kind === 'cq' || kind === 'nj') ? ' stroke-dasharray="4 3"' : '';

// ── 1. 声母图 ────────────────────────────────────────────────
const ON = [
  ['双唇', [['b', 'p', '巴 ba1', 'same'], ['p', 'pʰ', '朋 peng2', 'same'], ['m', 'm', '明 mieng2', 'same']]],
  ['唇齿', [['f', 'f', '夫 fu1', 'same'], ['v', 'v', '文 ven2', 'new'], ['bf', 'pf', '中 bfeng4', 'cq', 'zuong4'], ['pf', 'pfʰ', '窗 pfang1', 'cq', 'cuang1']]],
  ['舌尖中', [['d', 't', '的 di1', 'same'], ['t', 'tʰ', '他 ta1', 'same'], ['n', 'n', '你 ni3', 'same'], ['l', 'l', '立 li1', 'same']]],
  ['舌尖前', [['z', 'ʦ', '字 zi4', 'same'], ['c', 'ʦʰ', '茶 ca2', 'same'], ['s', 's', '山 san1', 'same'], ['rh', 'z', '入 vu1', 'nj', 'rhu1']]],
  ['舌面前', [['j', 'ʨ', '家 jia1', 'same'], ['q', 'ʨʰ', '妻 qi1', 'same'], ['x', 'ɕ', '西 xi1', 'same']]],
  ['舌尖后', [['zh', 'tʂ', '站 zan4', 'same'], ['ch', 'tʂʰ', '吃 chi1', 'same'], ['sh', 'ʂ', '上 shang4', 'same'], ['r', 'ʐ', '人 ren2', 'same']]],
  ['舌根', [['g', 'k', '狗 gou3', 'same'], ['k', 'kʰ', '口 kou3', 'same'], ['h', 'x', '花 hua1', 'same'], ['ng', 'ŋ', '安 ngan1', 'new']]],
  ['零声母', [['（不标）', 'Ø', '衣 yi1 / 阿 a1', 'new']]],
];

function figOnsets(T, lang, font) {
  const CW = 150, CH = 58, PAD = 18, ROWH = CH + 8;
  const LX = lang === 'en' ? 122 : lang === 'ja' ? 92 : 86;
  const w = LX + 4 * CW + PAD * 2;
  const gridBottom = 78 + ON.length * ROWH;
  const fl = T.oFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = gridBottom + 40 + (fl.length - 1) * 19 + 16;

  let b = text(PAD, 30, T.oTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.oSub, { size: 12, fill: C.sub });
  b += `<rect x="${w - 250}" y="20" width="14" height="14" fill="${C.same.f}" stroke="${C.same.s}"/>` + text(w - 230, 32, T.oLeg1, { size: 11 });
  b += `<rect x="${w - 250}" y="42" width="14" height="14" fill="${C.new.f}" stroke="${C.new.s}"/>` + text(w - 230, 54, T.oLeg2, { size: 11 });
  b += `<rect x="${w - 250}" y="64" width="14" height="14" fill="${C.nj.f}" stroke="${C.nj.s}" stroke-dasharray="4 3"/>` + text(w - 230, 76, T.oLegN, { size: 11 });
  ON.forEach(([label, cells], i) => {
    const y = 78 + i * ROWH;
    b += text(PAD, y + 34, T.oRows[i], { size: lang === 'en' ? 12 : 13, weight: 'bold', fill: C.sub });
    cells.forEach(([lat, ipa, ex, kind, njEx], j) => {
      const x = LX + j * CW, col = C[kind] || C.new;
      b += `<rect x="${x}" y="${y}" width="${CW - 10}" height="${CH}" rx="6" fill="${col.f}" stroke="${col.s}"${dashAttr(kind)}/>`;
      b += text(x + 12, y + 22, lat === '（不标）' ? T.oZero : lat, { size: lat === '（不标）' ? 12 : 17, weight: 'bold' });
      b += text(x + 12, y + 38, `[${ipa}]`, { size: 12, fill: C.sub });
      b += dualEx(x + 12, y + 53, ex, njEx, 11.5);
    });
  });
  fl.forEach((s, i) => { b += text(PAD, gridBottom + 40 + i * 19, s, { size: 12, fill: C.sub }); });
  fs.writeFileSync(`figures/onsets.${lang}.svg`, svg(w, h, b, font));
  return `onsets.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行）`;
}

// ── 2. 韵母图 ────────────────────────────────────────────────
const RH = [
  ['开呼', [
    ['a', 'a', '巴 ba1', 'same'], ['o', 'o', '若 vo1', 'diff', 'rhuo1'], ['er', 'ɚ', '兒 er2', 'same'],
    ['e', 'ɤ', '鵝 nge2', 'same'], ['uu', 'ɯ', '胳 guu1', 'cq', 'ge1'], ['i', 'ɿ', '字 zi4', 'same'],
    ['i', 'ʅ', '吃 chi1', 'same'], ['ai', 'ai', '菜 cai4', 'same'],
    ['ao', 'au', '到 dao4', 'same'], ['an', 'ã', '山 san1', 'nasal'], ['ei', 'ei', '水 fei3', 'same', 'suei3'],
    ['en', 'ẽ', '人 ren2', 'nasal'], ['ou', 'ɤu', '狗 gou3', 'same'], ['ang', 'ɑɣ̃', '上 shang4', 'nasal'],
    ['eng', 'əɣ̃', '中 bfeng4', 'nasal', 'zuong4']]],
  ['齐呼', [
    ['i', 'i', '衣 yi1', 'same'], ['ia', 'ia', '家 jia1', 'same'], ['ie', 'iɛ', '姐 jie3', 'same'],
    ['iai', 'iai', '皆 jiai1', 'cq', 'jie1'], ['iao', 'iau', '小 xiao3', 'same'], ['ian', 'iã', '煙 yan1', 'nasal'],
    ['ien', 'iẽ', '音 yen1', 'diff'], ['ieng', 'iɣ̃', '英 yeng1', 'diff'], ['iou', 'iɤu', '有 you1', 'diff'],
    ['iang', 'iɑɣ̃', '央 yang1', 'nasal']]],
  ['合呼', [
    ['u', 'u', '烏 wu1', 'same'], ['ua', 'ua', '花 hua1', 'same'], ['uo', 'uɤ', '窩 wo1', 'same'],
    ['uai', 'uai', '快 kuai4', 'same'], ['uan', 'uã', '彎 wan1', 'nasal'], ['uei', 'uei', '回 huei2', 'diff'],
    ['uen', 'uẽ', '溫 wen1', 'diff'], ['uong', 'uoɣ̃', '翁 wong1', 'diff'], ['uang', 'uɑɣ̃', '汪 wang1', 'nasal']]],
  ['撮呼', [
    ['yu', 'y', '魚 yu2', 'diff'], ['yue', 'yɛ', '月 yue1', 'diff'], ['yuo', 'yɤ', '樂 yuo1', 'new'],
    ['yua', 'ya', '', 'nj', '髽 zyua4'],
    ['yuan', 'yã', '元 yuan2', 'diff'], ['yuen', 'yẽ', '勻 yuen2', 'diff'], ['yuong', 'yoɣ̃', '容 yuong2', 'diff']]],
];

function figRhymes(T, lang, font) {
  const CW = 92, CH = 54, PAD = 18, PER = 7;
  const LX = lang === 'en' ? 84 : 70;
  const maxLines = RH.reduce((a, [, c]) => a + Math.ceil(c.length / PER), 0);
  const w = LX + PER * CW + PAD * 2;
  const leg = [['same', T.rLeg[0]], ['nasal', T.rLeg[1]], ['diff', T.rLeg[2]], ['new', T.rLeg[3]], ['nj', T.rLeg[4]]];
  // 图例按行自动流排：英文较长，会占两行，网格跟着下移
  let lx = PAD, ly = 66, legRows = 1;
  const legend = [];
  for (const [k, s] of leg) {
    const itemW = 19 + tw(s, 11);
    if (lx > PAD && lx + itemW > w - PAD) { lx = PAD; ly += 19; legRows++; }
    legend.push([k, s, lx, ly]);
    lx += itemW + 26;
  }
  const gridTop = 104 + (legRows - 1) * 19;
  const gridBottom = gridTop + maxLines * (CH + 10);
  const fl = T.rFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = gridBottom + 40 + (fl.length - 1) * 19 + 14;

  let b = text(PAD, 30, T.rTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.rSub, { size: 12, fill: C.sub });
  legend.forEach(([k, s, x, y]) => {
    b += `<rect x="${x}" y="${y}" width="13" height="13" fill="${C[k].f}" stroke="${C[k].s}"/>` + text(x + 19, y + 11, s, { size: 11 });
  });
  let y = gridTop;
  RH.forEach(([label, cells], gi) => {
    const lines = Math.ceil(cells.length / PER);
    b += text(PAD, y + 30, T.rGroups[gi], { size: lang === 'en' ? 11.5 : 13, weight: 'bold', fill: C.sub });
    cells.forEach(([lat, ipa, ex, kind, njEx], i) => {
      const cx = LX + (i % PER) * CW, cy = y + Math.floor(i / PER) * (CH + 10), col = C[kind] || C.new;
      b += `<rect x="${cx}" y="${cy}" width="${CW - 8}" height="${CH}" rx="6" fill="${col.f}" stroke="${col.s}"${dashAttr(kind)}/>`;
      b += text(cx + 9, cy + 19, lat, { size: 14, weight: 'bold' });
      b += text(cx + 9, cy + 34, `[${ipa}]`, { size: 11, fill: C.sub });
      b += dualEx(cx + 9, cy + 48, ex, njEx, 10.5);
    });
    y += lines * (CH + 10);
  });
  fl.forEach((s, i) => { b += text(PAD, gridBottom + 40 + i * 19, s, { size: 12, fill: C.sub }); });
  fs.writeFileSync(`figures/rhymes.${lang}.svg`, svg(w, h, b, font));
  return `rhymes.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行）`;
}

// ── 3. 声调图 ────────────────────────────────────────────────
const TONES = [['1', '21', [[2, 1]], '巴 ba1'], ['2', '24', [[2, 4]], '年 nian2'], ['3', '53', [[5, 3]], '小 xiao3'], ['4', '44', [[4, 4]], '去 qi4']];

function figTones(T, lang, font) {
  const PW = 150, PH = 130, PAD = 24, TOP = 84;
  const w = PAD * 2 + TONES.length * PW;
  const gridBottom = TOP + PH + 46;
  const fl = T.tFoot.flatMap(s => wrap(s, w - PAD * 2, 12));
  const h = gridBottom + 30 + (fl.length - 1) * 19 + 18;

  let b = text(PAD, 30, T.tTitle, { size: 17, weight: 'bold' });
  b += text(PAD, 52, T.tSub, { size: 12, fill: C.sub });
  const colors = ['#3f7fd0', '#2fa36b', '#d0703f', '#9a5fc0'];
  TONES.forEach(([num, val, seg, ex], i) => {
    const x0 = PAD + i * PW, gx = x0 + 44, gw = PW - 74, step = gw / 1;
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
  fs.writeFileSync(`figures/tones.${lang}.svg`, svg(w, h, b, font));
  return `tones.${lang}.svg ${w}x${h}（脚注 ${fl.length} 行）`;
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
  EX.forEach(([full, parts, cn], i) => {
    const y = TOP + i * ROWH; let cx = PAD;
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
  fs.writeFileSync(`figures/syllable.${lang}.svg`, svg(w, h, b, font));
  return `syllable.${lang}.svg ${w}x${h}（注释 ${noteLines.length} 行）`;
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
}

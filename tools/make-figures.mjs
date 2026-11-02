// 生成 README 用的四张图：onsets.svg（声母）、rhymes.svg（韵母）、tones.svg（声调）、syllable.svg（音节结构）
// 用法：node tools/make-figures.mjs    （在仓库根目录跑，直接覆盖根目录四个 svg）
import fs from 'fs';

const FONT = `'Noto Sans SC','PingFang SC','Microsoft YaHei','Hiragino Sans GB',sans-serif`;
const C = {
  ink: '#1b2a3a', sub: '#6b7b8c', line: '#c9d4de',
  same: { f: '#f2f7ff', s: '#8fb6e4' },      // 与普通话同字母同音
  new: { f: '#fff1e0', s: '#e0973c' },       // 普通话没有的声母
  diff: { f: '#fffbe6', s: '#dcc05a' },      // 字母与普通话拼写不同
  nasal: { f: '#eaf7ea', s: '#7fbf7f' },     // 字母相同但音值是鼻化元音
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${FONT}">
<rect width="${w}" height="${h}" fill="#ffffff"/>
${body}
</svg>
`;
}

const text = (x, y, s, { size = 13, fill = C.ink, weight = 'normal', anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;

// ── 1. 声母图 ────────────────────────────────────────────────
const ON = [
  ['双唇', [['b', 'p', '巴 ba1', 'same'], ['p', 'pʰ', '朋 peng2', 'same'], ['m', 'm', '明 mieng2', 'same']]],
  ['唇齿', [['f', 'f', '夫 fu1', 'same'], ['v', 'v', '文 ven2', 'new'], ['bf', 'pf', '中 bfeng4', 'new'], ['pf', 'pfʰ', '窗 pfang1', 'new']]],
  ['舌尖中', [['d', 't', '的 di1', 'same'], ['t', 'tʰ', '他 ta1', 'same'], ['n', 'n', '你 ni3', 'same'], ['l', 'l', '立 li1', 'same']]],
  ['舌尖前', [['z', 'ʦ', '字 zi4', 'same'], ['c', 'ʦʰ', '茶 ca2', 'same'], ['s', 's', '山 san1', 'same']]],
  ['舌面前', [['j', 'ʨ', '家 jia1', 'same'], ['q', 'ʨʰ', '妻 qi1', 'same'], ['x', 'ɕ', '西 xi1', 'same']]],
  ['舌尖后', [['zh', 'tʂ', '站 zan4', 'same'], ['ch', 'tʂʰ', '吃 chi1', 'same'], ['sh', 'ʂ', '上 shang4', 'same'], ['r', 'ʐ', '人 ren2', 'same']]],
  ['舌根', [['g', 'k', '狗 gou3', 'same'], ['k', 'kʰ', '口 kou3', 'same'], ['h', 'x', '花 hua1', 'same'], ['ng', 'ŋ', '安 ngan1', 'new']]],
  ['零声母', [['（不标）', 'Ø', '衣 yi1 / 阿 a1', 'new']]],
];
{
  const CW = 150, CH = 58, LX = 86, PAD = 18, ROWH = CH + 8;
  const w = LX + 4 * CW + PAD * 2, h = 92 + ON.length * ROWH + 62;
  let b = text(PAD, 30, '西安话声母 26 个（含零声母）', { size: 17, weight: 'bold' });
  b += text(PAD, 52, '格内三行：拼写 · 国际音标 · 例字（例字用词库的繁体字形）', { size: 12, fill: C.sub });
  b += `<rect x="${w - 250}" y="20" width="14" height="14" fill="${C.same.f}" stroke="${C.same.s}"/>` + text(w - 230, 32, '与普通话同字母同音', { size: 11 });
  b += `<rect x="${w - 250}" y="42" width="14" height="14" fill="${C.new.f}" stroke="${C.new.s}"/>` + text(w - 230, 54, '普通话没有的声母', { size: 11 });
  ON.forEach(([label, cells], i) => {
    const y = 78 + i * ROWH;
    b += text(PAD, y + 34, label, { size: 13, weight: 'bold', fill: C.sub });
    cells.forEach(([lat, ipa, ex, kind], j) => {
      const x = LX + j * CW, col = C[kind];
      b += `<rect x="${x}" y="${y}" width="${CW - 10}" height="${CH}" rx="6" fill="${col.f}" stroke="${col.s}"/>`;
      b += text(x + 12, y + 22, lat, { size: 17, weight: 'bold' });
      b += text(x + 12, y + 38, `[${ipa}]`, { size: 12, fill: C.sub });
      b += text(x + 12, y + 53, ex, { size: 11.5 });
    });
  });
  b += text(PAD, h - 34, 'z c s 只接 ɿ 和洪音韵母，细音一律 j q x；r 只配 7 个洪音韵母；ng 只配洪音。', { size: 12, fill: C.sub });
  b += text(PAD, h - 16, '「日 而 兒 耳 二」不读 r-，读零声母 er。', { size: 12, fill: C.sub });
  fs.writeFileSync('onsets.svg', svg(w, h, b));
  console.log('onsets.svg', w + 'x' + h);
}

// ── 2. 韵母图 ────────────────────────────────────────────────
const RH = [
  ['开呼 15', [
    ['a', 'a', '巴 ba1', 'same'], ['o', 'o', '若 vo1', 'diff'], ['er', 'ɚ', '兒 er2', 'same'],
    ['e', 'ɤ', '鵝 nge2', 'same'], ['uu', 'ɯ', '胳 guu1', 'new'], ['i', 'ɿ', '字 zi4', 'same'],
    ['i', 'ʅ', '吃 chi1', 'same'], ['ai', 'ai', '菜 cai4', 'same'],
    ['ao', 'au', '到 dao4', 'same'], ['an', 'ã', '山 san1', 'nasal'], ['ei', 'ei', '水 fei3', 'same'],
    ['en', 'ẽ', '人 ren2', 'nasal'], ['ou', 'ɤu', '狗 gou3', 'same'], ['ang', 'ɑɣ̃', '上 shang4', 'nasal'],
    ['eng', 'əɣ̃', '中 bfeng4', 'nasal']]],
  ['齐呼 10', [
    ['i', 'i', '衣 yi1', 'same'], ['ia', 'ia', '家 jia1', 'same'], ['ie', 'iɛ', '姐 jie3', 'same'],
    ['iai', 'iai', '皆 jiai1', 'new'], ['iao', 'iau', '小 xiao3', 'same'], ['ian', 'iã', '煙 yan1', 'nasal'],
    ['ien', 'iẽ', '音 yen1', 'diff'], ['ieng', 'iɣ̃', '英 yeng1', 'diff'], ['iou', 'iɤu', '有 you1', 'diff'],
    ['iang', 'iɑɣ̃', '央 yang1', 'nasal']]],
  ['合呼 9', [
    ['u', 'u', '烏 wu1', 'same'], ['ua', 'ua', '花 hua1', 'same'], ['uo', 'uɤ', '窩 wo1', 'same'],
    ['uai', 'uai', '快 kuai4', 'same'], ['uan', 'uã', '彎 wan1', 'nasal'], ['uei', 'uei', '回 huei2', 'diff'],
    ['uen', 'uẽ', '溫 wen1', 'diff'], ['uong', 'uoɣ̃', '翁 wong1', 'diff'], ['uang', 'uɑɣ̃', '汪 wang1', 'nasal']]],
  ['撮呼 6', [
    ['yu', 'y', '魚 yu2', 'diff'], ['yue', 'yɛ', '月 yue1', 'diff'], ['yuo', 'yɤ', '樂 yuo1', 'new'],
    ['yuan', 'yã', '元 yuan2', 'diff'], ['yuen', 'yẽ', '勻 yuen2', 'diff'], ['yuong', 'yoɣ̃', '容 yuong2', 'diff']]],
];
{
  const CW = 92, CH = 54, LX = 70, PAD = 18, PER = 7;
  const maxLines = RH.reduce((a, [, c]) => a + Math.ceil(c.length / PER), 0);
  const w = LX + PER * CW + PAD * 2, h = 118 + maxLines * (CH + 10) + 66;
  let b = text(PAD, 30, '西安话韵母 40 个（开 15 / 齐 10 / 合 9 / 撮 6）', { size: 17, weight: 'bold' });
  b += text(PAD, 52, '格内三行：拼写 · 国际音标 · 例字；例字多为零声母形式', { size: 12, fill: C.sub });
  const leg = [['same', '与普通话同形同值'], ['nasal', '字母同、实为鼻化元音'], ['diff', '拼写与普通话不同'], ['new', '普通话没有的韵母']];
  leg.forEach(([k, s], i) => {
    const x = PAD + i * 168;
    b += `<rect x="${x}" y="66" width="13" height="13" fill="${C[k].f}" stroke="${C[k].s}"/>` + text(x + 19, 77, s, { size: 11 });
  });
  let y = 104;
  for (const [label, cells] of RH) {
    const lines = Math.ceil(cells.length / PER);
    b += text(PAD, y + 30, label, { size: 13, weight: 'bold', fill: C.sub });
    cells.forEach(([lat, ipa, ex, kind], i) => {
      const cx = LX + (i % PER) * CW, cy = y + Math.floor(i / PER) * (CH + 10), col = C[kind];
      b += `<rect x="${cx}" y="${cy}" width="${CW - 8}" height="${CH}" rx="6" fill="${col.f}" stroke="${col.s}"/>`;
      b += text(cx + 9, cy + 19, lat, { size: 14, weight: 'bold' });
      b += text(cx + 9, cy + 34, `[${ipa}]`, { size: 11, fill: C.sub });
      b += text(cx + 9, cy + 48, ex, { size: 10.5 });
    });
    y += lines * (CH + 10);
  }
  b += text(PAD, h - 40, '鼻音韵母 an en ang eng（及各呼变体）在西安话里是鼻化元音，不是普通话那样收 -n / -ng。', { size: 12, fill: C.sub });
  b += text(PAD, h - 20, 'uong / yuong 对应普通话的 ong / iong；撮呼一律带 y，声母后也不省（jyuen 軍、nyu 女）。', { size: 12, fill: C.sub });
  fs.writeFileSync('rhymes.svg', svg(w, h, b));
  console.log('rhymes.svg', w + 'x' + h);
}

// ── 3. 声调图 ────────────────────────────────────────────────
const TONES = [['阴平', '21', [[2, 1]], '巴 ba1'], ['阳平', '24', [[2, 4]], '年 nian2'], ['上声', '53', [[5, 3]], '小 xiao3'], ['去声', '44', [[4, 4]], '去 qi4']];
{
  const PW = 150, PH = 130, PAD = 24, TOP = 84;
  const w = PAD * 2 + TONES.length * PW, h = TOP + PH + 104;
  let b = text(PAD, 30, '西安话四声（五度标记法）', { size: 17, weight: 'bold' });
  b += text(PAD, 52, '竖轴 5 最高、1 最低；调号 1/2/3/4 写在音节末尾', { size: 12, fill: C.sub });
  const colors = ['#3f7fd0', '#2fa36b', '#d0703f', '#9a5fc0'];
  TONES.forEach(([name, val, seg, ex], i) => {
    const x0 = PAD + i * PW, gx = x0 + 44, gw = PW - 74, step = gw / 1;
    const yy = lv => TOP + PH - (lv - 1) / 4 * PH;
    for (let lv = 1; lv <= 5; lv++) b += `<line x1="${x0 + 30}" y1="${yy(lv)}" x2="${x0 + PW - 16}" y2="${yy(lv)}" stroke="${C.line}" stroke-dasharray="2 3"/>`;
    b += text(x0 + 22, yy(5) + 4, '5', { size: 10, fill: C.sub, anchor: 'end' });
    b += text(x0 + 22, yy(1) + 4, '1', { size: 10, fill: C.sub, anchor: 'end' });
    seg.forEach(([a, z]) => {
      b += `<line x1="${gx}" y1="${yy(a)}" x2="${gx + step}" y2="${yy(z)}" stroke="${colors[i]}" stroke-width="4" stroke-linecap="round"/>`;
      b += `<circle cx="${gx}" cy="${yy(a)}" r="4" fill="${colors[i]}"/><circle cx="${gx + step}" cy="${yy(z)}" r="4" fill="${colors[i]}"/>`;
    });
    b += text(x0 + PW / 2 - 10, TOP + PH + 26, name + ' ' + val, { size: 15, weight: 'bold', anchor: 'middle' });
    b += text(x0 + PW / 2 - 10, TOP + PH + 46, '调号 ' + (i + 1) + ' · ' + ex, { size: 12, fill: C.sub, anchor: 'middle' });
  });
  b += text(PAD, h - 40, '入声已归并到这四调，归派与普通话不同：立 li1（阴平）、白 bei2（阳平）、藥 yuo1（阴平）、大 duo4（去声）。', { size: 12, fill: C.sub });
  b += text(PAD, h - 20, '四个调号数字与普通话的 ā á ǎ à 位置一一对应，但音高走向完全不同，母语者按本地调值念即可。', { size: 12, fill: C.sub });
  fs.writeFileSync('tones.svg', svg(w, h, b));
  console.log('tones.svg', w + 'x' + h);
}

// ── 4. 音节结构图 ────────────────────────────────────────────
{
  const EX = [
    ['ba1', ['b', 'a', '1'], '巴'],
    ['tian1', ['t', 'ian', '1'], '天'],
    ['bfeng4', ['bf', 'eng', '4'], '中'],
    ['jyuen1', ['j', 'yuen', '1'], '軍'],
    ['a1', ['—', 'a', '1'], '阿（零声母）'],
    ['you1', ['—', 'you', '1'], '有（零声母 iɤu → you）'],
  ];
  const CW = [92, 132, 66, 216], PAD = 24, ROWH = 48, TOP = 96;
  const NOTE_W = 330;
  const w = PAD * 2 + CW.reduce((a, c) => a + c, 0) + 24 + NOTE_W, h = TOP + EX.length * ROWH + 56;
  let b = text(PAD, 30, '音节结构：声母 + 韵母 + 调号', { size: 17, weight: 'bold' });
  b += text(PAD, 52, '韵母含介音；零声母不写字母，齐呼改 y、合呼改 w、撮呼照写 yu-', { size: 12, fill: C.sub });
  let x = PAD;
  ['声母', '韵母', '调号', '例字'].forEach((t, i) => {
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
  b += `<rect x="${nx}" y="${ny}" width="${NOTE_W}" height="${EX.length * ROWH + 8}" rx="8" fill="#fffbe6" stroke="${C.diff.s}"/>`;
  b += text(nx + 14, ny + 26, '音节边界：撇号', { size: 13.5, weight: 'bold' });
  [
    "两个音节连写会被切错时加 '，与普通话",
    "xi'an 同一个道理。本方案最典型的例子就是",
    '「西安」本身：',
    '',
    "    西 xi1 + 安 ngan1  →  xi'ngan1",
    '',
    '若连写成 xingan，就能被重新切成',
    'xin（心的简拼）+ gan（干），所以必须加撇号。',
    '仓库名 xinganhua-fuvufa 因此去掉了撇号。',
  ].forEach((s, i) => b += text(nx + 14, ny + 50 + i * 19, s, { size: 12, fill: i === 4 ? C.ink : C.sub, weight: i === 4 ? 'bold' : 'normal' }));
  fs.writeFileSync('syllable.svg', svg(w, h, b));
  console.log('syllable.svg', w + 'x' + h);
}

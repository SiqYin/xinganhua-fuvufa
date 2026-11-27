// 用法：node tools/ipa2pinyin.mjs <MCPDict 西安.tsv>
// 輸入為 osfans/MCPDict 的國際音標字音表，輸出 Rime 字音表與逐音對照表
// 對照表列：IPA音節 / 調名 / 西安話拼音(全拼) / 聲母 / 韻母 / 轄字
import fs from 'fs';

const n = s => s.normalize('NFD');
const nfc = s => s.normalize('NFC');

const lines = fs.readFileSync(process.argv[2] || '西安.tsv', 'utf8')
  .replace(/^\uFEFF/, '')
  .split(/\r?\n/)
  .filter(l => l.trim() && !l.startsWith('#'))
  .map(l => l.split('\t'));

// 解析舊 MCPDict 源表音標用
const O = ['pfʰ','pʰ','tʂʰ','tʰ','ʦʰ','ʨʰ','kʰ','pf','tʂ','ʦ','ʨ','ʂ','ʐ','ɕ','p','t','k','m','n','ŋ','l','f','v','s','x'].sort((a, b) => b.length - a.length);
const sp = s => {
  for (const o of O) if (s.startsWith(o) && s.length > o.length) return [o, s.slice(o.length)];
  return ['Ø', s];
};

const MR = {
  'p':'b','pʰ':'p','m':'m','f':'f','v':'v','pf':'bf','pfʰ':'pf',
  't':'d','tʰ':'t','n':'n','l':'l',
  'ʦ':'z','ʦʰ':'c','s':'s',
  'ʨ':'j','ʨʰ':'q','ɕ':'x',
  'tʂ':'zh','tʂʰ':'ch','ʂ':'sh','ʐ':'r',
  'k':'g','kʰ':'k','x':'h','ŋ':'ng','Ø':''
};

// 舊源表韻母 IPA → 新西安話拼音韻母（o→uo, iɣ̃→ing, yoɣ̃→yung）
const FR = {
  'a':'a','o':'uo','ɚ':'er','ɤ':'e','ɯ':'uu','ɿ':'i','ʅ':'i',
  'ai':'ae','au':'ao','ã':'an','ei':'ei','ẽ':'en','ɤu':'ou','ɑɣ̃':'ang','əɣ̃':'eng',
  'i':'i','ia':'ia','iɛ':'ie','iai':'iae','iau':'iao','iã':'ian','iẽ':'ien','iɣ̃':'ing','iɤu':'iou','iɑɣ̃':'iang',
  'u':'u','ua':'ua','uɤ':'uo','uai':'uae','uã':'uan','uei':'uei','uẽ':'uen','uoɣ̃':'uong','uɑɣ̃':'uang',
  'y':'yu','yɛ':'yue','yɤ':'yuo','yã':'yuan','yẽ':'yuen','yoɣ̃':'yung'
};
const ZR = {
  'i':'yi','ia':'ya','iɛ':'ye','iai':'yae','iau':'yao','iã':'yan','iẽ':'yen','iɣ̃':'ying','iɤu':'you','iɑɣ̃':'yang',
  'u':'wu','ua':'wa','uɤ':'wo','uai':'wae','uã':'wan','uei':'wei','uẽ':'wen','uoɣ̃':'wong','uɑɣ̃':'wang',
  'y':'yu','yɛ':'yue','yɤ':'yuo','yã':'yuan','yẽ':'yuen','yoɣ̃':'yung'
};

// 新西安話聲母/韻母 → 新國際音標（城區音口徑）
const NEW_INI_IPA = {
  'b':'p','p':'pʰ','m':'m','bf':'pf','pf':'pfʰ','f':'f','v':'v',
  'd':'t','t':'tʰ','n':'n','l':'l',
  'g':'k','k':'kʰ','h':'x','ng':'ŋ',
  'j':'tɕ','q':'tɕʰ','x':'ɕ',
  'zh':'ʈʂ','ch':'ʈʂʰ','sh':'ʂ','r':'ɻ',
  'z':'ts','c':'tsʰ','s':'s','rh':'z','Ø':''
};
const NEW_FIN_IPA = {
  'a':'a','e':'ɤ','uu':'ɯ','ɿ':'ɿ','ʅ':'ʅ',
  'ae':'æ','ei':'ei','ao':'au','ou':'ɤu','an':'ã','en':'ẽ','ang':'aŋ','eng':'əŋ','er':'ɚ',
  'i':'i','ia':'ia','ie':'iɛ','iae':'iæ','iao':'iau','iou':'iɤu','ian':'iã','ien':'iɛ̃','iang':'iaŋ','ing':'iŋ',
  'u':'u','ua':'ua','uo':'uɤ','uae':'uæ','uei':'uei','uan':'uã','uen':'uẽ','uang':'uaŋ','uong':'uɤŋ',
  'yu':'y','yuo':'yɤ','yue':'yɛ','yuan':'yã','yuen':'yɛ̃','yung':'yŋ'
};

const M = {}, F = {}, Z = {};
for (const k in MR) M[n(k)] = MR[k];
for (const k in FR) F[n(k)] = FR[k];
for (const k in ZR) Z[n(k)] = ZR[k];

const TR = {'陰平21':'1','陰平31':'1','陽平24':'2','上聲53':'3','去聲44':'4','去聲55':'4'};
const NEW_TONE_LABEL = {'1':'陰平31','2':'陽平24','3':'上聲53','4':'去聲55'};

// 逗號在 {} 注釋內的不能作分隔；源表另有「餅{~~面}𰻞{~~面}」這種漏逗號的連寫，} 後緊接下一個字時也要切開
function fld(f) {
  const o = [];
  let d = 0, c = '', closed = false;
  for (const ch of f) {
    if (ch === '{') { d++; closed = false; c += ch; continue; }
    if (ch === '}') { d--; closed = true; c += ch; continue; }
    if (d === 0 && ',，'.includes(ch)) { o.push(c.trim()); c = ''; closed = false; continue; }
    if (d === 0 && closed && !/\s/.test(ch)) { o.push(c.trim()); c = ch; closed = false; continue; }
    if (!/\s/.test(ch)) closed = false;
    c += ch;
  }
  o.push(c.trim());
  return o.filter(Boolean);
}

const rows = [];
let unmapped = [];
for (const p of lines) {
  const [idx, s, t, c] = p;
  const [i, f0] = sp(s);
  const f = n(f0);
  const iniPy = i === 'Ø' ? 'Ø' : M[n(i)];
  const finPyRaw = F[f];
  const body = i === 'Ø' ? (Z[f] ?? finPyRaw) : (iniPy + finPyRaw);
  const tone = TR[t];
  if (!body || body.includes('undefined') || !tone) { unmapped.push(`${s}[${t}]`); continue; }

  // 計算新音標：n 拼細音 i/y 時為 ȵ
  let newIniIpa = NEW_INI_IPA[iniPy];
  if (iniPy === 'n' && (finPyRaw.startsWith('i') || finPyRaw.startsWith('y'))) {
    newIniIpa = 'ȵ';
  }
  const newFinIpa = NEW_FIN_IPA[finPyRaw];
  const newIpa = nfc(newIniIpa + newFinIpa);
  const newToneLabel = NEW_TONE_LABEL[tone];

  rows.push({
    s: newIpa,
    origS: s,
    i: newIniIpa || 'Ø',
    f0: nfc(newFinIpa),
    py: body + tone,
    t: newToneLabel,
    tone,
    c
  });
}
console.log('未映射音節:', unmapped.length ? [...new Set(unmapped)] : '无');

const syl = new Map();
for (const r of rows) {
  const k = r.py.slice(0, -1);
  if (!syl.has(k)) syl.set(k, new Set());
  syl.get(k).add(r.s);
}
const clash = [...syl].filter(([, v]) => v.size > 1);
console.log('同形冲突(不同IPA→同一拼写):', clash.length, clash.map(([k, v]) => k + '←' + [...v].join(',')).join(' | '));
console.log('不含调音节', new Set(rows.map(r => r.py.slice(0, -1))).size, '含调音节', new Set(rows.map(r => r.py)).size);

const A = rows.map(r => [r.s, r.t, r.py, r.i, r.f0, [...new Set(fld(r.c).map(e => e.split('{')[0].trim()).filter(x => x && x !== '□'))].join(' ')].join('\t'));
fs.writeFileSync('tools/chengqyu.ipa對照.tsv', '#IPA音节\t调名\t西安话拼音(全拼)\t声母\t韵母\t辖字\n' + A.join('\n') + '\n', { encoding: 'utf8' });

const ent = new Map();
for (const r of rows) {
  for (const e of fld(r.c)) {
    const h = e.split('{')[0].trim();
    if (!h || h === '□') continue;
    for (const ch of h) {
      const k = ch + '\t' + r.py;
      if (!ent.has(k)) ent.set(k, { ch, py: r.py, ipa: r.s, t: r.t, note: e.includes('{') ? e.slice(e.indexOf('{')) : '' });
    }
  }
}
const arr = [...ent.values()].sort((a, b) => a.py !== b.py ? (a.py < b.py ? -1 : 1) : (a.ch < b.ch ? -1 : 1));
const dictHdr = `# Rime dictionary
# encoding: utf-8
#
# 西安話城區音（關中片）字音表
# 來源：osfans/MCPDict《西安》數據表（IPA → 西安話拼音全拼 + 調號 1/2/3/4）
# 本表由 tools/ipa2pinyin.mjs 生成，勿手改；要改轉寫規則請改腳本
# 字音條目 ${arr.length} 條；注音一律全拼，簡拼只在方案 speller/algebra 裏衍生
---
name: chengqyu.word
version: "1.1.13"
sort: by_weight
use_preset_vocabulary: true
...

`;
fs.writeFileSync('chengqyu.word.dict.yaml', dictHdr + arr.map(o => o.ch + '\t' + o.py).join('\n') + '\n', { encoding: 'utf8' });
fs.writeFileSync('tools/chengqyu.詳注.tsv', '#字\t西安话拼音(全拼+调号)\t原IPA[调名]\t原文件释注\n' + arr.map(o => [o.ch, o.py, o.ipa + '[' + o.t + ']', o.note].filter(Boolean).join('\t')).join('\n') + '\n', { encoding: 'utf8' });
const perChar = new Map();
for (const o of arr) perChar.set(o.ch, (perChar.get(o.ch) || 0) + 1);
console.log('字音条目', arr.length, '不同字', perChar.size, '多音字', [...perChar.values()].filter(n => n > 1).length);

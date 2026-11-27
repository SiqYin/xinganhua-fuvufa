#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把南郊音字表折成 Rime 字音表 nanjiao.word.dict.yaml。

用法：python tools/make_nanjiao_dict.py [南郊音字表.tsv]
默认读上一级归档目录的 南郊音字表.tsv；表由 tools_南郊/build_nanjiao.py 生成。
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "南郊音字表.tsv"
OUT = ROOT / "nanjiao.word.dict.yaml"

HEAD = """# Rime dictionary
# encoding: utf-8
#
# 西安話南郊音（關中片）字音表
# 來源：南郊音字表（2026-11-20 重建：南郊裁定表 1883 字 + 兩地一致讀音，套西安話音標折出）
# 本表由 tools/make_nanjiao_dict.py 生成，勿手改；要改讀音請改南郊音字表
# 2026-11-21 起含「變體」讀音：南郊 z/c/s/rh 遇 u 另有 zh/ch/sh/r 翹舌變體，shu 另有 f 變體
# （城區音讀 bf/pf/f/v 的字與逐字審定的渭南獨有字加註；變體與基本讀音同調）
# 字音條目 {n} 條；注音一律全拼，簡拼只在方案 speller/algebra 裏衍生
---
name: nanjiao.word
version: "1.1.12"
sort: by_weight
use_preset_vocabulary: true
...

"""


def main() -> None:
    rows = []
    for line in SRC.read_text(encoding="utf-8").splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        ch, py = line.split("\t")[:2]
        rows.append((ch, py))
    rows = sorted(set(rows), key=lambda x: (x[1], x[0]))
    # newline="\n"：Windows 上預設會把 \n 翻成 CRLF，破壞 .gitattributes 的 eol=lf 約定
    OUT.write_text(HEAD.format(n=len(rows)) + "".join(f"{c}\t{p}\n" for c, p in rows),
                   encoding="utf-8", newline="\n")
    print(f"nanjiao.word.dict.yaml：{len(rows)} 條")


if __name__ == "__main__":
    main()

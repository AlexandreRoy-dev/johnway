#!/usr/bin/env python3
"""Export logo PNGs from official SVG wordmarks."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
OUTPUT = ROOT / "public" / "images"
WIDTH = 1600

SVG_FILES = [
    "johnway-logo-dark.svg",
    "johnway-logo-light.svg",
]


def export_png(svg_path: Path, png_path: Path) -> None:
    png_path.parent.mkdir(parents=True, exist_ok=True)
    png_bytes = cairosvg.svg2png(
        bytestring=svg_path.read_bytes(),
        output_width=WIDTH,
    )
    png_path.write_bytes(png_bytes)
    bbox = Image.open(BytesIO(png_bytes)).getbbox()
    print(f"Wrote {png_path.relative_to(ROOT)} ({bbox})")


def main() -> None:
    for name in SVG_FILES:
        export_png(BRAND / name, OUTPUT / name.replace(".svg", ".png"))


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
from fpdf import FPDF

OUTPUT = "/workspace/public/johnway-palette-couleurs.pdf"

BRAND = [
    ("Vert forêt", "forest", "#1F5C3A", "Couleur primaire, titres, liens"),
    ("Vert forêt vif", "forest-bright", "#2F8F55", "Accent, boutons, point du logo"),
    ("Vert forêt profond", "forest-deep", "#0F3322", "Bandeaux, témoignages, dégradés"),
    ("Chocolat", "chocolate", "#4A2C1A", "Brun secondaire, textes"),
    ("Chocolat profond", "chocolate-deep", "#1A100C", "Fonds sombres (header, hero, footer)"),
    ("Beige", "beige", "#F4EBCF", "Texte sur fonds sombres, logo clair"),
    ("Crème", "cream", "#F8F3E6", "Fond principal du site"),
    ("Or", "gold", "#C4A574", "Accents dorés, étiquettes"),
    ("Brun Winslow", "winslow-brown", "#261A10", "Brun très foncé (sidebar)"),
]

LOGO = [
    ("Lettres logo (fond clair)", "#2D2D2D", "johnway-logo-dark.svg"),
    ("Lettres logo (fond sombre)", "#F4EBCF", "johnway-logo-light.svg"),
    ("Point vert du logo", "#2F8F55", "Point après « JOHNWAY »"),
]

UI = [
    ("Fond de page", "background", "#F8F3E6", "Arrière-plan général (= crème)"),
    ("Texte principal", "foreground", "#1A100C", "Corps de texte (= chocolat profond)"),
    ("Carte / panneau", "card", "#FAF6EC", "Fiches produits, formulaires"),
    ("Texte atténué", "muted-foreground", "#6B5344", "Descriptions, sous-textes"),
    ("Fond atténué", "muted", "#EFE6D0", "Zones secondaires"),
    ("Bordure / champ", "border", "#E0D4B8", "Contours, champs de formulaire"),
    ("Erreur", "destructive", "#9F2D20", "Messages d'erreur"),
]


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def text_color_for_bg(r: int, g: int, b: int) -> tuple[int, int, int]:
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    return (255, 255, 255) if luminance < 150 else (26, 16, 12)


class PalettePDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(107, 83, 68)
        self.cell(0, 8, "Johnway · Palette de couleurs", align="R", new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(107, 83, 68)
        self.cell(0, 8, f"Page {self.page_no()}", align="C")

    def cover(self):
        self.add_page()
        self.set_fill_color(26, 16, 12)
        self.rect(0, 0, 210, 297, style="F")
        self.set_y(70)
        self.set_font("Helvetica", "B", 36)
        self.set_text_color(244, 235, 207)
        self.cell(0, 16, "JOHNWAY.", align="C", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 14)
        self.set_text_color(47, 143, 85)
        self.cell(0, 10, "Palette de couleurs", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(8)
        self.set_text_color(244, 235, 207)
        self.set_font("Helvetica", "", 11)
        self.multi_cell(0, 6, "Charte chromatique du site johnway.ca\nBeige, brun, vert forêt, neutres chocolat.", align="C")
        self.ln(20)
        swatches = ["#1F5C3A", "#2F8F55", "#F4EBCF", "#4A2C1A", "#C4A574"]
        x = 35
        for color in swatches:
            r, g, b = hex_rgb(color)
            self.set_fill_color(r, g, b)
            self.rect(x, 160, 28, 28, style="F")
            x += 32

    def section_title(self, title: str):
        self.ln(4)
        self.set_font("Helvetica", "B", 16)
        self.set_text_color(26, 16, 12)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(224, 212, 184)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def color_table(self, rows: list[tuple], include_token: bool = True):
        col_swatch = 18
        col_name = 42 if include_token else 52
        col_hex = 24
        col_token = 28 if include_token else 0
        col_usage = 88 if include_token else 116

        self.set_font("Helvetica", "B", 9)
        self.set_fill_color(239, 230, 208)
        self.set_text_color(26, 16, 12)
        headers = ["", "Nom (FR)", "Hex"]
        widths = [col_swatch, col_name, col_hex]
        if include_token:
            headers.append("Token CSS")
            widths.append(col_token)
        headers.append("Usage")
        widths.append(col_usage)

        for header, width in zip(headers, widths):
            self.cell(width, 8, header, border=1, fill=True)
        self.ln()

        self.set_font("Helvetica", "", 9)
        for row in rows:
            if include_token:
                name, token, hex_val, usage = row
            else:
                name, hex_val, usage = row
                token = ""

            r, g, b = hex_rgb(hex_val)
            y = self.get_y()
            if y > 260:
                self.add_page()
                y = self.get_y()

            self.set_fill_color(r, g, b)
            self.cell(col_swatch, 12, "", border=1, fill=True)

            tr, tg, tb = text_color_for_bg(r, g, b)
            self.set_text_color(26, 16, 12)
            self.cell(col_name, 12, name, border=1)
            self.cell(col_hex, 12, hex_val.upper(), border=1)
            if include_token:
                self.cell(col_token, 12, token, border=1)
            self.cell(col_usage, 12, usage, border=1)
            self.ln()


pdf = PalettePDF()
pdf.set_auto_page_break(auto=True, margin=18)
pdf.cover()
pdf.add_page()
pdf.section_title("Couleurs de marque")
pdf.color_table(BRAND, include_token=True)
pdf.section_title("Logo")
pdf.color_table(LOGO, include_token=False)
pdf.section_title("Couleurs d'interface")
pdf.color_table(UI, include_token=True)

pdf.ln(6)
pdf.set_font("Helvetica", "B", 11)
pdf.set_text_color(26, 16, 12)
pdf.cell(0, 8, "Résumé rapide", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("Helvetica", "", 10)
for line in [
    "Vert forêt        #1F5C3A",
    "Vert forêt vif    #2F8F55",
    "Vert forêt profond #0F3322",
    "Chocolat          #4A2C1A",
    "Chocolat profond  #1A100C",
    "Beige             #F4EBCF",
    "Crème             #F8F3E6",
    "Or                #C4A574",
    "Brun Winslow      #261A10",
    "Logo sombre       #2D2D2D",
]:
    pdf.cell(0, 6, line, new_x="LMARGIN", new_y="NEXT")

pdf.output(OUTPUT)
print(f"Wrote {OUTPUT}")

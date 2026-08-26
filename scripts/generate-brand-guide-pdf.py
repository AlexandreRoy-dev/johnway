#!/usr/bin/env python3
"""Generate the full Johnway brand guide PDF (image de marque)."""

from __future__ import annotations

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
FONTS = Path(__file__).resolve().parent / "fonts"
OUTPUT = ROOT / "public" / "johnway-guide-image-de-marque.pdf"

LOGO_DARK = ROOT / "public" / "images" / "johnway-logo-dark.png"
LOGO_LIGHT = ROOT / "public" / "images" / "johnway-logo-light.png"
TRUCK_MOCKUP = ROOT / "public" / "images" / "johnway-white-truck-mockup.png"

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

LOGO_COLORS = [
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

TOC = [
    ("01", "Positionnement"),
    ("02", "Logo"),
    ("03", "Couleurs"),
    ("04", "Typographie"),
    ("05", "Ton et rédaction"),
    ("06", "Applications"),
    ("07", "Contact"),
]


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def text_color_for_bg(r: int, g: int, b: int) -> tuple[int, int, int]:
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    return (255, 255, 255) if luminance < 150 else (26, 16, 12)


class BrandGuidePDF(FPDF):
    def __init__(self) -> None:
        super().__init__()
        self.register_fonts()

    def register_fonts(self) -> None:
        self.add_font("Barlow", "", str(FONTS / "BarlowCondensed-SemiBold.ttf"))
        self.add_font("Barlow", "B", str(FONTS / "BarlowCondensed-Bold.ttf"))
        self.add_font("Work", "", str(FONTS / "WorkSans-Regular.ttf"))
        self.add_font("Work", "B", str(FONTS / "WorkSans-Regular.ttf"))
        self.add_font("Fraunces", "", str(FONTS / "Fraunces-Regular.ttf"))
        self.add_font("Fraunces", "I", str(FONTS / "Fraunces-Italic.ttf"))

    def header(self) -> None:
        if self.page_no() <= 2:
            return
        self.set_font("Work", "", 8)
        self.set_text_color(107, 83, 68)
        self.cell(0, 8, "Johnway · Guide d'image de marque", align="R", new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def footer(self) -> None:
        self.set_y(-12)
        self.set_font("Work", "", 8)
        self.set_text_color(107, 83, 68)
        self.cell(0, 8, f"Page {self.page_no()}", align="C")

    def cover(self) -> None:
        self.add_page()
        self.set_fill_color(26, 16, 12)
        self.rect(0, 0, 210, 297, style="F")

        if LOGO_LIGHT.exists():
            self.image(str(LOGO_LIGHT), x=55, y=48, w=100)

        self.set_y(118)
        self.set_font("Barlow", "B", 14)
        self.set_text_color(47, 143, 85)
        self.cell(0, 10, "GUIDE D'IMAGE DE MARQUE", align="C", new_x="LMARGIN", new_y="NEXT")

        self.set_font("Work", "", 12)
        self.set_text_color(244, 235, 207)
        self.ln(6)
        self.multi_cell(
            0,
            7,
            "Événementiel clé en main\nEstrie · Québec · johnway.ca",
            align="C",
        )

        self.ln(16)
        swatches = ["#1F5C3A", "#2F8F55", "#F4EBCF", "#4A2C1A", "#C4A574"]
        x = 35
        for color in swatches:
            r, g, b = hex_rgb(color)
            self.set_fill_color(r, g, b)
            self.rect(x, 175, 28, 28, style="F")
            x += 32

        self.set_y(230)
        self.set_font("Work", "", 9)
        self.set_text_color(196, 165, 116)
        self.cell(0, 6, "Version 1.0 · Août 2026", align="C")

    def toc_page(self) -> None:
        self.add_page()
        self.set_fill_color(248, 243, 230)
        self.rect(0, 0, 210, 297, style="F")

        self.set_y(28)
        self.set_font("Barlow", "B", 28)
        self.set_text_color(26, 16, 12)
        self.cell(0, 12, "SOMMAIRE", new_x="LMARGIN", new_y="NEXT")
        self.ln(10)

        for num, title in TOC:
            self.set_font("Barlow", "B", 36)
            self.set_text_color(47, 143, 85)
            self.cell(22, 14, num)
            self.set_font("Barlow", "B", 20)
            self.set_text_color(26, 16, 12)
            self.cell(0, 14, title, new_x="LMARGIN", new_y="NEXT")
            self.set_draw_color(224, 212, 184)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(4)

        self.ln(8)
        self.set_font("Work", "", 10)
        self.set_text_color(74, 44, 26)
        self.multi_cell(
            0,
            6,
            "Ce document décrit l'identité visuelle et verbale de Johnway : "
            "positionnement, logo, couleurs, typographies, ton rédactionnel et "
            "applications. Il s'appuie sur le site johnway.ca et les fichiers "
            "de marque du dépôt public.",
        )

    def section_cover(self, num: str, title: str, subtitle: str) -> None:
        self.add_page()
        self.set_fill_color(15, 51, 34)
        self.rect(0, 0, 210, 70, style="F")
        self.set_y(22)
        self.set_font("Barlow", "B", 48)
        self.set_text_color(47, 143, 85)
        self.cell(0, 16, num, new_x="LMARGIN", new_y="NEXT")
        self.set_font("Barlow", "B", 26)
        self.set_text_color(244, 235, 207)
        self.cell(0, 12, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_y(82)
        self.set_font("Work", "", 11)
        self.set_text_color(74, 44, 26)
        self.multi_cell(0, 6, subtitle)

    def section_title(self, title: str) -> None:
        self.ln(2)
        self.set_font("Barlow", "B", 15)
        self.set_text_color(26, 16, 12)
        self.cell(0, 9, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(224, 212, 184)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)

    def body(self, text: str, size: int = 10) -> None:
        self.set_font("Work", "", size)
        self.set_text_color(26, 16, 12)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def label(self, text: str) -> None:
        self.set_font("Barlow", "B", 8)
        self.set_text_color(31, 92, 58)
        self.cell(0, 5, text.upper(), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def bullet_list(self, items: list[str], size: int = 10) -> None:
        self.set_font("Work", "", size)
        self.set_text_color(26, 16, 12)
        width = self.w - self.l_margin - self.r_margin
        for item in items:
            self.multi_cell(width, 5.5, f"- {item}")
        self.ln(2)

    def two_column_do_dont(
        self,
        do_title: str,
        do_items: list[str],
        dont_title: str,
        dont_items: list[str],
    ) -> None:
        y_start = self.get_y()
        col_w = 92

        self.set_xy(10, y_start)
        self.set_fill_color(239, 246, 241)
        self.rect(10, y_start, col_w, 6 + len(do_items) * 7 + 8, style="F")
        self.set_font("Barlow", "B", 10)
        self.set_text_color(31, 92, 58)
        self.cell(col_w, 7, do_title, new_x="LMARGIN", new_y="NEXT")
        self.set_x(12)
        self.set_font("Work", "", 9)
        self.set_text_color(26, 16, 12)
        for item in do_items:
            self.set_x(12)
            self.multi_cell(col_w - 4, 5, f"+ {item}")

        y_end_do = self.get_y()

        self.set_xy(108, y_start)
        self.set_fill_color(252, 242, 240)
        self.rect(108, y_start, col_w, 6 + len(dont_items) * 7 + 8, style="F")
        self.set_font("Barlow", "B", 10)
        self.set_text_color(159, 45, 32)
        self.cell(col_w, 7, dont_title, new_x="LMARGIN", new_y="NEXT")
        self.set_xy(110, y_start + 7)
        self.set_font("Work", "", 9)
        self.set_text_color(26, 16, 12)
        for item in dont_items:
            self.set_x(110)
            self.multi_cell(col_w - 4, 5, f"- {item}")

        y_end_dont = self.get_y()
        self.set_y(max(y_end_do, y_end_dont) + 4)

    def quote_block(self, text: str, attribution: str = "") -> None:
        self.set_fill_color(15, 51, 34)
        y = self.get_y()
        self.rect(10, y, 190, 28, style="F")
        self.set_xy(16, y + 5)
        self.set_font("Fraunces", "I", 11)
        self.set_text_color(244, 235, 207)
        self.multi_cell(178, 6, f"« {text} »")
        if attribution:
            self.set_xy(16, y + 22)
            self.set_font("Barlow", "B", 8)
            self.set_text_color(196, 165, 116)
            self.cell(0, 5, attribution.upper())
        self.set_y(y + 32)

    def color_table(self, rows: list[tuple], include_token: bool = True) -> None:
        col_swatch = 18
        col_name = 42 if include_token else 52
        col_hex = 24
        col_token = 28 if include_token else 0
        col_usage = 88 if include_token else 116

        self.set_font("Barlow", "B", 8)
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

        self.set_font("Work", "", 9)
        for row in rows:
            if include_token:
                name, token, hex_val, usage = row
            else:
                name, hex_val, usage = row
                token = ""

            r, g, b = hex_rgb(hex_val)
            if self.get_y() > 260:
                self.add_page()

            self.set_fill_color(r, g, b)
            self.cell(col_swatch, 12, "", border=1, fill=True)
            self.set_text_color(26, 16, 12)
            self.cell(col_name, 12, name, border=1)
            self.cell(col_hex, 12, hex_val.upper(), border=1)
            if include_token:
                self.cell(col_token, 12, token, border=1)
            self.cell(col_usage, 12, usage, border=1)
            self.ln()

    def positioning(self) -> None:
        self.section_cover(
            "01",
            "Positionnement",
            "Qui est Johnway, ce qu'on promet, et comment on se distingue sur le terrain.",
        )
        self.section_title("Promesse de marque")
        self.quote_block(
            "Votre événement. On s'occupe du reste.",
            "Punchline · johnway.ca",
        )
        self.body(
            "Johnway est une entreprise d'événementiel clé en main basée en Estrie, "
            "active partout au Québec. On livre, installe et orchestre chapiteaux, "
            "tentes, sono, scène, lumière et animation — avec un seul interlocuteur "
            "du devis au démontage."
        )
        self.section_title("Archétype et personnalité")
        self.bullet_list(
            [
                "Opérationnel et concret : on parle de camions, de convois, de sites qui se lèvent.",
                "Confiant sans arrogance : on sait ce qu'on fait, on le prouve sur le terrain.",
                "Festif mais professionnel : mariages, festivals, corporatif, municipal : même exigence.",
                "Québécois : français du Québec, direct, sans jargon inutile.",
            ]
        )
        self.section_title("Messages clés")
        items = [
            ("Événementiel clé en main", "Tagline principale"),
            ("Pas un garage. Une opération.", "Différenciation"),
            ("Un interlocuteur. Un devis. Un site qui tient.", "Promesse processus"),
            ("Les camions arrivent. Le site se lève. Vous célébrez.", "Récit terrain"),
            ("Estrie · Québec — On roule.", "Ancrage géographique"),
        ]
        for msg, desc in items:
            self.label(desc)
            self.set_font("Barlow", "B", 13)
            self.set_text_color(31, 92, 58)
            self.cell(0, 7, msg.upper(), new_x="LMARGIN", new_y="NEXT")
            self.ln(2)

        self.section_title("Audiences")
        self.bullet_list(
            [
                "Festivals et événements culturels",
                "Mariages et célébrations privées",
                "Événements corporatifs et galas",
                "Sites municipaux et institutions",
            ]
        )

    def logo_section(self) -> None:
        self.section_cover(
            "02",
            "Logo",
            "Versions, couleurs, espacement et règles d'utilisation du wordmark JOHNWAY.",
        )
        self.section_title("Versions du logo")
        self.body(
            "Le logo est un wordmark en capitales : JOHNWAY suivi d'un point vert. "
            "Deux versions existent selon le fond."
        )

        y = self.get_y()
        self.set_fill_color(248, 243, 230)
        self.rect(10, y, 92, 42, style="F")
        self.set_fill_color(26, 16, 12)
        self.rect(108, y, 92, 42, style="F")
        if LOGO_DARK.exists():
            self.image(str(LOGO_DARK), x=18, y=y + 10, w=76)
        if LOGO_LIGHT.exists():
            self.image(str(LOGO_LIGHT), x=116, y=y + 10, w=76)
        self.set_y(y + 46)
        self.set_font("Work", "", 8)
        self.set_text_color(107, 83, 68)
        self.cell(92, 5, "Logo sombre · fond clair", align="C")
        self.cell(92, 5, "Logo clair · fond sombre", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(4)

        self.section_title("Construction")
        self.bullet_list(
            [
                "Typographie du logo : Barlow Condensed Bold, capitales, espacement serré (-0.055em).",
                "Point final : vert forêt vif (#2F8F55), même taille optique que les lettres.",
                "Lettres sur fond clair : #2D2D2D · sur fond sombre : #F4EBCF (beige).",
                "Fichiers sources : public/brand/johnway-logo-dark.svg et johnway-logo-light.svg",
                "Régénération : npm run generate:logos",
            ]
        )

        self.section_title("Zone de protection")
        self.body(
            "Laisser un espace libre autour du logo équivalent à la hauteur du point vert "
            "(minimum). Ne jamais placer texte, bordures ou éléments graphiques dans cette zone."
        )

        self.section_title("Utilisations")
        self.two_column_do_dont(
            "À faire",
            [
                "Utiliser les SVG officiels sur le web",
                "Choisir la version claire ou sombre selon le contraste",
                "Respecter les couleurs exactes du point vert",
                "Garder le wordmark lisible à toute échelle",
            ],
            "À éviter",
            [
                "Détourer, étirer ou incliner le logo",
                "Changer la couleur du point ou des lettres",
                "Ajouter ombre, contour ou effet 3D",
                "Serrer ou espacer les lettres manuellement",
                "Placer le logo sur fond photo sans contraste",
            ],
        )

        self.section_title("Couleurs du logo")
        self.color_table(LOGO_COLORS, include_token=False)

    def colors_section(self) -> None:
        self.section_cover(
            "03",
            "Couleurs",
            "Palette beige, brun chocolat et vert forêt — identité chaleureuse et professionnelle.",
        )
        self.section_title("Couleurs de marque")
        self.body(
            "Le vert forêt est l'accent principal. Le beige et le chocolat structurent "
            "les fonds et les textes. L'or sert aux détails premium (étiquettes, citations)."
        )
        self.color_table(BRAND, include_token=True)
        self.section_title("Couleurs d'interface (web)")
        self.color_table(UI, include_token=True)

        self.section_title("Combinaisons recommandées")
        combos = [
            "Fond crème (#F8F3E6) + texte chocolat profond + accent vert forêt vif",
            "Fond chocolat profond (#1A100C) + texte beige + accent vert forêt vif",
            "Fond vert forêt profond (#0F3322) + texte beige + accent or",
            "Boutons : vert forêt vif (#2F8F55) avec texte beige",
        ]
        self.bullet_list(combos)

    def typography_section(self) -> None:
        self.section_cover(
            "04",
            "Typographie",
            "Trois familles complémentaires : impact display, lisibilité corps, voix des citations.",
        )
        self.section_title("Familles")
        fonts = [
            (
                "Barlow Condensed",
                "Display / titres / logo",
                "600 · 700 · 800",
                "VOTRE ÉVÉNEMENT. ON S'OCCUPE DU RESTE.",
            ),
            (
                "Work Sans",
                "Corps de texte / interface",
                "400 · 500 · 600 · 700",
                "Johnway livre, installe et orchestre. Chapiteaux, tentes, speakers.",
            ),
            (
                "Fraunces",
                "Témoignages / citations",
                "500 · 600 · italique",
                "Clé en main, vraiment.",
            ),
        ]
        for name, role, weights, sample in fonts:
            self.label(f"{name} — {role}")
            self.set_font("Work", "", 9)
            self.set_text_color(107, 83, 68)
            self.cell(0, 5, f"Graisses : {weights}", new_x="LMARGIN", new_y="NEXT")
            self.ln(2)
            if name.startswith("Barlow"):
                self.set_font("Barlow", "B", 22)
            elif name.startswith("Fraunces"):
                self.set_font("Fraunces", "I", 16)
            else:
                self.set_font("Work", "", 13)
            self.set_text_color(26, 16, 12)
            self.multi_cell(0, 8, sample)
            self.ln(4)

        self.section_title("Hiérarchie (site web)")
        hierarchy = [
            "Hero H1 : Barlow Condensed Bold, uppercase, tracking serré, beige sur fond sombre",
            "H2 sections : Barlow Condensed Bold, uppercase, clamp 2.6–5.5rem",
            "Surtitres : Barlow Condensed SemiBold, uppercase, tracking 0.32em, vert forêt",
            "Corps : Work Sans regular, 16–18px, interlignage relaxed",
            "Boutons : Barlow Condensed Bold, uppercase, tracking 0.18em",
            "Témoignages : Fraunces italic, 24px",
        ]
        self.bullet_list(hierarchy)

        self.section_title("Règles typographiques")
        self.two_column_do_dont(
            "À faire",
            [
                "Titres en capitales (Barlow Condensed)",
                "Corps en sentence case (Work Sans)",
                "Citations client en Fraunces italique",
                "Contraste fort texte/fond",
            ],
            "À éviter",
            [
                "Mélanger trop de graisses sur une même ligne",
                "Titres en minuscules script ou cursif",
                "Texte long en capitales",
                "Polices système ou génériques hors charte",
            ],
        )

    def tone_section(self) -> None:
        self.section_cover(
            "05",
            "Ton et rédaction",
            "Comment Johnway parle : direct, terrain, québécois, orienté résultat.",
        )
        self.section_title("Voix de marque")
        self.body(
            "Johnway parle comme sur le terrain : phrases courtes, verbes d'action, "
            "images concrètes (camions, convoi, site, sangles). On rassure par la "
            "compétence, pas par le superflu. Le ton est chaleureux mais jamais approximatif."
        )

        self.section_title("Principes rédactionnels")
        self.bullet_list(
            [
                "Direct — une idée par phrase. Pas de remplissage.",
                "Opérationnel — dire ce qu'on fait, comment, et pour qui.",
                "Confiant — affirmations claires (« On arrive », « On porte le projet »).",
                "Humain — témoignages, scènes, détails sensoriels.",
                "Québécois — français du Québec, registre professionnel accessible.",
            ]
        )

        self.section_title("Exemples de ton")
        examples = [
            (
                "Services",
                "On arrive en convoi. On ancre, on câble, on aligne. Le lendemain, on reprend. Vous ne soulevez rien.",
            ),
            (
                "Positionnement",
                "Une entreprise d'événementiel. Pas un garage.",
            ),
            (
                "Promesse",
                "Chapiteaux, sono, installation, animation. Les camions arrivent. Le site se lève. Vous célébrez.",
            ),
            (
                "Corporatif",
                "Un seul devis, un seul responsable, zéro surprise la veille.",
            ),
        ]
        for label_text, sample in examples:
            self.label(label_text)
            self.set_font("Work", "", 10)
            self.set_text_color(26, 16, 12)
            self.multi_cell(0, 5.5, sample)
            self.ln(2)

        self.section_title("À faire / À éviter")
        self.two_column_do_dont(
            "Ton Johnway",
            [
                "Phrases courtes et percutantes",
                "Verbes d'action au présent",
                "Vocabulaire terrain (convoi, lever, ancrer)",
                "Chiffres concrets (1 interlocuteur, 12 h)",
                "Appels à l'action clairs (Réserver, Lancer un événement)",
            ],
            "Ton à éviter",
            [
                "Jargon corporate vide (« solutions innovantes »)",
                "Promesses vagues (« excellence absolue »)",
                "Ton condescendant ou trop formel",
                "Anglicismes inutiles",
                "Paragraphes longs sans respiration",
            ],
        )

        self.section_title("Lexique fréquent")
        words = [
            "Clé en main · Convoi · Lever un site · Chapiteau · Sono",
            "Installation · Animation · Devis · Réservation · Estrie · Québec",
            "Festivals · Mariages · Corporatif · Municipal · Matériel",
        ]
        for line in words:
            self.set_font("Barlow", "B", 11)
            self.set_text_color(31, 92, 58)
            self.cell(0, 7, line, new_x="LMARGIN", new_y="NEXT")
            self.ln(1)

    def applications_section(self) -> None:
        self.section_cover(
            "06",
            "Applications",
            "Web, signalétique, documents et cohérence visuelle sur tous les supports.",
        )
        self.section_title("Site web (johnway.ca)")
        self.bullet_list(
            [
                "Fond crème, sections alternées beige / chocolat profond / vert profond",
                "Header et footer : fond chocolat profond, logo clair (SVG)",
                "Boutons primaires : vert forêt vif, texte beige, uppercase",
                "Animations : entrées au scroll, fade-up, 0.7 s — calmes et professionnelles",
                "Photos : terrain, équipe, festivals, mariages — lumière naturelle",
            ]
        )

        if TRUCK_MOCKUP.exists():
            self.section_title("Signalétique véhicule")
            img_w = 170
            img_h = 95
            if self.get_y() + img_h > 270:
                self.add_page()
            x = (210 - img_w) / 2
            y = self.get_y()
            self.image(str(TRUCK_MOCKUP), x=x, y=y, w=img_w, h=img_h)
            self.set_y(y + img_h + 4)
            self.set_font("Work", "", 8)
            self.set_text_color(107, 83, 68)
            self.cell(0, 5, "Mockup camion blanc · logo sombre, espacement serré", align="C", new_x="LMARGIN", new_y="NEXT")
            self.ln(4)
            self.body(
                "Sur véhicule blanc ou clair : logo sombre (#2D2D2D) avec point vert. "
                "Respecter l'espacement serré du wordmark — ne pas élargir les lettres."
            )

        self.section_title("Documents et devis")
        self.bullet_list(
            [
                "En-tête : logo sombre sur fond crème ou blanc",
                "Titres : Barlow Condensed Bold, vert forêt ou chocolat profond",
                "Corps : Work Sans, chocolat profond",
                "Accent : bandeau vert forêt profond ou filet or",
            ]
        )

        self.section_title("Réseaux sociaux")
        self.bullet_list(
            [
                "Privilégier photos terrain et avant/après installation",
                "Textes courts, punchlines ou extraits du site",
                "Hashtags locaux : #Estrie #Québec #Événementiel",
                "Logo en coin ou en fin de visuel, jamais au centre d'une photo chargée",
            ]
        )

    def contact_section(self) -> None:
        self.section_cover(
            "07",
            "Contact",
            "Coordonnées et ressources pour appliquer la charte.",
        )
        self.section_title("Coordonnées")
        self.bullet_list(
            [
                "Site : johnway.ca",
                "Courriel : info@johnway.ca",
                "Région : Estrie · Québec (service partout au Québec)",
                "Heures : lundi au samedi, 8 h à 18 h",
            ]
        )
        self.section_title("Fichiers de marque (dépôt)")
        files = [
            "public/brand/johnway-logo-dark.svg",
            "public/brand/johnway-logo-light.svg",
            "public/images/johnway-logo-dark.png",
            "public/images/johnway-logo-light.png",
            "public/johnway-palette-couleurs.pdf",
            "public/johnway-guide-image-de-marque.pdf",
            "scripts/generate-brand-guide-pdf.py",
            "scripts/generate-palette-pdf.py",
        ]
        self.bullet_list(files)

        self.ln(6)
        self.set_fill_color(26, 16, 12)
        y = self.get_y()
        self.rect(10, y, 190, 36, style="F")
        if LOGO_LIGHT.exists():
            self.image(str(LOGO_LIGHT), x=70, y=y + 6, w=70)
        self.set_y(y + 40)
        self.set_font("Work", "", 9)
        self.set_text_color(107, 83, 68)
        self.cell(0, 5, "© Johnway · Guide d'image de marque · Version 1.0", align="C")


def main() -> None:
    pdf = BrandGuidePDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.cover()
    pdf.toc_page()
    pdf.positioning()
    pdf.logo_section()
    pdf.colors_section()
    pdf.typography_section()
    pdf.tone_section()
    pdf.applications_section()
    pdf.contact_section()
    pdf.output(str(OUTPUT))
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()

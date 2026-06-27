/**
 * COA File Mapping
 * product-id → filename in /public/assets/maac-media/coa/
 * Products NOT listed here will show "Request COA" button instead
 */
export const coaMapping: Record<string, string> = {
  // ── Sulphates & Fertilizers ────────────────────────────────
  "ferrous-sulphate-heptahydrate":    "Ferrous Sulphate Heptahydrate.pdf",
  "ferrous-sulphate-semi-dry":        "Ferrous Sulphate SemiDry.pdf",
  "dried-ferrous-sulphate":           "Dried Ferrous Sulphate.pdf",
  "magnesium-sulphate":               "MAGNESIUM SULPHATE HEPTAHYDRATE.pdf",
  "dried-magnesium-sulphate":         "Dried Magnesium Sulphate.pdf",
  "zinc-sulphate-hepta":              "Zinc Sulphate Hepta.pdf",
  "zinc-sulphate-mono-33":            "Zinc Sulphate Mono 33%.pdf",
  "boric-acid":                       "BORIC ACID.pdf",
  "calcium-nitrate":                  "Calcium Nitrate.pdf",
  "copper-sulphate-crystal":          "COPPER SULPHATE CRYSTAL.pdf",
  "copper-sulphate-pentahydrate":     "COPPER SULPHATE PENTAHYDRATE.pdf",
  "sodium-nitrate":                   "SODIUM NITRATE DRY.pdf",
  "sodium-acetate-trihydrate":        "SODIUM ACETATE TRIHYDRATE.pdf",
  "cupric-oxide":                     "Cupric Oxide.pdf",
  "di-sodium-phosphate":              "Di Sodium Phosphate.pdf",
  "di-calcium-phosphate":             "Di-Calcium Phosphate.pdf",
  "sodium-bisulphate":                "SODIUM BISULPHITE.pdf",
  "sodium-meta-bisulphate":           "SODIUM META BISULPHATE.pdf",
  "sulphur-80-wdg":                   "SULPHUR  80 WDG.pdf",
  "amino-acid-mixture-mh2":           "Amino Acid Mixture (MH GRADE 2).pdf",

  // ── EDTA & Chelated ───────────────────────────────────────
  "iron-edta":                        "IRON EDTA.pdf",
  "zinc-edta":                        "ZINC EDTA.pdf",
  "calcium-edta":                     "CALCIUM EDTA.pdf",
  "magnesium-edta":                   "MAGNESIUM EDTA.pdf",
  "copper-edta":                      "COPPER EDTA.pdf",
  "di-potassium-edta":                "DI SODIUM EDTA.pdf",
  "fe-eddha":                         "Fe EDDHA.pdf",
  "calcium-magnesium-boron":          "CALCIUM MAGNESIUM BORON EDTA.pdf",
  "chelated-edta":                    "CHELATED EDTA.pdf",
  "amino-acid-80":                    "Amino Acid 80%.pdf",
  "protein-mixture":                  "Protein Mixture.pdf",

  // ── Fluoride Base Products ────────────────────────────────
  "ammonium-bi-fluoride-pure":        "Ammonium Bi Fluoride (pure).pdf",
  "ammonium-fluoride":                "Ammonium  Fluoride.pdf",
  "potassium-fluoride":               "Potassium  Fluoride.pdf",
  "potassium-fluoborate":             "Potassium Fluoborate.pdf",
  "sodium-fluoride-pure":             "Sodium Fluoride (PURE).pdf",
  "sodium-fluoride-tech":             "Sodium Fluoride Tech.pdf",
  "sodium-silico-fluoride-pure":      "Sodium Silico Fluoride (Pure).pdf",
  "calcium-fluoride":                 "Calcium Fluoride.pdf",

  // ── Acids ─────────────────────────────────────────────────
  "phosphoric-acid":                  "PHOSPHORIC ACID 80% to 85%.pdf",
  "sulfuric-acid":                    "Sulphuric Acid 98%.pdf",

  // ── NPK Fertilizers ───────────────────────────────────────
  "npk-19-19-19":                     "NPK 19-19-19.pdf",
  "mono-ammonium-phosphate":          "12-61-00 (Mono Ammonium Phosphate).pdf",
  "mono-potassium-phosphate":         "00-52-34 (Mono Potassium Phosphate).pdf",
  "potassium-sulphate-fertilizer":    "00-00-50 (Potassium Sulphate).pdf",
  "potassium-chloride-fertilizer":    "00-00-60 (POTASSIUM CLORIDE).pdf",

  // ── Pharmaceuticals ───────────────────────────────────────
  "ferrous-fumarate-pure":            "Ferrous Fumarate (PURE GRADE).pdf",
  "ferric-pyrophosphate":             "Ferric pyrophosphate.pdf",
  "fumaric-acid-pharma":              "Fumaric Acid.pdf",
  "zinc-sulphate-mono-usp":           "Zinc Sulphate Mono Hydrate 35.5% (USP Grade).pdf",
};

export function getCoaFile(productId: string): string | null {
  return coaMapping[productId] || null;
}

export function getCoaUrl(productId: string): string | null {
  const file = getCoaFile(productId);
  if (!file) return null;
  return `/assets/maac-media/coa/${encodeURIComponent(file)}`;
}

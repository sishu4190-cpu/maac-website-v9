export const companyInfo = {
  name: "Mangalam Acid and Chemicals",
  shortName: "MAAC",
  tagline: "Reliable Industrial Chemical Supplier in Vapi, Gujarat",
  description:
    "Supplier and exporter of industrial, agro, fertilizer and specialty chemicals from Vapi, Gujarat, India.",
  address:
    "PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad - 396195, Gujarat, India",
  phones: ["+91 96620 88122", "+91 90818 32790", "+91 95379 70043"],
  emails: ["mangalamacidandchemicals@gmail.com", "info_maac@yahoo.com"],
  website: "https://mangalamchemicals.com",
  social: {
    instagram: "https://www.instagram.com/mangalamchemicals",
    facebook: "https://www.facebook.com/share/1EHD6Jciom/",
    linkedin:
      "https://www.linkedin.com/in/ravi-patel-4b51912b2",
    youtube: "",
  },
  businessHours: "Monday – Saturday, 9:00 AM – 7:00 PM IST",
  certifications: [
    { name: "ISO 9001:2015", number: "IN59785A", description: "Quality Management System" },
    { name: "ISO 45001:2018", number: "IN59785C-1", description: "Occupational Health & Safety" },
    { name: "MSME UDYAM", number: "GJ-25-0006759", description: "Ministry of MSME Registration" },
    { name: "D&B DUNS No.", number: "813884357", description: "Dun & Bradstreet Verified" },
    { name: "TrustSEAL IndiaMart", number: "", description: "Verified Supplier on IndiaMart" },
  ],
  indiamartTestimonials:
    "https://www.indiamart.com/mangalam-acid-chemicals/testimonial.html",
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  applications: string[];
  packaging: string[];
  documentsAvailable: string[];
  cas?: string;
  hsn?: string;
  specifications?: Record<string, string>;
  relatedProducts?: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  applications: string[];
  industries: string[];
  products: Product[];
};

export const categories: Category[] = [
  {
    id: "sulphates-fertilizers",
    name: "Sulphates & Fertilizer Chemicals",
    slug: "sulphates-fertilizers",
    tagline: "Industrial & Agro Applications",
    description:
      "Mangalam Acid and Chemicals supplies a comprehensive range of sulphate and fertilizer chemicals for agricultural, industrial, and pharmaceutical applications. Products include ferrous sulphate, magnesium sulphate, zinc sulphate, copper sulphate, and a range of nitrate and phosphate compounds.",
    icon: "🌱",
    applications: [
      "Agriculture & crop nutrition",
      "Fertilizer manufacturing",
      "Industrial processes",
      "Pharmaceutical formulations",
      "Water treatment",
    ],
    industries: [
      "Agriculture",
      "Fertilizer industry",
      "Pharmaceutical",
      "Water treatment",
      "Chemical manufacturing",
    ],
    products: [
      {
        id: "ferrous-sulphate-heptahydrate",
        name: "Ferrous Sulphate Heptahydrate",
        categoryId: "sulphates-fertilizers",
        description:
          "Ferrous Sulphate Heptahydrate (FeSO₄·7H₂O) is a blue-green crystalline iron salt widely used as an iron source in fertilizers, water treatment, and pharmaceutical formulations. Supplied in bulk packaging with COA available on request.",
        applications: [
          "Micronutrient fertilizers",
          "Water purification and treatment",
          "Iron deficiency correction in crops",
          "Pharmaceutical iron supplement formulations",
          "Cement coloring",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag (500–1000 kg)", "As per buyer requirement"],
        documentsAvailable: ["COA", "Product Catalogue", "MSDS on request"],
        cas: "7782-63-0",
        hsn: "2833 29 10",
        specifications: {
          "Molecular Formula": "FeSO₄·7H₂O",
          "Appearance": "Blue-green crystalline powder",
          "Purity": "[Admin-editable]",
          "Iron (Fe) Content": "[Admin-editable]",
          "Moisture": "[Admin-editable]",
          "pH (5% solution)": "[Admin-editable]",
        },
        relatedProducts: ["ferrous-sulphate-semi-dry", "dried-ferrous-sulphate", "magnesium-sulphate"],
      },
      {
        id: "ferrous-sulphate-semi-dry",
        name: "Ferrous Sulphate Semi Dry",
        categoryId: "sulphates-fertilizers",
        description:
          "Ferrous Sulphate Semi Dry is a partially dehydrated form of ferrous sulphate with reduced moisture content, suitable for fertilizer blending and industrial applications where lower moisture is required.",
        applications: [
          "Fertilizer blending",
          "Industrial iron source",
          "Water treatment",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag", "As per requirement"],
        documentsAvailable: ["COA", "Product Catalogue"],
        specifications: {
          "Molecular Formula": "FeSO₄·xH₂O",
          "Appearance": "Off-white to light yellowish powder",
          "Iron Content": "[Admin-editable]",
          "Moisture": "[Admin-editable]",
        },
        relatedProducts: ["ferrous-sulphate-heptahydrate", "dried-ferrous-sulphate"],
      },
      {
        id: "magnesium-sulphate",
        name: "Magnesium Sulphate",
        categoryId: "sulphates-fertilizers",
        description:
          "Magnesium Sulphate (Epsom Salt, MgSO₄·7H₂O) is an essential magnesium source used in agriculture for soil correction, foliar spray, and fertigation. Also used in industrial and pharmaceutical applications.",
        applications: [
          "Soil magnesium deficiency correction",
          "Foliar spray for crops",
          "Fertigation",
          "Industrial chemical processing",
          "Pharmaceutical formulations",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag", "As per requirement"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "10034-99-8",
        specifications: {
          "Molecular Formula": "MgSO₄·7H₂O",
          "Appearance": "White crystalline powder",
          "Magnesium (Mg) Content": "[Admin-editable]",
          "Purity": "[Admin-editable]",
        },
        relatedProducts: ["dried-magnesium-sulphate", "ferrous-sulphate-heptahydrate"],
      },
      {
        id: "dried-ferrous-sulphate",
        name: "Dried Ferrous Sulphate",
        categoryId: "sulphates-fertilizers",
        description:
          "Dried Ferrous Sulphate is a free-flowing granular or powder form with very low moisture, suitable for dry blending, fertilizer manufacturing, and industrial use.",
        applications: ["Fertilizer dry blending", "Industrial iron supplement", "Water treatment"],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        relatedProducts: ["ferrous-sulphate-heptahydrate", "ferrous-sulphate-semi-dry"],
      },
      {
        id: "dried-magnesium-sulphate",
        name: "Dried Magnesium Sulphate",
        categoryId: "sulphates-fertilizers",
        description:
          "Dried Magnesium Sulphate is a low-moisture form of magnesium sulphate suitable for dry fertilizer blending and industrial applications.",
        applications: ["Dry fertilizer blending", "Industrial use", "Animal feed supplement"],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        relatedProducts: ["magnesium-sulphate"],
      },
      {
        id: "zinc-sulphate-hepta",
        name: "Zinc Sulphate Heptahydrate 21%",
        categoryId: "sulphates-fertilizers",
        description:
          "Zinc Sulphate Heptahydrate 21% (ZnSO₄·7H₂O) is the most widely used zinc fertilizer for correcting zinc deficiency in crops. Supplied in agricultural and industrial grades with COA available on request. Bulk packaging available in 25 kg and 50 kg bags.",
        applications: [
          "Micronutrient fertilizer for zinc deficiency",
          "Foliar spray for crops",
          "Soil application for agriculture",
          "Micronutrient premix manufacturing",
          "Animal feed supplement",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "7446-20-0",
        hsn: "2833 29 30",
        specifications: {
          "Molecular Formula": "ZnSO₄·7H₂O",
          "Appearance": "White crystalline powder",
          "Zinc (Zn) Content": "~21%",
          "Purity": "[Admin-editable]",
          "pH (5% solution)": "[Admin-editable]",
        },
        relatedProducts: ["zinc-sulphate-mono-33", "copper-sulphate-pentahydrate"],
      },
      {
        id: "zinc-sulphate-mono-33",
        name: "Zinc Sulphate Monohydrate 33%",
        categoryId: "sulphates-fertilizers",
        description:
          "Zinc Sulphate Monohydrate 33% (ZnSO₄·H₂O) has higher zinc content than the heptahydrate form. Used in fertilizer manufacturing, animal feed, and industrial applications.",
        applications: [
          "Fertilizer manufacturing",
          "Animal feed zinc supplement",
          "Industrial zinc source",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "7446-19-7",
        specifications: {
          "Molecular Formula": "ZnSO₄·H₂O",
          "Zinc Content": "~33%",
          "Appearance": "Off-white to white powder",
        },
        relatedProducts: ["zinc-sulphate-hepta"],
      },
      {
        id: "boric-acid",
        name: "Boric Acid",
        categoryId: "sulphates-fertilizers",
        description:
          "Boric Acid (H₃BO₃) is an essential boron source for plant nutrition and industrial use. Supplied as a white crystalline powder for agricultural and industrial applications.",
        applications: [
          "Boron micronutrient fertilizer",
          "Foliar spray for boron-deficient crops",
          "Micronutrient premix manufacturing",
          "Glass and ceramics industry",
          "Industrial chemical processing",
        ],
        packaging: ["25 kg bag", "50 kg bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "10043-35-3",
        specifications: {
          "Molecular Formula": "H₃BO₃",
          "Boron Content": "[Admin-editable]",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]",
        },
        relatedProducts: ["calcium-nitrate", "zinc-sulphate-hepta"],
      },
      {
        id: "calcium-nitrate",
        name: "Calcium Nitrate",
        categoryId: "sulphates-fertilizers",
        description:
          "Calcium Nitrate (Ca(NO₃)₂) is a water-soluble fertilizer that provides both calcium and nitrogen to plants. Widely used in fertigation, hydroponics, and foliar application.",
        applications: [
          "Fertigation and drip irrigation",
          "Hydroponic crop production",
          "Foliar calcium-nitrogen supplement",
          "Soil pH adjustment",
          "Industrial calcium source",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "13477-34-4",
        specifications: {
          "Molecular Formula": "Ca(NO₃)₂",
          "Nitrogen Content": "[Admin-editable]",
          "Calcium Content": "[Admin-editable]",
          "Appearance": "White granules or crystals",
          "Water Solubility": "Highly soluble",
        },
        relatedProducts: ["sodium-nitrate", "zinc-sulphate-hepta"],
      },
      {
        id: "copper-sulphate-crystal",
        name: "Copper Sulphate Crystal",
        categoryId: "sulphates-fertilizers",
        description:
          "Copper Sulphate Crystal (CuSO₄·5H₂O) in crystalline form. Used as a fungicide, micronutrient fertilizer, and in various industrial applications.",
        applications: ["Fungicide in agriculture", "Micronutrient for copper deficiency", "Industrial use", "Water treatment"],
        packaging: ["25 kg bag", "50 kg bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        specifications: {
          "Molecular Formula": "CuSO₄·5H₂O",
          "Appearance": "Blue crystals",
          "Copper Content": "[Admin-editable]",
        },
        relatedProducts: ["copper-sulphate-pentahydrate", "zinc-sulphate-hepta"],
      },
      {
        id: "sodium-nitrate",
        name: "Sodium Nitrate",
        categoryId: "sulphates-fertilizers",
        description:
          "Sodium Nitrate (NaNO₃) is a water-soluble nitrate fertilizer providing nitrogen for plant nutrition. Also used as a food preservative and in industrial applications.",
        applications: [
          "Nitrogen fertilizer",
          "Fertigation blending",
          "Industrial oxidizing agent",
          "Food preservation (technical grade)",
          "Chemical manufacturing",
        ],
        packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "7631-99-4",
        specifications: {
          "Molecular Formula": "NaNO₃",
          "Nitrogen Content": "[Admin-editable]",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]",
        },
        relatedProducts: ["calcium-nitrate", "sodium-acetate"],
      },
      {
        id: "sodium-acetate",
        name: "Sodium Acetate Trihydrate",
        categoryId: "sulphates-fertilizers",
        description:
          "Sodium Acetate Trihydrate (CH₃COONa·3H₂O) is used as a buffering agent in industrial, food, and pharmaceutical applications.",
        applications: ["Buffering agent", "Textile industry", "Pharmaceutical formulations", "Food industry", "Water treatment"],
        packaging: ["25 kg bag", "50 kg bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "6131-90-4",
        specifications: {
          "Molecular Formula": "CH₃COONa·3H₂O",
          "Appearance": "White crystalline",
          "Purity": "[Admin-editable]",
        },
        relatedProducts: ["sodium-nitrate"],
      },
      {
        id: "copper-sulphate-pentahydrate",
        name: "Copper Sulphate Pentahydrate",
        categoryId: "sulphates-fertilizers",
        description:
          "Copper Sulphate Pentahydrate (CuSO₄·5H₂O) in powder form. Widely used as a fungicide, micronutrient fertilizer, and in electroplating and industrial applications.",
        applications: [
          "Copper micronutrient fertilizer",
          "Bordeaux mixture preparation",
          "Electroplating",
          "Water treatment",
          "Animal feed supplement",
        ],
        packaging: ["25 kg bag", "50 kg bag"],
        documentsAvailable: ["COA", "Product Catalogue"],
        cas: "7758-99-8",
        specifications: {
          "Molecular Formula": "CuSO₄·5H₂O",
          "Copper Content": "[Admin-editable]",
          "Appearance": "Blue powder",
          "Purity": "[Admin-editable]",
        },
        relatedProducts: ["zinc-sulphate-hepta", "boric-acid"],
      },
      { id: "amino-acid-mixture-mh2", name: "Amino Acid Mixture (MH Grade-2)", categoryId: "sulphates-fertilizers", description: "Amino Acid Mixture MH Grade-2 is a plant-based amino acid blend used in agricultural foliar sprays and micronutrient formulations.", applications: ["Foliar spray", "Micronutrient formulations", "Plant growth promoter"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Appearance": "Brown to dark brown powder", "Amino Acid Content": "[Admin-editable]" }, relatedProducts: ["zinc-sulphate-hepta"] },
      { id: "di-calcium-phosphate", name: "Di-Calcium Phosphate", categoryId: "sulphates-fertilizers", description: "Di-Calcium Phosphate (DCP) is used as a phosphate source in animal feed and fertilizer applications.", applications: ["Animal feed supplement", "Phosphate fertilizer", "Pharmaceutical use"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7757-93-9", specifications: { "Molecular Formula": "CaHPO₄", "Appearance": "White powder", "Phosphorus Content": "[Admin-editable]" }, relatedProducts: ["calcium-nitrate"] },
      { id: "cupric-oxide", name: "Cupric Oxide", categoryId: "sulphates-fertilizers", description: "Cupric Oxide (CuO) is a black powder used in ceramics, animal feed, and chemical manufacturing.", applications: ["Ceramics", "Animal feed", "Chemical synthesis", "Catalysis"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "1317-38-0", specifications: { "Molecular Formula": "CuO", "Appearance": "Black powder", "Copper Content": "[Admin-editable]" }, relatedProducts: ["copper-sulphate-pentahydrate"] },
      { id: "di-sodium-phosphate", name: "Di-Sodium Phosphate", categoryId: "sulphates-fertilizers", description: "Di-Sodium Phosphate (Na₂HPO₄) is used as a buffering agent, food additive, and in industrial cleaning.", applications: ["Buffering agent", "Food industry", "Industrial cleaning", "Water softening"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7558-79-4", specifications: { "Molecular Formula": "Na₂HPO₄", "Appearance": "White powder" }, relatedProducts: ["sodium-nitrate"] },
      { id: "sodium-bisulphate", name: "Sodium Bisulphate", categoryId: "sulphates-fertilizers", description: "Sodium Bisulphate (NaHSO₄) is an acidic salt used in pH adjustment, cleaning, and chemical manufacturing.", applications: ["pH adjustment", "Cleaning agent", "Chemical manufacturing", "Textile processing"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7681-38-1", specifications: { "Molecular Formula": "NaHSO₄", "Appearance": "White crystalline powder" }, relatedProducts: ["sodium-meta-bisulphate"] },
      { id: "sodium-meta-bisulphate", name: "Sodium Meta Bisulphate", categoryId: "sulphates-fertilizers", description: "Sodium Metabisulphate (Na₂S₂O₅) is used as a food preservative, reducing agent, and in water treatment.", applications: ["Food preservation", "Water dechlorination", "Chemical reducing agent", "Photography"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7681-57-4", specifications: { "Molecular Formula": "Na₂S₂O₅", "Appearance": "White crystalline powder", "SO₂ Content": "[Admin-editable]" }, relatedProducts: ["sodium-bisulphate"] },
      { id: "sulphur-80-wdg", name: "Sulphur 80 WDG", categoryId: "sulphates-fertilizers", description: "Sulphur 80 WDG (Water Dispersible Granule) is a broad-spectrum fungicide and soil amendment for sulphur-deficient crops.", applications: ["Fungicide in agriculture", "Soil sulphur supplement", "Acaricide for mite control"], packaging: ["1 kg pouch", "5 kg bag", "25 kg bag", "As per requirement"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Sulphur Content": "80%", "Formulation": "WDG", "Appearance": "Yellow granules" }, relatedProducts: ["boric-acid", "zinc-sulphate-hepta"] },
    ],
  },
  {
    id: "edta-chelated",
    name: "EDTA & Chelated Products",
    slug: "edta-chelated-products",
    tagline: "Industrial & Agro Applications",
    description:
      "Mangalam Acid and Chemicals supplies a comprehensive range of EDTA-chelated micronutrients for agricultural, industrial, and pharmaceutical applications. Chelated products ensure improved nutrient absorption and bioavailability for crops.",
    icon: "🔬",
    applications: [
      "Micronutrient formulation for agriculture",
      "Chelated fertilizer manufacturing",
      "Water treatment and metal processing",
      "Pharmaceutical and healthcare applications",
      "Industrial chemical processing",
    ],
    industries: ["Agriculture", "Fertilizer industry", "Pharmaceutical", "Water treatment", "Industrial"],
    products: [
      { id: "iron-edta", name: "Iron EDTA", categoryId: "edta-chelated", description: "Iron EDTA is a stable iron chelate for soil and foliar application in iron-deficient crops. Highly water-soluble and bioavailable.", applications: ["Iron deficiency correction", "Foliar spray", "Drip fertigation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Iron (Fe) Content": "[Admin-editable]", "Chelating Agent": "EDTA", "Appearance": "Light yellow powder" }, relatedProducts: ["zinc-edta", "manganese-edta"] },
      { id: "zinc-edta", name: "Zinc EDTA", categoryId: "edta-chelated", description: "Zinc EDTA is a chelated zinc micronutrient for foliar, soil, and fertigation application in zinc-deficient crops.", applications: ["Zinc deficiency correction", "Foliar spray", "Micronutrient premix"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Zinc (Zn) Content": "[Admin-editable]", "Chelating Agent": "EDTA", "Appearance": "White to off-white powder" }, relatedProducts: ["iron-edta", "copper-edta"] },
      { id: "calcium-edta", name: "Calcium EDTA", categoryId: "edta-chelated", description: "Calcium EDTA provides chelated calcium for plant nutrition and is also used in pharmaceutical and industrial applications.", applications: ["Calcium nutrition", "Pharmaceutical chelation therapy aid", "Industrial"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Calcium (Ca) Content": "[Admin-editable]", "Chelating Agent": "EDTA" }, relatedProducts: ["magnesium-edta", "calcium-magnesium-boron"] },
      { id: "magnesium-edta", name: "Magnesium EDTA", categoryId: "edta-chelated", description: "Magnesium EDTA is a chelated magnesium source for agricultural and industrial applications.", applications: ["Magnesium nutrition", "Foliar spray", "Industrial"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Magnesium (Mg) Content": "[Admin-editable]", "Chelating Agent": "EDTA" }, relatedProducts: ["calcium-edta", "iron-edta"] },
      { id: "manganese-edta", name: "Manganese EDTA", categoryId: "edta-chelated", description: "Manganese EDTA corrects manganese deficiency in crops and is used in micronutrient premix formulations.", applications: ["Manganese deficiency correction", "Micronutrient premix", "Foliar spray"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Manganese (Mn) Content": "[Admin-editable]", "Chelating Agent": "EDTA" }, relatedProducts: ["iron-edta", "copper-edta"] },
      { id: "copper-edta", name: "Copper EDTA", categoryId: "edta-chelated", description: "Copper EDTA is a chelated copper micronutrient for agricultural and industrial use.", applications: ["Copper deficiency correction", "Micronutrient formulation", "Industrial"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Copper (Cu) Content": "[Admin-editable]", "Chelating Agent": "EDTA" }, relatedProducts: ["zinc-edta", "iron-edta"] },
      { id: "di-potassium-edta", name: "Di-Potassium EDTA", categoryId: "edta-chelated", description: "Di-Potassium EDTA is used as a chelating agent in industrial and agricultural applications.", applications: ["Chelating agent", "Industrial processing", "Agricultural formulations"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["iron-edta", "special-grade-edta"] },
      { id: "fe-eddha", name: "Fe EDDHA", categoryId: "edta-chelated", description: "Iron EDDHA (Fe-EDDHA) is an iron chelate stable over a wide pH range, effective for calcareous and alkaline soils.", applications: ["Iron correction in calcareous soils", "High pH soil treatment", "Drip irrigation"], packaging: ["1 kg pouch", "5 kg bag", "25 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Iron Content (o,o)": "[Admin-editable]", "Total Iron": "[Admin-editable]", "Appearance": "Red to brown powder" }, relatedProducts: ["iron-edta", "chelated-edta-mix-fe-eddha"] },
      { id: "boron-edta", name: "Boron EDTA", categoryId: "edta-chelated", description: "Boron EDTA is a chelated boron source for agricultural micronutrient application.", applications: ["Boron deficiency correction", "Foliar spray", "Micronutrient premix"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["calcium-magnesium-boron", "boric-acid"] },
      { id: "sulphate-mix-mh-grade", name: "Sulphate Mix as per MH Grade", categoryId: "edta-chelated", description: "Custom sulphate micronutrient mixture formulated as per MH grade specifications for agricultural use.", applications: ["Micronutrient blending", "Agricultural formulations", "Fertigation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["iron-edta", "zinc-edta"] },
      { id: "amino-acid-80", name: "Amino Acid 80%", categoryId: "edta-chelated", description: "Amino Acid 80% is a high-concentration plant-based amino acid powder used in agricultural biostimulants and micronutrient chelation.", applications: ["Biostimulant formulations", "Foliar spray", "Amino acid chelation", "Plant growth promotion"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Amino Acid Content": "≥80%", "Nitrogen (N)": "[Admin-editable]", "Appearance": "Brown/black powder", "Source": "Plant-based" }, relatedProducts: ["protein-mixture", "zinc-edta"] },
      { id: "calcium-magnesium-boron", name: "Calcium Magnesium Boron", categoryId: "edta-chelated", description: "A multi-micronutrient combination of calcium, magnesium, and boron for comprehensive crop nutrition via foliar or fertigation application.", applications: ["Multi-nutrient foliar spray", "Fertigation", "Deficiency correction for Ca, Mg, B"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["boron-edta", "calcium-edta", "magnesium-edta"] },
      { id: "protein-mixture", name: "Protein Mixture", categoryId: "edta-chelated", description: "A protein-based mixture used as a biostimulant and amino acid chelating agent in agricultural applications.", applications: ["Biostimulants", "Amino acid chelation", "Plant growth promotion"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["amino-acid-80"] },
      { id: "chelated-edta", name: "Chelated EDTA", categoryId: "edta-chelated", description: "A standard grade chelated EDTA micronutrient formulation for agricultural applications.", applications: ["Micronutrient correction", "Foliar spray", "Fertigation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["edta-mixture", "special-grade-edta"] },
      { id: "edta-mixture", name: "EDTA Mixture", categoryId: "edta-chelated", description: "A combination of EDTA-chelated micronutrients formulated for broad-spectrum crop nutrition.", applications: ["Multi-micronutrient nutrition", "Foliar spray", "Fertigation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["chelated-edta", "sulphate-mix-mh-grade"] },
      { id: "special-grade-edta", name: "Special Grade EDTA", categoryId: "edta-chelated", description: "Special Grade EDTA is a high-purity EDTA formulation for specific industrial, pharmaceutical, or agricultural requirements.", applications: ["Industrial chelation", "Pharmaceutical use", "Specialty agriculture"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["technical-grade-edta", "chelated-edta"] },
      { id: "technical-grade-edta", name: "Technical Grade EDTA", categoryId: "edta-chelated", description: "Technical Grade EDTA for industrial and chemical processing applications.", applications: ["Industrial cleaning", "Metal processing", "Chemical manufacturing", "Water treatment"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["special-grade-edta", "di-potassium-edta"] },
      { id: "chelated-edta-mix-fe-eddha", name: "Chelated EDTA Mixture with Fe EDDHA 0.5%", categoryId: "edta-chelated", description: "A chelated EDTA multi-micronutrient mixture containing 0.5% Fe-EDDHA for use in calcareous soil conditions.", applications: ["Iron-deficient calcareous soils", "Multi-micronutrient correction", "Drip fertigation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Fe-EDDHA Content": "0.5%", "Appearance": "Powder", "pH Range Stable": "[Admin-editable]" }, relatedProducts: ["fe-eddha", "chelated-edta"] },
    ],
  },
  {
    id: "fluoride-base",
    name: "Fluoride Base Products",
    slug: "fluoride-base-products",
    tagline: "Industrial & Specialty Applications",
    description:
      "Mangalam Acid and Chemicals supplies a wide range of fluoride compounds for metallurgy, aluminium processing, glass and ceramic manufacturing, and chemical processing industries.",
    icon: "⚗️",
    applications: ["Metallurgy and aluminium industry", "Glass and ceramic manufacturing", "Chemical processing", "Industrial surface treatment", "Electroplating"],
    industries: ["Metallurgy", "Aluminium", "Glass & ceramics", "Chemical processing", "Industrial manufacturing"],
    products: [
      { id: "ammonium-bi-fluoride-pure", name: "Ammonium Bi Fluoride (Pure)", categoryId: "fluoride-base", description: "Ammonium Bifluoride (NH₄HF₂) Pure Grade for industrial and chemical processing applications.", applications: ["Metal surface treatment", "Glass etching", "Chemical processing"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "1341-49-7", specifications: { "Molecular Formula": "NH₄HF₂", "Purity": "[Admin-editable]", "Appearance": "White crystalline" }, relatedProducts: ["ammonium-bi-fluoride-tech", "ammonium-fluoride"] },
      { id: "ammonium-bi-fluoride-tech", name: "Ammonium Bi Fluoride (Tech)", categoryId: "fluoride-base", description: "Technical grade Ammonium Bifluoride for industrial processing applications.", applications: ["Industrial etching", "Metal processing", "Chemical manufacturing"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Molecular Formula": "NH₄HF₂", "Grade": "Technical", "Appearance": "White crystalline" }, relatedProducts: ["ammonium-bi-fluoride-pure"] },
      { id: "ammonium-fluoride", name: "Ammonium Fluoride", categoryId: "fluoride-base", description: "Ammonium Fluoride (NH₄F) used in etching, glass treatment, and industrial chemical processing.", applications: ["Glass etching", "Metal treatment", "Chemical synthesis"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "12125-01-8", relatedProducts: ["ammonium-bi-fluoride-pure", "potassium-fluoride"] },
      { id: "ammonium-silico-fluoride", name: "Ammonium Silico Fluoride", categoryId: "fluoride-base", description: "Ammonium Silicofluoride ((NH₄)₂SiF₆) used in glass, ceramic, and wood preservation applications.", applications: ["Glass production", "Wood preservation", "Ceramic manufacturing", "Laundry scouring"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "16919-19-0", relatedProducts: ["sodium-silico-fluoride-pure", "potassium-silico-fluoride"] },
      { id: "ammonium-fluoborate", name: "Ammonium Fluoborate", categoryId: "fluoride-base", description: "Ammonium Fluoroborate (NH₄BF₄) used in aluminium brazing flux, electroplating, and chemical synthesis.", applications: ["Aluminium brazing", "Electroplating", "Chemical synthesis", "Metalworking flux"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "13826-83-0", relatedProducts: ["potassium-fluoborate", "sodium-fluoborate"] },
      { id: "potassium-fluoride", name: "Potassium Fluoride", categoryId: "fluoride-base", description: "Potassium Fluoride (KF) used in flux, etching, and organic synthesis applications.", applications: ["Flux in metallurgy", "Chemical synthesis", "Etching agent"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7789-23-3", relatedProducts: ["potassium-bi-fluoride", "ammonium-fluoride"] },
      { id: "potassium-bi-fluoride", name: "Potassium Bi Fluoride", categoryId: "fluoride-base", description: "Potassium Bifluoride (KHF₂) used in etching, glass, and electrochemical applications.", applications: ["Glass etching", "Electrochemistry", "Metal treatment"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7789-29-9", relatedProducts: ["potassium-fluoride"] },
      { id: "potassium-silico-fluoride", name: "Potassium Silico Fluoride", categoryId: "fluoride-base", description: "Potassium Silicofluoride (K₂SiF₆) used in glass, enamel, and ceramic manufacturing.", applications: ["Glass manufacturing", "Enamel production", "Ceramic industry"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "16871-90-2", relatedProducts: ["sodium-silico-fluoride-pure", "ammonium-silico-fluoride"] },
      { id: "potassium-fluoborate", name: "Potassium Fluoborate", categoryId: "fluoride-base", description: "Potassium Fluoroborate (KBF₄) used in aluminium alloys, abrasives, and flux formulations.", applications: ["Aluminium alloy production", "Abrasive manufacturing", "Flux formulations"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "14075-53-7", relatedProducts: ["ammonium-fluoborate", "sodium-fluoborate"] },
      { id: "potassium-titanium-fluoride", name: "Potassium Titanium Fluoride", categoryId: "fluoride-base", description: "Potassium Titanium Fluoride (K₂TiF₆) used in aluminium alloy grain refinement.", applications: ["Aluminium grain refinement", "Metallurgy", "Chemical synthesis"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "16919-27-0", relatedProducts: ["potassium-fluoborate"] },
      { id: "potassium-cryolite", name: "Potassium Cryolite", categoryId: "fluoride-base", description: "Potassium Cryolite (K₃AlF₆) used in aluminium metallurgy and abrasive manufacturing.", applications: ["Aluminium metallurgy", "Abrasive manufacturing", "Flux"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["sodium-cryolite-pure", "sodium-cryolite-tech"] },
      { id: "stannous-fluoride", name: "Stannous Fluoride", categoryId: "fluoride-base", description: "Stannous Fluoride (SnF₂) used in dental products and tin electroplating.", applications: ["Dental applications", "Tin electroplating", "Surface treatment"], packaging: ["25 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7783-47-3", relatedProducts: ["sodium-fluoride-pure"] },
      { id: "sodium-fluoride-pure", name: "Sodium Fluoride (Pure)", categoryId: "fluoride-base", description: "Sodium Fluoride (NaF) Pure Grade used in dental products, glass etching, and chemical manufacturing.", applications: ["Dental formulations", "Glass etching", "Chemical manufacturing", "Water fluoridation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7681-49-4", relatedProducts: ["sodium-fluoride-tech", "sodium-fluoride"] },
      { id: "sodium-fluoride-tech", name: "Sodium Fluoride (Tech)", categoryId: "fluoride-base", description: "Technical Grade Sodium Fluoride for industrial applications.", applications: ["Industrial chemical processing", "Wood preservation", "Metallurgy flux"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["sodium-fluoride-pure"] },
      { id: "sodium-fluoride", name: "Sodium Fluoride", categoryId: "fluoride-base", description: "Standard grade Sodium Fluoride for general industrial use.", applications: ["Industrial processing", "Flux", "Chemical manufacturing"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["sodium-fluoride-pure", "sodium-fluoride-tech"] },
      { id: "sodium-fluoborate", name: "Sodium Fluoborate", categoryId: "fluoride-base", description: "Sodium Fluoroborate (NaBF₄) used in brazing flux, soldering, and chemical synthesis.", applications: ["Brazing flux", "Soldering", "Chemical synthesis", "Metal treatment"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "13755-29-8", relatedProducts: ["potassium-fluoborate", "ammonium-fluoborate"] },
      { id: "sodium-cryolite-pure", name: "Sodium Cryolite (Pure)", categoryId: "fluoride-base", description: "Sodium Cryolite (Na₃AlF₆) Pure Grade used in aluminium electrolytic smelting and insecticide formulations.", applications: ["Aluminium smelting", "Insecticide formulations", "Flux in metallurgy"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "15096-52-3", relatedProducts: ["sodium-cryolite-tech", "potassium-cryolite"] },
      { id: "sodium-cryolite-tech", name: "Sodium Cryolite (Tech)", categoryId: "fluoride-base", description: "Technical Grade Sodium Cryolite for industrial and metallurgical applications.", applications: ["Aluminium metallurgy", "Abrasives", "Industrial flux"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["sodium-cryolite-pure"] },
      { id: "sodium-silico-fluoride-pure", name: "Sodium Silico Fluoride (Pure)", categoryId: "fluoride-base", description: "Sodium Silicofluoride (Na₂SiF₆) Pure Grade used in glass, ceramics, and water fluoridation.", applications: ["Glass manufacturing", "Ceramic glazing", "Water fluoridation", "Wood preservation"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "16893-85-9", relatedProducts: ["potassium-silico-fluoride", "ammonium-silico-fluoride"] },
      { id: "magnesium-fluoride", name: "Magnesium Fluoride", categoryId: "fluoride-base", description: "Magnesium Fluoride (MgF₂) used in optical coatings, glass, and ceramics.", applications: ["Optical lens coatings", "Glass manufacturing", "Ceramic production"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7783-40-6", relatedProducts: ["calcium-fluoride", "barium-fluoride"] },
      { id: "calcium-fluoride", name: "Calcium Fluoride", categoryId: "fluoride-base", description: "Calcium Fluoride (CaF₂, Fluorspar) used in metallurgy, glass, and hydrofluoric acid manufacturing.", applications: ["Steel manufacturing flux", "Glass manufacturing", "HF acid production", "Ceramics"], packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7789-75-5", relatedProducts: ["magnesium-fluoride", "sodium-fluoride-pure"] },
      { id: "barium-fluoride", name: "Barium Fluoride", categoryId: "fluoride-base", description: "Barium Fluoride (BaF₂) used in optical applications, welding flux, and specialty glass.", applications: ["Optical applications", "Welding flux", "Specialty glass", "Scintillation detectors"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7787-32-8", relatedProducts: ["magnesium-fluoride", "calcium-fluoride"] },
      { id: "zinc-fluoride", name: "Zinc Fluoride", categoryId: "fluoride-base", description: "Zinc Fluoride (ZnF₂) used in electroplating, galvanizing flux, and phosphorescent glass.", applications: ["Electroplating", "Galvanizing flux", "Specialty glass", "Fluorination reactions"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "7783-49-5", relatedProducts: ["ammonium-fluoride", "potassium-fluoride"] },
    ],
  },
  {
    id: "acids",
    name: "Acids",
    slug: "acids",
    tagline: "Industrial & Process Applications",
    description:
      "Mangalam Acid and Chemicals supplies a comprehensive range of industrial acids for chemical manufacturing, water treatment, industrial processes, and cleaning applications.",
    icon: "🧪",
    applications: ["Industrial processes", "Water treatment", "Chemical manufacturing", "Battery industry", "Cleaning and maintenance"],
    industries: ["Chemical manufacturing", "Water treatment", "Battery industry", "Metal processing", "Textile", "Pharmaceutical"],
    products: [
      { id: "phosphoric-acid", name: "Phosphoric Acid (75%, 85%, Technical)", categoryId: "acids", description: "Phosphoric Acid (H₃PO₄) supplied in 75%, 85%, and technical grades for fertilizer manufacturing, food processing, and industrial applications.", applications: ["Fertilizer manufacturing", "Food grade applications", "Metal surface treatment", "Industrial cleaning", "Water treatment"], packaging: ["35 kg carboy", "250 kg drum", "IBC tank", "Tanker"], documentsAvailable: ["COA", "MSDS", "Product Catalogue"], cas: "7664-38-2", specifications: { "Molecular Formula": "H₃PO₄", "Available Grades": "75%, 85%, Technical", "Appearance": "Clear colorless liquid" }, relatedProducts: ["sulfuric-acid", "nitric-acid"] },
      { id: "sulfuric-acid", name: "Sulfuric Acid (70% or 98%)", categoryId: "acids", description: "Sulfuric Acid (H₂SO₄) supplied in 70% and 98% concentration for industrial, fertilizer, and chemical manufacturing applications.", applications: ["Fertilizer manufacturing", "Battery electrolyte", "Chemical synthesis", "Metal processing", "Industrial cleaning"], packaging: ["250 kg drum", "IBC tank", "Tanker as per requirement"], documentsAvailable: ["COA", "MSDS", "Product Catalogue"], cas: "7664-93-9", specifications: { "Molecular Formula": "H₂SO₄", "Available Grades": "70%, 98%", "Appearance": "Colorless to slightly yellow liquid" }, relatedProducts: ["phosphoric-acid", "hydrochloric-acid"] },
      { id: "slurry-sulfuric-acid", name: "Slurry Sulfuric Acid", categoryId: "acids", description: "Slurry Sulfuric Acid is a concentrated sulfuric acid in slurry form, used in fertilizer manufacturing.", applications: ["Single super phosphate manufacturing", "Fertilizer production", "Industrial use"], packaging: ["Tanker", "As per requirement"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Appearance": "Slurry form", "Application": "SSP fertilizer manufacturing" }, relatedProducts: ["sulfuric-acid", "phosphoric-acid"] },
      { id: "nitric-acid", name: "Nitric Acid", categoryId: "acids", description: "Nitric Acid (HNO₃) used in fertilizer manufacturing, metal etching, and chemical synthesis.", applications: ["Ammonium nitrate production", "Metal etching", "Chemical synthesis", "Explosives manufacturing", "Electronics industry"], packaging: ["30 kg carboy", "250 kg drum", "As per requirement"], documentsAvailable: ["COA", "MSDS", "Product Catalogue"], cas: "7697-37-2", specifications: { "Molecular Formula": "HNO₃", "Available Concentrations": "[Admin-editable]", "Appearance": "Colorless to light yellow liquid" }, relatedProducts: ["sulfuric-acid", "phosphoric-acid"] },
      { id: "hydrochloric-acid", name: "Hydrochloric Acid", categoryId: "acids", description: "Hydrochloric Acid (HCl) used in metal pickling, pH adjustment, water treatment, and chemical manufacturing.", applications: ["Metal pickling and cleaning", "pH control in water treatment", "PVC manufacturing", "Chemical synthesis", "Oil well acidizing"], packaging: ["35 kg carboy", "250 kg drum", "As per requirement"], documentsAvailable: ["COA", "MSDS", "Product Catalogue"], cas: "7647-01-0", specifications: { "Molecular Formula": "HCl", "Available Concentrations": "[Admin-editable]", "Appearance": "Colorless to slightly yellow liquid" }, relatedProducts: ["sulfuric-acid", "nitric-acid"] },
      { id: "acetic-acid", name: "Acetic Acid", categoryId: "acids", description: "Acetic Acid (CH₃COOH) used in textile, pharmaceutical, food, and chemical processing industries.", applications: ["Textile dyeing", "Pharmaceutical synthesis", "Food flavoring", "PET manufacturing", "Vinyl acetate production"], packaging: ["35 kg carboy", "250 kg drum"], documentsAvailable: ["COA", "Product Catalogue"], cas: "64-19-7", specifications: { "Molecular Formula": "CH₃COOH", "Appearance": "Colorless liquid with pungent odor" }, relatedProducts: ["formic-acid", "oxalic-acid"] },
      { id: "formic-acid", name: "Formic Acid", categoryId: "acids", description: "Formic Acid (HCOOH) used in leather, textile, rubber, and agricultural applications.", applications: ["Leather tanning", "Textile dyeing", "Rubber manufacturing", "Silage preservative", "Pharmaceutical synthesis"], packaging: ["35 kg carboy", "250 kg drum"], documentsAvailable: ["COA", "Product Catalogue"], cas: "64-18-6", specifications: { "Molecular Formula": "HCOOH", "Available Concentrations": "[Admin-editable]", "Appearance": "Colorless liquid" }, relatedProducts: ["acetic-acid", "oxalic-acid"] },
      { id: "oxalic-acid", name: "Oxalic Acid", categoryId: "acids", description: "Oxalic Acid (C₂H₂O₄) used in bleaching, rust removal, metal treatment, and pharmaceutical applications.", applications: ["Textile bleaching", "Metal rust removal", "Pharmaceutical synthesis", "Reducing agent", "Wood cleaning"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "144-62-7", specifications: { "Molecular Formula": "C₂H₂O₄", "Appearance": "White crystalline powder", "Purity": "[Admin-editable]" }, relatedProducts: ["formic-acid", "acetic-acid"] },
      { id: "citric-acid", name: "Citric Acid", categoryId: "acids", description: "Citric Acid (C₆H₈O₇) used as an acidulant in food, beverage, pharmaceutical, and cleaning applications.", applications: ["Food and beverage acidulant", "Pharmaceutical formulations", "Cleaning agent", "Chelating agent", "Cosmetics"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "77-92-9", specifications: { "Molecular Formula": "C₆H₈O₇", "Appearance": "White crystalline powder", "Purity": "[Admin-editable]" }, relatedProducts: ["oxalic-acid", "acetic-acid"] },
      { id: "other-technical-acids", name: "Other Technical & Industrial Acids", categoryId: "acids", description: "Mangalam Acid and Chemicals can source and supply a range of other technical and industrial acids as per buyer requirements. Contact us for specific requirements.", applications: ["Industrial use", "Chemical manufacturing", "As per specific requirement"], packaging: ["As per requirement"], documentsAvailable: ["COA", "Product Catalogue"], relatedProducts: ["phosphoric-acid", "sulfuric-acid"] },
    ],
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical Products",
    slug: "pharmaceutical-products",
    tagline: "High Purity, Trusted Quality, Healthcare Focused",
    description:
      "Mangalam Acid and Chemicals supplies pharmaceutical-grade chemicals meeting USP and industry standards for formulations, nutraceuticals, API synthesis, and parenteral preparations.",
    icon: "💊",
    applications: ["Pharmaceutical formulations", "Nutraceuticals", "API synthesis", "Injection and IV solutions", "Topical and dermatological products"],
    industries: ["Pharmaceutical", "Nutraceutical", "Healthcare", "API manufacturing"],
    products: [
      { id: "ferrous-fumarate-pure", name: "Ferrous Fumarate (Pure Grade)", categoryId: "pharmaceutical", description: "Ferrous Fumarate Pure Grade is an iron supplement compound used in pharmaceutical iron deficiency formulations including tablets and capsules.", applications: ["Iron deficiency anemia treatment", "Pharmaceutical tablet formulations", "Nutraceutical iron supplements"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue", "USP specification on request"], cas: "141-01-5", specifications: { "Molecular Formula": "C₄H₂FeO₄", "Iron (Fe) Content": "[Admin-editable]", "Appearance": "Reddish-brown powder", "Grade": "Pure / Pharmaceutical" }, relatedProducts: ["ferric-pyrophosphate", "zinc-sulphate-mono-usp"] },
      { id: "ferric-pyrophosphate", name: "Ferric Pyrophosphate", categoryId: "pharmaceutical", description: "Ferric Pyrophosphate is used in iron fortification of foods and pharmaceutical formulations for iron supplementation.", applications: ["Iron fortification", "Pharmaceutical iron supplements", "Nutraceuticals", "IV iron formulations"], packaging: ["25 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Appearance": "Off-white to yellowish powder", "Iron (Fe) Content": "[Admin-editable]" }, relatedProducts: ["ferrous-fumarate-pure", "zinc-sulphate-mono-usp"] },
      { id: "fumaric-acid-pharma", name: "Fumaric Acid", categoryId: "pharmaceutical", description: "Fumaric Acid (C₄H₄O₄) used in food acidulant, pharmaceutical excipient, and polymer manufacturing applications.", applications: ["Pharmaceutical excipient", "Food acidulant", "Polymer manufacturing", "Coating applications"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], cas: "110-17-8", specifications: { "Molecular Formula": "C₄H₄O₄", "Appearance": "White crystalline powder", "Purity": "[Admin-editable]" }, relatedProducts: ["ferrous-fumarate-pure", "citric-acid"] },
      { id: "zinc-sulphate-mono-usp", name: "Zinc Sulphate Monohydrate 36% (USP Grade)", categoryId: "pharmaceutical", description: "Zinc Sulphate Monohydrate 36% USP Grade meets United States Pharmacopoeia standards for use in pharmaceutical formulations and parenteral zinc supplementation.", applications: ["Pharmaceutical zinc supplement formulations", "Parenteral nutrition", "Dermatological zinc preparations", "Nutraceuticals"], packaging: ["25 kg bag"], documentsAvailable: ["COA", "USP Specification", "Product Catalogue"], cas: "7446-19-7", specifications: { "Molecular Formula": "ZnSO₄·H₂O", "Zinc (Zn) Content": "~36%", "Grade": "USP", "Appearance": "White crystalline powder", "Purity": "[Admin-editable per USP standard]" }, relatedProducts: ["ferrous-fumarate-pure", "ferric-pyrophosphate"] },
    ],
  },
  {
    id: "npk-fertilizers",
    name: "NPK Fertilizers",
    slug: "npk-fertilizers",
    tagline: "Balanced Nutrition for Every Crop",
    description:
      "Mangalam Acid and Chemicals supplies water-soluble NPK fertilizers for fertigation, hydroponics, and foliar application. Products include potassium nitrate, monoammonium phosphate, monopotassium phosphate, and complete NPK blends.",
    icon: "🌾",
    applications: ["Fertigation and drip irrigation", "Hydroponics", "Foliar application", "Crop nutrition programs", "Micronutrient blending"],
    industries: ["Agriculture", "Horticulture", "Hydroponics", "Greenhouse cultivation", "Fertilizer blending"],
    products: [
      { id: "npk-19-19-19", name: "NPK 19-19-19", categoryId: "npk-fertilizers", description: "NPK 19-19-19 is a balanced water-soluble fertilizer providing equal ratios of nitrogen, phosphorus, and potassium for fertigation and foliar application.", applications: ["Fertigation", "Foliar spray", "Vegetable and fruit crops", "General crop nutrition"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Nitrogen (N)": "19%", "Phosphorus (P₂O₅)": "19%", "Potassium (K₂O)": "19%", "Water Solubility": "Fully water-soluble" }, relatedProducts: ["npk-13-40-13", "potassium-nitrate-fertilizer"] },
      { id: "mono-ammonium-phosphate", name: "12-61-00 (Mono-Ammonium Phosphate)", categoryId: "npk-fertilizers", description: "Mono-Ammonium Phosphate (MAP) 12-61-00 is a high-phosphorus water-soluble fertilizer for fertigation and foliar phosphorus supply.", applications: ["High-phosphorus fertigation", "Hydroponics", "Soil application", "Transplant and seedling establishment"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Nitrogen (N)": "12%", "Phosphorus (P₂O₅)": "61%", "Potassium (K₂O)": "0%", "Water Solubility": "Fully water-soluble" }, relatedProducts: ["mono-potassium-phosphate", "npk-19-19-19"] },
      { id: "mono-potassium-phosphate", name: "00-52-34 (Mono-Potassium Phosphate)", categoryId: "npk-fertilizers", description: "Mono-Potassium Phosphate (MKP) 00-52-34 is a phosphorus and potassium fertilizer free of nitrogen, used in fruit setting and ripening stages.", applications: ["Fruit development stage", "Flowering and fruit setting", "Fertigation", "Hydroponics"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Nitrogen (N)": "0%", "Phosphorus (P₂O₅)": "52%", "Potassium (K₂O)": "34%", "Water Solubility": "Fully water-soluble" }, relatedProducts: ["potassium-nitrate-fertilizer", "mono-ammonium-phosphate"] },
      { id: "npk-13-40-13", name: "NPK 13-40-13", categoryId: "npk-fertilizers", description: "NPK 13-40-13 is a high-phosphorus water-soluble fertilizer blend for use during crop establishment and vegetative growth.", applications: ["Crop establishment", "High-phosphorus demand stages", "Fertigation", "Foliar spray"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Nitrogen (N)": "13%", "Phosphorus (P₂O₅)": "40%", "Potassium (K₂O)": "13%", "Water Solubility": "Fully water-soluble" }, relatedProducts: ["npk-19-19-19", "mono-ammonium-phosphate"] },
      { id: "potassium-chloride-fertilizer", name: "00-00-60 (Potassium Chloride)", categoryId: "npk-fertilizers", description: "Potassium Chloride (MOP) 00-00-60 is a potassium-only fertilizer widely used in crops tolerant of chloride.", applications: ["Potassium nutrition for chloride-tolerant crops", "Broadcast application", "Fertilizer blending"], packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Potassium (K₂O)": "60%", "Chloride": "Contains chloride", "Appearance": "White to pinkish granules" }, relatedProducts: ["potassium-sulphate-fertilizer", "potassium-nitrate-fertilizer"] },
      { id: "potassium-sulphate-fertilizer", name: "00-00-50 (Potassium Sulphate)", categoryId: "npk-fertilizers", description: "Potassium Sulphate (SOP) 00-00-50 is a chloride-free potassium fertilizer suitable for chloride-sensitive crops and premium quality produce.", applications: ["Chloride-sensitive crops", "High-quality fruit production", "Organic-compatible nutrition", "Fertigation"], packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Potassium (K₂O)": "50%", "Sulphur (S)": "[Admin-editable]", "Chloride-free": "Yes", "Water Solubility": "Good" }, relatedProducts: ["potassium-nitrate-fertilizer", "potassium-schoenite-fertilizer"] },
      { id: "potassium-schoenite-fertilizer", name: "00-00-23 (Potassium Schoenite)", categoryId: "npk-fertilizers", description: "Potassium Schoenite (K₂SO₄·MgSO₄) provides both potassium, magnesium, and sulphur, suitable for magnesium-deficient soils.", applications: ["Magnesium and potassium combined nutrition", "Soil application", "Fertilizer blending"], packaging: ["25 kg bag", "50 kg bag", "Jumbo bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Potassium (K₂O)": "~23%", "Magnesium (MgO)": "[Admin-editable]", "Sulphur": "[Admin-editable]", "Chloride-free": "Yes" }, relatedProducts: ["potassium-sulphate-fertilizer", "magnesium-sulphate"] },
      { id: "potassium-nitrate-fertilizer", name: "13-00-45 (Potassium Nitrate)", categoryId: "npk-fertilizers", description: "Potassium Nitrate (KNO₃) 13-00-45 is a water-soluble fertilizer providing both nitrogen and potassium in a chloride-free form. Ideal for fruit and vegetable crops during fruit development.", applications: ["Fruit development and ripening", "Chloride-sensitive crops", "Fertigation", "Hydroponics", "Foliar spray"], packaging: ["25 kg bag", "50 kg bag"], documentsAvailable: ["COA", "Product Catalogue"], specifications: { "Nitrogen (N)": "13%", "Potassium (K₂O)": "45%", "Chloride-free": "Yes", "Water Solubility": "Fully water-soluble" }, relatedProducts: ["mono-potassium-phosphate", "npk-19-19-19"] },
    ],
  },
];

export const getAllProducts = (): (Product & { categorySlug: string })[] => {
  return categories.flatMap((cat) => cat.products.map(p => ({ ...p, categorySlug: cat.slug })));
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find((p) => p.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((c) => c.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((c) => c.slug === slug);
};

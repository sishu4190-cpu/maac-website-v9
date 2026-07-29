export const companyInfo = {
  "name": "Mangalam Acid and Chemicals",
  "shortName": "MAAC",
  "tagline": "Reliable Industrial Chemical Supplier in Vapi, Gujarat",
  "description": "Supplier and exporter of industrial, agro, fertilizer and specialty chemicals from Vapi, Gujarat, India.",
  "address": "PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad - 396195, Gujarat, India",
  "phones": [
    "+91 96620 88122",
    "+91 90818 32790",
    "+91 95379 70043"
  ],
  "emails": [
    "info@mangalamchemicals.com",
    "inquiry@mangalamchemicals.com"
  ],
  "website": "https://mangalamchemicals.com",
  "social": {
    "instagram": "https://www.instagram.com/mangalamchemicals",
    "facebook": "https://www.facebook.com/share/1EHD6Jciom/",
    "linkedin": "https://www.linkedin.com/in/ravi-patel-4b51912b2",
    "youtube": ""
  },
  "businessHours": "Monday – Saturday, 9:00 AM – 7:00 PM IST",
  "certifications": [
    {
      "name": "ISO 9001:2015",
      "number": "IN59785A",
      "description": "Quality Management System"
    },
    {
      "name": "ISO 45001:2018",
      "number": "IN59785C-1",
      "description": "Occupational Health & Safety"
    },
    {
      "name": "MSME UDYAM",
      "number": "GJ-25-0006759",
      "description": "Ministry of MSME Registration"
    },
    {
      "name": "D&B DUNS No.",
      "number": "813884357",
      "description": "Dun & Bradstreet Verified"
    },
    {
      "name": "TrustSEAL IndiaMart",
      "number": "",
      "description": "Verified Supplier on IndiaMart"
    }
  ],
  "indiamartTestimonials": "https://www.indiamart.com/mangalam-acid-chemicals/testimonial.html"
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
  /** Only set on showcase/cross-reference categories (e.g. Water Treatment)
   * that don't own products directly but feature picks from other categories. */
  crossLinks?: string[];
};

export const categories: Category[] = [
  {
    "id": "sulphate-chemicals",
    "name": "Sulphate Chemicals",
    "slug": "sulphate-chemicals",
    "tagline": "Our Core Product Line",
    "icon": "🌱",
    "description": "Mangalam Acid and Chemicals is a leading manufacturer, supplier and exporter of sulphate chemicals — ferrous, zinc, copper, magnesium, manganese, nickel and ammonium sulphates — for agriculture, fertilizer manufacturing, industrial processing and water treatment.",
    "applications": [
      "Agriculture & crop nutrition",
      "Fertilizer manufacturing",
      "Industrial processes",
      "Water treatment",
      "Electroplating"
    ],
    "industries": [
      "Agriculture",
      "Fertilizer industry",
      "Water treatment",
      "Electroplating",
      "Chemical manufacturing"
    ],
    "products": [
      {
        "id": "ammonium-sulphate-granules",
        "name": "Ammonium Sulphate (Granules)",
        "categoryId": "sulphate-chemicals",
        "description": "Ammonium Sulphate in granular form for easier handling and broadcast fertilizer application.",
        "applications": [
          "Broadcast fertilizer application",
          "Fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Molecular Formula": "(NH₄)₂SO₄",
          "Form": "Granules",
          "Nitrogen (N) Content": "~21%"
        },
        "relatedProducts": [
          "ammonium-sulphate-tech"
        ]
      },
      {
        "id": "ammonium-sulphate-tech",
        "name": "Ammonium Sulphate (Tech)",
        "categoryId": "sulphate-chemicals",
        "description": "Ammonium Sulphate Technical Grade ((NH₄)₂SO₄) is a nitrogen and sulphur fertilizer also used in industrial processes and water treatment.",
        "applications": [
          "Nitrogen-sulphur fertilizer",
          "Industrial processing",
          "Water treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7783-20-2",
        "specifications": {
          "Molecular Formula": "(NH₄)₂SO₄",
          "Nitrogen (N) Content": "~21%",
          "Grade": "Technical"
        },
        "relatedProducts": [
          "ammonium-sulphate-granules",
          "ammonium-sulphate-special-white"
        ]
      },
      {
        "id": "ammonium-sulphate-special-white",
        "name": "Ammonium Sulphate Special Grade (White)",
        "categoryId": "sulphate-chemicals",
        "description": "Ammonium Sulphate Special Grade (White) is a high-purity white crystalline form used where colour and purity specifications are critical.",
        "applications": [
          "Premium fertilizer blending",
          "Industrial applications requiring high purity"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Molecular Formula": "(NH₄)₂SO₄",
          "Appearance": "White crystalline",
          "Grade": "Special"
        },
        "relatedProducts": [
          "ammonium-sulphate-tech"
        ]
      },
      {
        "id": "copper-sulphate-crystal",
        "name": "Copper Sulphate Crystal",
        "categoryId": "sulphate-chemicals",
        "description": "Copper Sulphate Crystal (CuSO₄·5H₂O) in crystalline form. Used as a fungicide, micronutrient fertilizer, and in various industrial applications.",
        "applications": [
          "Fungicide in agriculture",
          "Micronutrient for copper deficiency",
          "Industrial use",
          "Water treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Molecular Formula": "CuSO₄·5H₂O",
          "Appearance": "Blue crystals",
          "Copper Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "copper-sulphate-pentahydrate",
          "zinc-sulphate-hepta"
        ]
      },
      {
        "id": "copper-sulphate-pentahydrate",
        "name": "Copper Sulphate Pentahydrate",
        "categoryId": "sulphate-chemicals",
        "description": "Copper Sulphate Pentahydrate (CuSO₄·5H₂O) in powder form. Widely used as a fungicide, micronutrient fertilizer, and in electroplating and industrial applications.",
        "applications": [
          "Copper micronutrient fertilizer",
          "Bordeaux mixture preparation",
          "Electroplating",
          "Water treatment",
          "Animal feed supplement"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7758-99-8",
        "specifications": {
          "Molecular Formula": "CuSO₄·5H₂O",
          "Copper Content": "[Admin-editable]",
          "Appearance": "Blue powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "zinc-sulphate-hepta",
          "boric-acid"
        ]
      },
      {
        "id": "dried-ferrous-sulphate",
        "name": "Dried Ferrous Sulphate",
        "categoryId": "sulphate-chemicals",
        "description": "Dried Ferrous Sulphate is a free-flowing granular or powder form with very low moisture, suitable for dry blending, fertilizer manufacturing, and industrial use.",
        "applications": [
          "Fertilizer dry blending",
          "Industrial iron supplement",
          "Water treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "ferrous-sulphate-heptahydrate",
          "ferrous-sulphate-semi-dry"
        ]
      },
      {
        "id": "dried-magnesium-sulphate",
        "name": "Dried Magnesium Sulphate 15-17%",
        "categoryId": "sulphate-chemicals",
        "description": "Dried Magnesium Sulphate is a low-moisture form of magnesium sulphate suitable for dry fertilizer blending and industrial applications.",
        "applications": [
          "Dry fertilizer blending",
          "Industrial use",
          "Animal feed supplement"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "magnesium-sulphate"
        ]
      },
      {
        "id": "ferrous-sulphate-heptahydrate",
        "name": "Ferrous Sulphate Heptahydrate",
        "categoryId": "sulphate-chemicals",
        "description": "Ferrous Sulphate Heptahydrate (FeSO₄·7H₂O) is a blue-green crystalline iron salt widely used as an iron source in fertilizers, water treatment, and pharmaceutical formulations. Supplied in bulk packaging with COA available on request.",
        "applications": [
          "Micronutrient fertilizers",
          "Water purification and treatment",
          "Iron deficiency correction in crops",
          "Pharmaceutical iron supplement formulations",
          "Cement coloring"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag (500–1000 kg)",
          "As per buyer requirement"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue",
          "MSDS on request"
        ],
        "cas": "7782-63-0",
        "hsn": "2833 29 10",
        "specifications": {
          "Molecular Formula": "FeSO₄·7H₂O",
          "Appearance": "Blue-green crystalline powder",
          "Purity": "[Admin-editable]",
          "Iron (Fe) Content": "[Admin-editable]",
          "Moisture": "[Admin-editable]",
          "pH (5% solution)": "[Admin-editable]"
        },
        "relatedProducts": [
          "ferrous-sulphate-semi-dry",
          "dried-ferrous-sulphate",
          "magnesium-sulphate"
        ]
      },
      {
        "id": "ferrous-sulphate-semi-dry",
        "name": "Ferrous Sulphate Semi Dry/Super Dry",
        "categoryId": "sulphate-chemicals",
        "description": "Ferrous Sulphate Semi Dry is a partially dehydrated form of ferrous sulphate with reduced moisture content, suitable for fertilizer blending and industrial applications where lower moisture is required.",
        "applications": [
          "Fertilizer blending",
          "Industrial iron source",
          "Water treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag",
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Molecular Formula": "FeSO₄·xH₂O",
          "Appearance": "Off-white to light yellowish powder",
          "Iron Content": "[Admin-editable]",
          "Moisture": "[Admin-editable]"
        },
        "relatedProducts": [
          "ferrous-sulphate-heptahydrate",
          "dried-ferrous-sulphate"
        ]
      },
      {
        "id": "magnesium-sulphate",
        "name": "Magnesium Sulphate Heptahydrate",
        "categoryId": "sulphate-chemicals",
        "description": "Magnesium Sulphate (Epsom Salt, MgSO₄·7H₂O) is an essential magnesium source used in agriculture for soil correction, foliar spray, and fertigation. Also used in industrial and pharmaceutical applications.",
        "applications": [
          "Soil magnesium deficiency correction",
          "Foliar spray for crops",
          "Fertigation",
          "Industrial chemical processing",
          "Pharmaceutical formulations"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag",
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "10034-99-8",
        "specifications": {
          "Molecular Formula": "MgSO₄·7H₂O",
          "Appearance": "White crystalline powder",
          "Magnesium (Mg) Content": "[Admin-editable]",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "dried-magnesium-sulphate",
          "ferrous-sulphate-heptahydrate"
        ]
      },
      {
        "id": "manganese-sulphate",
        "name": "Manganese Sulphate 25%",
        "categoryId": "sulphate-chemicals",
        "description": "Manganese Sulphate (MnSO₄) is a manganese micronutrient source used in fertilizer blending, animal feed, and industrial applications.",
        "applications": [
          "Manganese micronutrient fertilizer",
          "Animal feed supplement",
          "Industrial use"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "10034-96-5",
        "specifications": {
          "Molecular Formula": "MnSO₄·H₂O",
          "Manganese (Mn) Content": "~25%",
          "Appearance": "Light pink powder"
        },
        "relatedProducts": [
          "zinc-sulphate-hepta"
        ]
      },
      {
        "id": "nickel-sulphate",
        "name": "Nickel Sulphate",
        "categoryId": "sulphate-chemicals",
        "description": "Nickel Sulphate (NiSO₄) is primarily used in electroplating (nickel plating baths), battery manufacturing, and as a catalyst/mordant in chemical processes.",
        "applications": [
          "Electroplating",
          "Battery manufacturing",
          "Catalyst / mordant",
          "Chemical synthesis"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "10101-97-0",
        "specifications": {
          "Molecular Formula": "NiSO₄·6H₂O",
          "Appearance": "Green crystalline solid"
        },
        "relatedProducts": [
          "copper-sulphate-pentahydrate"
        ]
      },
      {
        "id": "sodium-bisulphate",
        "name": "Sodium BiSulphite",
        "categoryId": "sulphate-chemicals",
        "description": "Sodium Bisulphate (NaHSO₄) is an acidic salt used in pH adjustment, cleaning, and chemical manufacturing.",
        "applications": [
          "pH adjustment",
          "Cleaning agent",
          "Chemical manufacturing",
          "Textile processing"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7681-38-1",
        "specifications": {
          "Molecular Formula": "NaHSO₄",
          "Appearance": "White crystalline powder"
        },
        "relatedProducts": [
          "sodium-meta-bisulphate"
        ]
      },
      {
        "id": "sodium-meta-bisulphate",
        "name": "Sodium Meta Bisulphate",
        "categoryId": "sulphate-chemicals",
        "description": "Sodium Metabisulphate (Na₂S₂O₅) is used as a food preservative, reducing agent, and in water treatment.",
        "applications": [
          "Food preservation",
          "Water dechlorination",
          "Chemical reducing agent",
          "Photography"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7681-57-4",
        "specifications": {
          "Molecular Formula": "Na₂S₂O₅",
          "Appearance": "White crystalline powder",
          "SO₂ Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "sodium-bisulphate"
        ]
      },
      {
        "id": "sodium-sulphate",
        "name": "Sodium Sulphate",
        "categoryId": "sulphate-chemicals",
        "description": "Sodium Sulphate (Na₂SO₄) is used in detergent manufacturing, textile dyeing (as a dye-levelling agent), glass manufacturing, and kraft paper (pulp) production.",
        "applications": [
          "Detergent manufacturing",
          "Textile dyeing auxiliary",
          "Glass manufacturing",
          "Kraft pulp process"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7757-82-6",
        "specifications": {
          "Molecular Formula": "Na₂SO₄",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "sodium-bisulphate",
          "ammonium-sulphate-tech"
        ]
      },
      {
        "id": "zinc-sulphate-granules-33",
        "name": "Zinc Sulphate Granules 33%",
        "categoryId": "sulphate-chemicals",
        "description": "Zinc Sulphate Granules 33% is a granular zinc micronutrient fertilizer for easy soil broadcast application.",
        "applications": [
          "Soil broadcast zinc fertilizer",
          "Fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Zinc (Zn) Content": "~33%",
          "Form": "Granules"
        },
        "relatedProducts": [
          "zinc-sulphate-mono-33",
          "zinc-sulphate-hepta"
        ]
      },
      {
        "id": "zinc-sulphate-hepta",
        "name": "Zinc Sulphate Hepta 21%",
        "categoryId": "sulphate-chemicals",
        "description": "Zinc Sulphate Heptahydrate 21% (ZnSO₄·7H₂O) is the most widely used zinc fertilizer for correcting zinc deficiency in crops. Supplied in agricultural and industrial grades with COA available on request. Bulk packaging available in 25 kg and 50 kg bags.",
        "applications": [
          "Micronutrient fertilizer for zinc deficiency",
          "Foliar spray for crops",
          "Soil application for agriculture",
          "Micronutrient premix manufacturing",
          "Animal feed supplement"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7446-20-0",
        "hsn": "2833 29 30",
        "specifications": {
          "Molecular Formula": "ZnSO₄·7H₂O",
          "Appearance": "White crystalline powder",
          "Zinc (Zn) Content": "~21%",
          "Purity": "[Admin-editable]",
          "pH (5% solution)": "[Admin-editable]"
        },
        "relatedProducts": [
          "zinc-sulphate-mono-33",
          "copper-sulphate-pentahydrate"
        ]
      },
      {
        "id": "zinc-sulphate-mono-33",
        "name": "Zinc Sulphate Mono 27% - 33%",
        "categoryId": "sulphate-chemicals",
        "description": "Zinc Sulphate Monohydrate 33% (ZnSO₄·H₂O) has higher zinc content than the heptahydrate form. Used in fertilizer manufacturing, animal feed, and industrial applications.",
        "applications": [
          "Fertilizer manufacturing",
          "Animal feed zinc supplement",
          "Industrial zinc source"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7446-19-7",
        "specifications": {
          "Molecular Formula": "ZnSO₄·H₂O",
          "Zinc Content": "~33%",
          "Appearance": "Off-white to white powder"
        },
        "relatedProducts": [
          "zinc-sulphate-hepta"
        ]
      }
    ]
  },
  {
    "id": "nitrate-chemicals",
    "name": "Nitrate Chemicals",
    "slug": "nitrate-chemicals",
    "tagline": "Water-Soluble Nitrogen Sources",
    "icon": "💧",
    "description": "Mangalam Acid and Chemicals supplies nitrate chemicals including calcium nitrate, sodium nitrate and copper nitrate for fertigation, hydroponics and industrial applications.",
    "applications": [
      "Fertigation and drip irrigation",
      "Hydroponic crop production",
      "Industrial oxidizing applications",
      "Catalyst manufacturing"
    ],
    "industries": [
      "Agriculture",
      "Horticulture",
      "Chemical manufacturing",
      "Ceramics & pigments"
    ],
    "products": [
      {
        "id": "calcium-nitrate",
        "name": "Calcium Nitrate",
        "categoryId": "nitrate-chemicals",
        "description": "Calcium Nitrate (Ca(NO₃)₂) is a water-soluble fertilizer that provides both calcium and nitrogen to plants. Widely used in fertigation, hydroponics, and foliar application.",
        "applications": [
          "Fertigation and drip irrigation",
          "Hydroponic crop production",
          "Foliar calcium-nitrogen supplement",
          "Soil pH adjustment",
          "Industrial calcium source"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "13477-34-4",
        "specifications": {
          "Molecular Formula": "Ca(NO₃)₂",
          "Nitrogen Content": "[Admin-editable]",
          "Calcium Content": "[Admin-editable]",
          "Appearance": "White granules or crystals",
          "Water Solubility": "Highly soluble"
        },
        "relatedProducts": [
          "sodium-nitrate",
          "zinc-sulphate-hepta"
        ]
      },
      {
        "id": "copper-nitrate-pentahydrate",
        "name": "Copper Nitrate Pentahydrate 25%",
        "categoryId": "nitrate-chemicals",
        "description": "Copper Nitrate Pentahydrate (Cu(NO₃)₂·5H₂O) is used as a copper micronutrient source, in catalysts, and in ceramics/pigment manufacturing.",
        "applications": [
          "Copper micronutrient fertilizer",
          "Catalyst manufacturing",
          "Ceramics & pigments"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "10031-43-3",
        "specifications": {
          "Molecular Formula": "Cu(NO₃)₂·5H₂O",
          "Copper (Cu) Content": "~25%",
          "Appearance": "Blue crystals"
        },
        "relatedProducts": [
          "calcium-nitrate",
          "copper-sulphate-pentahydrate"
        ]
      },
      {
        "id": "sodium-nitrate",
        "name": "Sodium Nitrate",
        "categoryId": "nitrate-chemicals",
        "description": "Sodium Nitrate (NaNO₃) is a water-soluble nitrate fertilizer providing nitrogen for plant nutrition. Also used as a food preservative and in industrial applications.",
        "applications": [
          "Nitrogen fertilizer",
          "Fertigation blending",
          "Industrial oxidizing agent",
          "Food preservation (technical grade)",
          "Chemical manufacturing"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7631-99-4",
        "specifications": {
          "Molecular Formula": "NaNO₃",
          "Nitrogen Content": "[Admin-editable]",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "calcium-nitrate",
          "sodium-acetate"
        ]
      }
    ]
  },
  {
    "id": "chloride-chemicals",
    "name": "Chloride Chemicals",
    "slug": "chloride-chemicals",
    "tagline": "Industrial & Process Applications",
    "icon": "🧂",
    "description": "Mangalam Acid and Chemicals supplies chloride chemicals such as calcium chloride, nickel chloride and copper chloride for electroplating, drilling fluids, de-icing and industrial processing.",
    "applications": [
      "Electroplating",
      "Oil field drilling fluids",
      "De-icing & dust control",
      "Catalyst & chemical synthesis"
    ],
    "industries": [
      "Electroplating",
      "Oil & drilling",
      "Chemical manufacturing",
      "Construction"
    ],
    "products": [
      {
        "id": "calcium-chloride",
        "name": "Calcium Chloride",
        "categoryId": "chloride-chemicals",
        "description": "Calcium Chloride (CaCl₂) is widely used in dust control, de-icing, oil-field drilling fluids, water treatment, and as a drying/desiccant agent in industrial processes.",
        "applications": [
          "Dust control & de-icing",
          "Oil field drilling fluids",
          "Water treatment",
          "Desiccant / drying agent",
          "Concrete acceleration"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "10043-52-4",
        "specifications": {
          "Molecular Formula": "CaCl₂",
          "Appearance": "White flakes / granules"
        },
        "relatedProducts": [
          "nickel-chloride",
          "copper-chloride"
        ]
      },
      {
        "id": "copper-chloride",
        "name": "Copper Chloride",
        "categoryId": "chloride-chemicals",
        "description": "Copper Chloride (CuCl₂) is used as a catalyst, mordant in dyeing, wood preservative, and in fungicide formulations.",
        "applications": [
          "Catalyst",
          "Dyeing mordant",
          "Wood preservative",
          "Fungicide formulations"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7447-39-4",
        "specifications": {
          "Molecular Formula": "CuCl₂·2H₂O",
          "Appearance": "Blue-green crystalline solid"
        },
        "relatedProducts": [
          "nickel-chloride"
        ]
      },
      {
        "id": "nickel-chloride",
        "name": "Nickel Chloride",
        "categoryId": "chloride-chemicals",
        "description": "Nickel Chloride (NiCl₂) is used in electroplating (nickel baths), catalysts, and chemical synthesis.",
        "applications": [
          "Electroplating",
          "Catalyst manufacturing",
          "Chemical synthesis"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7718-54-9",
        "specifications": {
          "Molecular Formula": "NiCl₂·6H₂O",
          "Appearance": "Green crystalline solid"
        },
        "relatedProducts": [
          "copper-chloride"
        ]
      }
    ]
  },
  {
    "id": "fertilizer-chemicals",
    "name": "Fertilizer Chemicals",
    "slug": "fertilizer-chemicals",
    "tagline": "Balanced Nutrition for Every Crop",
    "icon": "🌾",
    "description": "Mangalam Acid and Chemicals supplies water-soluble NPK grades, phosphate fertilizers, boron grades, amino acids and biostimulants for fertigation, hydroponics and foliar application.",
    "applications": [
      "Fertigation and drip irrigation",
      "Hydroponics",
      "Foliar application",
      "Soil conditioning & biostimulants"
    ],
    "industries": [
      "Agriculture",
      "Horticulture",
      "Hydroponics",
      "Greenhouse cultivation"
    ],
    "products": [
      {
        "id": "potassium-schoenite-fertilizer",
        "name": "00-00-23 (Potassium Schoenite)",
        "categoryId": "fertilizer-chemicals",
        "description": "Potassium Schoenite (K₂SO₄·MgSO₄) provides both potassium, magnesium, and sulphur, suitable for magnesium-deficient soils.",
        "applications": [
          "Magnesium and potassium combined nutrition",
          "Soil application",
          "Fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Potassium (K₂O)": "~23%",
          "Magnesium (MgO)": "[Admin-editable]",
          "Sulphur": "[Admin-editable]",
          "Chloride-free": "Yes"
        },
        "relatedProducts": [
          "potassium-sulphate-fertilizer",
          "magnesium-sulphate"
        ]
      },
      {
        "id": "potassium-sulphate-fertilizer",
        "name": "00-00-50 (Potassium Sulphate)",
        "categoryId": "fertilizer-chemicals",
        "description": "Potassium Sulphate (SOP) 00-00-50 is a chloride-free potassium fertilizer suitable for chloride-sensitive crops and premium quality produce.",
        "applications": [
          "Chloride-sensitive crops",
          "High-quality fruit production",
          "Organic-compatible nutrition",
          "Fertigation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Potassium (K₂O)": "50%",
          "Sulphur (S)": "[Admin-editable]",
          "Chloride-free": "Yes",
          "Water Solubility": "Good"
        },
        "relatedProducts": [
          "potassium-nitrate-fertilizer",
          "potassium-schoenite-fertilizer"
        ]
      },
      {
        "id": "potassium-chloride-fertilizer",
        "name": "00-00-60 (Potassium Chloride)",
        "categoryId": "fertilizer-chemicals",
        "description": "Potassium Chloride (MOP) 00-00-60 is a potassium-only fertilizer widely used in crops tolerant of chloride.",
        "applications": [
          "Potassium nutrition for chloride-tolerant crops",
          "Broadcast application",
          "Fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Potassium (K₂O)": "60%",
          "Chloride": "Contains chloride",
          "Appearance": "White to pinkish granules"
        },
        "relatedProducts": [
          "potassium-sulphate-fertilizer",
          "potassium-nitrate-fertilizer"
        ]
      },
      {
        "id": "mono-potassium-phosphate",
        "name": "00-52-34 (Mono-Potassium Phosphate)",
        "categoryId": "fertilizer-chemicals",
        "description": "Mono-Potassium Phosphate (MKP) 00-52-34 is a phosphorus and potassium fertilizer free of nitrogen, used in fruit setting and ripening stages.",
        "applications": [
          "Fruit development stage",
          "Flowering and fruit setting",
          "Fertigation",
          "Hydroponics"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Nitrogen (N)": "0%",
          "Phosphorus (P₂O₅)": "52%",
          "Potassium (K₂O)": "34%",
          "Water Solubility": "Fully water-soluble"
        },
        "relatedProducts": [
          "potassium-nitrate-fertilizer",
          "mono-ammonium-phosphate"
        ]
      },
      {
        "id": "mono-ammonium-phosphate",
        "name": "12-61-00 (Mono-Ammonium Phosphate)",
        "categoryId": "fertilizer-chemicals",
        "description": "Mono-Ammonium Phosphate (MAP) 12-61-00 is a high-phosphorus water-soluble fertilizer for fertigation and foliar phosphorus supply.",
        "applications": [
          "High-phosphorus fertigation",
          "Hydroponics",
          "Soil application",
          "Transplant and seedling establishment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Nitrogen (N)": "12%",
          "Phosphorus (P₂O₅)": "61%",
          "Potassium (K₂O)": "0%",
          "Water Solubility": "Fully water-soluble"
        },
        "relatedProducts": [
          "mono-potassium-phosphate",
          "npk-19-19-19"
        ]
      },
      {
        "id": "potassium-nitrate-fertilizer",
        "name": "13-00-45 (Potassium Nitrate)",
        "categoryId": "fertilizer-chemicals",
        "description": "Potassium Nitrate (KNO₃) 13-00-45 is a water-soluble fertilizer providing both nitrogen and potassium in a chloride-free form. Ideal for fruit and vegetable crops during fruit development.",
        "applications": [
          "Fruit development and ripening",
          "Chloride-sensitive crops",
          "Fertigation",
          "Hydroponics",
          "Foliar spray"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Nitrogen (N)": "13%",
          "Potassium (K₂O)": "45%",
          "Chloride-free": "Yes",
          "Water Solubility": "Fully water-soluble"
        },
        "relatedProducts": [
          "mono-potassium-phosphate",
          "npk-19-19-19"
        ]
      },
      {
        "id": "amino-acid-80",
        "name": "Amino Acid 80%",
        "categoryId": "fertilizer-chemicals",
        "description": "Amino Acid 80% is a high-concentration plant-based amino acid powder used in agricultural biostimulants and micronutrient chelation.",
        "applications": [
          "Biostimulant formulations",
          "Foliar spray",
          "Amino acid chelation",
          "Plant growth promotion"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Amino Acid Content": "≥80%",
          "Nitrogen (N)": "[Admin-editable]",
          "Appearance": "Brown/black powder",
          "Source": "Plant-based"
        },
        "relatedProducts": [
          "protein-mixture",
          "zinc-edta"
        ]
      },
      {
        "id": "amino-acid-mixture-mh2",
        "name": "Amino Acid Mixture (MH Grade-2)",
        "categoryId": "fertilizer-chemicals",
        "description": "Amino Acid Mixture MH Grade-2 is a plant-based amino acid blend used in agricultural foliar sprays and micronutrient formulations.",
        "applications": [
          "Foliar spray",
          "Micronutrient formulations",
          "Plant growth promoter"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Appearance": "Brown to dark brown powder",
          "Amino Acid Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "zinc-sulphate-hepta"
        ]
      },
      {
        "id": "boron-10-5",
        "name": "Boron 10.5%",
        "categoryId": "fertilizer-chemicals",
        "description": "Boron 10.5% is a granular boron micronutrient fertilizer used to correct boron deficiency in crops.",
        "applications": [
          "Boron deficiency correction",
          "Soil application",
          "Fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Boron (B) Content": "10.5%"
        },
        "relatedProducts": [
          "boron-15",
          "boron-20",
          "boron-edta"
        ]
      },
      {
        "id": "boron-15",
        "name": "Boron 15%",
        "categoryId": "fertilizer-chemicals",
        "description": "Boron 15% is a concentrated boron micronutrient fertilizer grade for agricultural soil and blending use.",
        "applications": [
          "Boron deficiency correction",
          "Fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Boron (B) Content": "15%"
        },
        "relatedProducts": [
          "boron-10-5",
          "boron-20"
        ]
      },
      {
        "id": "boron-20",
        "name": "Boron 20%",
        "categoryId": "fertilizer-chemicals",
        "description": "Boron 20% is a high-concentration boron micronutrient fertilizer grade for agricultural blending.",
        "applications": [
          "Boron deficiency correction",
          "Premium fertilizer blending"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Boron (B) Content": "20%"
        },
        "relatedProducts": [
          "boron-10-5",
          "boron-15"
        ]
      },
      {
        "id": "di-calcium-phosphate",
        "name": "Di-Calcium Phosphate",
        "categoryId": "fertilizer-chemicals",
        "description": "Di-Calcium Phosphate (DCP) is used as a phosphate source in animal feed and fertilizer applications.",
        "applications": [
          "Animal feed supplement",
          "Phosphate fertilizer",
          "Pharmaceutical use"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7757-93-9",
        "specifications": {
          "Molecular Formula": "CaHPO₄",
          "Appearance": "White powder",
          "Phosphorus Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "calcium-nitrate"
        ]
      },
      {
        "id": "humic-acid-flakes",
        "name": "Humic Acid Flakes",
        "categoryId": "fertilizer-chemicals",
        "description": "Humic Acid Flakes are a soil conditioner and biostimulant that improve nutrient uptake, soil structure, and root development.",
        "applications": [
          "Soil conditioner",
          "Biostimulant",
          "Improves nutrient uptake efficiency",
          "Fertigation"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Appearance": "Black flakes",
          "Humic Acid Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "amino-acid-80",
          "protein-mixture"
        ]
      },
      {
        "id": "npk-13-40-13",
        "name": "NPK 13-40-13",
        "categoryId": "fertilizer-chemicals",
        "description": "NPK 13-40-13 is a high-phosphorus water-soluble fertilizer blend for use during crop establishment and vegetative growth.",
        "applications": [
          "Crop establishment",
          "High-phosphorus demand stages",
          "Fertigation",
          "Foliar spray"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Nitrogen (N)": "13%",
          "Phosphorus (P₂O₅)": "40%",
          "Potassium (K₂O)": "13%",
          "Water Solubility": "Fully water-soluble"
        },
        "relatedProducts": [
          "npk-19-19-19",
          "mono-ammonium-phosphate"
        ]
      },
      {
        "id": "npk-19-19-19",
        "name": "NPK 19-19-19",
        "categoryId": "fertilizer-chemicals",
        "description": "NPK 19-19-19 is a balanced water-soluble fertilizer providing equal ratios of nitrogen, phosphorus, and potassium for fertigation and foliar application.",
        "applications": [
          "Fertigation",
          "Foliar spray",
          "Vegetable and fruit crops",
          "General crop nutrition"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Nitrogen (N)": "19%",
          "Phosphorus (P₂O₅)": "19%",
          "Potassium (K₂O)": "19%",
          "Water Solubility": "Fully water-soluble"
        },
        "relatedProducts": [
          "npk-13-40-13",
          "potassium-nitrate-fertilizer"
        ]
      },
      {
        "id": "protein-mixture",
        "name": "Protein Mixture",
        "categoryId": "fertilizer-chemicals",
        "description": "A protein-based mixture used as a biostimulant and amino acid chelating agent in agricultural applications.",
        "applications": [
          "Biostimulants",
          "Amino acid chelation",
          "Plant growth promotion"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "amino-acid-80"
        ]
      },
      {
        "id": "sulphate-mix-mh-grade",
        "name": "Sulphate Mix as per MH Grade",
        "categoryId": "fertilizer-chemicals",
        "description": "Custom sulphate micronutrient mixture formulated as per MH grade specifications for agricultural use.",
        "applications": [
          "Micronutrient blending",
          "Agricultural formulations",
          "Fertigation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "iron-edta",
          "zinc-edta"
        ]
      },
      {
        "id": "sulphur-80-wdg",
        "name": "Sulphur 80 WDG",
        "categoryId": "fertilizer-chemicals",
        "description": "Sulphur 80 WDG (Water Dispersible Granule) is a broad-spectrum fungicide and soil amendment for sulphur-deficient crops.",
        "applications": [
          "Fungicide in agriculture",
          "Soil sulphur supplement",
          "Acaricide for mite control"
        ],
        "packaging": [
          "1 kg pouch",
          "5 kg bag",
          "25 kg bag",
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Sulphur Content": "80%",
          "Formulation": "WDG",
          "Appearance": "Yellow granules"
        },
        "relatedProducts": [
          "boric-acid",
          "zinc-sulphate-hepta"
        ]
      }
    ]
  },
  {
    "id": "textile-chemicals",
    "name": "Textile Chemicals",
    "slug": "textile-chemicals",
    "tagline": "Dyeing, Printing & Finishing Auxiliaries",
    "icon": "🧵",
    "description": "Mangalam Acid and Chemicals supplies acetic acid, formic acid, oxalic acid, sodium acetate and citric acid used across textile dyeing, printing, bleaching and finishing processes.",
    "applications": [
      "Textile dyeing & printing",
      "Bleaching",
      "pH buffering in dye baths",
      "Finishing processes"
    ],
    "industries": [
      "Textile",
      "Dyes & pigments",
      "Leather"
    ],
    "products": [
      {
        "id": "acetic-acid",
        "name": "Acetic Acid",
        "categoryId": "textile-chemicals",
        "description": "Acetic Acid (CH₃COOH) used in textile, pharmaceutical, food, and chemical processing industries.",
        "applications": [
          "Textile dyeing",
          "Pharmaceutical synthesis",
          "Food flavoring",
          "PET manufacturing",
          "Vinyl acetate production"
        ],
        "packaging": [
          "35 kg carboy",
          "250 kg drum"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "64-19-7",
        "specifications": {
          "Molecular Formula": "CH₃COOH",
          "Appearance": "Colorless liquid with pungent odor"
        },
        "relatedProducts": [
          "formic-acid",
          "oxalic-acid"
        ]
      },
      {
        "id": "citric-acid",
        "name": "Citric Powder Imported Mono Hydrate",
        "categoryId": "textile-chemicals",
        "description": "Citric Acid (C₆H₈O₇) used as an acidulant in food, beverage, pharmaceutical, and cleaning applications.",
        "applications": [
          "Food and beverage acidulant",
          "Pharmaceutical formulations",
          "Cleaning agent",
          "Chelating agent",
          "Cosmetics"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "77-92-9",
        "specifications": {
          "Molecular Formula": "C₆H₈O₇",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "oxalic-acid",
          "acetic-acid"
        ]
      },
      {
        "id": "formic-acid",
        "name": "Formic Acid",
        "categoryId": "textile-chemicals",
        "description": "Formic Acid (HCOOH) used in leather, textile, rubber, and agricultural applications.",
        "applications": [
          "Leather tanning",
          "Textile dyeing",
          "Rubber manufacturing",
          "Silage preservative",
          "Pharmaceutical synthesis"
        ],
        "packaging": [
          "35 kg carboy",
          "250 kg drum"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "64-18-6",
        "specifications": {
          "Molecular Formula": "HCOOH",
          "Available Concentrations": "[Admin-editable]",
          "Appearance": "Colorless liquid"
        },
        "relatedProducts": [
          "acetic-acid",
          "oxalic-acid"
        ]
      },
      {
        "id": "oxalic-acid",
        "name": "Oxalic Acid",
        "categoryId": "textile-chemicals",
        "description": "Oxalic Acid (C₂H₂O₄) used in bleaching, rust removal, metal treatment, and pharmaceutical applications.",
        "applications": [
          "Textile bleaching",
          "Metal rust removal",
          "Pharmaceutical synthesis",
          "Reducing agent",
          "Wood cleaning"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "144-62-7",
        "specifications": {
          "Molecular Formula": "C₂H₂O₄",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "formic-acid",
          "acetic-acid"
        ]
      },
      {
        "id": "sodium-acetate",
        "name": "Sodium Acetate Trihydrate",
        "categoryId": "textile-chemicals",
        "description": "Sodium Acetate Trihydrate (CH₃COONa·3H₂O) is used as a buffering agent in industrial, food, and pharmaceutical applications.",
        "applications": [
          "Buffering agent",
          "Textile industry",
          "Pharmaceutical formulations",
          "Food industry",
          "Water treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "6131-90-4",
        "specifications": {
          "Molecular Formula": "CH₃COONa·3H₂O",
          "Appearance": "White crystalline",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "sodium-nitrate"
        ]
      }
    ]
  },
  {
    "id": "water-treatment-chemicals",
    "name": "Water Treatment Chemicals",
    "slug": "water-treatment-chemicals",
    "tagline": "Chemicals Used Across Our Range for Water Treatment",
    "icon": "💦",
    "description": "Several products across our sulphate, chloride, fluoride and industrial acid ranges are widely used in municipal and industrial water treatment — coagulation, pH correction, disinfection support and fluoridation. Below are our most requested water-treatment products, each linking to its full specification page.",
    "applications": [
      "Coagulation & flocculation",
      "pH correction",
      "Water fluoridation",
      "Industrial effluent treatment"
    ],
    "industries": [
      "Water treatment",
      "Municipal utilities",
      "Industrial processing"
    ],
    "crossLinks": [
      "ferrous-sulphate-heptahydrate",
      "copper-sulphate-pentahydrate",
      "ammonium-sulphate-tech",
      "sodium-fluoride-pure",
      "calcium-chloride",
      "hydrochloric-acid"
    ],
    "products": []
  },
  {
    "id": "fluoride-chemicals",
    "name": "Fluoride Chemicals",
    "slug": "fluoride-chemicals",
    "tagline": "Industrial & Specialty Applications",
    "icon": "⚗️",
    "description": "Mangalam Acid and Chemicals supplies a wide range of fluoride compounds for metallurgy, aluminium processing, glass and ceramic manufacturing, and chemical processing industries.",
    "applications": [
      "Metallurgy and aluminium industry",
      "Glass and ceramic manufacturing",
      "Chemical processing",
      "Industrial surface treatment",
      "Electroplating"
    ],
    "industries": [
      "Metallurgy",
      "Aluminium",
      "Glass & ceramics",
      "Chemical processing",
      "Industrial manufacturing"
    ],
    "products": [
      {
        "id": "ammonium-bi-fluoride-pure",
        "name": "Ammonium Bi Fluoride (Pure)",
        "categoryId": "fluoride-chemicals",
        "description": "Ammonium Bifluoride (NH₄HF₂) Pure Grade for industrial and chemical processing applications.",
        "applications": [
          "Metal surface treatment",
          "Glass etching",
          "Chemical processing"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "1341-49-7",
        "specifications": {
          "Molecular Formula": "NH₄HF₂",
          "Purity": "[Admin-editable]",
          "Appearance": "White crystalline"
        },
        "relatedProducts": [
          "ammonium-bi-fluoride-tech",
          "ammonium-fluoride"
        ]
      },
      {
        "id": "ammonium-bi-fluoride-tech",
        "name": "Ammonium Bi Fluoride (Tech)",
        "categoryId": "fluoride-chemicals",
        "description": "Technical grade Ammonium Bifluoride for industrial processing applications.",
        "applications": [
          "Industrial etching",
          "Metal processing",
          "Chemical manufacturing"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Molecular Formula": "NH₄HF₂",
          "Grade": "Technical",
          "Appearance": "White crystalline"
        },
        "relatedProducts": [
          "ammonium-bi-fluoride-pure"
        ]
      },
      {
        "id": "ammonium-fluoborate",
        "name": "Ammonium Fluoborate",
        "categoryId": "fluoride-chemicals",
        "description": "Ammonium Fluoroborate (NH₄BF₄) used in aluminium brazing flux, electroplating, and chemical synthesis.",
        "applications": [
          "Aluminium brazing",
          "Electroplating",
          "Chemical synthesis",
          "Metalworking flux"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "13826-83-0",
        "relatedProducts": [
          "potassium-fluoborate",
          "sodium-fluoborate"
        ]
      },
      {
        "id": "ammonium-fluoride",
        "name": "Ammonium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Ammonium Fluoride (NH₄F) used in etching, glass treatment, and industrial chemical processing.",
        "applications": [
          "Glass etching",
          "Metal treatment",
          "Chemical synthesis"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "12125-01-8",
        "relatedProducts": [
          "ammonium-bi-fluoride-pure",
          "potassium-fluoride"
        ]
      },
      {
        "id": "ammonium-silico-fluoride",
        "name": "Ammonium Silico Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Ammonium Silicofluoride ((NH₄)₂SiF₆) used in glass, ceramic, and wood preservation applications.",
        "applications": [
          "Glass production",
          "Wood preservation",
          "Ceramic manufacturing",
          "Laundry scouring"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "16919-19-0",
        "relatedProducts": [
          "sodium-silico-fluoride-pure",
          "potassium-silico-fluoride"
        ]
      },
      {
        "id": "barium-fluoride",
        "name": "Barium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Barium Fluoride (BaF₂) used in optical applications, welding flux, and specialty glass.",
        "applications": [
          "Optical applications",
          "Welding flux",
          "Specialty glass",
          "Scintillation detectors"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7787-32-8",
        "relatedProducts": [
          "magnesium-fluoride",
          "calcium-fluoride"
        ]
      },
      {
        "id": "calcium-fluoride",
        "name": "Calcium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Calcium Fluoride (CaF₂, Fluorspar) used in metallurgy, glass, and hydrofluoric acid manufacturing.",
        "applications": [
          "Steel manufacturing flux",
          "Glass manufacturing",
          "HF acid production",
          "Ceramics"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag",
          "Jumbo bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7789-75-5",
        "relatedProducts": [
          "magnesium-fluoride",
          "sodium-fluoride-pure"
        ]
      },
      {
        "id": "magnesium-fluoride",
        "name": "Magnesium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Magnesium Fluoride (MgF₂) used in optical coatings, glass, and ceramics.",
        "applications": [
          "Optical lens coatings",
          "Glass manufacturing",
          "Ceramic production"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7783-40-6",
        "relatedProducts": [
          "calcium-fluoride",
          "barium-fluoride"
        ]
      },
      {
        "id": "potassium-bi-fluoride",
        "name": "Potassium Bi Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Potassium Bifluoride (KHF₂) used in etching, glass, and electrochemical applications.",
        "applications": [
          "Glass etching",
          "Electrochemistry",
          "Metal treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7789-29-9",
        "relatedProducts": [
          "potassium-fluoride"
        ]
      },
      {
        "id": "potassium-cryolite",
        "name": "Potassium Cryolite",
        "categoryId": "fluoride-chemicals",
        "description": "Potassium Cryolite (K₃AlF₆) used in aluminium metallurgy and abrasive manufacturing.",
        "applications": [
          "Aluminium metallurgy",
          "Abrasive manufacturing",
          "Flux"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "sodium-cryolite-pure",
          "sodium-cryolite-tech"
        ]
      },
      {
        "id": "potassium-fluoborate",
        "name": "Potassium Fluoborate",
        "categoryId": "fluoride-chemicals",
        "description": "Potassium Fluoroborate (KBF₄) used in aluminium alloys, abrasives, and flux formulations.",
        "applications": [
          "Aluminium alloy production",
          "Abrasive manufacturing",
          "Flux formulations"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "14075-53-7",
        "relatedProducts": [
          "ammonium-fluoborate",
          "sodium-fluoborate"
        ]
      },
      {
        "id": "potassium-fluoride",
        "name": "Potassium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Potassium Fluoride (KF) used in flux, etching, and organic synthesis applications.",
        "applications": [
          "Flux in metallurgy",
          "Chemical synthesis",
          "Etching agent"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7789-23-3",
        "relatedProducts": [
          "potassium-bi-fluoride",
          "ammonium-fluoride"
        ]
      },
      {
        "id": "potassium-silico-fluoride",
        "name": "Potassium Silico Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Potassium Silicofluoride (K₂SiF₆) used in glass, enamel, and ceramic manufacturing.",
        "applications": [
          "Glass manufacturing",
          "Enamel production",
          "Ceramic industry"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "16871-90-2",
        "relatedProducts": [
          "sodium-silico-fluoride-pure",
          "ammonium-silico-fluoride"
        ]
      },
      {
        "id": "potassium-titanium-fluoride",
        "name": "Potassium Titanium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Potassium Titanium Fluoride (K₂TiF₆) used in aluminium alloy grain refinement.",
        "applications": [
          "Aluminium grain refinement",
          "Metallurgy",
          "Chemical synthesis"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "16919-27-0",
        "relatedProducts": [
          "potassium-fluoborate"
        ]
      },
      {
        "id": "sodium-cryolite-pure",
        "name": "Sodium Cryolite (Pure)",
        "categoryId": "fluoride-chemicals",
        "description": "Sodium Cryolite (Na₃AlF₆) Pure Grade used in aluminium electrolytic smelting and insecticide formulations.",
        "applications": [
          "Aluminium smelting",
          "Insecticide formulations",
          "Flux in metallurgy"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "15096-52-3",
        "relatedProducts": [
          "sodium-cryolite-tech",
          "potassium-cryolite"
        ]
      },
      {
        "id": "sodium-cryolite-tech",
        "name": "Sodium Cryolite (Tech)",
        "categoryId": "fluoride-chemicals",
        "description": "Technical Grade Sodium Cryolite for industrial and metallurgical applications.",
        "applications": [
          "Aluminium metallurgy",
          "Abrasives",
          "Industrial flux"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "sodium-cryolite-pure"
        ]
      },
      {
        "id": "sodium-fluoborate",
        "name": "Sodium Fluoborate",
        "categoryId": "fluoride-chemicals",
        "description": "Sodium Fluoroborate (NaBF₄) used in brazing flux, soldering, and chemical synthesis.",
        "applications": [
          "Brazing flux",
          "Soldering",
          "Chemical synthesis",
          "Metal treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "13755-29-8",
        "relatedProducts": [
          "potassium-fluoborate",
          "ammonium-fluoborate"
        ]
      },
      {
        "id": "sodium-fluoride",
        "name": "Sodium Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Standard grade Sodium Fluoride for general industrial use.",
        "applications": [
          "Industrial processing",
          "Flux",
          "Chemical manufacturing"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "sodium-fluoride-pure",
          "sodium-fluoride-tech"
        ]
      },
      {
        "id": "sodium-fluoride-pure",
        "name": "Sodium Fluoride (Pure)",
        "categoryId": "fluoride-chemicals",
        "description": "Sodium Fluoride (NaF) Pure Grade used in dental products, glass etching, and chemical manufacturing.",
        "applications": [
          "Dental formulations",
          "Glass etching",
          "Chemical manufacturing",
          "Water fluoridation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7681-49-4",
        "relatedProducts": [
          "sodium-fluoride-tech",
          "sodium-fluoride"
        ]
      },
      {
        "id": "sodium-fluoride-tech",
        "name": "Sodium Fluoride (Tech)",
        "categoryId": "fluoride-chemicals",
        "description": "Technical Grade Sodium Fluoride for industrial applications.",
        "applications": [
          "Industrial chemical processing",
          "Wood preservation",
          "Metallurgy flux"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "sodium-fluoride-pure"
        ]
      },
      {
        "id": "sodium-silico-fluoride-pure",
        "name": "Sodium Silico Fluoride (Pure)",
        "categoryId": "fluoride-chemicals",
        "description": "Sodium Silicofluoride (Na₂SiF₆) Pure Grade used in glass, ceramics, and water fluoridation.",
        "applications": [
          "Glass manufacturing",
          "Ceramic glazing",
          "Water fluoridation",
          "Wood preservation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "16893-85-9",
        "relatedProducts": [
          "potassium-silico-fluoride",
          "ammonium-silico-fluoride"
        ]
      },
      {
        "id": "stannous-fluoride",
        "name": "Stannous Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Stannous Fluoride (SnF₂) used in dental products and tin electroplating.",
        "applications": [
          "Dental applications",
          "Tin electroplating",
          "Surface treatment"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7783-47-3",
        "relatedProducts": [
          "sodium-fluoride-pure"
        ]
      },
      {
        "id": "zinc-fluoride",
        "name": "Zinc Fluoride",
        "categoryId": "fluoride-chemicals",
        "description": "Zinc Fluoride (ZnF₂) used in electroplating, galvanizing flux, and phosphorescent glass.",
        "applications": [
          "Electroplating",
          "Galvanizing flux",
          "Specialty glass",
          "Fluorination reactions"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7783-49-5",
        "relatedProducts": [
          "ammonium-fluoride",
          "potassium-fluoride"
        ]
      }
    ]
  },
  {
    "id": "industrial-chemicals",
    "name": "Industrial Chemicals",
    "slug": "industrial-chemicals",
    "tagline": "Acids & Process Chemicals",
    "icon": "🧪",
    "description": "Mangalam Acid and Chemicals supplies a comprehensive range of industrial acids and process chemicals — phosphoric, sulphuric, nitric and hydrochloric acid, boric acid, cupric oxide and phosphate salts — for chemical manufacturing, water treatment and general industrial processes.",
    "applications": [
      "Industrial processes",
      "Water treatment",
      "Chemical manufacturing",
      "Battery industry",
      "Cleaning and maintenance"
    ],
    "industries": [
      "Chemical manufacturing",
      "Water treatment",
      "Battery industry",
      "Metal processing",
      "Glass & ceramics"
    ],
    "products": [
      {
        "id": "boric-acid",
        "name": "Boric Acid",
        "categoryId": "industrial-chemicals",
        "description": "Boric Acid (H₃BO₃) is an essential boron source for plant nutrition and industrial use. Supplied as a white crystalline powder for agricultural and industrial applications.",
        "applications": [
          "Boron micronutrient fertilizer",
          "Foliar spray for boron-deficient crops",
          "Micronutrient premix manufacturing",
          "Glass and ceramics industry",
          "Industrial chemical processing"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "10043-35-3",
        "specifications": {
          "Molecular Formula": "H₃BO₃",
          "Boron Content": "[Admin-editable]",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "calcium-nitrate",
          "zinc-sulphate-hepta"
        ]
      },
      {
        "id": "cupric-oxide",
        "name": "Cupric Oxide",
        "categoryId": "industrial-chemicals",
        "description": "Cupric Oxide (CuO) is a black powder used in ceramics, animal feed, and chemical manufacturing.",
        "applications": [
          "Ceramics",
          "Animal feed",
          "Chemical synthesis",
          "Catalysis"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "1317-38-0",
        "specifications": {
          "Molecular Formula": "CuO",
          "Appearance": "Black powder",
          "Copper Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "copper-sulphate-pentahydrate"
        ]
      },
      {
        "id": "di-sodium-phosphate",
        "name": "Di-Sodium Phosphate",
        "categoryId": "industrial-chemicals",
        "description": "Di-Sodium Phosphate (Na₂HPO₄) is used as a buffering agent, food additive, and in industrial cleaning.",
        "applications": [
          "Buffering agent",
          "Food industry",
          "Industrial cleaning",
          "Water softening"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7558-79-4",
        "specifications": {
          "Molecular Formula": "Na₂HPO₄",
          "Appearance": "White powder"
        },
        "relatedProducts": [
          "sodium-nitrate"
        ]
      },
      {
        "id": "hydrochloric-acid",
        "name": "Hydrochloric Acid",
        "categoryId": "industrial-chemicals",
        "description": "Hydrochloric Acid (HCl) used in metal pickling, pH adjustment, water treatment, and chemical manufacturing.",
        "applications": [
          "Metal pickling and cleaning",
          "pH control in water treatment",
          "PVC manufacturing",
          "Chemical synthesis",
          "Oil well acidizing"
        ],
        "packaging": [
          "35 kg carboy",
          "250 kg drum",
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "MSDS",
          "Product Catalogue"
        ],
        "cas": "7647-01-0",
        "specifications": {
          "Molecular Formula": "HCl",
          "Available Concentrations": "[Admin-editable]",
          "Appearance": "Colorless to slightly yellow liquid"
        },
        "relatedProducts": [
          "sulfuric-acid",
          "nitric-acid"
        ]
      },
      {
        "id": "mono-sodium-phosphate",
        "name": "Mono Sodium Phosphate",
        "categoryId": "industrial-chemicals",
        "description": "Mono Sodium Phosphate (NaH₂PO₄) is used as a buffering and acidulant agent in food, industrial cleaning, and water treatment applications.",
        "applications": [
          "Buffering agent",
          "Food industry acidulant",
          "Industrial cleaning",
          "Water treatment"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "7558-80-7",
        "specifications": {
          "Molecular Formula": "NaH₂PO₄",
          "Appearance": "White powder"
        },
        "relatedProducts": [
          "di-sodium-phosphate"
        ]
      },
      {
        "id": "nitric-acid",
        "name": "Nitric Acid",
        "categoryId": "industrial-chemicals",
        "description": "Nitric Acid (HNO₃) used in fertilizer manufacturing, metal etching, and chemical synthesis.",
        "applications": [
          "Ammonium nitrate production",
          "Metal etching",
          "Chemical synthesis",
          "Explosives manufacturing",
          "Electronics industry"
        ],
        "packaging": [
          "30 kg carboy",
          "250 kg drum",
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "MSDS",
          "Product Catalogue"
        ],
        "cas": "7697-37-2",
        "specifications": {
          "Molecular Formula": "HNO₃",
          "Available Concentrations": "[Admin-editable]",
          "Appearance": "Colorless to light yellow liquid"
        },
        "relatedProducts": [
          "sulfuric-acid",
          "phosphoric-acid"
        ]
      },
      {
        "id": "other-technical-acids",
        "name": "Other Technical & Industrial Acids",
        "categoryId": "industrial-chemicals",
        "description": "Mangalam Acid and Chemicals can source and supply a range of other technical and industrial acids as per buyer requirements. Contact us for specific requirements.",
        "applications": [
          "Industrial use",
          "Chemical manufacturing",
          "As per specific requirement"
        ],
        "packaging": [
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "phosphoric-acid",
          "sulfuric-acid"
        ]
      },
      {
        "id": "phosphoric-acid",
        "name": "Phosphoric Acid (75%, 80%, 85%, Technical)",
        "categoryId": "industrial-chemicals",
        "description": "Phosphoric Acid (H₃PO₄) supplied in 75%, 85%, and technical grades for fertilizer manufacturing, food processing, and industrial applications.",
        "applications": [
          "Fertilizer manufacturing",
          "Food grade applications",
          "Metal surface treatment",
          "Industrial cleaning",
          "Water treatment"
        ],
        "packaging": [
          "35 kg carboy",
          "250 kg drum",
          "IBC tank",
          "Tanker"
        ],
        "documentsAvailable": [
          "COA",
          "MSDS",
          "Product Catalogue"
        ],
        "cas": "7664-38-2",
        "specifications": {
          "Molecular Formula": "H₃PO₄",
          "Available Grades": "75%, 80%, 85%, Technical",
          "Appearance": "Clear colorless liquid"
        },
        "relatedProducts": [
          "sulfuric-acid",
          "nitric-acid"
        ]
      },
      {
        "id": "slurry-sulfuric-acid",
        "name": "Slurry Sulfuric Acid",
        "categoryId": "industrial-chemicals",
        "description": "Slurry Sulfuric Acid is a concentrated sulfuric acid in slurry form, used in fertilizer manufacturing.",
        "applications": [
          "Single super phosphate manufacturing",
          "Fertilizer production",
          "Industrial use"
        ],
        "packaging": [
          "Tanker",
          "As per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Appearance": "Slurry form",
          "Application": "SSP fertilizer manufacturing"
        },
        "relatedProducts": [
          "sulfuric-acid",
          "phosphoric-acid"
        ]
      },
      {
        "id": "sulfuric-acid",
        "name": "Sulfuric Acid (98%)",
        "categoryId": "industrial-chemicals",
        "description": "Sulfuric Acid (H₂SO₄) supplied in 70% and 98% concentration for industrial, fertilizer, and chemical manufacturing applications.",
        "applications": [
          "Fertilizer manufacturing",
          "Battery electrolyte",
          "Chemical synthesis",
          "Metal processing",
          "Industrial cleaning"
        ],
        "packaging": [
          "250 kg drum",
          "IBC tank",
          "Tanker as per requirement"
        ],
        "documentsAvailable": [
          "COA",
          "MSDS",
          "Product Catalogue"
        ],
        "cas": "7664-93-9",
        "specifications": {
          "Molecular Formula": "H₂SO₄",
          "Available Grades": "98%",
          "Appearance": "Colorless to slightly yellow liquid"
        },
        "relatedProducts": [
          "phosphoric-acid",
          "hydrochloric-acid"
        ]
      }
    ]
  },
  {
    "id": "edta-chemicals",
    "name": "EDTA Chemicals",
    "slug": "edta-chemicals",
    "tagline": "Chelated Micronutrients",
    "icon": "🔬",
    "description": "Mangalam Acid and Chemicals supplies a comprehensive range of EDTA-chelated micronutrients and chelating agents for agricultural, industrial and water-treatment applications. Chelated products ensure improved nutrient absorption and bioavailability for crops.",
    "applications": [
      "Micronutrient formulation for agriculture",
      "Chelated fertilizer manufacturing",
      "Water treatment and metal processing",
      "Industrial chemical processing"
    ],
    "industries": [
      "Agriculture",
      "Fertilizer industry",
      "Water treatment",
      "Industrial"
    ],
    "products": [
      {
        "id": "boron-edta",
        "name": "Boron EDTA",
        "categoryId": "edta-chemicals",
        "description": "Boron EDTA is a chelated boron source for agricultural micronutrient application.",
        "applications": [
          "Boron deficiency correction",
          "Foliar spray",
          "Micronutrient premix"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "calcium-magnesium-boron",
          "boric-acid"
        ]
      },
      {
        "id": "calcium-edta",
        "name": "Calcium EDTA",
        "categoryId": "edta-chemicals",
        "description": "Calcium EDTA provides chelated calcium for plant nutrition and is also used in pharmaceutical and industrial applications.",
        "applications": [
          "Calcium nutrition",
          "Pharmaceutical chelation therapy aid",
          "Industrial"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Calcium (Ca) Content": "[Admin-editable]",
          "Chelating Agent": "EDTA"
        },
        "relatedProducts": [
          "magnesium-edta",
          "calcium-magnesium-boron"
        ]
      },
      {
        "id": "calcium-magnesium-boron",
        "name": "Calcium Magnesium Boron EDTA",
        "categoryId": "edta-chemicals",
        "description": "A multi-micronutrient combination of calcium, magnesium, and boron for comprehensive crop nutrition via foliar or fertigation application.",
        "applications": [
          "Multi-nutrient foliar spray",
          "Fertigation",
          "Deficiency correction for Ca, Mg, B"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "boron-edta",
          "calcium-edta",
          "magnesium-edta"
        ]
      },
      {
        "id": "chelated-edta",
        "name": "Chelated EDTA",
        "categoryId": "edta-chemicals",
        "description": "A standard grade chelated EDTA micronutrient formulation for agricultural applications.",
        "applications": [
          "Micronutrient correction",
          "Foliar spray",
          "Fertigation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "edta-mixture",
          "special-grade-edta"
        ]
      },
      {
        "id": "copper-edta",
        "name": "Copper EDTA",
        "categoryId": "edta-chemicals",
        "description": "Copper EDTA is a chelated copper micronutrient for agricultural and industrial use.",
        "applications": [
          "Copper deficiency correction",
          "Micronutrient formulation",
          "Industrial"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Copper (Cu) Content": "[Admin-editable]",
          "Chelating Agent": "EDTA"
        },
        "relatedProducts": [
          "zinc-edta",
          "iron-edta"
        ]
      },
      {
        "id": "di-potassium-edta",
        "name": "Di-Potassium EDTA 98%",
        "categoryId": "edta-chemicals",
        "description": "Di-Potassium EDTA 98% is a highly water-soluble chelating agent used as a carrier for micronutrient blends and in industrial and agricultural formulations.",
        "applications": [
          "Chelating agent",
          "Industrial processing",
          "Agricultural formulations"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "iron-edta",
          "special-grade-edta"
        ]
      },
      {
        "id": "di-sodium-edta",
        "name": "Di-Sodium EDTA",
        "categoryId": "edta-chemicals",
        "description": "Di-Sodium EDTA is a widely used chelating and sequestering agent for industrial water treatment, cosmetics, and agricultural micronutrient carrier applications.",
        "applications": [
          "Chelating / sequestering agent",
          "Water treatment",
          "Industrial processing",
          "Micronutrient carrier"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "139-33-3",
        "specifications": {
          "Appearance": "White crystalline powder"
        },
        "relatedProducts": [
          "di-potassium-edta",
          "chelated-edta"
        ]
      },
      {
        "id": "edta-mixture",
        "name": "EDTA Mixture",
        "categoryId": "edta-chemicals",
        "description": "A combination of EDTA-chelated micronutrients formulated for broad-spectrum crop nutrition.",
        "applications": [
          "Multi-micronutrient nutrition",
          "Foliar spray",
          "Fertigation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "chelated-edta",
          "sulphate-mix-mh-grade"
        ]
      },
      {
        "id": "fe-eddha",
        "name": "Fe EDDHA",
        "categoryId": "edta-chemicals",
        "description": "Iron EDDHA (Fe-EDDHA) is an iron chelate stable over a wide pH range, effective for calcareous and alkaline soils.",
        "applications": [
          "Iron correction in calcareous soils",
          "High pH soil treatment",
          "Drip irrigation"
        ],
        "packaging": [
          "1 kg pouch",
          "5 kg bag",
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Iron Content (o,o)": "[Admin-editable]",
          "Total Iron": "[Admin-editable]",
          "Appearance": "Red to brown powder"
        },
        "relatedProducts": [
          "iron-edta",
          "chelated-edta-mix-fe-eddha"
        ]
      },
      {
        "id": "iron-edta",
        "name": "Iron EDTA",
        "categoryId": "edta-chemicals",
        "description": "Iron EDTA is a stable iron chelate for soil and foliar application in iron-deficient crops. Highly water-soluble and bioavailable.",
        "applications": [
          "Iron deficiency correction",
          "Foliar spray",
          "Drip fertigation"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Iron (Fe) Content": "[Admin-editable]",
          "Chelating Agent": "EDTA",
          "Appearance": "Light yellow powder"
        },
        "relatedProducts": [
          "zinc-edta",
          "manganese-edta"
        ]
      },
      {
        "id": "magnesium-edta",
        "name": "Magnesium EDTA",
        "categoryId": "edta-chemicals",
        "description": "Magnesium EDTA is a chelated magnesium source for agricultural and industrial applications.",
        "applications": [
          "Magnesium nutrition",
          "Foliar spray",
          "Industrial"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Magnesium (Mg) Content": "[Admin-editable]",
          "Chelating Agent": "EDTA"
        },
        "relatedProducts": [
          "calcium-edta",
          "iron-edta"
        ]
      },
      {
        "id": "manganese-edta",
        "name": "Manganese EDTA",
        "categoryId": "edta-chemicals",
        "description": "Manganese EDTA corrects manganese deficiency in crops and is used in micronutrient premix formulations.",
        "applications": [
          "Manganese deficiency correction",
          "Micronutrient premix",
          "Foliar spray"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Manganese (Mn) Content": "[Admin-editable]",
          "Chelating Agent": "EDTA"
        },
        "relatedProducts": [
          "iron-edta",
          "copper-edta"
        ]
      },
      {
        "id": "special-grade-edta",
        "name": "Special Grade EDTA",
        "categoryId": "edta-chemicals",
        "description": "Special Grade EDTA is a high-purity EDTA formulation for specific industrial, pharmaceutical, or agricultural requirements.",
        "applications": [
          "Industrial chelation",
          "Pharmaceutical use",
          "Specialty agriculture"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "relatedProducts": [
          "chelated-edta"
        ]
      },
      {
        "id": "zinc-edta",
        "name": "Zinc EDTA",
        "categoryId": "edta-chemicals",
        "description": "Zinc EDTA is a chelated zinc micronutrient for foliar, soil, and fertigation application in zinc-deficient crops.",
        "applications": [
          "Zinc deficiency correction",
          "Foliar spray",
          "Micronutrient premix"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Zinc (Zn) Content": "[Admin-editable]",
          "Chelating Agent": "EDTA",
          "Appearance": "White to off-white powder"
        },
        "relatedProducts": [
          "iron-edta",
          "copper-edta"
        ]
      }
    ]
  },
  {
    "id": "pharmaceuticals-chemicals",
    "name": "Pharmaceuticals Chemicals",
    "slug": "pharmaceuticals-chemicals",
    "tagline": "High Purity, Trusted Quality, Healthcare Focused",
    "icon": "💊",
    "description": "Mangalam Acid and Chemicals supplies pharmaceutical-grade chemicals meeting USP/IP and industry standards for formulations, nutraceuticals and iron/mineral supplementation.",
    "applications": [
      "Pharmaceutical formulations",
      "Nutraceuticals",
      "Iron & mineral supplementation",
      "Injection and IV solutions"
    ],
    "industries": [
      "Pharmaceutical",
      "Nutraceutical",
      "Healthcare"
    ],
    "products": [
      {
        "id": "ferric-pyrophosphate",
        "name": "Ferric Pyrophosphate",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Ferric Pyrophosphate is used in iron fortification of foods and pharmaceutical formulations for iron supplementation.",
        "applications": [
          "Iron fortification",
          "Pharmaceutical iron supplements",
          "Nutraceuticals",
          "IV iron formulations"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Appearance": "Off-white to yellowish powder",
          "Iron (Fe) Content": "[Admin-editable]"
        },
        "relatedProducts": [
          "ferrous-fumarate-pure",
          "zinc-sulphate-mono-usp"
        ]
      },
      {
        "id": "ferrous-fumarate-pure",
        "name": "Ferrous Fumarate (Pure Grade)",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Ferrous Fumarate Pure Grade is an iron supplement compound used in pharmaceutical iron deficiency formulations including tablets and capsules.",
        "applications": [
          "Iron deficiency anemia treatment",
          "Pharmaceutical tablet formulations",
          "Nutraceutical iron supplements"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue",
          "USP specification on request"
        ],
        "cas": "141-01-5",
        "specifications": {
          "Molecular Formula": "C₄H₂FeO₄",
          "Iron (Fe) Content": "[Admin-editable]",
          "Appearance": "Reddish-brown powder",
          "Grade": "Pure / Pharmaceutical"
        },
        "relatedProducts": [
          "ferric-pyrophosphate",
          "zinc-sulphate-mono-usp"
        ]
      },
      {
        "id": "ferrous-sulphate-ip-pharma",
        "name": "Ferrous Sulphate (IP / Pure Grade)",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Ferrous Sulphate IP/Pure Grade complies with pharmacopoeial (IP) standards for use in pharmaceutical iron supplement formulations and nutraceuticals.",
        "applications": [
          "Pharmaceutical iron supplement formulations",
          "Nutraceuticals",
          "Iron deficiency anemia treatment"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "IP Specification on request",
          "Product Catalogue"
        ],
        "cas": "7720-78-7",
        "specifications": {
          "Molecular Formula": "FeSO₄·7H₂O",
          "Grade": "IP / Pure",
          "Appearance": "Blue-green crystalline powder"
        },
        "relatedProducts": [
          "ferrous-fumarate-pure",
          "ferric-pyrophosphate"
        ]
      },
      {
        "id": "fumaric-acid-pharma",
        "name": "Fumaric Acid",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Fumaric Acid (C₄H₄O₄) used in food acidulant, pharmaceutical excipient, and polymer manufacturing applications.",
        "applications": [
          "Pharmaceutical excipient",
          "Food acidulant",
          "Polymer manufacturing",
          "Coating applications"
        ],
        "packaging": [
          "25 kg bag",
          "50 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "110-17-8",
        "specifications": {
          "Molecular Formula": "C₄H₄O₄",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable]"
        },
        "relatedProducts": [
          "ferrous-fumarate-pure",
          "citric-acid"
        ]
      },
      {
        "id": "magnesium-citrate",
        "name": "Magnesium Citrate",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Magnesium Citrate is used in pharmaceutical and nutraceutical magnesium supplement formulations due to its high bioavailability.",
        "applications": [
          "Pharmaceutical magnesium supplements",
          "Nutraceuticals"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "specifications": {
          "Appearance": "White powder"
        },
        "relatedProducts": [
          "sodium-citrate"
        ]
      },
      {
        "id": "sodium-citrate",
        "name": "Sodium Citrate",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Sodium Citrate is used as a buffering and anticoagulant agent in pharmaceutical formulations, and as a food-grade acidity regulator.",
        "applications": [
          "Pharmaceutical buffering agent",
          "Anticoagulant in blood collection",
          "Food-grade acidity regulator"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "Product Catalogue"
        ],
        "cas": "68-04-2",
        "specifications": {
          "Appearance": "White crystalline powder"
        },
        "relatedProducts": [
          "magnesium-citrate",
          "fumaric-acid-pharma"
        ]
      },
      {
        "id": "zinc-sulphate-mono-usp",
        "name": "Zinc Sulphate Mono Hydrate 35.5% (USP Grade)",
        "categoryId": "pharmaceuticals-chemicals",
        "description": "Zinc Sulphate Monohydrate 36% USP Grade meets United States Pharmacopoeia standards for use in pharmaceutical formulations and parenteral zinc supplementation.",
        "applications": [
          "Pharmaceutical zinc supplement formulations",
          "Parenteral nutrition",
          "Dermatological zinc preparations",
          "Nutraceuticals"
        ],
        "packaging": [
          "25 kg bag"
        ],
        "documentsAvailable": [
          "COA",
          "USP Specification",
          "Product Catalogue"
        ],
        "cas": "7446-19-7",
        "specifications": {
          "Molecular Formula": "ZnSO₄·H₂O",
          "Zinc (Zn) Content": "~35.5%",
          "Grade": "USP",
          "Appearance": "White crystalline powder",
          "Purity": "[Admin-editable per USP standard]"
        },
        "relatedProducts": [
          "ferrous-fumarate-pure",
          "ferric-pyrophosphate"
        ]
      }
    ]
  }
];

export const getAllProducts = (): (Product & { categorySlug: string })[] => {
  return categories.flatMap((cat) => cat.products.map((p) => ({ ...p, categorySlug: cat.slug })));
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

/** For a cross-reference category (e.g. Water Treatment), resolve its
 * crossLinks product ids to the actual product + the category that owns it. */
export const getCrossLinkedProducts = (
  cat: Category
): { product: Product; ownerSlug: string; ownerName: string }[] => {
  if (!cat.crossLinks) return [];
  return cat.crossLinks
    .map((id) => {
      const owner = categories.find((c) => c.products.some((p) => p.id === id));
      const product = owner?.products.find((p) => p.id === id);
      if (!owner || !product) return null;
      return { product, ownerSlug: owner.slug, ownerName: owner.name };
    })
    .filter((x): x is { product: Product; ownerSlug: string; ownerName: string } => Boolean(x));
};

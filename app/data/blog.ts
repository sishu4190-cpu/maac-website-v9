export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-coa-in-chemical-procurement',
    title: 'What is a Certificate of Analysis (COA) in Chemical Procurement?',
    description: 'A Certificate of Analysis is a key quality document in B2B chemical procurement. This article explains what a COA contains, why buyers need it, and how to request one from your chemical supplier.',
    category: 'Quality & Documentation',
    date: '2025-06-01',
    readTime: '5 min read',
    content: `
A Certificate of Analysis (COA) is an official quality document issued by a supplier or testing laboratory that confirms a chemical product meets its stated specification for a specific production batch.

## What a COA Contains

A standard COA for an industrial or agro chemical typically includes:

- **Product name and chemical formula**
- **Batch or lot number**
- **Date of manufacture and analysis**
- **Test parameters** (purity, assay, moisture content, pH, mesh size, solubility, heavy metals, etc. depending on the product)
- **Test results** with units
- **Specification limits** (pass/fail against declared spec)
- **Method of analysis** (titration, ICP, HPLC, gravimetric, etc.)
- **Authorised signatory** from the quality control department

## Why COA Matters for Buyers

Industrial buyers in regulated industries — agriculture, fertilizer, pharma, food, water treatment — need COA to:

- Verify they are receiving the grade and purity they paid for
- Fulfil regulatory compliance requirements for the end product
- Support audit trails in ISO-certified or GMP operations
- Protect against receiving off-spec material

A COA is particularly important when buying chemicals for pharmaceutical or food-grade applications where contamination or off-spec purity could cause serious downstream problems.

## How to Request a COA from Mangalam Acid and Chemicals

At Mangalam Acid and Chemicals, COA is available for all products on request. When requesting a COA, mention:

1. Product name and grade required
2. Your order quantity
3. Batch reference (if referencing a specific prior order)
4. Specific parameters you need tested (e.g., purity min 98%, Fe content max 0.001%)

You can request COA documentation via our contact form or by emailing mangalamacidandchemicals@gmail.com.

## COA vs MSDS — What is the Difference?

A COA confirms product quality and specification. An MSDS (Material Safety Data Sheet) covers safety information — safe handling, storage, transport classification, emergency response, and health hazards. Both are different documents and serve different purposes. Regulated industries often need both.
    `.trim(),
  },
  {
    slug: 'what-is-msds-and-why-important',
    title: 'What is MSDS and Why is it Important in Chemical Supply?',
    description: 'MSDS (Material Safety Data Sheet) is a mandatory document for hazardous chemical supply and transport. Learn what MSDS covers, who needs it, and when to request it from your supplier.',
    category: 'Quality & Documentation',
    date: '2025-06-08',
    readTime: '4 min read',
    content: `
An MSDS (Material Safety Data Sheet), now more commonly referred to as SDS (Safety Data Sheet) under the GHS (Globally Harmonized System) standard, is a technical document that provides comprehensive safety and handling information for a chemical product.

## What MSDS Covers

A standard MSDS/SDS contains 16 sections:

1. Identification (product name, supplier, intended use)
2. Hazard identification (GHS classification, warning symbols)
3. Composition / ingredients
4. First aid measures
5. Fire fighting measures
6. Accidental release measures
7. Handling and storage
8. Exposure controls / personal protection
9. Physical and chemical properties
10. Stability and reactivity
11. Toxicological information
12. Ecological information
13. Disposal considerations
14. Transport information (UN number, hazard class, packing group)
15. Regulatory information
16. Other information

## Who Needs MSDS?

MSDS is required by:

- **Transport companies** carrying hazardous chemicals (road, rail, sea, air)
- **Warehouse and storage operators** handling chemicals
- **Industrial buyers** under OSHA, factory compliance requirements
- **Export buyers** for customs and border compliance
- **Quality and EHS teams** in regulated industries

Even for non-hazardous chemicals, SDS documents are good practice in B2B procurement.

## When to Request MSDS from Your Supplier

Request MSDS whenever:

- You are placing a first order for a new chemical
- You need to update your chemical register / COSHH assessment
- Your logistics provider requires hazardous goods documentation
- You are exporting or importing the chemical across borders
- Your EHS team requires updated documentation

Mangalam Acid and Chemicals can provide MSDS for products in our catalogue on request. Contact us with the product name and your use case.
    `.trim(),
  },
  {
    slug: 'how-to-choose-sulphate-chemical-supplier',
    title: 'How to Choose the Right Sulphate Chemical Supplier for Your Business',
    description: 'Selecting the right sulphate chemical supplier affects product quality, delivery reliability and total procurement cost. This guide covers what industrial buyers should evaluate before choosing a supplier.',
    category: 'Procurement Guidance',
    date: '2025-06-15',
    readTime: '6 min read',
    content: `
Sulphate chemicals — including zinc sulphate, ferrous sulphate, magnesium sulphate, copper sulphate, and others — are widely used across agriculture, fertilizer manufacturing, water treatment, and industrial applications. Selecting the right supplier is a decision that affects product quality, supply continuity, and long-term procurement cost.

## 1. Verify the Supplier's Product Grade and Quality Standards

Not all sulphate chemicals are the same. Grade matters significantly:

- **Agricultural grade** vs **industrial grade** vs **pharmaceutical grade** may have very different purity and impurity limits
- Ask for a COA (Certificate of Analysis) for the specific grade you need
- Check if the supplier is ISO certified — ISO 9001:2015 certification indicates a quality management system is in place

## 2. Check for Consistent Bulk Supply Capability

One-off supply is easy. Consistent, reliable bulk supply is harder to find. Ask:

- What is the minimum order quantity (MOQ)?
- Can you supply on a regular schedule (monthly, quarterly)?
- What happens during peak demand seasons?
- Do you have inventory or do you source on order?

## 3. Evaluate Documentation Transparency

A reliable supplier should be able to provide:

- Certificate of Analysis (COA) per batch
- MSDS or SDS for hazardous products
- Packaging confirmation
- Dispatch and delivery documentation

Reluctance to share COA is a warning sign.

## 4. Assess Location and Logistics

A supplier located near a major chemical hub — such as Vapi, Gujarat — typically has better logistics connectivity, lower freight cost to most Indian industrial belts, and faster lead times for urgent orders.

Vapi is India's one of the largest chemical industrial areas, offering good road and rail connectivity to Gujarat, Maharashtra, Rajasthan and other states.

## 5. Evaluate Certifications and Registrations

Look for:

- ISO 9001:2015 (Quality Management)
- MSME registration (indicates legitimate small/medium business)
- D&B DUNS registration (for trade verification)
- IndiaMart TrustSEAL (buyer-verified trust rating)

Mangalam Acid and Chemicals holds ISO 9001:2015 (IN59785A), ISO 45001:2018 (IN59785C-1), MSME UDYAM (GJ-25-0006759), D&B DUNS 813884357, and IndiaMart TrustSEAL.

## 6. Request References or Check Reviews

IndiaMart reviews, buyer testimonials, and word-of-mouth recommendations from other industry buyers are valuable indicators of actual supplier reliability.
    `.trim(),
  },
  {
    slug: 'difference-industrial-grade-vs-agricultural-grade-chemicals',
    title: 'Industrial Grade vs Agricultural Grade Chemicals: Key Differences for Buyers',
    description: 'Industrial grade and agricultural grade chemicals differ in purity levels, impurity limits, and permitted uses. Understanding the difference helps buyers choose the right product and avoid compliance issues.',
    category: 'Procurement Guidance',
    date: '2025-06-22',
    readTime: '5 min read',
    content: `
One of the most common questions from industrial and agro chemical buyers is: what is the difference between industrial grade and agricultural grade chemicals? The answer affects product performance, compliance, and pricing.

## The Key Difference: Purity and Impurity Limits

Grade classification in chemicals is primarily determined by:

- **Minimum purity (assay)** — the percentage of the active compound
- **Maximum impurity limits** — permissible levels of heavy metals, insoluble matter, and other contaminants
- **Permitted applications** — some grades are restricted from use in food, pharma, or soil-applied products

For example, Zinc Sulphate Heptahydrate 21% used for agriculture must meet fertilizer control order specifications with defined limits on lead, cadmium and arsenic. Industrial grade zinc sulphate may have looser heavy metal limits and is not permitted for soil application in India.

## Common Grade Classifications

| Grade | Typical Use |
|---|---|
| Technical Grade | General industrial processing, not food/pharma/soil use |
| Industrial Grade | Manufacturing, electroplating, water treatment |
| Agricultural / Fertilizer Grade | Soil application, foliar spray, fertilizer manufacturing |
| USP Grade | Pharmaceutical formulations — meets United States Pharmacopeia |
| Pharmaceutical Grade | Drug and supplement formulations — meets Pharmacopeia standards |

## Why Grade Matters in Practice

1. **Regulatory compliance** — using wrong grade in food, pharma or agriculture may violate regulations
2. **Product performance** — higher impurity in a chelated micronutrient can affect plant absorption
3. **Downstream product quality** — pharma manufacturers using wrong grade risk batch rejection
4. **Cost** — higher grade products typically cost more; don't pay for pharma grade when technical grade is sufficient

## How to Specify Grade in Your Enquiry

When sending a bulk chemical enquiry, always specify:

- Product name (e.g., Zinc Sulphate Heptahydrate)
- Grade required (e.g., Agricultural Grade / 21% Zn min)
- Key specification parameters if known (e.g., Pb max 50 ppm, Cd max 10 ppm)
- End use / application

At Mangalam Acid and Chemicals, we supply chemicals in multiple grades. Contact us with your specification and we will advise on the appropriate grade and available documentation.
    `.trim(),
  },
  {
    slug: 'what-to-mention-in-bulk-chemical-enquiry',
    title: 'What Details Should Buyers Mention in a Bulk Chemical Enquiry?',
    description: 'A complete bulk chemical enquiry gets faster, more accurate quotes. Learn what information to include when contacting a supplier for bulk chemical pricing and availability.',
    category: 'Procurement Guidance',
    date: '2025-07-01',
    readTime: '4 min read',
    content: `
A well-structured bulk chemical enquiry helps suppliers respond faster with accurate pricing, correct grade recommendations, and availability confirmation. Incomplete enquiries often result in multiple rounds of back-and-forth before a quote can be issued.

## Essential Information to Include

### 1. Product Name
Use the chemical name, not a brand or trade name if possible. Include the grade or specification if known.

Example: "Zinc Sulphate Heptahydrate 21% Agricultural Grade" — not just "zinc sulphate."

### 2. Quantity Required
State the quantity clearly with unit:
- 500 kg
- 5 MT (metric tonnes)
- 1 FCL (full container load)
- 10 bags (specify bag size)

Also mention if this is a one-time requirement or regular recurring purchase.

### 3. Packaging Preference
State your preferred packaging:
- 25 kg HDPE bag
- 50 kg bag
- 500 kg jumbo bag
- IBC or drum
- Bulk tanker

### 4. Delivery Location
Include:
- City and state
- Whether it is a factory delivery or railway yard delivery
- For export: destination port and country

### 5. Grade / Specification
If you have a target specification sheet or COA template, attach it. Otherwise mention:
- Minimum purity required
- Maximum impurity limits for key parameters (e.g., heavy metals for agriculture)
- Any standard the product must meet (e.g., Fertilizer Control Order, USP, BIS)

### 6. Application / End Use
Mentioning your end use helps the supplier recommend the right grade. For example:
- "For NPK fertilizer blending" → agricultural grade
- "For electroplating bath" → industrial grade
- "For pharmaceutical tablet formulation" → USP grade

### 7. Required Documentation
Mention upfront if you need COA, MSDS, or other documentation with the order.

## Sample Enquiry Template

> Subject: Bulk Enquiry – Ferrous Sulphate Heptahydrate
>
> Dear Mangalam Acid and Chemicals,
>
> We require Ferrous Sulphate Heptahydrate for water treatment application. Please quote for:
> - Product: Ferrous Sulphate Heptahydrate
> - Grade: Technical / Water Treatment Grade
> - Quantity: 10 MT per month (regular requirement)
> - Packaging: 50 kg HDPE bags
> - Delivery: Ahmedabad, Gujarat
> - Documentation: COA required with each batch
>
> Please share your best price and lead time. Company name: [Your Company], Contact: [Name], Mobile: [Number]

Sending a structured enquiry like this typically results in a response within one business day from a responsive supplier.
    `.trim(),
  },
  {
    slug: 'zinc-sulphate-heptahydrate-uses-specifications',
    title: 'Zinc Sulphate Heptahydrate 21%: Uses, Specifications and Packaging Guide',
    description: 'Zinc Sulphate Heptahydrate 21% is one of the most widely used micronutrient chemicals in agriculture and industrial applications. This guide covers its uses, key specifications, packaging options and how to source it in bulk.',
    category: 'Product Guides',
    date: '2025-07-08',
    readTime: '5 min read',
    content: `
Zinc Sulphate Heptahydrate (ZnSO₄·7H₂O) with 21% zinc content is one of the most commonly used micronutrient chemicals in agriculture, fertilizer manufacturing and industrial applications. It is a water-soluble white to light-coloured crystalline powder with broad application across multiple industries.

## Key Properties

- **Chemical formula**: ZnSO₄·7H₂O
- **Zinc content**: Minimum 21% (agricultural grade)
- **Appearance**: White or light coloured crystalline powder or granules
- **Solubility**: Freely soluble in water
- **CAS Number**: 7446-20-0

## Applications

### Agriculture
Zinc Sulphate Heptahydrate is applied as a soil corrective to address zinc deficiency in crops. Zinc is an essential micronutrient for plant growth, enzyme activation, protein synthesis and overall crop productivity. It is commonly used in:

- Soil broadcasting before planting
- Basal application mixed with fertilizers
- Drip irrigation / fertigation systems
- Foliar spray (at lower concentrations)
- Micronutrient mixture formulations

### Fertilizer Manufacturing
Manufacturers of complex fertilizers, micronutrient mixtures and crop nutrition blends use Zinc Sulphate Heptahydrate as a source of zinc in their formulations.

### Water Treatment
Zinc compounds are used in specific water treatment applications including corrosion inhibition in cooling tower water systems.

### Industrial Use
Industrial applications include galvanising processes, rubber vulcanisation, wood preservation and textile mordanting.

## Key Specifications (Agricultural Grade)

| Parameter | Specification |
|---|---|
| Zinc (Zn) as ZnSO₄·7H₂O | Min 21% |
| Moisture | Max [Admin editable] |
| Water insoluble matter | Max [Admin editable] |
| Lead (Pb) | Max [Admin editable] |
| Cadmium (Cd) | Max [Admin editable] |

*Exact specification values are batch-confirmed. Request COA for confirmed analysis.*

## Packaging Options

Zinc Sulphate Heptahydrate is available in:
- 25 kg HDPE bags
- 50 kg HDPE bags
- Jumbo bags (500 kg or 1 MT)
- As per buyer requirement for large-volume orders

## How to Buy Zinc Sulphate Heptahydrate from Mangalam Acid and Chemicals

Mangalam Acid and Chemicals supplies Zinc Sulphate Heptahydrate in agricultural and industrial grade from Vapi, Gujarat. We supply to buyers across India including Gujarat, Maharashtra, Rajasthan, Madhya Pradesh, Andhra Pradesh and other states.

To place an enquiry, provide:
- Grade required (agricultural / industrial)
- Quantity (in kg or MT)
- Packaging preference
- Delivery location

COA is available on request.
    `.trim(),
  },
  {
    slug: 'common-mistakes-sourcing-industrial-chemicals',
    title: 'Common Mistakes Buyers Make While Sourcing Industrial Chemicals',
    description: 'Industrial chemical procurement mistakes can cost money, delay production, and create compliance risks. This article covers the most common errors and how to avoid them.',
    category: 'Procurement Guidance',
    date: '2025-07-15',
    readTime: '5 min read',
    content: `
Industrial chemical procurement, especially for bulk buyers, involves more complexity than general commodity purchasing. Here are the most common mistakes buyers make — and how to avoid them.

## 1. Not Specifying the Grade

Buying "zinc sulphate" without specifying the grade can result in receiving a product that is either over-specified (paying for USP grade when agricultural grade is sufficient) or under-specified (receiving industrial grade when agricultural grade is required by regulation).

**Fix:** Always specify the minimum purity, key parameters, and end application.

## 2. Ignoring COA Until There is a Problem

Many buyers only ask for COA after receiving a complaint from their production team or customer. By then, the batch may already be used.

**Fix:** Make COA a standard requirement for every batch. Specify it in your purchase order terms.

## 3. Comparing Prices Without Matching Specifications

Price comparison is meaningless if the specifications are not matched. A cheaper "zinc sulphate" may be a different grade, different purity, or different hydrate form — none of which are equivalent products.

**Fix:** Compare price only after confirming the product name, grade, purity, and packaging are identical.

## 4. Not Mentioning Delivery Location Clearly

Freight cost can vary significantly depending on the distance from the supplier's location and the delivery mode. Buyers sometimes get surprised by freight costs not included in the quoted price.

**Fix:** Always mention exact delivery address, mode preference, and whether you need door delivery or railway station delivery. Confirm whether the quoted price is ex-works or delivered.

## 5. Ordering Without Checking the Supplier's Credentials

Buying from an unverified supplier creates risk of receiving counterfeit, adulterated, or mislabelled products.

**Fix:** Before the first order, verify ISO certification, business registration, IndiaMart TrustSEAL or similar third-party verification. Request a sample for testing if the volume is significant.

## 6. Not Mentioning Packaging Requirements

Chemicals are available in different packaging formats — 25 kg bags, 50 kg bags, jumbo bags, drums, IBCs, bulk tankers. Receiving the wrong packaging can create material handling issues on the plant floor.

**Fix:** Always specify packaging type and size in your enquiry.

## 7. Assuming All Suppliers Have the Same Lead Time

Stock availability and lead times vary by supplier, product, and season. Agricultural chemical demand spikes in crop seasons, which can affect availability and price.

**Fix:** Communicate your required delivery timeline upfront and ask the supplier to confirm lead time and current stock position.
    `.trim(),
  },
  {
    slug: 'why-product-grade-matters-b2b-chemical-sourcing',
    title: 'Why Product Grade Matters in B2B Chemical Sourcing',
    description: 'Product grade is one of the most important factors in B2B chemical procurement. Using the wrong grade can affect product quality, regulatory compliance, and production efficiency.',
    category: 'Procurement Guidance',
    date: '2025-07-22',
    readTime: '4 min read',
    content: `
In B2B chemical sourcing, grade is not just a label — it is a specification that defines purity, impurity limits, and permitted end use. For industrial buyers, using the wrong grade can result in production problems, regulatory non-compliance, or product rejection by customers.

## What Grade Actually Means

Grade is a quality classification that determines:

- **Minimum assay / purity** of the active compound
- **Maximum impurity limits** for specific contaminants (heavy metals, insoluble matter, moisture, etc.)
- **Compliance with a recognised standard** (USP, IP, Fertilizer Control Order, BIS, ACS, etc.)
- **Intended use category** (food, pharma, agricultural, industrial)

Two products with the same chemical name but different grades can have very different compositions and compliance status.

## Grade Examples Across Industries

**Agriculture:** Zinc Sulphate for soil application must meet Fertilizer Control Order limits on heavy metals (lead, cadmium, arsenic). Industrial grade zinc sulphate with higher heavy metal content is not permitted for soil application under Indian FCO regulations.

**Pharmaceuticals:** A pharmaceutical grade product must conform to USP (United States Pharmacopeia), IP (Indian Pharmacopeia), or BP (British Pharmacopeia) monographs. These define specific limits on impurities that could affect drug safety. Technical grade products are not acceptable in pharmaceutical manufacturing.

**Water Treatment:** Ferrous sulphate for municipal drinking water treatment typically needs to meet water treatment grade specifications to avoid introducing harmful contaminants into the water supply.

## How to Communicate Grade in Procurement

When sourcing bulk chemicals, always include in your enquiry:

1. The standard or grade designation: "Agricultural Grade", "Technical Grade", "USP Grade", "Water Treatment Grade"
2. Key specification parameters: minimum purity, maximum impurity limits for critical parameters
3. Your end application: this helps the supplier confirm the appropriate grade

A good supplier will not just confirm grade availability — they will also flag if the requested grade may not suit your stated application.

## Mangalam Acid and Chemicals: Multiple Grades Available

Mangalam Acid and Chemicals supplies chemicals in multiple grades across categories. When you submit an enquiry, mention your grade requirement clearly and we will confirm availability, pricing, and documentation requirements.
    `.trim(),
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}

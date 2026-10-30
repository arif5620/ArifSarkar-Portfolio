export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Buying" | "Selling" | "Renting" | "Market";
  date: string;
  readMinutes: number;
  image: string;
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`;

export const articles: Article[] = [
  {
    slug: "buying-apartment-in-dhaka-guide",
    title: "Buying an Apartment in Dhaka: A Step-by-Step Guide",
    excerpt: "From setting a budget to checking the deed and registration — everything you should do before you pay a single taka.",
    category: "Buying",
    date: "2026-10-20",
    readMinutes: 7,
    image: unsplash("1545169734-58a4a6353ccb"),
    sections: [
      {
        heading: "1. Set a clear budget",
        paragraphs: [
          "Your budget is more than the flat price. Add registration costs, stamp duty, utility connection charges, parking, interior work and moving costs. Many buyers forget these and end up stretched.",
          "If you plan to take a home loan, talk to a bank first so you know exactly how much you can borrow and what your monthly installment will be.",
        ],
      },
      {
        heading: "2. Choose the right area",
        paragraphs: [
          "Think about your daily life: office distance, schools, hospitals, markets and traffic. Gulshan and Banani offer prestige, Bashundhara and Uttara offer planned living, while Dhanmondi and Mohammadpur offer central convenience.",
        ],
      },
      {
        heading: "3. Verify the documents",
        paragraphs: ["Never skip this step. Ask for copies and have a lawyer check them:"],
        points: [
          "Title deed (dolil) and the chain of previous deeds",
          "Khatian records (CS, SA, RS and city survey)",
          "Mutation (namjari) and up-to-date land tax receipts",
          "RAJUK-approved building plan",
          "Joint venture agreement between the landowner and developer, for new projects",
        ],
      },
      {
        heading: "4. Inspect the property in person",
        paragraphs: [
          "Visit at different times of day. Check water pressure, natural light, ventilation, lift and generator backup, parking and the quality of construction materials.",
        ],
      },
      {
        heading: "5. Negotiate and close safely",
        paragraphs: [
          "Get every promise in writing — handover date, fittings, parking and payment schedule. Pay through bank transfers, not cash, and complete registration at the sub-registry office.",
          "A good Realtor handles the shortlisting, negotiation and paperwork so you can focus on choosing the right home.",
        ],
      },
    ],
  },
  {
    slug: "dhaka-chattogram-cumilla-where-to-invest",
    title: "Dhaka, Chattogram or Cumilla: Where Should You Invest?",
    excerpt: "Three cities, three very different opportunities. A simple comparison to help you decide where your money works hardest.",
    category: "Market",
    date: "2026-10-12",
    readMinutes: 6,
    image: unsplash("1565953522043-baea26b83b7e"),
    sections: [
      {
        heading: "Dhaka — the capital of demand",
        paragraphs: [
          "Dhaka has the deepest market in the country. Demand for apartments and offices stays strong, which makes resale and renting easier. Prices are the highest, so careful area selection matters.",
        ],
        points: ["Best for: resale value, rental income, family homes", "Watch: traffic, building approvals, high entry price"],
      },
      {
        heading: "Chattogram — the port city on the rise",
        paragraphs: [
          "As the country's commercial port city, Chattogram attracts business and industrial demand. Areas close to major roads and new infrastructure are worth watching.",
        ],
        points: ["Best for: commercial space, long-term growth", "Watch: location-specific risks like waterlogging"],
      },
      {
        heading: "Cumilla — the value opportunity",
        paragraphs: [
          "Sitting on the Dhaka–Chattogram corridor, Cumilla offers far lower entry prices with steady local demand. It suits buyers looking for land, family homes or a first investment.",
        ],
        points: ["Best for: land, affordable homes, early investment", "Watch: slower resale compared to Dhaka"],
      },
      {
        heading: "So which one is right for you?",
        paragraphs: [
          "It depends on your goal, budget and timeline. Tell me what you want to achieve and I will show you real options in all three cities.",
        ],
      },
    ],
  },
  {
    slug: "renting-flat-in-dhaka-checklist",
    title: "Renting a Flat in Dhaka: 10 Things to Check Before You Sign",
    excerpt: "Avoid surprises after you move in. A practical checklist for tenants — from advance payments to the gas line.",
    category: "Renting",
    date: "2026-10-05",
    readMinutes: 5,
    image: unsplash("1455593984172-9f753a2e1ebd"),
    sections: [
      {
        heading: "The checklist",
        paragraphs: ["Before you pay the advance, walk through this list with the landlord:"],
        points: [
          "Monthly rent, advance amount and how the advance will be adjusted",
          "Service charge and what it covers (security, lift, generator, cleaning)",
          "Gas connection type — line gas or cylinder",
          "Water supply and pressure on your floor",
          "Electricity meter — prepaid or postpaid, and separate or shared",
          "Parking space and whether it is included in the rent",
          "Notice period for leaving and for rent increases",
          "Rules on guests, pets and bachelors",
          "Condition of fittings — take photos before moving in",
          "A written rental agreement signed by both sides",
        ],
      },
      {
        heading: "Why a written agreement matters",
        paragraphs: [
          "Most rental disputes in Dhaka come from verbal promises. A simple written agreement protects both tenant and landlord, and makes the advance refund clear when you leave.",
        ],
      },
    ],
  },
  {
    slug: "sell-your-property-faster",
    title: "How to Sell Your Property Faster at the Right Price",
    excerpt: "Pricing, presentation and paperwork — the three things that decide how quickly your property sells.",
    category: "Selling",
    date: "2026-09-28",
    readMinutes: 5,
    image: unsplash("1494526585095-c41746248156"),
    sections: [
      {
        heading: "Price it right from day one",
        paragraphs: [
          "Overpriced properties sit on the market and lose buyer interest. Compare recent sales in your area — not just asking prices — and set a realistic price with a little room to negotiate.",
        ],
      },
      {
        heading: "Present it well",
        paragraphs: ["First impressions decide whether a buyer visits:"],
        points: [
          "Clean, declutter and fix small repairs",
          "Take bright, wide photos in daylight",
          "Highlight what buyers care about — light, ventilation, parking, location",
        ],
      },
      {
        heading: "Keep your papers ready",
        paragraphs: [
          "Serious buyers ask for documents early. Having your deed, khatian, mutation and tax receipts ready builds trust and speeds up the deal.",
          "Want a free, honest valuation of your property? Send me a message on WhatsApp.",
        ],
      },
    ],
  },
];

export const formatDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

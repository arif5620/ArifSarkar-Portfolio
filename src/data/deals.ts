export type Deal = {
  area: string;
  city: "Dhaka" | "Chattogram" | "Cumilla";
  lat: number;
  lon: number;
  type: string; // e.g. "3-bed apartment", "Land plot", "Office space"
  year: number;
};

// Add Arif's real closed deals here. Only this list is shown on the live site.
export const deals: Deal[] = [];

// Preview-only examples so the map can be styled before real data exists; never shown in production.
export const sampleDeals: Deal[] = [
  { area: "Gulshan", city: "Dhaka", lat: 23.7925, lon: 90.4078, type: "Apartment", year: 2026 },
  { area: "Uttara", city: "Dhaka", lat: 23.8759, lon: 90.3795, type: "Duplex", year: 2026 },
  { area: "Bashundhara", city: "Dhaka", lat: 23.8193, lon: 90.4526, type: "Apartment", year: 2025 },
  { area: "Dhanmondi", city: "Dhaka", lat: 23.7465, lon: 90.376, type: "Rental", year: 2026 },
  { area: "Mirpur", city: "Dhaka", lat: 23.8223, lon: 90.3654, type: "Apartment", year: 2025 },
  { area: "Purbachal", city: "Dhaka", lat: 23.85, lon: 90.53, type: "Land plot", year: 2025 },
  { area: "Khulshi", city: "Chattogram", lat: 22.36, lon: 91.81, type: "Apartment", year: 2026 },
  { area: "Agrabad", city: "Chattogram", lat: 22.3256, lon: 91.8086, type: "Office space", year: 2025 },
  { area: "Nasirabad", city: "Chattogram", lat: 22.3667, lon: 91.8227, type: "Shop", year: 2026 },
  { area: "Kandirpar", city: "Cumilla", lat: 23.4607, lon: 91.1809, type: "Land plot", year: 2026 },
  { area: "Kotbari", city: "Cumilla", lat: 23.43, lon: 91.13, type: "House", year: 2025 },
];

// Same projection as the map outline in bdMap.ts (400px wide viewBox).
const K = Math.cos((23.7 * Math.PI) / 180);
const S = 400 / ((92.7 - 88) * K);
export const project = (lat: number, lon: number) => ({ x: (lon - 88) * K * S, y: (26.7 - lat) * S });

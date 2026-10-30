export type Property = {
  id: string;
  type: "sale" | "rent";
  title: string;
  area: string;
  price: string;
  beds: number;
  baths: number;
  size: string;
  kind: string;
  image: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const heroImage = unsplash("1748063578185-3d68121b11ff");

// SAMPLE LISTINGS with stock photos (Unsplash) — replace with real inventory.
export const properties: Property[] = [
  { id: "gulshan-2-apt", type: "sale", title: "Luxury Apartment", area: "Gulshan 2, Dhaka", price: "৳ 3.5 Crore", beds: 4, baths: 4, size: "2,800 sqft", kind: "Apartment", image: unsplash("1545169734-58a4a6353ccb") },
  { id: "bashundhara-flat", type: "sale", title: "Modern Family Flat", area: "Bashundhara R/A, Dhaka", price: "৳ 1.4 Crore", beds: 3, baths: 3, size: "1,650 sqft", kind: "Apartment", image: unsplash("1595330449916-e7c3e1962bd3") },
  { id: "uttara-duplex", type: "sale", title: "Corner Duplex Home", area: "Uttara Sector 7, Dhaka", price: "৳ 4.2 Crore", beds: 5, baths: 5, size: "3,400 sqft", kind: "Duplex", image: unsplash("1494526585095-c41746248156") },
  { id: "banani-rent", type: "rent", title: "Furnished Apartment", area: "Banani, Dhaka", price: "৳ 85,000 / month", beds: 3, baths: 3, size: "2,100 sqft", kind: "Apartment", image: unsplash("1455593984172-9f753a2e1ebd") },
  { id: "dhanmondi-rent", type: "rent", title: "Spacious Family Flat", area: "Dhanmondi, Dhaka", price: "৳ 45,000 / month", beds: 3, baths: 2, size: "1,500 sqft", kind: "Apartment", image: unsplash("1680416124510-5eae1beca412") },
  { id: "gulshan-office", type: "rent", title: "Premium Office Space", area: "Gulshan 1, Dhaka", price: "৳ 1,20,000 / month", beds: 0, baths: 2, size: "2,000 sqft", kind: "Commercial", image: unsplash("1497366811353-6870744d04b2") },
];

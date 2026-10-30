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
};

// SAMPLE LISTINGS — replace with real inventory before launch.
export const properties: Property[] = [
  { id: "gulshan-2-apt", type: "sale", title: "Luxury Apartment", area: "Gulshan 2, Dhaka", price: "৳ 3.5 Crore", beds: 4, baths: 4, size: "2,800 sqft", kind: "Apartment" },
  { id: "bashundhara-flat", type: "sale", title: "Modern Family Flat", area: "Bashundhara R/A, Dhaka", price: "৳ 1.4 Crore", beds: 3, baths: 3, size: "1,650 sqft", kind: "Apartment" },
  { id: "uttara-duplex", type: "sale", title: "Corner Duplex Home", area: "Uttara Sector 7, Dhaka", price: "৳ 4.2 Crore", beds: 5, baths: 5, size: "3,400 sqft", kind: "Duplex" },
  { id: "banani-rent", type: "rent", title: "Furnished Apartment", area: "Banani, Dhaka", price: "৳ 85,000 / month", beds: 3, baths: 3, size: "2,100 sqft", kind: "Apartment" },
  { id: "dhanmondi-rent", type: "rent", title: "Spacious Family Flat", area: "Dhanmondi, Dhaka", price: "৳ 45,000 / month", beds: 3, baths: 2, size: "1,500 sqft", kind: "Apartment" },
  { id: "gulshan-office", type: "rent", title: "Premium Office Space", area: "Gulshan 1, Dhaka", price: "৳ 1,20,000 / month", beds: 0, baths: 2, size: "2,000 sqft", kind: "Commercial" },
];

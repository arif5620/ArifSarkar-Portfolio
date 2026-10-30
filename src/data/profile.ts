const phone = "+8801828205620";

const profile = {
  name: "Arif",

  title: "Real Estate Consultant & Realtor",

  description:
    "Trusted Realtor in Dhaka helping buyers, sellers and tenants find, sell and rent apartments, houses, land and commercial space with honesty and clear guidance.",

  email: "contact@arifsarkar.com",

  phone,

  whatsapp: "https://wa.me/8801828205620",

  location: "Dhaka, Bangladesh",

  website: "https://arifsarkar.com",

  social: {
    facebook: "https://www.facebook.com/arifsarkarofficial.1/",
    linkedin: "https://www.linkedin.com/in/ariful-islam-a64423336/",
    instagram: "https://www.instagram.com/arifulislam__official/",
    x: "https://x.com/ariful_islamjoy",
  },
};

// Prefilled WhatsApp inquiry link.
export const waLink = (text: string) =>
  `${profile.whatsapp}?text=${encodeURIComponent(text)}`;

export default profile;

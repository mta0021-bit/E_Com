export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  unit: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

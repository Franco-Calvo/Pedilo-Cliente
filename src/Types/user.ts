export type User = {
  name: string;
  products: {
    _id: string;
    category: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    stock: "Available" | "Unavailable";
  }[];
};

export type MercadoPagoPreferenceResponse = {
  body: {
    init_point: string;
  };
};

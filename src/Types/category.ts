export interface ICategory {
  category: string;
  name: string;
  createdAt: Date;
  products: Array<[]>;
  _id?: any;
}

export interface ICategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: string;
  imageUrl: string;
  _id?: any;
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
  map: any;
}

export interface IProductsState {
  products: [];
  loading: boolean;
  error: string | null;
}

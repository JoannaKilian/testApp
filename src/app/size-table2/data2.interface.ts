export interface Product {
  amount: number;
  color: string;
  size: string;
}

export interface ProductVM {
  id: number;
  product: Product;
  childsProducts: number[];
}

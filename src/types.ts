import { type } from "os";
/*
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
*/

export type Product = {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  categoryType: number;
  productIcon: string;
  productStock: number;
  productStatus: number;
  createTime: string;
  updateTime: string;

};

export type CartItem = {
  product: Product;
  quantity: number;
};

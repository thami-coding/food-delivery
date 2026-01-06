import { Categories } from "../components/products/product_entity";

export type QueryParams = {
  limit?: number;
  category?: Categories;
  offset?: number;
  price?: number;
  name?: string;
};

import { getProduct, getProducts } from "@/lib/services/catalogService";
export const getAllProducts = () => getProducts({ limit: 20 });
export const getProductById = getProduct;

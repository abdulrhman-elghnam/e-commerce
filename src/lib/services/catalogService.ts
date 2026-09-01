import { api } from "./api";

export type Product = {
  _id: string; title: string; slug: string; description?: string; quantity: number;
  price: number; priceAfterDiscount?: number; imageCover: string; images?: string[];
  ratingsAverage?: number; ratingsQuantity?: number;
  category?: { _id: string; name: string; slug?: string }; brand?: { _id: string; name: string };
  subcategory?: { _id: string; name: string }[];
};
export type Category = { _id: string; name: string; slug: string; image: string };
export type Brand = { _id: string; name: string; slug?: string; image: string };
export type ListResponse<T> = { results?: number; metadata?: { currentPage?: number; numberOfPages?: number }; data: T[] };

export function getProducts(params: Record<string, string | number | undefined> = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)));
  return api<ListResponse<Product>>(`/products${query.size ? `?${query}` : ""}`);
}
export const getProduct = (id: string) => api<{ data: Product }>(`/products/${id}`);
export const getCategories = () => api<ListResponse<Category>>("/categories");
export const getCategory = (id: string) => api<{ data: Category }>(`/categories/${id}`);
export const getSubcategories = () => api<ListResponse<Category>>("/subcategories");
export const getCategorySubcategories = (id: string) => api<ListResponse<Category>>(`/categories/${id}/subcategories`);
export const getBrands = (params: Record<string, string | number | undefined> = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value !== undefined && value !== "" && query.set(key, String(value)));
  return api<ListResponse<Brand>>(`/brands${query.size ? `?${query}` : ""}`);
};
export const getBrand = (id: string) => api<{ data: Brand }>(`/brands/${id}`);

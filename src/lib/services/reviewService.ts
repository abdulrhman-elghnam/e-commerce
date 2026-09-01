import { api } from "./api";
export type Review = { _id: string; review: string; rating: number; user?: { name?: string }; createdAt?: string };
export const getProductReviews = (productId: string) => api<{ data: Review[] }>(`/products/${productId}/reviews`);
export const createReview = (token: string, productId: string, review: string, rating: number) => api<{ data: Review }>(`/products/${productId}/reviews`, { method: "POST", body: JSON.stringify({ review, rating }) }, token);
export const updateReview = (token: string, reviewId: string, review: string, rating: number) => api<{ data: Review }>(`/reviews/${reviewId}`, { method: "PUT", body: JSON.stringify({ review, rating }) }, token);
export const deleteReview = (token: string, reviewId: string) => api(`/reviews/${reviewId}`, { method: "DELETE" }, token);

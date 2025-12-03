import axios from "axios";

import { responseSchema, type ProductQueryKey } from "../types/product";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { Address } from "../types/address";

export const AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function fetchProducts({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<ProductQueryKey, number>) {
  const [{ category }] = queryKey;

  const response = await AxiosInstance.get(
    `/products?page=${pageParam}&limit=${10}&category=${category}`
  );
  const { products } = responseSchema.parse(response.data);
  console.log(products);

  return {
    products,
    nextPage: products.length === 10 ? pageParam + 1 : undefined,
  };
}

type Credentials = {
  email: string;
  password: string;
};
export async function login(credentials: Credentials) {
  const { data } = await AxiosInstance.post("/auth/login", credentials);
  return data;
}

export async function logout() {
  await AxiosInstance.post("/auth/logout");
}

export async function signUp({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const { data } = await AxiosInstance.post("/users", {
    username,
    email,
    password,
  });
  return data;
}

export async function fetchUser() {
  try {
    const { data } = await AxiosInstance.get("/users/me");
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function addCartItem(cart: {
  productId: string;
  quantity: number;
  userId?: string;
}) {
  const response = await AxiosInstance.post("/cart", cart);
  console.log(response);
}

export async function deleteCartItem(productId: string) {
  await AxiosInstance.delete(`/cart/${productId}`);
}

export async function fetchCurrentUsersCart() {
  const { data } = await AxiosInstance.get("/cart");
  const { cart } = data;
  return cart;
}

export async function postAddress(address: Address) {
  await AxiosInstance.post("/address", address);
}

export async function getAddress(id: string) {
  const { data } = await AxiosInstance.get(`/address/${id}`);
  return data.address;
}

export async function updateAddress(id: string) {
  await AxiosInstance.put(`/address/${id}`);
}

export async function deleteAddress(id: string) {
  await AxiosInstance.delete(`/address/${id}`);
}

export async function updateQuantity(updatedItem) {
  await AxiosInstance.post("/cart", updatedItem);
  console.log(response);
}

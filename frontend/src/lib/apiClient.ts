import axios from "axios";

import { responseSchema, type ProductQueryKey } from "../types/product";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { TCart } from "../types/cart";
import type { GlobalState } from "../types/context";
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

  return {
    products,
    nextPage: products.length === 10 ? pageParam + 1 : undefined,
  };
}

export async function login(email: string, password: string) {
  const { data } = await AxiosInstance.post("/login", {
    email,
    password,
  });
  return data;
}

export async function logout() {
  await AxiosInstance.post("/logout");
}

export async function signUp(
  username: string,
  email: string,
  password: string
) {
  const { data } = await AxiosInstance.post("/register", {
    username,
    email,
    password,
  });
  return data;
}

export async function fetchUser() {
  const { data } = await AxiosInstance.get("/users/me");
  return data.user;
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

export async function fetchCart() {
  const { data } = await AxiosInstance.get("/cart");
  const cart: TCart[] = data.cart;
  console.log(cart);

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

export async function updateQuantity(state: GlobalState, productId: string) {
  const cartItem = state.cart.find((item) => item.productId === productId)!;
  const { quantity } = cartItem;
  const userId = state.user?.userId;
  await AxiosInstance.post("/cart", {
    productId,
    quantity,
    userId,
  });
  // console.log(response);
}

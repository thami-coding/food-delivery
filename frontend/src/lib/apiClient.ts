import axios from "axios";
import { responseSchema, type ProductQueryKey } from "../types/product";
import type { QueryFunctionContext } from "@tanstack/react-query";

export const AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function fetchProducts({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<ProductQueryKey, number>) {
  const [{ category }] = queryKey;
  try {
    const response = await AxiosInstance.get(
      `/products?page=${pageParam}&limit=${10}&category=${category}`
    );
    // const { products } = responseSchema.parse(response.data);
    const { products } = response.data
    return {
      products,
      nextPage: products.length === 10 ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.log(error);
  }
}

type Credentials = {
  email: string;
  password: string;
};
export async function login(credentials: Credentials) {
  const { data } = await AxiosInstance.post("/auth/login", credentials);
  return data;
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {

  const { data } = await AxiosInstance.post("/users", {
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

export async function logout() {
  await AxiosInstance.post("/auth/logout");
}

export const forgotPassword = async (email: string) => {
  // try {
  const { data } = await AxiosInstance.post("/auth/forgot-password", { email })
  return data
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.log(error);

  //     throw new Error(
  //       error.response?.data?.message || "Unable to reset password"
  //     );
  //   }
  //   throw new Error("Something went wrong");
  // }

}

export const resetPassword = async ({ newPassword, token }: { newPassword: string, token: string | null }) => {
  try {
    const { data } = await AxiosInstance.post("/auth/reset-password", { newPassword, token })
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Unable to reset password"
      );
    }
    throw new Error("Something went wrong");

  }
}

export const updateUser = async (userData) => {
  const { data } = await AxiosInstance.put("/users/me", userData)
  return data
}

export async function addCartItem(cart: {
  productId: string;
  quantity: number;
}) {
  const { data } = await AxiosInstance.post("/cart", cart);
  return data
}

export async function deleteCartItem(productId: string) {
  await AxiosInstance.delete(`/cart/${productId}`);
}

export const cleartCart = async () => {
  const { data } = await AxiosInstance.delete("/cart")
  return data
}

export const updateCart = async ({ productId, quantity }: { productId: string; quantity: number }) => {
  const { data } = await AxiosInstance.patch("/cart", { productId, quantity })
  return data
}

export async function fetchCurrentUsersCart() {
  const { data } = await AxiosInstance.get("/cart");
  const { cart } = data;
  return cart;
}

export type CreateProductPayload = {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
};

export const createProduct = async (product: CreateProductPayload) => {

  const { data } = await AxiosInstance.post("/products", product);
  console.log(data);
  return data;
};


export const fetchOrders = async () => {
  const { data } = await AxiosInstance.get("/orders")
  return data
}

export const fetchUserOrders = async () => {
  const { data } = await AxiosInstance.get("/orders/me")
  return data
}

export const createOrder = async () => {
  const { data } = await AxiosInstance.post("/orders")
  return data
}
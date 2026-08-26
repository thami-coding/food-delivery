import { test, expect, request, APIRequestContext } from "playwright/test";

let apiContext: APIRequestContext;
let userId: string;
const email = "janeDoe@test.com";
const password = "P@ssword!";

test.beforeAll(async () => {
  const authContext = await request.newContext({
    baseURL: "http://localhost:3000/api/v1/",
  });

  await authContext.post("auth/register", {
    data: {
      email,
      password,
      confirmPassword: password,
    },
  });

  const response = await authContext.post("auth/login", {
    data: { email, password },
  });

  const { accessToken, user } = await response.json();
  userId = user.id;
  await authContext.dispose();

  apiContext = await request.newContext({
    baseURL: "http://localhost:3000/api/v1/",
    extraHTTPHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});

test.afterAll(async () => {
  await apiContext.delete("users");
  await apiContext.dispose();
});

test("should add cart item to cart", async () => {
  const productId = "1b180a83-6bf4-4770-81f7-f4342fb1ed8d";
  
  const response = await apiContext.post("cart", {
    data: {
      productId,
      quantity: 1,
    },
  });

  expect(await response.json()).toMatchObject({
    status: "success",
    cart: [
      {
        id: expect.any(String),
        userId,
        productId,
        quantity: 1,
      },
    ],
  });
});

test("should increase cart item quantity", async () => {
  const productId = "1b180a83-6bf4-4770-81f7-f4342fb1ed8d";

  await apiContext.post("cart", {
    data: {
      productId,
      quantity: 1,
    },
  });

  const response = await apiContext.post("cart", {
    data: {
      productId,
      quantity: 2,
    },
  });

  expect(await response.json()).toMatchObject({
    status: "success",
    cart: [
      {
        id: expect.any(String),
        userId,
        productId,
        quantity: 2,
      },
    ],
  });
});

test("should delete cart item from cart", async () => {
  const productId = "1b180a83-6bf4-4770-81f7-f4342fb1ed8d";

  await apiContext.post("cart", {
    data: {
      productId,
      quantity: 1,
    },
  });

  const response = await apiContext.delete(`cart/${productId}`);

  expect(response.ok()).toBeTruthy();
});

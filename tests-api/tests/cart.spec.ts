import { test, expect, request, APIRequestContext } from "playwright/test";

let apiContext: APIRequestContext;
let userId: string;
const email = "thami@test.com";
const password = "P@ssword!";
const productId = "aa1eed3d-8560-4584-a6f1-81ab4db316b9";

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
  console.log(await response.json()); //Remove

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
  // await apiContext.dispose();
});

test("should add cart item to cart", async () => {
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
  await apiContext.post("cart", {
    data: {
      productId,
      quantity: 1,
    },
  });

  const response = await apiContext.delete(`cart/${productId}`);

  expect(response.ok()).toBeTruthy();
});

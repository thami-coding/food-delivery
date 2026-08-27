import { test, expect, request } from "@playwright/test";
import { randomUUID } from "crypto";

const email = "janeDoe@test.com";
const password = "P@ssword!";
const wrongPassword = "P@ssword12345";

test.beforeAll(async ({ request }) => {
  await request.post("auth/register", {
    data: {
      email,
      password,
      confirmPassword: password,
    },
  });
});

test.afterAll(async () => {
  const baseURL = "http://localhost:3000/api/v1/";

  const authContext = await request.newContext({
    baseURL,
  });
  const response = await authContext.post("auth/login", {
    data: { email, password },
  });

  const { accessToken } = await response.json();
  const apiContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  await apiContext.delete("user");
  await authContext.dispose();
  await apiContext.dispose();
});

test("should register new user", async ({ request }) => {
  const email = `${randomUUID()}@test.com`;
  const response = await request.post(`auth/register`, {
    data: {
      email,
      password: "test@test",
      confirmPassword: "test@test",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({
    status: "success",
    user: {
      id: expect.any(String),
      role: "user",
      email,
    },
  });
});

test("should fail registration when passwords do not match", async ({
  request,
}) => {
  const response = await request.post(`auth/register`, {
    data: {
      email: "peter@test.com",
      password,
      confirmPassword: wrongPassword,
    },
  });

  expect(response.status()).toBe(400);
  expect(await response.json()).toMatchObject({
    status: "fail",
    fields: {
      confirmPassword: "Passwords do not match",
    },
  });
});

test("should fail registration when email already exists", async ({
  request,
}) => {
  const response = await request.post(`auth/register`, {
    data: {
      email,
      password,
      confirmPassword: password,
    },
  });

  expect(response.status()).toBe(409);
  expect(await response.json()).toMatchObject({
    status: "fail",
    fields: {
      email: "Email is already registered",
    },
  });
});

test("should login registered user", async ({ request }) => {
  const response = await request.post(`auth/login`, {
    data: {
      email,
      password,
    },
  });

  console.log(email);
  console.log(password);
  console.log("auth:", await response.json()); //REMOVE

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({
    status: "success",
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
    user: {
      id: expect.any(String),
      role: "user",
      email,
    },
  });
});

test("should fail login with invalid password", async ({ request }) => {
  const response = await request.post(`auth/login`, {
    data: {
      email,
      password: "test1234$",
    },
  });

  expect(response.status()).toBe(401);
  expect(await response.json()).toMatchObject({
    status: "fail",
    fields: {
      password: "The email or password you entered is incorrect",
    },
  });
});

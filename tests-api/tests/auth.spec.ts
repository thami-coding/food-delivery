import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test("should login user", async ({ request }) => {
  const response = await request.post(`auth/login`, {
    data: {
      email: "test@test.com",
      password: "test@test",
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({
    status: "success",
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
    user: {
      id: expect.any(String),
      role: "user",
      email: "test@test.com",
    },
  });
});

test("should fail login with invalid password", async ({ request }) => {
  const response = await request.post(`auth/login`, {
    data: {
      email: `test@test.com`,
      password: "test@test1234",
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

test("should register user", async ({ request }) => {
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
  const email = `${randomUUID()}@test.com`;
  const response = await request.post(`auth/register`, {
    data: {
      email,
      password: "test@test",
      confirmPassword: "test@test1234",
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
  const userData = {
    email: "test123456@test.com",
    password: "test@test",
    confirmPassword: "test@test",
  };

  await request.post(`auth/register`, {
    data: userData,
  });
  const response = await request.post(`auth/register`, {
    data: userData,
  });

  expect(response.status()).toBe(409);
  expect(await response.json()).toMatchObject({
    status: "fail",
    fields: {
      email: "Email is already registered",
    },
  });
});

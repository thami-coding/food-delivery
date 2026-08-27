import { test, expect, request, APIRequestContext } from "playwright/test";

let apiContext: APIRequestContext;
const email = "johnDoe@test.com";
const password = "P@ssword!";

test.beforeAll(async () => {
  const authContext = await request.newContext({
    baseURL: "http://localhost:3000/api/v1/",
  });

  const re = await authContext.post("auth/register", {
    data: {
      email,
      password,
      confirmPassword: password,
    },
  });
  console.log("register response: ", await re.json()); //Remove

  const response = await authContext.post("auth/login", {
    data: { email, password },
  });

  const { accessToken } = await response.json();
  console.log("token: ", accessToken); //Remove

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

test("should get logged in user's details", async () => {
  const response = await apiContext.get("users/me");
  console.log("users: ",await response.json()); //REMOVE

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({
    status: "success",
    user: {
      id: expect.any(String),
      fullName: null,
      email,
      phoneNumber: null,
      role: "user",
      streetAddress: null,
      city: null,
      suburb: null,
      postalCode: null,
    },
  });
});

test("should update user's details", async () => {});

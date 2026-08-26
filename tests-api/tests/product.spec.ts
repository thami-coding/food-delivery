import { test, expect } from "playwright/test";

test("should get paginated products", async ({ request }) => {
  const response = await request.get(`products`);

  expect(await response.json()).toMatchObject({
    status: "success",
    page: 1,
    totalPages: expect.any(Number),
    totalProducts: expect.any(Number),
    products: expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        ingredients: expect.any(String),
        category: expect.any(String),
        description: expect.any(String),
        price: expect.any(String),
        imageUrl: expect.any(String),
      }),
    ]),
  });
});

test("should get single product", async ({ request }) => {
  const productId = "1b180a83-6bf4-4770-81f7-f4342fb1ed8d";

  const response = await request.get(`products/${productId}`);

  expect(await response.json()).toMatchObject({
    status: "success",
    product: {
      id: productId,
      name: "Spicy jalapeño Burger",
      ingredients: "bacon,jalapeño,beef",
      category: "burgers",
      description: expect.any(String),
      price: "89.90",
      imageUrl: expect.any(String),
    },
  });
});

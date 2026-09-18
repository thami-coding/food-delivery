import { test, expect } from "@playwright/test";

test("has call to action buttons", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Specials" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Menu" }).first()).toBeVisible();
});

test("has all product categories filters displayed", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Menu" }).first().click();

  await expect(page.getByRole("button", { name: "All" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pizzas" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Wings" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Burgers" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Desserts" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Combos" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ribs" })).toBeVisible();
});

test("adds product to cart and increases cart count", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Menu" }).first().click();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByRole("button", { name: "ADD ITEM-R" }).click();

  await expect(page.getByTestId("cart-link")).toBeVisible();
});

test("displays cart details and cart summary", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Menu" }).first().click();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByRole("button", { name: "ADD ITEM-R" }).click();
  await page.getByTestId("cart-link").click();

  await expect(
    page.getByRole("heading", { name: "Order Summary" }),
  ).toBeVisible();
  await expect(page.getByText("TOTAL", { exact: true })).toBeVisible();
  await expect(page.getByText("DELIVERY")).toBeVisible();
  await expect(page.getByText("SUBTOTAL")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Proceed to Checkout" }),
  ).toBeVisible();
});

test("checkout cart and displays address, pricing, and place order button", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Menu" }).first().click();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByRole("button", { name: "ADD ITEM-R" }).click();
  await page.getByTestId("cart-link").click();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();

  await expect(
    page.getByRole("heading", { name: "Delivery Address" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "change" })).toBeVisible();
  await expect(page.getByText("Total Payment R")).toBeVisible();
  await expect(page.getByText("Discount")).toBeVisible();
  await expect(page.getByRole("button", { name: "Place Order" })).toBeVisible();
});

test("place order and displays payment summary before payment is finalized", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Menu" }).first().click();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByRole("button", { name: "ADD ITEM-R" }).click();
  await page.getByTestId("cart-link").click();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();
  await page.getByRole("button", { name: "Place Order" }).click();

  await expect(page.getByText("Items")).toBeVisible();
  await expect(page.getByText("Delivery Fee")).toBeVisible();
  await expect(page.getByText("Total")).toBeVisible();
  await expect(page.getByText("Delivering to")).toBeVisible();
  await expect(page.getByRole("button", { name: "Pay Now" })).toBeVisible();
});

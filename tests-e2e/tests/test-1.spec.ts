import { test, expect } from '@playwright/test';

test('has call to action buttons', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByRole("link", { name: "Specials" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Menu" }).first()).toBeVisible();
});
  // await page.getByRole('navigation').getByRole('button').click();
  // await page.getByRole('link', { name: 'Login' }).click();
  // await page.getByRole('textbox', { name: 'Email' }).click();
  // await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).fill('Password1');
  // await page.getByRole('button', { name: 'Login' }).click();
  // await page.getByRole('button', { name: 'Add' }).first().click();
  // await page.getByRole('button', { name: 'ADD ITEM-R' }).click();
  // await page.getByRole('link', { name: '1' }).click();
  // await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
  // await page.getByRole('button', { name: 'Place Order' }).click();
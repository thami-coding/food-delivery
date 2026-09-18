import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("navigation").getByRole("button").click();
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("test@test.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Password1");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(/\/(products|dashboard)/); 
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});

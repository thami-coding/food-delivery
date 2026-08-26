import { defineConfig } from "@playwright/test";
export default defineConfig({
  use: {
    baseURL:
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000/api/v1/",
  },
  reporter: [
    ["list"],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["html", { outputFolder: "playwright-report" }],
  ],
});

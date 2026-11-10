import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4000",
    headless: true,
  },
  webServer: {
    command: "npm run start -- -p 4000",
    url: "http://localhost:4000",
    reuseExistingServer: true,
    timeout: 30000,
  },
});

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: 'html',
  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
});

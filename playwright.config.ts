import { defineConfig, devices } from '@playwright/test';


const commonConfig = {
  screenshot: 'MyTests/screenshots',
  reporter: 'list',
  reporterOptions: {
    outputDir: './MyTests/reports',
  },
};

export default defineConfig({
  testDir: './Test',
  // testIgnore: '*example.*ts',
  testMatch: '*example.*ts', /* Run tests in files in parallel */
  fullyParallel: true, /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['html'], ['dot'], ['line'] ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    launchOptions: {
      headless: false,
      slowMo: 100
    },
    contextOptions: {
      acceptDownloads: false,
      permissions: ['geolocation']
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  ...commonConfig,
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

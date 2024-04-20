import { defineConfig, devices } from '@playwright/test';
import { configDotenv } from 'dotenv';

configDotenv({path: `env/.env.${process.env.ENV}`});


export default defineConfig({
  testDir: './tests-examples', //'./Homework_playwright',
  // testIgnore: '*example.*ts',
  testMatch: '*spec.ts', //'**/*.spec.ts',/* Run tests in files in parallel */ /*["demo-todo-app.spec.ts", "example.spec.ts"]
  fullyParallel: true, /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  // workers: 4, /* set up of workers doesn't matter which CI*/
  reporter: [ ['html'], ['dot'], ['line'], ['list'], ['json', { outputFile: 'results.json' }] ],

  use: {
    // baseURL: "https://qauto.forstudy.space",
    baseURL: process.env.ENV_URL,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME,  //"guest",
      password: process.env.HTTP_CREDENTIALS_PASSWORD,  //"welcome2qauto",
    },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      headless: false,
      slowMo: 100
    },
    // contextOptions: {
    //   acceptDownloads: false,
    //   permissions: ['geolocation']
    // }
    // locale: 'de-DE',
    // timezoneId: 'Europe/Berlin',
    // permissions: ['geolocation'],
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
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

// locale: 'de-DE',
//     timezoneId: 'Europe/Berlin',
//        // permissions: ['geolocation'],
//     // geolocation: { longitude: 52.150002, latitude: 10.333333 },
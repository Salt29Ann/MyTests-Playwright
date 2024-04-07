import { test, expect } from "@playwright/test";
 
test.afterAll(async ({ page }) => {
  await page.close();
});
test("open main page", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3000);
  await page.locator("button").click();
  await page.locator("button.signin").click();
});


baseURL: "https://qauto.forstudy.space",
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },

    import { test, expect } from "@playwright/test";
 
test.afterAll(async ({ page }) => {
  await page.close();
});
const loginName = "densf22@gmail.com";
const loginPass = "Qwerty+1";

test.describe("Verification of qauto app", () => {
    test("open main page", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(3000);
      // await page.locator('button.header_signin').click();
   
      const signinButton = page.locator("button.header_signin");
      await signinButton.click();
    });
   
    test("usage of getByRole", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
    });
   
    test("usage of getByText", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByText("Sign In")).toBeVisible();
    });
   
    test("usage of getByLabel", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page.getByLabel("Email")).toBeVisible();
    });
  });

  test("usage of fill method", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator('input[name="email"]').fill(loginName);
    await page.locator('input[name="password"]').fill(loginPass);
    await page.waitForTimeout(3000);
  });

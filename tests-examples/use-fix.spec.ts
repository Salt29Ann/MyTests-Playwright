import { test, expect } from "../util/fixture";
import { LoginPage } from "./pages/loginPages";

test('test based on fixture', 
{tag: '@fixture-usage'}, 
async ({ loginPage, page }) => {
    await loginPage.openPage();
    await loginPage.loginwithDefaultParam();
    await page.screenshot();
    await expect(page.getByRole('list')).toContainText('Porsche Panamera');
});
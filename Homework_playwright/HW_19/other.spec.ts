import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObj/Objectfile';

test.beforeEach(async({page})=> {
    console.time("PageLoadTime");
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    console.timeEnd("PageLoadTime");
});

test.describe("Verification of qauto app", () => {
    test.describe.configure({ mode: "serial" });

    test('Registration form with valid user data', async ({page}) => {
        const userPage = new LoginPage(page);
        await userPage.fillRegistrationForm('Sarah', 'Johns', 'sarahJemail@example.com', '1Qwerty23');
        const bRegister = await userPage.buttonRegister();
        await expect(bRegister).toBeVisible();
        await bRegister.click();
        await page.waitForURL('panel/garage', { timeout: 10000 });
      });

    const invalidTestData = [
        { name: 'Anna', lastName: 'Salt', email: 'annaSATest@gmail.com', password: 'Anna21Anna' },
        { name: 'Samuel', lastName: 'Nickols', email: 'Nickols@example.com', password: 'PasUser1234', repeatPassword: 'otherPassword' },
        { name: 'Hubert', lastName: 'Wolfeschlegelsteinhausenbergerdorff', email: 'wolf@email.com', password: 'Hubert88' },
        { name: 'Anna-Kristina', lastName: 'Leon', email: 'leon@email.com', password: 'passworD987' },
        { name: 'Sami', lastName: 'Johns', email: 'Sami@example.com', password: '0997630041', repeatPassword: '0997630041' }
    ];

    invalidTestData.forEach(data => {
        test(`Registration form with ${data.name}`, async ({page}) => {
        const userPage = new LoginPage(page);
        await userPage.fillRegistrationForm(data.name, data.lastName, data.email, data.password, data.repeatPassword);
        const bRegister = await userPage.buttonRegister();
        await expect(bRegister).toBeVisible();
        await expect(bRegister).toBeDisabled();
        });
    });
});
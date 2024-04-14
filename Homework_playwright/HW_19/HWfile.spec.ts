import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObj/Objectfile';

test.beforeEach(async({page})=> {
    console.time("PageLoadTime");
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    console.timeEnd("PageLoadTime");
    // await page.waitForLoadState('load');
  });

test.describe("Verification of qauto app", () => {
    test.describe.configure({ mode: "serial" }); 

  test('Registration form with valid user data', async ({page}) => {
    const userPage = new LoginPage(page);
    await userPage.fillRegistrationForm('Sarah', 'Johns', 'sarahEmail2@example.com', '1Qwerty23');
    const bRegister = await userPage.buttonRegister();
    await expect(bRegister).toBeVisible();
    await bRegister.click();
    await page.waitForURL('panel/garage', { timeout: 10000 });
  });

  test('User with this Email already registered', async () => {
    const userPage = new LoginPage(page);
    await userPage.fillRegistrationForm('Anna', 'Salt', 'annaSATest@gmail.com', 'Anna21Anna');
    const bRegister = await userPage.buttonRegister();
    await bRegister.click();
    const emailError = await page.$eval('.error', el => el.textContent);
        if (emailError.includes('User already exists')){
            console.log('User with this Email already registered')
        } else {
        console.log('Test failed')
    }
});

test('Registration form with non-matching passwords', async ({ page }) => {
    const userPage = new LoginPage(page);
    await userPage.fillRegFormwithReapeatPass('Samuel', 'Nickols', 'Nickols@example.com', 'PasUser1234', 'otherPassword');
    const bRegister = await userPage.buttonRegister();
    await expect(bRegister).toBeVisible();
    await expect(bRegister).toBeDisabled();
});

test('Registration form with invalid Last name', async ({ page }) => {
    const userPage = new LoginPage(page);
    await userPage.fillRegistrationForm('Hubert', 'Wolfeschlegelsteinhausenbergerdorff', 'wolf@email.com', 'Hubert88');
    const bRegister = await userPage.buttonRegister();
    await expect(bRegister).toBeVisible();
    await expect(bRegister).toBeDisabled();
});

test('Registration form with invalid user name', async ({ page }) => {
    const userPage = new LoginPage(page);
    await userPage.fillRegistrationForm('Anna-Kristina', 'Leon', 'leon@email.com', 'passworD987');
    const bRegister = await userPage.buttonRegister();
    await expect(bRegister).toBeVisible();
    await expect(bRegister).toBeDisabled();
});
test('Registration form with invalid password', async ({ page }) => {
    const userPage = new LoginPage(page);
    await userPage.fillRegFormwithReapeatPass('Sami', 'Johns', 'Sami@example.com', '0997630041', '0997630041');
    const bRegister = await userPage.buttonRegister();
    await expect(bRegister).toBeVisible();
    await expect(bRegister).toBeDisabled();
});
});
// const testData = [
//     { name: 'Sarah', lastName: 'Johns', email: 'sarahEmail@example.com', password: '1Qwerty23' },
//     { name: 'Anna', lastName: 'Salt', email: 'annaSATest@gmail.com', password: 'Anna21Anna' },
//     { name: 'Samuel', lastName: 'Nickols', email: 'Nickols@example.com', password: 'PasUser1234', repeatPassword: 'otherPassword' },
//     { name: 'Hubert', lastName: 'Wolfeschlegelsteinhausenbergerdorff', email: 'wolf@email.com', password: 'Hubert88' },
//     { name: 'Anna-Kristina', lastName: 'Leon', email: 'leon@email.com', password: 'passworD987' },
//     { name: 'Sami', lastName: 'Johns', email: 'Sami@example.com', password: '0997630041', repeatPassword: '0997630041' }
// ];

// testData.forEach(data => {
//     test(`Registration form with ${data.name}`, async ({page}) => {
//         const userPage = new LoginPage(page);
//         await userPage.fillRegistrationForm(data.name, data.lastName, data.email, data.password, data.repeatPassword);
//         const bRegister = await userPage.buttonRegister();
//         await expect(bRegister).toBeVisible();
//         await expect(bRegister).toBeDisabled();
//     });
// });


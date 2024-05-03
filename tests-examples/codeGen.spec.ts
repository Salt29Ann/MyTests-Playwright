import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPages';
import { Header } from './components/header';

test.beforeEach(async({page})=> {
  // console.time("PageLoadTime");
  await page.goto('/');
  console.timeEnd("PageLoadTime");
  // const loginpage = new LoginPage(page);
});

test('test with valid Data', {tag:'@codegen' }, async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.loginwithDefaultParam();
  const bLogin = await loginpage.buttonlogin();
  await expect(bLogin).toBeVisible();
  await bLogin.click();
  // await page.getByRole('button', { name: 'Sign In' }).click();
  // await page.getByLabel('Email').click();
  // await page.getByLabel('Email').fill('annaSATest@gmail.com');
  // await page.getByLabel('Password').click();
  // await page.getByLabel('Password').fill('Anna21Anna');
  // await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  // await page.getByRole('button', { name: 'Login' }).click();
  // await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
  // await page.getByRole('button', { name: 'Add car' }).click();
  // await page.getByLabel('Brand').selectOption('3: 4');
  // await page.getByText('Add a car×').click();
  // await page.getByLabel('Model').selectOption('10: 18');
  // await page.getByLabel('Mileage').click();
  // await page.getByLabel('Mileage').fill('101010');
  // await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
  // await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('list')).toContainText('Porsche Panamera');
  await expect(page.getByText('Update mileage • 14.04.2024')).toBeVisible();
});

test('test with Invalid Data', async ({ page }) => {
  const loginpage = new LoginPage(page);
  const header = new Header(page);
  await header.logoVisible();
  await loginpage.loginwithDinamicData("email.com", "22iffij");
});
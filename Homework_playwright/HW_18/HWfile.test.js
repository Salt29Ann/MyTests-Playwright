import { test, expect, beforeEach, afterEach } from '@playwright/test';

beforeEach(async ({ page, context }) => {
    await page.goto('https://qauto.forstudy.space');
    await page.waitForLoadState('load');
    await context.setHTTPCredentials({ username: 'guest', password: 'welcome2qauto' });
    await page.waitForLoadState('load');
    await page.goto('https://qauto.forstudy.space');
  });

afterEach(async ({ page }) => {
    await page.close();
});


test ('User successful registration', async ({page, context}) => {
  await page.click('.header_right > .btn', { timeout: 2000 });
  await page.waitForSelector('h4.modal-title');
  await page.click('.modal-footer > .btn-link');
  await page.waitForSelector('div.modal-body');
  await page.fill('input[id="signupName"]', 'Sam');
  await page.fill('input[id="signupLastName"]', 'Smith');
  await page.fill('input[id="signupEmail"]', 'Sam-Smith@example.com');
  await page.fill('input[id="signupPassword"]', 'Smith19Sam');
  await page.fill('input[id="signupRepeatPassword"]', 'Smith19Sam');
  await page.click('button.btn.btn-primary:has-text("Register")');
  await page.waitForTimeout(3000);
  expect(page.url()).toContain('https://qauto.forstudy.space/panel/garage');
  console.log('User regestered in the system');
});

test('User registration with an empty name', async ({page, context}) => {
  await page.click('.header_right > .btn', { timeout: 2000 });
  await page.waitForSelector('h4.modal-title');
  await page.click('.modal-footer > .btn-link');
  await page.waitForSelector('div.modal-body');
  await page.fill('input[id="signupName"]', '');
  await page.fill('input[id="signupLastName"]', 'Clark');
  await page.fill('input[id="signupEmail"]', 'C-lark@example.com');
  await page.fill('input[id="signupPassword"]', 'Pass0000');
  await page.fill('input[id="signupRepeatPassword"]', 'Pass0000');
  await page.click('button.btn.btn-primary:has-text("Register")');
  const nameError = await page.$eval('.error', el => el.textContent);
  console.log('Error when name field is empty:', nameError);
});

  test('User with this Email already registered', async ({page, context}) => {
  await page.click('.header_right > .btn', { timeout: 2000 });
  await page.waitForSelector('h4.modal-title');
  await page.click('.modal-footer > .btn-link');
  await page.waitForSelector('div.modal-body');
  await page.fill('input[id="signupName"]', 'Anna');
  await page.fill('input[id="signupLastName"]', 'Salt');
  await page.fill('input[id="signupEmail"]', 'annaSATest@gmail.com');
  await page.fill('input[id="signupPassword"]', 'Anna21Anna');
  await page.fill('input[id="signupRepeatPassword"]', 'Anna21Anna');
  await page.click('button.btn.btn-primary:has-text("Register")');
  const emailError = await page.$eval('.error', el => el.textContent);
  if (emailError.includes('User already exists')){
    console.log('User with this Email already registered')
  } else {
    console.log('Test failed')
  }
});



import { test, expect, request } from "@playwright/test";

test('Check garage page', {tag: '@garagePageCheck'}, async ({page, request}) => {
    
    // Request monitoring send>> get<<
    // page.on('request', request => console.log('>>', request.method(), request.url()));
    // page.on('response', response => console.log('<<', response.status(), response.url()));

    // Response from back-end related to car data
//     const responsePromise = page.waitForResponse("**/api/cars"); // отримання promise
//     await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
// ** - usage of 'glob pattern'

//     // Delete header
//     await page.route('**/api/cars', async route => {
//     const headers = route.request().headers();
//     delete headers['X-Secret'];
//     await route.continue({ headers });
//   });
    // Mock the api call before navigating
    // await page.route('**/api/cars', async route => {
    //     const json = [{ name: 'Laguna', id: 21 }];
    //     await route.fulfill({ json });
    //   });

    await page.goto("/panel/garage");
    await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
    await page.screenshot({ path: 'screenshot.png', fullPage: true});
    // const response = await responsePromise; // очікування виконня promise
    const cars = await request.get('/api/cars');
    expect(cars.ok()).toBeTruthy();
    console.log(await cars.text());
});
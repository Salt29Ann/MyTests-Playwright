import { test, expect, request } from "@playwright/test";

// test('Check garage page', {tag: '@garagePageCheck'}, async ({page, request}) => {
//     await page.goto("/panel/garage");
//     await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
//     await page.screenshot({ path: 'screenshot.png', fullPage: true});
//     // const response = await responsePromise; // очікування виконня promise
//     const cars = await request.get('/api/cars');
//     expect(cars.ok()).toBeTruthy();
//     console.log(await cars.text());
// });
test('mock response to change user profile', async ({page}) => {
    await page.route('api/users/profile', async(route) => {
        const json = {
    status: "ok",
    data: {
        "userId": 108212,
        "photoFilename": "new-pic.png",
        "name": "userName",
        "lastName": "userLN"
    },
};
    await route.fulfill({json});
});
    await page.goto('/panel/profile');
    await expect(page.locator('.profile_name.display-4')).toHaveText('Dav Span');
    await page.screenshot({ path: 'screenshot.png', fullPage: true});
});

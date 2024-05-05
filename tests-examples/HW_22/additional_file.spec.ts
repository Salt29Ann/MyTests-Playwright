import { test, expect } from "@playwright/test";

test('Create user car', async ({ page, baseURL }) => {
  await page.goto("/panel/garage");
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
  
  const carsResponse = await fetch(`${baseURL}/api/cars`);
  expect(carsResponse.ok).toBeTruthy();
//   if (!carsResponse.ok || carsResponse.status !== 200) {
//     throw new Error(`GET request to ${baseURL}/api/cars failed with status ${carsResponse.status}`);
// }

    const pageResponse = await fetch(`${baseURL}/api/cars`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "carBrandId": 2,
            "carModelId": 1,
            "mileage": 300
        })
    });

  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

    expect(pageResponse.status).toBe(200);
    const responseBody = await pageResponse.json();
    console.log("Page Response:", responseBody);
});

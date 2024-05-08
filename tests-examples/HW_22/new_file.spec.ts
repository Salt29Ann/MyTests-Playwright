import { test, expect } from "@playwright/test";

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

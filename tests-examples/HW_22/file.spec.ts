import { test, expect } from "@playwright/test";
import fs from 'fs';

test('User profile', {tag: '@UserProfile'}, async ({page}) => {
    
    // page.on('request', request => console.log('>>', request.method(), request.url()));
    // page.on('response', async response => {
    //     const status = response.status();
    //     const urlPage = response.url();
    //     const bodyResp = await response.text();
    //     console.log(`Status: ${status}, URL: ${urlPage}, Body: ${bodyResp}`);  
    // });

    // await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

    await page.goto('/panel/profile');
    await page.waitForSelector('.profile_name');
    await expect(page.getByRole("button", {name: "Edit profile"})).toBeVisible();


    const profileNameElement = await page.waitForSelector('.profile_name');
    const profileName = await profileNameElement.innerText();
    console.log(profileName);

    const userProfileJS = [{ name: 'Dav', lastName: 'Span' }];
    const userImage = fs.readFileSync('/Users/macuser/Desktop/IMG_8326.jpeg');
    const imagePart = { contentType: 'image/jpeg', body: userImage };

     await page.route('**/api/users/profile', async route => {
        const newResponseBody = {
            json: JSON.stringify(userProfileJS),
            image: imagePart
        };

        const newResponse = {
            body: JSON.stringify(newResponseBody),
            contentType: 'application/json'
        };

        await route.fulfill(newResponse);
    });

    await page.reload(); 
    await expect(page.locator('.profile_name')).toHaveText('Dav Span');

    await page.screenshot({ path: 'screenshot.png', fullPage: true});
    await new Promise(resolve => setTimeout(resolve, 5000));
});

import { expect, type Locator, type Page } from '@playwright/test';
import { Header } from '../components/header';

export class LoginPage {
    private page: Page;
    signInButton: Locator;
    // buttonLogin: Locator;
    inputEmail: Locator;
    inputPass: Locator;
    header: any;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.inputEmail = page.getByLabel('Email');
        this.inputPass = page.getByLabel('Password');
        // this.buttonLogin = page.getByRole('button', { name: 'Login' });
        this.header = new Header(page);
    }

    async buttonlogin(): Promise<Locator> {
        return this.page.getByRole('button', { name: 'Login' });
    }

    async loginwithDefaultParam() {
        await this.header.logoVisible();
        await this.signInButton.click();
        await this.inputEmail.click();
        await this.inputEmail.fill('annaSATest@gmail.com');
        await this.inputPass.click();
        await this.inputPass.fill('Anna21Anna');
        // await expect(this.buttonLogin).toBeVisible();
        // await this.buttonLogin.click();
    }

    async loginwithDinamicData(userData: any, passData: any) {
        await this.signInButton.click();
        await this.inputEmail.click();
        await this.inputEmail.fill(userData);
        await this.inputPass.click();
        await this.inputPass.fill(passData);
        // await expect(this.buttonLogin).toBeVisible();
        // await this.buttonLogin.click();
    }
}
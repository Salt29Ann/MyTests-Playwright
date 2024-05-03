import { expect, type Locator, type Page } from '@playwright/test';
import { Header } from '../components/header';

export class LoginPage {
    private page: Page;
    signInButton: Locator;
    buttonLoginForm: Locator;
    inputEmail: Locator;
    inputPass: Locator;
    logoInHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.inputEmail = page.getByLabel('Email');
        this.inputPass = page.getByLabel('Password');
        this.buttonLoginForm = page.getByRole('button', { name: 'Login' });
        this.logoInHeader = page.locator('a.header_logo');
    }

    async openPage() {
        await this.page.goto("/");
    }

    async buttonlogin(): Promise<Locator> {
        return this.page.getByRole('button', { name: 'Login' });
    }

    async loginwithDefaultParam() {
        await expect(this.logoInHeader).toBeVisible();
        await this.signInButton.click();
        await this.inputEmail.click();
        await this.inputEmail.fill('annaSATest@gmail.com');
        await this.inputPass.click();
        await this.inputPass.fill('Anna21Anna');
        await this.page.waitForTimeout(5000);
        await expect(this.buttonLoginForm).toBeVisible();
        await this.buttonLoginForm.click();
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
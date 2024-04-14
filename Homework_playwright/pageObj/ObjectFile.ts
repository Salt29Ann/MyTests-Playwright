import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    signInButton: Locator;
    buttonRegistration: Locator;
    inputName: Locator;
    inputLastName: Locator;
    inputEmail: Locator;
    inputPass: Locator;
    inputPassRep: Locator;

    constructor(page: Page) {
      this.page = page;
      this.inputName = page.locator('input[id="signupName"]');
      this.inputLastName = page.locator('input[id="signupLastName"]');
      this.inputEmail = page.getByLabel('Email');
      this.inputPass = page.locator('input[id="signupPassword"]');
      this.inputPassRep = page.locator('input[id="signupRepeatPassword"]');
      this.signInButton = page.getByRole('button', { name: 'Sign In' });
      this.buttonRegistration = page.getByRole('button', { name: 'Registration' });

    }

    async buttonRegister(): Promise<Locator> {
      return this.page.getByRole('button', { name: 'Register' });
  }

  async fillRegistrationForm(userName: any, userLastName: any, email: any, password: any) {
    await this.signInButton.click();
    await expect(this.buttonRegistration).toBeVisible();
    await this.buttonRegistration.click();
    await this.inputName.fill(userName);
    await this.inputLastName.fill(userLastName);
    await this.inputEmail.fill(email);
    await this.inputPass.fill(password);
    await this.inputPassRep.fill(password);
  }

  async fillRegFormwithReapeatPass(userName: any, userLastName: any, email: any, password: any, repeatPass: any) {
    await this.signInButton.click();
    await expect(this.buttonRegistration).toBeVisible();
    await this.buttonRegistration.click();
    await this.inputName.fill(userName);
    await this.inputLastName.fill(userLastName);
    await this.inputEmail.fill(email);
    await this.inputPass.fill(password);
    await this.inputPassRep.fill(repeatPass);
  }
}
import { expect, type Locator, type Page } from '@playwright/test';

export class ModalTitle {
    modalTitleReg: Locator;
    constructor(page: Page) {
        this.modalTitleReg = page.locator('h4.modal-title')
    }
    async modalTitleVisible() {
        await expect(this.modalTitleReg).toBeVisible();
    }
}
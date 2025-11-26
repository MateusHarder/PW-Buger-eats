import { Page, expect } from '@playwright/test';
import { getHomeElements } from './elements';

export class Home {
    readonly page: Page;
    readonly elements: ReturnType<typeof getHomeElements>;

    constructor(page: Page) {
        this.page = page;
        this.elements = getHomeElements(page);
    }

    async accessHome() {
        await this.page.goto('/');
    }

    async validateTitle(title: string) {
        await expect(this.elements.title).toHaveAttribute('alt', title);
    }

    async validateWelcomeHome(welcomeHome: string) {
        await expect(this.elements.welcomeHome).toHaveText(welcomeHome);
    }

    async validatePhrase(phrase: string) {
        await expect(this.elements.phrase).toHaveText(phrase);
    }

    async validateButtonRegister(buttonRegister: string) {
        await expect(this.elements.buttonRegister).toHaveText(buttonRegister);
        await expect(this.elements.buttonRegister).not.toHaveClass(/is-disabled/);
    }

    async clickButtonRegister() {
        await this.elements.buttonRegister.click();
    }

    async validateAccessRegister() {
        await expect(this.page).toHaveURL(/.*\/deliver/);
    }
}
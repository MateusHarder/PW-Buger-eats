import { Page } from "@playwright/test"

export function getHomeElements(page: Page) {
    return {
        welcomeHome: page.locator('#page-home main h1'),
        title: page.locator('#page-home img'),
        buttonRegister: page.locator('a[href="/deliver"]'),
        phrase: page.locator('#page-home p')
    };
}
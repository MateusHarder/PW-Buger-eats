import { test } from "@playwright/test";

test.describe('Home', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://buger-eats.vercel.app');
    })

    test('Validar o título do app.', async ({ page }) => {
    })

    test('Validar o subtítulo do app.', async ({ page }) => {
    })

    test('Validar a frase do app.', async ({ page }) => {
    })

    test('Validar o botão de Cadastre-se.', async ({ page }) => {
    })

    test('Validar o direcionamento do botão Cadastre-se.', async ({ page }) => {
    })
})

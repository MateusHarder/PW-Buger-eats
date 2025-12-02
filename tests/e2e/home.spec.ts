import { test } from "@playwright/test";
import { Home } from "../support/pages/home/actions";
import homeData from '../fixture/homeData.json' assert { type: 'json' };

let home: Home;

test.beforeEach(async ({ page }) => {
    home = new Home(page);

    await home.accessHome();
})

test.describe('Home', () => {
    test('Validar o título do app.', async () => {
        await home.validateTitle(homeData.title);
    })

    test('Validar o subtítulo do app.', async () => {
        await home.validateWelcomeHome(homeData.welcomeHome);
    })

    test('Validar a frase do app.', async () => {
        await home.validatePhrase(homeData.phrase);
    })

    test('Validar o botão de Cadastre-se.', async () => {
        await home.validateButtonRegister(homeData.buttonRegister);
    })

    test('Validar o direcionamento do botão Cadastre-se.', async () => {
        await home.clickButtonRegister();
        await home.validateAccessRegister();
    })
})

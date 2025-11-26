import { test } from "@playwright/test";

test.describe('Cadastro', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://buger-eats.vercel.app');
    })

    test('Validar acesso a tela de Cadastro', async ({ page }) => {
    })


    test('Validar o campo Nome Completo como obrigatório.', async ({ page }) => {
    })

    test('Validar o campo CPF como obrigatório.', async ({ page }) => {
    })

    test('Validar o campo E-mail como obrigatório.', async ({ page }) => {
    })

    test('Validar o campo CEP como obrigatório.', async ({ page }) => {
    })

    test('Validar o campo Número como obrigatório.', async ({ page }) => {
    })

    test('Validar o campo Método de Entrega como obrigatório.', async ({ page }) => {
    })

    test('Validar o campo Foto da CNH como obrigatório.', async ({ page }) => {
    })

    test('Validar o cadastro com CPF com 12 dígitos.', async ({ page }) => {
    })

    test('Validar o cadastro com CPF com 10 dígitos.', async ({ page }) => {
    })

    test('Validar cadastro com CPF inválido.', async ({ page }) => {
    })

    test('Validar o cadastro apenas com campos obrigatórios informados.', async ({ page }) => {
    })

    test('Validar a busca por CEP.', async ({ page }) => {
    })

    test('Validar cadastro com E-mail inválido.', async ({ page }) => {
    })

    test('Validar cadastro com método de entrega Moto.', async ({ page }) => {
    })

    test('Validar cadastro com método de entrega Bicicleta.', async ({ page }) => {
    })

    test('Validar cadastro com método de entrega Van/Carro.', async ({ page }) => {
    })

    test('Validar envio de arquivo PDF em Foto da CNH.', async ({ page }) => {
    })

    test('Validar envio de arquivo CSV em Foto da CNH.', async ({ page }) => {
    })
})
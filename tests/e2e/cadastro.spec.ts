import { test } from "@playwright/test";
import { faker } from '@faker-js/faker';
import fakerBr from 'faker-br';
import { Cadastro } from "../support/pages/cadastro/actions";
import { Home } from "../support/pages/home/actions";
import cadastroData from '../fixture/cadastroData.json' assert { type: 'json' };
import { CadastroHelper } from "../support/helpers/cadastro";

let cadastro: Cadastro;
let home: Home;
let cadastroHelper: CadastroHelper;
let dataFaker: {
    name: string;
    cpf: string;
    email: string;
    whatsapp: string;
};

test.beforeEach(async ({ page }) => {
    cadastro = new Cadastro(page);
    home = new Home(page);
    cadastroHelper = new CadastroHelper(page);

    await cadastro.accessRegister();

    dataFaker = {
        name: faker.person.fullName(),
        cpf: fakerBr.br.cpf({ format: false }),
        email: faker.internet.email(),
        whatsapp: `55${faker.string.numeric(2)}9${faker.string.numeric(8)}`
    };
});


test.describe('Cadastro', () => {

    test('Validar acesso a tela de Cadastro', async () => {
        await cadastro.validateAccessRegister();
    })


    test('Validar o campo Nome Completo como obrigatório.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.validateNameRequired(cadastroData.nameRequired);
    })

    test('Validar o campo CPF como obrigatório.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.validateCPFRequired(cadastroData.cpfRequired);
    })

    test('Validar o campo E-mail como obrigatório.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.validateEmailRequired(cadastroData.emailRequired);
    })

    test('Validar o campo CEP como obrigatório.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.validateCEPRequired(cadastroData.cepRequired);
    })

    test('Validar o campo Número como obrigatório.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.validateAddressNumberRequired(cadastroData.addressNumberRequired);
    })

    test('Validar o campo Método de Entrega como obrigatório.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.validateDeliveryRequired(cadastroData.deliveryRequired);
    })

    test('Validar o campo Foto da CNH como obrigatório.', async () => { 
        await cadastro.clickButtonRegister();
        await cadastro.validateCNHRequired(cadastroData.cnhRequired);
    })

    test('Validar o cadastro com CPF com 12 dígitos.', async () => {
        const cpf12Digitos = `${dataFaker.cpf}0`;

        await cadastroHelper.fill_sessionDados(dataFaker.name, cpf12Digitos, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastro.clickButtonRegister();
        await cadastro.validateCPFInvalid(cadastroData.messageCpfInvalid);

    });

    test('Validar o cadastro com CPF com 10 dígitos.', async () => {
        const cpf10Digitos = faker.string.numeric(10);

        await cadastroHelper.fill_sessionDados(dataFaker.name, cpf10Digitos, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastro.clickButtonRegister();
        await cadastro.validateCPFInvalid(cadastroData.messageCpfInvalid);
    })

    //Bug do site, o campo não tem validação se o cpf é válido.
    test.only('Validar cadastro com CPF inválido.', async () => {
        const cpf11Digitos = faker.string.numeric(11);

        await cadastroHelper.fill_sessionDados(dataFaker.name, cpf11Digitos, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastro.clickButtonRegister();
        await cadastro.validateCPFInvalid(cadastroData.messageCpfInvalid);
    })

    test('Validar o cadastro apenas com campos obrigatórios informados.', async () => {
    })

    test('Validar a busca por CEP.', async () => {
    })

    test('Validar cadastro com E-mail inválido.', async () => {
    })

    test('Validar cadastro com método de entrega Moto.', async () => {
    })

    test('Validar cadastro com método de entrega Bicicleta.', async () => {
    })

    test('Validar cadastro com método de entrega Van/Carro.', async () => {
    })

    test('Validar envio de arquivo PDF em Foto da CNH.', async () => {
    })

    test('Validar envio de arquivo CSV em Foto da CNH.', async () => {
    })
})
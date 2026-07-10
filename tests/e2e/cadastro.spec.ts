import { test } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { Cadastro } from "../support/pages/cadastro/actions";
import { Home } from "../support/pages/home/actions";
import { CadastroHelper, gerarCPFValido } from "../support/helpers/cadastro";
import cadastroData from '../fixture/cadastroData.json';

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
        cpf: gerarCPFValido(),
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
    test('Validar cadastro com CPF inválido.', async () => {
        const cpf11Digitos = faker.string.numeric(11);

        await cadastroHelper.fill_sessionDados(dataFaker.name, cpf11Digitos, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastro.clickButtonRegister();
        await cadastro.validateCPFInvalid(cadastroData.messageCpfInvalid);
    })

    //Bug do site, o campos de WhatsApp não é mostrado como obrigatório.
    test('Validar o cadastro apenas com campos obrigatórios informados.', async () => {
        await cadastro.clickButtonRegister();
        await cadastro.fillName(dataFaker.name);
        await cadastro.fillCPF(dataFaker.cpf);
        await cadastro.fillEmail(dataFaker.email);
        await cadastro.fillCep(cadastroData.cep);
        await cadastro.clickButtonCEP();
        await cadastro.fillAddressNumber(faker.string.numeric(2));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastro.validateSuccess(cadastroData.messageSucesso);
    })

    test('Validar a busca por CEP.', async () => {
        await cadastro.fillCep(cadastroData.cep);
        await cadastro.clickButtonCEP();
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
    })

    //Bug do site, permite enviar o formulário com o e-mail incorreto.
    test('Validar cadastro com E-mail inválido.', async () => {
        const userName = faker.internet.username();
        const invalidEmailBadDomain = `${userName}@.com`;
        const invalidEmailNoDotCom = `${userName}@gmail`;
        const invalidEmailNoAt = `${userName}gmail`;
        const invalidEmailWithSpace = `${userName} @gmail. com`;
        const validEmail = `${userName}@gmail.com`;
        const invalidEmailWithComma = `${userName},@gmail.com`;
        const invalidEmail = '.com';

        await cadastro.fillName(dataFaker.name);
        await cadastro.fillCPF(dataFaker.cpf);
        await cadastro.fillWhatsapp(dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastroHelper.validate_emailInvalid(invalidEmailBadDomain, cadastroData.invalidEmailBadDomain);
        await cadastroHelper.validate_emailInvalid(invalidEmailNoAt, cadastroData.invalidEmailNoAt);
        await cadastroHelper.validate_emailInvalid(invalidEmailWithComma, cadastroData.invalidEmailWithComma);
        await cadastroHelper.validate_emailInvalid(invalidEmail, cadastroData.invalidEmail);
        await cadastroHelper.validate_emailInvalid(invalidEmailWithSpace, cadastroData.invalidEmailWithSpace);
        await cadastroHelper.validate_emailInvalid(invalidEmailNoDotCom, cadastroData.invalidEmailNoDotCom);
        await cadastro.validateFillEmail(validEmail);
    })

    test('Validar cadastro com método de entrega Moto.', async () => {
        await cadastroHelper.fill_sessionDados(dataFaker.name, dataFaker.cpf, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaMoto(cadastroData.cnh);
        await cadastroHelper.validate_messageSuccess(cadastroData.messageSucesso);
    })

    test('Validar cadastro com método de entrega Bicicleta.', async () => {
        await cadastroHelper.fill_sessionDados(dataFaker.name, dataFaker.cpf, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaBicicleta(cadastroData.cnh);
        await cadastroHelper.validate_messageSuccess(cadastroData.messageSucesso);
    })

    test('Validar cadastro com método de entrega Van/Carro.', async () => {
        await cadastroHelper.fill_sessionDados(dataFaker.name, dataFaker.cpf, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_entregaCarroVan(cadastroData.cnh);
        await cadastroHelper.validate_messageSuccess(cadastroData.messageSucesso);
    })

    test('Validar envio de arquivo PDF em Foto da CNH.', async () => {
        await cadastroHelper.ignoreCreateObjectURLException();

        await cadastroHelper.fill_sessionDados(dataFaker.name, dataFaker.cpf, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_arquivoValidacao(cadastroData.pdf, cadastroData.cnhRequired);
    })

    test('Validar envio de arquivo CSV em Foto da CNH.', async () => {
        await cadastroHelper.ignoreCreateObjectURLException();

        await cadastroHelper.fill_sessionDados(dataFaker.name, dataFaker.cpf, dataFaker.email, dataFaker.whatsapp);
        await cadastroHelper.fill_sessionEndereco(cadastroData.cep, faker.string.numeric(2), faker.lorem.word(5));
        await cadastroHelper.validate_sessionEndereco(cadastroData.address, cadastroData.cidade_uf, cadastroData.bairro);
        await cadastroHelper.fill_arquivoValidacao(cadastroData.csv, cadastroData.cnhRequired);
    })
})
import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getCadastroElements } from '../pages/cadastro/elements';
import { Cadastro } from '../pages/cadastro/actions';

export function gerarCPFValido(): string {
    const base = faker.string.numeric(9);

    const calcularDigito = (cpfSemDigito: string) => {
        let soma = 0;

        for (let i = 0; i < cpfSemDigito.length; i++) {
            soma += Number(cpfSemDigito[i]) * (cpfSemDigito.length + 1 - i);
        }

        const resto = soma % 11;
        return resto < 2 ? '0' : String(11 - resto);
    };

    const digito1 = calcularDigito(base);
    const digito2 = calcularDigito(base + digito1);

    return `${base}${digito1}${digito2}`;
}

export class CadastroHelper {
    readonly page: Page;
    readonly elements: ReturnType<typeof getCadastroElements>;
    readonly cadastro: Cadastro;

    constructor(page: Page) {
        this.page = page;
        this.elements = getCadastroElements(page);
        this.cadastro = new Cadastro(page);
    }

    async fill_sessionDados(name: string, cpf: string, email: string, whatsapp: string) {
        await this.cadastro.fillName(name);
        await this.cadastro.fillCPF(cpf);
        await this.cadastro.fillEmail(email);
        await this.cadastro.fillWhatsapp(whatsapp);
    }

    async fill_sessionEndereco(cep: string, number: string, complemento: string) {
        await this.cadastro.fillCep(cep);
        await this.cadastro.clickButtonCEP();
        await this.cadastro.fillAddressNumber(number);
        await this.cadastro.fillAdressDetails(complemento);
    }

    async validate_sessionEndereco(address: string, city: string, bairro: string) {
        await this.cadastro.validateAddress(address);
        await this.cadastro.validateCityUf(city);
        await this.cadastro.validateDistrict(bairro);

    }

    async fill_entregaMoto(cnh: string) {
        await this.cadastro.clickMoto();
        await this.cadastro.fillImageCnh(cnh);
    }

    async fill_arquivoValidacao(arquivo: string, message: string) {
        await this.cadastro.validateAtrrImage();
        await this.cadastro.fillArquivo(arquivo);
        await this.cadastro.clickButtonRegister();
        await this.cadastro.validateCNHRequired(message);
        await this.cadastro.validateAtrrImage();
    }

    async fill_entregaBicicleta(cnh: string) {
        await this.cadastro.fillBicicleta();
        await this.cadastro.fillImageCnh(cnh);
    }

    async fill_entregaCarroVan(cnh: string) {
        await this.cadastro.fillCarro();
        await this.cadastro.fillImageCnh(cnh);
    }

    async validate_messageSuccess(messageSucesso: string) {
        await this.cadastro.clickButtonRegister();
        await this.cadastro.validateSuccess(messageSucesso);
        await this.cadastro.clickButtonConfirm();
    }

    async validate_emailInvalid(invalidEmail: string, messageInvalid: string) {
        await this.cadastro.fillEmail(invalidEmail);
        await this.cadastro.clickButtonRegister();

        const validation = await this.cadastro.Email().evaluate((input: HTMLInputElement) => ({
            isInvalid: !input.checkValidity(),
            validationMessage: input.validationMessage,
        }));

        expect(validation.isInvalid).toBe(true);
        expect(validation.validationMessage).toContain(messageInvalid);

        await this.cadastro.clearEmail();
    }

    ignoreCreateObjectURLException(): void {
        this.page.on('pageerror', (error) => {
            const shouldIgnore =
                error.message.includes('createObjectURL') &&
                error.message.includes('Overload resolution failed');

            if (!shouldIgnore) {
                throw error;
            }
        });
    }
}
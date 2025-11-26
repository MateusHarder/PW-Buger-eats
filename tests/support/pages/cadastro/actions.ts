import { Page, expect } from '@playwright/test';
import { getCadastroElements } from './elements';

export class Cadastro {
    readonly page: Page;
    readonly elements: ReturnType<typeof getCadastroElements>;

    constructor(page: Page) {
        this.page = page;
        this.elements = getCadastroElements(page);
    }

    async accessRegister() {
        await this.page.goto('/deliver');
    }

    async validateAccessRegister() {
        await expect(this.page).toHaveURL(/.*\/deliver/);
    }

    async fillName(name: string) {
        await this.elements.inputName.fill(name);
    }

    async fillCPF(cpf: string) {
        await this.elements.inputCPF.fill(cpf);
    }

    async fillEmail(email: string) {
        await this.elements.inputEmail.fill(email);
    }

    Email() {
        return this.elements.inputEmail;
    }

    async clearEmail() {
        await this.elements.inputEmail.clear();
        await expect(this.elements.inputEmail).toHaveValue('');
    }

    async validateFillEmail(email: string) {
        await expect(this.elements.inputEmail).toHaveValue(email);
    }

    async fillWhatsapp(whatsapp: string) {
        await this.elements.inputWhatsapp.fill(whatsapp);
    }

    async fillCep(cep: string) {
        await this.elements.inputPostalcode.fill(cep);
    }

    async fillAddressNumber(numero: string) {
        await this.elements.inputAddressNumber.fill(numero);
    }

    async validadeAdress(address: string) {
        await expect(this.elements.inputAdress).toHaveValue(address);
    }

    async fillAdressDetails(adressDetails: string) {
        await this.elements.inputAddressDetails.fill(adressDetails);
    }

    async validadeDistrict(bairro: string) {
        await expect(this.elements.inputDistrict).toHaveValue(bairro);
    }

    async validadeCityUf(cidade_uf: string) {
        await expect(this.elements.inputCityUf).toHaveValue(cidade_uf);
    }

    async clickMoto() {
        await this.elements.deliveryMoto.click();
    }

    async fillBicicleta() {
        await this.elements.deliveryBicicleta.click();
    }

    async fillCarro() {
        await this.elements.deliveryCarro.click();
    }

    async fillImageCnh(cnh: string) {
        // Assuming images are in a folder named 'images' in the root or similar. 
        // Playwright resolves relative paths from CWD.
        await this.elements.inputImage.setInputFiles('images/' + cnh);
    }

    async fillArquivo(arquivo: string) {
        await this.elements.inputImage.setInputFiles('arquivos/' + arquivo);
    }

    async validateAtrrImage() {
        await expect(this.elements.inputImage).toHaveAttribute('accept', 'image/*');
    }

    async clickButtonCEP() {
        await this.elements.buttonCep.click();
    }

    async clickButtonRegister() {
        await this.elements.buttonRegister.click();
    }

    async validadeSuccess(success: string) {
        await expect(this.elements.messageSuccess).toHaveText(success);
    }

    async clickButtonConfirm() {
        await this.elements.buttonConfirm.click();
    }

    async validadeNameRequired(nameRequired: string) {
        await expect(this.elements.messageNameRequired).toHaveText(nameRequired);
    }

    async validadeCPFRequired(cpfRequired: string) {
        await expect(this.elements.messageCPFerror).toHaveText(cpfRequired);
    }

    async validadeCPFInvalid(cpfInvalid: string) {
        await expect(this.elements.messageCPFerror).toHaveText(cpfInvalid);
    }

    async validadeEmailRequired(emailRequired: string) {
        await expect(this.elements.messageEmailRequired).toHaveText(emailRequired);
    }

    async validadeEmailInvalid(EmailInvalid: string) {
        await expect(this.elements.messageEmailRequired).toHaveText(EmailInvalid);
    }

    async validadeCEPRequired(cepRequired: string) {
        await expect(this.elements.messageCEPRequired).toHaveText(cepRequired);
    }

    async validadeAddressNumberRequired(addressRequired: string) {
        await expect(this.elements.messageAddressNumberRequired).toHaveText(addressRequired);
    }

    async validadeDeliveryRequired(deliveryRequired: string) {
        await expect(this.elements.messageDeliveryRequired).toHaveText(deliveryRequired);
    }

    async validadeCNHRequired(cnhRequired: string) {
        await expect(this.elements.messageCNHRequired).toHaveText(cnhRequired);
    }
}
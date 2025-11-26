import { Page } from "@playwright/test"

export function getCadastroElements(page: Page) {
    return {
        inputName: page.locator('input[name="name"]'),
        inputCPF: page.locator('input[name="cpf"]'),
        inputEmail: page.locator('input[name="email"]'),
        inputWhatsapp: page.locator('input[name="whatsapp"]'),
        inputPostalcode: page.locator('input[name="postalcode"]'),
        buttonCep: page.locator('input[type=button][value="Buscar CEP"]'),
        inputAdress: page.locator('input[name="address"]'),
        inputAddressNumber: page.locator('input[name="address-number"]'),
        inputAddressDetails: page.locator('input[name="address-details"]'),
        inputDistrict: page.locator('input[name="district"]'),
        inputCityUf: page.locator('input[name="city-uf"]'),
        inputImage: page.locator('input[accept^="image"]'),
        deliveryMoto: page.locator('img[alt="Moto"]'),
        deliveryBicicleta: page.locator('img[alt="Bicicleta"]'),
        deliveryCarro: page.locator('img[alt="Van/Carro"]'),
        buttonRegister: page.locator('.button-success'),
        messageSuccess: page.locator('#swal2-html-container'),
        buttonConfirm: page.locator('.swal2-confirm'),
        messageNameRequired: page.locator('input[name="name"] + .alert-error'),
        messageCPFerror: page.locator('input[name="cpf"] + .alert-error'),
        messageEmailRequired: page.locator('input[name="email"] + .alert-error'),
        messageCEPRequired: page.locator('input[name="postalcode"] + .alert-error'),
        messageAddressNumberRequired: page.locator('input[name="address-number"] + .alert-error'),
        messageDeliveryRequired: page.locator('.delivery-method + .alert-error'),
        messageCNHRequired: page.locator('.dropzone + .alert-error')
    };
}
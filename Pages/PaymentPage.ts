import { Locator, Page } from "@playwright/test";

export class PaymentPage {
    page: Page;
    nameOnCardInput: Locator;
    cardNumberInput: Locator;
    cvcInput: Locator;
    expirationMonthInput: Locator;
    expirationYearInput: Locator;
    payAndConfirmOrderButton: Locator;
    orderPlacedHeading: Locator;
    orderSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page
        this.nameOnCardInput = page.locator('[data-qa="name-on-card"]')
        this.cardNumberInput = page.locator('[data-qa="card-number"]')
        this.cvcInput = page.locator('[data-qa="cvc"]')
        this.expirationMonthInput = page.locator('[data-qa="expiry-month"]')
        this.expirationYearInput = page.locator('[data-qa="expiry-year"]')
        this.payAndConfirmOrderButton = page.locator('[data-qa="pay-button"]')
        this.orderPlacedHeading = page.locator('[data-qa="order-placed"]')
        this.orderSuccessMessage = page.getByText('Congratulations! Your order has been confirmed!', { exact: true })
    }

    async fillPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expirationMonth: string, expirationYear: string) {
        await this.nameOnCardInput.fill(nameOnCard)
        await this.cardNumberInput.fill(cardNumber)
        await this.cvcInput.fill(cvc)
        await this.expirationMonthInput.fill(expirationMonth)
        await this.expirationYearInput.fill(expirationYear)
    }

    async payAndConfirmOrder() {
        await this.payAndConfirmOrderButton.click()
    }
}

import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    page: Page;
    addressDetailsHeading: Locator;
    reviewYourOrderHeading: Locator;
    deliveryAddressBox: Locator;
    billingAddressBox: Locator;
    reviewOrderTable: Locator;
    commentTextArea: Locator;
    placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.addressDetailsHeading = page.getByRole('heading', { name: 'Address Details' })
        this.reviewYourOrderHeading = page.getByRole('heading', { name: 'Review Your Order' })
        this.deliveryAddressBox = page.locator('#address_delivery')
        this.billingAddressBox = page.locator('#address_invoice')
        this.reviewOrderTable = page.getByRole('table').filter({
            has: page.getByRole('row', { name: /Item Description Price Quantity Total/ })
        })
        this.commentTextArea = page.locator('textarea[name="message"]')
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' })
    }

    orderRow(productName: string) {
        return this.reviewOrderTable.locator('tbody tr').filter({ hasText: productName })
    }

    async addComment(comment: string) {
        await this.commentTextArea.fill(comment)
    }

    async placeOrder() {
        await this.placeOrderButton.click()
    }
}

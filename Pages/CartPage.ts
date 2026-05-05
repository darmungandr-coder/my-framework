import { Page, Locator } from "@playwright/test";

export class CartPage{
    page: Page;
    cartTable: Locator;
    shoppingCartBreadcrumb: Locator;
    proceedToCheckoutButton: Locator;
    checkoutModal: Locator;
    registerLoginButton: Locator;

    constructor(page: Page){
        this.page = page
        this.cartTable = page.locator('#cart_info_table')
        this.shoppingCartBreadcrumb = page.getByText('Shopping Cart', { exact: true })
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout', { exact: true })
        this.checkoutModal = page.locator('#checkoutModal')
        this.registerLoginButton = this.checkoutModal.getByRole('link', { name: 'Register / Login' })
        
    }

    productRow(productName: string) {
        return this.cartTable.locator('tbody tr').filter({ hasText: productName })
    }

    productName(productName: string) {
        return this.productRow(productName).getByRole('link', { name: productName })
    }

    productPrice(productName: string) {
        return this.productRow(productName).getByRole('cell').filter({ hasText: /^Rs\.\s*\d+$/ }).first()
    }

    productQuantity(productName: string) {
        return this.productRow(productName).getByRole('button')
    }

    productTotal(productName: string) {
        return this.productRow(productName).getByRole('cell').filter({ hasText: /^Rs\.\s*\d+$/ }).last()
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click()
    }

    async openRegisterLoginFromCheckoutModal() {
        await this.registerLoginButton.click()
    }

}

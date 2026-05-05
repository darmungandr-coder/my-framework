import { Locator, Page, expect } from "@playwright/test";


export class ProductDetailPage {
    page: Page;
    productInformationContainer: Locator;
    productName: Locator;
    productCategory: Locator;
    productPrice: Locator;
    productAvailability: Locator;
    productCondition: Locator;
    productBrand: Locator;
    quantityInput: Locator;
    addToCartButton: Locator;
    addedModal: Locator;
    addedModalHeading: Locator;
    viewCartButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productInformationContainer = page.locator('.product-information')
        this.productName = this.productInformationContainer.locator('h2')
        this.productCategory = this.productInformationContainer.locator('p').filter({hasText: 'Category: '})
        this.productPrice = this.productInformationContainer.locator('span span')
        this.productAvailability = this.productInformationContainer.locator('p').filter({hasText: 'Availability: '})
        this.productCondition = this.productInformationContainer.locator('p').filter({hasText: 'Condition: '})
        this.productBrand = this.productInformationContainer.locator('p').filter({hasText: 'Brand: '})
        this.quantityInput = page.locator('#quantity')
        this.addToCartButton = page.getByRole('button', { name: /Add to cart/ })
        this.addedModal = page.locator('#cartModal')
        this.addedModalHeading = this.addedModal.getByRole('heading', { name: 'Added!' })
        this.viewCartButton = this.addedModal.getByRole('link', { name: 'View Cart' })
    }

    async verifyProductDetails(){
        await expect(this.productName).toBeVisible()
        await expect(this.productCategory).toBeVisible()
        await expect(this.productPrice).toBeVisible()
        await expect(this.productAvailability).toBeVisible()
        await expect(this.productCondition).toBeVisible()
        await expect(this.productBrand).toBeVisible()
    }

    async verifyFirstProductIsVisible(){
        await expect(this.productName).toBeVisible()
    }

    async setQuantity(quantity: string) {
        await this.quantityInput.fill(quantity)
    }

    async addToCart() {
        await this.addToCartButton.click()
    }

    async openCartFromAddedModal() {
        await this.viewCartButton.click()
    }
}

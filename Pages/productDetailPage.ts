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


    constructor(page: Page) {
        this.page = page;
        this.productInformationContainer = page.locator('.product-information')
        this.productName = this.productInformationContainer.locator('h2')
        this.productCategory = this.productInformationContainer.locator('p').filter({hasText: 'Category: '})
        this.productPrice = this.productInformationContainer.locator('span span')
        this.productAvailability = this.productInformationContainer.locator('p').filter({hasText: 'Availability: '})
        this.productCondition = this.productInformationContainer.locator('p').filter({hasText: 'Condition: '})
        this.productBrand = this.productInformationContainer.locator('p').filter({hasText: 'Brand: '})
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
}
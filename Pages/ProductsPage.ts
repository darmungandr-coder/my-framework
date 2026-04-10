import { expect, Locator, Page } from "@playwright/test";


export class ProductsPage {
    page: Page;
    featureItemsContainer: Locator;
    allProductsHeading: Locator;
    commonProductsLocator: Locator;
    commonProductsViewProductButton: Locator;
    searchProductInput: Locator;
    searchButton: Locator;
    searchedProductsHeading: Locator;





    constructor(page: Page) {
        this.page = page;
        this.featureItemsContainer = page.locator('.features_items')
        this.allProductsHeading = this.featureItemsContainer.getByText('All Products')
        this.commonProductsLocator = this.featureItemsContainer.locator('.col-sm-4')
        this.commonProductsViewProductButton = this.commonProductsLocator.locator('.choose').getByRole('link', { name: 'View Product' })
        this.searchProductInput = page.locator('#search_product')
        this.searchButton = page.locator('#submit_search')
        this.searchedProductsHeading = this.featureItemsContainer.getByText('Searched Products')       
    }
    

    async clickOnViewProductButtonOfFirstProduct(){
        await this.commonProductsViewProductButton.first().click()
    }

    async verifyFirstProductsAreVisible(){
        let countOfAllProducts = await this.commonProductsLocator.count()
        expect(countOfAllProducts).toBeGreaterThan(0)
        for (let i =0; i < Math.min(countOfAllProducts, 5); i++){
            await expect(this.commonProductsLocator.nth(i)).toBeVisible()
        }
    }

    async searchProduct(productName: string){
        await this.searchProductInput.fill(productName)
        await this.searchButton.click()
    }

    async verifySearchedProductsAreVisible(productName: string){
        let countOfSearchedProducts = await this.commonProductsLocator.count()
        expect(countOfSearchedProducts).toBeGreaterThan(0)
        for (let i =0; i < countOfSearchedProducts; i++){
            await expect(this.commonProductsLocator.nth(i)).toBeVisible()
            await expect(this.commonProductsLocator.nth(i).locator('.productinfo p')).toHaveText(productName)
            
        }
    }
}
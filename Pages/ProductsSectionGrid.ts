import { Locator, Page } from "@playwright/test";

export class ProductsSectionGrid {
    page: Page;
    categorySection: Locator;
    featureItems: Locator;
    titleHelperText: Locator;
    brandsSection: Locator;



    constructor(page: Page) {
        this.page = page;
        this.categorySection = page.locator('.left-sidebar')
        this.featureItems = page.locator('.features_items')
        this.titleHelperText = this.featureItems.locator('.title.text-center')
        this.brandsSection = page.locator('.brands_products')


    }

    category(categoryName: string) {
        return this.categorySection.locator(`a[href="#${categoryName}"]`)
    }

    async clickOnCategory(categoryName: string) {
        await this.category(categoryName).click()
    }

    subCategoryPanel(categoryName: string) {
        return this.categorySection.locator(`#${categoryName}`)
    }

    subCategory(categoryName: string, subCategory: string) {
        return this.subCategoryPanel(categoryName).getByRole("link", {
            name: subCategory,
            exact: true
        })
    }

    async clickOnSubCategory(categoryName: string, subCategory: string) {
        await this.subCategory(categoryName, subCategory).click()
    }

    brand(brandName: string) {
        return this.brandsSection.locator(`a[href="/brand_products/${brandName}"]`)
    }

    async clickOnBrand(brandName: string) {
        await this.brand(brandName).click()
    }

}
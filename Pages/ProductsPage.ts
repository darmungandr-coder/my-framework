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
    writeYourReviewText: Locator;
    reviewersName: Locator;
    reviewersEmail: Locator;
    reviewerMessage: Locator;
    submitButton: Locator;
    successMessageForReview: Locator;
    addedModal: Locator;
    addedModalHeading: Locator;
    continueShoppingButton: Locator;








    constructor(page: Page) {
        this.page = page;
        this.featureItemsContainer = page.locator('.features_items')
        this.allProductsHeading = this.featureItemsContainer.getByText('All Products')
        this.commonProductsLocator = this.featureItemsContainer.locator('.col-sm-4')
        this.commonProductsViewProductButton = this.commonProductsLocator.locator('.choose').getByRole('link', { name: 'View Product' })
        this.searchProductInput = page.locator('#search_product')
        this.searchButton = page.locator('#submit_search')
        this.searchedProductsHeading = this.featureItemsContainer.getByText('Searched Products')
        this.writeYourReviewText = page.getByRole('link', { name: 'Write Your Review' })
        this.reviewersName = page.getByPlaceholder('Your Name')
        this.reviewersEmail = page.locator('#email')
        this.reviewerMessage = page.getByPlaceholder('Add Review Here!')
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.successMessageForReview = page.getByText('Thank you for your review.', { exact: true })
        this.addedModal = page.locator('#cartModal')
        this.addedModalHeading = this.addedModal.getByRole('heading', { name: 'Added!' })
        this.continueShoppingButton = this.addedModal.getByRole('button', { name: 'Continue Shopping' })



    }

    productCard(index: number) {
        return this.commonProductsLocator.nth(index)
    }

    async openProductByIndex(index: number) {
        await this.productCard(index).locator('.choose').getByRole('link', { name: 'View Product' }).click()
    }

    async hoverOverProductByIndex(index: number) {
        await this.productCard(index).hover()
    }

    async productName(index: number) {
        return await this.productCard(index).locator('.productinfo p').innerText()
    }

    async clickOnAddToCartButtonOfHoveredProduct(index: number) {
        await this.productCard(index).locator('.productinfo .add-to-cart').click()
    }

    async continueShopping() {
        await this.continueShoppingButton.click()
    }

    async verifyFirstProductsAreVisible() {
        let countOfAllProducts = await this.commonProductsLocator.count()
        expect(countOfAllProducts).toBeGreaterThan(0)
        for (let i = 0; i < Math.min(countOfAllProducts, 5); i++) {
            await expect(this.commonProductsLocator.nth(i)).toBeVisible()
        }
    }

    async searchProduct(productName: string) {
        await this.searchProductInput.fill(productName)
        await this.searchButton.click()
    }

    async verifySearchedProductsAreVisible(productName: string) {
        let countOfSearchedProducts = await this.commonProductsLocator.count()
        expect(countOfSearchedProducts).toBeGreaterThan(0)
        for (let i = 0; i < countOfSearchedProducts; i++) {
            await expect(this.commonProductsLocator.nth(i)).toBeVisible()
            await expect(this.commonProductsLocator.nth(i).locator('.productinfo p')).toHaveText(productName)

        }
    }

    async fillReviewersName(userName: string) {
        await this.reviewersName.fill(userName)
    }

    async fillReviewersEmail(userEmail: string) {
        await this.reviewersEmail.fill(userEmail)
    }

    async fillReviewersMessage(userMessage: string) {
        await this.reviewerMessage.fill(userMessage)
    }

    async clickOnSubmitButton() {
        this.submitButton.click()
    }


}

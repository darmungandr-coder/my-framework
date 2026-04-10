import {Page, expect, Locator} from '@playwright/test'

export class Footer {
    page: Page;
    footerSection: Locator;
    subscriptionHeading: Locator;
    subscriptionEmailInput: Locator;
    subscriptionSubmitButton: Locator;
    subscriptionSuccessMessage: Locator;


    constructor(page: Page) {
        this.page = page
        this.footerSection = page.locator('#footer')
        this.subscriptionHeading = this.footerSection.getByRole('heading', { name: 'Subscription' })
        this.subscriptionEmailInput = this.footerSection.getByRole('textbox', { name: 'Your email address' })
        this.subscriptionSubmitButton = this.footerSection.locator('#subscribe')
        this.subscriptionSuccessMessage = this.footerSection.getByText('You have been successfully subscribed!', { exact: true })

    }

    async scrollToFooter() {
        await this.footerSection.scrollIntoViewIfNeeded()
    }

    async enterEmailInSubscriptionInput(email: string) {
        await this.subscriptionEmailInput.fill(email)
    }

    async clickOnSubscriptionSubmitButton() {
        await this.subscriptionSubmitButton.click()
    }

}
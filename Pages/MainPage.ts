import { Locator, Page } from "@playwright/test";

export class MainPage {
    page: Page;
    homePageSlider: Locator;
    accountDeletedHeading: Locator;
    loggedInAsText: Locator;
    cookieConsentButton: Locator;
    continueAfterDeleteAccountButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.homePageSlider = page.locator('#slider');
        this.accountDeletedHeading = page.getByText('ACCOUNT DELETED!');
        this.loggedInAsText = page.getByText('Logged in as');
        this.cookieConsentButton = page.locator('.fc-button.fc-cta-consent.fc-primary-button');
        this.continueAfterDeleteAccountButton = page.locator('[data-qa="continue-button"]');
    }

    async openMainPage() {
        await this.page.goto('https://automationexercise.com/');
    }

    async continueAfterDeleteAccount() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }

    async acceptCookie() {
        const isCookieVisible = await this.cookieConsentButton
            .isVisible({ timeout: 5000 })
            .catch(() => false);

        if (isCookieVisible) {
            await this.cookieConsentButton.click();
        }
    }

    loggedInAs(name: string) {
        return this.page.getByText(`Logged in as ${name}`, { exact: true });
    }
}

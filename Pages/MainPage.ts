import {expect, Locator, Page} from "@playwright/test";


export class MainPage{
    page: Page;
    homePageSlider: Locator
    signupLoginLink: Locator
    deleteAccountLink: Locator
    accountDeletedHeading: Locator
    loggedInAsText: Locator
    logoutLink: Locator
    cookieConsentButton: Locator;
    contactUsLink: Locator;
    continueAfterDeleteAccountButton: Locator;

    
    constructor(page: Page) {
        this.page = page
        this.homePageSlider = page.locator('#slider')
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' })
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' })
        this.accountDeletedHeading = page.getByText('ACCOUNT DELETED!')
        this.loggedInAsText = page.getByText(`Logged in as`)
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.cookieConsentButton = page.locator('.fc-button.fc-cta-consent.fc-primary-button')
        this.contactUsLink = page.getByRole('link', { name: 'Contact us' })
        this.continueAfterDeleteAccountButton = page.locator('[data-qa="continue-button"]')
    }
    
    async openMainPage(){
        await this.page.goto('https://automationexercise.com/')
    }
    
    
    async openSignUpLoginPage(){
        await this.signupLoginLink.click()
    }
    
    async deleteAccount(){
        await this.deleteAccountLink.click()
    }

    async continueAfterDeleteAccount(){
        await this.page.getByRole('link', { name: 'Continue' }).click()
    }
    
    async userLogOut(){
        await this.logoutLink.click()
    }

    async acceptCookie() {
        const isCookieVisible = await this.cookieConsentButton
            .isVisible({ timeout: 5000 })
            .catch(() => false);

        if (isCookieVisible) {
            await this.cookieConsentButton.click();
  }
}
    
    async openLoginPage(){
        await this.openMainPage()
        await this.acceptCookie()
        await expect(this.homePageSlider).toBeVisible()
        await this.openSignUpLoginPage()
    }
    
    async openContactUsPage(){
        await this.contactUsLink.click()
    }

    loggedInAs(name:string){
        return  this.page.getByText(`Logged in as ${name}`, { exact: true })
    }
}

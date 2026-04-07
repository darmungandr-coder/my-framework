import { Locator, Page } from "@playwright/test";

export class NavigationBar {
    page: Page;
    navigationMenu: Locator;
    homeButton: Locator;
    testCaseButton: Locator;
    contactUsButton: Locator;
    productsButton: Locator;
    cartButton: Locator;
    signupLoginButton: Locator;
    apiTestingButton: Locator;
    videoTutorialButton: Locator;
    logoutButton: Locator;
    deleteAccountButton: Locator;
    
    
    constructor(page: Page){
        this.page = page;
        this.navigationMenu = page.locator('.nav.navbar-nav')
        this.homeButton = this.navigationMenu.getByRole('link', { name: ' Home' })
        this.testCaseButton = this.navigationMenu.getByRole('link', { name: ' Test Cases' })
        this.contactUsButton = this.navigationMenu.getByRole('link', { name: ' Contact Us' })
        this.productsButton = this.navigationMenu.getByRole('link', { name: ' Products' })
        this.cartButton = this.navigationMenu.getByRole('link', { name: ' Cart' })
        this.signupLoginButton = this.navigationMenu.getByRole('link', { name: ' Signup / Login' })
        this.apiTestingButton = this.navigationMenu.getByRole('link', { name: ' API Testing' })
        this.videoTutorialButton = this.navigationMenu.getByRole('link', { name: ' Video Tutorials' })
        this.logoutButton = this.navigationMenu.getByRole('link', { name: ' Logout' })
        this.deleteAccountButton = this.navigationMenu.getByRole('link', { name: ' Delete Account' })
    }

    async openHomePage(){
        await this.homeButton.click()
    }

    async openTestCasePage(){
        await this.testCaseButton.click()
    }

    async openContactUsPage(){
        await this.contactUsButton.click()
    }

    async openProductsPage(){
        await this.productsButton.click()
    }

    async openCartPage(){
        await this.cartButton.click()
    }

    async openSignupLoginPage(){
        await this.signupLoginButton.click()
    }

    async openApiTestingPage(){
        await this.apiTestingButton.click()
    }

    async openVideoTutorialPage(){
        await this.videoTutorialButton.click()
    }

    async logoutUser(){
        await this.logoutButton.click()
    }

    async deleteAccount(){
        await this.deleteAccountButton.click()
    }


}
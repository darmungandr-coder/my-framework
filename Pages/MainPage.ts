import {Locator, Page } from "@playwright/test";

export class MainPage{
    page: Page;
    carousel: Locator
    signupLoginButton: Locator
    deleteAccountButton: Locator
    deleteAccountHeading: Locator
    
    
    constructor(page: Page) {
        this.page = page
        this.carousel = page.locator('.col-sm-12')
        this.signupLoginButton = page.getByRole('link', { name: 'Signup / Login' })
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' })
        this.deleteAccountHeading = page.getByText('ACCOUNT DELETED!')
    }
    
    async openMainPage(){
        await this.page.goto('https://automationexercise.com/')
    }
    
    
    async signUpLogin(){
        await this.signupLoginButton.click()
    }
    
}
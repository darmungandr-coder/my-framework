import {Locator, Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    signUpNameInput: Locator;
    signUpEmailInput: Locator
    signUpButton: Locator;
    cookieAcceptButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.signUpNameInput = page.locator('[data-qa="signup-name"]')
        this.signUpEmailInput = page.locator('[data-qa="signup-email"]')
        this.signUpButton = page.locator('[data-qa="signup-button"]')
        this.cookieAcceptButton = page.locator('.fc-button.fc-cta-consent.fc-primary-button')
    }
    
    async openWeb(){
        await this.page.goto('https://automationexercise.com/login');
    }
    
    async  acceptCookie(){
        await this.cookieAcceptButton.click()
    }
    
    async signUp(name: string, email:string){
        await this.signUpNameInput.fill(name)
        await this.signUpEmailInput.fill(email)
        await this.signUpButton.click()
    }
    
}
import {Locator, Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    signUpNameInput: Locator;
    signUpEmailInput: Locator
    signUpButton: Locator;
    signUpHeading: Locator;
    loginHeading: Locator;
    loginEmailAddress: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    invalidLogInCredentials: Locator;
    alreadyExistinAccLabel: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.signUpNameInput = page.locator('[data-qa="signup-name"]')
        this.signUpEmailInput = page.locator('[data-qa="signup-email"]')
        this.signUpButton = page.locator('[data-qa="signup-button"]')
        this.signUpHeading = page.getByRole('heading', { name: 'New User Signup!' })
        this.loginHeading = page.getByRole('heading', { name: 'Login to your account' })
        this.loginEmailAddress = page.locator('[data-qa="login-email"]')
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.invalidLogInCredentials = page.getByText('Your email or password is incorrect!', { exact: true })
        this.alreadyExistinAccLabel = page.getByText('Email Address already exist!', { exact: true })
        
    }
    
    async openLoginPage(){
        await this.page.goto('https://automationexercise.com/login');
    }
    
    
    async signUp(name: string, email:string){
        await this.signUpNameInput.fill(name)
        await this.signUpEmailInput.fill(email)
        await this.signUpButton.click()
    }
    
    async logInInfo (email: string, password: string){
        await this.loginEmailAddress.fill(email)
        await this. passwordInput.fill(password)
    }
    
    async logIn (){
        await this.loginButton.click()
    }
    
    
}

import {Locator, Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    signupNameInput: Locator;
    signupEmailInput: Locator
    signupButton: Locator;
    signupHeading: Locator;
    loginHeading: Locator;
    loginEmailInput: Locator;
    loginPasswordInput: Locator;
    loginButton: Locator;
    invalidLoginCredentialsMessage : Locator;
    existingEmailErrorMessage: Locator;
    signupFormContainer: Locator;
    loginFormContainer: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.loginFormContainer = page.locator('.login-form');
        this.signupFormContainer = page.locator('.signup-form');
        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.invalidLoginCredentialsMessage  = this.loginFormContainer.getByText('Your email or password is incorrect!', { exact: true });
        this.existingEmailErrorMessage = this.signupFormContainer.getByText('Email Address already exist!', { exact: true });
        
    }
    
    async openLoginPage(){
        await this.page.goto('https://automationexercise.com/login');
    }
    
    
    async fillSignUpForm(name: string, email:string){
        await this.signupNameInput.fill(name)
        await this.signupEmailInput.fill(email)
    }

    async submitSignUp(){
        await this.signupButton.click()
    }
    
    async enterLoginCredentials (email: string, password: string){
        await this.loginEmailInput.fill(email)
        await this.loginPasswordInput.fill(password)
    }
    
    async submitLogin (){
        await this.loginButton.click()
    }
    
    
}

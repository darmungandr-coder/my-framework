import {expect, Locator, Page} from "@playwright/test";
import {user} from "../Utiles/userFactory";


export class MainPage{
    page: Page;
    carousel: Locator
    signupLoginButton: Locator
    deleteAccountButton: Locator
    deleteAccountHeading: Locator
    loggedInAsLabel: Locator
    logOutButton: Locator
    cookieAcceptButton: Locator;
    contactUsButton: Locator;




    constructor(page: Page) {
        this.page = page
        this.carousel = page.locator('.col-sm-12')
        this.signupLoginButton = page.getByRole('link', { name: 'Signup / Login' })
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' })
        this.deleteAccountHeading = page.getByText('ACCOUNT DELETED!')
        this.loggedInAsLabel = page.getByText(`Logged in as`)
        this.logOutButton = page.getByRole('link', { name: 'Logout' })
        this.cookieAcceptButton = page.locator('.fc-button.fc-cta-consent.fc-primary-button')
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' })
        

    }
    
    async openMainPage(){
        await this.page.goto('https://automationexercise.com/')
    }
    
    
    async signUpLogin(){
        await this.signupLoginButton.click()
    }
    
    async deleteAccount(){
        await this.deleteAccountButton.click()
    }
    
    async userLogOut(){
        await this.logOutButton.click()
    }

    async acceptCookie() {
        const isCookieVisible = await this.cookieAcceptButton
            .isVisible({ timeout: 5000 })
            .catch(() => false);

        if (isCookieVisible) {
            await this.cookieAcceptButton.click();
  }
}
    
    async openLogiInPage(){
        await this.openMainPage()
        await this.acceptCookie()
        await expect(this.carousel).toBeVisible()
        await this.signUpLogin()
    }
    
    async openContactUsPage(){
        await this.contactUsButton.click()
    }

    loggedInAs(name:string){
        return  this.page.getByText(`Logged in as ${name}`, { exact: true })
    }
}
import {expect, Locator, Page} from "@playwright/test";

export class UserRegistration{
    page: Page;
    heading: Locator
    title: Locator
    name: Locator
    password: Locator
    dateOfBirth: Locator;
    
    
    
    
    constructor(page: Page) 
    {
        this.page = page
        this.heading = page.getByRole('heading', { name: 'Enter Account Information' })
        this.title = page.getByRole('radio', {name: 'Mr.'})
        this.name = page.locator('#name')
        this.password = page.locator('#password')
        
    }
    
    async checkHeading(){
        await expect(this.heading).toBeVisible()
    }
    
    async enterAccInfo(name:string, password:string){
        await this.title.check()
        await this.name.fill(name)
        await this.password.fill(password)
        
    }
    
}
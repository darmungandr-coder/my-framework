import {expect, Locator, Page} from "@playwright/test";
import { User} from "../Utiles/userFactory";



export class UserRegistration{
    page: Page;
    heading: Locator
    title: Locator
    name: Locator
    password: Locator
    dateOfBirth: Locator;
    monthOfBirth: Locator;
    yearOfBirth: Locator;
    checkboxNewsLetter: Locator;
    checkboxSpecialOffers: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    companyNameInput: Locator;
    address1Input: Locator;
    address2Input: Locator;
    countrySelector: Locator;
    stateInput: Locator;
    cityInput: Locator;
    zipCodeInput: Locator;
    mobilePhoneInput: Locator;
    
    
    
    
    constructor(page: Page) 
    {
        this.page = page
        this.heading = page.getByRole('heading', { name: 'Enter Account Information' })
        this.title = page.getByRole('radio', {name: 'Mr.'})
        this.name = page.locator('#name')
        this.password = page.locator('#password')
        this.dateOfBirth = page.locator('#days')
        this.monthOfBirth = page.locator('#months')
        this.yearOfBirth = page.locator('#years')
        this.checkboxNewsLetter = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
        this.checkboxSpecialOffers = page.getByRole('checkbox', {name: 'Receive special offers from our partners!'})
        this.firstNameInput = page.getByRole('textbox', { name: 'First name *' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' })
        this.companyNameInput = page.locator('#company')
        this.address1Input = page.locator('#address1')
        this.address2Input = page.locator('#address2')
        this.countrySelector = page.locator('#country')
        this.stateInput = page.locator('#state[data-qa="state"]')
        this.cityInput = page.locator('#city[data-qa="city"]')
        this.zipCodeInput = page.locator('#zipcode[data-qa="zipcode"]')
        this.mobilePhoneInput = page.locator('#mobile_number[data-qa="mobile_number"]')
        
        
    }
    
    async checkHeading(){
        await expect(this.heading).toBeVisible()
    }
    
    async enterAccInfo(user : User){
        await this.title.check()
        await this.name.fill(user.name)
        await this.password.fill(user.password)
        await this.dateOfBirth.selectOption(user.dateOfBirth)
        await this.monthOfBirth.selectOption(user.monthOfBirth)
        await this.yearOfBirth.selectOption(user.yearOfBirth)
        await this.checkboxNewsLetter.check()
        await this.firstNameInput.fill(user.firstName)
        await this.lastNameInput.fill(user.lastName)
        await this.companyNameInput.fill(user.company)
        await this.address1Input.fill(user.address1)
        await this.address2Input.fill(user.address2)
        await this.countrySelector.selectOption(user.country)
        await this.stateInput.fill(user.state)
        await this.cityInput.fill(user.city)
        await this.zipCodeInput.fill(user.zipCode)
        await this.mobilePhoneInput.fill(user.mobilePhone)
        
        
    }
    
}
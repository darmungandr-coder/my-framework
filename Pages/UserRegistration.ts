import {expect, Locator, Page} from "@playwright/test";
import { User} from "../Utiles/userFactory";



export class UserRegistration {
    page: Page;
    accountInformationHeading: Locator
    titleMrRadioButton: Locator
    nameInput: Locator
    passwordInput: Locator
    birthDaySelect: Locator;
    birthMonthSelect: Locator;
    birthYearSelect: Locator;
    newsletterCheckbox: Locator;
    specialOffersCheckbox: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    companyInput: Locator;
    address1Input: Locator;
    address2Input: Locator;
    countrySelect: Locator;
    stateInput: Locator;
    cityInput: Locator;
    zipcodeInput: Locator;
    mobileNumberInput: Locator;
    createAccountButton: Locator;
    accountCreatedHeading: Locator;
    continueLink: Locator;
    


    constructor(page: Page) {
        this.page = page
        this.accountInformationHeading = page.getByText('Enter Account Information')
        this.titleMrRadioButton = page.getByRole('radio', {name: 'Mr.'})
        this.nameInput = page.locator('#name')
        this.passwordInput = page.locator('#password')
        this.birthDaySelect = page.locator('#days')
        this.birthMonthSelect = page.locator('#months')
        this.birthYearSelect = page.locator('#years')
        this.newsletterCheckbox = page.locator('#newsletter')
        this.specialOffersCheckbox = page.locator('#optin')
        this.firstNameInput = page.locator('#first_name')
        this.lastNameInput = page.locator('#last_name')
        this.companyInput = page.locator('#company')
        this.address1Input = page.locator('#address1')
        this.address2Input = page.locator('#address2')
        this.countrySelect = page.locator('#country')
        this.stateInput = page.locator('#state')
        this.cityInput = page.locator('#city')
        this.zipcodeInput = page.locator('#zipcode')
        this.mobileNumberInput = page.locator('#mobile_number')
        this.createAccountButton = page.getByRole('button', {name: 'Create Account'})
        this.accountCreatedHeading = page.locator('[data-qa="account-created"]')
        this.continueLink = page.locator('a:has-text("Continue")')

    }

    async checkHeading() {
        await expect(this.accountInformationHeading).toBeVisible()
    }

    async enterAccInfo(user: User) {
        await this.titleMrRadioButton.check()
        await this.nameInput.fill(user.name)
        await this.passwordInput.fill(user.password)
        await this.birthDaySelect.selectOption(user.dateOfBirth)
        await this.birthMonthSelect.selectOption(user.monthOfBirth)
        await this.birthYearSelect.selectOption(user.yearOfBirth)
    }

    async enterAddressInfo(user: User) {
        await this.firstNameInput.fill(user.firstName)
        await this.lastNameInput.fill(user.lastName)
        await this.companyInput.fill(user.company)
        await this.address1Input.fill(user.address1)
        await this.address2Input.fill(user.address2)
        await this.countrySelect.selectOption(user.country)
        await this.stateInput.fill(user.state)
        await this.cityInput.fill(user.city)
        await this.zipcodeInput.fill(user.zipCode)
        await this.mobileNumberInput.fill(user.mobilePhone)
    }

    async createAccount() {
        await this.createAccountButton.click()
    }

    async continueAfterCreateAccount() {
        await this.continueLink.click()

    }
    
    async  checkNewsLetter(){
        await this.newsletterCheckbox.check()
    }
    
    
    async  checkSpecialOffers(){
        await this.specialOffersCheckbox.check()
    }
    
    
    
}

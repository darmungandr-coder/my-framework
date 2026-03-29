import {Locator, Page} from "@playwright/test";
import {contactFormData} from "../Utiles/ContactFormData";

export class ContactUsPage{
    page: Page;
    getInTouchLabel: Locator
    nameTextBox: Locator
    emailTextBox: Locator
    subjectTextBox: Locator
    yourMessageHere: Locator
    attachFileButton: Locator
    submitButton: Locator
    
    
    constructor(page: Page) {
        this.page = page
        this.getInTouchLabel = page.getByRole('heading', { name: 'Get In Touch' })
        this.nameTextBox = page.getByRole('textbox', { name: 'Name' })
        this.emailTextBox = page.locator('[name="email"]')
        this.subjectTextBox = page.getByRole('textbox', { name: 'Subject' })
        this.yourMessageHere = page.getByRole('textbox', { name: 'Your Message Here' })
        this.attachFileButton = page.locator('[name="upload_file"]')
        this.submitButton = page.locator('[name="submit"]')
    }
    
    async fillContactInformation(){
        await this.nameTextBox.fill(contactFormData.name)
        await this.emailTextBox.fill(contactFormData.email)
        await this.subjectTextBox.fill(contactFormData.subjectText)
        await this.yourMessageHere.fill(contactFormData.yourMessageText)
        await this.attachFileButton.setInputFiles(contactFormData.attachFilePath)
    }
    
    async submitContactInformation(){
        await this.submitButton.click()
    }
    
}
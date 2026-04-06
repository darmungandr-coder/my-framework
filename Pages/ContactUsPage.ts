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
    getInTouchContainer: Locator
    successMessage: Locator

    
    
    constructor(page: Page) {
        this.page = page
        this.getInTouchContainer = page.locator('.contact-form')
        this.getInTouchLabel = page.getByRole('heading', { name: 'Get In Touch' })
        this.nameTextBox = page.locator('[data-qa="name"]')
        this.emailTextBox = page.locator('[data-qa="email"]')
        this.subjectTextBox = page.locator('[data-qa="subject"]')
        this.yourMessageHere = page.locator('[data-qa="message"]')
        this.attachFileButton = page.locator('[name="upload_file"]')
        this.submitButton = this.getInTouchContainer.getByRole('button', { name: 'Submit' })
        this.successMessage = this.getInTouchContainer.getByText('Success! Your details have been submitted successfully.')
    }
    
    async fillContactInformation(){
        await this.nameTextBox.fill(contactFormData.name)
        await this.emailTextBox.fill(contactFormData.email)
        await this.subjectTextBox.fill(contactFormData.subjectText)
        await this.yourMessageHere.fill(contactFormData.yourMessageText)
    }

    async selectFile(){
        await this.attachFileButton.setInputFiles(contactFormData.attachFilePath)
    }
    
    async submitContactFormAndAcceptAlert() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.submitButton.click();
        await this.successMessage.waitFor({ state: 'visible' });
    }
}

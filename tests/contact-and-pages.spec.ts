    import { test, expect } from '@playwright/test';
    import {MainPage} from "../Pages/MainPage";
    import {ContactUsPage} from "../Pages/ContactUsPage";

    


        test('Test Case 6: Contact Us Form', async ({page}) => {
        const mainPage = new MainPage(page)
        const contactUsPage = new ContactUsPage(page);
        
        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage()

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(mainPage.homePageSlider).toBeVisible()

        // Click on 'Contact Us' button
        await mainPage.openContactUsPage()

        // Verify 'GET IN TOUCH' is visible
        await expect (contactUsPage.getInTouchLabel).toBeVisible()

        // Enter name, email, subject and message
        await contactUsPage.fillContactInformation()

        // Upload file
        await contactUsPage.selectFile()

        // Click OK button and submit form
        await contactUsPage.submitContactFormAndAcceptAlert();
        await expect(contactUsPage.successMessage).toBeVisible();

        // Click 'Home' button and verify that landed to home page successfully
        await mainPage.openMainPage()
        await expect(mainPage.homePageSlider).toBeVisible()

    })

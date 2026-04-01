    import { test, expect } from '@playwright/test';
    import {MainPage} from "../Pages/MainPage";
    import {ContactUsPage} from "../Pages/ContactUsPage";

    


        test('Test Case 6: Contact Us Form', async ({page}) => {
        const mainPage = new MainPage(page)
        const contactUsPage = new ContactUsPage(page);
        
        // Main page 
        await mainPage.openMainPage()
        await mainPage.acceptCookie()
        await expect(mainPage.carousel).toBeVisible()
        await mainPage.openContactUsPage()
        
        // Contact us
        await expect (contactUsPage.getInTouchLabel).toBeVisible()
        await contactUsPage.fillContactInformation()
        await contactUsPage.submitContactInformation()
        

    })
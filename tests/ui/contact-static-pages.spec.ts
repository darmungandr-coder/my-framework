    import { test, expect } from '@playwright/test';
    import {MainPage} from "../../Pages/MainPage";
    import {ContactUsPage} from "../../Pages/ContactUsPage";
    import {NavigationBar} from "../../Pages/NavigationBar";
    import {TestCasePage} from "../../Pages/TestCasePage";

    


        test('Test Case 6: Contact Us Form', async ({page}) => {
        const mainPage = new MainPage(page)
        const navigationBar = new NavigationBar(page);
        const contactUsPage = new ContactUsPage(page);
        
        
        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage()

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(mainPage.homePageSlider).toBeVisible()

        // Click on 'Contact Us' button
        await navigationBar.openContactUsPage()
        await expect(page).toHaveURL('https://automationexercise.com/contact_us')
        await page.waitForLoadState('load')

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
        await contactUsPage.backToHomePage()
        await page.waitForLoadState('domcontentloaded')

        if (page.url().includes('google_vignette')) {
            await mainPage.openMainPage()
            await mainPage.acceptCookie()
        }

        await expect(page).toHaveURL('https://automationexercise.com/')
        await expect(mainPage.homePageSlider).toBeVisible()

    })

    test('Test Case 7: Verify Test Cases Page', async ({page}) => {
        const mainPage = new MainPage(page)
        const navigationBar = new NavigationBar(page);
        const testCasePage = new TestCasePage(page);
        
        
        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage()

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(mainPage.homePageSlider).toBeVisible()

        // Click on 'Test Cases' button
        await navigationBar.openTestCasePage()
        await expect(page).toHaveURL('https://automationexercise.com/test_cases')


        // Verify 'TEST CASES' is visible
        await expect (testCasePage.testCaseHeader).toBeVisible()

    })

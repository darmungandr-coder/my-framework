import { test, expect } from '@playwright/test';
import { MainPage } from '../Pages/MainPage';
import { Footer } from '../Pages/Footer';
import { user } from '../Utiles/userFactory';
import { NavigationBar } from '../Pages/NavigationBar';



test('10: Verify Subscription in home page', async ({page}) => {
    const mainPage = new MainPage(page)
    const footer = new Footer(page)

    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // Scroll down to footer
    await footer.scrollToFooter()

    // Verify text 'SUBSCRIPTION'
    await expect(footer.subscriptionHeading).toBeVisible()

    // Enter email address in input and click arrow button
    await footer.enterEmailInSubscriptionInput(user.email)
    await footer.clickOnSubscriptionSubmitButton()

    // Verify success message 'You have been successfully subscribed!' is visible
    await expect(footer.subscriptionSuccessMessage).toBeVisible()
})

test('11: Verify Subscription in Cart page', async ({page}) => {
    const mainPage = new MainPage(page)
    const footer = new Footer(page)
    const navigationBar = new NavigationBar(page)

    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // Click on 'Cart' button
    await navigationBar.openCartPage()

    // Scroll down to footer
    await footer.scrollToFooter()

    // Verify text 'SUBSCRIPTION'
    await expect(footer.subscriptionHeading).toBeVisible()

    // Enter email address in input and click arrow button
    await footer.enterEmailInSubscriptionInput(user.email)
    await footer.clickOnSubscriptionSubmitButton()

    // Verify success message 'You have been successfully subscribed!' is visible
    await expect(footer.subscriptionSuccessMessage).toBeVisible()
})
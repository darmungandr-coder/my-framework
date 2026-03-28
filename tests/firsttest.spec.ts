    import { test, expect } from '@playwright/test';
    import {createUser} from "../Utiles/userFactory";
    import {LoginPage} from "../Pages/LoginPage";
    import {UserRegistration} from "../Pages/UserRegistration";
    import {MainPage} from "../Pages/MainPage";

    test('Test Case 1: Register User', async ({ page }) => {
        const user = createUser();
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        const userRegistration = new UserRegistration(page);

        // Main page
        await mainPage.openMainPage()
        await loginPage.acceptCookie()
        await expect(mainPage.carousel).toBeVisible()
        await mainPage.signUpLogin()
        // SignUp page
        await expect(loginPage.signUpHeading).toBeVisible()
        await loginPage.signUp(user.name, user.email);
        await userRegistration.checkHeading();
        await userRegistration.enterAccInfo(user);
        await userRegistration.checkboxNewsLetter.check()
        await userRegistration.checkboxSpecialOffers.check()
        await userRegistration.enterAddressInfo(user);
        await userRegistration.createAccount()
        // Confirmation 
        await expect(userRegistration.accountCreatedHeading).toBeVisible()
        await userRegistration.continueAfterCreateAccount()

        // Main Page
        await mainPage.deleteAccountButton.click()
        await expect(mainPage.deleteAccountHeading).toBeVisible()


    })
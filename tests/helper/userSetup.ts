import { Page, expect } from '@playwright/test';
import { MainPage } from '../../Pages/MainPage';
import { LoginPage } from '../../Pages/LoginPage';
import { UserRegistration } from '../../Pages/UserRegistration';
import { User, createUser } from '../../Utiles/userFactory';


export async function ensureUserExists(page: Page, user: User) {
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    const userRegistration = new UserRegistration(page);


    await mainPage.openLogiInPage();
    await loginPage.logInInfo(user.email, user.password);
    await loginPage.logIn();
    if (await mainPage.loggedInAs(user.name).isVisible()){
        await mainPage.userLogOut();
    } else if (await loginPage.incorrectEmailOrPasswordMessage.isVisible()){
        await loginPage.signUp(user.name, user.email);
        await userRegistration.checkHeading();
        await userRegistration.enterAccInfo(user);
        await userRegistration.checkNewsLetter()
        await userRegistration.checkSpecialOffers()
        await userRegistration.enterAddressInfo(user);
        await userRegistration.createAccount()
        await expect(userRegistration.accountCreatedHeading).toBeVisible()
        await userRegistration.continueAfterCreateAccount()
3
    }



    

    
}
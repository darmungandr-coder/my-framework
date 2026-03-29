    import { test, expect } from '@playwright/test';
    import {createUser, user} from "../Utiles/userFactory";
    import {LoginPage} from "../Pages/LoginPage";
    import {UserRegistration} from "../Pages/UserRegistration";
    import {MainPage} from "../Pages/MainPage";
    import {ContactUsPage} from "../Pages/ContactUsPage";

    test.skip('Test Case 1: Register User', async ({ page }) => {
        const newUser = createUser();
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        const userRegistration = new UserRegistration(page);

        // Main page
        await mainPage.openLogiInPage()
        // SignUp page
        await expect(loginPage.signUpHeading).toBeVisible()
        await loginPage.signUp(newUser.name, newUser.email);
        await userRegistration.checkHeading();
        await userRegistration.enterAccInfo(newUser);
        await userRegistration.checkNewsLetter()
        await userRegistration.checkSpecialOffers()
        await userRegistration.enterAddressInfo(newUser);
        await userRegistration.createAccount()
        // Confirmation 
        await expect(userRegistration.accountCreatedHeading).toBeVisible()
        await userRegistration.continueAfterCreateAccount()

        // Main Page // Deleting
        await mainPage.deleteAccount()
        await expect(mainPage.deleteAccountHeading).toBeVisible()


    })
    
    
    test.skip('Test Case 2: Login User with correct email and password', async ({page}) =>{

        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        
        
        // Main page
        await mainPage.openLogiInPage()
        
        // Login page
        await expect(loginPage.loginHeading).toBeVisible()
        await loginPage.logInInfo(user.email, user.password);
        await loginPage.logIn()
        
        
        // Main page
        await expect(mainPage.loggedInAsLabel).toBeVisible()
        await expect(mainPage.loggedInAsLabel).toHaveText(`Logged in as ${user.name}`)
        // await mainPage.deleteAccount()
        // await expect(mainPage.deleteAccountHeading).toBeVisible()
    })
    
    test.skip('Test Case 3: Login User with incorrect email and password', async ({page})=>{
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        
        const invalidUser = {
            ...user,
            email: 'wrongemail@gmail.com',
            password: '123456'
            
        }
        
        // Main page
        await mainPage.openLogiInPage()


        // Login page
        await expect(loginPage.loginHeading).toBeVisible()
        await loginPage.logInInfo(invalidUser.email, invalidUser.password);
        await loginPage.logIn()
        await expect(loginPage.invalidLogInCredentials).toBeVisible()
        
    })
    
    test.skip('Test Case 4: Logout User', async ({page}) =>{
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);


        // Main page
        await mainPage.openLogiInPage()
        
        // Login page
        await expect(loginPage.loginHeading).toBeVisible()
        await loginPage.logInInfo(user.email, user.password);
        await loginPage.logIn()


        // Main page
        await expect(mainPage.loggedInAsLabel).toBeVisible()
        await expect(mainPage.loggedInAsLabel).toHaveText(`Logged in as ${user.name}`)
        
        await mainPage.userLogOut()
        await expect(page).toHaveURL('https://automationexercise.com/login')
    })
    
    test.skip('Test Case 5: Register User with existing email', async  ({page})=> {
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        // Main Page 
        await mainPage.openLogiInPage()
        // Login Page 
        await loginPage.signUp(user.name, user.email);
        await expect(loginPage.alreadyExistinAccLabel).toBeVisible()
    })
    
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
        await page.pause()
        

    })
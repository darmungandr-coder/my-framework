    import { test, expect } from '@playwright/test';
    import {createUser, user} from "../Utiles/userFactory";
    import {LoginPage} from "../Pages/LoginPage";
    import {UserRegistration} from "../Pages/UserRegistration";
    import {MainPage} from "../Pages/MainPage";
    import {ensureUserExists} from "./helper/userSetup";



    test('Test Case 1: Register User', async ({ page }) => {
        const newUser = createUser();
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        const userRegistration = new UserRegistration(page);

        // Open main page
        await mainPage.openMainPage();

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/')
        await expect(mainPage.homePageSlider).toBeVisible()

        // Open 'Signup/Login page
        await mainPage.openSignUpLoginPage()

        // Verify 'New User Signup!' is visible
        await expect(loginPage.signupHeading).toBeVisible()


        //  Enter name and email address
        await loginPage.fillSignUpForm(newUser.name, newUser.email);

        // Click 'Signup' button
        await loginPage.submitSignUp()

        // Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await userRegistration.checkHeading();

        //  Fill details: Title, Name, Email, Password, Date of birth
        await userRegistration.enterAccInfo(newUser);

        // Select checkbox 'Sign up for our newsletter!'
        await userRegistration.checkNewsLetter()

        // Select checkbox 'Receive special offers'
        await userRegistration.checkSpecialOffers()

        // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile number
        await userRegistration.enterAddressInfo(newUser);

        // Click 'Create Account button'
        await userRegistration.createAccount()


        // Verify that 'ACCOUNT CREATED!' is visible
        await expect(userRegistration.accountCreatedHeading).toBeVisible()


        // Click 'Continue' button
        await userRegistration.continueAfterCreateAccount()


        // Verify that 'Logged in as username' is visible
        await expect(mainPage.loggedInAsText).toBeVisible()
        await expect(mainPage.loggedInAs(newUser.name)).toBeVisible()



        // Click 'Delete Account' button
        await mainPage.deleteAccount()

        // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(mainPage.accountDeletedHeading).toBeVisible()
        await mainPage.continueAfterDeleteAccountButton.click()


    })

    test.describe('Authentication with shared user', () => {
        test.describe.configure({mode: 'serial'})

        test('Test Case 2: Login User with correct email and password', async ({page}) =>{
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        
        // Ensure user exists
        await ensureUserExists(page, user);

        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage();

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/')
        await expect(mainPage.homePageSlider).toBeVisible()

        // Click on 'Signup / Login' button
        await mainPage.openSignUpLoginPage()

        // Verify 'Login to your account' is visible
        await expect(loginPage.loginHeading).toBeVisible()

        // Enter correct email and password
        await loginPage.enterLoginCredentials(user.email, user.password);

        // Click 'Login' button
        await loginPage.submitLogin();

        // Verify that 'Logged in as username' is visible
        await expect(mainPage.loggedInAs(user.name)).toBeVisible()

        // Click 'Delete Account' button
        await mainPage.deleteAccount()

        // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(mainPage.accountDeletedHeading).toBeVisible()
        await mainPage.continueAfterDeleteAccountButton.click()
    })

        test('Test Case 4: Logout User', async ({page}) =>{
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        
        // Prepare user
        await ensureUserExists(page, user);

        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage();

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/')
        await expect(mainPage.homePageSlider).toBeVisible()

        // Click on 'Signup / Login' button
        await mainPage.openSignUpLoginPage()

        // Verify 'Login to your account' is visible
        await expect(loginPage.loginHeading).toBeVisible()

        // Enter correct email and password
        await loginPage.enterLoginCredentials(user.email, user.password);

        // Click 'Login' button
        await loginPage.submitLogin();

        // Verify that 'Logged in as username' is visible
        await expect(mainPage.loggedInAs(user.name)).toBeVisible()

        // Click 'Logout' button
        await mainPage.userLogOut()

        // Verify that user is navigated to login page
        await expect(page).toHaveURL('https://automationexercise.com/login')
    })

        test('Test Case 5: Register User with existing email', async  ({page})=> {
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        // Prepare user
        await ensureUserExists(page, user);

        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage();

        // Accept cookie
        await mainPage.acceptCookie()

        // Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/')
        await expect(mainPage.homePageSlider).toBeVisible()

        // Click on 'Signup / Login' button
        await mainPage.openSignUpLoginPage()

        // Verify 'New User Signup!' is visible
        await expect(loginPage.signupHeading).toBeVisible()

        // Enter name and already registered email address
        await loginPage.fillSignUpForm(user.name, user.email);

        // Click 'Signup' button
        await loginPage.submitSignUp()

        // Verify error 'Email Address already exist!' is visible
        await expect(loginPage.existingEmailErrorMessage).toBeVisible()


    })
    })
    
    

    
    test('Test Case 3: Login User with incorrect email and password', async ({page})=>{
        const mainPage = new MainPage(page)
        const loginPage = new LoginPage(page);
        
        const invalidUser = {
            ...user,
            email: 'wrongemail@gmail.com',
            password: '123456'
            
        }
        
        // Navigate to url 'http://automationexercise.com'
        await mainPage.openMainPage()

        // Accept cookie
        await mainPage.acceptCookie()

        // 3. Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/')
        await expect(mainPage.homePageSlider).toBeVisible()

        //  Click on 'Signup / Login' button
        await mainPage.openSignUpLoginPage()

        //  Verify 'Login to your account' is visible
        await expect(loginPage.loginHeading).toBeVisible()

        // Enter incorrect email address and password
        await loginPage.enterLoginCredentials(invalidUser.email, invalidUser.password);

        // Click 'login' button
        await loginPage.submitLogin()

        // Verify error message
        await expect(loginPage.invalidLoginCredentialsMessage).toBeVisible()
        
    })

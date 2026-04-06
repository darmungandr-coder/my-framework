import { Page, expect } from '@playwright/test';
import { MainPage } from '../../Pages/MainPage';
import { LoginPage } from '../../Pages/LoginPage';
import { UserRegistration } from '../../Pages/UserRegistration';
import { User } from '../../Utiles/userFactory';

type LoginResult = 'logged_in' | 'invalid_credentials' | 'unknown';

async function detectLoginResult(
  mainPage: MainPage,
  loginPage: LoginPage
): Promise<LoginResult> {
  await expect
    .poll(async () => {
      if (await mainPage.logoutLink.isVisible()) {
        return 'logged_in';
      }

      if (await loginPage.invalidLoginCredentialsMessage.isVisible()) {
        return 'invalid_credentials';
      }

      return 'unknown';
    }, { timeout: 7000 })
    .not.toBe('unknown');

  if (await mainPage.logoutLink.isVisible()) {
    return 'logged_in';
  }

  if (await loginPage.invalidLoginCredentialsMessage.isVisible()) {
    return 'invalid_credentials';
  }

  return 'unknown';
}

export async function ensureUserExists(page: Page, user: User) {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const userRegistration = new UserRegistration(page);

  await loginPage.openLoginPage();
  await mainPage.acceptCookie();
  await expect(loginPage.loginHeading).toBeVisible();

  await loginPage.enterLoginCredentials(user.email, user.password);
  await loginPage.submitLogin();

  const loginResult = await detectLoginResult(mainPage, loginPage);

  if (loginResult === 'logged_in') {
    await mainPage.userLogOut();
    return;
  }

  if (loginResult === 'invalid_credentials') {
    await loginPage.fillSignUpForm(user.name, user.email);
    await loginPage.submitSignUp();
    await userRegistration.checkHeading();
    await userRegistration.enterAccInfo(user);
    await userRegistration.checkNewsLetter();
    await userRegistration.checkSpecialOffers();
    await userRegistration.enterAddressInfo(user);
    await userRegistration.createAccount();

    await expect(userRegistration.accountCreatedHeading).toBeVisible();
    await userRegistration.continueAfterCreateAccount();
    await expect(mainPage.logoutLink).toBeVisible();
    await mainPage.userLogOut();
    return;
  }

  throw new Error(`Unknown login state. Current URL: ${page.url()}`);
}

    import { test, expect } from '@playwright/test';
    import {createUser} from "../Utiles/userFactory";
    import {LoginPage} from "../Pages/LoginPage";
    import {UserRegistration} from "../Pages/UserRegistration";

    test('Test Case 1: Register User', async ({ page }) => {
    const user = createUser();
    const loginPage = new LoginPage(page);
    const userRegistration = new UserRegistration(page);
    await loginPage.openWeb()
    await loginPage.acceptCookie()
    await loginPage.signUp(user.name, user.email)
    await userRegistration.checkHeading()
    await userRegistration.enterAccInfo(user)
    await page.getByRole('button', { name: 'Create Account' }).click()
    await expect(page.locator('b:has-text("ACCOUNT CREATED!")')).toHaveText('Account Created!');
    await page.locator('a:has-text("Continue")').click()
    await expect(page.getByRole('link', { name: 'Delete Account' })).toBeVisible()
    await page.getByRole('link', { name: 'Delete Account' }).click()
    await expect(page.locator('b:has-text("ACCOUNT DELETED!")')).toBeVisible()
    await expect(page.locator('b:has-text("ACCOUNT DELETED!")')).toHaveText('Account Deleted!');
})
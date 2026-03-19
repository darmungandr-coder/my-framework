import { test, expect } from '@playwright/test';

test('Test Case 1: Register User', async ({ page }) => {
    const nameInput = page.locator('[data-qa="signup-name"]')
    const emailInput = page.locator('[data-qa="signup-email"]')
    const signupButton = page.locator('[data-qa="signup-button"]')
    await page.goto('https://automationexercise.com/login');
    await page.locator('.fc-button.fc-cta-consent.fc-primary-button').click()
    await expect(nameInput).toBeVisible();
    await signupButton.click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await nameInput.fill('NewUser');
    await emailInput.fill('NewUser@email.com')
    await signupButton.click();
    await expect(page.getByRole('heading', { name: 'Enter Account I nformation' })).toBeVisible();
    await page.getByRole('radio', {name: 'Mr.'}).check()
    await expect(page.getByRole('radio', { name: 'Mr.' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Mrs.' })).not.toBeChecked();
    await page.locator('#name').fill('Daniel')
    await page.locator('#password').fill('554478896Dan')
    await page.locator('#days').selectOption('5')
    await page.locator('#months').selectOption('July')
    await page.locator('#years').selectOption('1997')
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check()
    await expect(page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })).toBeChecked();
    await page.getByRole('checkbox', {name: 'Receive special offers from our partners!'}).check()
    await expect(page.getByRole('checkbox', {name: 'Receive special offers from our partners!'})).toBeChecked()
    

    await page.pause();
    
    
})
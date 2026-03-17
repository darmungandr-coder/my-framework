import { test, expect } from '@playwright/test';

test('Addin product to shopping cart', async ({ page }) => {
    const productName = 'Frozen Tops For Kids';
    const shoppingCart = page.getByText('Cart', {exact: true})
    await page.goto('https://automationexercise.com/login');

    const acceptCookies = page.getByRole('button', {name: /accept|agree|consent|ok/i});

    if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click();
    }

    await page.getByRole('textbox', {name: 'Email Address'}).first().fill('darmungandr@gmail.com');
    await page.getByRole('textbox', {name: 'Password'}).fill('554478896Dan');
    await page.getByRole('button', {name: 'Login'}).click();


    const products = page.locator('.features_items .col-sm-4')
    await expect(products.first()).toBeVisible()
    const count = await products.count();
    console.log(count);


    for (let i = 0; i < count; i++) {

        if (await products.nth(i).locator('p').first().textContent() == productName) {
            await products.nth(i).locator('.fa.fa-shopping-cart').first().click();
            break;
        }

    }
    await expect(page.locator('.modal-title.w-100')).toContainText('Added!');
    await page.getByRole('button', {name: 'Continue Shopping'}).click()
    await page.pause();

    await shoppingCart.click();
    await page.locator('.table-responsive.cart_info').waitFor();
    const bool = await expect(page.locator('a', {hasText: 'Frozen Tops For Kids'})).toBeVisible();



});
    test.only('Rahul Shetty suggestions exercises', async ({ page }) => {
        const suggestions = page.locator('.suggestions');
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy')
        await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2')
        await page.locator('#signInBtn').click();
        await expect(page.locator('.col-lg-3.col-md-6.mb-3').first()).toBeVisible();
        await page.locator('button').filter({ hasText: 'Add ' }).last().click();
        await page.locator('a.nav-link.btn.btn-primary').click();
        await page.getByRole('button', { name: 'Checkout' }).click();
        await page.getByRole('textbox', { name: 'Please choose your delivery location. Then click on purchase button' }).pressSequentially('Rus',{delay: 300});
        const listOfSuggestions = page.locator('.suggestions a');
        await expect(suggestions).toBeVisible()
        const count = await listOfSuggestions.count()
        console.log(count);
        
        for (let i = 0; i < count; i++) {
            if ( await listOfSuggestions.nth(i).textContent() === 'Russia'){
                console.log('Yes')
                await listOfSuggestions.nth(i).click();
                break;
            }
        }

        await page.locator('input.btn.btn-success.btn-lg').click();
        await expect(page.locator('div.alert.alert-success.alert-dismissible')).toBeVisible();
        await page.pause();
        
        
    })
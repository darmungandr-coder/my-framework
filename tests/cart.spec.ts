import { test, expect } from '@playwright/test';
import { MainPage } from '../Pages/MainPage';
import { NavigationBar } from '../Pages/NavigationBar';
import { ProductsPage } from '../Pages/ProductsPage';
import { ProductDetailPage } from '../Pages/productDetailPage'; 


test ('Add Products in Cart', async ({page}) => {
    const mainPage = new MainPage(page)
    const navigationBar = new NavigationBar(page)
    const productsPage = new ProductsPage(page)
    const productDetailPage = new ProductDetailPage(page)

    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // Click on 'Products' button
    await navigationBar.openProductsPage()

    // Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products')

    // The products list is visible
    await productsPage.verifyFirstProductsAreVisible()

    // Hover over first product and click 'Add to cart' 
    await productsPage.hoverOverProductByIndex(0)
    await productsPage.clickOnAddToCartButtonOfHoveredProduct(0)

    // Hover over second product and click 'Add to cart'
    await productsPage.hoverOverProductByIndex(1)
    await productsPage.clickOnAddToCartButtonOfHoveredProduct(1)

    // Click 'View Cart' button
    await navigationBar.openCartPage()
    await page.pause()

    // Verify both products are added to Cart



    // Verify their prices, quantity and total price
})
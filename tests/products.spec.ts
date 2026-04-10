import { test, expect } from '@playwright/test';
import { MainPage } from '../Pages/MainPage';
import { NavigationBar } from '../Pages/NavigationBar';
import { ProductsPage } from '../Pages/ProductsPage';
import { ProductDetailPage } from '../Pages/productDetailPage'; 


test ('Verify All Products and product detail page', async ({page}) => {
    const mainPage = new MainPage(page)
    const navigationBar = new NavigationBar(page)
    const productsPage = new ProductsPage(page)
    const productDetailPage = new ProductDetailPage(page)
    
   

    // 1. Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // 2. Accept cookie
    await mainPage.acceptCookie()

    // 3. Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // 4. Click on 'Products' button
    await navigationBar.openProductsPage()

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products')

    // 6. The products list is visible
    await productsPage.verifyFirstProductsAreVisible()

    // 7. Click on 'View Product' of first product
    await productsPage.clickOnViewProductButtonOfFirstProduct()   

    // 8. Verify that product detail page is opened
    await expect(page).toHaveURL(/\/product_details\/\d+$/)   

    // 9. Verify that product details are visible: name, category, price, availability, condition, brand
    await productDetailPage.verifyProductDetails()
})

test ('Search Product', async ({page}) => {
    const mainPage = new MainPage(page)
    const navigationBar = new NavigationBar(page)
    const productsPage = new ProductsPage(page)    
   

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

    // Enter product name in search input and click search button
    await productsPage.searchProduct('Stylish Dress')

    // Verify 'SEARCHED PRODUCTS' is visible
    await expect(productsPage.searchedProductsHeading).toBeVisible()

    // Verify all the products related to search are visible
    await productsPage.verifySearchedProductsAreVisible('Stylish Dress')
})

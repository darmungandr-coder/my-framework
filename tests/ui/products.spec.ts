import { test, expect } from '@playwright/test';
import { MainPage } from '../../Pages/MainPage';
import { NavigationBar } from '../../Pages/NavigationBar';
import { ProductsPage } from '../../Pages/ProductsPage';
import { ProductDetailPage } from '../../Pages/productDetailPage'; 
import { ProductsSectionGrid } from '../../Pages/ProductsSectionGrid';
import {user} from '../../Utiles/userFactory'

test ('Test Case 8: Verify All Products and product detail page', async ({page}) => {
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
    await productsPage.openProductByIndex(0)   

    // 8. Verify that product detail page is opened
    await expect(page).toHaveURL(/\/product_details\/\d+$/)   

    // 9. Verify that product details are visible: name, category, price, availability, condition, brand
    await productDetailPage.verifyProductDetails()
})

test ('Test Case 9: Search Product', async ({page}) => {
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

test('18: View Category Products', async ({page}) => {
    const mainPage = new MainPage(page) 
    const productsSectionGrid = new ProductsSectionGrid(page)
    const womenCategory = "Women"
    const womenSubCategory = "Tops"
    const manCategory = 'Men'
    const manSubCategory = 'Tshirts'
    const categoryTitle = (category:string, subCategory:string) => `${category} - ${subCategory} Products`
   

    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // Verify that categories are visible on left side bar
    await expect(productsSectionGrid.categorySection).toBeVisible()

    // Click on 'Women' category
    await productsSectionGrid.clickOnCategory(womenCategory)

    // Click on any category link under 'Women' category, for example: Dress
    await productsSectionGrid.clickOnSubCategory(womenCategory,  womenSubCategory);

    // Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(productsSectionGrid.titleHelperText).toHaveText(categoryTitle(womenCategory, womenSubCategory))

    // On left side bar, click on any sub-category link of 'Men' category
    await productsSectionGrid.clickOnCategory(manCategory)
    await productsSectionGrid.clickOnSubCategory(manCategory,manSubCategory)

    //  Verify that user is navigated to that category page
    await expect(productsSectionGrid.titleHelperText).toHaveText(categoryTitle(manCategory, manSubCategory))

})

test('Test Case 19: View & Cart Brand Products', async ({page})=>{
    const mainPage = new MainPage(page) 
    const navigationBar = new NavigationBar(page)
    const productsSectionGrid = new ProductsSectionGrid(page)
    const brand = 'Polo'
    const brandTwo = 'Biba'
    const textHelper = (branName: string) => `Brand - ${branName} Products`
    
    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Click on 'Products' button
    await navigationBar.openProductsPage()

    // Verify that Brands are visible on left side bar
    await expect(productsSectionGrid.brandsSection).toBeVisible()

    // Click on any brand name
    await productsSectionGrid.clickOnBrand(brand)

    // Verify that user is navigated to brand page and brand products are displayed
    await expect(page).toHaveURL(`https://automationexercise.com/brand_products/${brand}`)
    await expect(productsSectionGrid.titleHelperText).toHaveText(textHelper(brand))

    //  On left side bar, click on any other brand link
    await productsSectionGrid.clickOnBrand(brandTwo)

    // Verify that user is navigated to that brand page and can see products
    await expect(page).toHaveURL(`https://automationexercise.com/brand_products/${brandTwo}`)
    await expect(productsSectionGrid.titleHelperText).toHaveText(textHelper(brandTwo))

})

test('Test Case 21: Add review on product', async ({page})=>{
    const mainPage = new MainPage(page) 
    const navigationBar = new NavigationBar(page)
    const productsSectionGrid = new ProductsSectionGrid(page)
    const productsPage = new ProductsPage(page)
    const reviewerMessage = 'Hello'


    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Click on 'Products' button
    await navigationBar.openProductsPage()

    // Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsSectionGrid.titleHelperText).toHaveText('All Products')

    //Click on 'View Product' button
    await productsPage.openProductByIndex(0)

    // Verify 'Write Your Review' is visible
    await expect(productsPage.writeYourReviewText).toBeVisible()

    // Enter name, email and review
    await productsPage.fillReviewersName(user.name)
    await productsPage.fillReviewersEmail(user.email)
    await productsPage.fillReviewersMessage(reviewerMessage)

    // Click 'Submit' button
    await productsPage.clickOnSubmitButton()

    // Verify success message 'Thank you for your review.'
    await expect(productsPage.successMessageForReview).toBeVisible()


}
)

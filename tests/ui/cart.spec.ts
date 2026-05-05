import { test, expect } from '@playwright/test';
import { MainPage } from '../../Pages/MainPage';
import { NavigationBar } from '../../Pages/NavigationBar';
import { ProductsPage } from '../../Pages/ProductsPage';
import { ProductDetailPage } from '../../Pages/productDetailPage'; 
import { CartPage } from '../../Pages/CartPage';
import { LoginPage } from '../../Pages/LoginPage';
import { UserRegistration } from '../../Pages/UserRegistration';
import { CheckoutPage } from '../../Pages/CheckoutPage';
import { PaymentPage } from '../../Pages/PaymentPage';
import { createUser } from '../../Utiles/userFactory';


test ('Test Case 12: Add Products in Cart', async ({page}) => {
    const mainPage = new MainPage(page)
    const navigationBar = new NavigationBar(page)
    const productsPage = new ProductsPage(page)
    const productDetailPage = new ProductDetailPage(page)
    
    const products: string[] = []

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
    await productsPage.productName(0)
    await productsPage.clickOnAddToCartButtonOfHoveredProduct(0)
    await expect(productsPage.addedModalHeading).toBeVisible()
    await productsPage.continueShopping()

    // Hover over second product and click 'Add to cart'
    await productsPage.hoverOverProductByIndex(1)
    await productsPage.clickOnAddToCartButtonOfHoveredProduct(1)
    await expect(productsPage.addedModalHeading).toBeVisible()

    // Click 'View Cart' button
    await productsPage.openCartFromAddedModal()

    // Verify both products are added to Cart


    // Verify their prices, quantity and total price
})

test('Test Case 13: Verify Product quantity in Cart', async ({page}) => {
    const mainPage = new MainPage(page)
    const productsPage = new ProductsPage(page)
    const productDetailPage = new ProductDetailPage(page)
    const cartPage = new CartPage(page)

    const quantity = '4'

    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // Click 'View Product' for any product on home page
    const productName = await productsPage.productName(0)
    await productsPage.openProductByIndex(0)

    // Verify product detail is opened
    await expect(page).toHaveURL(/\/product_details\/\d+/)
    await expect(productDetailPage.productName).toHaveText(productName)

    // Increase quantity to 4
    await productDetailPage.setQuantity(quantity)
    await expect(productDetailPage.quantityInput).toHaveValue(quantity)

    // Click 'Add to cart' button
    await productDetailPage.addToCart()
    await expect(productDetailPage.addedModalHeading).toBeVisible()

    // Click 'View Cart' button
    await productDetailPage.openCartFromAddedModal()
    await expect(page).toHaveURL('https://automationexercise.com/view_cart')

    // Verify that product is displayed in cart page with exact quantity
    await expect(cartPage.productRow(productName)).toBeVisible()
    await expect(cartPage.productName(productName)).toHaveText(productName)
    await expect(cartPage.productQuantity(productName)).toHaveText(quantity)
})

test('Test Case 14: Place Order: Register while Checkout', async ({page}) => {
    const newUser = createUser()
    const mainPage = new MainPage(page)
    const navigationBar = new NavigationBar(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const loginPage = new LoginPage(page)
    const userRegistration = new UserRegistration(page)
    const checkoutPage = new CheckoutPage(page)
    const paymentPage = new PaymentPage(page)

    const orderComment = 'Please deliver this order after 6 PM.'
    const cardNumber = '4111111111111111'
    const cvc = '123'
    const expirationMonth = '12'
    const expirationYear = '2030'

    // Navigate to url 'http://automationexercise.com'
    await mainPage.openMainPage()

    // Accept cookie
    await mainPage.acceptCookie()

    // Verify that home page is visible successfully
    await expect(mainPage.homePageSlider).toBeVisible()

    // Add products to cart
    const productName = await productsPage.productName(0)
    await productsPage.hoverOverProductByIndex(0)
    await productsPage.clickOnAddToCartButtonOfHoveredProduct(0)
    await expect(productsPage.addedModalHeading).toBeVisible()
    await productsPage.continueShopping()

    // Click 'Cart' button
    await navigationBar.openCartPage()

    // Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart')
    await expect(cartPage.shoppingCartBreadcrumb).toBeVisible()
    await expect(cartPage.productRow(productName)).toBeVisible()

    // Click Proceed To Checkout
    await cartPage.proceedToCheckout()

    // Click 'Register / Login' button
    await expect(cartPage.registerLoginButton).toBeVisible()
    await cartPage.openRegisterLoginFromCheckoutModal()

    // Fill all details in Signup and create account
    await expect(loginPage.signupHeading).toBeVisible()
    await loginPage.fillSignUpForm(newUser.name, newUser.email)
    await loginPage.submitSignUp()
    await expect(userRegistration.accountInformationHeading).toBeVisible()
    await userRegistration.enterAccInfo(newUser)
    await userRegistration.checkNewsLetter()
    await userRegistration.checkSpecialOffers()
    await userRegistration.enterAddressInfo(newUser)
    await userRegistration.createAccount()

    // Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(userRegistration.accountCreatedHeading).toBeVisible()
    await userRegistration.continueAfterCreateAccount()

    // Verify 'Logged in as username' at top
    await expect(mainPage.loggedInAs(newUser.name)).toBeVisible()

    // Click 'Cart' button
    await navigationBar.openCartPage()

    // Click 'Proceed To Checkout' button
    await cartPage.proceedToCheckout()

    // Verify Address Details and Review Your Order
    await expect(checkoutPage.addressDetailsHeading).toBeVisible()
    await expect(checkoutPage.reviewYourOrderHeading).toBeVisible()
    await expect(checkoutPage.deliveryAddressBox).toContainText(newUser.firstName)
    await expect(checkoutPage.deliveryAddressBox).toContainText(newUser.lastName)
    await expect(checkoutPage.deliveryAddressBox).toContainText(newUser.address1)
    await expect(checkoutPage.billingAddressBox).toContainText(newUser.firstName)
    await expect(checkoutPage.billingAddressBox).toContainText(newUser.lastName)
    await expect(checkoutPage.orderRow(productName)).toBeVisible()

    // Enter description in comment text area and click 'Place Order'
    await checkoutPage.addComment(orderComment)
    await checkoutPage.placeOrder()

    // Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentPage.fillPaymentDetails(newUser.name, cardNumber, cvc, expirationMonth, expirationYear)

    // Click 'Pay and Confirm Order' button
    await paymentPage.payAndConfirmOrder()

    // Verify success message
    await expect(paymentPage.orderPlacedHeading).toBeVisible()
    await expect(paymentPage.orderSuccessMessage).toBeVisible()

    // Click 'Delete Account' button
    await navigationBar.deleteAccount()

    // Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(mainPage.accountDeletedHeading).toBeVisible()
    await mainPage.continueAfterDeleteAccountButton.click()
})

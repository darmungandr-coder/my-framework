import { Page, Locator } from "@playwright/test";

export class CartPage{
    page: Page;
    cartTable: Locator;

    constructor(page: Page){
        this.page = page
        this.cartTable = page.locator('#cart_info_table')
        
    }


}
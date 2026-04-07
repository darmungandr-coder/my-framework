import { Locator, Page } from "@playwright/test";

export class TestCasePage {
    page: Page;
    testCaseHeader: Locator;
    


constructor(page: Page){
    this.page = page,
    this.testCaseHeader = page.locator('.col-sm-9.col-sm-offset-1').getByText('Test Cases')
}

}
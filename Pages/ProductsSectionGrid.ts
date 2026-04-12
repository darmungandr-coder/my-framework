import{Locator, Page} from "@playwright/test";

export class ProductsSectionGrid {
    page: Page;
    categorySection: Locator;
    
    

    

    constructor(page: Page) {
        this.page = page;
        this.categorySection = page.locator('.left-sidebar')

        
    }

    categoryPanel (categoryName: string){
        return this.categorySection.locator('.panel').filter({hasText: categoryName})
    }

    category (categoryName: string){
        return this.categoryPanel(categoryName).getByText(categoryName);

    }











}
import{Locator, Page} from "@playwright/test";

export class ProductsSectionGrid {
    page: Page;
    categorySection: Locator;
    featureItems: Locator;
    
    

    

    constructor(page: Page) {
        this.page = page;
        this.categorySection = page.locator('.left-sidebar')
        this.featureItems = page.locator('.features_items')

        
    }

    categoryPanel (categoryName: string){
        return this.categorySection.locator('.panel').filter({hasText: categoryName})
    }

    category (categoryName: string){
        return this.categoryPanel(categoryName).getByRole('link', {name: categoryName})
    }
    async clickOnCategory(categoryName: string){
        await this.category(categoryName).click()
    }

     subCategoryPanel(categoryName: string, subCategory: string){
        return this.categoryPanel(categoryName).filter({hasText: subCategory})
    }

    subCategory (categoryName: string, subCategoryName: string){
        return this.subCategoryPanel(categoryName, subCategoryName).getByRole('link', {name: subCategoryName})
    }

    async clickOnSubCategory(categoryName: string, subCategory: string){
        await this.subCategory(categoryName,subCategory).click()
    }

    


}
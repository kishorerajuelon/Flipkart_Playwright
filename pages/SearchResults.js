export class SearchResultsPage{

    constructor(page){
        this.page = page
        this.productTitles = page.locator(".nZIRY7")
    }

    async getSearchResultsCount(){
        await this.productTitles.first().waitFor()
        return await this.productTitles.count()
        
    }
    
    async FirstProductTitle(){
        return await this.productTitles.first().locator(".RG5Slk").innerText()
    }

    
  
}
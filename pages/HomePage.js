export class HomePage{
    constructor(page){
        this.page = page
        this.searchbox = page.getByPlaceholder("Search for Products, Brands and More").first()
    }

    async goto(){
        await this.page.goto("https://www.flipkart.com/")
    }

    async closeLogin(){
        await this.page.getByRole('button', { name: '✕' })
    }

    async searchProduct(productName){
        await this.searchbox.fill(productName)
        await this.searchbox.press("Enter")

    }

    async InvalidsearchProduct(invalidproductName){
        await this.searchbox.fill(invalidproductNameproductName)
        await this.searchbox.press("Enter")

    }
}
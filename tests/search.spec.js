import { test, expect } from "@playwright/test"
import { searchData } from "../utils/testdata"

import { SearchResultsPage } from "../pages/SearchResults"
import { HomePage } from "../pages/homepage"

test("TC01_Valid Search Product", async ({ page }) => {

    const home = new HomePage(page)
    const results = new SearchResultsPage(page)

    await home.goto()

    await expect(page).toHaveURL(/flipkart/i)

    await home.closeLogin()

    await expect(home.searchbox).toBeVisible()

    await home.searchProduct(searchData.valid)

    await expect(page).toHaveURL(/Iphone/i)

    const count = await results.getSearchResultsCount()

    expect(count).toBeGreaterThan(0)

    const firstProduct = await results.FirstProductTitle()
    expect(firstProduct.toLowerCase()).toContain('iphone')


})

test("TC_02 Invalid Search", async ({ page }) => {

    const home = new HomePage(page)
    const results = new SearchResultsPage(page)

    await home.goto()

    await expect(page).toHaveURL(/flipkart/i)
    

    await home.closeLogin()


    await home.searchProduct(searchData.invalid)


    const count = await results.getSearchResultsCount();
    expect(count).toBeGreaterThan(0);

    const titles = await results.productTitles.allTextContents();
    const relevant = titles.filter(title =>
        title.toLowerCase().includes('aasfghvgefg4657')
    );

    expect(relevant.length).toBe(0);

})

test("TC_03 Empty Search", async ({ page }) => {

    const home = new HomePage(page)
    const results = new SearchResultsPage(page)

    await home.goto()

    await expect(page).toHaveURL(/flipkart/i)

    const currentURL = page.url()


    await home.closeLogin()


    await home.searchProduct(searchData.empty)

    await expect(page).toHaveURL(currentURL)

    await expect(home.searchbox).toBeVisible()


})

test("TC_04 Auto Suggestions", async ({ page }) => {

    const home = new HomePage(page)
    const results = new SearchResultsPage(page)

    await home.goto()

    await expect(page).toHaveURL(/flipkart/i)

    const currentURL = page.url()


    await home.closeLogin()

    await expect(home.searchbox).toBeVisible()  

    await home.searchProduct(searchData.suggest)

    await expect(page).toHaveURL(/lap/i)

    const count = await results.getSearchResultsCount()
    expect(count).toBeGreaterThan(0)

    const titles = await results.productTitles.allTextContents()

     const relevant = titles.filter(title =>
        title.toLowerCase().includes("lap")
    )

    expect(relevant.length).toBeGreaterThan(0)

})
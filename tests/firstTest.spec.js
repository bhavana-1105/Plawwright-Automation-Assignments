const { test, expect } = require('@playwright/test')

test.describe("Basic Test", () => {
    test("Navigating to javascript tutorial in w3schools", async({page}) => {
        await page.goto("https://www.w3schools.com/js");
        const element = page.locator("//a[@class='ga-nav active']");
        expect(element).toHaveText('JAVASCRIPT');
    });
});
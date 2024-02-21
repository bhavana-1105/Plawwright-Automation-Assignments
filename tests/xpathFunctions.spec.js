const { test } = require('@playwright/test');

test("Using xpath functions for Orange HRM", async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState();
    const count = await page.evaluate(() => {
        const elements = document.evaluate('count(//label[text()="Username"])', document, null, XPathResult.NUMBER_TYPE, null);
        return elements.numberValue;
      });
    console.log(count);
    await page.locator("//span[text()='Admin']").click();
    await page.waitForLoadState();
    console.log("Using contains() function: "+await page.locator("//button[contains(@class,'oxd-button--secondary orangehrm-left-space')]").textContent()); //=> contains()
    console.log("Using text() function: "+ await page.locator("//label[text()='User Role']").textContent()); //=> text()
    console.log("Using label() function: "+await page.locator("label(//button[@type='button'])"));  //=> label()
})
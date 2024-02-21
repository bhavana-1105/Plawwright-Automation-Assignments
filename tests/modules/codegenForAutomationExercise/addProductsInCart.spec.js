import { test, expect } from '@playwright/test';

test('Add products in cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.waitForLoadState();
    await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
    await page.getByRole('link', { name: ' Products' }).click();
    // await page.frameLocator('iframe[name="aswift_6"]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad').click();
    await page.locator("//div[@class='single-products']").first().hover();
    //[data-product-id='1']
    await page.locator('.overlay-content > .btn').first().click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator("//div[@class='single-products']").nth(1).hover();
    await page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
    // await page.locator("[data-product-id='2']").first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' })).toBeVisible();
    await expect(page.getByRole('row', { name: 'Product Image Men Tshirt Men' })).toBeVisible();
    await expect(page.locator('#product-1')).toContainText('Rs. 500');
    await expect(page.locator('#product-2')).toContainText('Rs. 400');
    await expect(page.locator('#product-1')).toContainText('1');
    await expect(page.locator('#product-2')).toContainText('1');
    await expect(page.locator('#product-1')).toContainText('Rs. 500');
    await expect(page.locator('#product-2')).toContainText('Rs. 400');
});
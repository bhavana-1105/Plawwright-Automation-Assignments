import { test, expect } from '@playwright/test';

test('Navigate to PIM module', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await test.step("Login functinality", async() => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
  });
  await test.step("Navigation to PIM module", async () =>{
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
  });
  await test.step("Logout functionality", async() => {
    await page.locator("[class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();   
  });
});
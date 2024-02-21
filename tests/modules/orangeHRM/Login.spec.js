import { test, expect } from '@playwright/test';

test('Login to orange HRM website', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect.soft(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.locator("[class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect.soft(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
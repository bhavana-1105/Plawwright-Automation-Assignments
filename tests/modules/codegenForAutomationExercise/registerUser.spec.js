import { test, expect } from '@playwright/test';

test('Register User', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  await page.getByPlaceholder('Name').fill('AutomationUser4');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('automationuser123654@gmail.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.getByText('Enter Account Information')).toBeVisible();
  await page.getByLabel('Mr.').check();
  await page.getByLabel('Password *').fill('automationuser741');
  await page.locator('#days').selectOption('18');
  await page.locator('#months').selectOption('4');
  await page.locator('#years').selectOption('2001');
  await page.getByLabel('Sign up for our newsletter!').check();
  await page.getByLabel('Receive special offers from').check();
  await page.getByLabel('First name *').fill('Automation');
  await page.getByLabel('Last name *').fill('User');
  await page.getByLabel('Company', { exact: true }).fill('Organization');
  await page.getByLabel('Address * (Street address, P.').fill('Hyderabad, Coorparate colony');
  await page.getByLabel('State *').fill('Telangana');
  await page.getByLabel('City *').fill('Hyderabad');
  await page.locator('#zipcode').fill('500801');
  await page.getByLabel('Mobile Number *').fill('46826845');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText('Logged in as AutomationUser4')).toBeVisible();
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
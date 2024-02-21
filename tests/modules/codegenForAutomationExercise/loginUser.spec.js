import { test, expect } from '@playwright/test';
const { LoginUserWithCorrectEmailAndPassword } = require('../../../utils/pageObjects/modules/automationExercise/loginUserWithCorrectEmailAndPassword');
const { CoreLibrary } = require('../../../utils/library/coreLibrary');
const inputData = require('../../../utils/data/testdata/inputData.json');

test('Login user with correct email and password', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Home' }).click();
  const coreLib = new CoreLibrary();
  const loginUser = new LoginUserWithCorrectEmailAndPassword(page);
  await test.step("Create account through Signup", async() => {
    await loginUser.navigateToLoginPage();
    await coreLib.registerAccount(page, inputData.signUpDetails);
    await coreLib.logoutAccount(page);
  });
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(inputData.signUpDetails.emailAddress);
  await page.getByPlaceholder('Password').fill('Automation@123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Logged in as AutomationUser')).toBeVisible();
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
});
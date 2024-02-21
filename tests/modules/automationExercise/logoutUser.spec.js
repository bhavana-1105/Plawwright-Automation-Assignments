const { test, expect } = require('@playwright/test');
const { LoginUserWithCorrectEmailAndPassword } = require('../../../utils/pageObjects/modules/automationExercise/loginUserWithCorrectEmailAndPassword')
const { CoreLibrary } = require('../../../utils/library/coreLibrary');
const inputData = require('../../../utils/data/testdata/inputData.json');

test.beforeEach(async({page}) => {
  await page.goto('https://automationexercise.com/');
  const loginUser = new LoginUserWithCorrectEmailAndPassword(page);
  expect(loginUser.homePage,"Validate that the user is on home page").toBeVisible();
})

test('Logout user', async ({ page }) => {
  const coreLib = new CoreLibrary();
  const loginUser = new LoginUserWithCorrectEmailAndPassword(page);
  await test.step("Create account through Signup", async() => {
    await loginUser.navigateToLoginPage();
    await coreLib.registerAccount(page, inputData.signUpDetails);
    await coreLib.logoutAccount(page);
  });
  await test.step("Login user functionality", async() => {
    await test.step("Navigate to login page", async() => {
      await loginUser.navigateToLoginPage();
    });
    await test.step("Login user with valid credintials", async() => {
      await loginUser.performLogin(inputData.signUpDetails); 
    });
  });
  await test.step("Logout user functionality", async() => {
    await coreLib.logoutAccount(page);
    await page.waitForLoadState();
    await expect(loginUser.loginTxt,"Verifying whether the user is back to Login page").toBeVisible();
  }); 
});
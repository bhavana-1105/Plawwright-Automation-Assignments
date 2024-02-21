const { test, expect } = require('@playwright/test');
const { ContactUsForm } = require('../../../utils/pageObjects/modules/automationExercise/contactUsForm');
const inputData = require('../../../utils/data/testdata/inputData.json');

test.beforeEach(async({page}) => {
  await page.goto('https://automationexercise.com/');
  const contactUs = new ContactUsForm(page);
  expect(contactUs.homePage,"Validate that the user is on home page").toBeVisible();
});

test('Contact Us Form', async ({ page }) => {
  const contactUs = new ContactUsForm(page);
  await test.step("Navigate to contact us page", async() => { 
    await contactUs.navigateToContactUsPage();
  });
  await test.step("Give the inputs in contact us page", async() => {
    await contactUs.fillContactUsPageDetails(inputData.contactUsDetails);
  });
  await test.step("Validate the message displayed and go back to home page", async() => {
    await contactUs.validateSuccessMessage();
    await contactUs.goBackToHomePage();
  });
});
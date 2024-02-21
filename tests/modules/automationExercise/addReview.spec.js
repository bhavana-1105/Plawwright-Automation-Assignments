const { test, expect } = require('@playwright/test');
const { AddReview } = require('../../../utils/pageObjects/modules/automationExercise/addReview');
const inputData = require('../../../utils/data/testdata/inputData.json');

test.beforeEach(async({page}) => {
  await page.goto('https://automationexercise.com/');
  const addReview = new AddReview(page);
  await expect(addReview.homePage,"Validate that the user is on home page").toBeVisible();
})

test('Add review on product', async ({ page }) => {
  const addReview = new AddReview(page);
  await test.step("Navigate to products page", async() => {
    await addReview.navigateToProductsPage();
  });
  await test.step("Add review on first product", async() => {
    await addReview.clickOnViewProduct();
    await addReview.addReview(inputData.addReviewDetails);
  });
});
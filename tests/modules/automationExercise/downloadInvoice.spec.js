const { test, expect } = require('@playwright/test');
const { DownloadInvoice } = require('../../../utils/pageObjects/modules/automationExercise/downloadInvoice');
const inputData = require('../../../utils/data/testdata/inputData.json');

test.beforeEach(async({page}) => {
  await page.goto('https://automationexercise.com/');
  const downloadInvoice = new DownloadInvoice(page);
  expect(downloadInvoice.homePage,"Validate that the user is on home page").toBeVisible();
})

test('Download Invoice', async ({ page }) => {
  const downloadInvoice = new DownloadInvoice(page);
  await test.step("Add products to cart and navigate to cart page", async() => {
    await downloadInvoice.addProductToCart();
    await downloadInvoice.isNavigatedToCartPage();
  });
  await test.step("Proceed to checkout and create account", async() => {
    await downloadInvoice.clickProceedToCheckOut();
    await downloadInvoice.createAccount(inputData.signUpDetails);
  });
  await test.step("Navigate to cart page and place the order", async() => {
    await downloadInvoice.navigateToCartPage();
    await downloadInvoice.validateAddressDetails();
    await downloadInvoice.reviewOrder();
    await downloadInvoice.placeOrder(inputData.downloadInvoiceDetails.reviewMessage);
    await downloadInvoice.enterPayementDetails(inputData.downloadInvoiceDetails.paymentDetails);
  }); 
  await test.step("Download invoice", async() => {
    await downloadInvoice.downloadInvoice();
  });
  await test.step("Delete account", async() => {
    await downloadInvoice.deleteAccount();
  });
});
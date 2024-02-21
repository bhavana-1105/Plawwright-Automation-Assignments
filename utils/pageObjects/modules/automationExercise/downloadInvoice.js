const { expect } = require('@playwright/test');
const { CoreLibrary } = require('../../../library/coreLibrary')
class DownloadInvoice {
    constructor(page) {
        this.page = page;
        this.homePage = page.getByRole('link', { name: ' Home' });
        this.product = page.locator("//div[@class='single-products']").first();
        this.addToCartProduct1 = page.locator('.overlay-content > .btn').first();
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
        this.addToCartProduct2 = page.locator('div:nth-child(7) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn');
        this.addToCartProduct3 = page.locator('div:nth-child(6) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn');
        this.viewCart = page.getByRole('link', { name: 'View Cart' });
        this.cart = page.getByRole('link', { name: ' Cart' });
        this.shoppingCartHeader = page.getByText('Shopping Cart');
        this.proceedBtn = page.getByText('Proceed To Checkout');
        this.registerOrLoginBtn = page.getByRole('link', { name: 'Register / Login' });
        this.deliveryAddress = page.getByText('Your delivery address Mr.');
        this.productsDisplayed = page.locator("//tbody/tr");
        this.product1 = page.locator("#product-1");
        this.product2 = page.locator("#product-2");
        this.messageBox = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
        this.paymentPageHeader = page.locator("//h2[@class='heading']");
        this.nameOnCard = page.locator('input[name="name_on_card"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.cvc = page.getByPlaceholder('ex.');
        this.expiryMonth = page.getByPlaceholder('MM');
        this.expiryYear = page.getByPlaceholder('YYYY');
        this.confirmOrderBtn = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.orderSuccessMsg = page.getByText('Your order has been placed successfully!');
        this.orderPlacedTxt = page.getByText('Order Placed!');
        this.downloadInvoiceBtn = page.getByRole('link', { name: 'Download Invoice' });
        this.continueBtn = page.getByRole('link', { name: 'Continue' });
        this.deleteAccountBtn = page.getByRole('link', { name: ' Delete Account' });
        this.accountDeletedTxt = page.getByText('Account Deleted!');
    }
    async addProductToCart() {
        await this.product.hover();
        await this.addToCartProduct1.click();
        await this.page.waitForLoadState();
        await this.viewCart.click();
        await this.page.waitForLoadState();
    }
    async isNavigatedToCartPage() {
        await expect(this.shoppingCartHeader,"Validating that the user is navigated to cart page").toBeVisible();
    }
    async clickProceedToCheckOut() {
        await this.proceedBtn.click();
        await this.page.waitForLoadState();
    }
    async createAccount(signUpDetails) {
        await this.registerOrLoginBtn.click();
        await this.page.waitForLoadState();
        const coreLibrary = new CoreLibrary();
        await coreLibrary.registerAccount(this.page, signUpDetails);
    }
    async navigateToCartPage() {
        await this.cart.click();
        await this.page.waitForLoadState();
        await this.isNavigatedToCartPage();
        await this.clickProceedToCheckOut();
    }
    async validateAddressDetails() {
        await expect(this.deliveryAddress,"Validating the address details").toBeVisible();
    }
    async reviewOrder() {
        const recievedCount = await this.productsDisplayed.count();
        await expect.soft(this.product1,"Verify the order displayed under review order section").toBeVisible();
    }
    async placeOrder(reviewMessage) {
        await this.messageBox.fill(reviewMessage);
        await this.placeOrderBtn.click();
        await this.page.waitForLoadState();
    }
    async enterPayementDetails(paymentDetails) {
        await expect(this.paymentPageHeader,"Validating the payment page header").toHaveText('Payment');
        await this.nameOnCard.fill(paymentDetails.cardHolderName);
        await this.cardNumber.fill(paymentDetails.cardNumber);
        await this.cvc.fill(paymentDetails.cvc);
        await this.expiryMonth.fill(paymentDetails.expiryMonth);
        await this.expiryYear.fill(paymentDetails.expiryYear);
        await this.confirmOrderBtn.click();
        // await expect.soft(this.orderSuccessMsg,"Verifying the order succes message displayed in payment page").toBeVisible();
        await this.page.waitForLoadState();
    }
    async downloadInvoice() {
        await expect(this.orderPlacedTxt,"Varifying the order placed header").toBeVisible();
        // const downloadPromise = page.waitForEvent('download');
        await this.downloadInvoiceBtn.click();
        await this.page.waitForLoadState();
        // const download = await downloadPromise;
        //verify invoice is downloded successfully
        await this.continueBtn.click();
        await this.page.waitForLoadState();
    }
    async deleteAccount() {
        await this.deleteAccountBtn.click();
        await this.page.waitForLoadState();
        await expect(this.accountDeletedTxt, "Verifying account deleted text").toBeVisible();
        await this.continueBtn.click();
    }
}
module.exports = { DownloadInvoice };
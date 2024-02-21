const {  expect } = require('@playwright/test');
class AddReview {
    constructor(page) {
        this.page = page;
        this.homePage = page.getByRole('link', { name: ' Home' });
        this.products = page.getByRole('link', { name: ' Products' });
        this.allProductsHeader = page.getByRole('heading', { name: 'All Products' });
        this.viewProductBtn = page.locator('.choose > .nav > li > a').first();
        this.writeYourReviewHeading = page.getByRole('link', { name: 'Write Your Review' });
        this.name = page.getByPlaceholder('Your Name');
        this.email = page.getByPlaceholder('Email Address', { exact: true });
        this.reviewMessageBox = page.getByPlaceholder('Add Review Here!');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.reviewMessageDisplayed = page.locator('#reviews div').filter({ hasText: 'Thank you for your review. Submit' })
    }
    async navigateToProductsPage() {
        await this.products.click();
        await expect(this.allProductsHeader,"Validating all products heading displayed").toBeVisible();
    }
    async clickOnViewProduct() {
        await this.viewProductBtn.click();
        await expect(this.writeYourReviewHeading,"Validating the heading in add review page").toBeVisible();
    }
    async addReview(reviewDetails) {
        await this.name.fill(reviewDetails.name);
        await this.email.fill(reviewDetails.email);
        await this.reviewMessageBox.fill(reviewDetails.reviewMessage);
        await this.submitBtn.click();
        await expect(this.reviewMessageDisplayed,"Validating thank you message").toBeVisible();
    }
}
module.exports = { AddReview };
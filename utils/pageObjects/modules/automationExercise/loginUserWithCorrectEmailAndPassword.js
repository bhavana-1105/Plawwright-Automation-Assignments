const { expect } = require("@playwright/test");
class LoginUserWithCorrectEmailAndPassword {
    constructor(page) {
        this.page = page;
        this.homePage = this.page.getByRole('link', { name: ' Home' });
        this.signupOrLoginBtn = page.getByRole('link', { name: ' Signup / Login' })
        this.loginTxt = page.getByRole('heading', { name: 'Login to your account' });
        this.enterEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.enterPassword = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.userName = page.locator("//a[text()=' Logged in as ']/b");
        this.deleteAccountBtn = page.getByRole('link', { name: ' Delete Account' });
        this.accountDeleteTxt = page.getByText('Account Deleted!');
    }
    async navigateToLoginPage() {
        await this.signupOrLoginBtn.click();
        await this.page.waitForLoadState();
    }
    async performLogin(signUpDetails) {
        expect(this.loginTxt,"Validating Login to your account text in Login page").toBeVisible();
        await this.enterEmail.fill(signUpDetails.emailAddress);
        await this.enterPassword.fill(signUpDetails.password);
        await this.loginBtn.click();
        await this.page.waitForLoadState();
        await expect(this.userName,"Verifying the logged in as a username text displayed").toHaveText(signUpDetails.name);
    }
    async deleteAccount() {
        await this.deleteAccountBtn.click();
        await this.page.waitForLoadState();
        await expect(this.accountDeleteTxt, "Verifying account deleted text").toBeVisible();
    }
}
module.exports = {LoginUserWithCorrectEmailAndPassword};
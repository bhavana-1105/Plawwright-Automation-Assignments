const { expect } = require("@playwright/test");
const faker = require('../data/testdata/fakerData');
let fakerInputData = faker.signupDetails();

class RegisterUser {
    constructor(page) {
        this.page = page;
        this.signupOrLoginBtn = page.getByRole('link', { name: ' Signup / Login' });
        this.newUserSignupTxt = page.getByRole('heading', { name: 'New User Signup!' });
        this.name = page.getByPlaceholder('Name');
        this.email = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupBtn = page.getByRole('button', { name: 'Signup' });
        this.signupPageHeader = page.getByText('Enter Account Information');
        this.titleRadioBtn = page.getByLabel('Mr.');
        this.password = page.getByLabel('Password *');
        this.day = page.locator('#days');
        this.month = page.locator('#months');
        this.year = page.locator('#years');
        this.newsLetterCheckBox =  page.getByLabel('Sign up for our newsletter!');
        this.specialOffersCheckBox = page.getByLabel('Receive special offers from');
        this.firstName =  page.getByLabel('First name *');
        this.lastName = page.getByLabel('Last name *');
        this.company = page.getByLabel('Company', { exact: true });
        this.address = page.getByLabel('Address * (Street address, P.');
        this.country = page.getByLabel('Country');
        this.state = page.getByLabel('State *');
        this.city = page.getByLabel('City *');
        this.zipCode = page.locator('#zipcode');
        this.mobileNumber = page.getByLabel('Mobile Number *');
        this.createAccountBtn = page.getByRole('button', { name: 'Create Account' });
        this.accountCreatedTxt = page.getByText('Account Created!');
        this.continueBtn = page.getByRole('link', { name: 'Continue' });
        this.userName = page.locator("//a[text()=' Logged in as ']/b");
    }
    async navigateToLoginPage() {
        await this.signupOrLoginBtn.click();
        await this.page.waitForLoadState();
    }
    /**
     * Navigates to Signup page by clicking on Login/Signup button
     * @param {Object} signUpDetails
     * @param {String} signUpDetails.name 
     * @param {String} signUpDetails.emailAddress
     */
    async enterDetailsAndNavigateToSignupPage(signUpDetails) {
        await expect(this.newUserSignupTxt,"Validating new user signup! header").toBeVisible();
        await this.name.fill(signUpDetails.name);
        signUpDetails.emailAddress = fakerInputData.email;
        await this.email.fill(signUpDetails.emailAddress);
        await this.signupBtn.click();
        await this.page.waitForLoadState();
    }
    /**
     * Creates an account for user
     * @param {Object} signUpDetails 
     */
    async createAccount(signUpDetails) {
        await expect(this.signupPageHeader,"Validating signup page header").toBeVisible();
        await this.enterAccountInfo(signUpDetails);
        await this.enterAddressInfo(signUpDetails);
        await this.createAccountBtn.click();
        await this.page.waitForLoadState();
    }
    /**
     * Enter account information
     * @param {Object} signUpDetails 
     * @param {String} signUpDetails.password
     * @param {String} signUpDetails.day
     * @param {String} signUpDetails.month
     * @param {String} signUpDetails.year
     */
    async enterAccountInfo(signUpDetails) {
        await this.titleRadioBtn.check();
        await this.password.fill(signUpDetails.password);
        await this.day.selectOption(signUpDetails.day);
        await this.month.selectOption(signUpDetails.month);
        await this.year.selectOption(signUpDetails.year);
        await this.newsLetterCheckBox.check();
        await this.specialOffersCheckBox.check();
    }
    /**
     * Enter address information
     * @param {Object} signUpDetails 
     * @param {String} signUpDetails.firstName
     * @param {String} signUpDetails.lastName
     * @param {String} signUpDetails.company
     * @param {String} signUpDetails.address
     * @param {String} signUpDetails.country
     * @param {String} signUpDetails.state
     * @param {String} signUpDetails.city
     * @param {String} signUpDetails.zipCode
     * @param {String} signUpDetails.mobileNumber
     */
    async enterAddressInfo(signUpDetails) {
        await this.firstName.fill(signUpDetails.firstName);
        await this.lastName.fill(signUpDetails.lastName);
        await this.company.fill(signUpDetails.company);
        await this.address.fill(signUpDetails.address);
        await this.country.selectOption(signUpDetails.country);
        await this.state.fill(signUpDetails.state);
        await this.city.fill(signUpDetails.city);
        await this.zipCode.fill(signUpDetails.zipCode);
        await this.mobileNumber.fill(signUpDetails.mobileNumber);
    }
    /**
     * Verify's the account created
     */
    async validateAccountCreated(signUpDetails) {
        await expect(this.accountCreatedTxt,"Validating account created text").toBeVisible();
        await this.continueBtn.click();
        await expect(this.userName,"Verifying the logged in as a username text displayed").toHaveText(signUpDetails.name);
    }

}
module.exports = { RegisterUser };
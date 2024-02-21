const { expect } = require("@playwright/test");

class ContactUsForm {
    constructor(page) {
        this.page = page;
        this.homePage = page.getByRole('link', { name: ' Home' });
        this.contactUs = page.getByRole('link', { name: ' Contact us' });
        this.contactUsPageHeader = page.getByRole('heading', { name: 'Get In Touch' });
        this.name = page.getByPlaceholder('Name');
        this.email = page.getByPlaceholder('Email', { exact: true });
        this.subject = page.getByPlaceholder('Subject');
        this.messageBox = page.getByPlaceholder('Your Message Here');
        this.selectFile = page.locator('input[name="upload_file"]');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.contactPageTxt = page.locator('#contact-page');
        this.backToHomePage = page.locator("//a[@class='btn btn-success']/span");
    }
    async navigateToContactUsPage() {
        await this.contactUs.click();
        expect(this.contactUsPageHeader,"Validating text displayed in contact us page").toBeVisible();
    }
    async fillContactUsPageDetails(contactUsDetails) {
        await this.enterContactDetails(contactUsDetails);
        await this.uploadFileAndSubmit(contactUsDetails.filepath);
    }
    async enterContactDetails(contactUsDetails) {
        await this.name.fill(contactUsDetails.name);
        await this.email.fill(contactUsDetails.email);
        await this.subject.fill(contactUsDetails.subject);
        await this.messageBox.fill(contactUsDetails.message);
    }
    async uploadFileAndSubmit(filepath) {
        await this.selectFile.setInputFiles(filepath);
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
        });
        await this.page.waitForLoadState();
        await this.submitBtn.click();
        await this.page.waitForLoadState();
    }
    async validateSuccessMessage() {
        await expect(this.contactPageTxt,"Validating success message displayed").toContainText('Success! Your details have been submitted successfully.');
    }
    async goBackToHomePage() {
        await this.backToHomePage.click();
        await expect(this.homePage,"Validating that the user is on home page").toBeVisible();
    }
}
module.exports = { ContactUsForm };
class Form{
    constructor(page) {
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByPlaceholder('name@example.com');
        this.gender = page.getByText('Male', { exact: true });
        this.mobileNumber = page.getByPlaceholder('Mobile Number');
        this.dOB = page.locator('#dateOfBirthInput');
        this.subjects = page.locator('.subjects-auto-complete__value-container');
        this.hobbies = page.getByText('Sports');
        this.selectPicture = page.getByText('Select picture');
        this.currentAddress = page.getByPlaceholder('Current Address');
        this.state = page.getByText('Select State');
        this.city = page.locator('div').filter({ hasText: /^Select City$/ }).first();
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
    }
}
module.exports = { Form };
const { test, expect} = require("@playwright/test")
const {Form} = require('../utils/pageObjects/form');
test.describe("Practice Form", () => {
    test("Student Registration Form", async({page}) => {
        await page.goto("https://demoqa.com/automation-practice-form");
        const form = new Form(page);
        await expect(form.firstName, "Validating the first name text box visibility").toBeVisible();
        await expect(form.lastName, "Validating the last name text box visibility").toBeVisible();
        await expect(form.email, "Validating the email text box visibility").toBeVisible();
        await expect(form.gender, "Validating the gender radio btn visibility").toBeVisible();
        await expect(form.mobileNumber, "Validating the mobile number text box visibility").toBeVisible();
        await expect(form.dOB, "Validating the date of birth text box visibility").toBeVisible();
        await expect(form.subjects, "Validating the subjects text box visibility").toBeVisible();
        await expect(form.hobbies, "Validating the hobbies radio btn visibility").toBeVisible();
        await expect(form.selectPicture, "Validating the select file field visibility").toBeVisible();
        await expect(form.currentAddress, "Validating the current address text box visibility").toBeVisible();
        await expect(form.state, "Validating the state text box visibility").toBeVisible();
        await expect(form.city, "Validating the city text box visibility").toBeVisible();
        await expect(form.submitBtn, "Validating the submit button visibility").toBeVisible();
    });
});

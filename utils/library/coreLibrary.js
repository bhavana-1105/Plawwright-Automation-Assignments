const { RegisterUser } = require("../pageObjects/registerUser");
const { LogoutUser } = require("../pageObjects/modules/automationExercise/logoutUser");
class CoreLibrary {
   async registerAccount(page, signUpDetails) {
    const registerUser = new RegisterUser(page);
    await registerUser.enterDetailsAndNavigateToSignupPage(signUpDetails);
    await registerUser.createAccount(signUpDetails);
    await registerUser.validateAccountCreated(signUpDetails);
   }
   async logoutAccount(page) {
    const logoutUser = new LogoutUser(page);
    await logoutUser.logout.click();
   }
} 

module.exports = { CoreLibrary };
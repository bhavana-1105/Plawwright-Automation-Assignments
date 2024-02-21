const { faker } = require("@faker-js/faker");
const inputData = require('../../../utils/data/testdata/inputData.json');
module.exports = {
    signupDetails: () => {
        let userData = {
            username: faker.person.fullName(),
            email: inputData.signUpDetails.emailAddress + faker.string.alphanumeric(5) +"@gmail.com",
        }
        return userData;
    }
}
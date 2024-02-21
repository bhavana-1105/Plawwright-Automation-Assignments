class LogoutUser {
    constructor(page) {
        this.page = page;
        this.logout = page.getByRole('link', { name: ' Logout' })
    }
}
module.exports = { LogoutUser };
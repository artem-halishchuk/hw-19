class User {
    constructor(login, password, bornDate) {
        this.login = login;
        this.password = password;
        this.bornDate = bornDate;
    }
    static create(user) {
        return new User(user.login, null, user['date_born']);
    }
}
module.exports = User;
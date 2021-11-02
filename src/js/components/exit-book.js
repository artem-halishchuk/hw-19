const LoginScreenComponent = require('./LoginScreenComponent');
const UnauthorizedScreenComponent = require('./UnauthorizedScreenComponent');
class ExitBook {

    constructor(selector, AboutContact, registerForm) {
        this.selector = selector;
        this.aboutContact = AboutContact;
        this.registerForm = registerForm;
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }
    init() {
        this.container = document.querySelector(this.selector);
        this.unauthorizedScreen = new UnauthorizedScreenComponent('.unauthorized-screen');
        this.loginScreen = new LoginScreenComponent('.contactBook');

    }
    exit() {
        this.container.addEventListener('click', () => {
            this.aboutContact.hiddenBlockExit();
            this.loginScreen.hidden(true);
            this.unauthorizedScreen.show(true);
            sessionStorage.setItem('token', '');
            this.registerForm.hidden();

        })
    }
}
module.exports = ExitBook;
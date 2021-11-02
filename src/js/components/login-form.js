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
class LoginForm {
    constructor(selector, userServices, registerForm) {
        this.selector = selector;
        this.userServices = userServices;
        this.registerForm = registerForm;
        this.onLogin = () => {}; //обработчик успешного логина. который можно переопределить

        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.binds();
        });
    }
    init() {
        this.container = document.querySelector(this.selector);
        this.loginInput = this.container.querySelector('.login-form #login_user_login');
        this.passwordInput = this.container.querySelector('.login-form #login_user_password');
        this.button = this.container.querySelector('.login-form button');
        this.buttonShowRegister = this.container.querySelector('.btn_register_show');
        this.popUp = document.body.querySelector('.popup-register');
        this.showRegister();
    }
    binds() {
        this.button.addEventListener('click', () => this.login());

    }
    login() {
        let user = new User(
            this.loginInput.value,
            this.passwordInput.value,
        )
        if(this.loginInput.value === '' || this.passwordInput.value === '') {
            //alert('Заполните все для взода.');
            this.showPopUp();
            return;
        }
        else {
            this.userServices.login(user)
                .then(response => {
                    if(response.status === 'error') this.loginError(response.error);
                    else this.successLogin(response); //token = response
                    //sessionStorage.setItem('token', '');
                })
        }

    }
    loginError(text) {
        alert(text);
    }
    successLogin(response) {
        sessionStorage.setItem('userName', this.loginInput.value);

        let token = response.token; //token
        console.log('token: '+token);
        sessionStorage.setItem('token', token);
        this.onLogin();
        this.clearForm();
    }
    clearForm() {
        this.loginInput.value = '';
        this.passwordInput.value = '';
    }
    showRegister() {
        this.buttonShowRegister.addEventListener('click', () => this.registerForm.show());
    }
    showPopUp() {
        this.popUp.childNodes[1].innerHTML = 'Заполните все поля для входа';
        this.popUp.classList.add("animationPopUp");
        setTimeout(() => {
            this.popUp.classList.remove("animationPopUp");
        }, 2000);
    }
}
module.exports = LoginForm;
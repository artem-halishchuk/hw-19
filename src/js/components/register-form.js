class RegisterForm {
    constructor(selector, userServices) {
        this.selector = selector;
        this.userServices = userServices;
        this.onRegister = () => {}; //обработчик успешной регистр. который можно переопределить
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.binds();
        });
    }
    init() {
        this.container = document.querySelector(this.selector);
        this.loginInput = this.container.querySelector('#register_user_login');
        this.passwordInput = this.container.querySelector('#register_user_password');
        this.bornInput = this.container.querySelector('#register_user_born');
        this.button = this.container.querySelector('.register-form .btn_success');
        this.buttonClosed = this.container.querySelector('.register-form .btn_closed');
        this.popUp = document.body.querySelector('.popup-register');
        this.hiddenHandler();
        //this.hidden();
        //this.show();
    }
    binds() {
        this.button.addEventListener('click', () => this.register());
    }
    register() {
        let user = {
            //важен порядок
            login: this.loginInput.value,
            password: this.passwordInput.value,
            bornDate: this.bornInput.value,
        };
        this.userServices.register(user).then(response => {
            if(response.status === 'error') this.registerError(response.error);
            else this.successRegister();
        });
    }
    registerError(text) {
        this.popUp.childNodes[1].innerHTML = text;
        this.showPopUp();
    }
    successRegister() {
        this.clearForm();
        this.hidden();
        this.onRegister();
        this.popUp.childNodes[1].innerHTML = 'Учетная запись создана';
        this.showPopUp();
    }
    clearForm() {
        this.loginInput.value = '';
        this.bornInput.value = '';
        this.passwordInput.value = '';
    }
    show() {
        this.container.style.display = 'block';
    }
    hidden() {
        this.container.style.display = 'none';

    }
    hiddenHandler() {
        this.buttonClosed.addEventListener('click', () => {
            this.container.style.display = 'none'
        });
    }
    showPopUp() {
        this.popUp.classList.add("animationPopUp");
        setTimeout(() => {
            this.popUp.classList.remove("animationPopUp");
        }, 2000);
    }
}
module.exports = RegisterForm;
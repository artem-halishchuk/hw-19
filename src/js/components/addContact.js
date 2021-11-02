class AddContact {
    constructor(selector, bookServices) {
        this.selector = selector;
        this.bookServices = bookServices;
        this.typeValue = null;
        this.onAdd = () => {}; //обработчик успешного логина. который можно переопределить
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.binds();
        });
    }
    init() {
        this.container = document.querySelector(this.selector);
        this.name = this.container.querySelector('.contactBook-add__name');
        this.typeSwitcher = this.container.querySelector('.contactBook-add__select');
        this.controlPhone = this.container.querySelector('.contactBook-add__phone');
        this.controlMail = this.container.querySelector('.contactBook-add__mail');
        this.buttonAdd = this.container.querySelector('.contactBook-add__btn');
        this.popUp = document.body.querySelector('.popup-register');
    }
    binds() {
        this.buttonAdd.addEventListener('click', () => this.addContact());
    }
    choiceType() {
        if (this.typeSwitcher.value === 'phone') {
            this.controlPhone.style.display = 'block';
            this.controlMail.style.display = 'none';
        }
        else {
            this.controlPhone.style.display = 'none';
            this.controlMail.style.display = 'block';
        }
        this.typeSwitcher.addEventListener('click', () => {
            this.choiceType();
        })
    }
    addContact() {
        if (this.typeSwitcher.value === 'phone') this.typeValue = this.controlPhone.value;
        else this.typeValue = this.controlMail.value;
        let contact = {
            type: this.typeSwitcher.value,
            value: this.typeValue,
            name: this.name.value,
        };
        if(contact.value === '' || contact.name === '') {
            this.popUp.childNodes[1].innerHTML = 'Заполните все поля для добавления контакта';
            this.showPopUp();
            return;
        }
        else {
            this.bookServices.addContact(contact).then(response => {
                if(response.status === 'error') this.addError(response.error);
                else this.successAdded();
            });
        }



    }
    addError(text) {
        alert(text);
    }
    successAdded() {
        this.clearForm();
        this.popUp.childNodes[1].innerHTML = 'Контакт добавлен';
        this.showPopUp();
        this.onAdd();
    }
    clearForm() {
        this.name.value = '';
        this.controlPhone.value = '';
        this.controlMail.value = '';
    }
    showPopUp() {
        //this.popUp.childNodes[1].innerHTML = 'Учетная запись создана';
        this.popUp.classList.add("animationPopUp");
        setTimeout(() => {
            this.popUp.classList.remove("animationPopUp");
        }, 1300);
    }

}
module.exports = AddContact;
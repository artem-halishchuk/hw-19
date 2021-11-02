(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class AboutContact {
    constructor(selector, listContacts, bookServices) {
        this.selector = selector;
        this.listContacts = listContacts; //class
        this.bookServices = bookServices;
        this.showId = null;
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }
    init() {
        this.container = document.querySelector(this.selector);
    }
    displayBlock() {
        this.listContacts.init().addEventListener('click', e => {
            if(e.target.parentElement.matches('li')) {
                this.showId = e.target.parentElement.dataset.id;

                this.showContact();
                this.container.style.display = 'block';
            }
        })
    }
    hiddenBlock() {
        this.container.addEventListener('click', e => {
            if(e.target.matches('.contactBook-about__exit' || '.contactBook-header__exit')) {
                this.container.style.display = 'none';
            }
        })
    }
    hiddenBlockExit() {
        this.container.style.display = 'none';
    }
    showContact() {
        this.bookServices.getContacts()
            .then(request => request.contacts)
            .then(contacts => contacts.map(contact => {
                if (this.showId == contact.id) {
                    this.container.innerHTML = this.createContent(contact);
                }
            }))
    }
    createContent(contact) {
        let content = '';

        this.contactBookAboutContent = document.createElement('div');
        this.contactBookAboutContent.classList.add('contactBook-about__content');

        this.contactBookContentName = document.createElement('p');
        this.contactBookContentName.classList.add('contactBook-content__name');
        this.contactBookContentName.innerHTML = 'Имя: ' + contact.name;
        this.contactBookAboutContent.append(this.contactBookContentName);

        this.contactBookContentContact = document.createElement('p');
        this.contactBookContentContact.classList.add('contactBook-content__contact');
        if(contact.type === 'phone') {
            this.contactBookContentContact.innerHTML = 'Телефон: ';
            this.contactValue = document.createElement('a');
            this.contactValue.href = 'tel:'+contact.value;
            this.contactValue.innerHTML = contact.value;
            this.contactBookContentContact.append(this.contactValue);
        }
        else {
            this.contactBookContentContact.innerHTML = 'Почта: ';
            this.contactValue = document.createElement('a');
            this.contactValue.href = 'mailto:'+contact.value;
            this.contactValue.innerHTML = contact.value;
            this.contactBookContentContact.append(this.contactValue);
        }
        this.contactBookAboutContent.append(this.contactBookContentContact);

        this.contactBookAboutExit = document.createElement('button');
        this.contactBookAboutExit.classList.add('contactBook-about__exit');
        this.contactBookAboutExit.innerHTML = 'Выход';

        content += this.contactBookAboutContent.outerHTML;
        content += this.contactBookAboutExit.outerHTML;
        return content;
    }
}
module.exports = AboutContact;
},{}],2:[function(require,module,exports){
class LoginScreenComponent {
    constructor(selector) {
        this.selector = selector;

        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.hidden();
            this.show();
        })
    }
    init() {
        this.container = document.querySelector(this.selector);
    }
    hidden(a) {
        this.init();
        if(a) this.container.style.display = 'none';
    }
    show(a) {
        this.init();
        if(a) this.container.style.display = a;
    }
}
module.exports = LoginScreenComponent;
},{}],3:[function(require,module,exports){
class UnauthorizedScreenComponent {
    constructor(selector) {
        this.selector = selector;
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.hidden();
            this.show();
        })
    }
    init() {
        this.container = document.querySelector(this.selector);
    }
    hidden(a) {
        this.init();
        if(a) this.container.style.display = 'none';
    }
    show(a) {
        this.init();
        if(a) this.container.style.display = 'block';
    }
}
module.exports = UnauthorizedScreenComponent;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./LoginScreenComponent":2,"./UnauthorizedScreenComponent":3}],6:[function(require,module,exports){
class ListContacts {
    constructor(selector, bookServices) {
        this.selector = selector;
        this.bookServices = bookServices;
        //this.onLogin = () => {}; //обработчик успешного логина. который можно переопределить
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.binds();
        });
    }
    init() {
        this.container = document.querySelector(this.selector);
        return this.container;
    }
    binds() {
        //this.button.addEventListener('click', () => this.login());
    }
    showContacts() {
        let items = '';
        this.bookServices.getContacts()
            .then(request => request.contacts)
            .then(contacts => contacts.map(contact => {
                items += this.createItemListContact(contact).outerHTML;
                console.log(contacts);
            }))
            .then(response => this.container.innerHTML = items);
    }
    createItemListContact(contact) {
        this.itemListContact = document.createElement('li');
        this.itemListContact.classList.add('contactBook-list__item', 'contactBook-item');
        this.itemListContact.dataset.id = contact.id;
        this.itemButton = document.createElement('button');
        this.itemButton.classList.add('contactBook-item__button');
        this.itemButton.innerHTML = contact.name;
        this.itemListContact.append(this.itemButton);
        return this.itemListContact;
    }
}
module.exports = ListContacts;
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
const Script = require('./script');
//components
const AboutContact = require('./components/AboutContact');
//import {AboutContact} from './components/AboutContact'
const AddContact = require('./components/addContact');
const ExitBook = require('./components/exit-book');
const ListContacts = require('./components/list-contacts');
const LoginForm = require('./components/login-form');
const LoginScreenComponent = require('./components/LoginScreenComponent');
const RegisterForm = require('./components/register-form');
const UnauthorizedScreenComponent = require('./components/UnauthorizedScreenComponent');
//models
const User = require('./models/user');
//services
const BookServices = require('./services/book-services');
const UserServices = require('./services/user-services');
//----------------------------------------------------------

let userServices = new UserServices();

let loginScreen = new LoginScreenComponent('.contactBook');
let unauthorizedScreen = new UnauthorizedScreenComponent('.unauthorized-screen');

let registerForm = new RegisterForm('.row-register', userServices, User);//register-form

let loginForm = new LoginForm('.login-form', userServices, registerForm);

let bookServices = new BookServices();
let listContacts = new ListContacts('.contactBook-list__items', bookServices);
let aboutContact = new AboutContact('.contactBook__about', listContacts, bookServices);
let addContact = new AddContact('.contactBook-add__form', bookServices);
let exitBook = new ExitBook('.contactBook-header__exit', aboutContact, registerForm);

loginForm.onLogin = () => {
    loginScreen.show('grid');
    unauthorizedScreen.hidden(true);
    bookServices.userName();

    listContacts.showContacts();
    exitBook.exit();

    aboutContact.displayBlock();
    aboutContact.hiddenBlock();

    addContact.choiceType();
    addContact.onAdd = () => {
        listContacts.showContacts();
    }
};

//new Script();

},{"./components/AboutContact":1,"./components/LoginScreenComponent":2,"./components/UnauthorizedScreenComponent":3,"./components/addContact":4,"./components/exit-book":5,"./components/list-contacts":6,"./components/login-form":7,"./components/register-form":8,"./models/user":10,"./script":11,"./services/book-services":12,"./services/user-services":13}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
class Script {
    constructor() {
        console.log(12);
        this.init();
    }
    init() {
        document.addEventListener("DOMContentLoaded", () => {
            let users = [];

            class User {
                constructor(name) {
                    this.name = name;
                    this.notes = [];
                }
            }

            //test users start
            let vasia = new User('vasia', 0);
            let petia = new User('petia', 1);
            users.push(vasia);
            users.push(petia);
            //test users end

            class Note {
                constructor(name, note) {
                    this.name = name;
                    this.note = note;
                }
            }

            //test notes start
            let note = new Note('note-1', 'text note-1');
            let note2 = new Note('note-2', 'text note-2');
            vasia.notes.push(note);
            petia.notes.push(note2);
            //test notes end

            class MenuMain {
                constructor(blockInsert, arrElem, removeBlock, container) {
                    this.blockInsert = blockInsert;
                    this.arrElem = arrElem;
                    this.activeElement = null;
                    this.ul = null;
                    this.removeBlock = removeBlock;
                    this.container = container;
                };
                createMenu() {
                    let container = document.createElement('div');
                    container.classList.add(this.container);
                    this.blockInsert.append(container);

                    let formWrapper = document.createElement('div');
                    formWrapper.classList.add('form');
                    container.append(formWrapper);

                    let massageDeactivate = document.createElement('p');
                    massageDeactivate.classList.add('massageDeactivate');
                    massageDeactivate.textContent = 'Клик по полю меню дективирует активный компонент';
                    container.append(massageDeactivate);

                    let input = document.createElement('input');
                    input.placeholder = 'Имя пользователя';
                    input.classList.add('input', 'form-name');
                    formWrapper.append(input);

                    let buttonAdd = document.createElement('button');
                    buttonAdd.classList.add('button', 'form-add');
                    buttonAdd.innerHTML = 'add';
                    formWrapper.append(buttonAdd);
                    buttonAdd.addEventListener('click', () => {
                        if(input.value.trim() === '') {
                            alert('Заполните поле имени.');
                            return;
                        }
                        this.name = input.value;
                        this.createElem();
                        input.value = '';
                        this.show(this.arrElem); //отображение созданого элемента
                    });

                    this.ul = document.createElement('ul');
                    this.ul.classList.add('content-list');
                    container.append(this.ul);
                    this.show();
                    this.deactivateElement();
                }
                createElem() {
                    this.arrElem.push(new User(this.name, this.arrElem.length));
                }
                show() {
                    this.ul.innerHTML = '';
                    if (!this.arrElem) return;
                    this.arrElem.map((e, i) => {
                        let li = document.createElement('li');
                        li.classList.add('content-item');
                        this.ul.append(li);

                        let buttonShow = document.createElement('button');
                        buttonShow.classList.add('content-item-name');
                        buttonShow.innerHTML = e.name;
                        li.append(buttonShow);
                        li.addEventListener('click', (event) => {
                            if (event.target.matches('.content-item-name-active')) return;
                            this.activeElem(event.target);
                            if (e === this.activeElement) buttonShow.classList.add('content-item-name-active');
                        })
                        if (e === this.activeElement) buttonShow.classList.add('content-item-name-active');

                        let buttonDelete = document.createElement('button');
                        buttonDelete.classList.add('delete');
                        li.append(buttonDelete);
                        buttonDelete.addEventListener('click', (event) => {
                            event.stopPropagation();
                            this.deleteElem(event);
                            this.show();
                            if(!event.target.parentNode.firstChild.matches('.content-item-name-active')) return;
                            this.display();
                        })
                        li.dataset.index = i;
                    })
                }
                activeElem(event) {
                    if(!event) return;
                    let index = event.parentNode.dataset.index;
                    this.activeElement = this.arrElem[index];

                    this.ul.childNodes.forEach(e => {
                        e.firstChild.classList.remove('content-item-name-active');
                        if(e.dataset.index === index) e.firstChild.classList.add('content-item-name-active');
                    });
                    this.show();
                    this.display();
                }
                deleteElem(event) {
                    let index = event.target.parentNode.dataset.index;
                    if (this.arrElem[index] === this.activeElement) this.activeElement = null;
                    this.arrElem.splice(event.target.parentNode.dataset.index, 1);
                    if (event.target.parentNode.firstChild.matches('.content-item-name-active')) {
                        if (document.querySelector('.menu-note')) document.querySelector('.menu-note').style.display = 'none';
                    }
                }
                display() {
                    if ((!this.activeElement) && document.querySelector(this.removeBlock)) {
                        document.querySelector(this.removeBlock).style.display = 'none';
                    }
                    let menuNotes;
                    if (this.activeElement) {
                        if (document.querySelector(this.removeBlock)) {
                            document.querySelector(this.removeBlock).remove();
                        }
                        menuNotes = new MenuNotes(getBlockApp, this.activeElement.notes, '.menu-note', 'menu-notes');
                        menuNotes.createMenu();
                        menuNotes.display();
                    }
                }
                deactivateElement() {
                    let click = null;
                    document.addEventListener('click', (event) => {
                        click = event.target;
                        if (!click.matches(`.${this.container}`)) return;
                        this.activeElement = null;
                        this.show();
                        this.display();
                        if (document.querySelector('body .menu-note')) {
                            document.querySelector('.menu-note').style.display = 'none';
                        }
                    })
                }
            }
            class MenuNotes extends MenuMain {
                constructor(blockInsert, arrElem, removeBlock, container) {
                    super(blockInsert, arrElem, removeBlock, container);
                }
                createElem() {
                    this.arrElem.push(new Note(this.name));
                }
                display() {
                    if ((!this.activeElement) && document.querySelector(this.removeBlock)) {
                        document.querySelector(this.removeBlock).style.display = 'none';
                    }
                    let menuNote;
                    if (this.activeElement) {
                        if (document.querySelector(this.removeBlock)) {
                            document.querySelector(this.removeBlock).remove();
                        }
                        menuNote = new MenuNote(getBlockApp, this.activeElement);
                        menuNote.createMenu();
                    }
                }
            }
            class MenuNote {
                constructor(blockInsert, note) {
                    this.blockInsert = blockInsert;
                    this.note = note;
                }
                createMenu() {
                    let container = document.createElement('div');
                    container.classList.add('menu-note');
                    this.blockInsert.append(container);

                    let input = document.createElement('input');
                    input.classList.add('input', 'note-name');
                    container.append(input);
                    input.value = this.note.name;
                    input.oninput = () => {
                        this.note.name = input.value;
                        document.querySelector('.menu-notes .content-item-name-active').textContent = input.value;
                    }

                    let textarea = document.createElement('textarea');
                    textarea.classList.add('input', 'note-form');
                    container.append(textarea);
                    textarea.textContent = this.note.note;
                    textarea.oninput = () => {
                        this.note.note = textarea.value;
                    }
                }
            }
            let getBlockApp = document.querySelector('.app');
        })
    }
}
module.exports = Script;

},{}],12:[function(require,module,exports){
class BookServices {
    constructor() {
        this.token = sessionStorage.getItem('token');
    }
    userName() {
        document.querySelector('.contactBook-header__user').innerHTML = sessionStorage.getItem('userName');
    }
    getAllUsers() {
        return fetch(BookServices.BASE_URL + 'users2', {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
            .then(response => response.json())
            .then(response => response.users)
            .then(users => users.map(user => User.create(user)));
    }
    getContacts() {
        console.log('token getContacts = '+sessionStorage.getItem('token'));
        return fetch(BookServices.BASE_URL + 'contacts', {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
            .then(response => response.json());
    }
    addContact(contact) {
        return fetch(BookServices.BASE_URL + 'contacts/add', {
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('token'),
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                type: contact.type,
                value: contact.value,
                name: contact.name,
            })
        })
            .then(response => response.json());
    }
}
BookServices.BASE_URL = 'https://mag-contacts-api.herokuapp.com/';
module.exports = BookServices;
},{}],13:[function(require,module,exports){
class UserServices {
    getAll() {
        return fetch(UserServices.BASE_URL+'users')
            .then(response => response.json())
            .then(response => response.users)
            .then(users => users.map(user => User.create(user)));
    }
    register(user) {
        return fetch(UserServices.BASE_URL + 'register', {
            method: 'POST',
            headers: {
                'Accept':'application/json', //хотим принять от сервера json
                'Content-Type':'application/json', //передаем на сервер json
            },
            body: JSON.stringify({
                login: user.login,
                password: user.password,
                date_born: user.bornDate,
            })
        }).then(response => response.json());
    }
    login(user) {
        return fetch(UserServices.BASE_URL + 'login', {
            method: 'POST',
            headers: {
                'Accept':'application/json', //хотим принять от сервера json
                'Content-Type':'application/json', //передаем на сервер json
            },
            body: JSON.stringify({
                login: user.login,
                password: user.password,
            })
        }).then(response => response.json()); //передача на сервер в формате json
    }
}
UserServices.BASE_URL = 'https://mag-contacts-api.herokuapp.com/';
module.exports = UserServices;
},{}]},{},[9])
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

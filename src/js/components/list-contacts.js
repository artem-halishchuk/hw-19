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
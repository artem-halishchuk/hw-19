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
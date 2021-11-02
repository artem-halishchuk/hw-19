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
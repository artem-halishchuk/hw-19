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

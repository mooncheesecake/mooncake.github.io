import Component from './component.js';
import store from './store/index.js';
import ItemComponent from './ItemComponent.js';
import FilteringButtonsComponent from './FilteringButtonsComponent.js';
import StatusComponent from './StatusComponent.js';
import LogoutComponent from './LogoutComponent.js';
import { DONE, UNDONE, ENTER_CODE } from './constants.js';
import backend from './backend/index.js';
import localStorage from './local-storage/index.js';

export default class ListComponent extends Component {
    constructor(app, settings) {
        if (!localStorage.getData('token')) {
            backend.checkAuthorization();
        }
        backend.getItems();
        const listBlock = document.createElement('div');
        const fragment = document.createDocumentFragment();
        listBlock.classList.add('list');
        super(store, listBlock);

        this.createHeader();
        this.createStatusBlock();
        this.createSidebarBlock();
        this.createLogoutButton();
        fragment.appendChild(this.header);
        fragment.appendChild(listBlock);
        fragment.appendChild(this.statusBlock);
        app.append(fragment);
        app.parentElement.appendChild(this.sidebar);
        document.querySelector('.head').appendChild(this.logoutButton);
        // Создание фильтров, счетчиков и кнопки Logout
        this.filteringComponent = new FilteringButtonsComponent(this.filterBlock);
        this.statusComponent = new StatusComponent(this.sidebar);
        this.logoutComponent = new LogoutComponent(this.logoutButton);
        this.statusComponent.render();
    }

    createHeader() {
        const header = document.createElement('div');
        const inputBlock = document.createElement('div');
		const input = document.createElement('input');
        const addButton = document.createElement('span');
        this.filterBlock = document.createElement('div');
        header.classList.add('header');
        inputBlock.classList.add('input-block');
        this.filterBlock.classList.add('filter-block');
		input.classList.add('input');
		input.id = 'task';
		input.setAttribute('placeholder', 'Write here');
		addButton.classList.add('button');
        addButton.innerText = 'Add';
        inputBlock.appendChild(input);
        inputBlock.appendChild(addButton);
        header.appendChild(this.filterBlock);
        header.appendChild(inputBlock);
        this.header = header;
        this.input = input;
        this.addButton = addButton;
        this.addHandlers();
    }

    addHandlers() {
        const handleAddTodo = (event) => {
            event.preventDefault();
            let text = this.input.value.trim();
    
            if (text.length) {
                if (text.length < 5) {
                    // Изменение плейсхолдера, если введено меньше 5 символов
                    this.input.setAttribute('placeholder', 'Your todo must be more 5 characters');
                } else {
                    const todo = { text, completed: false, isEdit: false };
                    backend.addItem(todo);
                    if (this.input.getAttribute('placeholder') === 'Your todo must be more 5 characters') {
                        this.input.setAttribute('placeholder', 'Write here');
                    }
                }
                this.input.focus();
                this.input.value = '';
            }
        };
    
        this.addButton.addEventListener('click', handleAddTodo);
        // Обработка сохранения на  Enter
        this.input.addEventListener('keydown', (event) => {
            if (event.keyCode === ENTER_CODE) {
                handleAddTodo(event);
            }
		});
    }

    createStatusBlock() {
        this.statusBlock = document.createElement('div');
        this.statusBlock.classList.add('status-block');
    }

    createSidebarBlock() {
        this.sidebar = document.createElement('aside');
        this.sidebar.classList.add('sidebar', 'col-lg-3', 'col-md-12', 'col-sm-12');
    }

    createLogoutButton() {
        this.logoutButton = document.createElement('div');
        this.logoutButton.classList.add('logout-block');

    }

    createEmptyBlock() {
        this.anchor.innerHTML = '';
        const emptyList = document.createElement('div');
        const emptyListText = document.createElement('h4');
        emptyList.classList.add('empty-list');
        emptyListText.innerText = `No todo's`;
        emptyList.appendChild(emptyListText);
        this.anchor.appendChild(emptyList);
    }

    render() {
        if (store.state.todo.length === 0) {
            // Создание пустого информационного блока, если список пуст
            this.createEmptyBlock();
            return;
        }
        this.anchor.innerHTML = '';
        const ulList = document.createElement('ul');
        this.anchor.appendChild(ulList);

        let todoList;
        // Заполнение списка todo в зависимости от включенного фильтра
        switch (store.state.filtration.mode) {
            case DONE:
                todoList = store.state.todo.filter(item => item.completed);
                break;
            case UNDONE:
                todoList = store.state.todo.filter(item => !item.completed);
                break;
            default:
                todoList = store.state.todo;
        }

        todoList.forEach((todoItem) => {
            // Создание todo
            const todo = new ItemComponent(ulList, todoItem);
            todo.render();
        });
        this.addCloseHandlers();
        this.addEditHandlers();
        this.addChangeStateHandlers();
    }

    addCloseHandlers() {
        this.anchor.querySelectorAll('.close').forEach((button, id) => {
            button.addEventListener('click', (event) => {
                // Поиск нужного todo для удаления
                const parrentLi = event.target.parentElement.parentElement.parentElement;
                const collection = Array.prototype.slice.call(parrentLi.parentElement.children);
                const id = collection.indexOf(parrentLi);
                backend.deleteItem({ id });
            });
        });
    }

    addEditHandlers() {
        this.anchor.querySelectorAll('.edit').forEach((button, id) => {
            button.addEventListener('click', () => {
                store.dispatch('editItem', { id });
            });
        });
    }

    addChangeStateHandlers() {
        this.anchor.querySelectorAll('li').forEach((li, id) => {
            li.addEventListener('click', (event) => {
                // Изменение выполнения todo только если клик был совершен на тексте или же li элементе
                if (event.target.tagName === 'LI' || event.target === li.firstChild.firstChild  || event.target === li.firstChild) {
                    backend.updateItem({ id, type: 'changeState' });
                }
            });
        });
    }
}
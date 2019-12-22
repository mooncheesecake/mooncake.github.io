import Component from './component.js';
import store from './store/index.js';
import ItemComponent from './ItemComponent.js';
import FilteringButtonsComponent from './FilteringButtonsComponent.js';
import StatusComponent from './StatusComponent.js';
import LogoutComponent from './LogoutComponent.js';
import { DEFAULT, DONE, UNDONE, ENTER_CODE } from './constants.js';
import backend from './backend/index.js';
import localStorage from './local-storage/index.js';

export default class ListComponent extends Component {
    constructor(app, settings) {
        if (!localStorage.getData('token')) {
            backend.checkAuthorization();
        }
        backend.getItems();
        const header = document.createElement('div');
        const inputBlock = document.createElement('div');
		const input = document.createElement('input');
		const addButton = document.createElement('span');
        const listBlock = document.createElement('div');
        const fragment = document.createDocumentFragment();
        const statusBlock = document.createElement('div');
        const filterBlock = document.createElement('div');
        const sidebar = document.createElement('aside');
        const logout = document.createElement('div');

        header.classList.add('header');
        inputBlock.classList.add('input-block');
        filterBlock.classList.add('filter-block');
		input.classList.add('input');
		input.id = 'task';
		input.setAttribute('placeholder', 'Write here');
		addButton.classList.add('button');
		addButton.innerText = 'Add';
        listBlock.classList.add('list');
        statusBlock.classList.add('status-block');
        sidebar.classList.add('sidebar', 'col-lg-3', 'col-md-12', 'col-sm-12');
        logout.classList.add('logout-block');

		inputBlock.appendChild(input);
        inputBlock.appendChild(addButton);
        header.appendChild(filterBlock);
        header.appendChild(inputBlock);
        fragment.appendChild(header);
        fragment.appendChild(listBlock);
        fragment.appendChild(statusBlock);
        app.append(fragment);
        app.parentElement.appendChild(sidebar);
        document.querySelector('.head').appendChild(logout);

        super(
            store,
            listBlock
        );

        const handleAddTodo = (event) => {
            event.preventDefault();
            let text = input.value.trim();

            if (text.length) {
                if (text.length < 5) {
                    input.setAttribute('placeholder', 'Your todo must be more 5 characters');
                } else {
                    const todo = { text, completed: false, isEdit: false };
                    backend.addItem(todo);
                    if (input.getAttribute('placeholder') === 'Your todo must be more 5 characters') {
                        input.setAttribute('placeholder', 'Write here');
                    }
                }
                input.focus();
                input.value = '';
            }
        };

        input.addEventListener('keydown', (event) => {
            if (event.keyCode === ENTER_CODE) {
                handleAddTodo(event);
            }
		});
        addButton.addEventListener('click', handleAddTodo);
        this.filteringComponent = new FilteringButtonsComponent(filterBlock);
        this.statusComponent = new StatusComponent(sidebar);
        this.logoutComponent = new LogoutComponent(logout);
        this.statusComponent.render();
    }

    render() {
        if (store.state.todo.length === 0) {
            this.anchor.innerHTML = '';
            const emptyList = document.createElement('div');
            const emptyListText = document.createElement('h4');
            emptyList.classList.add('empty-list');
            emptyListText.innerText = `No todo's`;
            emptyList.appendChild(emptyListText);
            this.anchor.appendChild(emptyList);
            return;
        }
        this.anchor.innerHTML = '';
        const ulList = document.createElement('ul');
        this.anchor.appendChild(ulList);

        let todoList;
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
            const todo = new ItemComponent(ulList, todoItem);
            todo.render();
        });

        this.anchor.querySelectorAll('.close').forEach((button, id) => {
            button.addEventListener('click', (event) => {
                const parrentLi = event.target.parentElement.parentElement.parentElement;
                const collection = Array.prototype.slice.call(parrentLi.parentElement.children);
                const id = collection.indexOf(parrentLi);
                backend.deleteItem({ id });
            });
        });

        this.anchor.querySelectorAll('.edit').forEach((button, id) => {
            button.addEventListener('click', () => {
                store.dispatch('editItem', { id });
            });
        });

        this.anchor.querySelectorAll('li').forEach((li, id) => {
            li.addEventListener('click', (event) => {
                if (event.target.tagName === 'LI' || event.target === li.firstChild.firstChild  || event.target === li.firstChild) {
                    backend.updateItem({ id, type: 'changeState' });
                }
            });
        });
    }
}
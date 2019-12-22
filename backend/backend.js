import link from '../link.js';
import routerConfig from '../routerConfig.js';

export default class Backend {
    constructor(store, authStorage) {
        this.store = store;
        this.authStorage = authStorage;
        this.url = 'https://todo-app-back.herokuapp.com';
    }

    login(item) {
        fetch(`${this.url}/login`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.token) {
                this.authStorage.setData('token', res.token);
                link(routerConfig.login.settings.redirect);
                this.store.dispatch('login', res)
            }
        });
    }

    register(item) {
        fetch(`${this.url}/register`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "email": item.email,
                        "password": item.password,
                        "username": item.username,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
        })
        .then(res => res.json())
        .then(res => this.authStorage.setData('token', res.token));
    }

    checkAuthorization() {
        fetch(`${this.url}/me`, {
            method: 'GET',
            headers: {
                'Authorization': this.authStorage.getData('token')
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.token) {
                link(routerConfig.login.settings.redirect);
            } else {
                link(routerConfig.list.settings.redirect);
            }
        });
    }

    getItems() {
        fetch(`${this.url}/todos`, {
            method: 'GET',
            headers: {
                'Authorization': this.authStorage.getData('token')
            }
        })
        .then(res => res.json())
        .then(res => this.store.dispatch('setItems', res));
    }

    addItem(item) {
        fetch(`${this.url}/todos`, {
            method: 'POST',
            body:
                JSON.stringify({
                    text: item.text,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getData('token')
            }
        })
        .then(res => res.json())
        .then(res => this.store.dispatch('addItem', res));
    }

    updateItem(item) {
        const updatedTodo = this.store.state.todo[item.id];
        const id = updatedTodo._id;
        const todo = { text: updatedTodo.text, completed: updatedTodo.completed };
        if (item.type === 'changeState') {
            todo.completed = !todo.completed;
        } else if (item.type === 'changeText') {
            todo.text = item.text;
        }
        fetch(`${this.url}/todos/${id}`, {
            method: 'PUT',
            body:
                JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getData('token')
            }
        })
        .then(res => res.json())
        .then(res => this.store.dispatch('updateItem', { ...res }));
    }

    deleteItem(item) {
        const id = this.store.state.todo[item.id]._id;
        fetch(`${this.url}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getData('token')
            }
        })
        .then(res => res.json())
        .then(res => this.store.dispatch('removeItem', { id }));
    }
}
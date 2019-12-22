export default class LocalStorage {
    constructor() {
        if(!JSON.parse(localStorage.getItem('todo-settings'))) {
            localStorage.setItem('todo-settings', JSON.stringify({}));
        }
        this.data = JSON.parse(localStorage.getItem('todo-settings'));
    }

    getData(key) {
        return this.data[key];
    }

    setData(key, value) {
        this.data[key] = value;
        localStorage.setItem('todo-settings', JSON.stringify(this.data));
    }
}
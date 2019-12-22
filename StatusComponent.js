import Component from './component.js';
import store from './store/index.js';

export default class StatusComponent extends Component {
    constructor(anchor, settings) {
        super(
            store,
            anchor
        );
        const fragment = document.createDocumentFragment();
        this.statusElements = {
            all: {},
            done: {},
            undone: {},
        };
        Object.values(this.statusElements).forEach(item => {
            item.element = document.createElement('p');
            item.element.classList.add('status-item');
            fragment.appendChild(item.element);
        });
        this.anchor.appendChild(fragment);
    }

    render() {
        this.statusElements.all.element.innerText = `All todo's count: ${store.state.todo.length}`;
        this.statusElements.done.element.innerText = `Done todo's count: ${store.state.todo.filter(todo => todo.completed).length}`;
        this.statusElements.undone.element.innerText = `Undone todo's count: ${store.state.todo.filter(todo => !todo.completed).length}`;
    }
}
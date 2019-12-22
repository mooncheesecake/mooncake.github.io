import backend from './backend/index.js';

export default class EditItemComponent {
    constructor(anchor, settings) {
        this.anchor = anchor;
        this.settings = settings;
        console.log('edit input created');
    }

    render() {
        const editInput = document.createElement('input');
        const editButton = document.createElement('span');
        const fragment = document.createDocumentFragment();
        editInput.classList.add('input');
        editInput.value = this.settings.text;
        editInput.focus();
        editButton.classList.add('button');
        editButton.innerText = 'Save';
        editButton.addEventListener('click', (event) => {
            const collection = Array.prototype.slice.call(event.target.parentElement.parentElement.children);
            const id = collection.indexOf(event.target.parentElement);
            this.anchor.removeEventListener('click', this.preventDefaultFunction);
            backend.updateItem({ id, text: editInput.value, type: 'changeText' });
        });
		fragment.appendChild(editInput);
        fragment.appendChild(editButton);
        this.anchor.appendChild(fragment);
        this.anchor.addEventListener('click', this.preventDefaultFunction);
    }

    preventDefaultFunction(event) {
        event.stopImmediatePropagation();
    }
}
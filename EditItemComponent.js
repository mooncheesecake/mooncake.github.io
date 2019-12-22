import backend from './backend/index.js';

export default class EditItemComponent {
    constructor(anchor, settings) {
        this.anchor = anchor;
        this.settings = settings;
    }

    render() {
        this.createEditInput();
        this.createSaveButton();
		this.anchor.appendChild(this.editInput);
        this.anchor.appendChild(this.saveButton);
        this.addSaveHandler();
        this.anchor.addEventListener('click', this.stopPropagationFunction);
    }

    createEditInput() {
        const editInput = document.createElement('input');
        editInput.classList.add('input');
        editInput.value = this.settings.text;
        editInput.focus();
        this.editInput = editInput;
    }

    createSaveButton() {
        const saveButton = document.createElement('span');
        saveButton.classList.add('button');
        saveButton.innerText = 'Save';
        this.saveButton = saveButton;
    }

    stopPropagationFunction(event) {
        // Предотвращает изменение состояния todo, пока не будет закончено редактирование
        event.stopImmediatePropagation();
    }

    addSaveHandler() {
        this.saveButton.addEventListener('click', (event) => {
            // Поиск нужного todo
            const collection = Array.prototype.slice.call(event.target.parentElement.parentElement.children);
            const id = collection.indexOf(event.target.parentElement);
            this.anchor.removeEventListener('click', this.preventDefaultFunction);
            backend.updateItem({ id, text: this.editInput.value, type: 'changeText' });
        });

    }
}
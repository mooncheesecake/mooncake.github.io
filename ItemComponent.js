import EditItemComponent from './EditItemComponent.js';

export default class ItemComponent {
    constructor(anchor, settings) {
        this.anchor = anchor;
        this.settings = settings;
    }

    createCloseButton() {
        const closeButton = document.createElement('span');
		const closeIcon = document.createElement('i');
		closeButton.classList.add('close');
		closeIcon.classList.add('fas', 'fa-window-close');
        closeButton.appendChild(closeIcon);
        return closeButton;
    }

    createEditButton() {
        const editButton = document.createElement('span');
		const editIcon = document.createElement('i');
		editButton.classList.add('edit');
		editIcon.classList.add('fas', 'fa-edit');
        editButton.appendChild(editIcon);
        return editButton;
    }

    createText() {
        const textNode = document.createElement('span');
        textNode.classList.add('todo-text');
        textNode.innerText = this.settings.text;
        return textNode;
    }

    render() {
        const liDom = document.createElement('li');

        if(!this.settings.isEdit) {
            const controlButtons = document.createElement('div');
            const liContent = document.createElement('div');
            liContent.classList.add('todo');
            controlButtons.classList.add('control-buttons');
            controlButtons.appendChild(this.createEditButton());
            controlButtons.appendChild(this.createCloseButton());
            liContent.appendChild(this.createText());
            liContent.appendChild(controlButtons);
            liDom.appendChild(liContent);
            if (this.settings.completed) {
                liDom.classList.add('checked');
            } else {
                liDom.classList.remove('checked');
            }
        } else {
            // Если этот todo помечен, то создается инпут для редактирования
            const editInput = new EditItemComponent(liDom, this.settings);
            editInput.render();
        }

        this.anchor.appendChild(liDom);
    }
}
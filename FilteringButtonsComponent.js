import Component from './component.js';
import store from './store/index.js';
import { DEFAULT, DONE, UNDONE } from './constants.js';

export default class FilteringButtonsComponent extends Component {
    constructor(anchor, settings) {
        super(store,anchor);
        const fragment = document.createDocumentFragment();
        this.createFilteringButtons();
        this.addHandlers();
        this.filteringButtons.forEach(({ button, mode }) => {
            fragment.appendChild(button);
        });
        this.anchor.appendChild(fragment);
        store.dispatch('showFilteredList', { DEFAULT });
        this.filteringButtons[0].button.classList.add('active-filter');
    }

    render() {}

    createFilteringButtons() {
        const defaultFilterButton = document.createElement('span');
        const doneFilterButton = document.createElement('span');
        const undoneFilterButton = document.createElement('span');
        defaultFilterButton.innerText = 'All';
        doneFilterButton.innerText = 'Done';
        undoneFilterButton.innerText = 'Undone';
        this.filteringButtons = [
            { 
                button: defaultFilterButton,
                mode: DEFAULT
            },
            { 
                button: doneFilterButton,
                mode: DONE
            },
            { 
                button: undoneFilterButton,
                mode: UNDONE
            },
        ];
    }

    resetStyle(activeMode) {
        this.filteringButtons
        .filter(item => item.mode !== activeMode)
        .forEach(({ button }) => {
            button.classList.remove('active-filter');
        });
    }

    addHandlers() {
        this.filteringButtons.forEach(({ button, mode }) => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('active-filter')) {
                    store.dispatch('showFilteredList', { mode });
                    this.resetStyle(this.filteringButtons, mode);
                    button.classList.add('active-filter');
                } else if (mode !== DEFAULT){
                    button.classList.remove('active-filter');
                    store.dispatch('showFilteredList', { DEFAULT });
                    this.filteringButtons[0].button.classList.add('active-filter');
                }
            });
            button.classList.add('button');
        });
    }
}
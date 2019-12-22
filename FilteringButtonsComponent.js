import Component from './component.js';
import store from './store/index.js';
import { DEFAULT, DONE, UNDONE } from './constants.js';

export default class FilteringButtonsComponent extends Component {
    constructor(anchor, settings) {
        super(
            store,
            anchor
        );
        const fragment = document.createDocumentFragment();
        const defaultFilterButton = document.createElement('span');
        const doneFilterButton = document.createElement('span');
        const undoneFilterButton = document.createElement('span');
        defaultFilterButton.innerText = 'All';
        doneFilterButton.innerText = 'Done';
        undoneFilterButton.innerText = 'Undone';
        const filteringButtons = [
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
        filteringButtons.forEach(({ button, mode }) => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('active-filter')) {
                    store.dispatch('showFilteredList', { mode });
                    this.resetStyle(filteringButtons, mode);
                    button.classList.add('active-filter');
                } else if (mode !== DEFAULT){
                    button.classList.remove('active-filter');
                    store.dispatch('showFilteredList', { DEFAULT });
                    filteringButtons[0].button.classList.add('active-filter');
                }
            });
            button.classList.add('button');
        });
        fragment.appendChild(defaultFilterButton);
        fragment.appendChild(doneFilterButton);
        fragment.appendChild(undoneFilterButton);
        this.anchor.appendChild(fragment);
        store.dispatch('showFilteredList', { DEFAULT });
        filteringButtons[0].button.classList.add('active-filter');
    }

    render() {
        console.log('filtering component render');
    }

    resetStyle(filteringButtons, activeMode) {
        filteringButtons
        .filter(item => item.mode !== activeMode)
        .forEach(({ button }) => {
            button.classList.remove('active-filter');
        });
    }
}
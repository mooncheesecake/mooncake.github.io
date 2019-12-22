import Component from './component.js';
import store from './store/index.js';
import link from './link.js';
import { LOGIN } from './constants.js';

export default class LogoutComponent extends Component {
    constructor(anchor, settings) {
        super(store, anchor);
        this.createLogoutButton();
        this.anchor.appendChild(this.logoutButton);
        this.addHandler();
    }

    render() {
    }

    createLogoutButton() {
        this.logoutButton = document.createElement('div');
        const logoutText = document.createElement('span');
        const logoutIcon = document.createElement('i');
        logoutText.innerText = 'Logout ';
        this.logoutButton.classList.add('button', 'logout-button');
        logoutIcon.classList.add('fas', 'fa-door-open');
        this.logoutButton.appendChild(logoutText);
        this.logoutButton.appendChild(logoutIcon);
    }

    addHandler() {
        this.logoutButton.addEventListener('click', () => {
            store.dispatch('logout');
            link(LOGIN);
        });
    }
}
import Component from './component.js';
import store from './store/index.js';
import link from './link.js';
import routerConfig from '../routerConfig.js';

export default class LogoutComponent extends Component {
    constructor(anchor, settings) {
        super(
            store,
            anchor
        );
        const logoutButton = document.createElement('div');
        const logoutText = document.createElement('span');
        const logoutIcon = document.createElement('i');
        logoutText.innerText = 'Logout ';
        logoutButton.classList.add('button', 'logout-button');
        logoutIcon.classList.add('fas', 'fa-door-open');
        logoutButton.appendChild(logoutText);
        logoutButton.appendChild(logoutIcon);
        this.anchor.appendChild(logoutButton);
        logoutButton.addEventListener('click', () => {
            store.dispatch('logout');
            link(routerConfig.list.settings.redirect);
        });
    }

    render() {
        console.log('status component render');
    }
}
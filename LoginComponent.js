import Component from './component.js';
import store from './store/index.js';
import backend from './backend/index.js';
import localStorage from './local-storage/index.js';

export default class LoginComponent extends Component {
    constructor(app, settings) {
        if (localStorage.getData('token')) {
            backend.checkAuthorization();
        }
        const autorizatonBlock = document.createElement('div');
        const emailBlock = document.createElement('div');
		const emailInput = document.createElement('input');
        const emailText = document.createElement('label');
        const passwordBlock = document.createElement('div');
        const passwordInput = document.createElement('input');
        const passwordText = document.createElement('label');
        const loginButton = document.createElement('div');

        autorizatonBlock.classList.add('header', 'autorization-block');
        emailBlock.classList.add('input-block');
        passwordBlock.classList.add('input-block');
        emailInput.classList.add('input');
        emailText.classList.add('label');
        passwordText.classList.add('label');
        passwordInput.classList.add('input');
        loginButton.classList.add('button', 'login-button');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'password');
        emailText.setAttribute('for', 'email');
        passwordText.setAttribute('for', 'password');
        loginButton.innerText = 'Login';
        emailText.innerText = 'Enter email';
        passwordText.innerText = 'Enter password';

		emailBlock.appendChild(emailText);
        emailBlock.appendChild(emailInput);
        passwordBlock.appendChild(passwordText);
        passwordBlock.appendChild(passwordInput);
        autorizatonBlock.appendChild(emailBlock);
        autorizatonBlock.appendChild(passwordBlock);
        autorizatonBlock.appendChild(loginButton);
        app.appendChild(autorizatonBlock);
        super(
            store,
            app
        );
        loginButton.addEventListener('click', () => {
            const loginData = {
                email: emailInput.value,
                password: passwordInput.value
            }

            backend.login(loginData);
        });
        const sidebar = document.querySelector('.sidebar'); 
        if (sidebar) {
            app.parentElement.removeChild(sidebar);
        }
        const logout = document.querySelector('.logout-block'); 
        if (logout) {
            document.querySelector('.head').removeChild(logout);
        }
    }

    render() {
        console.log('login render');
    }
}
import Component from './component.js';
import store from './store/index.js';
import backend from './backend/index.js';
import localStorage from './local-storage/index.js';

export default class LoginComponent extends Component {
    constructor(app, settings) {
        // Перенаправление на страницу list, если есть токен
        if (localStorage.getData('token')) {
            backend.checkAuthorization();
        }
        super(store, app);
        this.app = app;
        this.createAuthorizationBlock();
        this.app.appendChild(this.autorizatonBlock);
        this.addLoginHandler();
        this.removeSideElements();
    }

    render() {
    }

    removeSideElements() {
        // Удаление счетчиков и кнопки logout
        const sidebar = document.querySelector('.sidebar'); 
        if (sidebar) {
            this.app.parentElement.removeChild(sidebar);
        }
        const logout = document.querySelector('.logout-block'); 
        if (logout) {
            document.querySelector('.head').removeChild(logout);
        }
    }

    createAuthorizationBlock() {
        const autorizatonBlock = document.createElement('div');
        autorizatonBlock.classList.add('header', 'autorization-block');
        this.createEmailBlock();
        this.createPasswordBlock();
        this.createLoginButton();
        autorizatonBlock.appendChild(this.emailBlock);
        autorizatonBlock.appendChild(this.passwordBlock);
        autorizatonBlock.appendChild(this.loginButton);
        this.autorizatonBlock = autorizatonBlock;
    }

    createEmailBlock() {
        const emailBlock = document.createElement('div');
		const emailInput = document.createElement('input');
        const emailText = document.createElement('label');
        emailBlock.classList.add('input-block');
        emailInput.classList.add('input');
        emailText.classList.add('label');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailText.setAttribute('for', 'email');
        emailText.innerText = 'Enter email';
        emailBlock.appendChild(emailText);
        emailBlock.appendChild(emailInput);
        this.emailBlock = emailBlock;
        this.emailInput = emailInput;
    }

    createPasswordBlock() {
        const passwordBlock = document.createElement('div');
        const passwordInput = document.createElement('input');
        const passwordText = document.createElement('label');
        passwordBlock.classList.add('input-block');
        passwordText.classList.add('label');
        passwordInput.classList.add('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'password');
        passwordText.innerText = 'Enter password';
        passwordText.setAttribute('for', 'password');
        passwordBlock.appendChild(passwordText);
        passwordBlock.appendChild(passwordInput);
        this.passwordBlock = passwordBlock;
        this.passwordInput = passwordInput;
    }

    createLoginButton() {
        const loginButton = document.createElement('div');
        loginButton.classList.add('button', 'login-button');
        loginButton.innerText = 'Login';
        this.loginButton = loginButton;
    }

    addLoginHandler() {
        this.loginButton.addEventListener('click', () => {
            const loginData = {
                email: this.emailInput.value,
                password: this.passwordInput.value
            }
            backend.login(loginData);
        });
    }
}
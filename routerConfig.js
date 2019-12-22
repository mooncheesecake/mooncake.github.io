import ListComponent from './ListComponent.js';
import LoginComponent from './LoginComponent.js';
import store from './store/index.js';

export default {
    'login': {
        data: { route: 'login' },
        url: 'login',
        component: LoginComponent,
        settings: {
            redirect: 'list'
        }
    },
    'list': {
        data: { route: 'list' },
        url: 'list',
        component: ListComponent,
        settings: {
            redirect: 'login'
        }
    }
}
import store from '../store/index.js';
import Backend from './backend.js';
import localStorage from '../local-storage/index.js';

export default new Backend(store, localStorage);
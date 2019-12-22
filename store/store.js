import Observer from './observer.js';
import { DEFAULT } from '../constants.js';

export default class Store {
    constructor(reducers) {
        this.reducers = reducers;
        this.state = {
            todo: [],
            userInfo: {},
            filtration: {
                mode: DEFAULT,
            },
        };
        this.events = new Observer();
    }

    dispatch(actionType, payload) {
        if (this.reducers[actionType]) {
            this.state = this.reducers[actionType](payload, this.state);
            this.events.next('change', this.state);
        }
    }
}
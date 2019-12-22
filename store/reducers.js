import localStorage from '../local-storage/index.js';

export default function createReducer() {
    return {
        setItems: (payload, state) => ({
            ...state,
            todo: [...payload].reverse(),
        }),
        addItem: (payload, state)  => ({
            ...state,
            todo: [payload, ...state.todo],
        }),
        removeItem: (payload, state) => {
            const removedTodo = state.todo.find(item => item._id === payload.id);
            // if (editableTodo) {
            //     const editableTodoId = state.todo.indexOf(editableTodo);
            //     payload.id = (editableTodoId === payload.id) || (editableTodoId < payload.id) ? payload.id + 1 : payload.id;
            // }
            const id = state.todo.indexOf(removedTodo);
            return ({
                ...state,
                todo: [
                    ...state.todo.slice(0, id),
                    ...state.todo.slice(id + 1, state.todo.length),
                ]
            })
        },
        editItem: (payload, state) => {
            const editableTodo = state.todo.find(item => item.isEdit === true);
            if (editableTodo) {
                const editableTodoId = state.todo.indexOf(editableTodo);
                editableTodo.isEdit = false;
                payload.id = (editableTodoId === payload.id) || (editableTodoId < payload.id) ? payload.id + 1 : payload.id;
            }
            state.todo[payload.id].isEdit = true;
            return ({...state});
        },
        updateItem: (payload, state) => {
            const updatedTodo = state.todo.find(item => item._id === payload._id);
            updatedTodo.text = payload.text;
            updatedTodo.completed = payload.completed;
            updatedTodo.isEdit = false;
            return ({...state});
        },
        login: (payload, state) => ({
            ...state,
            userInfo: {
                authorized: true,
                ...payload,
            }
        }),
        logout: (payload, state) => {
            localStorage.setData('token', '');
            return ({
                ...state,
                userInfo: {}
            })
        },
        showFilteredList: (payload, state) => ({
            ...state,
            filtration: {
                mode: payload.mode,
            }
        }),
    }
}
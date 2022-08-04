import { rootReducer } from "./rootReducer";

// Создаю собственный State manager

export type StateType = {
    ToDoEditorPage: {
        ToDoData: Array<any>
    }
}
let store = {


    _state: {
        ToDoEditorPage: {
            ToDoData: [
                {ch:'chpon'},
                {ff:"ds"}
            ]
        }
    },

    _callSubscriber() { },

    getState() {
        return this._state;
    },

    subscribe(observer: any) {
        this._callSubscriber = observer;
    },

    dispatch(action: any) {
        this._state.ToDoEditorPage = rootReducer(this._state.ToDoEditorPage, action)
    }
}
export default store
import { ItemType, rootReducer } from "./rootReducer";

// Собственный State manager

export type StateType = {
    ToDoEditorPage: {
        ToDoData: Array<any>
    }
}
let store = {

    _state: {
        ToDoEditorPage: {
            ToDoData: [] as Array<ItemType>
        }
    },

    _callSubscriber(ch: any) { },

    getState() {
        return this._state;
    },

    subscribe(observer: any) {
        this._callSubscriber = observer;
    },

    dispatch(action: any) {
        this._state.ToDoEditorPage = rootReducer(this._state.ToDoEditorPage, action)
        
        this._callSubscriber(this._state)
    }
}
export default store
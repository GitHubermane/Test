import { ItemType, rootReducer, ToDoEditorPageType } from "./rootReducer";

// Собственный State manager

export type StateType = {
    ToDoEditorPage: ToDoEditorPageType
}
let store = {

    _state: {
        ToDoEditorPage: {
            ToDoData: [] as Array<ItemType>,
            inEditMode: [] as Array<any>
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
        //@ts-ignore
        this._state.ToDoEditorPage = rootReducer(this._state.ToDoEditorPage, action)

        this._callSubscriber(this._state)
    }
}
export default store
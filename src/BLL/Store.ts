import { ItemType } from "../types";
import { actionsType, rootReducer } from "./rootReducer";

//  Собственный State manager
//  Сделан по аналогии с Redux'ом

let store = {

    _state: {
        ToDoEditorPage: {
            ToDoData: [] as Array<ItemType>,
            inEditMode: [] as Array<number>
        }
    },
    //  Паттерн publish/subscribe
    _callSubscriber(ch: any) { },

    getState() {
        return this._state;
    },

    subscribe(observer: any) {
        this._callSubscriber = observer;
    },

    dispatch(action: actionsType) {
        this._state.ToDoEditorPage = rootReducer(this._state.ToDoEditorPage, action)

        this._callSubscriber(this._state)
    }
}
export default store
import { StateType } from "./Store";
//Типы action'ов завернул в константы, чтобы избежать ошибок
const SET_DATA = 'SET_DATA'

type ToDoEditorPageType = {
    ToDoData: Array<any>
}
export type actionType = {
    type: string
    payload?: any
}
//rootReducer для определения типа action'а 
export const rootReducer = (state: ToDoEditorPageType, action: actionType) => {
 
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                ToDoData: [
                    ...state.ToDoData,
                    action.payload.item
                ]
            }
        
        default: return state;
    }
}

export const addNewItemActionCreator = (item: string) => ({ type: SET_DATA, payload: {item} })

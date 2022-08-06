//Типы action'ов завернул в константы, чтобы избежать ошибок
const SET_ITEM = 'SET_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const SET_EDITED_TEXT_IN_ITEM = 'SET_EDITED_TEXT_IN_ITEM'
const SET_TO_EDITMODE = 'SET_TO_EDITMODE'
export type ItemType = {
    id: number
    text: string
    status: string
}
export type ToDoEditorPageType = {
    ToDoData: Array<ItemType>
    inEditMode: Array<any>
}
let ID = 0
//rootReducer для определения типа action'а 
export const rootReducer = (state: ToDoEditorPageType, action: any) => {

    switch (action.type) {
        case SET_ITEM: {
            ID++
            return {
                //Возвращаю копию объекта, чтобы не возникали Side эффекты
                ...state,
                ToDoData: [
                    ...state.ToDoData,
                    {
                        id: ID,
                        text: action.item,
                        status: 'in process'
                    }
                ]
            }
        }
        case DELETE_ITEM: {
            return {
                ...state,
                //  Прохожу по всему массиву объектов и если id объекта, который был
                //  передан совпадает с id объекта из массива, то он удаляется
                ToDoData: state.ToDoData.filter(i => i.id !== action.id)
            }
        }
        case SET_EDITED_TEXT_IN_ITEM: {
            return {
                ...state,
                ToDoData: 
                    state.ToDoData.map(item => {
                        if (item.id === action.id) {
                            return { ...item, text: action.text }
                        } else {
                            return item
                        }
                    })
                
            }
        }
        case SET_TO_EDITMODE: {
            return {
                ...state,
                inEditMode: action.isEditing ?
                    [...state.inEditMode, action.userId] :
                    state.inEditMode.filter(id => id != action.userId)
            }
        }
        default: return state;
    }
}

export const addNewItem = (item: string) => ({ type: SET_ITEM, item })
export const deleteItem = (id: number) => ({ type: DELETE_ITEM, id })
export const setEditedTextInItem = (id: number, text: string) => ({ type: SET_EDITED_TEXT_IN_ITEM, id, text })
export const setEditMode = (isEditing: boolean, userId: number) => ({ type: SET_TO_EDITMODE, isEditing, userId })

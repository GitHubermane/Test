import { ToDoEditorPageType } from "../types"

//Типы action'ов завернул в константы, чтобы избежать ошибок
const SET_ITEM = 'SET_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    SET_EDITED_TEXT_IN_ITEM = 'SET_EDITED_TEXT_IN_ITEM',
    SET_TO_EDITMODE = 'SET_TO_EDITMODE',
    SET_STATUS = 'SET_STATUS'


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
                        text: action.itemText,
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
                //  Прохожу по массиву всех объектов и если id объекта совпадает с id,
                //  который был передан, то меняется значение text, на то которое, было передано
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
                //  Если isEditing в значении true, то id объекта вносится 
                //  в массив, при значении false убирается из массива 
                //  (в массиве находятся id объектов, которые сейчас редактируются)
                inEditMode: action.isEditing ?
                    [...state.inEditMode, action.id] :
                    state.inEditMode.filter(id => id != action.id)
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                ToDoData: [
                    //  Прохожу по всему массиву объектов и если переданный id 
                    //  совпадает с id объекта массива, то ему присваивается переданный статус
                    ...state.ToDoData.map(item => {
                        if (item.id === action.id) {
                            return { ...item, status: action.status }
                        } else {
                            return item
                        }
                    })
                ]
            }
        }
        default: return state;
    }
}

export const addNewItem = (itemText: string) => ({ type: SET_ITEM, itemText })
export const deleteItem = (id: number) => ({ type: DELETE_ITEM, id })
export const setEditedTextInItem = (id: number, text: string) => ({ type: SET_EDITED_TEXT_IN_ITEM, id, text })
export const setEditMode = (isEditing: boolean, id: number) => ({ type: SET_TO_EDITMODE, isEditing, id })
export const toggleCompletedStatus = (id: number, status: string) => ({ type: SET_STATUS, id, status })
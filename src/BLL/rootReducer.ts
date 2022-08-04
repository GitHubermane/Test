//Типы action'ов завернул в константы, чтобы избежать ошибок
const SET_ITEM = 'SET_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

export type ItemType = {
    id: number
    text: string
    status: string
}
export type ToDoEditorPageType = {
    ToDoData: Array<ItemType>
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
        default: return state;
    }
}

export const addNewItemActionCreator = (item: string) => ({ type: SET_ITEM, item })
export const deleteItemActionCreator = (id: number) => ({ type: DELETE_ITEM, id })

export type StateType = {
    ToDoEditorPage: ToDoEditorPageType
}
export type ToDoEditorPageType = {
    ToDoData: toDoDataType
    inEditMode: inEditModeType
}
export type toDoDataType = Array<ItemType>
export type inEditModeType = Array<number>

export type ItemType = {
    id: number
    text: string
    isCompleted: boolean
}
//  Данный тип взят из статьи про типизацию Action'ов по ссылке
//  https://habr.com/ru/company/alfa/blog/452620/
//  Если T наследуется от объекта(action'a), у которого есть строковые ключи
//  и у них есть значения с типом, то выводится тип этих значений и они выводятся в общий тип
export type inferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
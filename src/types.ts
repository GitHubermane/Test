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
    status: string
}
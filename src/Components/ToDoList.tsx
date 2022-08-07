import { useMemo, useState } from "react"
import { inEditModeType, toDoDataType } from "../types"
import { ItemsList } from "./ItemsList"

type PropsType = {
    ToDoData: toDoDataType
    inEditMode: inEditModeType
    dispatch: (action: any) => void
}
export const ToDoList = (props: PropsType) => {
    const [searchQuery, setSearchQuery] = useState('')

    const searchedItems = useMemo(() => {
        return props.ToDoData.filter(item => item.text.includes(searchQuery))
    },
        [searchQuery, props.ToDoData])
    return (
        <div className='ToDoList'>
            <h1 className='ToDoList__title title'>To Do list</h1>
            {props.ToDoData.length ?
                <>
                    <input
                        className='ToDoList__input'
                        type='text'
                        placeholder='Enter text'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <ItemsList
                        dispatch={props.dispatch}
                        inEditMode={props.inEditMode}
                        items={
                            searchQuery ?
                                searchedItems :
                                props.ToDoData
                        }
                    />
                </> :
                <div className='note'>
                    No to Do
                </div>
            }
        </div>
    )
}

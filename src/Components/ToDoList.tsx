import { useMemo, useState } from "react"
import { actionsType } from "../BLL/rootReducer"
import { inEditModeType, toDoDataType } from "../types"
import { ItemsList } from "./ItemsList"

type PropsType = {
    ToDoData: toDoDataType
    inEditMode: inEditModeType
    dispatch: (action: actionsType) => void
}
export const ToDoList = (props: PropsType) => {
    const [searchQuery, setSearchQuery] = useState('')

    const searchedItems =  props.ToDoData.filter(item => item.text.includes(searchQuery))

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
                        items={ searchedItems }
                    />
                </> :
                <div className='note'>
                    No to Do
                </div>
            }
        </div>
    )
}

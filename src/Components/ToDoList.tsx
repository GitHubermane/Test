import { useMemo, useState } from "react"
import { ItemsList } from "./ItemsList"

type PropsType = {
    ToDoData: Array<any>
    inEditMode: Array<any>
    dispatch: (action: any) => void
}
export const ToDoList = (props: PropsType) => {
    const [searchQuery, setSearchQuery] = useState('')

    const searchedItems = useMemo(() => {
        return props.ToDoData.filter(item => item.text.includes(searchQuery))
    },
        [searchQuery])
    return (
        <div className='ToDoList'>
            <h1 className='ToDoList__title title'>To Do list</h1>
            {props.ToDoData.length ?
                <>
                    <input
                        type="text"
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

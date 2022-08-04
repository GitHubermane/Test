import React, { useState } from 'react'
import { addNewItemActionCreator } from '../BLL/rootReducer'
import { StateType } from '../BLL/Store'

type PropsType = {
    state: StateType
    dispatch: (action: any) => void

}
export const ToDoEditor = (props: PropsType) => {

    const [item, setItem] = useState('')

    const onChangeText = (e: any) => {
        setItem(e.currentTarget.value)
    }
    const onSaveText = () => {
        props.dispatch(addNewItemActionCreator(item))
        setItem('')
    }
    return (
        <div>
            <h2>ToDoEditor</h2>
            <input
                value={item}
                type="text"
                onChange={onChangeText}
            />
            <button onClick={onSaveText}>Click</button>
        </div>
    )
}

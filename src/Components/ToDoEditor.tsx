import React, { useState } from 'react'
import { actionType, addNewItemActionCreator } from '../BLL/rootReducer'
import { StateType } from '../BLL/Store'

type PropsType = {
    state: StateType
    dispatch: (action: actionType) => void

}
export const ToDoEditor = (props: PropsType) => {

    const [item, setItem] = useState('')
    const onChangeText = (e: any) => {
        setItem(e.currentTarget.value)
        props.dispatch(addNewItemActionCreator(e.currentTarget.value))
    }
    
    return (
        <div>
            <h2>ToDoEditor</h2>
            <input
                value={item}
                type="text"
                onChange={onChangeText}
                 />
        </div>
    )
}

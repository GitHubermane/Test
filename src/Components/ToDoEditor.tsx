import React, { useState } from 'react'
import { addNewItem } from '../BLL/rootReducer'
import { StateType } from '../BLL/Store'

type PropsType = {
    state: StateType
    dispatch: (action: any) => void

}
export const ToDoEditor = (props: PropsType) => {

    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const onChangeText = (e: any) => {
        setText(e.currentTarget.value)
        setError('')
    }
    const onSaveText = () => {
        if (text) {
            props.dispatch(addNewItem(text))
            setError('')
            setText('')
        } else {
            setError('Text is required')
        }
    }
    return (
        <div className='ToDoEditor'>
            <h2 className='title'>To Do editor</h2>
            <div className='ToDoEditor__block'>
                <input
                    className={
                        error ?
                            'ToDoEditor__input error' :
                            'ToDoEditor__input'
                    }
                    value={text}
                    type="text"
                    onChange={onChangeText}
                />
                <button onClick={onSaveText}>Click</button>
            </div>
            {error ?
                <div className='textError'>
                    {error}
                </div> :
                null    
            }
        </div>
    )
}

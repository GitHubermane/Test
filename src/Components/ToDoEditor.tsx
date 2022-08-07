import React, { ChangeEvent, useState } from 'react'
import { addNewItem } from '../BLL/rootReducer'
import { StateType } from '../types'
import '../css/ToDoEditor.css'
type PropsType = {
    state: StateType
    dispatch: (action: any) => void
}
export const ToDoEditor = (props: PropsType) => {

    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
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
            <div className='ToDoEditor__form'>
                <div className='ToDoEditor__inputBlock'>
                    <input
                        className={
                            error ?
                                'ToDoEditor__input error' :
                                'ToDoEditor__input'
                        }
                        value={text}
                        type="text"
                        id='text'
                        placeholder='Enter text'
                        onChange={onChangeText}
                    />
                    <label
                        className={
                            error ?
                                'ToDoEditor__label error' :
                                'ToDoEditor__label'
                        }
                        htmlFor="text"
                    >
                        Text
                    </label>
                </div>
                <button
                    className='ToDoEditor__button'
                    onClick={onSaveText}
                >
                    Add
                </button>
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

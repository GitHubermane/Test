import React, { ChangeEvent, useState } from 'react'
import { actions, actionsType } from '../BLL/rootReducer'
import { StateType } from '../types'
import '../css/ToDoEditor.css'
type PropsType = {
    state: StateType
    dispatch: (action: actionsType) => void
}
export const ToDoEditor = (props: PropsType) => {

    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        //  При вводе текста State выдающий ошибку обнуляется
        setError('')
    }
    const onSaveText = () => {
        //  Валидация на наличие теста в поле
        if (text) {
            props.dispatch(actions.addNewItem(text))
            setError('')
            setText('')
        } else {
            setError('Text is required')
        }
    }
    const classNameErrorFunction = (error: string, className: string) => {
        //  Условие, по которому присваивается класс вынес в отдельную функцию, возвращаующую строку
        if (error) return `${className} error`
        else return `${className}`
    }

    return (
        <div className='ToDoEditor'>
            <h2 className='title'>To Do editor</h2>
            <div className='ToDoEditor__form'>
                <div className='ToDoEditor__inputBlock'>
                    <input
                        className={classNameErrorFunction(error, 'ToDoEditor__input')}
                        value={text}
                        type="text"
                        id='text'
                        placeholder='Enter text'
                        onChange={onChangeText}
                    />
                    <label
                        className={classNameErrorFunction(error, 'ToDoEditor__label')}
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

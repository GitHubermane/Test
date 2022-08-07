import React, { useState } from 'react'
import { actions, actionsType } from '../BLL/rootReducer'
import { inEditModeType, ItemType } from '../types'
import '../css/ToDoList.css'
const editImg = require('../assets/edit.png')
const removeImg = require('../assets/x-mark.png')

type PropsType = {
    dispatch: (action: actionsType) => void
    inEditMode: inEditModeType
    items: Array<ItemType>
}

export const ItemsList = (props: PropsType) => {
    const [editedText, setEditedText] = useState('')
    const [error, setError] = useState(false)
    const onDeleteItem = (id: number) => {
        props.dispatch(actions.deleteItem(id))
    },
        onEditItemMode = (id: number, text: string) => {
            //  Функция, которая добавляет объект в массив редактируемых объектов
            props.dispatch(actions.setEditMode(true, id))
            setEditedText(text)
        },
        onEditText = (id: number) => {
            //  Валидация
            //  Если в поле куда вводится редактируемый текст 
            //  передается пустая строка, то выводится ошибка
            if (editedText) {
                props.dispatch(actions.setEditedTextInItem(id, editedText)) //  Заменяет текст на отредактированный объекту, id которого был передан
                props.dispatch(actions.setEditMode(false, id))
                setEditedText('')
                setError(false)
            } else {
                setError(true)
            }
        },
        onToggleCompletedStatus = (id: number, isCompleted: boolean) => {
            //  Функция, которая меняет значения true или false на противоположное
            if (!isCompleted) props.dispatch(actions.toggleCompletedStatus(id, true))
            else props.dispatch(actions.toggleCompletedStatus(id, false))

        }
    const classNameIfFunction = (isCompleted: boolean, className: string) => {
        //  Условие, по которому присваивается класс вынес в отдельную функцию, возвращаующую строку
        if (isCompleted) return `${className} completed`
        else return `${className}`
    }
    return (
        <div className='ToDoList__items'>
            {props.items.length ?
                props.items.map((object) => (
                    <div
                        className={classNameIfFunction(object.isCompleted, 'Item')}
                        key={object.id}
                    >
                        {props.inEditMode.some((id: number) => id === object.id) ?
                            <>
                                <input
                                    className={error ? 'Item__editInput errored' : 'Item__editInput'}
                                    value={editedText}
                                    onChange={e => { setEditedText(e.currentTarget.value) }}
                                />
                                <button
                                    className='Item__editButton'
                                    onClick={() => onEditText(object.id)}>
                                    Change text
                                </button>
                            </> :
                            <>
                                <div className="Item__textBlock">
                                    <input
                                        type='checkbox'
                                        checked={object.isCompleted}
                                        onChange={() => { onToggleCompletedStatus(object.id, object.isCompleted) }}
                                    />
                                    <div className={classNameIfFunction(object.isCompleted, 'Item__text')}>
                                        {object.text}
                                    </div>
                                </div>
                                <div className="Item__buttonBlock">
                                    <button
                                        className={classNameIfFunction(object.isCompleted, 'Item__button')}
                                        disabled={props.inEditMode.length !== 0}
                                        onClick={() => onEditItemMode(object.id, object.text)}
                                    >
                                        <img src={editImg} />
                                    </button>
                                    <button
                                        className={classNameIfFunction(object.isCompleted, 'Item__button')}
                                        onClick={() => { onDeleteItem(object.id) }}
                                    >
                                        <img src={removeImg} />
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                )) :
                <div className='note'>
                    No searching to Do
                </div>
            }
        </div>
    )
}

import React, { useState } from 'react'
import { deleteItem, setEditedTextInItem, setEditMode, toggleCompletedStatus } from '../BLL/rootReducer'
import { inEditModeType, ItemType } from '../types'
import '../css/ToDoList.css'
const editImg = require('../assets/edit.png')
const removeImg = require('../assets/x-mark.png')

type PropsType = {
    dispatch: (action: any) => void
    inEditMode: inEditModeType
    items: Array<ItemType>
}

export const ItemsList = (props: PropsType) => {
    const [editedText, setEditedText] = useState('')
    const [error, setError] = useState(false)
    const onDeleteItem = (id: number) => {
        props.dispatch(deleteItem(id))
    },
        onEditItemMode = (id: number, text: string) => {
            props.dispatch(setEditMode(true, id))
            setEditedText(text)
        },
        onEditText = (id: number) => {
            if (editedText) {
                props.dispatch(setEditedTextInItem(id, editedText))
                props.dispatch(setEditMode(false, id))
                setEditedText('')
                setError(false)
            } else {
                setError(true)
            }
        },
        onToggleCompletedStatus = (id: number, status: string) => {
            if (status === 'in process') {
                props.dispatch(toggleCompletedStatus(id, 'completed'))
            } else {
                props.dispatch(toggleCompletedStatus(id, 'in process'))
            }
        }

    return (
        <div className='ToDoList__items'>
            {props.items.length ?
                props.items.map((object) => (
                    <div
                        className={
                            object.status === 'completed' ?
                                'Item completed' :
                                'Item inProcess'
                        }
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
                                        checked={object.status === 'completed'}
                                        onChange={() => { onToggleCompletedStatus(object.id, object.status) }}
                                    />
                                    <div className={
                                        object.status === 'completed' ?
                                            'Item__text completed' :
                                            'Item__text inProcess'
                                    }>
                                        {object.text}
                                    </div>
                                </div>
                                <div className="Item__buttonBlock">
                                    <button
                                        className={
                                            object.status === 'completed' ?
                                                'Item__button completed' :
                                                'Item__button'
                                        }
                                        disabled={props.inEditMode.length !== 0}
                                        onClick={() => onEditItemMode(object.id, object.text)}
                                    >
                                        <img src={editImg} />
                                    </button>
                                    <button
                                        className={
                                            object.status === 'completed' ?
                                                'Item__button completed' :
                                                'Item__button'
                                        }
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

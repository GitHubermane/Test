import React, { useState } from 'react'
import { deleteItem, setEditedTextInItem, setEditMode } from '../BLL/rootReducer'
const editImg = require('../assets/edit.png')
const removeImg = require('../assets/x-mark.png')

type PropsType = {
    dispatch: (action: any) => void
    inEditMode: any
    items: Array<any>
}

export const ItemsList = (props: PropsType) => {
    const [editedText, setEditedText] = useState(''),
        [isCompleted, setCompeleted] = useState('')

    const onDeleteItem = (id: number) => {
        props.dispatch(deleteItem(id))
    },
        onEditItemMode = (id: number, text: string) => {
            props.dispatch(setEditMode(true, id))
            setEditedText(text)
        },
        onEditText = (id: number) => {
            props.dispatch(setEditedTextInItem(id, editedText))
            props.dispatch(setEditMode(false, id))
            setEditedText('')
        }

    return (
        <div className='ToDoList__items'>
            {props.items.length ?
                props.items.map((object) => (
                    <div className="Item">
                        {props.inEditMode.some((id: number) => id === object.id) ?
                            <>
                                <input
                                    value={editedText}
                                    onChange={e => { setEditedText(e.currentTarget.value) }}
                                />
                                <button onClick={() => onEditText(object.id)}>
                                    Change text
                                </button>
                            </> :
                            <>
                                <div className="Item__textBlock">
                                    <input
                                        type='checkbox'
                                        onClick={() => { }}
                                    />
                                    {object.text}
                                </div>
                                <div className="Item__buttonBlock">
                                    <button
                                        className="Item__button"
                                        disabled={props.inEditMode.length !== 0}
                                        onClick={() => onEditItemMode(object.id, object.text)}
                                    >
                                        <img src={editImg} />
                                    </button>
                                    <button
                                        className="Item__button"
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

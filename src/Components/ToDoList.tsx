import { useState } from "react"
import { deleteItemActionCreator, toggleEditItemActionCreator, toggleIsFollowingInProgress } from "../BLL/rootReducer"

const editImg = require('../assets/edit.png')
const removeImg = require('../assets/x-mark.png')

type PropsType = {
    ToDoData: Array<any>
    inEditMode: Array<any>
    dispatch: (action: any) => void
}
export const ToDoList = (props: PropsType) => {
    const [editedText, setEditedText] = useState('')
    const onDeleteItem = (id: number) => {
        props.dispatch(deleteItemActionCreator(id))
    }
    const onEditItemMode = (id: number, text: string) => {
        props.dispatch(toggleIsFollowingInProgress(true, id))
        setEditedText(text)
    }
    const onEditText = (id: number) => {
        props.dispatch(toggleEditItemActionCreator(id, editedText))
        props.dispatch(toggleIsFollowingInProgress(false, id))
        setEditedText('')
    }
    return (
        <div className='ToDoList'>
            <h1 className='ToDoList__title title'>To Do list</h1>
            {props.ToDoData.length ?
                props.ToDoData.map((object) => (
                    <div
                        className="Item"
                        key={object.id}
                    >
                        {props.inEditMode.some(id => id === object.id) ?
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
                                    <input type='checkbox' />
                                    {object.text}
                                </div>
                                <div className="Item__buttonBlock">
                                    <button
                                        className="Item__button"
                                        onClick={() => { onDeleteItem(object.id) }}
                                    >
                                        <img src={removeImg} />
                                    </button>
                                    <button
                                        className="Item__button"
                                        disabled={props.inEditMode.length !== 0}
                                        onClick={() => onEditItemMode(object.id, object.text)}
                                    >
                                        <img src={editImg} />
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                )) :
                <div className='note'>
                    No to Do
                </div>
            }


        </div>
    )
}

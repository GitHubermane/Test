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
    const [editedMessage, setEditedMessage] = useState('')
    const onDeleteItem = (id: number) => {
        props.dispatch(deleteItemActionCreator(id))

    }
    return (
        <div className='ToDoList'>
            <h1>ToDoList</h1>
            {props.ToDoData.map((object) => (
                <div key={object.id}>
                    <div>

                        {props.inEditMode.some(id => id === object.id) ?
                            <div>
                                <input
                                    value={editedMessage}
                                    onChange={e => { setEditedMessage(e.currentTarget.value) }}
                                />
                                <button
                                    onClick={() => {
                                        props.dispatch(toggleEditItemActionCreator(object.id, editedMessage))
                                        props.dispatch(toggleIsFollowingInProgress(false, object.id))
                                        setEditedMessage('')
                                    }}
                                >
                                    All right
                                </button>
                            </div> :
                            <div>
                                <input type='checkbox' />
                                {object.text}
                                <button onClick={() => { onDeleteItem(object.id) }}>
                                    <img src={removeImg} />
                                </button>
                                <button
                                    disabled={props.inEditMode.length !== 0}
                                    onClick={() => {
                                        props.dispatch(toggleIsFollowingInProgress(true, object.id))
                                        setEditedMessage(object.text)
                                    }}>
                                    <img src={editImg} />
                                </button>
                            </div>
                        }
                    </div>

                </div>
            ))}
        </div>
    )
}

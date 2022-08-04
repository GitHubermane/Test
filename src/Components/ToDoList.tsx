import { deleteItemActionCreator } from "../BLL/rootReducer"

const waitingImg = require('../assets/time-left.png')
const removeImg = require('../assets/x-mark.png')


type PropsType = {
    ToDoData: Array<any>
    dispatch: (action: any) => void
}
export const ToDoList = (props: PropsType) => {
    const onDeleteItem = (id: number) => {
        props.dispatch(deleteItemActionCreator(id))

    }
    return (
        <div className='ToDoList'>
            <h1>ToDoList</h1>
            {props.ToDoData.map((object) => (
                <div key={object.id}>
                    <input type='checkbox' />
                    {object.text}
                    <button onClick={() => { onDeleteItem(object.id) }}>
                        <img src={removeImg} />
                    </button>
                    <button>
                        <img src={waitingImg} />
                    </button>
                </div>
            ))}
        </div>
    )
}

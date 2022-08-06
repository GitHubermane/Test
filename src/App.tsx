import React from 'react';
import './App.css';
import { StateType } from './BLL/Store';
import { ToDoEditor } from './Components/ToDoEditor';
import { ToDoList } from './Components/ToDoList';


type PropsType = {
  state: StateType
  dispatch: (action: any) => void
}
const App = (props: PropsType) => {
  return (
    <div className="App">
      <ToDoList
        ToDoData={props.state.ToDoEditorPage.ToDoData}
        inEditMode={props.state.ToDoEditorPage.inEditMode}
        dispatch={props.dispatch}
      />
      <ToDoEditor
        state={props.state}
        dispatch={props.dispatch}
      />
    </div>
  );
}

export default App
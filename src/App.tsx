import React from 'react';
import './css/App.css';
import { ToDoEditor } from './Components/ToDoEditor';
import { ToDoList } from './Components/ToDoList';
import { StateType } from './types';
import { actionsType } from './BLL/rootReducer';


type PropsType = {
  state: StateType
  dispatch: (action: actionsType) => void
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
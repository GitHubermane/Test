import React from 'react';
import './App.css';
import { actionType } from './BLL/rootReducer';
import { StateType } from './BLL/Store';
import { ToDoEditor } from './Components/ToDoEditor';
import { ToDoList } from './Components/ToDoList';


type PropsType = {
  state: StateType
  dispatch: (action: actionType) => void
}
const App = (props: PropsType ) => {
  return (
    <div className="App">
      <ToDoList/>
      <ToDoEditor state={props.state} dispatch={props.dispatch}/>
    </div>
  );
}

export default App
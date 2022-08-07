import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './BLL/Store'
import { StateType } from './types'

let rerenderTree = (state: StateType) => {
  root.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)}/>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

rerenderTree(store.getState())
store.subscribe(rerenderTree)

//@ts-ignore
window.store = store
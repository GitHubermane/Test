import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './BLL/Store'

let rerenderTree = (state: any) => {
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
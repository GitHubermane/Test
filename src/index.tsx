import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './BLL/Store'
import { StateType } from './types'

//  Библиотека gh-pages использована для деплоя на Github Pages

//  Реализовал возможность изменения ширины списка
//  с помощью css(изменяется при нажатии и 
//  перетаскивания знака в нижней части правой границы)

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
//  Чтобы компонента перерисовывалась вызывается функция
rerenderTree(store.getState())
//  Для рендера компонента вызывается метод из Store
store.subscribe(rerenderTree)

//@ts-ignore
window.store = store
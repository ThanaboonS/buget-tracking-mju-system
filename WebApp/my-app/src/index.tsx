import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'


const mylogger =  (store: any) => (next: any) => (action: any) => {
  console.log("Log Action", action);
  next(action);
}
//---------------------------ViewProject-----------------------
const stateViewProject = {
  'idProject': '28'
}
const viewProject = (state = stateViewProject, action: any) => {
  switch (action.type) {
    case "setIdProject":
      state = {
        ...state,
        idProject: action.payload
      }
      break;
    case "setIdProjectNull":
      state = {
        ...state,
        idProject: '',
      }
      break;
    default:
  }
  return state;
}
//-------------------------------------------------------------
const store = createStore(combineReducers({ viewProject }), {}, applyMiddleware(mylogger));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

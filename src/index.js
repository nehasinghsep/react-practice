import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {rootReducer} from './redux/reducers';
import {projectContext} from './redux/project-context';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <projectContext.Provider value={{ProjectName : 'React Training POC by LM'}}>
          <App />
        </projectContext.Provider>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

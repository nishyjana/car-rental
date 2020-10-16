import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route, BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'





const app= (
    <BrowserRouter>
    <App/>
    </BrowserRouter>

)

  
  



ReactDOM.render(app, document.getElementById('root'));
//ReactDOM.render(dropdown, document.getElementById('dropdown'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

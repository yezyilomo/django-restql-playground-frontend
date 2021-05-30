import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import {initializeStore} from './store';
import './custom.scss';
import './index.scss';
import './icons.scss';

import App from './components';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';


// Initialize store before calling ReactDOM.render
initializeStore()


const BASE_API_URL = "https://django-restql-playground-api.yezyilomo.me"

function Application(props){
    return (
        <Router base="/">
            <App/>
        </Router>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { BASE_API_URL }
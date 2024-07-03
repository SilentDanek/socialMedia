import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function rerenderEntireTree(state:any){
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state = {state} dispatch = {store.dispatch.bind(store)}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

store.subscribe(() => rerenderEntireTree(store.getState()))

rerenderEntireTree(store.getState());











// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

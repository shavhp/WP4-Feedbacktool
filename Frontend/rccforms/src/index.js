import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserList from './GetUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
        <UserList/>
    </React.StrictMode>
);
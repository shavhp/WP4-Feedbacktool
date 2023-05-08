import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './pages/App';
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>
);
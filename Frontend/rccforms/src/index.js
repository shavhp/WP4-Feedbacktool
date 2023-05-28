import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './pages/App';
import "bootstrap/dist/css/bootstrap.min.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <ProSidebarProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ProSidebarProvider>
    </React.StrictMode>
);

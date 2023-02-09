import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import KeyUpHandler from './KeyUpHandler';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
        <KeyUpHandler />
    </React.StrictMode>
);
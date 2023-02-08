import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//https://accounts.spotify.com/en/authorize?client_id=e9284fc470b744958c3b4768d9c0e4d2&redirect_uri=http://localhost:5173/&response_type=token
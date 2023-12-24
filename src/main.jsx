import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MyProvider } from './Hooks/Context.jsx'
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MyProvider>
            <App />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </MyProvider>
    </React.StrictMode>,
)

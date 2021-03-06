import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './Store/AuthContext';
import { PlaylistsProvider } from './Store/PlaylistsContext';
// import './Store/Interceptors';
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
        <AuthProvider>
            <PlaylistsProvider>
              <App />
            </PlaylistsProvider>      
        </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
)

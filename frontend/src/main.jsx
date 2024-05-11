import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom' 
import {store, perStore} from './Redux/store.js' 
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={perStore}> 
            <BrowserRouter> 
               <App />
            </BrowserRouter>
         </PersistGate>
      </Provider>
   </React.StrictMode>,
)

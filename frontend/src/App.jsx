import './App.css'
import Home from './pages/Home' 
import {Routes, Route} from 'react-router-dom' 
import Login from './pages/Login'
import Profile from './pages/Profile'

//add suspense and fallback and lazy loading. . . 

function App() {

  return (
    <> 
    <Routes> 
      <Route exact path='/' element={<Home />}/>
      <Route path='login/' element={<Login />}/>
      <Route path='profile/' element={<Profile />}/>
    </Routes>
    </>
  )
}

export default App

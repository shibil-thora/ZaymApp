import './App.css'
import Home from './pages/Home' 
import {Routes, Route} from 'react-router-dom' 
import Login from './pages/Login'
import Profile from './pages/Profile' 
import ProviderMenu from './Components/ProfileMenuProvider/ProviderMenu'
import UserMenu from './Components/ProfileMenuUser/UserMenu'

//add suspense and fallback and lazy loading. . . 

function App() {

  return (
    <> 
    <Routes> 
      <Route exact path='/' element={<Home />}/>
      <Route path='login/' element={<Login />}/>
      <Route path='profile/user' element={<Profile rightMenu={UserMenu} />}/>
      <Route path='profile/provider' element={<Profile rightMenu={ProviderMenu} />}/>
    </Routes>
    </>
  )
}

export default App

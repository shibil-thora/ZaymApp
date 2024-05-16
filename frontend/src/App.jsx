import './App.css'
import Home from './pages/Home' 
import {Routes, Route} from 'react-router-dom' 
import Login from './pages/Login'
import Profile from './pages/Profile' 
import ProviderMenu from './Components/ProfileMenuProvider/ProviderMenu'
import UserMenu from './Components/ProfileMenuUser/UserMenu'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import AdminDash from './Components/AdminDash/AdminDash'
import AdminUser from './Components/AdminUser/AdminUser'
import AdminProvider from './Components/AdminProviders/AdminProvider'
import AdminServiceTypes from './Components/AdminServiceTypes/AdminServiceTypes'

//add suspense and fallback and lazy loading. . . 

function App() {

  return (
    <> 
    <Routes> 
      <Route exact path='/' element={<Home />}/>
      <Route exact path='admin/dashboard' element={<Admin rightMenu={AdminDash}/>}/>
      <Route exact path='admin/users' element={<Admin rightMenu={AdminUser}/>}/>
      <Route exact path='admin/providers' element={<Admin rightMenu={AdminProvider}/>}/>
      <Route exact path='admin/servicetypes' element={<Admin rightMenu={AdminServiceTypes}/>}/>
      <Route path='login/' element={<Login />}/>
      <Route path='signup/' element={<Signup />}/>
      <Route path='profile/user' element={<Profile rightMenu={UserMenu} />}/>
      <Route path='profile/provider' element={<Profile rightMenu={ProviderMenu} />}/>
    </Routes>
    </>
  )
}

export default App

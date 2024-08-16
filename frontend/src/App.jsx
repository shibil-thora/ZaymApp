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
import UserProtected from './pages/UserProtected'
import ServiceView from './pages/ServiceView'
import ProfileServiceView from './Components/ProfileServiceView/ProfileServiceView'
import ProviderProtected from './pages/ProviderProtected'
import ProfilePasswordMenu from './Components/ProfilePassword/ProfilePasswordMenu'
import ChatPage from './pages/ChatPage'
import ChatSubMenu from './Components/ChatSubMenu/ChatSubMenu'
import AdminAreas from './Components/AdminAreas/AdminAreas'
import PremiumMenu from './Components/PremiumMenu/PremiumMenu'
import { liveSocket2 } from './Components/ContextComp/ContextComp'
import { useEffect } from 'react' 
import { domainPort } from './Axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addNotiCount } from './Redux/AuthSlice'
   

function App() {  

  const state = useSelector(state => state.auth)
  const dispatch = useDispatch(); 

  useEffect(() => {
    
        liveSocket2.onopen = (e) => {
            console.log('live socket connected')
        } 

        liveSocket2.onclose = (e) => {
            console.log('live socket disconnectd')
        } 

        // Live App management ------------

        liveSocket2.onmessage = (e) => {
            const data = JSON.parse(e.data).message 
            
            if (data.type == 'knock' && data.to == state.user.username) {
              console.log('here only me') 
              dispatch(addNotiCount()); 
            }
        } 

        // Live App management ------------

    }, [])

  return (
    <> 
    <Routes> 
      <Route exact path='/' element={<Home />}/>
      <Route exact path='admin/dashboard' element={<Admin subMenu={AdminDash}/>}/>
      <Route exact path='admin/users' element={<Admin subMenu={AdminUser}/>}/>
      <Route exact path='admin/providers' element={<Admin subMenu={AdminProvider}/>}/>
      <Route exact path='admin/servicetypes' element={<Admin subMenu={AdminServiceTypes}/>}/>
      <Route exact path='admin/areas' element={<Admin subMenu={AdminAreas}/>}/>
      <Route path='login/' element={<Login />}/>
      <Route path='signup/' element={<Signup />}/>
      <Route path='user/serviceview/' element={<UserProtected component={ServiceView}/>}/>
      <Route path='profile/user/' element={<UserProtected component={Profile} subMenu={UserMenu} />}/>
      <Route path='profile/provider/' element={<UserProtected component={Profile} subMenu={ProviderMenu} />}/>
      <Route path='profile/premium/' element={<UserProtected component={Profile} subMenu={PremiumMenu} />}/>
      <Route path='profile/change_password/' element={<UserProtected component={Profile} subMenu={ProfilePasswordMenu} />}/>
      <Route path='chat/users/' element={<UserProtected component={ChatPage} />}/>
      <Route path='chat/users/:id' element={<UserProtected component={ChatPage} subMenu={ChatSubMenu} />}/>
      <Route path='provider/viewservice/' element={<ProviderProtected component={Profile} subMenu={ProfileServiceView} />} />
    </Routes>
    </>
  )
}

export default App

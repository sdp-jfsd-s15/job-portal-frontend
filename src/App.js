import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/WelcomePage/Welcome';
import Signin from './components/Signin-Signup/Signin';
import RedirectPage from './components/RedirectPage/AuthRedirect';
import { AuthProvider } from './Token/AuthContext';
import UserProfile from './components/Profile/UserProfile';
import Dashboard from './components/Admin/Dashboard';
import Home from './components/Admin/Home';
import AllUsers from './components/Admin/CheckUsers/AllUsers';
import ProfessionalDashboard from './components/Professional/ProfessionalDashboard';
import ProfessionalHome from './components/Professional/ProfessionalHome';
import MyNetwork from './components/Professional/P-Components/MyNetwork';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/auth-redirect' element={<RedirectPage />}/>
        <Route path='/profile' element={<UserProfile />}/>
        <Route path='/admin/*' element={<Dashboard />}>
          <Route path='' element={<Home />}/>
          <Route path='check-users' element={<AllUsers />}/>
        </Route>
        <Route path='/professional/*' element={<ProfessionalDashboard />}>
          <Route path='' element={<ProfessionalHome />}/>
          <Route path='my-network' element={<MyNetwork />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
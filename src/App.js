import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/WelcomePage/Welcome';
import Signin from './components/Signin-Signup/Signin';
import RedirectPage from './components/RedirectPage/AuthRedirect';
import { AuthProvider } from './Token/AuthContext';
import Dashboard from './components/Admin/Dashboard';
import Home from './components/Admin/Home';
import AllUsers from './components/Admin/CheckUsers/AllUsers';
import ProfessionalDashboard from './components/Professional/ProfessionalDashboard';
import ProfessionalHome from './components/Professional/ProfessionalHome';
import MyNetwork from './components/Professional/P-Components/MyNetwork';
import PProfile from './components/Professional/P-Components/PProfile';
import ProfileRedirector from './components/RedirectPage/ProfileRedirector';
import CreateProfile from './components/CreateProfile';

const App = () => {
  return (
    <div style={{ backgroundColor: "#f4f2ee" }}>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/auth-redirect' element={<RedirectPage />}/>
        <Route path='/admin/*' element={<Dashboard />}>
          <Route path='' element={<Home />}/>
          <Route path='check-users' element={<AllUsers />}/>
        </Route>
        <Route path='/professional/*' element={<ProfessionalDashboard />}>
          <Route path='' element={<ProfessionalHome />}/>
          <Route path='my-network' element={<MyNetwork />}/>
          <Route path='profile/:username' element={<PProfile />}/>
        </Route>
        <Route path='/check-profile' element={<ProfileRedirector />}/>
        <Route path='/create-profile' element={<CreateProfile />}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </div>
  )
}

export default App
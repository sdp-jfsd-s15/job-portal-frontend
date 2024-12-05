import React from 'react';
import "./App.css";
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
import ProfileViewer from './components/ProfileViewer'
import CreateProfile from './components/CreateProfile';
import Jobs from './components/Professional/P-Components/Jobs';
import PostAJob from './components/Professional/P-Components/Jobs/PostAJob';
import LogoutRedirector from './components/RedirectPage/LogoutRedirector';
import ViewAllMyPostedJobs from './components/Professional/P-Components/Jobs/ViewAllMyPostedJobs';
// import Chat from './components/Chat/Chat';
import Message from './components/Chat/Message';
import MyConnections from './components/Professional/P-Components/MyNetwork/MyConnections';
import UserDashboard from './components/User/UserDashboard';
import UserHome from './components/User/UserHome';
import UserJobPage from './components/User/UserJobPage';
import ViewJob from './components/User/Jobs/ViewJob';
import MaterialUITable from './components/MaterialUITable';
import SavedJobs from './components/User/Jobs/SavedJobs';
import ViewJobFromProfile from './components/User/Jobs/ViewJobFromProfile';

const App = () => {
  return (
    <div className="app-container">
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
          <Route path='work' element={<Jobs />}/>
          <Route path='post-a-job' element={<PostAJob />}/>
          <Route path='view-all-my-posted-jobs' element={<ViewAllMyPostedJobs />}/>
          <Route path='profile/:username' element={<PProfile />}/>
          <Route path='view-profile/:username' element={<ProfileViewer />}/>
          <Route path='messages' element={<Message />}/>
          <Route path='messages/:username/:firstName/:lastName' element={<Message />}/>
          <Route path='my-connections' element={<MyConnections />}/>
          <Route path='connection-details/:connectionCount/:userName' element={<MyConnections />}/>
        </Route>
        <Route path='/user/*' element={<UserDashboard />}>
         <Route path='' element={<UserHome />}/>
         <Route path='my-network' element={<MyNetwork />}/>
         <Route path='my-connections' element={<MyConnections />}/>
         <Route path='connection-details/:connectionCount/:userName' element={<MyConnections />}/>
         <Route path='messages' element={<Message />}/>
         <Route path='messages/:username/:firstName/:lastName' element={<Message />}/>
         <Route path='view-profile/:username' element={<ProfileViewer />}/>
         <Route path='profile/:username' element={<PProfile />}/>
         <Route path='work' element={<UserJobPage />}/>
         <Route path='view-saved-jobs' element={<SavedJobs />}/>
         <Route path='view-job/:id' element={<ViewJob />}/>
         <Route path='view-job-applied/:id' element={<ViewJobFromProfile />}/>
        </Route>
        <Route path='/check-profile' element={<ProfileRedirector />}/>
        <Route path='/create-profile' element={<CreateProfile />}/>
        <Route path='/logout' element={<LogoutRedirector />}/>
        <Route path='/savePdf' element={<MaterialUITable />}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </div>
  )
}

export default App
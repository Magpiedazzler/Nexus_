import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/User/HomePage'
import Registration from '../Pages/User/Registration'
import LoginPage from '../Pages/User/LoginPage'
import ApplicationPage from '../Pages/User/ApplicationPage'
import GamePage from '../Pages/User/GamePage'
import DownloadPage from '../Pages/User/DownloadPage'
import FeedbackPage from '../Pages/User/FeedbackPage'
import UploadPage from '../Pages/User/UploadPage'
import ReportPage from '../Pages/User/ReportPage'
import LibraryPage from '../Pages/User/LibraryPage'
import ProfilePage from '../Pages/User/ProfilePage'
import EditProfilePage from '../Pages/User/EditProfilePage'
import UpdatePage from '../Pages/User/UpdatePage'
import UploadFilePage from '../Pages/User/UploadFilePage'
import ForgotPasswordPage from '../Pages/User/ForgotPasswordPage'
import RatingPage from '../Pages/User/RatingPage'
import AboutPage from '../Pages/User/AboutPage'

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/apps' element={<ApplicationPage/>}/>
        <Route path='/games' element={<GamePage/>}/>
        <Route path='/install/:id' element={<DownloadPage/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path='/upload' element={<UploadPage/>}/>
        <Route path='/report/:appId' element={<ReportPage/>}/>
        <Route path='/library' element={<LibraryPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/edit_profile' element={<EditProfilePage/>}/>
        <Route path='/update' element={<UpdatePage/>}/>
        <Route path='/update_file/:id' element={<UploadFilePage/>}/>
        <Route path='/forgot_pswd' element={<ForgotPasswordPage/>}/>
        <Route path='/rating/:appId' element={<RatingPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
      </Routes>
    </div>
  )
}

export default UserRoutes

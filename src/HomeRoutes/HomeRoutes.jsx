import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ForgotPassword from '../Auth/ForgotPassword'
import RegisterUser from '../Auth/RegisterUser'
import ResetPassword from '../Auth/ResetPassword'
import VerifyOTP from '../Auth/VerifyOtp'
import VerifyToken from '../Auth/VerifyToken'
import Home from '../Home/Home'

const HomeRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/verify-token" element={<VerifyToken />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </>
  )
}

export default HomeRoutes
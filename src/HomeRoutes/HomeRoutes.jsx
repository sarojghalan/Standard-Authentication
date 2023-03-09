import React from 'react'
import { Routes,Route } from 'react-router-dom'
import RegisterUser from '../Auth/RegisterUser'
import VerifyOTP from '../Auth/VerifyOtp'
import Home from '../Home/Home'

const HomeRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
        </Routes>
    </>
  )
}

export default HomeRoutes
import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import './App.css'
import Homepage from './pages/Homepage'
import LoginPage from './pages/Loginpage'
import RegisterPage from './pages/Registerpage'
import Cookies from "js-cookie"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/home" element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>

  )
}
export function ProtectedRoutes(prop) {

  if (Cookies.get("token")) {
    return prop.children
  }
  else {

    return <Navigate to="/login" replace />
  }
}
export default App

import React from 'react'

import Login from './pages/login/login'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import AdminDashboard from './pages/home/dashboard/AdminDashboard';
import NewAdmission from './pages/home/Admission_Management/newAdmission';
import Allteacher from './pages/home/Teacher_Management/Allteacher';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="newadmission" element={<NewAdmission />} />
        <Route path="allteacher" element={<Allteacher />} />
        </Routes>
        </BrowserRouter>
  )
}

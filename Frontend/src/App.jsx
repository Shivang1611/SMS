import React from 'react'

import Login from './pages/login/login'

import {  Routes, Route, Navigate } from "react-router-dom";


import AdminDashboard from './pages/home/dashboard/AdminDashboard';
import NewAdmission from './pages/home/Admission_Management/newAdmission';
import Allteacher from './pages/home/Teacher_Management/Allteacher';
import AllStudents from './pages/home/StudentManagement/AllStudents';
import AdminLayout from './layout/AdminLayout';


export default function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="admindashboard" element={
          <AdminLayout>
          <AdminDashboard />
          </AdminLayout>
          } />
        <Route path="newadmission" element={
           <AdminLayout>
          <NewAdmission />
          </AdminLayout>
          } />
        <Route path="allteacher" element={
           <AdminLayout>
          <Allteacher />
          </AdminLayout>
          } />
        <Route path="allstudents" element={
          <AdminLayout>
          <AllStudents />
          </AdminLayout>
          } />
        </Routes>
        
  )
}

import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const addStudent = (studentData) => {
    const newStudent = {
      id: Date.now().toString(), // Simple ID generation
      ...studentData,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      studentId: `STU${Date.now().toString().slice(-6)}` // Generate student ID
    };
    
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const getStudentById = (id) => {
    return students.find(student => student.id === id);
  };

  const value = {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
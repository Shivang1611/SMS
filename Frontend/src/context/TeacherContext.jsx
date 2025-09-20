import React, { createContext, useContext, useState } from "react";

const TeacherContext = createContext();

export function TeacherProvider({ children }) {
  const [teachers, setTeachers] = useState([]);

  const addTeacher = (teacher) => {
    setTeachers((prev) => [...prev, teacher]);
  };

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
}

export const useTeachers = () => useContext(TeacherContext);

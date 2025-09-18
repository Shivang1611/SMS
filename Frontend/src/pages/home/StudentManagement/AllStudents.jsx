import React, { useState } from 'react';
import { 
  User, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Plus,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  MapPin
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

import Header from '../../../component/common/header';
import Sidebar from '../../../component/common/sidebar';
import { useStudents } from '../../../context/StudentContext';
import { useNavigate } from 'react-router-dom';

export default function AllStudents() {
  const { isDark } = useTheme();
    const navigate = useNavigate();
  const { students, deleteStudent } = useStudents();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Filter students based on search term and class
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = filterClass === '' || student.admissionClass === filterClass;
    
    return matchesSearch && matchesClass;
  });

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const classes = [
    'Pre-KG', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 
    'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];

  return (
    <div className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <aside className="flex-shrink-0 transition-all duration-300">
        <Sidebar 
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </aside>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        <Header isDark={isDark} className="w-full flex items-center justify-between px-4 shadow-sm transition-all duration-300" />
        
        <div className="flex-1 overflow-y-auto p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  All Students
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage and view all enrolled students
                </p>
              </div>
              <button onClick={() => navigate('/newadmission')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Plus size={20} />
                <span>Add New Student</span>
                
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Students</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{students.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Students</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {students.filter(s => s.status === 'Active').length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <GraduationCap className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>New This Month</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {students.filter(s => {
                      const admissionDate = new Date(s.admissionDate);
                      const now = new Date();
                      return admissionDate.getMonth() === now.getMonth() && 
                             admissionDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Selected</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedStudents.length}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Filter className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${
                  isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              
              <div className="flex space-x-2">
                <button className={`flex-1 px-4 py-3 rounded-xl border ${
                  isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                } hover:bg-blue-50 transition-all flex items-center justify-center space-x-2`}>
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Student
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Student ID
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Class
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Admission Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <User className={`${isDark ? 'text-gray-600' : 'text-gray-400'} mb-4`} size={48} />
                          <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                            No students found
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {searchTerm || filterClass ? 'Try adjusting your search or filter criteria' : 'Start by adding your first student'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className={`${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {student.firstName} {student.lastName}
                              </p>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {student.dateOfBirth}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {student.studentId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {student.admissionClass}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {student.email}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {student.phone}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {student.admissionDate}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.status === 'Active' 
                              ? isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                              : isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors">
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
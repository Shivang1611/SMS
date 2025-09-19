import React, { useState, useRef ,useCallback} from 'react';
import {
  Users,
  BookOpen,
  UserPlus,
  Settings,
  GraduationCap,
  CreditCard,
  BarChart3,
  Bell,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Search,
  Plus,
  Upload,
  Mail,
  Phone,
  MessageCircle,
  MoreHorizontal,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  X,
  Camera,
  Calendar,
  Grid,
  List
} from 'lucide-react';
import Sidebar from '../../../component/common/sidebar';
import Header from '../../../component/common/header';
import { useTheme } from '../../../context/ThemeContext';
import AddTeacherForm from '../../../component/AddTeacherForm';

export default function Allteacher() {
  const { isDark } = useTheme();
  
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const fileInputRef = useRef(null);
  const csvInputRef = useRef(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    subject: '',
    designation: '',
    gender: '',
    password: '',
    phone: '',
    avatar: null,
    class: ''
  });


  const [teachers, setTeachers] = useState([
    
    {
      id: 1,
      name: 'Michael Chen',
      email: 'michael.chen@school.com',
      subject: 'Physics',
      class: '11-B',
      gender: 'Male',
      designation: 'Teacher',
      phone: '+1 234 567 8902',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Emma Davis',
      email: 'emma.davis@school.com',
      subject: 'English',
      class: '9-C',
      gender: 'Female',
      designation: 'Head of Department',
      phone: '+1 234 567 8903',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Kristin Watson',
      email: 'kristin.watson@school.com',
      subject: 'Biology',
      class: '12-A',
      gender: 'Female',
      designation: 'Teacher',
      phone: '+1 234 567 8904',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.rodriguez@school.com',
      subject: 'History',
      class: '10-B',
      gender: 'Male',
      designation: 'Senior Teacher',
      phone: '+1 234 567 8905',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  }, []);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                          teacher.subject.toLowerCase() === selectedFilter.toLowerCase() ||
                         teacher.gender.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewTeacher({...newTeacher, avatar: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split('\n');
          
          const newTeachers = [];
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(',');
              const teacher = {
                id: Date.now() + i,
                name: values[0]?.trim() || '',
                email: values[1]?.trim() || '',
                subject: values[2]?.trim() || '',
                class: values[3]?.trim() || '',
                gender: values[4]?.trim() || '',
                designation: values[5]?.trim() || 'Teacher',
                phone: values[6]?.trim() || '',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
              };
              newTeachers.push(teacher);
            }
          }
          
          setTeachers([...teachers, ...newTeachers]);
          alert(`Successfully imported ${newTeachers.length} teachers!`);
        } catch (error) {
          alert('Error importing CSV file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    };
  const handleCSVExport = () => {
    const headers = ['Name', 'Email', 'Subject', 'Class', 'Gender', 'Designation', 'Phone'];
    const csvContent = [
      headers.join(','),
      ...filteredTeachers.map(teacher => 
        [teacher.name, teacher.email, teacher.subject, teacher.class, teacher.gender, teacher.designation, teacher.phone].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email) {
      alert('Please fill in required fields (Name and Email)');
      return;
    }

    const teacher = {
      id: Date.now(),
      ...newTeacher,
      avatar: newTeacher.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: '', email: '', subject: '', designation: '', gender: '', password: '', phone: '', avatar: null, class: ''
    });
    setCurrentView('list');
    alert('Teacher added successfully!');
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
      alert('Teacher deleted successfully!');
    }
  };

  const handleEditTeacher = (teacher) => {
    setNewTeacher(teacher);
    setCurrentView('add');

  };
  

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users size={40} className="text-purple-500" />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          No Teachers at this time
        </h3>
        <p className={`mb-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          Teachers will appear here after they enroll at your school.
        </p>
        <button
          onClick={() => setCurrentView('add')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Add Teacher
        </button>
      </div>
    </div>
  );
;

  const TeachersGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ">
      {filteredTeachers.map((teacher) => (
        <div key={teacher.id} className={`rounded-xl border p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-center">
            <img
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              src={teacher.avatar}
              alt={teacher.name}
            />
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {teacher.name}
            </h3>
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {teacher.subject}
            </p>
            <p className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {teacher.class}
            </p>
            
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => {
                  setSelectedTeacher(teacher);
                  setCurrentView('profile');
                }}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Eye size={16} />
              </button>
              <button 
                onClick={() => handleEditTeacher(teacher)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDeleteTeacher(teacher.id)}
                className={`p-2 rounded-lg text-red-500 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TeachersTable = () => (
    <div className={`rounded-xl border overflow-x-auto ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <table className="w-full">
        <thead className={isDark ? 'bg-gray-750' : 'bg-gray-50'}>
          <tr>
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Name
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Subject
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Class
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Email address
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Gender
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
          {filteredTeachers.map((teacher) => (
            <tr key={teacher.id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={teacher.avatar}
                    alt={teacher.name}
                  />
                  <div className="ml-4">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {teacher.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                {teacher.subject}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                {teacher.class}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                {teacher.email}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                {teacher.gender}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setCurrentView('profile');
                    }}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="View Profile"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEditTeacher(teacher)}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="Edit Teacher"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className={`p-2 rounded-lg text-red-500 transition-colors ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                    title="Delete Teacher"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="relative">
                    <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const TeachersList = () => (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              <Filter size={16} />
              <span>{selectedFilter === 'all' ? 'All Filter' : selectedFilter}</span>
              <ChevronDown size={16} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {filterOpen && (
              <div className={`absolute top-full left-0 mt-2 w-48 border rounded-lg shadow-lg z-10 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="py-1">
                  {['all', 'Mathematics', 'Physics', 'English', 'Biology', 'History', 'Male', 'Female'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedFilter(filter);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} ${selectedFilter === filter ? 'bg-purple-100 text-purple-800' : ''}`}
                    >
                      {filter === 'all' ? 'All Filters' : filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2  ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className={`pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Search for teachers by name, email "
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`flex rounded-lg border overflow-hidden ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-purple-500 text-white' : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-purple-500 text-white' : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleCSVExport}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setCurrentView('add')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Teachers</span>
          </button>
        </div>
      </div>

      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            No teachers found
          </h3>
          <p className={isDark ? 'text-gray-500' : 'text-gray-500'}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'table' ? <TeachersTable /> : <TeachersGrid />}
          
          <div className={`mt-6 flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Showing {filteredTeachers.length} of {teachers.length} teachers</span>
            <div className="flex items-center space-x-2">
              <button className={`px-3 py-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Previous</button>
              <button className="px-3 py-1 rounded bg-purple-500 text-white">1</button>
              <button className={`px-3 py-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>2</button>
              <button className={`px-3 py-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const TeacherProfile = () => {
    if (!selectedTeacher) return null;

    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('list')}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronDown size={20} className="transform rotate-90" />
              </button>
              <div className="relative">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  defaultValue={selectedTeacher.name}
                  className={`pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleCSVExport}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
              <button 
                onClick={() => setCurrentView('add')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Teachers</span>
              </button>
            </div>
          </div>

          <div className={`rounded-xl border p-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <img
                  className="w-32 h-32 rounded-2xl object-cover"
                  src={selectedTeacher.avatar}
                  alt={selectedTeacher.name}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedTeacher.name}
                    </h2>
                    <p className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedTeacher.subject} Teacher
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {selectedTeacher.designation}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <MessageCircle size={20} />
                    </button>
                    <button className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Phone size={20} />
                    </button>
                    <button className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Mail size={20} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>About</h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    An experienced educator dedicated to fostering student growth and academic excellence. Passionate about innovative teaching methods and creating an engaging learning environment that inspires students to reach their full potential.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</h4>
                    <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedTeacher.email}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</h4>
                    <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedTeacher.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Gender</h4>
                    <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedTeacher.gender}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Class</h4>
                    <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedTeacher.class}</p>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Other Teachers
                  </h3>
                  <div className="flex items-center space-x-3">
                    {teachers.filter(t => t.id !== selectedTeacher.id).slice(0, 4).map((teacher) => (
                      <button
                        key={teacher.id}
                        onClick={() => setSelectedTeacher(teacher)}
                        className="flex-shrink-0"
                      >
                        <img
                          className="w-12 h-12 rounded-full object-cover border-2 border-white hover:border-purple-500 transition-colors"
                          src={teacher.avatar}
                          alt={teacher.name}
                          title={teacher.name}
                        />
                      </button>
                    ))}
                    {teachers.length > 5 && (
                      <span className={`text-sm ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        +{teachers.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex h-screen  ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <aside className="flex-shrink-0 transition-all duration-300 ">
                    
                    <Sidebar 
                      isSidebarExpanded={isSidebarExpanded}
                      setIsSidebarExpanded={setIsSidebarExpanded}
                    />
                  </aside>
     

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        <Header isDark={isDark} className="w-full flex items-center justify-between px-4 shadow-sm transition-all duration-300"  />
         <div className="flex-1 p-8  overflow-y-scroll  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Manage <span className="text-purple-600">Teachers</span>
              </h1>
        {teachers.length === 0 && currentView === 'list' ? <EmptyState /> : null}
        {currentView === 'list' && teachers.length > 0 && <TeachersList />}
        {currentView === 'add' && (
            <AddTeacherForm 
              isDark={isDark}
              newTeacher={newTeacher}
              setNewTeacher={setNewTeacher}
              handleAddTeacher={handleAddTeacher}
              handlePhotoUpload={handlePhotoUpload}
              handleCSVImport={handleCSVImport}
              setCurrentView={setCurrentView}
              fileInputRef={fileInputRef}
              csvInputRef={csvInputRef}
            />
          )}
        {currentView === 'profile' && <TeacherProfile />}
        </div>
      </div>
    </div>
  );
}
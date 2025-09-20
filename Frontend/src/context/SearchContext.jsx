// src/context/SearchContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  UserPlus, 
  BookOpen, 
  CreditCard, 
  Settings,
  Calendar,
  Award,
  FileText,
  TrendingUp
} from 'lucide-react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const navigate = useNavigate();

  // Define searchable menu items
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admindashboard', 
      icon: BarChart3,
      keywords: ['dashboard', 'home', 'overview', 'stats', 'analytics']
    },
    { 
      name: 'New Admission', 
      path: '/newadmission', 
      icon: UserPlus,
      keywords: ['admission', 'enroll', 'new student', 'register', 'add student']
    },
    { 
      name: 'All Students', 
      path: '/allstudents', 
      icon: GraduationCap,
      keywords: ['students', 'student list', 'enrolled', 'student management']
    },
    { 
      name: 'All Teachers', 
      path: '/allteacher', 
      icon: Users,
      keywords: ['teachers', 'faculty', 'staff', 'teacher management']
    },
    { 
      name: 'Student Management', 
      path: '/students', 
      icon: GraduationCap,
      keywords: ['student management', 'attendance', 'performance', 'profiles']
    },
    { 
      name: 'Teacher Management', 
      path: '/teachers', 
      icon: Users,
      keywords: ['teacher management', 'payroll', 'schedule', 'performance']
    },
    { 
      name: 'Academic Management', 
      path: '/academics', 
      icon: BookOpen,
      keywords: ['academics', 'courses', 'curriculum', 'timetable', 'assessments']
    },
    { 
      name: 'Financial Management', 
      path: '/finance', 
      icon: CreditCard,
      keywords: ['finance', 'fees', 'billing', 'expenses', 'budget']
    },
    { 
      name: 'Reports & Analytics', 
      path: '/reports', 
      icon: TrendingUp,
      keywords: ['reports', 'analytics', 'statistics', 'data', 'insights']
    },
    { 
      name: 'System Settings', 
      path: '/settings', 
      icon: Settings,
      keywords: ['settings', 'configuration', 'system', 'preferences']
    }
  ];

  // Global search function
  const performGlobalSearch = (query, studentsData = [], teachersData = []) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = [];
    const searchTerm = query.toLowerCase();

    // Search in students
    if (studentsData && studentsData.length > 0) {
      const studentResults = studentsData
        .filter(student => 
          student.firstName?.toLowerCase().includes(searchTerm) ||
          student.lastName?.toLowerCase().includes(searchTerm) ||
          student.studentId?.toLowerCase().includes(searchTerm) ||
          student.email?.toLowerCase().includes(searchTerm) ||
          student.phone?.toLowerCase().includes(searchTerm) ||
          student.admissionClass?.toLowerCase().includes(searchTerm) ||
          student.fatherName?.toLowerCase().includes(searchTerm) ||
          student.motherName?.toLowerCase().includes(searchTerm)
        )
        .slice(0, 5)
        .map(student => ({
          id: `student-${student.id}`,
          title: `${student.firstName} ${student.lastName}`,
          subtitle: `Student ID: ${student.studentId} | Class: ${student.admissionClass}`,
          description: student.email,
          type: 'student',
          icon: GraduationCap,
          action: () => {
            navigate('/allstudents');
            addToRecentSearches(query);
            closeSearch();
          },
          data: student
        }));
      
      if (studentResults.length > 0) {
        results.push({
          category: 'Students',
          count: studentResults.length,
          items: studentResults
        });
      }
    }

    // Search in teachers
    if (teachersData && teachersData.length > 0) {
      const teacherResults = teachersData
        .filter(teacher => 
          teacher.name?.toLowerCase().includes(searchTerm) ||
          teacher.email?.toLowerCase().includes(searchTerm) ||
          teacher.subject?.toLowerCase().includes(searchTerm) ||
          teacher.designation?.toLowerCase().includes(searchTerm) ||
          teacher.phone?.toLowerCase().includes(searchTerm)
        )
        .slice(0, 5)
        .map(teacher => ({
          id: `teacher-${teacher.id}`,
          title: teacher.name,
          subtitle: `${teacher.designation} | Subject: ${teacher.subject}`,
          description: teacher.email,
          type: 'teacher',
          icon: Users,
          action: () => {
            navigate('/allteacher');
            addToRecentSearches(query);
            closeSearch();
          },
          data: teacher
        }));
      
      if (teacherResults.length > 0) {
        results.push({
          category: 'Teachers',
          count: teacherResults.length,
          items: teacherResults
        });
      }
    }

    // Search in navigation/menu items
    const navigationResults = menuItems
      .filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.keywords.some(keyword => keyword.includes(searchTerm))
      )
      .slice(0, 4)
      .map(item => ({
        id: `nav-${item.path}`,
        title: item.name,
        subtitle: 'Navigate to page',
        description: `Go to ${item.name}`,
        type: 'navigation',
        icon: item.icon,
        action: () => {
          navigate(item.path);
          addToRecentSearches(query);
          closeSearch();
        }
      }));

    if (navigationResults.length > 0) {
      results.push({
        category: 'Navigation',
        count: navigationResults.length,
        items: navigationResults
      });
    }

    setSearchResults(results);
    setIsSearching(false);
  };

  // Add to recent searches
  const addToRecentSearches = (query) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== query);
      return [query, ...filtered].slice(0, 5); // Keep only last 5 searches
    });
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Open search
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  // Close search
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Get popular searches/suggestions
  const getPopularSearches = () => [
    'students',
    'teachers', 
    'dashboard',
    'new admission',
    'reports',
    'settings'
  ];

  const contextValue = {
    // State
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    
    // Actions
    openSearch,
    closeSearch,
    handleSearchChange,
    performGlobalSearch,
    addToRecentSearches,
    clearRecentSearches,
    getPopularSearches,
    
    // Data
    menuItems
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
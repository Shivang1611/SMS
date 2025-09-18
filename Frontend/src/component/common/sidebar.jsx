import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Settings,
  GraduationCap,
  CreditCard,
  BarChart3,
  Bell,
  LogOut,
  Sun,
  Moon,
  Calendar,
  Award,
  ChevronDown,
  ChevronRight,
  UserPlus,
  FileText,
  CheckCircle,
  Clock,
  UserCheck,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  PieChart,
  Activity,
  Target,
  Zap,
  Shield,
  Database,
  HelpCircle,
  ChevronsLeft, // --- 1. IMPORT: Added icon for the toggle button
  ChevronsRight
} from "lucide-react";
import logo from "../../assets/logo.jpg"
import { useTheme } from "../../context/ThemeContext";

export default function Sidebar({ 
  selectedSection, 
  onSectionChange, 
  isSidebarExpanded, 
  setIsSidebarExpanded 
}) {
   const { isDark } = useTheme();
   
  const [expandedSections, setExpandedSections] = useState({
    admissions: false,
    students: false,
    teachers: false,
    academics: false,
    finance: false,
    reports: false,
    settings: false
  });
  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      href: '/admindashboard',
      active: true
    },
    {
      id: 'admissions',
      label: 'Admission Management',
      icon: UserPlus,
      expandable: true,
      subItems: [
        { id: 'new-admission', label: 'New Admission', icon: UserPlus, href: '/newadmission' },
        { id: 'admission-forms', label: 'Application Forms', icon: FileText, href: '/admissions/forms' },
        { id: 'pending-approvals', label: 'Pending Approvals', icon: Clock, href: '/admissions/pending' },
        { id: 'approved-students', label: 'Approved Students', icon: CheckCircle, href: '/admissions/approved' },
        { id: 'admission-criteria', label: 'Admission Criteria', icon: Target, href: '/admissions/criteria' },
        { id: 'entrance-tests', label: 'Entrance Tests', icon: Award, href: '/admissions/tests' },
        { id: 'fee-structure', label: 'Fee Structure', icon: DollarSign, href: '/admissions/fees' },
        { id: 'communication', label: 'Communication', icon: Mail, href: '/admissions/communication' }
      ]
    },
    {
      id: 'students',
      label: 'Student Management',
      icon: GraduationCap,
      expandable: true,
      subItems: [
        { id: 'all-students', label: 'All Students', icon: Users, href: '/allstudents' },
        { id: 'student-profiles', label: 'Student Profiles', icon: UserCheck, href: '/students/profiles' },
        { id: 'attendance', label: 'Attendance', icon: CheckCircle, href: '/students/attendance' },
        { id: 'student-performance', label: 'Performance', icon: TrendingUp, href: '/students/performance' },
        { id: 'disciplinary', label: 'Disciplinary Records', icon: Shield, href: '/students/disciplinary' }
      ]
    },
    {
      id: 'teachers',
      label: 'Teacher Management',
      icon: Users,
      expandable: true,
      subItems: [
        { id: 'all-teachers', label: 'All Teachers', icon: Users, href: '/allteacher' },
        { id: 'teacher-profiles', label: 'Teacher Profiles', icon: UserCheck, href: '/teachers/profiles' },
        { id: 'teacher-schedule', label: 'Teaching Schedule', icon: Calendar, href: '/teachers/schedule' },
        { id: 'performance-review', label: 'Performance Review', icon: Star, href: '/teachers/performance' },
        { id: 'payroll', label: 'Payroll', icon: DollarSign, href: '/teachers/payroll' }
      ]
    },
    {
      id: 'academics',
      label: 'Academic Management',
      icon: BookOpen,
      expandable: true,
      subItems: [
        { id: 'courses', label: 'Courses', icon: BookOpen, href: '/academics/courses' },
        { id: 'curriculum', label: 'Curriculum', icon: FileText, href: '/academics/curriculum' },
        { id: 'timetable', label: 'Timetable', icon: Calendar, href: '/academics/timetable' },
        { id: 'assessments', label: 'Assessments', icon: Award, href: '/academics/assessments' },
        { id: 'grading', label: 'Grading System', icon: Target, href: '/academics/grading' }
      ]
    },
    {
      id: 'finance',
      label: 'Financial Management',
      icon: CreditCard,
      expandable: true,
      subItems: [
        { id: 'fee-collection', label: 'Fee Collection', icon: DollarSign, href: '/finance/collection' },
        { id: 'billing', label: 'Billing', icon: FileText, href: '/finance/billing' },
        { id: 'expenses', label: 'Expenses', icon: TrendingUp, href: '/finance/expenses' },
        { id: 'financial-reports', label: 'Financial Reports', icon: PieChart, href: '/finance/reports' },
        { id: 'budget', label: 'Budget Planning', icon: Target, href: '/finance/budget' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: PieChart,
      expandable: true,
      subItems: [
        { id: 'student-reports', label: 'Student Reports', icon: GraduationCap, href: '/reports/students' },
        { id: 'teacher-reports', label: 'Teacher Reports', icon: Users, href: '/reports/teachers' },
        { id: 'financial-analytics', label: 'Financial Analytics', icon: DollarSign, href: '/reports/financial' },
        { id: 'performance-analytics', label: 'Performance Analytics', icon: Activity, href: '/reports/performance' },
        { id: 'custom-reports', label: 'Custom Reports', icon: FileText, href: '/reports/custom' }
      ]
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      expandable: true,
      subItems: [
        { id: 'general-settings', label: 'General Settings', icon: Settings, href: '/settings/general' },
        { id: 'user-management', label: 'User Management', icon: Users, href: '/settings/users' },
        { id: 'permissions', label: 'Permissions', icon: Shield, href: '/settings/permissions' },
        { id: 'backup', label: 'Backup & Recovery', icon: Database, href: '/settings/backup' },
        { id: 'help-support', label: 'Help & Support', icon: HelpCircle, href: '/settings/help' }
      ]
    }
  ];

  const renderMenuItem = (item) => {
    const isExpanded = expandedSections[item.id];
    const Icon = item.icon;

    if (item.expandable) {
      return (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => toggleSidebar && toggleSection(item.id)}
            className={`flex items-center w-full px-4 py-3 ${isSidebarExpanded ? "justify-between" : "justify-center"} ${
              isDark
                ? "text-gray-300 hover:bg-gray-700/50"
                : "text-indigo-200 hover:bg-white/10"
            } rounded-xl transition-all duration-200 group`}
          >
            <div className="flex items-center">
              <Icon size={20} className="flex-shrink-0" />
              {isSidebarExpanded && <span className="font-medium ml-3">{item.label}</span>}
            </div>
           {isSidebarExpanded && (isExpanded ? 
              <ChevronDown size={16} className="transform transition-transform flex-shrink-0 mr-10" /> : 
              <ChevronRight size={16} className="transform transition-transform flex-shrink-0" />
            )}
          </button>
          
          {/* Animated Submenu */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="ml-4 mt-1 border-l-2 border-indigo-300/20 pl-4 space-y-1">
              {item.subItems?.map((subItem) => {
                const SubIcon = subItem.icon;
                return (
                  <a
                    key={subItem.id}
                    href={subItem.href}
                    className={`flex items-center space-x-3 px-3 py-2 ${
                      isDark
                        ? "text-gray-400 hover:bg-gray-700/30 hover:text-white"
                        : "text-indigo-300 hover:bg-white/5 hover:text-white"
                    } rounded-lg transition-all duration-200 text-sm group hover:translate-x-1`}
                  >
                    <SubIcon size={16} className="group-hover:scale-110 transition-transform" />
                    <span>{subItem.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        className={`flex items-center space-x-3 px-4 py-3 mb-1 ${
          item.active
            ? isDark
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
            : isDark
            ? "text-gray-300 hover:bg-gray-700/50"
            : "text-indigo-200 hover:bg-white/10"
        } rounded-xl transition-all duration-200 hover:translate-x-2 group ${
          item.active ? "transform scale-105" : ""
        }`}
      >
        <Icon size={20} className="group-hover:scale-110 transition-transform" />
        <span className={`overflow-hidden transition-all ${isSidebarExpanded ? "w-full ml-3" : "w-0"}`}>
          {item.label}
        </span>
      </a>
    );
  };

  return (
    <div
      className={`flex h-screen ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
      } transition-all duration-500`}
    >
      {/* Sidebar */}
      <div
        className={`${isSidebarExpanded ? "w-75" : "w-25"} ${
          isDark
            ? "bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700"
            : "bg-gradient-to-b from-indigo-900 to-purple-900 shadow-2xl"
        } flex flex-col relative overflow-hidden transition-all duration-300`}
      
      >
        

      {/* --- 3. BUTTON: The new expand/collapse toggle button --- */}
        <button
            onClick={() => setIsSidebarExpanded((curr) => !curr)}
            className={`absolute -right-3 top-6 mr-1 p-1.5 rounded-full z-20 size-max transition-colors
            ${isDark ? 'text-gray-200 hover:bg-white/10' : 'hover:bg-white/10 text-gray-200' }`}
        >
            {isSidebarExpanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
        </button>


        {/* Logo Section */}
        <div
          className={`p-6 border-b ${
            isDark ? "border-gray-700" : "border-indigo-800/30"
          } relative z-10`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <img src={logo} 
              alt="logo"
              className=" object-cover mb-4 rounded-full shadow-md"
               />
            </div>
            <div className={`overflow-hidden transition-all ${isSidebarExpanded ? "w-40" : "w-0"}`}>
              <h1 className="text-xl font-bold text-white truncate">ABC School</h1>
              <p className="text-xs text-indigo-200 font-medium truncate">
                Smart Management System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 relative z-10 overflow-y-auto custom-scrollbar">
          <div className="px-4">
            {menuItems.map(renderMenuItem)}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className={`p-4 border-t ${
          isDark ? "border-gray-700" : "border-indigo-800/30"
        } relative z-10`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <UserCheck className="text-white" size={18} />
            </div>
            <div className={`flex-1 overflow-hidden transition-all ${isSidebarExpanded ? "w-full" : "w-0"}`}>
                <p className="text-sm font-semibold text-white truncate">Admin User</p>
                <p className="text-xs text-indigo-300 truncate">admin@abcschool.com</p>
            </div>
            <LogOut 
              size={16} 
              className="text-indigo-300 hover:text-white cursor-pointer transition-colors" 
            />
          </div>
          
         
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
          <style>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `}</style>
   </div>
  );
}
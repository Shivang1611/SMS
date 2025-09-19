import React from "react"
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
  HelpCircle
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom";


export function DashboardContent(){

      const { isDark } = useTheme();
      const navigator = useNavigate();
  
  return (
    <div className="h-full  overflow-y-scroll  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-2`}>
          Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin</span>
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'} text-lg`}>Here's what's happening at your school today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Total Students</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mt-1`}>2,847</p>
              <p className="text-sm text-green-500 mt-1">↗ 12% this month</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <GraduationCap className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Active Teachers</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mt-1`}>156</p>
              <p className="text-sm text-green-500 mt-1">↗ 8% this month</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Users className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Course Completion</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mt-1`}>94.2%</p>
              <p className="text-sm text-green-500 mt-1">↗ 3% this week</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>System Performance</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mt-1`}>99.8%</p>
              <p className="text-sm text-green-500 mt-1">All systems operational</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Activity className="text-white" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Add Students Card */}
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-orange-50 border-orange-200'} rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group`}>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UserPlus className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-3`}>Enroll Students</h3>
              <p className={`${isDark ? "text-gray-400" : "text-slate-600"} text-sm leading-relaxed mb-4`}>
                Streamline the student enrollment process with automated form validation, document management, and real-time status tracking.
              </p>
              <button onClick={()=>navigator('/newadmission')}
               className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Start Enrollment
              </button>
            </div>
          </div>
        </div>

        {/* Add Teachers Card */}
        <div 
        className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group`}>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-3`}>Manage Faculty</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'} text-sm leading-relaxed mb-4`}>
                Advanced teacher management with performance analytics, automated scheduling, and professional development tracking.
              </p>
              <button onClick={()=>navigator('/allteacher')}
               className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Manage Teachers
              </button>
            </div>
          </div>
        </div>

        {/* Add Courses Card */}
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group`}>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-3`}>Course Builder</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'} text-sm leading-relaxed mb-4`}>
                Create interactive courses with AI assistance, multimedia content, and real-time collaboration tools for modern education.
              </p>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Build Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content for Scrollbar Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-6`}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-4`}>Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{i}</span>
                </div>
                <div>
                  <p className={`${isDark ? 'text-white' : 'text-slate-800'} font-medium`}>Activity {i}</p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'} text-sm`}>Description for activity {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-2xl border p-6`}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'} mb-4`}>Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: 'Pending Applications', value: '45', color: 'orange' },
              { label: 'Today\'s Attendance', value: '94.2%', color: 'green' },
              { label: 'Monthly Revenue', value: '$125,000', color: 'blue' },
              { label: 'System Alerts', value: '3', color: 'red' }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className={`${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{stat.label}</span>
                <span className={`font-bold ${
                  stat.color === 'orange' ? 'text-orange-500' :
                  stat.color === 'green' ? 'text-green-500' :
                  stat.color === 'blue' ? 'text-blue-500' : 'text-red-500'
                }`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
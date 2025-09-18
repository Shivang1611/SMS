
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Sun,
  Moon,
  TrendingUp,
  Calendar,
  Award,
  Activity
} from 'lucide-react';
import logo from '../../../assets/logo.jpg';
import Sidebar from '../../../component/common/sidebar';
import Header from '../../../component/common/header';
import { DashboardContent } from '../../../component/DashboardContent';
import { useTheme } from '../../../context/ThemeContext';


export default function AdminDashboard() {
   const { isDark } = useTheme();
  const navigate = useNavigate();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  

  return (
        <>
            
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="flex-shrink-0 transition-all duration-300">
              <Sidebar 
                isSidebarExpanded={isSidebarExpanded}
                setIsSidebarExpanded={setIsSidebarExpanded}
              />
            </aside>


            
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
            
              <Header className="w-full flex items-center justify-between px-4 shadow-sm transition-all duration-300" />
            
       
              <main className={`flex-1 overflow-y-auto p-8 transition-all duration-300  hide-scrollbar ${
                isDark
                  ? "bg-gray-800 text-white"
                  : "bg-gradient-to-br from-slate-50 to-blue-50"
              }`}>
                <DashboardContent isDark={isDark} />
              </main>
            </div>
            
          </div>
        </> 
  );
}

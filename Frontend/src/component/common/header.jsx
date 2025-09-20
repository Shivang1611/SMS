 import React, { useContext, useState ,useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
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
  Activity,
  BellIcon,
  Search
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
 export default function Header() {
   const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { openSearch } = useSearch();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
  const notifications = [
    { id: 1, message: 'New assignment submitted by John Doe', time: '5 min ago', unread: true },
    { id: 2, message: 'Parent meeting scheduled for tomorrow', time: '1 hour ago', unread: true },
    { id: 3, message: 'Grade submission deadline approaching', time: '2 hours ago', unread: false },
    { id: 4, message: 'School event reminder: Sports Day next week', time: '3 hours ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
        useEffect(() => {
        // Function to handle clicks outside the component
        function handleClickOutside(event) {
          if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setShowNotifications(false); // Close the notifications
          }
        }document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [notificationRef, setShowNotifications]);

  // Handle keyboard shortcut for search (Ctrl+K or Cmd+K)
        useEffect(() => {
          const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
              e.preventDefault();
              openSearch();
            }
          };

          document.addEventListener('keydown', handleKeyDown);
          return () => document.removeEventListener('keydown', handleKeyDown);
        }, [openSearch]);

   return (
   <>
  <header className={` ${
         isDark
          ? "bg-gray-800 text-white"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
      } border-b py-4 transition-all duration-500 flex items-center justify-between px-6`}>
      
      <div className={`${
        isDark
          ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-200 border border-blue-700/30"
          : "bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-800 border border-indigo-200"
      } px-6 py-3 rounded-2xl text-sm backdrop-blur-sm`}>
        <span className="font-medium">Today:</span>{" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
         {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Global Search Button */}
          <button
            onClick={openSearch}
            className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 ${
              isDark
                ? "text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600"
                : "text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200"
            } transform hover:scale-105 min-w-[200px] justify-between`}
          >
            <div className="flex items-center space-x-2">
              <Search size={18} />
              <span className="text-sm">Search anything...</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className={`px-1.5 py-0.5 text-xs rounded border ${
                isDark ? 'border-gray-500 bg-gray-600' : 'border-gray-300 bg-white'
              }`}>
                {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
              </kbd>
              <kbd className={`px-1.5 py-0.5 text-xs rounded border ${
                isDark ? 'border-gray-500 bg-gray-600' : 'border-gray-300 bg-white'
              }`}>
                K
              </kbd>
            </div>
          </button>
        </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
          <button
          onClick={toggleTheme}
          className={`p-3 rounded-xl transition-all duration-300 ${
            isDark
              ? "text-yellow-400 bg-gray-700/50 hover:bg-gray-600/50"
              : "text-slate-600 bg-slate-100 hover:bg-slate-200"
          } transform hover:scale-110`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <BellIcon className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 ${
                        notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100 text-center">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        

        <button onClick={() => navigate("/login")}
        className={`${
          isDark
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        } text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}>
          <LogOut size={16} className="inline mr-2" />
          Sign Out
        </button>
      </div>
    </header>
      
      </>
            )
          };

import React, { useState } from "react";
import Sidebar from "../component/common/sidebar";
import Header from "../component/common/header";
import SearchModal from "../component/common/SearchModel";
import { useTheme } from "../context/ThemeContext";

export default function AdminLayout({ children }) {
  const { isDark } = useTheme();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex-shrink-0 transition-all duration-300">
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        <Header className="w-full flex items-center justify-between px-4 shadow-sm transition-all duration-300" />

        <main
          className={`flex-1 overflow-y-scroll p-8 transition-all duration-300
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            ${isDark ? "bg-gray-800 text-white" : "bg-gradient-to-br from-slate-50 to-blue-50"}`}
        >
          {children}
        </main>
      </div>

      {/* Global search modal */}
      <SearchModal />
    </div>
  );
}

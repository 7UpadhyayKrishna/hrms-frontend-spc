import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserPlus,
  Search,
  X,
  FileText,
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  // 🚨 PERMANENT ROLE FIX 🚨
  // Normalize admin role to company_admin (should be fixed in AuthContext, but double-check here)
  let normalizedUser = user;
  if (user && user.role === 'admin' && (user.email?.includes('admin') || user.email?.includes('@spc') || user.email?.includes('@company'))) {
    console.log('🚨 SIDEBAR: Detected wrong role, should be fixed in AuthContext');
    normalizedUser = { ...user, role: 'company_admin' };
    // Update localStorage if not already fixed
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.role === 'admin') {
      localStorage.setItem('user', JSON.stringify(normalizedUser));
    }
  }
  
  // Use normalized user for all checks
  const effectiveUser = normalizedUser || user;

  const isAdmin = effectiveUser?.role === 'admin' || effectiveUser?.role === 'company_admin';
  const isHR = effectiveUser?.role === 'hr' || effectiveUser?.role === 'company_admin';

  const isActive = (path) => location.pathname === path;

  const hrMenuItems = [
    {
      key: 'jobdesk',
      label: 'Job Desk',
      icon: Briefcase,
      path: '/job-desk'
    },
    {
      key: 'onboarding',
      label: 'Onboarding',
      icon: UserPlus,
      path: '/employees/onboarding'
    },
    {
      key: 'candidate-pool',
      label: 'Candidate Pool',
      icon: Users,
      path: '/employee/hr/candidate-pool'
    },
    {
      key: 'resume-parser',
      label: 'Resume Parser',
      icon: FileText,
      path: '/employee/hr/resume-parser'
    },
    {
      key: 'resume-search',
      label: 'Resume Search',
      icon: Search,
      path: '/employee/hr/resume-search'
    }
  ];

  const adminMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      key: 'candidates',
      label: 'Candidates',
      icon: Users,
      path: '/candidates'
    }
  ];

  // 🚨 COMPREHENSIVE SIDEBAR DEBUGGING 🚨
  const debugInfo = {
    timestamp: new Date().toISOString(),
    user: effectiveUser,
    userRole: effectiveUser?.role,
    userEmail: effectiveUser?.email,
    isAdmin,
    isHR,
    isAuthenticated: !!effectiveUser,
    localStorageUser: JSON.parse(localStorage.getItem('user') || 'null'),
    localStorageToken: !!localStorage.getItem('token'),
    localStorageUserRole: JSON.parse(localStorage.getItem('user') || '{}')?.role,
    adminMenuItemsCount: adminMenuItems.length,
    hrMenuItemsCount: hrMenuItems.length,
    menuType: effectiveUser?.role === 'company_admin' ? 'ADMIN_PLUS_HR_FULL' : isHR ? 'HR_ONLY' : isAdmin ? 'ADMIN_ONLY' : 'NO_ACCESS',
    currentPath: location.pathname
  };

  console.log('🚨 SIDEBAR DEBUG START 🚨');
  console.table(debugInfo);
  console.log('Admin menu items:', adminMenuItems.map(item => `${item.key}: ${item.label}`));
  console.log('HR menu items:', hrMenuItems.map(item => `${item.key}: ${item.label}`));

  let menuItems = [];
  if (effectiveUser?.role === 'company_admin') {
    console.log('✅ CONDITION MET: effectiveUser?.role === "company_admin"');
    menuItems = [
      ...adminMenuItems,
      {
        key: 'hr-management',
        label: 'HR Management',
        icon: Users,
        path: '/hr-management'
      },
      {
        key: 'onboarding',
        label: 'Onboarding (View)',
        icon: UserPlus,
        path: '/employees/onboarding'
      }
    ];
    console.log('📋 Company Admin final menu items:', menuItems.map(item => `${item.key}: ${item.label}`));
  } else if (isHR) {
    console.log('👥 CONDITION MET: isHR = true');
    menuItems = hrMenuItems;
  } else if (isAdmin) {
    console.log('🛡️ CONDITION MET: isAdmin = true');
    menuItems = adminMenuItems;
  } else {
    console.log('❌ NO CONDITION MET - showing empty menu');
    menuItems = [];
  }

  console.log('🎯 FINAL RESULT:', {
    menuItemsCount: menuItems.length,
    menuItems: menuItems.map(item => item.label),
    expectedForCompanyAdmin: ['Dashboard', 'Candidates', 'HR Management', 'Onboarding (View)']
  });
  console.log('🚨 SIDEBAR DEBUG END 🚨');

  // Log everything for debugging
  console.log('🔍 SIDEBAR DEBUG:', {
    userRole: effectiveUser?.role,
    user: effectiveUser,
    isAdmin,
    isHR,
    menuItemsCount: menuItems.length,
    menuItems: menuItems.map(item => ({ key: item.key, label: item.label, path: item.path }))
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen theme-surface border-r theme-border z-50 transition-transform duration-300 overflow-y-auto overflow-x-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        {/* Logo */}
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b theme-border theme-surface"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-center w-full py-2">
            <span className="text-4xl font-black font-sans bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
              HRMS
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* DEBUG INFO - Remove in production */}
        <div className="mx-3 mb-4 p-3 bg-red-600 text-white text-xs font-mono rounded-lg border border-red-700">
          <div className="font-bold mb-2">🔧 DEBUG MODE</div>
          <div>Role: {effectiveUser?.role || 'none'}</div>
          <div>Email: {effectiveUser?.email || 'none'}</div>
          <div>Menu Items: {menuItems.length}</div>
          <div>Path: {location.pathname}</div>
          <div className="mt-2 text-xs opacity-75">
            Expected for company_admin: 4 items
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          {menuItems.map((item) => (
            <div key={item.key} className="mb-1">
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                  ? 'sidebar-menu-item active' 
                  : 'sidebar-menu-item'}`}
                onMouseEnter={(e) => e.currentTarget.classList.add('hover:bg-gray-800', 'hover:text-white')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-gray-800', 'hover:text-white')}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

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
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin' || user?.role === 'company_admin';
  const isHR = user?.role === 'hr' || user?.role === 'company_admin';

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

  // Company admin gets access to admin features + selected HR features (view-only for some)
  console.log('🔍 SIDEBAR DEBUG:', {
    userRole: user?.role,
    isAdmin,
    isHR,
    menuType: user?.role === 'company_admin' ? 'ADMIN_PLUS_VIEW_HR' : isHR ? 'HR_ONLY' : isAdmin ? 'ADMIN_ONLY' : 'NO_ACCESS'
  });

  let menuItems = [];
  if (user?.role === 'company_admin') {
    // Admin gets admin menu + HR management features
    menuItems = [
      ...adminMenuItems,
      {
        key: 'hr-management',
        label: 'HR Management',
        icon: Users,
        path: '/admin/hr-management'
      },
      {
        key: 'onboarding',
        label: 'Onboarding (View)',
        icon: UserPlus,
        path: '/employees/onboarding'
      }
    ];
  } else if (isHR) {
    menuItems = hrMenuItems;
  } else if (isAdmin) {
    menuItems = adminMenuItems;
  }

  // Log everything for debugging
  console.log('🔍 SIDEBAR DEBUG:', {
    userRole: user?.role,
    user: user,
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

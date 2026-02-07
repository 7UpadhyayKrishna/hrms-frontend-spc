import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SPCProtectedRoute from '../components/SPC/SPCProtectedRoute';
import ProjectDashboard from '../components/SPC/ProjectDashboard';
import ManagerDashboard from '../components/SPC/ManagerDashboard';
import HRDashboard from '../components/SPC/HRDashboard';
import EmployeeDashboard from '../components/SPC/EmployeeDashboard';
import { message } from 'antd';

// Role constants
const ROLES = {
  COMPANY_ADMIN: 'company_admin',
  MANAGER: 'manager',
  HR: 'hr',
  EMPLOYEE: 'employee'
};

const SPCRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      const response = await fetch('/api/spc/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUserProjects(data.data.projects || []);
          
          // Update user context with project assignment info
          if (user) {
            user.hasProjectAssignment = data.data.projects.length > 0;
            user.projects = data.data.projects;
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch user projects:', error);
      message.error('Failed to load project information');
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{ fontSize: '18px', marginBottom: '16px' }}>Loading SPC System...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Setting up your project workspace</div>
      </div>
    );
  }

  // Redirect based on user role
  const getRoleBasedRoute = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case ROLES.COMPANY_ADMIN:
        return '/spc/admin';
      case ROLES.MANAGER:
        return '/spc/manager';
      case ROLES.HR:
        return '/spc/hr';
      case ROLES.EMPLOYEE:
        return '/spc/employee';
      default:
        return '/dashboard'; // Fallback to main dashboard
    }
  };

  return (
    <Routes>
      {/* Default redirect based on role */}
      <Route path="/spc" element={<Navigate to={getRoleBasedRoute()} replace />} />
      
      {/* Admin Routes */}
      <Route 
        path="/spc/admin" 
        element={
          <SPCProtectedRoute allowedRoles={[ROLES.COMPANY_ADMIN]}>
            <ProjectDashboard userRole={user?.role} />
          </SPCProtectedRoute>
        } 
      />
      
      {/* Manager Routes */}
      <Route 
        path="/spc/manager" 
        element={
          <SPCProtectedRoute 
            allowedRoles={[ROLES.MANAGER]} 
            requireProject={true}
          >
            <ManagerDashboard user={user} />
          </SPCProtectedRoute>
        } 
      />
      
      {/* HR Routes */}
      <Route 
        path="/spc/hr" 
        element={
          <SPCProtectedRoute 
            allowedRoles={[ROLES.HR]} 
            requireProject={false}
          >
            <HRDashboard user={user} />
          </SPCProtectedRoute>
        } 
      />
      
      {/* Employee Routes */}
      <Route 
        path="/spc/employee" 
        element={
          <SPCProtectedRoute 
            allowedRoles={[ROLES.EMPLOYEE]} 
            requireProject={true}
          >
            <EmployeeDashboard user={user} />
          </SPCProtectedRoute>
        } 
      />
      
      {/* Project-specific routes */}
      <Route 
        path="/spc/projects/:projectId" 
        element={
          <SPCProtectedRoute 
            allowedRoles={[ROLES.COMPANY_ADMIN, ROLES.MANAGER, ROLES.HR]} 
            requireProject={true}
          >
            {/* Project details component would go here */}
            <div>Project Details</div>
          </SPCProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route 
        path="/spc/*" 
        element={<Navigate to={getRoleBasedRoute()} replace />} 
      />
    </Routes>
  );
};

export default SPCRoutes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { Toaster } from 'react-hot-toast';
import HomeRedirect from './components/HomeRedirect';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import EmployeeDashboardLayout from './layouts/EmployeeDashboardLayout';

// Auth Pages
import LoginLanding from './pages/LoginLanding';
import CompanySelect from './pages/CompanySelect';
import CompanyLogin from './pages/CompanyLogin';
import SPCManagementLogin from './pages/SPCManagementLogin';

// Public Pages
import CareersPage from './pages/Public/CareersPage';
import CandidateDocuments from './pages/CandidateDocuments';
import DocumentUpload from './pages/Public/DocumentUpload';
import Unauthorized from './pages/Unauthorized';

// Admin Pages
import Dashboard from './pages/Dashboard';
import CandidateList from './pages/Candidates/CandidateList';
import HRManagement from './pages/Admin/HRManagement';
import PendingApprovals from './pages/ApprovalWorkflow/PendingApprovals';

// HR Pages
import JobDesk from './pages/JobDesk';
import ViewApplicants from './pages/ViewApplicants';
import CandidateTimeline from './pages/CandidateTimeline';
import Onboarding from './pages/Employee/Onboarding';
import Offboarding from './pages/Employee/Offboarding';
import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeAdd from './pages/Employee/EmployeeAdd';
import EmployeeEdit from './pages/Employee/EmployeeEdit';
import EmployeeDetail from './pages/Employee/EmployeeDetail';
import EmployeeProfile from './pages/Employee/EmployeeProfile';
import BulkEmployeeUpload from './pages/Employee/BulkEmployeeUpload';
import ResumeSearch from './pages/HRDashboard/ResumeSearch';
import ResumeParser from './pages/HRDashboard/ResumeParser';
import HRCandidatePool from './pages/HRDashboard/HRCandidatePool';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#f1f5f9',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f1f5f9',
                },
              },
            }}
          />
          <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginLanding />} />
          <Route path="/login/company-select" element={<CompanySelect />} />
          <Route path="/login/spc-management" element={<SPCManagementLogin />} />
          <Route path="/login/:companySlug" element={<CompanyLogin />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/jobs" element={<CareersPage />} />
          <Route path="/candidate-documents" element={<CandidateDocuments />} />
          <Route path="/public/upload-documents/:token" element={<DocumentUpload />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Block SuperAdmin routes - Not available in SPC demo */}
          <Route path="/super-admin/*" element={<Navigate to="/unauthorized" replace />} />
          
          {/* Root redirect based on role */}
          <Route path="/" element={<HomeRedirect />} />

          {/* Admin Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute roles={['admin', 'company_admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="candidates" element={<CandidateList />} />
            <Route path="hr-management" element={<HRManagement />} />
            <Route path="approvals/pending" element={<PendingApprovals />} />
          </Route>

          {/* HR Routes */}
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute roles={['hr', 'company_admin']}>
                <EmployeeDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="hr/candidate-pool" element={<HRCandidatePool />} />
            <Route path="hr/resume-search" element={<ResumeSearch />} />
            <Route path="hr/resume-parser" element={<ResumeParser />} />
          </Route>

          <Route
            path="/job-desk/*"
            element={
              <ProtectedRoute roles={['hr', 'company_admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<JobDesk />} />
            <Route path=":jobId/applicants" element={<ViewApplicants />} />
          </Route>

          <Route
            path="/candidates/*"
            element={
              <ProtectedRoute roles={['hr', 'company_admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path=":candidateId/timeline" element={<CandidateTimeline />} />
          </Route>

          <Route
            path="/employees/*"
            element={
              <ProtectedRoute roles={['hr', 'company_admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeList />} />
            <Route path="add" element={<EmployeeAdd />} />
            <Route path="bulk-upload" element={<BulkEmployeeUpload />} />
            <Route path=":id/edit" element={<EmployeeEdit />} />
            <Route path=":id" element={<EmployeeDetail />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="offboarding" element={<Offboarding />} />
          </Route>
          </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

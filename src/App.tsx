/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeModeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { LeaveProvider } from './contexts/LeaveContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './types';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffDirectory from './pages/StaffDirectory';
import ShiftRoster from './pages/ShiftRoster';
import StaffSchedule from './pages/staff/StaffSchedule';
import AddEmployee from './pages/AddEmployee';
import Departments from './pages/Departments';
import Attendance from './pages/Attendance';
import AttendanceAutomation from './pages/AttendanceAutomation';
import StaffAttendance from './pages/staff/StaffAttendance';
import Payroll from './pages/Payroll';
import StaffPayroll from './pages/staff/StaffPayroll';
import PayrollAdjustments from './pages/PayrollAdjustments';
import Settings from './pages/Settings';
import AccessControl from './pages/AccessControl';
import LeaveManagement from './pages/staff/LeaveManagement';
import StaffProfile from './pages/staff/StaffProfile';
import Compliance from './pages/Compliance';
import { useAuth } from './contexts/AuthContext';

function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === UserRole.STAFF) return <StaffDashboard />;
  return <Dashboard />;
}

function PayrollRouter() {
  const { user } = useAuth();
  if (user?.role === UserRole.STAFF) return <StaffPayroll />;
  return <Payroll />;
}

function ScheduleRouter() {
  const { user } = useAuth();
  if (user?.role === UserRole.STAFF) return <StaffSchedule />;
  return <ShiftRoster />;
}

function AttendanceRouter() {
  const { user } = useAuth();
  if (user?.role === UserRole.STAFF) return <StaffAttendance />;
  return <Attendance />;
}

export default function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <AuthProvider>
        <LeaveProvider>
          <NotificationProvider>
            <LanguageProvider>
              <BrowserRouter>
                <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<DashboardRouter />} />
                  
                  {/* HR and Admin only */}
                  <Route path="staff" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN, UserRole.HR_MANAGER]}>
                      <StaffDirectory />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="staff/add" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN, UserRole.HR_MANAGER]}>
                      <AddEmployee />
                    </ProtectedRoute>
                  } />
  
                  {/* Super Admin only */}
                  <Route path="departments" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
                      <Departments />
                    </ProtectedRoute>
                  } />
  
                  <Route path="settings" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
                      <Settings />
                    </ProtectedRoute>
                  } />
  
                  <Route path="access-control" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
                      <AccessControl />
                    </ProtectedRoute>
                  } />
  
                  {/* Common routes with internal role-based filtering */}
                  <Route path="roster" element={<ScheduleRouter />} />
                  <Route path="attendance" element={<AttendanceRouter />} />
                  <Route path="attendance/automation" element={<AttendanceAutomation />} />
                  <Route path="payroll" element={<PayrollRouter />} />
                  <Route path="payroll/adjustments" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN, UserRole.HR_MANAGER]}>
                      <PayrollAdjustments />
                    </ProtectedRoute>
                  } />
                  <Route path="compliance" element={<Compliance />} />
  
                  {/* Staff Specific Routes */}
                  <Route path="leave" element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF]}>
                      <LeaveManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="profile" element={<StaffProfile />} />
                </Route>
              </Routes>
            </BrowserRouter>
            </LanguageProvider>
          </NotificationProvider>
        </LeaveProvider>
    </AuthProvider>
    </ThemeModeProvider>
  );
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  DEPT_HEAD = 'DEPT_HEAD',
  STAFF = 'STAFF'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string; // For DEPT_HEAD and STAFF
  avatar?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.SUPER_ADMIN]: ['all'],
  [UserRole.HR_MANAGER]: [
    'view_dashboard',
    'manage_staff',
    'view_staff',
    'manage_schedules',
    'view_attendance',
    'manage_payroll',
    'view_payroll'
  ],
  [UserRole.DEPT_HEAD]: [
    'view_dashboard',
    'view_dept_staff',
    'manage_dept_schedules',
    'approve_leaves'
  ],
  [UserRole.STAFF]: [
    'view_personal_schedule',
    'request_leave',
    'view_personal_payroll'
  ]
};

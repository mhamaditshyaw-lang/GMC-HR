import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.SUPER_ADMIN]: {
    id: '1',
    name: 'Alex Rivera',
    email: 'admin@medicore.com',
    role: UserRole.SUPER_ADMIN,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9y7evbRG9tVWPoi7S7zwVW51A06Zao1MJIbU1l655XcK-J-cAPO1PWpj6EvqMB7tTAZ5S0hgA0yZfuIy_ARownrlKndSUNcQMerpqV-WeNksg0CXYFZ-ISq0znQbNrCUytV4Qc8V9CiBKzzR2hRAHjUz_5KnThE9By1qLdRUMjhKPrnkigznGlQJfjFxXWS6tAMScOgNy0m8nRPTXHLOEtByi5y2HZwi_fG6r54rGcrrRRbNAkZJXUVGQ74w8SfoakHk8LViDIbE'
  },
  [UserRole.HR_MANAGER]: {
    id: '2',
    name: 'Sarah Jenkins',
    email: 'sarah.hr@medicore.com',
    role: UserRole.HR_MANAGER,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8'
  },
  [UserRole.DEPT_HEAD]: {
    id: '3',
    name: 'Dr. James Lee',
    email: 'james.lee@medicore.com',
    role: UserRole.DEPT_HEAD,
    departmentId: 'cardiology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q'
  },
  [UserRole.STAFF]: {
    id: '4',
    name: 'Mark Wilson',
    email: 'mark.wilson@medicore.com',
    role: UserRole.STAFF,
    departmentId: 'emergency',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with no user logged in
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

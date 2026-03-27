import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LeaveRequest {
  id: number;
  employeeName: string;
  type: string;
  start: string;
  end: string;
  status: 'Pending Head' | 'Pending HR' | 'Approved' | 'Rejected';
  reason: string;
}

interface LeaveContextType {
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status' | 'employeeName'>) => void;
  updateLeaveStatus: (id: number, status: 'Pending HR' | 'Approved' | 'Rejected') => void;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export function LeaveProvider({ children }: { children: ReactNode }) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, employeeName: 'Sarah Jenkins', type: 'Annual', start: '2026-03-10', end: '2026-03-15', status: 'Approved', reason: 'Family Vacation' },
    { id: 2, employeeName: 'Sarah Jenkins', type: 'Sick', start: '2026-02-01', end: '2026-02-02', status: 'Approved', reason: 'Flu' },
    { id: 3, employeeName: 'Sarah Jenkins', type: 'Annual', start: '2026-04-20', end: '2026-04-22', status: 'Pending Head', reason: 'Personal' },
    { id: 4, employeeName: 'Mark Wilson', type: 'Sick', start: '2026-03-05', end: '2026-03-06', status: 'Pending HR', reason: 'Medical appointment' },
  ]);

  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'status' | 'employeeName'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now(),
      status: 'Pending Head',
      employeeName: 'Sarah Jenkins', // Mocking current logged-in user
    };
    setLeaveRequests([newRequest, ...leaveRequests]);
  };

  const updateLeaveStatus = (id: number, status: 'Pending HR' | 'Approved' | 'Rejected') => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status } : req)
    );
  };

  return (
    <LeaveContext.Provider value={{ leaveRequests, addLeaveRequest, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
}

export function useLeave() {
  const context = useContext(LeaveContext);
  if (context === undefined) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
}

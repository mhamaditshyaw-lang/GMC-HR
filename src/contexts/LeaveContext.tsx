import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api/client';

export interface LeaveRequest {
  id: number;
  employee_id?: number;
  employeeName: string;
  employee_name?: string;
  type: string;
  leave_type?: string;
  start: string;
  end: string;
  start_date?: string;
  end_date?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  avatar?: string;
}

interface LeaveContextType {
  leaveRequests: LeaveRequest[];
  loading: boolean;
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status' | 'employeeName'>) => Promise<void>;
  updateLeaveStatus: (id: number, status: 'Approved' | 'Rejected') => Promise<void>;
  refresh: () => Promise<void>;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

function normalize(r: any): LeaveRequest {
  return {
    ...r,
    employeeName: r.employee_name || r.employeeName || '',
    type: r.leave_type || r.type || '',
    start: (r.start_date || r.start || '').split('T')[0],
    end: (r.end_date || r.end || '').split('T')[0],
  };
}

export function LeaveProvider({ children }: { children: ReactNode }) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await api.leave.list();
      setLeaveRequests(data.map(normalize));
    } catch (err) {
      console.error('Failed to load leave requests, using empty list', err);
      setLeaveRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const addLeaveRequest = async (request: any) => {
    try {
      await api.leave.create({
        employee_id: request.employee_id || 1,
        employee_name: 'Sarah Jenkins',
        leave_type: request.leave_type || request.type,
        start_date: (request.start_date || request.start || '').split('T')[0],
        end_date: (request.end_date || request.end || '').split('T')[0],
        reason: request.reason,
      });
      await refresh();
    } catch (err) {
      console.error('Failed to add leave request', err);
    }
  };

  const updateLeaveStatus = async (id: number, status: 'Approved' | 'Rejected') => {
    try {
      await api.leave.updateStatus(id, status);
      setLeaveRequests(prev =>
        prev.map(req => req.id === id ? { ...req, status } : req)
      );
    } catch (err) {
      console.error('Failed to update leave status', err);
    }
  };

  return (
    <LeaveContext.Provider value={{ leaveRequests, loading, addLeaveRequest, updateLeaveStatus, refresh }}>
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

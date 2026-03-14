const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  departments: {
    list: () => request<any[]>('/departments'),
    create: (data: any) => request<any>('/departments', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => request<any>(`/departments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: number) => request<any>(`/departments/${id}`, { method: 'DELETE' }),
  },
  employees: {
    list: (params?: { department_id?: number; status?: string; search?: string }) => {
      const q = new URLSearchParams(params as any).toString();
      return request<any[]>(`/employees${q ? `?${q}` : ''}`);
    },
    get: (id: number) => request<any>(`/employees/${id}`),
    create: (data: any) => request<any>('/employees', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => request<any>(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: number) => request<any>(`/employees/${id}`, { method: 'DELETE' }),
  },
  attendance: {
    list: (params?: { employee_id?: number; status?: string; date?: string }) => {
      const q = new URLSearchParams(params as any).toString();
      return request<any[]>(`/attendance${q ? `?${q}` : ''}`);
    },
    create: (data: any) => request<any>('/attendance', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => request<any>(`/attendance/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    stats: () => request<any>('/attendance/stats'),
  },
  leave: {
    list: (params?: { employee_id?: number; status?: string }) => {
      const q = new URLSearchParams(params as any).toString();
      return request<any[]>(`/leave${q ? `?${q}` : ''}`);
    },
    create: (data: any) => request<any>('/leave', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: number, status: string) =>
      request<any>(`/leave/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    remove: (id: number) => request<any>(`/leave/${id}`, { method: 'DELETE' }),
  },
  payroll: {
    list: (params?: { month?: string; employee_id?: number; status?: string }) => {
      const q = new URLSearchParams(params as any).toString();
      return request<any[]>(`/payroll${q ? `?${q}` : ''}`);
    },
    create: (data: any) => request<any>('/payroll', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => request<any>(`/payroll/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    adjustments: {
      list: (employee_id?: number) => {
        const q = employee_id ? `?employee_id=${employee_id}` : '';
        return request<any[]>(`/payroll/adjustments${q}`);
      },
      create: (data: any) => request<any>('/payroll/adjustments', { method: 'POST', body: JSON.stringify(data) }),
      remove: (id: number) => request<any>(`/payroll/adjustments/${id}`, { method: 'DELETE' }),
    },
  },
  dashboard: {
    stats: () => request<any>('/dashboard/stats'),
  },
};

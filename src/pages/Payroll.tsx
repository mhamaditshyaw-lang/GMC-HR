import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  CheckCircle2, ChevronRight, ChevronLeft, FileText, DollarSign, 
  X, Users, TrendingUp, AlertCircle, Download, PlayCircle,
  Building, ShieldCheck, Landmark, Settings2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Dummy Data ---
const PAYROLL_DATA = [
  { id: 'EMP-001', name: 'Dr. Sarah Jenkins', role: 'Chief of Surgery', department: 'Surgery', base: 18500, net: 14200, status: 'Ready' },
  { id: 'EMP-002', name: 'Mark Wilson', role: 'ER Nurse', department: 'Emergency', base: 7200, net: 6150, status: 'Ready' },
  { id: 'EMP-003', name: 'Dr. Emily Chen', role: 'Pediatrician', department: 'Pediatrics', base: 14000, net: 11800, status: 'Ready' },
  { id: 'EMP-004', name: 'James Rodriguez', role: 'ICU Technician', department: 'ICU', base: 6500, net: 5400, status: 'Review Needed' },
  { id: 'EMP-005', name: 'Anita Patel', role: 'Anesthesiologist', department: 'Surgery', base: 16000, net: 12900, status: 'Ready' },
];

const DEPARTMENTS = ['All', 'Surgery', 'Emergency', 'Pediatrics', 'ICU'];

const CHART_DATA = [
  { name: 'Total Earnings', value: 845000, color: '#10b981' }, // Emerald 500
  { name: 'Total Deductions', value: 215000, color: '#ef4444' }  // Red 500
];

// --- Components ---

const PayslipSlideOver = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t, isRTL } = useLanguage();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: isRTL ? '-100%' : '100%' }} animate={{ x: 0 }} exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto border-slate-200 flex flex-col`}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 sticky top-0 z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{t('payrollRunPreview')}</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">March 2026 • 142 {t('employee')}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1">
              {/* Donut Chart Section */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">{t('earningsVsDeductions')}</h3>
                <div className="h-[200px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CHART_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {CHART_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-slate-500 font-medium">{t('netPay')}</span>
                    <span className="text-lg font-bold text-slate-900">$630K</span>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-2">
                  {CHART_DATA.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-medium text-slate-600">{item.name === 'Total Earnings' ? t('totalEarnings') : t('totalDeductions')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-800">{t('runBreakdown')}</h3>
                
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">{t('baseSalaries')}</span>
                    <span className="text-sm font-semibold text-slate-900">$720,000.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">{t('overtimeAndOnCall')}</span>
                    <span className="text-sm font-semibold text-slate-900">$85,000.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                    <span className="text-sm text-slate-600">{t('allowances')}</span>
                    <span className="text-sm font-semibold text-slate-900">$40,000.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                    <span className="text-sm text-slate-600">{t('taxes')}</span>
                    <span className="text-sm font-semibold text-red-600">-$125,000.00</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-slate-900">{t('totalNetPayout')}</span>
                    <span className="text-lg font-bold text-emerald-600">$630,000.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-white sticky bottom-0">
              <button 
                onClick={() => {
                  alert(t('payrollProcessedSuccess') || 'Payroll processed successfully');
                  onClose();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                {t('submitForHRApproval')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Page Component ---
export default function Payroll() {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = PAYROLL_DATA.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const totalNetPayout = filteredData.reduce((sum, emp) => sum + emp.net, 0);
  const totalEmployees = filteredData.length;
  const processedEmployees = filteredData.filter(emp => emp.status === 'Ready').length;
  const requiresReview = filteredData.filter(emp => emp.status === 'Review Needed').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('payrollDashboard')}</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">{t('managePayroll')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/payroll/adjustments')}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Settings2 className="w-4 h-4" />
            {t('adjustments')}
          </button>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            {t('exportReport')}
          </button>
          <button 
            onClick={() => setIsSlideOverOpen(true)}
            className="px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
          >
            <PlayCircle className="w-4 h-4" />
            {t('processCurrentMonth')}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2.4%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">{t('estimatedNetPayout')}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">${totalNetPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">{t('processedEmployees')}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{processedEmployees} <span className="text-sm font-medium text-slate-400">/ {totalEmployees}</span></h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">{t('requiresReview')}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{requiresReview} <span className="text-sm font-medium text-slate-400">{t('staffMembers')}</span></h3>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/50 gap-4">
          <h3 className="text-base font-bold text-slate-900">{t('employeePayrollRoster')}</h3>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={`py-2 px-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-full sm:w-40`}
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept === 'All' ? t('allDepartments') || 'All Departments' : dept}</option>
              ))}
            </select>
            <div className="relative w-full sm:w-auto">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchEmployees')} 
                className={`py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 ${isRTL ? 'pr-3 pl-10' : 'pl-3 pr-10'}`}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('employee')}</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('department')}</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('baseSalary')}</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('netPay')}</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('status')}</th>
                <th className={`px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider ${isRTL ? 'text-left' : 'text-right'}`}>{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{emp.name}</span>
                      <span className="text-xs font-medium text-slate-500">{emp.id} • {emp.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">{emp.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">${emp.base.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">${emp.net.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      emp.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {emp.status === 'Ready' ? t('ready') : t('reviewNeeded')}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <button 
                      onClick={() => navigate('/payroll/adjustments')}
                      className={`text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1 ${isRTL ? 'mr-auto' : 'ml-auto justify-end'}`}
                    >
                      {t('view')} {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PayslipSlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
    </div>
  );
}

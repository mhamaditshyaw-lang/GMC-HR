import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Clock, ShieldAlert, Car, Building, 
  CreditCard, BriefcaseMedical, Landmark, Activity,
  FileText, Download, ChevronRight, HeartPulse, PiggyBank,
  CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// --- Dummy Data ---
const EMPLOYEE_DATA = {
  id: 'EMP-001',
  name: 'Dr. Sarah Jenkins',
  role: 'Chief of Surgery',
  department: 'Surgery',
  baseSalary: 18500,
  netPay: 14200,
  month: 'March 2026',
  
  // Overtime & On-Call
  extraHours: 12,
  onCallShifts: 3,
  overtimeRate: '1.5x',
  overtimeTotal: 1200,
  
  // Allowances
  allowances: {
    nightShift: 450,
    hazardRisk: 800,
    transport: 250,
    total: 1500
  },
  
  // Deductions (Strictly Tax, Health, 401k)
  deductions: {
    tax: 4500,
    healthInsurance: 600,
    retirement401k: 900,
    total: 6000
  },
  
  // Salary Advances
  advances: {
    active: true,
    totalRemaining: 2400,
    currentEmi: 400,
    progressPercent: 60 // 60% paid off
  },
  
  // Payment Details
  paymentMethod: {
    bankName: 'Chase Bank',
    iban: 'US44 CHAS **** **** **** 1234',
    accountMask: '**** 1234'
  }
};

// --- Sub-Components ---

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }: any) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between h-full">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass.bg}`}>
        <Icon className={`w-6 h-6 ${colorClass.text}`} />
      </div>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">${value.toLocaleString()}</h3>
      {subtitle && <p className="text-xs font-medium text-slate-400 mt-2">{subtitle}</p>}
    </div>
  </div>
);

export default function StaffPayroll() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const data = EMPLOYEE_DATA;

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('payrollProfile')}</h1>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md border border-blue-200 uppercase tracking-wider">
              {data.month}
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            {data.name} • {data.role} ({data.department})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            {t('downloadPayslip')}
          </button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title={t('netPay')} 
          value={data.netPay} 
          icon={DollarSign} 
          colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
          subtitle={t('takeHomeAmount')}
        />
        <StatCard 
          title={t('grossBaseSalary')} 
          value={data.baseSalary} 
          icon={Building} 
          colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
          subtitle={t('standardMonthlyCompensation')}
        />
        <StatCard 
          title={t('totalDeductions')} 
          value={data.deductions.total} 
          icon={Activity} 
          colorClass={{ bg: 'bg-red-50', text: 'text-red-600' }}
          subtitle={t('taxHealthRetirement')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Overtime & On-Call Pay Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('overtimeAndOnCall')}</h3>
            </div>
            <span className="text-lg font-bold text-amber-600">+${data.overtimeTotal.toLocaleString()}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-500">{t('totalExtraHours')}</span>
              <span className="text-sm font-bold text-slate-900">{data.extraHours} hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-500">{t('onCallShifts')}</span>
              <span className="text-sm font-bold text-slate-900">{data.onCallShifts} shifts</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-sm font-medium text-slate-500">{t('calculatedRate')}</span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md border border-slate-200">
                {data.overtimeRate}
              </span>
            </div>
          </div>
        </div>

        {/* Allowances Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BriefcaseMedical className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('hospitalAllowances')}</h3>
            </div>
            <span className="text-lg font-bold text-indigo-600">+${data.allowances.total.toLocaleString()}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-sm font-medium text-slate-600">{t('nightShiftAllowance')}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">${data.allowances.nightShift.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span className="text-sm font-medium text-slate-600">{t('hazardRiskAllowance')}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">${data.allowances.hazardRisk.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-sm font-medium text-slate-600">{t('transportAllowance')}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">${data.allowances.transport.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deductions (Strictly Standard Items) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('deductions')}</h3>
            </div>
            <span className="text-lg font-bold text-red-600">-${data.deductions.total.toLocaleString()}</span>
          </div>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Landmark className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">{t('federalStateTax')}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">${data.deductions.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <HeartPulse className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">{t('healthInsurance')}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">${data.deductions.healthInsurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <PiggyBank className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">{t('retirement401k')}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">${data.deductions.retirement401k.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Salary Advances & Loans Tracking */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('salaryAdvances')}</h3>
            </div>
          </div>
          
          {data.advances.active ? (
            <div className="space-y-5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">{t('remainingBalance')}</p>
                  <p className="text-2xl font-bold text-slate-900">${data.advances.totalRemaining.toLocaleString()}</p>
                </div>
                <div className={`text-${isRTL ? 'left' : 'right'}`}>
                  <p className="text-xs font-medium text-slate-500 mb-1">{t('currentMonthEMI')}</p>
                  <p className="text-sm font-bold text-red-600">-${data.advances.currentEmi.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
                  <span>{t('repaymentProgress')}</span>
                  <span>{data.advances.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${data.advances.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
              <p className="text-sm font-medium text-slate-600">{t('noActiveAdvances')}</p>
            </div>
          )}
        </div>

        {/* Payment Method Details */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('paymentMethod')}</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> {t('verified')}
            </span>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden shadow-md">
            {/* Decorative background circles */}
            <div className={`absolute ${isRTL ? '-left-4' : '-right-4'} -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none`} />
            <div className={`absolute ${isRTL ? '-right-4' : '-left-4'} -bottom-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none`} />
            
            <div className="relative z-10">
              <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">{t('directDeposit')}</p>
              <p className="text-lg font-bold text-white mb-6">{data.paymentMethod.bankName}</p>
              
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">{t('accountNumber')}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono tracking-widest text-slate-200">{data.paymentMethod.accountMask}</p>
                  <Landmark className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Divider, SelectChangeEvent } from '@mui/material';
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar, Edit, Trash2, X, Save, History, User, ArrowRight } from 'lucide-react';

// Mock Data (Initial State)
const initialEmployees = [
  { id: 1, name: 'Dr. Sarah Jenkins', role: 'Senior Cardiologist', department: 'Cardiology', baseSalary: '$185,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8' },
  { id: 2, name: 'Dr. Emily Chen', role: 'Senior Resident', department: 'Cardiology', baseSalary: '$110,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ' },
  { id: 3, name: 'Mark Wilson', role: 'Registered Nurse', department: 'Nursing', baseSalary: '$75,000', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws' },
];

const departments = ['All Departments', 'Cardiology', 'Nursing', 'Pediatrics', 'Surgery'];

const initialBonuses = [
  { id: 1, employeeId: 1, type: 'Performance', amount: '$1,200', date: '2024-03-15', status: 'Approved' },
  { id: 2, employeeId: 2, type: 'Overtime', amount: '$500', date: '2024-03-10', status: 'Pending' },
  { id: 3, employeeId: 1, type: 'Holiday Bonus', amount: '$5,000', date: '2023-12-20', status: 'Paid' },
];

const initialIncreases = [
  { id: 1, employeeId: 1, currentSalary: '$185,000', increase: '5%', newSalary: '$194,250', effectiveDate: '2024-01-01' },
  { id: 2, employeeId: 1, currentSalary: '$170,000', increase: '8.8%', newSalary: '$185,000', effectiveDate: '2023-01-01' },
];

const initialDeductions = [
  { id: 1, employeeId: 3, type: 'Health Insurance', amount: '$150', frequency: 'Monthly', status: 'Active' },
  { id: 2, employeeId: 2, type: 'Loan Repayment', amount: '$200', frequency: 'Monthly', status: 'Active' },
  { id: 3, employeeId: 1, type: '401k Contribution', amount: '$1,500', frequency: 'Monthly', status: 'Active' },
];

const initialPayrollHistory = [
  { id: 1, employeeId: 1, period: 'Feb 2024', base: '$15,416', bonus: '$0', deductions: '$1,500', net: '$13,916', status: 'Paid' },
  { id: 2, employeeId: 1, period: 'Jan 2024', base: '$15,416', bonus: '$0', deductions: '$1,500', net: '$13,916', status: 'Paid' },
  { id: 3, employeeId: 1, period: 'Dec 2023', base: '$14,166', bonus: '$5,000', deductions: '$1,400', net: '$17,766', status: 'Paid' },
  { id: 4, employeeId: 2, period: 'Feb 2024', base: '$9,166', bonus: '$500', deductions: '$200', net: '$9,466', status: 'Paid' },
];

export default function PayrollAdjustments() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [bonuses, setBonuses] = useState(initialBonuses);
  const [increases, setIncreases] = useState(initialIncreases);
  const [deductions, setDeductions] = useState(initialDeductions);
  const [payrollHistory, setPayrollHistory] = useState(initialPayrollHistory);

  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'bonus' | 'increase' | 'deduction'>('bonus');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    date: '',
    frequency: 'Monthly',
    increaseAmount: '',
    increasePercent: '',
    newSalary: '',
    effectiveDate: ''
  });

  // Filter employees based on department
  const filteredEmployees = selectedDepartment === 'All Departments' 
    ? employees 
    : employees.filter(emp => emp.department === selectedDepartment);

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);
  const employeeBonuses = bonuses.filter(b => b.employeeId === selectedEmployeeId);
  const employeeIncreases = increases.filter(i => i.employeeId === selectedEmployeeId);
  const employeeDeductions = deductions.filter(d => d.employeeId === selectedEmployeeId);
  const employeeHistory = payrollHistory.filter(h => h.employeeId === selectedEmployeeId);

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    const newDepartment = event.target.value;
    setSelectedDepartment(newDepartment);
    
    // Reset selected employee if current one is not in the new department
    const employeesInNewDept = newDepartment === 'All Departments' 
      ? employees 
      : employees.filter(emp => emp.department === newDepartment);
      
    if (employeesInNewDept.length > 0) {
      // Check if current selected employee is in the new list
      const isCurrentEmployeeInList = employeesInNewDept.some(e => e.id === selectedEmployeeId);
      if (!isCurrentEmployeeInList) {
        setSelectedEmployeeId(employeesInNewDept[0].id);
      }
    } else {
      setSelectedEmployeeId(0); 
    }
  };

  const handleEmployeeChange = (event: SelectChangeEvent<number>) => {
    setSelectedEmployeeId(Number(event.target.value));
  };

  const handleOpenDialog = (type: 'bonus' | 'increase' | 'deduction', id?: number) => {
    setDialogType(type);
    setEditingId(id || null);
    
    if (id) {
      // Populate form for editing
      if (type === 'bonus') {
        const item = bonuses.find(b => b.id === id);
        if (item) setFormData({ ...formData, type: item.type, amount: item.amount.replace('$', '').replace(',', ''), date: item.date });
      } else if (type === 'increase') {
        const item = increases.find(i => i.id === id);
        if (item) setFormData({ ...formData, increasePercent: item.increase.replace('%', ''), newSalary: item.newSalary.replace('$', '').replace(',', ''), effectiveDate: item.effectiveDate });
      } else if (type === 'deduction') {
        const item = deductions.find(d => d.id === id);
        if (item) setFormData({ ...formData, type: item.type, amount: item.amount.replace('$', '').replace(',', ''), frequency: item.frequency });
      }
    } else {
      // Reset form
      setFormData({
        type: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        frequency: 'Monthly',
        increaseAmount: '',
        increasePercent: '',
        newSalary: '',
        effectiveDate: new Date().toISOString().split('T')[0]
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!selectedEmployee) return;

    if (dialogType === 'bonus') {
      const newBonus = {
        id: editingId || Math.max(...bonuses.map(b => b.id), 0) + 1,
        employeeId: selectedEmployee.id,
        type: formData.type || 'Bonus',
        amount: `$${formData.amount}`,
        date: formData.date,
        status: 'Pending'
      };
      
      if (editingId) {
        setBonuses(bonuses.map(b => b.id === editingId ? { ...b, ...newBonus } : b));
      } else {
        setBonuses([...bonuses, newBonus]);
      }
    } else if (dialogType === 'increase') {
      const newIncrease = {
        id: editingId || Math.max(...increases.map(i => i.id), 0) + 1,
        employeeId: selectedEmployee.id,
        currentSalary: selectedEmployee.baseSalary,
        increase: `${formData.increasePercent}%`,
        newSalary: `$${formData.newSalary}`,
        effectiveDate: formData.effectiveDate
      };

      if (editingId) {
        setIncreases(increases.map(i => i.id === editingId ? { ...i, ...newIncrease } : i));
      } else {
        setIncreases([...increases, newIncrease]);
      }

      // Update employee's base salary
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, baseSalary: `$${formData.newSalary}` } 
          : emp
      ));
    } else if (dialogType === 'deduction') {
      const newDeduction = {
        id: editingId || Math.max(...deductions.map(d => d.id), 0) + 1,
        employeeId: selectedEmployee.id,
        type: formData.type || 'Deduction',
        amount: `$${formData.amount}`,
        frequency: formData.frequency,
        status: 'Active'
      };

      if (editingId) {
        setDeductions(deductions.map(d => d.id === editingId ? { ...d, ...newDeduction } : d));
      } else {
        setDeductions([...deductions, newDeduction]);
      }
    }

    setSnackbarMessage(editingId ? 'Adjustment updated successfully' : 'Adjustment added successfully');
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const handleDelete = (id: number, type: 'bonus' | 'increase' | 'deduction') => {
    if (type === 'bonus') {
      setBonuses(bonuses.filter(b => b.id !== id));
    } else if (type === 'increase') {
      setIncreases(increases.filter(i => i.id !== id));
    } else if (type === 'deduction') {
      setDeductions(deductions.filter(d => d.id !== id));
    }
    setSnackbarMessage('Adjustment deleted successfully');
    setSnackbarOpen(true);
  };

  // Helper function for currency parsing
  const parseCurrency = (value: string | undefined | null) => {
    if (!value) return 0;
    // Remove all non-numeric characters except dot and minus
    return parseFloat(value.toString().replace(/[^0-9.-]+/g, '')) || 0;
  };

  const handleProcessPayroll = () => {
    try {
      if (!selectedEmployee) return;

      // 1. Calculate Base Salary
      const baseSalary = parseCurrency(selectedEmployee.baseSalary) / 12;

      // 2. Calculate Payable Bonuses (Only Pending or Approved)
      const payableBonuses = employeeBonuses.filter(b => b.status !== 'Paid');
      const totalBonuses = payableBonuses.reduce((sum, b) => sum + parseCurrency(b.amount), 0);

      // 3. Calculate Payable Deductions (Active ones)
      // Note: One-time deductions should be marked Completed after payment so they aren't paid again.
      // Recurring ones stay Active.
      const activeDeductions = employeeDeductions.filter(d => d.status === 'Active');
      const totalDeductions = activeDeductions.reduce((sum, d) => sum + parseCurrency(d.amount), 0);

      const netPay = baseSalary + totalBonuses - totalDeductions;

      // 4. Add to History
      const newHistory = {
        id: Math.max(...payrollHistory.map(h => h.id), 0) + 1,
        employeeId: selectedEmployee.id,
        period: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }),
        base: `$${baseSalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        bonus: `$${totalBonuses.toLocaleString()}`,
        deductions: `$${totalDeductions.toLocaleString()}`,
        net: `$${netPay.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        status: 'Paid'
      };

      setPayrollHistory([newHistory, ...payrollHistory]);

      // 5. Update Bonuses Status -> Paid
      const payableBonusIds = new Set(payableBonuses.map(b => b.id));
      setBonuses(prevBonuses => prevBonuses.map(b => 
        payableBonusIds.has(b.id) ? { ...b, status: 'Paid' } : b
      ));

      // 6. Update Deductions Status
      // One-time -> Completed
      // Recurring -> Stay Active
      const oneTimeDeductionIds = new Set(activeDeductions.filter(d => d.frequency === 'One-time').map(d => d.id));
      setDeductions(prevDeductions => prevDeductions.map(d => 
        oneTimeDeductionIds.has(d.id) ? { ...d, status: 'Completed' } : d
      ));

      setSnackbarMessage('Payroll processed successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Payroll processing error:', error);
      setSnackbarMessage('Error processing payroll. Please check input values.');
      setSnackbarOpen(true);
    }
  };

  const handleDownloadHistory = () => {
    if (!selectedEmployee || employeeHistory.length === 0) return;

    const headers = ['Period', 'Base Salary', 'Bonuses', 'Deductions', 'Net Pay', 'Status'];
    const rows = employeeHistory.map(h => [
      h.period,
      h.base.replace(/,/g, ''), // Remove commas for CSV
      h.bonus.replace(/,/g, ''),
      h.deductions.replace(/,/g, ''),
      h.net.replace(/,/g, ''),
      h.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payroll_History_${selectedEmployee.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSlip = (historyItem: typeof payrollHistory[0]) => {
    if (!selectedEmployee) return;
    
    try {
      const slipContent = `
PAYROLL SLIP
----------------------------------------
Employee:   ${selectedEmployee.name}
ID:         ${selectedEmployee.id}
Role:       ${selectedEmployee.role}
Department: ${selectedEmployee.department}
Period:     ${historyItem.period}
----------------------------------------
EARNINGS
Base Salary:    ${historyItem.base}
Bonuses:        ${historyItem.bonus}

DEDUCTIONS
Total Deductions: ${historyItem.deductions}
----------------------------------------
NET PAY:        ${historyItem.net}
----------------------------------------
Status:         ${historyItem.status}
Generated on:   ${new Date().toLocaleDateString()}
      `;

      const blob = new Blob([slipContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Payslip_${selectedEmployee.name.replace(/\s+/g, '_')}_${historyItem.period}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setSnackbarMessage('Error downloading slip.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header & Employee Selector */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Employee Payroll Profile</Typography>
          <Typography variant="body1" color="text.secondary">Manage individual adjustments and view history.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={selectedDepartment}
              label="Department"
              onChange={handleDepartmentChange}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Select Employee</InputLabel>
            <Select
              value={selectedEmployeeId || ''}
              label="Select Employee"
              onChange={handleEmployeeChange}
              startAdornment={<User size={18} style={{ marginRight: 8, color: '#64748b' }} />}
            >
              {filteredEmployees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Employee Summary Card */}
      {selectedEmployee && (
        <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
            <Avatar src={selectedEmployee.avatar} sx={{ width: 80, height: 80, border: '3px solid white' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{selectedEmployee.name}</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>{selectedEmployee.role}</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', opacity: 0.8, fontWeight: 600 }}>Current Base Salary</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{selectedEmployee.baseSalary}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* 3 Adjustments Sections */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Bonuses */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DollarSign size={18} className="text-blue-600" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Bonuses</Typography>
              </Box>
              <Button size="small" startIcon={<Plus size={14} />} onClick={() => handleOpenDialog('bonus')}>Add</Button>
            </Box>
            <CardContent sx={{ p: 0 }}>
              {employeeBonuses.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {employeeBonuses.map((bonus) => (
                        <TableRow key={bonus.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>{bonus.type}</Typography>
                            <Typography variant="caption" color="text.secondary">{bonus.date}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="success.main" fontWeight={600}>{bonus.amount}</Typography>
                            <Chip label={bonus.status} size="small" sx={{ height: 20, fontSize: 10, mt: 0.5 }} color={bonus.status === 'Approved' || bonus.status === 'Paid' ? 'success' : 'warning'} variant="outlined" />
                          </TableCell>
                          <TableCell align="right" width={80}>
                            <IconButton size="small" onClick={() => handleOpenDialog('bonus', bonus.id)}><Edit size={14} /></IconButton>
                            <IconButton size="small" onClick={() => handleDelete(bonus.id, 'bonus')} color="error"><Trash2 size={14} /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                  <Typography variant="body2">No bonuses found.</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Increases */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={18} className="text-green-600" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Annual Increases</Typography>
              </Box>
              <Button size="small" startIcon={<Plus size={14} />} onClick={() => handleOpenDialog('increase')}>Add</Button>
            </Box>
            <CardContent sx={{ p: 0 }}>
              {employeeIncreases.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {employeeIncreases.map((inc) => (
                        <TableRow key={inc.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" fontWeight={600}>{inc.currentSalary}</Typography>
                              <ArrowRight size={12} />
                              <Typography variant="body2" fontWeight={700}>{inc.newSalary}</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">Effective: {inc.effectiveDate}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip label={`+${inc.increase}`} size="small" color="success" sx={{ height: 20, fontSize: 10, fontWeight: 700 }} />
                          </TableCell>
                          <TableCell align="right" width={80}>
                            <IconButton size="small" onClick={() => handleOpenDialog('increase', inc.id)}><Edit size={14} /></IconButton>
                            <IconButton size="small" onClick={() => handleDelete(inc.id, 'increase')} color="error"><Trash2 size={14} /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                  <Typography variant="body2">No salary increases recorded.</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Deductions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingDown size={18} className="text-red-600" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Monthly Deductions</Typography>
              </Box>
              <Button size="small" startIcon={<Plus size={14} />} onClick={() => handleOpenDialog('deduction')}>Add</Button>
            </Box>
            <CardContent sx={{ p: 0 }}>
              {employeeDeductions.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {employeeDeductions.map((ded) => (
                        <TableRow key={ded.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>{ded.type}</Typography>
                            <Typography variant="caption" color="text.secondary">{ded.frequency}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="error.main" fontWeight={600}>{ded.amount}</Typography>
                            <Chip 
                              label={ded.status} 
                              size="small" 
                              sx={{ height: 20, fontSize: 10, mt: 0.5 }} 
                              color={ded.status === 'Active' ? 'default' : 'default'} 
                              variant={ded.status === 'Completed' ? 'outlined' : 'filled'}
                            />
                          </TableCell>
                          <TableCell align="right" width={80}>
                            <IconButton size="small" onClick={() => handleOpenDialog('deduction', ded.id)}><Edit size={14} /></IconButton>
                            <IconButton size="small" onClick={() => handleDelete(ded.id, 'deduction')} color="error"><Trash2 size={14} /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                  <Typography variant="body2">No active deductions.</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* History Section */}
      <Card>
        <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <History size={20} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Payroll History</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<Save size={16} />}
              onClick={handleDownloadHistory}
              disabled={!selectedEmployee || employeeHistory.length === 0}
            >
              Download History
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Save size={16} />}
              onClick={handleProcessPayroll}
              disabled={!selectedEmployee}
            >
              Process Current Month
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Period</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Base Salary</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bonuses</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Deductions</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Net Pay</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeHistory.length > 0 ? (
                employeeHistory.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{row.period}</TableCell>
                    <TableCell>{row.base}</TableCell>
                    <TableCell sx={{ color: 'success.main' }}>{row.bonus}</TableCell>
                    <TableCell sx={{ color: 'error.main' }}>{row.deductions}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{row.net}</TableCell>
                    <TableCell>
                      <Chip label={row.status} size="small" color="success" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="text" onClick={() => handleDownloadSlip(row)}>View Slip</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No payroll history available for this employee.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editingId ? 'Edit' : 'Add'} {dialogType === 'bonus' && 'Bonus'}
          {dialogType === 'increase' && 'Salary Increase'}
          {dialogType === 'deduction' && 'Deduction'}
          <IconButton onClick={handleCloseDialog} size="small"><X size={20} /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            
            {/* Read-only Employee Field */}
            <TextField label="Employee" value={selectedEmployee?.name} disabled fullWidth />

            {dialogType === 'bonus' && (
              <>
                <TextField 
                  label="Bonus Type" 
                  placeholder="e.g. Performance, Overtime" 
                  fullWidth 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <TextField 
                  label="Amount" 
                  placeholder="0.00" 
                  fullWidth 
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                <TextField 
                  label="Date" 
                  type="date" 
                  fullWidth 
                  InputLabelProps={{ shrink: true }} 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </>
            )}

            {dialogType === 'increase' && (
              <>
                <TextField label="Current Salary" disabled value={selectedEmployee?.baseSalary} fullWidth />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField 
                      label="Increase Amount" 
                      placeholder="0.00" 
                      fullWidth 
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} 
                      value={formData.increaseAmount}
                      onChange={(e) => setFormData({...formData, increaseAmount: e.target.value})}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField 
                      label="Increase %" 
                      placeholder="0" 
                      fullWidth 
                      InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} 
                      value={formData.increasePercent}
                      onChange={(e) => setFormData({...formData, increasePercent: e.target.value})}
                    />
                  </Grid>
                </Grid>
                <TextField 
                  label="New Salary" 
                  placeholder="0.00" 
                  fullWidth 
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} 
                  value={formData.newSalary}
                  onChange={(e) => setFormData({...formData, newSalary: e.target.value})}
                />
                <TextField 
                  label="Effective Date" 
                  type="date" 
                  fullWidth 
                  InputLabelProps={{ shrink: true }} 
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                />
              </>
            )}

            {dialogType === 'deduction' && (
              <>
                <TextField 
                  label="Deduction Type" 
                  placeholder="e.g. Health Insurance" 
                  fullWidth 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <TextField 
                  label="Amount" 
                  placeholder="0.00" 
                  fullWidth 
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select 
                    label="Frequency" 
                    value={formData.frequency}
                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  >
                    <MenuItem value="One-time">One-time</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annually">Annually</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" startIcon={<Save size={16} />} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

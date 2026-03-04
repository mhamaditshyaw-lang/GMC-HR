import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { CreditCard, Search, Filter, Download, DollarSign, TrendingUp, Calendar, AlertCircle, MoreHorizontal, ArrowUpRight, ReceiptText, Eye, FileText, Edit, X, Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const payrollData = [
  { id: 1, name: 'Dr. Sarah Jenkins', role: 'Senior Cardiologist', base: '$15,416', bonus: '$1,200', deductions: '$3,850', net: '$12,766', status: 'Paid', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8' },
  { id: 2, name: 'Dr. Emily Chen', role: 'Senior Resident', base: '$9,166', bonus: '$500', deductions: '$2,290', net: '$7,376', status: 'Paid', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ' },
  { id: 3, name: 'Mark Wilson', role: 'Registered Nurse', base: '$6,250', bonus: '$200', deductions: '$1,560', net: '$4,890', status: 'Pending', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws' },
  { id: 4, name: 'Dr. James Lee', role: 'Anesthesiologist', base: '$14,583', bonus: '$1,000', deductions: '$3,645', net: '$11,938', status: 'Paid', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q' },
  { id: 5, name: 'Linda Kim', role: 'Neurosurgeon', base: '$18,750', bonus: '$2,500', deductions: '$4,680', net: '$16,570', status: 'Paid', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjCCVVt3rMPxIyGeUqMzTyhvVHWF8N5edEwS1ARC08hOYFDTx3-ljAFDT1Bky6AvSog9mrYkpLXsOvQfRSG2xusEElCmD1ULuBfY7VnXVTTc_4O5A7uwQR4T8gZ6Wm-6tR7NC3svMb6rSfJphYLBUwR90nmDg6I5MfVSlm0m-GSM2CZ984NgWQjlHt-HmEQwtTHSpUpVgIsJj4ojvKRdhPze73QwvxHWp9Z9H9_sIapMUL2VXklLCKazbUA8JEa7B5icXwDDp-HA' },
];

const chartData = [
  { month: 'Jan', amount: 420000 },
  { month: 'Feb', amount: 435000 },
  { month: 'Mar', amount: 410000 },
  { month: 'Apr', amount: 450000 },
  { month: 'May', amount: 465000 },
  { month: 'Jun', amount: 480000 },
];

const stats = [
  { label: 'Total Payroll', value: '$480,250', change: '+4.2%', icon: <DollarSign size={20} />, color: 'primary.main' },
  { label: 'Pending Approvals', value: '12', change: '8 staff', icon: <AlertCircle size={20} />, color: 'warning.main' },
  { label: 'Tax & Benefits', value: '$92,400', change: '19.2%', icon: <ReceiptText size={20} />, color: 'success.main' },
  { label: 'Next Pay Cycle', value: '5 Days', change: 'Mar 01', icon: <Calendar size={20} />, color: 'info.main' },
];

export default function Payroll() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(payrollData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const open = Boolean(anchorEl);
  const selectedEmployee = employees.find(emp => emp.id === selectedId);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    setViewDialogOpen(true);
    handleMenuClose();
  };

  const handleEditEntry = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDownloadSlip = () => {
    setSnackbarMessage(`Downloading payslip for ${selectedEmployee?.name}...`);
    setSnackbarOpen(true);
    handleMenuClose();
    // Simulate download delay
    setTimeout(() => {
        setSnackbarMessage(`Payslip downloaded successfully.`);
    }, 2000);
  };

  const handleDownloadReports = () => {
    const headers = ['ID', 'Name', 'Role', 'Base Salary', 'Bonus', 'Deductions', 'Net Pay', 'Status'];
    const rows = employees.map(emp => [
      emp.id,
      emp.name,
      emp.role,
      emp.base.replace(/,/g, ''),
      emp.bonus.replace(/,/g, ''),
      emp.deductions.replace(/,/g, ''),
      emp.net.replace(/,/g, ''),
      emp.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payroll_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('Payroll report downloaded successfully.');
    setSnackbarOpen(true);
  };

  const handleProcessPayroll = () => {
    const pendingCount = employees.filter(e => e.status === 'Pending').length;
    
    if (pendingCount === 0) {
      setSnackbarMessage('All payrolls are already processed.');
      setSnackbarOpen(true);
      return;
    }

    setEmployees(prev => prev.map(emp => 
      emp.status === 'Pending' ? { ...emp, status: 'Paid' } : emp
    ));

    setSnackbarMessage(`Successfully processed ${pendingCount} pending payroll(s).`);
    setSnackbarOpen(true);
  };

  const handleCloseDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedId(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Payroll Management</Typography>
          <Typography variant="body1" color="text.secondary">Process salaries, bonuses, and track financial distributions.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Sliders size={18} />} onClick={() => navigate('/payroll/adjustments')}>Adjustments</Button>
          <Button variant="outlined" startIcon={<Download size={18} />} onClick={handleDownloadReports}>Download Reports</Button>
          <Button variant="contained" startIcon={<CreditCard size={18} />} onClick={handleProcessPayroll}>Process Payroll</Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: `${stat.color.split('.')[0]}.light`, color: stat.color, borderRadius: 2, display: 'flex' }}>
                    {stat.icon}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{stat.change}</Typography>
                    <ArrowUpRight size={14} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Payroll History</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField 
                  size="small" 
                  placeholder="Search employee..." 
                  sx={{ width: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="outlined" startIcon={<Filter size={18} />} size="small">Filters</Button>
              </Box>
            </Box>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Employee</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Base Salary</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Bonus</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Deductions</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Net Pay</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={row.avatar} sx={{ width: 36, height: 36 }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{row.role}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{row.base}</TableCell>
                      <TableCell sx={{ fontSize: 14, color: 'success.main', fontWeight: 600 }}>{row.bonus}</TableCell>
                      <TableCell sx={{ fontSize: 14, color: 'error.main' }}>{row.deductions}</TableCell>
                      <TableCell sx={{ fontSize: 14, fontWeight: 700 }}>{row.net}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small" 
                          sx={{ 
                            fontWeight: 700, 
                            fontSize: 11,
                            bgcolor: row.status === 'Paid' ? 'success.light' : 'warning.light',
                            color: row.status === 'Paid' ? 'success.main' : 'warning.main',
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
                          <MoreHorizontal size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <Eye size={18} />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownloadSlip}>
          <ListItemIcon>
            <FileText size={18} />
          </ListItemIcon>
          <ListItemText>Download Slip</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditEntry}>
          <ListItemIcon>
            <Edit size={18} />
          </ListItemIcon>
          <ListItemText>Edit Entry</ListItemText>
        </MenuItem>
      </Menu>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseDialogs} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Payroll Details
          <IconButton onClick={handleCloseDialogs} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedEmployee && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar src={selectedEmployee.avatar} sx={{ width: 64, height: 64 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedEmployee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedEmployee.role}</Typography>
                  <Chip 
                    label={selectedEmployee.status} 
                    size="small" 
                    sx={{ mt: 0.5, bgcolor: selectedEmployee.status === 'Paid' ? 'success.light' : 'warning.light', color: selectedEmployee.status === 'Paid' ? 'success.main' : 'warning.main', fontWeight: 600 }} 
                  />
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Base Salary</Typography>
                  <Typography variant="h6">{selectedEmployee.base}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Bonus</Typography>
                  <Typography variant="h6" color="success.main">{selectedEmployee.bonus}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Deductions</Typography>
                  <Typography variant="h6" color="error.main">{selectedEmployee.deductions}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Net Pay</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedEmployee.net}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Close</Button>
          <Button variant="contained" startIcon={<Download size={16} />} onClick={handleDownloadSlip}>Download Slip</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Entry Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialogs} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Payroll Entry
          <IconButton onClick={handleCloseDialogs} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedEmployee && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar src={selectedEmployee.avatar} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedEmployee.name}</Typography>
              </Box>
              <TextField label="Base Salary" defaultValue={selectedEmployee.base.replace('$', '').replace(',', '')} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
              <TextField label="Bonus" defaultValue={selectedEmployee.bonus.replace('$', '').replace(',', '')} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
              <TextField label="Deductions" defaultValue={selectedEmployee.deductions.replace('$', '').replace(',', '')} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
              <TextField label="Status" select defaultValue={selectedEmployee.status} fullWidth SelectProps={{ native: true }}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button variant="contained" onClick={() => { handleCloseDialogs(); setSnackbarMessage('Entry updated successfully'); setSnackbarOpen(true); }}>Save Changes</Button>
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

import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  MenuItem, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Avatar
} from '@mui/material';
import { FileUp, Send, History, Calendar as CalendarIcon, Info, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLeave } from '../../contexts/LeaveContext';
import { UserRole } from '../../types';

export default function LeaveManagement() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { leaveRequests, addLeaveRequest, updateLeaveStatus } = useLeave();
  
  const [leaveType, setLeaveType] = useState('Annual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const isAdmin = user?.role === UserRole.SUPER_ADMIN || user?.role === UserRole.HR_MANAGER || user?.role === UserRole.DEPT_HEAD;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!startDate || !endDate || !reason) {
      setSnackbar({ open: true, message: t('fillRequiredFields'), severity: 'error' });
      return;
    }

    const newLeave = {
      type: leaveType,
      start: startDate,
      end: endDate,
      reason: reason
    };

    addLeaveRequest(newLeave);
    
    // Reset form
    setStartDate('');
    setEndDate('');
    setReason('');
    setSelectedFile(null);
    setSnackbar({ open: true, message: t('leaveSubmitted'), severity: 'success' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (isAdmin) {
    const visibleRequests = leaveRequests.filter(req => {
      if (user?.role === UserRole.DEPT_HEAD) {
        return req.status === 'Pending Head' || req.status === 'Pending HR' || req.status === 'Approved' || req.status === 'Rejected';
      }
      if (user?.role === UserRole.HR_MANAGER || user?.role === UserRole.SUPER_ADMIN) {
        return req.status === 'Pending HR' || req.status === 'Approved' || req.status === 'Rejected';
      }
      return false;
    });

    const totalLeaves = visibleRequests.length;
    const approvedLeaves = visibleRequests.filter(l => l.status === 'Approved').length;
    const rejectedLeaves = visibleRequests.filter(l => l.status === 'Rejected').length;
    const pendingLeaves = visibleRequests.filter(l => l.status === 'Pending Head' || l.status === 'Pending HR').length;

    return (
      <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('leaveRequests')}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>{t('reviewLeaveRequests')}</Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.main' }}>
                <History size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalLeaves}</Typography>
                <Typography variant="body2" color="text.secondary">{t('totalLeaves')}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'success.light', color: 'success.main' }}>
                <CheckCircle size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{approvedLeaves}</Typography>
                <Typography variant="body2" color="text.secondary">{t('approvedLeaves')}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'error.light', color: 'error.main' }}>
                <XCircle size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{rejectedLeaves}</Typography>
                <Typography variant="body2" color="text.secondary">{t('rejectedLeaves')}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'warning.light', color: 'warning.main' }}>
                <Info size={24} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{pendingLeaves}</Typography>
                <Typography variant="body2" color="text.secondary">{t('pendingLeaves')}</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('employeeCol')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('typeCol')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('datesCol')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('reasonCol')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('statusCol')}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12 }}>{t('actionsCol')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRequests.map((leave) => (
                  <TableRow key={leave.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700, fontSize: 14 }}>
                          {leave.employeeName.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{leave.employeeName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{leave.type === 'Annual' ? t('annualLeave') : leave.type === 'Sick' ? t('sickLeave') : leave.type === 'Maternity' ? t('maternityLeave') : t('unpaidLeave')}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{leave.start}</Typography>
                      <Typography variant="caption" color="text.secondary">{t('to')} {leave.end}</Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" noWrap title={leave.reason}>{leave.reason}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={leave.status === 'Approved' ? t('approved') : leave.status === 'Rejected' ? t('rejected') : leave.status === 'Pending HR' ? t('pendingHR') : t('pendingHead')} 
                        size="small" 
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: 10,
                          bgcolor: leave.status === 'Approved' ? 'success.light' : leave.status === 'Rejected' ? 'error.light' : 'warning.light',
                          color: leave.status === 'Approved' ? 'success.main' : leave.status === 'Rejected' ? 'error.main' : 'warning.main'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {(leave.status === 'Pending Head' && user?.role === UserRole.DEPT_HEAD) || (leave.status === 'Pending HR' && (user?.role === UserRole.HR_MANAGER || user?.role === UserRole.SUPER_ADMIN)) ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <IconButton size="small" color="success" onClick={() => { updateLeaveStatus(leave.id, leave.status === 'Pending Head' ? 'Pending HR' : 'Approved'); setSnackbar({ open: true, message: t('leaveApproved'), severity: 'success' }); }}>
                            <CheckCircle size={18} />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => { updateLeaveStatus(leave.id, 'Rejected'); setSnackbar({ open: true, message: t('leaveRejected'), severity: 'error' }); }}>
                            <XCircle size={18} />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">{t('processed')}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('applyLeave')}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>{t('submitTrackLeave')}</Typography>

      <Grid container spacing={4}>
        {/* Application Form */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  select
                  fullWidth
                  label={t('leaveType')}
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <MenuItem value="Annual">{t('annualLeave')}</MenuItem>
                  <MenuItem value="Sick">{t('sickLeave')}</MenuItem>
                  <MenuItem value="Maternity">{t('maternityLeave')}</MenuItem>
                  <MenuItem value="Unpaid">{t('unpaidLeave')}</MenuItem>
                </TextField>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth label={t('startDate')} type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth label={t('endDate')} type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </Grid>
                </Grid>

                <TextField fullWidth label={t('reason')} multiline rows={3} placeholder={t('brieflyExplain')} value={reason} onChange={(e) => setReason(e.target.value)} />

                <Box 
                  onClick={handleUploadClick}
                  sx={{ 
                    p: 3, 
                    border: '2px dashed', 
                    borderColor: selectedFile ? 'primary.main' : 'divider',
                    background: selectedFile ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3, 
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { background: 'rgba(255, 255, 255, 0.1)', borderColor: 'primary.main' }
                  }}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <FileUp size={32} color={selectedFile ? "#2b7cee" : "#94a3b8"} style={{ marginBottom: '8px' }} />
                  <Typography variant="body2" color={selectedFile ? "primary.main" : "text.secondary"} sx={{ fontWeight: selectedFile ? 700 : 400 }}>
                    {selectedFile ? selectedFile.name : t('uploadReport')}
                  </Typography>
                  {!selectedFile && <Typography variant="caption" color="text.disabled">{t('pdfJpgLimit')}</Typography>}
                </Box>

                <Button variant="contained" fullWidth size="large" startIcon={<Send size={18} />} sx={{ py: 1.5 }} onClick={handleSubmit}>
                  {t('submitRequest')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Tracker */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <History size={20} color="#2b7cee" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('leaveHistory')}</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('typeCol')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('datesCol')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{t('statusCol')}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveRequests.filter(req => req.employeeName === 'Sarah Jenkins').map((leave) => (
                    <TableRow key={leave.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{leave.type === 'Annual' ? t('annualLeave') : leave.type === 'Sick' ? t('sickLeave') : leave.type === 'Maternity' ? t('maternityLeave') : t('unpaidLeave')}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{leave.start}</Typography>
                        <Typography variant="caption" color="text.secondary">{t('to')} {leave.end}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={leave.status === 'Approved' ? t('approved') : leave.status === 'Rejected' ? t('rejected') : leave.status === 'Pending HR' ? t('pendingHR') : t('pendingHead')} 
                          size="small" 
                          sx={{ 
                            fontWeight: 700, 
                            fontSize: 10,
                            bgcolor: leave.status === 'Approved' ? 'success.light' : leave.status === 'Rejected' ? 'error.light' : 'warning.light',
                            color: leave.status === 'Approved' ? 'success.main' : leave.status === 'Rejected' ? 'error.main' : 'warning.main'
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><Info size={16} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

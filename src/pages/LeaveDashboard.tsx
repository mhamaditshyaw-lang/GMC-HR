import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Avatar, Chip, IconButton, Tab, Tabs, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeave } from '../contexts/LeaveContext';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Calendar, Clock, CheckCircle, XCircle, Plus, Filter, Download, MoreVertical, User, PieChart, BarChart2, Activity, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dataTrends = [
  { name: 'Jan', sick: 4, casual: 2, annual: 0 },
  { name: 'Feb', sick: 2, casual: 1, annual: 5 },
  { name: 'Mar', sick: 1, casual: 3, annual: 2 },
  { name: 'Apr', sick: 3, casual: 2, annual: 1 },
  { name: 'May', sick: 0, casual: 4, annual: 0 },
  { name: 'Jun', sick: 2, casual: 1, annual: 8 },
];

const dataType = [
  { name: 'Sick Leave', value: 12 },
  { name: 'Casual Leave', value: 15 },
  { name: 'Annual Leave', value: 8 },
  { name: 'Unpaid Leave', value: 2 },
];

const StatCard = ({ title, value, total, icon: Icon, color }: { title: string, value: number, total?: number, icon: any, color: string }) => (
  <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15`, color: color }}>
          <Icon size={24} />
        </Box>
        {total && (
          <Chip label={`${value}/${total}`} size="small" sx={{ bgcolor: `${color}10`, color: color, fontWeight: 600 }} />
        )}
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      {total && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={(value / total) * 100} 
            sx={{ 
              height: 6, 
              borderRadius: 3, 
              bgcolor: `${color}15`,
              '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 }
            }} 
          />
        </Box>
      )}
    </CardContent>
  </Card>
);

export default function LeaveDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { leaveRequests, updateLeaveStatus } = useLeave();
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const myRequests = leaveRequests.filter(req => req.employeeName === 'Sarah Jenkins');
  
  const teamRequests = leaveRequests.filter(req => {
    if (user?.role === UserRole.DEPT_HEAD) {
      return req.status === 'Pending Head' || req.status === 'Pending HR' || req.status === 'Approved' || req.status === 'Rejected';
    }
    if (user?.role === UserRole.HR_MANAGER || user?.role === UserRole.SUPER_ADMIN) {
      return req.status === 'Pending HR' || req.status === 'Approved' || req.status === 'Rejected';
    }
    return false;
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(45deg, #2b7cee, #2563eb)', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('leaveDashboard')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('leaveOverview')} & {t('leaveReports')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download size={18} />} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
            {t('exportReport')}
          </Button>
          <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => navigate('/leave')} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: 'primary.main', boxShadow: '0 4px 14px rgba(43, 124, 238, 0.3)' }}>
            {t('applyForLeave')}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t('totalLeave')} value={28} total={30} icon={Calendar} color="#2b7cee" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t('usedLeave')} value={12} total={30} icon={CheckCircle} color="#10b981" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t('pendingRequests')} value={3} icon={Clock} color="#f59e0b" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t('availableLeave')} value={16} total={30} icon={Activity} color="#8b5cf6" />
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="leave tabs">
          <Tab label={t('leaveOverview')} icon={<PieChart size={18} />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48 }} />
          <Tab label={t('myRequests')} icon={<User size={18} />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48 }} />
          <Tab label={t('teamRequests')} icon={<User size={18} />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48 }} />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('leaveTrends')}</Typography>
                  <IconButton size="small"><MoreVertical size={18} /></IconButton>
                </Box>
                <Box sx={{ height: 350, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      />
                      <Legend iconType="circle" />
                      <Bar dataKey="sick" name={t('sickLeave')} stackId="a" fill="#ef4444" radius={[0, 0, 4, 4]} barSize={20} />
                      <Bar dataKey="casual" name={t('casualLeave')} stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={20} />
                      <Bar dataKey="annual" name={t('annualLeave')} stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('leaveTypeDistribution')}</Typography>
                  <IconButton size="small"><MoreVertical size={18} /></IconButton>
                </Box>
                <Box sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={dataType}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dataType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </RePieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('recentActivity')}</Typography>
                  <Button size="small" endIcon={<Filter size={14} />}>{t('filter')}</Button>
                </Box>
                <Grid container spacing={2}>
                  {[1, 2, 3].map((item) => (
                    <Grid size={{ xs: 12 }} key={item}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>JD</Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>John Doe</Typography>
                            <Typography variant="caption" color="text.secondary">{t('appliedFor')} {t('sickLeave')} • 2 {t('days')}</Typography>
                          </Box>
                        </Box>
                        <Chip label={t('pending')} size="small" color="warning" sx={{ fontWeight: 600, borderRadius: 1 }} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box>
           <Typography variant="h6" sx={{ mb: 2 }}>{t('myRequests')}</Typography>
           {myRequests.length > 0 ? (
             <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
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
                     {myRequests.map((leave) => (
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
           ) : (
             <Typography color="text.secondary">{t('noLeaveRequests')}</Typography>
           )}
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
           <Typography variant="h6" sx={{ mb: 2 }}>{t('teamRequests')}</Typography>
           {teamRequests.length > 0 ? (
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
                     {teamRequests.map((leave) => (
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
                               <IconButton size="small" color="success" onClick={() => updateLeaveStatus(leave.id, leave.status === 'Pending Head' ? 'Pending HR' : 'Approved')}>
                                 <CheckCircle size={18} />
                               </IconButton>
                               <IconButton size="small" color="error" onClick={() => updateLeaveStatus(leave.id, 'Rejected')}>
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
           ) : (
             <Typography color="text.secondary">{t('noLeaveRequests')}</Typography>
           )}
        </Box>
      )}
    </Box>
  );
}

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, Filter, Search, Calendar, PieChart, TrendingUp, Users, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const monthlyTrends = [
  { month: 'Jan', sick: 12, annual: 45, unpaid: 5 },
  { month: 'Feb', sick: 15, annual: 30, unpaid: 2 },
  { month: 'Mar', sick: 8, annual: 25, unpaid: 0 },
  { month: 'Apr', sick: 20, annual: 40, unpaid: 8 },
  { month: 'May', sick: 10, annual: 50, unpaid: 3 },
  { month: 'Jun', sick: 5, annual: 60, unpaid: 1 },
  { month: 'Jul', sick: 18, annual: 80, unpaid: 10 },
  { month: 'Aug', sick: 25, annual: 90, unpaid: 15 },
  { month: 'Sep', sick: 30, annual: 45, unpaid: 5 },
  { month: 'Oct', sick: 40, annual: 30, unpaid: 2 },
  { month: 'Nov', sick: 45, annual: 25, unpaid: 0 },
  { month: 'Dec', sick: 50, annual: 100, unpaid: 20 },
];

const departmentLeaves = [
  { dept: 'Cardiology', total: 120 },
  { dept: 'Neurology', total: 85 },
  { dept: 'Pediatrics', total: 150 },
  { dept: 'Emergency', total: 200 },
  { dept: 'Surgery', total: 95 },
];

const detailedRecords = [
  { id: 1, name: 'Dr. Sarah Connor', role: 'Cardiologist', dept: 'Cardiology', type: 'Annual', start: '2024-06-01', end: '2024-06-15', days: 14, status: 'Approved' },
  { id: 2, name: 'John Smith', role: 'Nurse', dept: 'Emergency', type: 'Sick', start: '2024-06-10', end: '2024-06-12', days: 3, status: 'Approved' },
  { id: 3, name: 'Emily Chen', role: 'Pediatrician', dept: 'Pediatrics', type: 'Maternity', start: '2024-05-01', end: '2024-08-01', days: 90, status: 'Approved' },
  { id: 4, name: 'Michael Brown', role: 'Surgeon', dept: 'Surgery', type: 'Unpaid', start: '2024-07-01', end: '2024-07-05', days: 5, status: 'Pending Head' },
  { id: 5, name: 'Jessica Davis', role: 'Neurologist', dept: 'Neurology', type: 'Annual', start: '2024-08-10', end: '2024-08-20', days: 10, status: 'Rejected' },
];

export default function LeaveAnalytics() {
  const { t } = useLanguage();
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('leaveAnalyticsDeepDive')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('comprehensiveAnalysis')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download size={18} />} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
            {t('exportFullReport')}
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                label={t('department')}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                variant="outlined"
                size="small"
              >
                <MenuItem value="All">{t('allDepartments')}</MenuItem>
                <MenuItem value="Cardiology">{t('cardiology')}</MenuItem>
                <MenuItem value="Neurology">{t('neurology')}</MenuItem>
                <MenuItem value="Pediatrics">{t('pediatrics')}</MenuItem>
                <MenuItem value="Emergency">{t('emergency')}</MenuItem>
                <MenuItem value="Surgery">{t('surgery')}</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                label={t('leaveType')}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                variant="outlined"
                size="small"
              >
                <MenuItem value="All">{t('allTypes')}</MenuItem>
                <MenuItem value="Annual">{t('annualLeave')}</MenuItem>
                <MenuItem value="Sick">{t('sickLeave')}</MenuItem>
                <MenuItem value="Maternity">{t('maternityLeave')}</MenuItem>
                <MenuItem value="Unpaid">{t('unpaidLeave')}</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder={t('searchEmployee')}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <Search size={18} style={{ marginRight: 8, color: '#9ca3af' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button fullWidth variant="contained" startIcon={<Filter size={18} />} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                {t('applyFilters')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={20} color="#3b82f6" />
                {t('yearlyLeaveTrends')}
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSick" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAnnual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="annual" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAnnual)" name={t('annualLeave')} />
                    <Area type="monotone" dataKey="sick" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorSick)" name={t('sickLeave')} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PieChart size={20} color="#8b5cf6" />
                {t('leavesByDepartment')}
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentLeaves} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis dataKey="dept" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 13, fontWeight: 500 }} width={80} />
                    <Tooltip 
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="total" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} name={t('totalDays')} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Data Table */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FileText size={20} color="#10b981" />
            {t('detailedLeaveRecords')}
          </Typography>
          <Chip label={`${detailedRecords.length} ${t('records')}`} size="small" sx={{ bgcolor: '#10b98115', color: '#10b981', fontWeight: 600 }} />
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#f9fafb' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('employee')}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('department')}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('leaveType')}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('duration')}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('days')}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('status')}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#6b7280', py: 2 }}>{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailedRecords.map((record) => (
                <TableRow key={record.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 600 }}>
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>{record.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>{record.role}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>{record.dept}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={t((record.type.toLowerCase() + 'Leave') as any)} 
                      size="small" 
                      sx={{ 
                        bgcolor: record.type === 'Annual' ? '#e0f2fe' : record.type === 'Sick' ? '#fee2e2' : '#f3e8ff', 
                        color: record.type === 'Annual' ? '#0284c7' : record.type === 'Sick' ? '#dc2626' : '#9333ea',
                        fontWeight: 600,
                        borderRadius: 2
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>{record.start}</Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>{t('to')} {record.end}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>{record.days}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={t(record.status.toLowerCase() as any)} 
                      size="small" 
                      sx={{ 
                        bgcolor: record.status === 'Approved' ? '#dcfce7' : record.status === 'Rejected' ? '#fee2e2' : '#fef3c7', 
                        color: record.status === 'Approved' ? '#16a34a' : record.status === 'Rejected' ? '#dc2626' : '#d97706',
                        fontWeight: 600
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>
                      {t('viewDetails')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

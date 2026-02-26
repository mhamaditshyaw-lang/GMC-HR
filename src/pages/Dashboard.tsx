import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, LinearProgress } from '@mui/material';
import { Users, CalendarClock, AlertTriangle, UserPlus, TrendingUp, TrendingDown, MoreHorizontal, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeave } from '../contexts/LeaveContext';

export default function Dashboard() {
  const { t } = useLanguage();
  const { leaveRequests } = useLeave();
  
  const pendingLeavesCount = leaveRequests.filter(req => req.status === 'Pending').length;

  const stats = [
    { title: t('activeStaff'), value: '142', change: '+5%', trend: 'up', icon: <Users />, color: '#2b7cee' },
    { title: t('openShifts'), value: '8', change: '0%', trend: 'neutral', icon: <CalendarClock />, color: '#f59e0b' },
    { title: t('expiringLicenses'), value: '5', change: '-2%', trend: 'down', icon: <AlertTriangle />, color: '#ef4444' },
    { title: t('pendingLeave'), value: pendingLeavesCount.toString(), change: '+3%', trend: 'up', icon: <UserPlus />, color: '#8b5cf6' },
  ];

  const roster = [
    { name: 'Dr. Emily Chen', id: '#4092', role: 'Senior Resident', ward: 'ICU - Wing A', time: '07:00 - 19:00', status: t('onDuty'), avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ' },
    { name: 'Mark Wilson', id: '#8821', role: 'Registered Nurse', ward: 'Emergency Room', time: '07:00 - 15:00', status: t('onDuty'), avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws' },
    { name: 'Sarah Jenkins', id: '#1029', role: 'Head Nurse', ward: 'Pediatrics', time: '08:00 - 16:00', status: t('onBreak'), avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApGTUr-2JUDaocl8Y6z1bdwAa962F0NzCJwoY4togNJJvl3VTVLmJu16eT_Q4umNaGQ58sAiZuiVqjTrhzKMHJpeiNEqGMykYo4BuVyw3jO9UcHCaKdGhW7_aDqypVWImG1KwHtSVbiSq8-5iAwyIAVu7m5LIKbgJJtx8dfpyijrmd8PPKrb2dZe_TVfHb1kFD_6zxhZlRL8MvZvLA6EytWPUyyF-UiyYQU9QPuHOSeANCWDaO6kEYFYGA-wqvo0rtRMlv5gcWW9w' },
    { name: 'Dr. James Lee', id: '#5591', role: 'Anesthesiologist', ward: 'Surgery - OR 2', time: '06:00 - 18:00', status: t('onDuty'), avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q' },
  ];

  const alerts = [
    { name: 'Dr. Emily Chen', type: t('urgent'), message: 'ACLS Certification expires in 3 days.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKc9s8rJgNc5Qit7AdgBkSWhKAlCOhEuIGVsdRbX9fNmMm9muy7WBCpFJRvypb47vTM2kQrMUrGWTjsXcbxoskObyQdRuo9Uw1Er9Y3Iogt8ceeFbDSVzzGi0bPIzHRpwgJJq0fMf4wdYZ4UdzxFYRDu0IlmC5rtTgQQ2AAef_Ic96_xSeTUGWyTVvIsqqYBL2WdJL-tqpETV9xnhn6fk0ia2xrDk11bgoIH07bgdDZGzMVdZIvqhyHsOCUBz2zFJCFq14Qt3_X0s' },
    { name: 'Mark Wilson', type: t('warning'), message: 'Flu Vaccination Record pending.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAAPp21oXCraZ_xQGP3lApo-veRHF4Evje3v21jZ-5uJbJF5iokhz2QPwwNXFI5dEfukUBqFNwokM1mgVS5Mh17Rkkd0tILwW4MetBsgroJ1zGff_hDKdxqy8U5r9fzLpDtqgskN6UvEtOWXfW32EohWMeT0r3LDYzAEfBLW03tt_ucvoEYChIYKg4cNzqPYEzKtyFtvqwOtuV9gdgWURC_j2RZWgQmC1e97d9ZQEj8VA6vD59jhLXOy20G3W04FMBHrR8sNz9GfI' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, spaceY: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mb: 4, position: 'relative', overflow: 'hidden', bgcolor: 'white' }}>
          <Box sx={{ 
            position: 'absolute', top: 0, right: 0, mt: -8, mr: -8, 
            width: 256, height: 256, bgcolor: 'primary.light', 
            borderRadius: '50%', filter: 'blur(64px)', opacity: 0.5 
          }} />
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>{t('welcome')}</Typography>
                <Typography variant="body1" color="text.secondary">
                  You have <Box component="span" sx={{ fontWeight: 600, color: 'warning.main' }}>3 {t('pendingCompliance')}</Box> and <Box component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>8 {t('openShiftsMsg')}</Box> {t('requireAttention')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Button variant="contained" startIcon={<Plus size={18} />} sx={{ px: 3, py: 1.2, width: { xs: '100%', md: 'auto' } }}>
                  Add New Shift
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ p: 1.5, bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2 }}>
                      {stat.icon}
                    </Box>
                    <Chip 
                      label={stat.change} 
                      size="small" 
                      icon={stat.trend === 'up' ? <TrendingUp size={14} /> : stat.trend === 'down' ? <TrendingDown size={14} /> : undefined}
                      sx={{ 
                        fontWeight: 700, 
                        bgcolor: stat.trend === 'up' ? 'success.light' : stat.trend === 'down' ? 'error.light' : 'grey.100',
                        color: stat.trend === 'up' ? 'success.main' : stat.trend === 'down' ? 'error.main' : 'text.secondary',
                        '& .MuiChip-icon': { color: 'inherit' }
                      }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.title}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={index === 0 ? 75 : index === 1 ? 25 : index === 2 ? 50 : 65} 
                      sx={{ 
                        height: 4, 
                        borderRadius: 2, 
                        bgcolor: 'grey.100',
                        '& .MuiLinearProgress-bar': { bgcolor: stat.color }
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('currentRoster')}</Typography>
              <Button size="small" sx={{ fontWeight: 600 }}>{t('viewAll')}</Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: 'grey.50' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Employee</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Ward/Unit</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roster.map((row) => (
                      <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={row.avatar} sx={{ width: 40, height: 40 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                              <Typography variant="caption" color="text.secondary">ID: {row.id}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: 14 }}>{row.role}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: 14 }}>{row.ward}</TableCell>
                        <TableCell sx={{ fontWeight: 500, fontSize: 14 }}>{row.time}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status} 
                            size="small" 
                            sx={{ 
                              fontWeight: 700, 
                              fontSize: 11,
                              bgcolor: row.status === t('onDuty') ? 'success.light' : 'warning.light',
                              color: row.status === t('onDuty') ? 'success.main' : 'warning.main',
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Mobile Roster List */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              {roster.map((row, idx) => (
                <Box key={row.id} sx={{ p: 2, borderBottom: idx < roster.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={row.avatar} sx={{ width: 36, height: 36 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{row.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.role}</Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: 10,
                        bgcolor: row.status === t('onDuty') ? 'success.light' : 'warning.light',
                        color: row.status === t('onDuty') ? 'success.main' : 'warning.main',
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">{row.ward}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{row.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('complianceAlerts')}</Typography>
                <Chip label="3 New" size="small" color="error" sx={{ height: 20, fontWeight: 700, fontSize: 10 }} />
              </Box>
            </Box>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {alerts.map((alert) => (
                <Box key={alert.name} sx={{ 
                  p: 2, borderRadius: 3, 
                  bgcolor: alert.type === t('urgent') ? 'error.light' : 'warning.light',
                  border: '1px solid',
                  borderColor: alert.type === t('urgent') ? 'error.main' : 'warning.main',
                  display: 'flex', gap: 2,
                  opacity: 0.8,
                  '&:hover': { opacity: 1 }
                }}>
                  <Avatar src={alert.avatar} sx={{ width: 32, height: 32 }} />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{alert.name}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: alert.type === t('urgent') ? 'error.main' : 'warning.main', textTransform: 'uppercase' }}>{alert.type}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{alert.message}</Typography>
                    <Button size="small" sx={{ p: 0, minWidth: 'auto', fontWeight: 700, fontSize: 11 }}>{t('sendReminder')}</Button>
                  </Box>
                </Box>
              ))}
              <Button fullWidth variant="text" sx={{ mt: 1, color: 'text.secondary', fontWeight: 600 }}>
                {t('viewAll')}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

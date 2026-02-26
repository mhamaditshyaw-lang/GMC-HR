import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, List, ListItem, ListItemText, Divider, LinearProgress, Button } from '@mui/material';
import { Calendar, Clock, Bell, Umbrella, Thermometer, MapPin, CalendarClock, AlertTriangle, ChevronRight, CreditCard, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      pb: { xs: 12, md: 4 },
      bgcolor: '#f8fafc',
      minHeight: '100%'
    }}>
      {/* App Header Section - Native App Style */}
      <Box sx={{ mb: 3, display: { xs: 'block', md: 'none' } }}>
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.04em', color: '#1e293b' }}>
          {t('welcome')}, Sarah
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
          Wednesday, Feb 25
        </Typography>
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={2.5}>
          {/* Expiration Alert - Mock Logic */}
          <Grid size={{ xs: 12 }}>
            <motion.div variants={itemVariants}>
              <Card sx={{ 
                bgcolor: '#fff7ed', 
                border: '1px solid #ffedd5', 
                borderRadius: 4,
                boxShadow: 'none'
              }}>
                <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, bgcolor: '#ffedd5', borderRadius: 2, color: '#f59e0b' }}>
                    <AlertTriangle size={20} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#9a3412' }}>
                      License Expiring Soon
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#c2410c', fontWeight: 500 }}>
                      Your Board Certification expires in 28 days. Please update it.
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="warning" 
                    sx={{ borderRadius: 2, fontWeight: 700, fontSize: 11 }}
                    onClick={() => navigate('/profile')}
                  >
                    Update
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Upcoming Shift Card - Native App Style */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Card sx={{ 
                borderRadius: 6, 
                border: 'none',
                boxShadow: '0 10px 25px -5px rgba(43, 124, 238, 0.15)',
                background: 'linear-gradient(135deg, #2b7cee 0%, #1e40af 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative Circle */}
                <Box sx={{ 
                  position: 'absolute', top: -20, right: -20, 
                  width: 120, height: 120, borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.1)', zIndex: 0 
                }} />
                
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 4 }}>
                      <CalendarClock size={24} />
                    </Box>
                    <Chip 
                      label="Upcoming" 
                      size="small" 
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: 10 }} 
                    />
                  </Box>
                  
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em' }}>
                    08:00 - 16:00
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 600, mb: 3 }}>
                    ICU - Ward 4A • Today
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Box sx={{ display: 'flex', ml: 1 }}>
                      {[1, 2, 3].map((i) => (
                        <Avatar 
                          key={i}
                          src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                          sx={{ 
                            width: 28, height: 28, 
                            border: '2px solid #2b7cee',
                            ml: i === 1 ? 0 : -1
                          }} 
                        />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
                      +4 colleagues on shift
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Quick Actions Grid - Native App Style */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              overflowX: 'auto', 
              pb: 1, 
              mx: { xs: -2, md: 0 }, 
              px: { xs: 2, md: 0 }, 
              scrollbarWidth: 'none', 
              '&::-webkit-scrollbar': { display: 'none' } 
            }}>
              {[
                { label: 'Clock In', icon: <Clock size={20} />, color: '#10b981', path: '/attendance' },
                { label: 'Swap Shift', icon: <Users size={20} />, color: '#f59e0b', path: '/roster' },
                { label: 'Request Leave', icon: <Umbrella size={20} />, color: '#ef4444', path: '/leave' },
                { label: 'Payslip', icon: <CreditCard size={20} />, color: '#8b5cf6', path: '/payroll' }
              ].map((action) => (
                <Box 
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  sx={{ 
                    flexShrink: 0, 
                    width: 100, 
                    p: 2, 
                    bgcolor: 'white', 
                    borderRadius: 5, 
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ 
                    width: 44, height: 44, borderRadius: 3, 
                    bgcolor: `${action.color}15`, color: action.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 1
                  }}>
                    {action.icon}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', lineHeight: 1.2 }}>
                    {action.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Leave Balances - Native App Style */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div variants={itemVariants}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#475569', mb: 2, px: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                {t('leaveBalances')}
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: t('annualLeave'), value: 12, total: 20, color: '#2b7cee' },
                  { label: t('sickLeave'), value: 5, total: 10, color: '#ef4444' }
                ].map((leave) => (
                  <Grid size={{ xs: 6 }} key={leave.label}>
                    <Card sx={{ borderRadius: 5, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 1 }}>
                          {leave.label}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1.5 }}>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: leave.color }}>{leave.value}</Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>/ {leave.total} days</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(leave.value / leave.total) * 100} 
                          sx={{ 
                            height: 6, borderRadius: 3, bgcolor: `${leave.color}15`,
                            '& .MuiLinearProgress-bar': { bgcolor: leave.color, borderRadius: 3 }
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* Announcements - Native App Style */}
          <Grid size={{ xs: 12 }}>
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: 1 }}>
                  {t('announcements')}
                </Typography>
                <Button size="small" sx={{ fontWeight: 700, color: '#2b7cee' }}>{t('viewAll')}</Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { title: 'New Safety Protocols', date: '2h ago', type: 'Urgent' },
                  { title: 'Staff Cafeteria Update', date: '5h ago', type: 'Info' }
                ].map((item, i) => (
                  <Box key={i} sx={{ 
                    p: 2, bgcolor: 'white', borderRadius: 5, 
                    display: 'flex', alignItems: 'center', gap: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    cursor: 'pointer'
                  }}>
                    <Box sx={{ 
                      width: 40, height: 40, borderRadius: 2.5, 
                      bgcolor: item.type === 'Urgent' ? '#fee2e2' : '#e0f2fe',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <AlertTriangle size={20} color={item.type === 'Urgent' ? '#ef4444' : '#2b7cee'} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{item.title}</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>{item.date}</Typography>
                    </Box>
                    <ChevronRight size={18} color="#cbd5e1" />
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}

import React, { useState, useRef } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, Avatar, Chip, LinearProgress, IconButton, Paper } from '@mui/material';
import { Users, CalendarClock, AlertTriangle, UserPlus, TrendingUp, TrendingDown, Plus, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeave } from '../contexts/LeaveContext';
import { useThemeMode } from '../contexts/ThemeContext';

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

// Magnetic Button Component
const MagneticButton = ({ children, onClick, variant = 'contained', startIcon, sx, fullWidth }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        variant={variant} 
        startIcon={startIcon} 
        onClick={onClick}
        fullWidth={fullWidth}
        sx={{
          ...sx,
          position: 'relative',
          overflow: 'hidden',
          '&::before': variant === 'contained' ? {
            content: '""',
            position: 'absolute',
            top: 0, left: '-100%', width: '200%', height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0))',
            transition: 'all 0.5s ease',
          } : {},
          '&:hover::before': variant === 'contained' ? {
            left: '100%'
          } : {}
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Animated Icon Component
const AnimatedIcon = ({ icon: Icon, color, delay = 0 }: any) => {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0.7 }}
      animate={{ scale: 1.15, opacity: 1 }}
      transition={{ 
        repeat: Infinity, 
        repeatType: 'reverse', 
        duration: 1.5, 
        delay,
        ease: 'easeInOut' 
      }}
      style={{ color, display: 'flex' }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

// Pulsing Chip Component
const PulsingChip = ({ label, status, mode }: any) => {
  const isSuccess = status === 'success';
  const isWarning = status === 'warning';
  
  const color = isSuccess ? 'success.main' : isWarning ? 'warning.main' : 'error.main';
  const bgColor = mode === 'light' ? (isSuccess ? '#10b98120' : isWarning ? '#f59e0b20' : '#ef444420') : (isSuccess ? '#10b98130' : isWarning ? '#f59e0b30' : '#ef444430');

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 0 0 ${isSuccess ? '#10b98140' : isWarning ? '#f59e0b40' : '#ef444440'}`,
          `0 0 0 6px ${isSuccess ? '#10b98100' : isWarning ? '#f59e0b00' : '#ef444400'}`
        ]
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut'
      }}
      style={{ borderRadius: 8 }}
    >
      <Chip 
        label={label} 
        size="small" 
        sx={{ 
          fontSize: '0.75rem',
          fontWeight: 600,
          bgcolor: bgColor,
          color: color,
          border: '1px solid',
          borderColor: mode === 'light' ? (isSuccess ? '#10b98140' : isWarning ? '#f59e0b40' : '#ef444440') : (isSuccess ? '#10b98160' : isWarning ? '#f59e0b60' : '#ef444460'),
        }} 
      />
    </motion.div>
  );
};

// Roster Row Component
const RosterRow = ({ row, mode, t }: any) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        p: 2, 
        alignItems: 'center',
        borderBottom: '1px solid', 
        borderColor: 'divider',
        transition: 'background-color 0.2s',
        fontFamily: '"Inter", sans-serif',
        '&:hover': {
          bgcolor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'
        },
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={row.avatar} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: '"Inter", sans-serif' }}>{row.name}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: '"Inter", sans-serif' }}>{row.role}</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif' }}>{row.ward}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>{row.time}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        {row.statusType === 'success' ? (
          <Chip 
            label={row.status} 
            size="small" 
            sx={{ 
              bgcolor: '#10b98120', 
              color: '#10b981', 
              fontWeight: 600,
              fontFamily: '"Inter", sans-serif',
              animation: 'heartbeat 1.5s infinite ease-in-out',
              border: '1px solid #10b98140'
            }} 
          />
        ) : (
          <Chip 
            label={row.status} 
            size="small" 
            sx={{ 
              bgcolor: '#f59e0b20', 
              color: '#f59e0b', 
              fontWeight: 600,
              fontFamily: '"Inter", sans-serif',
              border: '1px solid #f59e0b40'
            }} 
          />
        )}
      </Box>
    </Box>
  );
};

export default function Dashboard() {
  const { t } = useLanguage();
  const { leaveRequests } = useLeave();
  const { mode } = useThemeMode();
  
  const pendingLeavesCount = leaveRequests.filter(req => req.status === 'Pending Head' || req.status === 'Pending HR').length;

  const stats = [
    { title: t('activeStaff'), value: '142', change: '+5%', trend: 'up', icon: Users, color: '#6366f1' },
    { title: t('openShifts'), value: '8', change: '0%', trend: 'neutral', icon: CalendarClock, color: '#f59e0b' },
    { title: t('expiringLicenses'), value: '5', change: '-2%', trend: 'down', icon: AlertTriangle, color: '#ef4444' },
    { title: t('pendingLeave'), value: '3', change: '+3%', trend: 'up', icon: UserPlus, color: '#10b981' },
  ];

  const roster = [
    { id: '#4092', name: 'Dr. Emily Chen', role: 'Senior Resident', ward: 'ICU - Wing A', time: '07:00 - 19:00', status: t('onDuty'), statusType: 'success', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ' },
    { id: '#8821', name: 'Mark Wilson', role: 'Registered Nurse', ward: 'Emergency Room', time: '07:00 - 15:00', status: t('onDuty'), statusType: 'success', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws' },
    { id: '#1029', name: 'Sarah Jenkins', role: 'Head Nurse', ward: 'Pediatrics', time: '08:00 - 16:00', status: t('onBreak'), statusType: 'warning', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApGTUr-2JUDaocl8Y6z1bdwAa962F0NzCJwoY4togNJJvl3VTVLmJu16eT_Q4umNaGQ58sAiZuiVqjTrhzKMHJpeiNEqGMykYo4BuVyw3jO9UcHCaKdGhW7_aDqypVWImG1KwHtSVbiSq8-5iAwyIAVu7m5LIKbgJJtx8dfpyijrmd8PPKrb2dZe_TVfHb1kFD_6zxhZlRL8MvZvLA6EytWPUyyF-UiyYQU9QPuHOSeANCWDaO6kEYFYGA-wqvo0rtRMlv5gcWW9w' },
    { id: '#5591', name: 'Dr. James Lee', role: 'Anesthesiologist', ward: 'Surgery - OR 2', time: '06:00 - 18:00', status: t('onDuty'), statusType: 'success', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q' },
  ];

  const alerts = [
    { name: 'Dr. Emily Chen', type: t('urgent'), typeCode: 'error', message: 'ACLS Certification expires in 3 days.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKc9s8rJgNc5Qit7AdgBkSWhKAlCOhEuIGVsdRbX9fNmMm9muy7WBCpFJRvypb47vTM2kQrMUrGWTjsXcbxoskObyQdRuo9Uw1Er9Y3Iogt8ceeFbDSVzzGi0bPIzHRpwgJJq0fMf4wdYZ4UdzxFYRDu0IlmC5rtTgQQ2AAef_Ic96_xSeTUGWyTVvIsqqYBL2WdJL-tqpETV9xnhn6fk0ia2xrDk11bgoIH07bgdDZGzMVdZIvqhyHsOCUBz2zFJCFq14Qt3_X0s' },
    { name: 'Mark Wilson', type: t('warning'), typeCode: 'warning', message: 'Flu Vaccination Record pending.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAAPp21oXCraZ_xQGP3lApo-veRHF4Evje3v21jZ-5uJbJF5iokhz2QPwwNXFI5dEfukUBqFNwokM1mgVS5Mh17Rkkd0tILwW4MetBsgroJ1zGff_hDKdxqy8U5r9fzLpDtqgskN6UvEtOWXfW32EohWMeT0r3LDYzAEfBLW03tt_ucvoEYChIYKg4cNzqPYEzKtyFtvqwOtuV9gdgWURC_j2RZWgQmC1e97d9ZQEj8VA6vD59jhLXOy20G3W04FMBHrR8sNz9GfI' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card sx={{ 
          position: 'relative', 
          overflow: 'hidden',
          background: mode === 'light' 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)'
            : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: mode === 'light' ? '0 8px 32px rgba(0, 0, 0, 0.05)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}>
          <Box sx={{ 
            position: 'absolute', top: '-50%', right: '-10%', 
            width: '60%', height: '200%', 
            background: mode === 'light' 
              ? 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)', 
            transform: 'rotate(-15deg)',
            pointerEvents: 'none'
          }} />
          <CardContent sx={{ p: { xs: 3, md: 5 }, position: 'relative', zIndex: 1 }}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={4}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary', fontWeight: 800 }}>
                  {t('welcome')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.6 }}>
                  {t('youHave')} <Box component="span" sx={{ fontWeight: 600, color: '#f59e0b' }}>3 {t('complianceAlerts')}</Box> {t('and')} <Box component="span" sx={{ fontWeight: 600, color: '#6366f1' }}>8 {t('openShiftsMsg')}</Box> {t('today')}.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <MagneticButton variant="contained" startIcon={<Plus size={18} />} sx={{ px: 4, py: 1.5, width: { xs: '100%', md: 'auto' } }}>
                  {t('addNewShift')}
                </MagneticButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.title}>
              <motion.div variants={itemVariants} style={{ height: '100%' }}>
                <Paper elevation={0} sx={{ 
                  height: '100%', 
                  border: '1px solid',
                  borderColor: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
                  '&:hover': { 
                    transform: 'translateY(-6px)',
                    boxShadow: mode === 'light' 
                      ? '0 20px 40px rgba(0,0,0,0.08)' 
                      : '0 20px 40px rgba(0,0,0,0.4)',
                    borderColor: `${stat.color}40`
                  } 
                }}>
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        bgcolor: mode === 'light' ? `${stat.color}15` : `${stat.color}25`, 
                        borderRadius: 3, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        border: `1px solid ${stat.color}30`
                      }}>
                        <AnimatedIcon icon={stat.icon} color={stat.color} delay={index * 0.2} />
                      </Box>
                      <Chip 
                        label={stat.change} 
                        size="small" 
                        icon={stat.trend === 'up' ? <TrendingUp size={14} /> : stat.trend === 'down' ? <TrendingDown size={14} /> : undefined}
                        sx={{ 
                          fontWeight: 600, 
                          bgcolor: stat.trend === 'up' ? '#10b98120' : stat.trend === 'down' ? '#ef444420' : 'rgba(148, 163, 184, 0.2)',
                          color: stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : 'text.secondary',
                          '& .MuiChip-icon': { color: 'inherit' },
                          border: 'none',
                          borderRadius: 2
                        }}
                      />
                    </Box>
                    <Typography variant="h2" sx={{ mb: 1, color: 'text.primary', fontSize: '2rem' }}>{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.title}</Typography>
                    <Box sx={{ mt: 3 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={index === 0 ? 75 : index === 1 ? 25 : index === 2 ? 50 : 65} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3, 
                          bgcolor: mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                          '& .MuiLinearProgress-bar': { 
                            bgcolor: stat.color, 
                            borderRadius: 3,
                            backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s infinite linear',
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%' }}
          >
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4">{t('currentRoster')}</Typography>
              <MagneticButton variant="outlined" sx={{ fontWeight: 500 }}>{t('viewAll')}</MagneticButton>
            </Box>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <Paper variant="outlined" sx={{ 
                borderRadius: 3, 
                overflow: 'hidden', 
                borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                fontFamily: '"Inter", sans-serif'
              }}>
                <Box sx={{ display: 'flex', p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}>
                  <Typography variant="caption" sx={{ flex: 2, fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em' }}>{t('employeeCol')}</Typography>
                  <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em' }}>{t('wardUnit').toUpperCase()}</Typography>
                  <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em' }}>{t('time').toUpperCase()}</Typography>
                  <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em' }}>{t('statusCol').toUpperCase()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {roster.map((row) => (
                    <motion.div key={row.id} variants={itemVariants}>
                      <RosterRow row={row} mode={mode} t={t} />
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </motion.div>
        </Grid>
        
        <Grid size={{ xs: 12, xl: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%' }}
          >
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4">{t('complianceAlerts')}</Typography>
                <Chip label={`3 ${t('new')}`} size="small" sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600, bgcolor: '#ef444420', color: '#ef4444', border: '1px solid #ef444440' }} />
              </Box>
            </Box>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {alerts.map((alert, index) => (
                <motion.div key={alert.name} variants={itemVariants}>
                  <Card sx={{ 
                    p: 2.5, 
                    borderRadius: 4, 
                    bgcolor: alert.typeCode === 'error' 
                      ? (mode === 'light' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.1)')
                      : (mode === 'light' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(245, 158, 11, 0.1)'),
                    border: '1px solid',
                    borderColor: alert.typeCode === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    display: 'flex', gap: 2,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    cursor: 'pointer',
                    '&:hover': { 
                      transform: 'translateY(-2px)',
                      boxShadow: mode === 'light' 
                        ? '0 12px 24px rgba(0,0,0,0.05)' 
                        : '0 12px 24px rgba(0,0,0,0.2)',
                      bgcolor: alert.typeCode === 'error' 
                        ? (mode === 'light' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.15)')
                        : (mode === 'light' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)'),
                    }
                  }}>
                    <Avatar src={alert.avatar} sx={{ width: 40, height: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 600 }}>{alert.name}</Typography>
                        <Typography variant="caption" sx={{ 
                          fontWeight: 700, 
                          color: alert.typeCode === 'error' ? '#ef4444' : '#f59e0b', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.05em' 
                        }}>
                          {alert.type}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ display: 'block', mb: 1.5, color: 'text.secondary' }}>{alert.message}</Typography>
                      <MagneticButton variant="text" sx={{ 
                        p: 0, 
                        minWidth: 'auto', 
                        fontSize: '0.8rem', 
                        color: alert.typeCode === 'error' ? '#ef4444' : '#f59e0b', 
                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } 
                      }}>
                        {t('sendReminder')}
                      </MagneticButton>
                    </Box>
                  </Card>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <MagneticButton fullWidth variant="outlined" sx={{ mt: 1, color: 'text.secondary', borderStyle: 'dashed' }}>
                  {t('viewAll')}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </Grid>
      </Grid>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes heartbeat {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </Box>
  );
}

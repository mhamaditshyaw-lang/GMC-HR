import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, Chip } from '@mui/material';
import { 
  LayoutDashboard, 
  Users, 
  Building2,
  CalendarDays, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Settings,
  LogOut,
  PlusCircle,
  Globe,
  Umbrella,
  User,
  Bot,
  PieChart
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useThemeMode } from '../contexts/ThemeContext';
import { TranslationKey } from '../i18n/translations';
import { UserRole } from '../types';

export default function Sidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { user, login } = useAuth();
  const { mode } = useThemeMode();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onMobileClose) onMobileClose();
  };

  const menuSections: { titleKey: TranslationKey; items: { text: string; key: TranslationKey; icon: React.ReactNode; path: string; roles: UserRole[] }[] }[] = [
    {
      titleKey: 'menuOverview',
      items: [
        { text: 'Dashboard', key: 'dashboard', icon: <LayoutDashboard size={20} />, path: '/', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
      ]
    },
    {
      titleKey: 'menuHR',
      items: [
        { text: 'Add Employee', key: 'addEmployee', icon: <PlusCircle size={20} />, path: '/staff/add', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER] },
        { text: 'Employee List', key: 'employeeList', icon: <Users size={20} />, path: '/staff', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER] },
        { text: 'Departments', key: 'departments', icon: <Building2 size={20} />, path: '/departments', roles: [UserRole.SUPER_ADMIN] },
      ]
    },
    {
      titleKey: 'menuOperations',
      items: [
        { text: 'Attendance', key: 'attendance', icon: <Clock size={20} />, path: '/attendance', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD] },
        { text: 'Automation', key: 'attendanceAutomation', icon: <Bot size={20} />, path: '/attendance/automation', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER] },
        { text: 'Schedules', key: 'schedules', icon: <CalendarDays size={20} />, path: '/roster', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
        { text: 'Leave Dashboard', key: 'leaveDashboard', icon: <PieChart size={20} />, path: '/leave-dashboard', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
        { text: 'Leave', key: 'applyLeave', icon: <Umbrella size={20} />, path: '/leave', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.STAFF, UserRole.DEPT_HEAD] },
      ]
    },
    {
      titleKey: 'menuFinance',
      items: [
        { text: 'Payroll', key: 'payroll', icon: <CreditCard size={20} />, path: '/payroll', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.STAFF] },
      ]
    },
    {
      titleKey: 'menuSystem',
      items: [
        { text: 'Profile', key: 'personalDetails', icon: <User size={20} />, path: '/profile', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
        { text: 'Settings', key: 'settings', icon: <Settings size={20} />, path: '/settings', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
        { text: 'Access Control', key: 'accessControl', icon: <ShieldCheck size={20} />, path: '/access-control', roles: [UserRole.SUPER_ADMIN] },
      ]
    }
  ];

  return (
    <Box sx={{ 
      width: { xs: 72, sm: 280 }, 
      borderRight: isRTL ? 'none' : '1px solid', 
      borderLeft: isRTL ? '1px solid' : 'none',
      borderColor: 'divider',
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(24, 24, 27, 0.8)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'width 0.3s ease'
    }}>
      <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        <Box sx={{ 
          bgcolor: 'primary.main', 
          p: 1.2, 
          borderRadius: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <PlusCircle size={24} strokeWidth={2.5} />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{t('hospitalName')}</Typography>
          <Typography variant="caption" color="text.secondary">{t('adminDashboard')}</Typography>
        </Box>
      </Box>

      <List sx={{ flex: 1, px: { xs: 1, sm: 2 }, mt: 2, overflowY: 'auto' }}>
        {menuSections.map((section, idx) => {
          const filteredItems = section.items.filter(item => user && item.roles.includes(user.role));
          if (filteredItems.length === 0) return null;

          return (
            <Box key={section.titleKey} sx={{ mb: 2 }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  px: { xs: 1, sm: 2 }, 
                  display: { xs: 'none', sm: 'block' }, 
                  fontWeight: 700, 
                  color: 'text.disabled',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  mb: 1
                }}
              >
                {t(section.titleKey)}
              </Typography>
              
              <Box sx={{ display: { xs: 'block', sm: 'none' }, px: 2, mb: 1 }}>
                {idx > 0 && <Divider />}
              </Box>
              
              {filteredItems.map((item) => (
                <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    onClick={() => handleNavigate(item.path)}
                    selected={location.pathname === item.path}
                    sx={{ 
                      borderRadius: 2,
                      justifyContent: { xs: 'center', sm: 'flex-start' },
                      px: { xs: 1, sm: 2 },
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '&:hover': { bgcolor: 'primary.dark' }
                      },
                      '&:hover': { bgcolor: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)' }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: { xs: 'auto', sm: 40 }, color: 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={t(item.key)} 
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: location.pathname === item.path ? 600 : 500 }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          );
        })}
      </List>

      <Box sx={{ p: { xs: 1, sm: 2 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ mb: 2, display: { xs: 'none', sm: 'flex' }, gap: 1, flexWrap: 'wrap' }}>
          {Object.values(UserRole).map((role) => (
            <Chip 
              key={role}
              label={role.split('_')[0]}
              size="small"
              onClick={() => login(role)}
              color={user?.role === role ? 'primary' : 'default'}
              sx={{ fontSize: 10, cursor: 'pointer' }}
            />
          ))}
        </Box>

        <ListItemButton 
          onClick={() => setLanguage(language === 'en' ? 'ku' : 'en')}
          sx={{ 
            borderRadius: 2, 
            mb: 1, 
            bgcolor: 'action.hover', 
            justifyContent: { xs: 'center', sm: 'flex-start' }, 
            px: { xs: 1, sm: 2 },
            '&:hover': { bgcolor: 'action.selected' }
          }}
        >
          <ListItemIcon sx={{ minWidth: { xs: 'auto', sm: 40 }, color: 'text.secondary' }}>
            <Globe size={20} />
          </ListItemIcon>
          <ListItemText 
            primary={language === 'en' ? '☀️ کوردی' : '🇺🇸 EN'} 
            sx={{ display: { xs: 'none', sm: 'block' } }}
            primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} 
          />
        </ListItemButton>

        <Box sx={{ 
          p: { xs: 1, sm: 1.5 }, 
          borderRadius: 3, 
          bgcolor: 'action.hover', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          justifyContent: { xs: 'center', sm: 'flex-start' },
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Avatar 
            src={user?.avatar}
            sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 } }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' }, overflow: 'hidden' }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{user?.role.replace('_', ' ')}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

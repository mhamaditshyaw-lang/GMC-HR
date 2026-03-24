import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, Chip, IconButton, Collapse, Tooltip } from '@mui/material';
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
  PieChart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
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
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    menuOverview: true,
    menuHR: true,
    menuOperations: true,
    menuFinance: true,
    menuSystem: true,
  });

  const toggleSection = (sectionKey: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSections(prev => ({ ...prev, [sectionKey]: true }));
    } else {
      setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onMobileClose) onMobileClose();
  };

  const menuSections: { titleKey: TranslationKey; icon?: React.ReactNode; items: { text: string; key: TranslationKey; icon: React.ReactNode; path: string; roles: UserRole[] }[] }[] = [
    {
      titleKey: 'menuOverview',
      icon: <LayoutDashboard size={20} />,
      items: [
        { text: 'Dashboard', key: 'dashboard', icon: <LayoutDashboard size={20} />, path: '/', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
      ]
    },
    {
      titleKey: 'menuHR',
      icon: <Users size={20} />,
      items: [
        { text: 'Add Employee', key: 'addEmployee', icon: <PlusCircle size={20} />, path: '/staff/add', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER] },
        { text: 'Employee List', key: 'employeeList', icon: <Users size={20} />, path: '/staff', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER] },
        { text: 'Departments', key: 'departments', icon: <Building2 size={20} />, path: '/departments', roles: [UserRole.SUPER_ADMIN] },
      ]
    },
    {
      titleKey: 'menuOperations',
      icon: <Clock size={20} />,
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
      icon: <CreditCard size={20} />,
      items: [
        { text: 'Payroll', key: 'payroll', icon: <CreditCard size={20} />, path: '/payroll', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.STAFF] },
      ]
    },
    {
      titleKey: 'menuSystem',
      icon: <Settings size={20} />,
      items: [
        { text: 'Profile', key: 'personalDetails', icon: <User size={20} />, path: '/profile', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
        { text: 'Settings', key: 'settings', icon: <Settings size={20} />, path: '/settings', roles: [UserRole.SUPER_ADMIN, UserRole.HR_MANAGER, UserRole.DEPT_HEAD, UserRole.STAFF] },
        { text: 'Access Control', key: 'accessControl', icon: <ShieldCheck size={20} />, path: '/access-control', roles: [UserRole.SUPER_ADMIN] },
      ]
    }
  ];

  const sidebarWidth = isCollapsed ? 80 : 280;

  return (
    <Box sx={{ 
      width: { xs: 280, sm: sidebarWidth }, 
      borderRight: isRTL ? 'none' : '1px solid', 
      borderLeft: isRTL ? '1px solid' : 'none',
      borderColor: 'divider',
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(24, 24, 27, 0.8)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowX: 'hidden'
    }}>
      <Box sx={{ 
        p: { xs: 2, sm: isCollapsed ? 2 : 3 }, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        justifyContent: isCollapsed ? 'center' : 'space-between',
        position: 'relative'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            p: 1.2, 
            borderRadius: 3, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: 40
          }}>
            <PlusCircle size={24} strokeWidth={2.5} />
          </Box>
          {!isCollapsed && (
            <Box sx={{ display: { xs: 'block', sm: 'block' }, whiteSpace: 'nowrap', opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.2s' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{t('hospitalName')}</Typography>
              <Typography variant="caption" color="text.secondary">{t('adminDashboard')}</Typography>
            </Box>
          )}
        </Box>
        
        {/* Collapse Toggle Button */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <IconButton 
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="small"
            sx={{ 
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': { bgcolor: 'action.hover' },
              position: isCollapsed ? 'absolute' : 'relative',
              ...(isRTL ? { left: isCollapsed ? -12 : 0 } : { right: isCollapsed ? -12 : 0 }),
              zIndex: 10
            }}
          >
            {isCollapsed ? (isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />) : (isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />)}
          </IconButton>
        </Box>
      </Box>

      <List sx={{ flex: 1, px: { xs: 1, sm: isCollapsed ? 1 : 2 }, mt: 2, overflowY: 'auto', overflowX: 'hidden' }}>
        {menuSections.map((section, idx) => {
          const filteredItems = section.items.filter(item => user && item.roles.includes(user.role));
          if (filteredItems.length === 0) return null;

          const isOpen = openSections[section.titleKey];

          return (
            <Box key={section.titleKey} sx={{ mb: 1 }}>
              {/* Section Header */}
              <ListItemButton 
                onClick={() => toggleSection(section.titleKey)}
                sx={{ 
                  px: { xs: 1, sm: isCollapsed ? 1 : 2 }, 
                  py: 1,
                  borderRadius: 2,
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  '&:hover': { bgcolor: 'transparent' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {isCollapsed && section.icon ? (
                    <Tooltip title={t(section.titleKey)} placement="right">
                      <ListItemIcon sx={{ minWidth: 'auto', color: 'text.disabled', justifyContent: 'center' }}>
                        {section.icon}
                      </ListItemIcon>
                    </Tooltip>
                  ) : null}
                  {!isCollapsed && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'text.disabled',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {t(section.titleKey)}
                    </Typography>
                  )}
                </Box>
                {!isCollapsed && (
                  <Box sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center' }}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Box>
                )}
              </ListItemButton>
              
              {/* Section Items */}
              <Collapse in={isCollapsed ? true : isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {filteredItems.map((item) => (
                    <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                      <Tooltip title={isCollapsed ? t(item.key) : ""} placement="right" disableHoverListener={!isCollapsed}>
                        <ListItemButton 
                          onClick={() => handleNavigate(item.path)}
                          selected={location.pathname === item.path}
                          sx={{ 
                            borderRadius: 2,
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                            px: { xs: 1, sm: isCollapsed ? 1 : 2 },
                            minHeight: 44,
                            '&.Mui-selected': {
                              bgcolor: 'primary.main',
                              color: 'white',
                              '& .MuiListItemIcon-root': { color: 'white' },
                              '&:hover': { bgcolor: 'primary.dark' }
                            },
                            '&:hover': { bgcolor: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)' }
                          }}
                        >
                          <ListItemIcon sx={{ 
                            minWidth: isCollapsed ? 'auto' : 40, 
                            color: 'text.secondary',
                            justifyContent: 'center'
                          }}>
                            {item.icon}
                          </ListItemIcon>
                          {!isCollapsed && (
                            <ListItemText 
                              primary={t(item.key)} 
                              sx={{ whiteSpace: 'nowrap' }}
                              primaryTypographyProps={{ variant: 'body2', fontWeight: location.pathname === item.path ? 600 : 500 }} 
                            />
                          )}
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>

      <Box sx={{ p: { xs: 1, sm: isCollapsed ? 1 : 2 }, borderTop: '1px solid', borderColor: 'divider' }}>
        {!isCollapsed && (
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
        )}

        <Tooltip title={isCollapsed ? (language === 'en' ? 'کوردی' : 'English') : ""} placement="right" disableHoverListener={!isCollapsed}>
          <ListItemButton 
            onClick={() => setLanguage(language === 'en' ? 'ku' : 'en')}
            sx={{ 
              borderRadius: 2, 
              mb: 1, 
              bgcolor: 'action.hover', 
              justifyContent: isCollapsed ? 'center' : 'flex-start', 
              px: { xs: 1, sm: isCollapsed ? 1 : 2 },
              minHeight: 44,
              '&:hover': { bgcolor: 'action.selected' }
            }}
          >
            <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : 40, color: 'text.secondary', justifyContent: 'center' }}>
              <Globe size={20} />
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText 
                primary={language === 'en' ? '☀️ کوردی' : '🇺🇸 EN'} 
                sx={{ whiteSpace: 'nowrap' }}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} 
              />
            )}
          </ListItemButton>
        </Tooltip>

        <Box sx={{ 
          p: { xs: 1, sm: isCollapsed ? 1 : 1.5 }, 
          borderRadius: 3, 
          bgcolor: 'action.hover', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          border: '1px solid',
          borderColor: 'divider',
          minHeight: isCollapsed ? 44 : 'auto'
        }}>
          <Avatar 
            src={user?.avatar}
            sx={{ width: { xs: 32, sm: 32 }, height: { xs: 32, sm: 32 } }}
          />
          {!isCollapsed && (
            <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>{user?.role.replace('_', ' ')}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

import React from 'react';
import { Box, Typography } from '@mui/material';
import { LayoutDashboard, CalendarDays, Umbrella, CreditCard, Clock, Users, Settings, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { motion } from 'motion/react';

import { useThemeMode } from '../contexts/ThemeContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { mode } = useThemeMode();

  const isStaff = user?.role === UserRole.STAFF;

  const navItems = isStaff ? [
    { label: t('dashboard'), icon: <LayoutDashboard size={22} />, path: '/', id: 0 },
    { label: t('schedules'), icon: <CalendarDays size={22} />, path: '/roster', id: 1 },
    { label: t('attendance'), icon: <Clock size={22} />, path: '/attendance', id: 2 },
    { label: t('applyLeave'), icon: <Umbrella size={22} />, path: '/leave', id: 3 },
    { label: t('settings'), icon: <Settings size={22} />, path: '/settings', id: 4 },
  ] : [
    { label: t('dashboard'), icon: <LayoutDashboard size={22} />, path: '/', id: 0 },
    { label: t('employeeList'), icon: <Users size={22} />, path: '/staff', id: 1 },
    { label: t('schedules'), icon: <CalendarDays size={22} />, path: '/roster', id: 2 },
    { label: t('payroll'), icon: <CreditCard size={22} />, path: '/payroll', id: 3 },
    { label: t('settings'), icon: <Settings size={22} />, path: '/settings', id: 4 },
  ];

  const activeIndex = navItems.findIndex(item => item.path === location.pathname);
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <Box sx={{ 
      display: isStaff ? 'block' : { xs: 'block', md: 'none' },
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2000,
      background: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(24, 24, 27, 0.8)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.05)',
      pb: 'env(safe-area-inset-bottom)',
    }}>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
        px: 1
      }}>
        {navItems.map((item, index) => {
          const isActive = safeActiveIndex === index;
          return (
            <Box
              key={item.id}
              onClick={() => navigate(item.path)}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                height: '100%',
                gap: 0.5,
                color: isActive ? 'primary.main' : 'text.secondary',
                transition: 'color 0.2s ease'
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '32px',
                    height: '3px',
                    backgroundColor: '#2b7cee',
                    borderRadius: '0 0 4px 4px',
                  }}
                />
              )}

              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 0.2,
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                {item.icon}
              </Box>

              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '10px', 
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.01em',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  maxWidth: '100%',
                  px: 0.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

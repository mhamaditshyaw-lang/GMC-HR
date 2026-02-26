import React, { useState } from 'react';
import { Box, Drawer, Typography, IconButton, Avatar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

import { useThemeMode } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function MainLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const isStaff = user?.role === UserRole.STAFF;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Desktop Sidebar - Hide for Staff to maintain mobile-app feel */}
      <Box sx={{ display: isStaff ? 'none' : { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: isStaff ? 'block' : { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        <Sidebar onMobileClose={() => setMobileOpen(false)} />
      </Drawer>

      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        pb: { xs: 8, md: isStaff ? 8 : 0 },
        height: '100vh',
        position: 'relative'
      }}>
        {/* Only show header for Admin, or on Desktop for Staff */}
        {!isStaff ? (
          <Header onMenuClick={handleDrawerToggle} />
        ) : (
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Header onMenuClick={handleDrawerToggle} />
          </Box>
        )}
        
        {/* Native-like Title Bar for Staff on Mobile */}
        {isStaff && (
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 2,
            height: 56,
            bgcolor: mode === 'light' ? 'white' : '#1e293b',
            borderBottom: mode === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1100
          }}>
            <IconButton size="small" onClick={() => navigate('/profile')}>
              <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: mode === 'light' ? 'text.primary' : 'white' }}>
              HCPA Staff
            </Typography>
            <IconButton size="small" onClick={toggleTheme} sx={{ color: mode === 'light' ? 'text.secondary' : 'white' }}>
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>
          </Box>
        )}

        <Box component="main" sx={{ 
          flex: 1, 
          overflowY: 'auto',
          bgcolor: isStaff ? '#f8fafc' : 'background.default',
          WebkitOverflowScrolling: 'touch'
        }}>
          <Outlet />
        </Box>
        <BottomNav />
      </Box>
    </Box>
  );
}

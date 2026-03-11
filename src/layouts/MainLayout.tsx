import React, { useState } from 'react';
import { Box, Drawer, Typography, IconButton, Avatar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { AnimatePresence, motion } from 'motion/react';

import { useThemeMode } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function MainLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();
  const isStaff = user?.role === UserRole.STAFF;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden', bgcolor: mode === 'dark' ? '#000000' : '#f8fafc' }}>
      {/* Premium Dark Mode Background Effects */}
      {mode === 'dark' && (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: '-20%',
              left: '-10%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
              filter: 'blur(100px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'fixed',
              bottom: '-20%',
              right: '-10%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
              filter: 'blur(120px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          {/* Subtle noise texture overlay */}
          <Box
            sx={{
              position: 'fixed',
              inset: 0,
              opacity: 0.03,
              zIndex: 0,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </>
      )}

      {/* Light Mode Background Effects */}
      {mode === 'light' && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            background: 'radial-gradient(circle at 15% 50%, rgba(147, 197, 253, 0.3), transparent 25%), radial-gradient(circle at 85% 30%, rgba(216, 180, 254, 0.3), transparent 50%), radial-gradient(circle at 50% 80%, rgba(167, 243, 208, 0.3), transparent 50%), #f8fafc',
            filter: 'blur(60px)',
            animation: 'mesh 15s ease-in-out infinite alternate',
            '@keyframes mesh': {
              '0%': { transform: 'scale(1)' },
              '100%': { transform: 'scale(1.1)' }
            },
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Desktop Sidebar - Hide for Staff to maintain mobile-app feel */}
      <Box sx={{ display: isStaff ? 'none' : { xs: 'none', md: 'block' }, zIndex: 10 }}>
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
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            background: mode === 'dark' ? 'rgba(24, 24, 27, 0.9)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(24px)',
            borderRight: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)'
          },
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
        position: 'relative',
        zIndex: 1
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
            background: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(24px)',
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
          WebkitOverflowScrolling: 'touch',
          p: { xs: 2, md: 4 }
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ height: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
        <BottomNav />
      </Box>
    </Box>
  );
}

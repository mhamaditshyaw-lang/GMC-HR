import React from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Badge, Avatar } from '@mui/material';
import { Search, Bell, Settings, HelpCircle, Menu, Sun, Moon } from 'lucide-react';
import { useThemeMode } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box sx={{ 
      height: 80, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      px: { xs: 2, md: 4 },
      position: 'sticky',
      top: 0,
      zIndex: 10,
      bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: mode === 'light' ? '1px solid rgba(226, 232, 240, 0.6)' : '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', maxWidth: { xs: 'none', md: 400 } }}>
        <IconButton 
          onClick={onMenuClick}
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary' }}
        >
          <Menu size={24} />
        </IconButton>
        
        <TextField
          fullWidth
          placeholder="Search..."
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#94a3b8" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Box sx={{ 
                  bgcolor: 'grey.100', 
                  px: 1, 
                  py: 0.2, 
                  borderRadius: 1, 
                  fontSize: 10, 
                  fontWeight: 700, 
                  color: 'text.secondary',
                  border: '1px solid #e2e8f0'
                }}>
                  ⌘K
                </Box>
              </InputAdornment>
            ),
            sx: { 
              borderRadius: 3, 
              bgcolor: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
            }
          }}
        />
        <Typography variant="h6" sx={{ display: { xs: 'block', sm: 'none' }, fontWeight: 700, color: 'primary.main' }}>HCPA</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="small" onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
          {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <Badge variant="dot" color="error" overlap="circular">
            <Bell size={20} />
          </Badge>
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <HelpCircle size={20} />
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <Settings size={20} />
        </IconButton>
      </Box>
    </Box>
  );
}

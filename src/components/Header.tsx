import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Badge, Avatar, Popover, List, ListItem, ListItemText, ListItemAvatar, Divider, Button, ListItemButton } from '@mui/material';
import { Search, Bell, Settings, HelpCircle, Menu, Sun, Moon, Info, AlertTriangle, CheckCircle, X, Clock } from 'lucide-react';
import { useThemeMode } from '../contexts/ThemeContext';
import { useNotifications, NotificationType } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { mode, toggleTheme } = useThemeMode();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'info': return <Info size={20} color="#3b82f6" />;
      case 'warning': return <AlertTriangle size={20} color="#f59e0b" />;
      case 'success': return <CheckCircle size={20} color="#10b981" />;
      case 'error': return <AlertTriangle size={20} color="#ef4444" />;
      default: return <Info size={20} />;
    }
  };

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
      background: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(24, 24, 27, 0.8)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.05)'
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
          placeholder={t('search')}
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
              bgcolor: 'background.paper',
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
        
        <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleClick}>
          <Badge badgeContent={unreadCount} color="error" max={99}>
            <Bell size={20} />
          </Badge>
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: { 
              width: 360, 
              maxHeight: 500, 
              mt: 1.5, 
              borderRadius: 3, 
              boxShadow: mode === 'light' ? '0px 4px 20px rgba(0,0,0,0.1)' : '0px 4px 20px rgba(0,0,0,0.4)',
              background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(24px)',
            }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight={700}>{t('notifications')}</Typography>
            {unreadCount > 0 && (
              <Button size="small" onClick={markAllAsRead} sx={{ fontSize: 12 }}>
                {t('markAllAsRead')}
              </Button>
            )}
          </Box>
          
          <List sx={{ p: 0 }}>
            {notifications.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                <Bell size={40} style={{ opacity: 0.2, marginBottom: 8 }} />
                <Typography variant="body2">{t('noNotifications')}</Typography>
              </Box>
            ) : (
              notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem 
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" size="small" onClick={(e) => { e.stopPropagation(); clearNotification(notification.id); }}>
                        <X size={14} />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton 
                      onClick={() => handleNotificationClick(notification.id, notification.link)}
                      sx={{ 
                        background: notification.read ? 'rgba(255, 255, 255, 0)' : 'action.hover',
                        borderLeft: notification.read ? '3px solid rgba(255, 255, 255, 0)' : '3px solid #3b82f6'
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: 'background.paper', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          boxShadow: 1
                        }}>
                          {getIcon(notification.type)}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                            {notification.title}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: 'block', mb: 0.5, fontSize: 13 }}
                            >
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                              <Clock size={12} />
                              <Typography variant="caption">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </Typography>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            )}
          </List>
        </Popover>

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

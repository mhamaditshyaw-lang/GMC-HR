import React from 'react';
import { Box, Card, Typography, Button, Avatar, Grid, useTheme } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, Users, Building2, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Login() {
  const { login } = useAuth();
  const theme = useTheme();
  const { t } = useLanguage();

  const ACCOUNTS = [
    {
      role: UserRole.SUPER_ADMIN,
      name: 'Alex Rivera',
      title: 'Super Admin',
      icon: <ShieldCheck size={28} />,
      color: '#6366f1'
    },
    {
      role: UserRole.HR_MANAGER,
      name: 'Sarah Jenkins',
      title: 'HR Manager',
      icon: <Users size={28} />,
      color: '#ec4899'
    },
    {
      role: UserRole.DEPT_HEAD,
      name: 'Dr. James Lee',
      title: 'Department Head',
      icon: <Building2 size={28} />,
      color: '#10b981'
    },
    {
      role: UserRole.STAFF,
      name: 'Mark Wilson',
      title: 'Staff Member',
      icon: <User size={28} />,
      color: '#f59e0b'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 3
    }}>
      <Card sx={{ p: { xs: 3, md: 5 }, maxWidth: 800, width: '100%', borderRadius: 4, boxShadow: theme.shadows[10] }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            {t('hospitalName')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select an account to continue
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {ACCOUNTS.map((account) => (
            <Grid size={{ xs: 12, sm: 6 }} key={account.role}>
              <Card 
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '2px solid transparent',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    borderColor: account.color,
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
                onClick={() => login(account.role)}
              >
                <Avatar sx={{ width: 64, height: 64, bgcolor: `${account.color}15`, color: account.color, mb: 2 }}>
                  {account.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {account.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {account.title}
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    color: account.color, 
                    borderColor: account.color,
                    fontWeight: 700,
                    '&:hover': {
                      borderColor: account.color,
                      bgcolor: `${account.color}10`
                    }
                  }}
                >
                  Log In
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}

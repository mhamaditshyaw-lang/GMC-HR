import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Switch, 
  FormControlLabel, 
  Button, 
  TextField, 
  Divider, 
  Avatar,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Camera,
  Save,
  Palette,
  Moon,
  Sun,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useThemeMode } from '../contexts/ThemeContext';

export default function Settings() {
  const { t } = useLanguage();
  const { mode, primaryColor, toggleTheme, setPrimaryColor } = useThemeMode();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const themes = [
    { id: 'blue', color: '#3b82f6', name: 'Blue' },
    { id: 'emerald', color: '#10b981', name: 'Emerald' },
    { id: 'violet', color: '#8b5cf6', name: 'Violet' },
    { id: 'amber', color: '#f59e0b', name: 'Amber' },
    { id: 'rose', color: '#f43f5e', name: 'Rose' },
  ];

  const handleSave = () => {
    setSnackbar({ open: true, message: t('saveChanges') + '...' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('settings')}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('manageAccountSettings')}
      </Typography>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div variants={itemVariants}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                    <Avatar 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9y7evbRG9tVWPoi7S7zwVW51A06Zao1MJIbU1l655XcK-J-cAPO1PWpj6EvqMB7tTAZ5S0hgA0yZfuIy_ARownrlKndSUNcQMerpqV-WeNksg0CXYFZ-ISq0znQbNrCUytV4Qc8V9CiBKzzR2hRAHjUz_5KnThE9By1qLdRUMjhKPrnkigznGlQJfjFxXWS6tAMScOgNy0m8nRPTXHLOEtByi5y2HZwi_fG6r54rGcrrRRbNAkZJXUVGQ74w8SfoakHk8LViDIbE"
                      sx={{ width: 100, height: 100, border: '4px solid #f1f5f9' }}
                    />
                    <IconButton 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        right: 0, 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <Camera size={16} />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Alex Rivera</Typography>
                  <Typography variant="body2" color="text.secondary">HR Director</Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    bgcolor: mode === 'light' ? 'primary.main' : 'primary.dark', 
                    color: 'white',
                    borderRadius: '12px 12px 0 0'
                  }}>
                    <User size={20} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{t('accountSettings')}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}>
                    <Palette size={20} color="#64748b" />
                    <Typography variant="body2">{t('languageSettings')}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div variants={itemVariants}>
              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>{t('generalSettings')}</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label={t('firstName')} defaultValue="Alex" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label={t('lastName')} defaultValue="Rivera" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label={t('emailAddress')} defaultValue="alex.rivera@medicore.com" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label={t('phoneNumber')} defaultValue="+1 (555) 000-0000" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>{t('languageSettings')}</Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>{t('mode') || 'Theme Mode'}</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant={mode === 'light' ? 'contained' : 'outlined'}
                        onClick={() => mode !== 'light' && toggleTheme()}
                        startIcon={<Sun size={18} />}
                        sx={{ flex: 1 }}
                      >
                        Light
                      </Button>
                      <Button
                        variant={mode === 'dark' ? 'contained' : 'outlined'}
                        onClick={() => mode !== 'dark' && toggleTheme()}
                        startIcon={<Moon size={18} />}
                        sx={{ flex: 1 }}
                      >
                        Dark
                      </Button>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>{t('primaryColor') || 'Primary Color'}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {themes.map((theme) => (
                        <Box
                          key={theme.id}
                          onClick={() => setPrimaryColor(theme.id as any)}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: theme.color,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid',
                            borderColor: primaryColor === theme.id ? 'primary.main' : 'transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          {primaryColor === theme.id && <Check size={24} color="white" />}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="text" color="inherit">{t('logout')}</Button>
                <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
                  {t('saveChanges')}
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

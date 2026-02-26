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
  Save
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
  const { t } = useLanguage();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

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
        Manage your account preferences and application settings.
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
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'primary.light', color: 'primary.main' }}>
                    <User size={20} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{t('accountSettings')}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}>
                    <Bell size={20} color="#64748b" />
                    <Typography variant="body2">{t('notificationSettings')}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}>
                    <Lock size={20} color="#64748b" />
                    <Typography variant="body2">{t('securitySettings')}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}>
                    <Globe size={20} color="#64748b" />
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
                      <TextField fullWidth label="First Name" defaultValue="Alex" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Last Name" defaultValue="Rivera" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Email Address" defaultValue="alex.rivera@medicore.com" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Phone Number" defaultValue="+1 (555) 000-0000" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>{t('notificationSettings')}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel 
                      control={<Switch defaultChecked />} 
                      label={t('emailNotifications')} 
                    />
                    <FormControlLabel 
                      control={<Switch defaultChecked />} 
                      label={t('pushNotifications')} 
                    />
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>{t('securitySettings')}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{t('twoFactorAuth')}</Typography>
                        <Typography variant="caption" color="text.secondary">Add an extra layer of security to your account.</Typography>
                      </Box>
                      <Switch />
                    </Box>
                    <Divider />
                    <Button variant="outlined" startIcon={<Lock size={18} />}>
                      {t('changePassword')}
                    </Button>
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

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
  Select, 
  MenuItem, 
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import { 
  Bot, 
  Clock, 
  Bell, 
  Zap, 
  Settings, 
  Save, 
  Play, 
  Pause,
  AlertTriangle,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AttendanceAutomation() {
  const { t } = useLanguage();
  const [autoCheckOut, setAutoCheckOut] = useState(true);
  const [overtimeRules, setOvertimeRules] = useState(true);
  const [lateNotifications, setLateNotifications] = useState(true);
  const [biometricSync, setBiometricSync] = useState(true);

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
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Bot size={32} color="#2563eb" />
            Attendance Automation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure automated rules, alerts, and device integrations for time tracking.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Save size={18} />}
          sx={{ px: 3, py: 1.2 }}
        >
          Save Configuration
        </Button>
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {/* Status Overview */}
          <Grid size={{ xs: 12 }}>
            <Card sx={{ bgcolor: 'primary.main', color: 'white', mb: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Automation Engine Status</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>System is currently active and processing rules.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    icon={<Zap size={14} fill="white" />} 
                    label="Active" 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} 
                  />
                  <Button variant="contained" color="inherit" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    View Logs
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Rules Configuration */}
          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div variants={itemVariants}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 2, color: 'primary.main' }}>
                      <Settings size={20} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Automation Rules</Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Auto Check-Out</Typography>
                          <Typography variant="caption" color="text.secondary">Automatically check out staff after 12 hours of inactivity.</Typography>
                        </Box>
                        <Switch checked={autoCheckOut} onChange={(e) => setAutoCheckOut(e.target.checked)} />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Overtime Calculation</Typography>
                          <Typography variant="caption" color="text.secondary">Automatically calculate and flag overtime hours exceeding 8 hours/day.</Typography>
                        </Box>
                        <Switch checked={overtimeRules} onChange={(e) => setOvertimeRules(e.target.checked)} />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Late Arrival Grace Period</Typography>
                            <Typography variant="caption" color="text.secondary">Set the allowed grace period before marking attendance as 'Late'.</Typography>
                          </Box>
                          <Chip label="15 Minutes" color="primary" size="small" />
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} alignItems="center">
                          <Grid size={{ xs: 8 }}>
                            <Typography variant="body2">Grace Period (Minutes)</Typography>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <TextField type="number" size="small" fullWidth defaultValue={15} />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Box sx={{ p: 1, bgcolor: 'warning.light', borderRadius: 2, color: 'warning.main' }}>
                      <Bell size={20} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Smart Alerts</Typography>
                  </Box>

                  <Grid container spacing={2}>
                     <Grid size={{ xs: 12 }}>
                      <FormControlLabel 
                        control={<Switch checked={lateNotifications} onChange={(e) => setLateNotifications(e.target.checked)} />} 
                        label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Notify Manager on Late Arrival (&gt;30 mins)</Typography>} 
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Send 'Missed Punch' Reminder to Staff</Typography>} 
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Alert HR on Consecutive Absences (3 days)</Typography>} 
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Integrations & Devices */}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div variants={itemVariants}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Box sx={{ p: 1, bgcolor: 'success.light', borderRadius: 2, color: 'success.main' }}>
                      <Smartphone size={20} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Device Sync</Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Biometric Terminals</Typography>
                      <Switch checked={biometricSync} onChange={(e) => setBiometricSync(e.target.checked)} size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                      Sync data from physical time clocks every 5 minutes.
                    </Typography>
                    
                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle2 size={14} color="#16a34a" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Main Entrance (ID: T-01)</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle2 size={14} color="#16a34a" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Staff Gate B (ID: T-02)</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AlertTriangle size={14} color="#ea580c" />
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'warning.main' }}>Warehouse (ID: T-03) - Offline</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Button variant="outlined" fullWidth startIcon={<Zap size={16} />}>
                    Force Sync Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Scheduled Jobs</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Clock size={16} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Daily Attendance Report</Typography>
                        <Typography variant="caption" color="text.secondary">Runs daily at 11:59 PM</Typography>
                      </Box>
                    </Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Bot size={16} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Shift Assignment Bot</Typography>
                        <Typography variant="caption" color="text.secondary">Runs weekly on Sunday</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}

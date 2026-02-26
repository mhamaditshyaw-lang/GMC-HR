import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  CircularProgress, 
  Alert, 
  Snackbar,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { 
  MapPin, 
  Wifi, 
  Clock, 
  LogIn, 
  LogOut, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle,
  History,
  Upload,
  FileText,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { calculateDistance, HOSPITAL_COORDS, ALLOWED_IPS } from '../../utils/geo';

export default function StaffAttendance() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [wifiStatus, setWifiStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [distance, setDistance] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Document Upload State
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [recentLogs, setRecentLogs] = useState([
    { date: 'Feb 24, 2026', in: '08:02 AM', out: '04:05 PM', status: 'On Time', hasDocument: false },
    { date: 'Feb 23, 2026', in: '07:55 AM', out: '04:10 PM', status: 'On Time', hasDocument: false },
    { date: 'Feb 22, 2026', in: '08:15 AM', out: '04:00 PM', status: 'Late', hasDocument: false },
    { date: 'Feb 21, 2026', in: '--:-- AM', out: '--:-- PM', status: 'Absent', hasDocument: false },
  ]);

  useEffect(() => {
    verifyAttendanceRequirements();
  }, []);

  const verifyAttendanceRequirements = async () => {
    setLoading(true);
    
    // 1. Verify Geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const dist = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            HOSPITAL_COORDS.latitude,
            HOSPITAL_COORDS.longitude
          );
          setDistance(dist);
          if (dist <= HOSPITAL_COORDS.radius) {
            setLocationStatus('success');
          } else {
            setLocationStatus('error');
          }
        },
        (error) => {
          console.error("Geo error:", error);
          setLocationStatus('error');
          setErrorMsg(t('locationRequired'));
        }
      );
    } else {
      setLocationStatus('error');
    }

    // 2. Verify IP/Wi-Fi (Simulated for Demo)
    // In a real app, this would be a backend call:
    // const res = await fetch('/api/attendance/verify-ip');
    // const { allowed } = await res.json();
    setTimeout(() => {
      setWifiStatus('success'); // Simulating success for demo
    }, 1500);

    setLoading(false);
  };

  const handleClockAction = () => {
    setIsClockedIn(!isClockedIn);
    setToastMessage(t('attendanceLogged'));
    setShowToast(true);
  };

  const handleOpenUploadDialog = (index: number) => {
    setSelectedLogIndex(index);
    setSelectedFile(null);
    setUploadDialogOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedLogIndex !== null && selectedFile) {
      const updatedLogs = [...recentLogs];
      updatedLogs[selectedLogIndex].hasDocument = true;
      setRecentLogs(updatedLogs);
      setUploadDialogOpen(false);
      setToastMessage('Supporting document uploaded successfully');
      setShowToast(true);
    }
  };

  const canClockIn = locationStatus === 'success' && wifiStatus === 'success';

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('attendance')}</Typography>
        <Typography variant="body1" color="text.secondary">Secure clock-in using geofencing and network verification.</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Status Cards */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Verification Status</Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Geofencing Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, bgcolor: locationStatus === 'success' ? 'success.light' : 'grey.100', borderRadius: 2 }}>
                      <MapPin size={20} color={locationStatus === 'success' ? '#10b981' : '#64748b'} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Geofencing</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {distance !== null ? `${Math.round(distance)}m from hospital` : t('verifyingLocation')}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={locationStatus === 'success' ? t('withinRange') : t('outOfRange')} 
                    size="small" 
                    color={locationStatus === 'success' ? 'success' : 'error'}
                    variant={locationStatus === 'success' ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 700, fontSize: 10 }}
                  />
                </Box>

                {/* Wi-Fi Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, bgcolor: wifiStatus === 'success' ? 'info.light' : 'grey.100', borderRadius: 2 }}>
                      <Wifi size={20} color={wifiStatus === 'success' ? '#0ea5e9' : '#64748b'} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{t('hospitalWifi')}</Typography>
                      <Typography variant="caption" color="text.secondary">IP: 192.168.1.45 (Verified)</Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={wifiStatus === 'success' ? t('connected') : t('notConnected')} 
                    size="small" 
                    color={wifiStatus === 'success' ? 'info' : 'error'}
                    variant={wifiStatus === 'success' ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 700, fontSize: 10 }}
                  />
                </Box>
              </Box>

              {(!canClockIn && !loading) && (
                <Alert severity="warning" sx={{ mt: 4, borderRadius: 3 }}>
                  {locationStatus !== 'success' ? t('locationRequired') : t('wifiRequired')}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Action Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            border: '1px solid rgba(226, 232, 240, 0.8)', 
            borderRadius: 6, 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Accent */}
            <Box sx={{ 
              position: 'absolute', 
              top: -40, 
              right: -40, 
              width: 160, 
              height: 160, 
              borderRadius: '50%', 
              bgcolor: isClockedIn ? 'rgba(239, 68, 68, 0.05)' : 'rgba(43, 124, 238, 0.05)',
              zIndex: 0
            }} />

            <CardContent sx={{ p: 4, textAlign: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
              <Box sx={{ mb: 4 }}>
                <motion.div
                  animate={{ 
                    scale: isClockedIn ? [1, 1.05, 1] : 1,
                    boxShadow: isClockedIn ? ['0 0 0px rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.3)', '0 0 0px rgba(239, 68, 68, 0)'] : 'none'
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    backgroundColor: isClockedIn ? '#fee2e2' : '#e0f2fe', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto',
                    marginBottom: '16px',
                    color: isClockedIn ? '#ef4444' : '#0ea5e9'
                  }}
                >
                  <Clock size={48} />
                </motion.div>
                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.04em', mb: 0.5 }}>
                  {isClockedIn ? '08:45:12' : '00:00:00'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isClockedIn ? 'Shift in Progress' : 'Ready to Clock In'}
                </Typography>
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                disabled={!canClockIn || loading}
                onClick={handleClockAction}
                startIcon={isClockedIn ? <LogOut size={20} /> : <LogIn size={20} />}
                color={isClockedIn ? 'error' : 'primary'}
                sx={{ 
                  py: 2.5, 
                  borderRadius: 4, 
                  fontWeight: 800, 
                  fontSize: 18,
                  boxShadow: isClockedIn ? '0 8px 16px rgba(239, 68, 68, 0.2)' : '0 8px 16px rgba(43, 124, 238, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isClockedIn ? '0 12px 20px rgba(239, 68, 68, 0.3)' : '0 12px 20px rgba(43, 124, 238, 0.3)',
                  },
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (isClockedIn ? t('clockOut') : t('clockIn'))}
              </Button>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<QrCode size={18} />} 
                  sx={{ borderRadius: 3, color: 'text.secondary', borderColor: 'divider' }}
                >
                  {t('scanQR')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Logs */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <History size={20} color="#2b7cee" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Attendance Logs</Typography>
            </Box>
            <Box sx={{ p: 0 }}>
              {recentLogs.map((log, idx) => (
                <Box key={idx} sx={{ p: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < recentLogs.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{log.date}</Typography>
                    <Typography variant="caption" color="text.secondary">In: {log.in} • Out: {log.out}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {(log.status === 'Late' || log.status === 'Absent') && (
                      log.hasDocument ? (
                        <Chip 
                          icon={<CheckCircle2 size={14} />} 
                          label="Doc Uploaded" 
                          size="small" 
                          color="success" 
                          variant="outlined" 
                          sx={{ fontSize: 10, fontWeight: 600, height: 24 }} 
                        />
                      ) : (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="primary" 
                          startIcon={<Upload size={14} />}
                          onClick={() => handleOpenUploadDialog(idx)}
                          sx={{ fontSize: 10, fontWeight: 600, py: 0, height: 24 }}
                        >
                          Upload Doc
                        </Button>
                      )
                    )}
                    <Chip 
                      label={log.status} 
                      size="small" 
                      color={log.status === 'On Time' ? 'success' : log.status === 'Late' ? 'warning' : 'error'}
                      sx={{ fontWeight: 700, fontSize: 10, minWidth: 60 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Upload Document</Typography>
          <IconButton onClick={() => setUploadDialogOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please upload a supporting document (e.g., medical certificate, transit delay proof) for your {selectedLogIndex !== null ? recentLogs[selectedLogIndex].status.toLowerCase() : ''} attendance on {selectedLogIndex !== null ? recentLogs[selectedLogIndex].date : ''}.
          </Typography>
          
          <Box 
            onClick={() => fileInputRef.current?.click()}
            sx={{ 
              p: 4, 
              border: '2px dashed', 
              borderColor: selectedFile ? 'primary.main' : '#e2e8f0',
              bgcolor: selectedFile ? 'primary.50' : 'grey.50',
              borderRadius: 3, 
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
            }}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {selectedFile ? (
              <Box>
                <FileText size={40} color="#2b7cee" style={{ margin: '0 auto', marginBottom: '12px' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', wordBreak: 'break-all' }}>
                  {selectedFile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>
            ) : (
              <Box>
                <Upload size={40} color="#94a3b8" style={{ margin: '0 auto', marginBottom: '12px' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                  Click to browse files
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PDF, JPG, PNG up to 5MB
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setUploadDialogOpen(false)} color="inherit" sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
          <Button 
            onClick={handleUploadSubmit} 
            variant="contained" 
            disabled={!selectedFile}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Submit Document
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={showToast} 
        autoHideDuration={3000} 
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

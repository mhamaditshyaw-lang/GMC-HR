import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Chip, TextField, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel, Menu, Alert } from '@mui/material';
import { Clock, Search, Filter, Download, Calendar, CheckCircle2, XCircle, AlertCircle, MoreHorizontal, X, Sun, Moon, MapPin, Upload, FileText, ChevronRight, QrCode } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { parse, isSameDay } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useThemeMode } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

// Magnetic Button Component
const MagneticButton = ({ children, onClick, variant = 'contained', startIcon, sx, fullWidth }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        variant={variant} 
        startIcon={startIcon} 
        onClick={onClick}
        fullWidth={fullWidth}
        sx={{
          ...sx,
          position: 'relative',
          overflow: 'hidden',
          '&::before': variant === 'contained' ? {
            content: '""',
            position: 'absolute',
            top: 0, left: '-100%', width: '200%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'all 0.5s ease',
          } : {},
          '&:hover::before': variant === 'contained' ? {
            left: '100%'
          } : {}
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Animated Icon Component
const AnimatedIcon = ({ icon: Icon, color, delay = 0 }: any) => {
  return (
    <motion.div
      initial={{ rotate: -10, scale: 0.9 }}
      animate={{ rotate: 10, scale: 1.1 }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, delay, ease: 'easeInOut' }}
      style={{ color, display: 'flex' }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

// Pulsing Chip Component
const PulsingChip = ({ label, status, mode }: any) => {
  const isSuccess = status === 'On Time';
  const isWarning = status === 'Late';
  const isAbsent = status === 'Absent';
  
  const color = isSuccess ? 'success.main' : isWarning ? 'warning.main' : isAbsent ? 'error.main' : 'primary.main';
  const hexColor = isSuccess ? '#10b981' : isWarning ? '#f59e0b' : isAbsent ? '#ef4444' : '#6366f1';
  const bgColor = mode === 'light' ? `${hexColor}20` : `${hexColor}30`;

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 0 0 ${hexColor}40`,
          `0 0 0 6px ${hexColor}00`
        ]
      }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      style={{ borderRadius: 8 }}
    >
      <Chip 
        label={label} 
        size="small" 
        sx={{ 
          fontSize: '0.75rem',
          fontWeight: 600,
          bgcolor: bgColor,
          color: color,
          border: '1px solid',
          borderColor: `${hexColor}40`,
        }} 
      />
    </motion.div>
  );
};

const attendanceData = [
  { id: 1, name: 'Dr. Emily Chen', role: 'Senior Resident', date: 'Oct 24, 2023', checkIn: '06:55 AM', checkOut: '07:05 PM', status: 'On Time', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ' },
  { id: 2, name: 'Mark Wilson', role: 'Registered Nurse', date: 'Oct 24, 2023', checkIn: '07:15 AM', checkOut: '03:10 PM', status: 'Late', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws' },
  { id: 3, name: 'Sarah Jenkins', role: 'Head Nurse', date: 'Oct 24, 2023', checkIn: '07:58 AM', checkOut: '04:05 PM', status: 'On Time', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApGTUr-2JUDaocl8Y6z1bdwAa962F0NzCJwoY4togNJJvl3VTVLmJu16eT_Q4umNaGQ58sAiZuiVqjTrhzKMHJpeiNEqGMykYo4BuVyw3jO9UcHCaKdGhW7_aDqypVWImG1KwHtSVbiSq8-5iAwyIAVu7m5LIKbgJJtx8dfpyijrmd8PPKrb2dZe_TVfHb1kFD_6zxhZlRL8MvZvLA6EytWPUyyF-UiyYQU9QPuHOSeANCWDaO6kEYFYGA-wqvo0rtRMlv5gcWW9w' },
  { id: 4, name: 'Dr. James Lee', role: 'Anesthesiologist', date: 'Oct 24, 2023', checkIn: '05:45 AM', checkOut: '06:15 PM', status: 'On Time', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q' },
  { id: 5, name: 'Linda Kim', role: 'Neurosurgeon', date: 'Oct 25, 2023', checkIn: '---', checkOut: '---', status: 'Absent', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjCCVVt3rMPxIyGeUqMzTyhvVHWF8N5edEwS1ARC08hOYFDTx3-ljAFDT1Bky6AvSog9mrYkpLXsOvQfRSG2xusEElCmD1ULuBfY7VnXVTTc_4O5A7uwQR4T8gZ6Wm-6tR7NC3svMb6rSfJphYLBUwR90nmDg6I5MfVSlm0m-GSM2CZ984NgWQjlHt-HmEQwtTHSpUpVgIsJj4ojvKRdhPze73QwvxHWp9Z9H9_sIapMUL2VXklLCKazbUA8JEa7B5icXwDDp-HA' },
];

const weeklyReportData = [
  { date: 'Oct 20, 2023', day: 'Sunday', checkIn: '---', checkOut: '---', hours: '0h 0m', status: 'Day Off' },
  { date: 'Oct 21, 2023', day: 'Monday', checkIn: '06:58 AM', checkOut: '07:02 PM', hours: '12h 4m', status: 'On Time' },
  { date: 'Oct 22, 2023', day: 'Tuesday', checkIn: '07:05 AM', checkOut: '07:10 PM', hours: '12h 5m', status: 'Late' },
  { date: 'Oct 23, 2023', day: 'Wednesday', checkIn: '06:50 AM', checkOut: '06:55 PM', hours: '12h 5m', status: 'On Time' },
  { date: 'Oct 24, 2023', day: 'Thursday', checkIn: '06:55 AM', checkOut: '07:05 PM', hours: '12h 10m', status: 'On Time' },
  { date: 'Oct 25, 2023', day: 'Friday', checkIn: '07:00 AM', checkOut: '07:00 PM', hours: '12h 0m', status: 'On Time' },
  { date: 'Oct 26, 2023', day: 'Saturday', checkIn: '07:10 AM', checkOut: '03:00 PM', hours: '7h 50m', status: 'Early Leave' },
];

export default function Attendance() {
  const { mode } = useThemeMode();
  const { t } = useLanguage();
  const [clockInOpen, setClockInOpen] = React.useState(false);
  const [shiftType, setShiftType] = React.useState('day');
  const [department, setDepartment] = React.useState('Emergency Room');
  const [qrScanning, setQrScanning] = React.useState(false);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (qrScanning && clockInOpen) {
      qrScannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      qrScannerRef.current.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(error => console.error("Failed to clear scanner", error));
      }
    };
  }, [qrScanning, clockInOpen]);

  function onScanSuccess(decodedText: string, decodedResult: any) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    
    if (decodedText.includes('HCPA-CLOCK')) {
      setQrScanning(false);
      setClockInOpen(false);
      alert('QR Code verified. Clock-in successful!');
    } else {
      alert('Invalid QR Code. Please scan the official hospital QR code.');
    }
  }

  function onScanFailure(error: any) {
    // console.warn(`Code scan error = ${error}`);
  }
  
  // Filter & Search State
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = React.useState('All');

  // Action Menu State
  const [actionAnchorEl, setActionAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [weeklyReportOpen, setWeeklyReportOpen] = React.useState(false);

  const stats = [
    { label: t('presentToday'), value: '128', icon: CheckCircle2, color: '#10b981' },
    { label: t('lateArrival'), value: '14', icon: AlertCircle, color: '#f59e0b' },
    { label: t('absent'), value: '6', icon: XCircle, color: '#ef4444' },
    { label: t('onLeave'), value: '8', icon: Calendar, color: '#6366f1' },
  ];

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    handleFilterClose();
  };

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
  };

  const handleViewOpen = () => {
    handleActionClose();
    setViewOpen(true);
  };

  const handleEditOpen = () => {
    handleActionClose();
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    handleActionClose();
    setDeleteOpen(true);
  };

  const handleWeeklyReportOpen = () => {
    handleActionClose();
    setWeeklyReportOpen(true);
  };

  const handleDownloadPDF = () => {
    if (!selectedRowId) return;
    
    const employee = attendanceData.find(r => r.id === selectedRowId);
    if (!employee) return;

    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text('Weekly Attendance Report', 14, 22);

    // Add Employee Info
    doc.setFontSize(12);
    doc.text(`Employee: ${employee.name}`, 14, 32);
    doc.text(`Role: ${employee.role}`, 14, 38);
    doc.text(`Period: Oct 20, 2023 - Oct 26, 2023`, 14, 44);

    // Add Summary Stats
    doc.text(`Total Hours: 68h 24m`, 14, 54);
    doc.text(`On Time: 5 Days`, 70, 54);
    doc.text(`Late: 1 Day`, 120, 54);

    // Add Table
    autoTable(doc, {
      startY: 60,
      head: [['Date', 'Day', 'Check In', 'Check Out', 'Total Hours', 'Status']],
      body: weeklyReportData.map(row => [
        row.date,
        row.day,
        row.checkIn,
        row.checkOut,
        row.hours,
        row.status
      ]),
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66] },
    });

    doc.save(`Attendance_Report_${employee.name.replace(/\s+/g, '_')}.pdf`);
  };

  const handleDialogClose = () => {
    setViewOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
    setWeeklyReportOpen(false);
    setSelectedRowId(null);
  };

  const filteredData = attendanceData.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          row.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    
    let matchesDate = true;
    if (selectedDate) {
      try {
        const rowDate = parse(row.date, 'MMM d, yyyy', new Date());
        const filterDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
        matchesDate = isSameDay(rowDate, filterDate);
      } catch (e) {
        console.error('Date parsing error', e);
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h1" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary' }}>{t('timeAttendance')}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>{t('trackAttendance')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MagneticButton variant="outlined" startIcon={<Download size={18} />}>{t('exportReport')}</MagneticButton>
            <MagneticButton variant="contained" startIcon={<Clock size={18} />} onClick={() => setClockInOpen(true)}>{t('clockIn')}</MagneticButton>
          </Box>
        </Box>
      </motion.div>

      {/* Clock In Modal */}
      <Dialog 
        open={clockInOpen} 
        onClose={() => setClockInOpen(false)}
        maxWidth="xs"
        fullWidth
        TransitionProps={{
          onEnter: (node) => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(40px) scale(0.95)';
          },
          onEntering: (node) => {
            node.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            node.style.opacity = '1';
            node.style.transform = 'translateY(0) scale(1)';
          },
          onExit: (node) => {
            node.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            node.style.opacity = '0';
            node.style.transform = 'translateY(40px) scale(0.95)';
          }
        }}
      >
        <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
          <IconButton onClick={() => setClockInOpen(false)} size="small" sx={{ color: 'text.secondary' }}><X size={20} /></IconButton>
        </Box>
        <DialogContent sx={{ textAlign: 'center', pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: mode === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.05)', color: 'text.primary', borderRadius: '50%' }}>
              <Clock size={24} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ mb: 1, color: 'text.primary', fontWeight: 700 }}>{t('startDailyShift')}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>{t('recordArrivalTime')}</Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={12}>
              <Box sx={{ 
                p: 2, 
                bgcolor: shiftType === 'day' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
                borderRadius: 4,
                border: '1px solid',
                borderColor: shiftType === 'day' ? 'warning.main' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 2
              }}>
                {shiftType === 'day' ? <Sun size={32} color="#f59e0b" /> : <Moon size={32} color="#6366f1" />}
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: shiftType === 'day' ? 'warning.dark' : 'primary.dark', lineHeight: 1.2 }}>
                    {shiftType === 'day' ? t('dayShift') : t('nightShift')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {shiftType === 'day' ? '08:00 AM - 08:00 PM' : '08:00 PM - 08:00 AM'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={6}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', display: 'block', mb: 1, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('department')}</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  sx={{ borderRadius: 2, textAlign: 'left' }}
                >
                  <MenuItem value="Emergency Room">Emergency Room</MenuItem>
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="ICU">ICU</MenuItem>
                  <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', display: 'block', mb: 1, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('shiftType')}</Typography>
              <ToggleButtonGroup
                value={shiftType}
                exclusive
                onChange={(_, val) => val && setShiftType(val)}
                fullWidth
                size="small"
                sx={{ height: 40 }}
              >
                <ToggleButton value="day" sx={{ borderRadius: '8px 0 0 8px', textTransform: 'none', gap: 1 }}>
                  <Sun size={14} /> {t('day')}
                </ToggleButton>
                <ToggleButton value="night" sx={{ borderRadius: '0 8px 8px 0', textTransform: 'none', gap: 1 }}>
                  <Moon size={14} /> {t('night')}
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          {qrScanning ? (
            <Box sx={{ mb: 4 }}>
              <Box id="qr-reader" sx={{ width: '100%', borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }} />
              <Button 
                onClick={() => setQrScanning(false)} 
                sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
                color="error"
              >
                Cancel Scanning
              </Button>
            </Box>
          ) : (
            <Box sx={{ position: 'relative', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box 
                  onClick={() => setClockInOpen(false)}
                  sx={{ 
                    width: 140, height: 140, borderRadius: '50%', 
                    background: mode === 'light' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    color: mode === 'light' ? 'white' : '#0f172a',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: mode === 'light' ? '0 12px 24px rgba(15, 23, 42, 0.2)' : '0 12px 24px rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s',
                  }}
                >
                  <Box sx={{ mb: 1 }}><Upload size={24} /></Box>
                  <Typography variant="button" sx={{ fontWeight: 700, letterSpacing: 1 }}>{t('clockInUpper')}</Typography>
                </Box>
              </motion.div>
              
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>OR</Typography>
              
              <Button 
                variant="outlined" 
                startIcon={<QrCode size={20} />}
                onClick={() => setQrScanning(true)}
                sx={{ borderRadius: 3, px: 4, py: 1, textTransform: 'none', fontWeight: 700 }}
              >
                Scan QR Code
              </Button>

              <Box sx={{ 
                position: 'absolute', bottom: 100, 
                bgcolor: mode === 'light' ? 'white' : '#1e293b', 
                border: '1px solid', borderColor: 'divider', 
                px: 2, py: 0.5, borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>08:00 AM</Typography>
              </Box>
            </Box>
          )}

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 4 }}>{t('autoTimestamp')}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <MapPin size={14} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>{t('mainCampus')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={() => setClockInOpen(false)} sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}>{t('cancel')}</Button>
              <Button variant="contained" onClick={() => setClockInOpen(false)} sx={{ borderRadius: 2, px: 3, textTransform: 'none', fontWeight: 600 }}>{t('confirmClockIn')}</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
              <motion.div variants={itemVariants} style={{ height: '100%' }}>
                <Card sx={{ 
                  height: '100%', 
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: mode === 'light' 
                      ? '0 20px 40px rgba(0,0,0,0.08)' 
                      : '0 20px 40px rgba(0,0,0,0.4)',
                    borderColor: `${stat.color}40`
                  } 
                }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      p: 1.5, 
                      bgcolor: mode === 'light' ? `${stat.color}15` : `${stat.color}25`, 
                      borderRadius: 3, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `1px solid ${stat.color}30`
                    }}>
                      <AnimatedIcon icon={stat.icon} color={stat.color} delay={index * 0.2} />
                    </Box>
                    <Box>
                      <Typography variant="h2" sx={{ color: 'text.primary', fontSize: '2rem' }}>{stat.value}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.label}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField 
            size="small" 
            placeholder={t('searchEmployee')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: 300 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#94a3b8" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ width: { xs: '100%', sm: 160 } }}
            InputLabelProps={{ shrink: true }}
          />
          <Button 
            variant={statusFilter === 'All' ? "outlined" : "contained"} 
            startIcon={<Filter size={18} />} 
            onClick={handleFilterClick}
            sx={{ height: 40 }}
          >
            {statusFilter === 'All' ? t('filters') : statusFilter === 'On Time' ? t('onTime') : statusFilter === 'Late' ? t('late') : t('absent')}
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: mode === 'light' ? '0 24px 48px rgba(0,0,0,0.1)' : '0 24px 48px rgba(0,0,0,0.4)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                backdropFilter: 'blur(24px)',
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
              }
            }}
          >
            <MenuItem onClick={() => handleStatusSelect('All')}>{t('allStatuses')}</MenuItem>
            <MenuItem onClick={() => handleStatusSelect('On Time')}>{t('onTime')}</MenuItem>
            <MenuItem onClick={() => handleStatusSelect('Late')}>{t('late')}</MenuItem>
            <MenuItem onClick={() => handleStatusSelect('Absent')}>{t('absent')}</MenuItem>
          </Menu>
          <Menu
            anchorEl={actionAnchorEl}
            open={Boolean(actionAnchorEl)}
            onClose={handleActionClose}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: mode === 'light' ? '0 24px 48px rgba(0,0,0,0.1)' : '0 24px 48px rgba(0,0,0,0.4)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                backdropFilter: 'blur(24px)',
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
              }
            }}
          >
            <MenuItem onClick={handleViewOpen}>{t('viewDetails')}</MenuItem>
            <MenuItem onClick={handleWeeklyReportOpen}>{t('viewWeeklyReport')}</MenuItem>
            <MenuItem onClick={handleEditOpen}>{t('editRecord')}</MenuItem>
            <MenuItem onClick={handleDeleteOpen} sx={{ color: 'error.main' }}>{t('delete')}</MenuItem>
          </Menu>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {filteredData.map((row, index) => (
            <motion.div key={row.id} variants={itemVariants}>
              <Card sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.01)',
                  boxShadow: mode === 'light' 
                    ? '0 12px 24px rgba(0,0,0,0.06)' 
                    : '0 12px 24px rgba(0,0,0,0.3)',
                  borderColor: mode === 'light' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.5)',
                  background: mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(30, 41, 59, 0.6)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: { xs: '100%', sm: 'auto' } }}>
                  <Avatar src={row.avatar} sx={{ width: 48, height: 48, border: `2px solid ${mode === 'light' ? '#fff' : '#1e293b'}`, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>{row.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 1 }}>
                      <span>{row.role}</span>
                      <span>•</span>
                      <span>{row.date}</span>
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, width: { xs: '100%', sm: 'auto' }, justifyContent: 'space-between' }}>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="caption" color="text.secondary" display="block">{t('checkIn')}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.checkIn}</Typography>
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="caption" color="text.secondary" display="block">{t('checkOut')}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.checkOut}</Typography>
                  </Box>
                  <Box sx={{ minWidth: 100, textAlign: 'right' }}>
                    <PulsingChip label={row.status === 'On Time' ? t('onTime') : row.status === 'Late' ? t('late') : t('absent')} status={row.status} mode={mode} />
                  </Box>
                  <IconButton size="small" onClick={(e) => handleActionClick(e, row.id)} sx={{ color: 'text.secondary' }}>
                    <MoreHorizontal size={20} />
                  </IconButton>
                </Box>
              </Card>
            </motion.div>
          ))}
          {filteredData.length === 0 && (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">{t('noRecordsFound')}</Typography>
            </Box>
          )}
        </motion.div>
      </motion.div>
    </Box>
  );
}

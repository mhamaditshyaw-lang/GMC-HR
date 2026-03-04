import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import { Clock, Search, Filter, Download, Calendar, CheckCircle2, XCircle, AlertCircle, MoreHorizontal, X, Sun, Moon, MapPin, Upload, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel, Menu } from '@mui/material';
import { parse, isSameDay } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

const stats = [
  { label: 'Present Today', value: '128', icon: <CheckCircle2 size={20} />, color: 'success.main' },
  { label: 'Late Arrival', value: '14', icon: <AlertCircle size={20} />, color: 'warning.main' },
  { label: 'Absent', value: '6', icon: <XCircle size={20} />, color: 'error.main' },
  { label: 'On Leave', value: '8', icon: <Calendar size={20} />, color: 'primary.main' },
];

export default function Attendance() {
  const [clockInOpen, setClockInOpen] = React.useState(false);
  const [shiftType, setShiftType] = React.useState('day');
  const [department, setDepartment] = React.useState('Emergency Room');
  
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
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Time & Attendance</Typography>
          <Typography variant="body1" color="text.secondary">Track staff clock-in/out times and daily attendance logs.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download size={18} />}>Export Report</Button>
          <Button variant="contained" startIcon={<Clock size={18} />} onClick={() => setClockInOpen(true)}>Clock In</Button>
        </Box>
      </Box>

      {/* Clock In Modal */}
      <Dialog 
        open={clockInOpen} 
        onClose={() => setClockInOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
          <IconButton onClick={() => setClockInOpen(false)} size="small"><X size={20} /></IconButton>
        </Box>
        <DialogContent sx={{ textAlign: 'center', pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: 'primary.light', color: 'primary.main', borderRadius: '50%' }}>
              <Clock size={24} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Start Daily Shift</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Please record your arrival time and select your assignment.</Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1, textAlign: 'left', textTransform: 'uppercase' }}>Department</Typography>
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
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1, textAlign: 'left', textTransform: 'uppercase' }}>Shift Type</Typography>
              <ToggleButtonGroup
                value={shiftType}
                exclusive
                onChange={(_, val) => val && setShiftType(val)}
                fullWidth
                size="small"
                sx={{ height: 40 }}
              >
                <ToggleButton value="day" sx={{ borderRadius: '8px 0 0 8px', textTransform: 'none', gap: 1 }}>
                  <Sun size={14} /> Day
                </ToggleButton>
                <ToggleButton value="night" sx={{ borderRadius: '0 8px 8px 0', textTransform: 'none', gap: 1 }}>
                  <Moon size={14} /> Night
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <Box sx={{ position: 'relative', mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ 
              width: 140, height: 140, borderRadius: '50%', 
              bgcolor: 'primary.main', color: 'white',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 8px 16px rgba(43, 124, 238, 0.3)',
              '&:hover': { bgcolor: 'primary.dark' }
            }}>
              <Box sx={{ mb: 1 }}><Upload size={24} /></Box>
              <Typography variant="button" sx={{ fontWeight: 800, letterSpacing: 1 }}>CLOCK IN</Typography>
            </Box>
            <Box sx={{ 
              position: 'absolute', bottom: -10, 
              bgcolor: 'white', border: '1px solid #e2e8f0', 
              px: 2, py: 0.5, borderRadius: 4,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>08:00 AM</Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 4 }}>Automatic timestamp will be recorded</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <MapPin size={14} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>Main Hospital Campus</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={() => setClockInOpen(false)} sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
              <Button variant="contained" onClick={() => setClockInOpen(false)} sx={{ borderRadius: 2, px: 3, textTransform: 'none', fontWeight: 700 }}>Confirm Clock In</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, bgcolor: `${stat.color.split('.')[0]}.light`, color: stat.color, borderRadius: 2, display: 'flex' }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField 
            size="small" 
            placeholder="Search employee..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
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
            sx={{ width: 160 }}
            InputLabelProps={{ shrink: true }}
          />
          <Button 
            variant={statusFilter === 'All' ? "outlined" : "contained"} 
            startIcon={<Filter size={18} />} 
            size="small"
            onClick={handleFilterClick}
          >
            {statusFilter === 'All' ? 'Filters' : statusFilter}
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleStatusSelect('All')}>All Statuses</MenuItem>
            <MenuItem onClick={() => handleStatusSelect('On Time')}>On Time</MenuItem>
            <MenuItem onClick={() => handleStatusSelect('Late')}>Late</MenuItem>
            <MenuItem onClick={() => handleStatusSelect('Absent')}>Absent</MenuItem>
          </Menu>
          <Menu
            anchorEl={actionAnchorEl}
            open={Boolean(actionAnchorEl)}
            onClose={handleActionClose}
          >
            <MenuItem onClick={handleViewOpen}>View Details</MenuItem>
            <MenuItem onClick={handleWeeklyReportOpen}>View Weekly Report</MenuItem>
            <MenuItem onClick={handleEditOpen}>Edit Record</MenuItem>
            <MenuItem onClick={handleDeleteOpen} sx={{ color: 'error.main' }}>Delete</MenuItem>
          </Menu>

          {/* Weekly Report Dialog */}
          <Dialog open={weeklyReportOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Calendar size={24} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Weekly Attendance Report</Typography>
                  <Typography variant="caption" color="text.secondary">Oct 20, 2023 - Oct 26, 2023</Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              {selectedRowId && attendanceData.find(r => r.id === selectedRowId) && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Avatar src={attendanceData.find(r => r.id === selectedRowId)?.avatar} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{attendanceData.find(r => r.id === selectedRowId)?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{attendanceData.find(r => r.id === selectedRowId)?.role}</Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 3 }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">Total Hours</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>68h 24m</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">On Time</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>5 Days</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">Late</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>1 Day</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <TableContainer sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Day</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Check In</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Check Out</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Total Hours</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {weeklyReportData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.day}</TableCell>
                            <TableCell>{row.checkIn}</TableCell>
                            <TableCell>{row.checkOut}</TableCell>
                            <TableCell>{row.hours}</TableCell>
                            <TableCell>
                              <Chip 
                                label={row.status} 
                                size="small" 
                                sx={{ 
                                  fontSize: 11, fontWeight: 600,
                                  bgcolor: row.status === 'On Time' ? 'success.light' : row.status === 'Late' ? 'warning.light' : row.status === 'Day Off' ? 'grey.100' : 'error.light',
                                  color: row.status === 'On Time' ? 'success.main' : row.status === 'Late' ? 'warning.main' : row.status === 'Day Off' ? 'text.secondary' : 'error.main',
                                }} 
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<Download size={16} />} onClick={handleDownloadPDF}>Download PDF</Button>
            </DialogActions>
          </Dialog>

          {/* View Dialog */}
          <Dialog open={viewOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
            <DialogTitle>Attendance Details</DialogTitle>
            <DialogContent dividers>
              {selectedRowId && attendanceData.find(r => r.id === selectedRowId) && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar src={attendanceData.find(r => r.id === selectedRowId)?.avatar} sx={{ width: 64, height: 64 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{attendanceData.find(r => r.id === selectedRowId)?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{attendanceData.find(r => r.id === selectedRowId)?.role}</Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary">Date</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{attendanceData.find(r => r.id === selectedRowId)?.date}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary">Status</Typography>
                      <Chip 
                        label={attendanceData.find(r => r.id === selectedRowId)?.status} 
                        size="small" 
                        color={attendanceData.find(r => r.id === selectedRowId)?.status === 'On Time' ? 'success' : attendanceData.find(r => r.id === selectedRowId)?.status === 'Late' ? 'warning' : 'error'}
                        sx={{ fontWeight: 700, fontSize: 12 }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary">Check In</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{attendanceData.find(r => r.id === selectedRowId)?.checkIn}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary">Check Out</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{attendanceData.find(r => r.id === selectedRowId)?.checkOut}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={editOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Attendance Record</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={6}>
                  <TextField fullWidth label="Check In Time" defaultValue="08:00 AM" />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth label="Check Out Time" defaultValue="05:00 PM" />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" defaultValue="On Time">
                      <MenuItem value="On Time">On Time</MenuItem>
                      <MenuItem value="Late">Late</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button variant="contained" onClick={handleDialogClose}>Save Changes</Button>
            </DialogActions>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
            <DialogTitle>Delete Record?</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this attendance record? This action cannot be undone.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button variant="contained" color="error" onClick={handleDialogClose}>Delete</Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Date: <Box component="span" sx={{ color: 'text.primary' }}>Oct 24, 2023</Box></Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Check In</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Check Out</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={row.avatar} sx={{ width: 36, height: 36 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.role}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }}>{row.date}</TableCell>
                  <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>{row.checkIn}</TableCell>
                  <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>{row.checkOut}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: 11,
                        bgcolor: row.status === 'On Time' ? 'success.light' : row.status === 'Late' ? 'warning.light' : 'error.light',
                        color: row.status === 'On Time' ? 'success.main' : row.status === 'Late' ? 'warning.main' : 'error.main',
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => handleActionClick(e, row.id)}><MoreHorizontal size={18} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">No records found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

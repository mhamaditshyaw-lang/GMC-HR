import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import { Clock, Search, Filter, Download, Calendar, CheckCircle2, XCircle, AlertCircle, MoreHorizontal, X, Sun, Moon, MapPin, Upload, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const attendanceData = [
  { id: 1, name: 'Dr. Emily Chen', role: 'Senior Resident', date: 'Oct 24, 2023', checkIn: '06:55 AM', checkOut: '07:05 PM', status: 'On Time', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ' },
  { id: 2, name: 'Mark Wilson', role: 'Registered Nurse', date: 'Oct 24, 2023', checkIn: '07:15 AM', checkOut: '03:10 PM', status: 'Late', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws' },
  { id: 3, name: 'Sarah Jenkins', role: 'Head Nurse', date: 'Oct 24, 2023', checkIn: '07:58 AM', checkOut: '04:05 PM', status: 'On Time', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApGTUr-2JUDaocl8Y6z1bdwAa962F0NzCJwoY4togNJJvl3VTVLmJu16eT_Q4umNaGQ58sAiZuiVqjTrhzKMHJpeiNEqGMykYo4BuVyw3jO9UcHCaKdGhW7_aDqypVWImG1KwHtSVbiSq8-5iAwyIAVu7m5LIKbgJJtx8dfpyijrmd8PPKrb2dZe_TVfHb1kFD_6zxhZlRL8MvZvLA6EytWPUyyF-UiyYQU9QPuHOSeANCWDaO6kEYFYGA-wqvo0rtRMlv5gcWW9w' },
  { id: 4, name: 'Dr. James Lee', role: 'Anesthesiologist', date: 'Oct 24, 2023', checkIn: '05:45 AM', checkOut: '06:15 PM', status: 'On Time', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q' },
  { id: 5, name: 'Linda Kim', role: 'Neurosurgeon', date: 'Oct 24, 2023', checkIn: '---', checkOut: '---', status: 'Absent', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjCCVVt3rMPxIyGeUqMzTyhvVHWF8N5edEwS1ARC08hOYFDTx3-ljAFDT1Bky6AvSog9mrYkpLXsOvQfRSG2xusEElCmD1ULuBfY7VnXVTTc_4O5A7uwQR4T8gZ6Wm-6tR7NC3svMb6rSfJphYLBUwR90nmDg6I5MfVSlm0m-GSM2CZ984NgWQjlHt-HmEQwtTHSpUpVgIsJj4ojvKRdhPze73QwvxHWp9Z9H9_sIapMUL2VXklLCKazbUA8JEa7B5icXwDDp-HA' },
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
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#94a3b8" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" startIcon={<Filter size={18} />} size="small">Filters</Button>
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
              {attendanceData.map((row) => (
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
                    <IconButton size="small"><MoreHorizontal size={18} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

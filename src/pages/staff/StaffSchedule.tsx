import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Avatar, 
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField
} from '@mui/material';
import { Calendar as CalendarIcon, Repeat, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function StaffSchedule() {
  const { t } = useLanguage();
  const [swapOpen, setSwapOpen] = useState(false);

  const shifts = [
    { id: 1, date: 'Monday, Feb 24', time: '08:00 - 16:00', ward: 'Emergency', status: 'Confirmed' },
    { id: 2, date: 'Tuesday, Feb 25', time: '08:00 - 16:00', ward: 'Emergency', status: 'Confirmed' },
    { id: 3, date: 'Wednesday, Feb 26', time: '16:00 - 00:00', ward: 'ICU', status: 'Confirmed' },
    { id: 4, date: 'Thursday, Feb 27', time: 'OFF', ward: '-', status: 'Holiday' },
    { id: 5, date: 'Friday, Feb 28', time: '00:00 - 08:00', ward: 'ICU', status: 'Confirmed' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('schedules')}</Typography>
          <Typography variant="body1" color="text.secondary">Your upcoming shifts and duty assignments.</Typography>
        </Box>
        <Button variant="outlined" startIcon={<Repeat size={18} />} onClick={() => setSwapOpen(true)}>
          {t('requestSwap')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4 }}>
            <List sx={{ p: 0 }}>
              {shifts.map((shift, idx) => (
                <React.Fragment key={shift.id}>
                  <ListItem sx={{ py: 3, px: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                    <Box sx={{ minWidth: 140 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{shift.date}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                      <Box sx={{ p: 1, bgcolor: shift.time === 'OFF' ? 'grey.100' : 'primary.light', color: shift.time === 'OFF' ? 'grey.500' : 'primary.main', borderRadius: 2 }}>
                        <Clock size={18} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{shift.time}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MapPin size={12} /> {shift.ward}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip 
                      label={shift.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: 10,
                        bgcolor: shift.status === 'Confirmed' ? 'success.light' : 'grey.100',
                        color: shift.status === 'Confirmed' ? 'success.main' : 'grey.600'
                      }} 
                    />
                  </ListItem>
                  {idx < shifts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Shift Swap Dialog */}
      <Dialog open={swapOpen} onClose={() => setSwapOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{t('shiftSwap')}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField select fullWidth label="Select Your Shift to Swap">
              {shifts.filter(s => s.time !== 'OFF').map(s => (
                <MenuItem key={s.id} value={s.id}>{s.date} ({s.time})</MenuItem>
              ))}
            </TextField>
            
            <TextField select fullWidth label={t('selectColleague')}>
              <MenuItem value="1">Dr. Emily Chen (Emergency)</MenuItem>
              <MenuItem value="2">Mark Wilson (ICU)</MenuItem>
              <MenuItem value="3">Linda Kim (Neuro)</MenuItem>
            </TextField>

            <TextField fullWidth label={t('reason')} multiline rows={2} />
            
            <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 2, display: 'flex', gap: 1.5 }}>
              <AlertCircle size={20} color="#0284c7" />
              <Typography variant="caption" color="info.main">
                Your colleague must accept this request before it is sent to the Department Head for final approval.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setSwapOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={() => setSwapOpen(false)}>Send Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

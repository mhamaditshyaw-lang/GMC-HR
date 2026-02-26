import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Chip, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import { ChevronLeft, ChevronRight, Plus, Search, Bell, HelpCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = Array.from({ length: 28 }, (_, i) => i + 1);

const shifts = [
  { date: 1, type: 'Morning', name: 'S. Miller', color: '#0ea5e9' },
  { date: 2, type: 'Afternoon', name: 'Dr. Ray', color: '#f59e0b' },
  { date: 3, type: 'Night', name: 'A. Davis', color: '#2b7cee' },
  { date: 12, type: 'Morning', name: 'Dr. Sarah', color: '#0ea5e9', active: true },
  { date: 12, type: 'Afternoon', name: 'Nurse John', color: '#f59e0b', active: true },
  { date: 13, type: 'Night', name: 'Dr. Emily', color: '#2b7cee' },
  { date: 13, type: 'Morning', name: 'Tech Mike', color: '#0ea5e9' },
];

export default function ShiftRoster() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, height: { xs: 'auto', md: 'calc(100vh - 80px)' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ mb: { xs: 2, md: 4 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 }, width: { xs: '100%', sm: 'auto' }, justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>October 2023</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 2, p: 0.5, border: '1px solid #e2e8f0' }}>
              <IconButton size="small"><ChevronLeft size={18} /></IconButton>
              <IconButton size="small"><ChevronRight size={18} /></IconButton>
            </Box>
            <Button variant="outlined" size="small" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}>Today</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' }, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', bgcolor: 'grey.100', p: 0.5, borderRadius: 2, flex: { xs: 1, sm: 'none' } }}>
            <Button fullWidth size="small" sx={{ color: 'text.secondary' }}>Day</Button>
            <Button fullWidth size="small" sx={{ color: 'text.secondary' }}>Week</Button>
            <Button fullWidth size="small" variant="contained" sx={{ bgcolor: 'white', color: 'text.primary', '&:hover': { bgcolor: 'white' } }}>Month</Button>
          </Box>
          <Button variant="contained" startIcon={<Plus size={18} />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>Schedule Shift</Button>
        </Box>
      </Box>

      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: { xs: 400, md: 'auto' } }}>
        {/* Desktop Calendar Grid */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
          <Grid container sx={{ bgcolor: 'grey.50', borderBottom: '1px solid #e2e8f0' }}>
            {days.map(day => (
              <Grid size={12/7} key={day} sx={{ py: 1.5, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>{day}</Typography>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', bgcolor: '#f8fafc', height: '100%' }}>
            {Array.from({ length: 35 }).map((_, i) => {
              const date = i - 5; // Adjust for starting day
              const isCurrentMonth = date > 0 && date <= 31;
              const dayShifts = shifts.filter(s => s.date === date);
              const isToday = date === 12;

              return (
                <Box key={i} sx={{ 
                  p: 1, 
                  borderRight: '1px solid #e2e8f0', 
                  borderBottom: '1px solid #e2e8f0',
                  bgcolor: isToday ? 'primary.light' : isCurrentMonth ? 'white' : 'grey.50',
                  opacity: isCurrentMonth ? 1 : 0.5,
                  position: 'relative',
                  '&:hover': { bgcolor: isToday ? 'primary.light' : 'grey.50' }
                }}>
                  {isCurrentMonth && (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ 
                          fontWeight: 700, 
                          color: isToday ? 'primary.main' : 'text.secondary',
                          bgcolor: isToday ? 'white' : 'transparent',
                          width: 24, height: 24, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {date}
                        </Typography>
                        {isToday && <Chip label="Today" size="small" sx={{ height: 16, fontSize: 8, fontWeight: 800, bgcolor: 'white', color: 'primary.main', border: '1px solid #e2e8f0' }} />}
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {dayShifts.map((shift, idx) => (
                          <Box key={idx} sx={{ 
                            p: 0.5, px: 1, borderRadius: 1, 
                            bgcolor: shift.active ? 'white' : `${shift.color}15`,
                            border: '1px solid',
                            borderColor: shift.active ? '#e2e8f0' : `${shift.color}30`,
                            display: 'flex', alignItems: 'center', gap: 1,
                            boxShadow: shift.active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                          }}>
                            <Box sx={{ width: 3, height: 12, borderRadius: 1, bgcolor: shift.color }} />
                            <Typography variant="caption" noWrap sx={{ fontSize: 9, fontWeight: 700, color: 'text.primary' }}>{shift.name}</Typography>
                          </Box>
                        ))}
                        {date === 14 && (
                          <Box sx={{ 
                            p: 1, borderRadius: 1, border: '1px dashed #ef4444', bgcolor: '#fef2f2',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5
                          }}>
                            <AlertTriangle size={12} color="#ef4444" />
                            <Typography variant="caption" sx={{ fontSize: 8, fontWeight: 700, color: '#ef4444' }}>1 Unassigned</Typography>
                          </Box>
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Mobile Shift List */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Upcoming Shifts</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {shifts.map((shift, idx) => (
              <Box key={idx} sx={{ 
                p: 2, borderRadius: 3, bgcolor: 'white', border: '1px solid #f1f5f9',
                display: 'flex', alignItems: 'center', gap: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <Box sx={{ 
                  width: 48, height: 48, borderRadius: 2, bgcolor: `${shift.color}15`, 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: shift.color, lineHeight: 1 }}>{shift.date}</Typography>
                  <Typography variant="caption" sx={{ fontSize: 8, fontWeight: 700, color: shift.color, textTransform: 'uppercase' }}>Oct</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{shift.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{shift.type} Shift</Typography>
                </Box>
                <Chip label="Confirmed" size="small" sx={{ height: 20, fontSize: 9, fontWeight: 700, bgcolor: 'success.light', color: 'success.main' }} />
              </Box>
            ))}
          </Box>
          <Button fullWidth variant="contained" startIcon={<Plus size={18} />} sx={{ mt: 3, py: 1.5, borderRadius: 3 }}>
            Schedule New Shift
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

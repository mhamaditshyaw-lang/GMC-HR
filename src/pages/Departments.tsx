import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Chip, LinearProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import { Building2, Users, MoreVertical, Plus, TrendingUp, Stethoscope, Heart, Brain, Baby, Activity, X } from 'lucide-react';
import { motion } from 'motion/react';

const initialDepartments = [
  { 
    name: 'Cardiology', 
    head: 'Dr. Sarah Jenkins', 
    staffCount: 42, 
    occupancy: 85, 
    budget: '$1.2M', 
    icon: <Heart size={24} />, 
    color: '#ef4444',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8'
  },
  { 
    name: 'Neurology', 
    head: 'Dr. Linda Kim', 
    staffCount: 28, 
    occupancy: 72, 
    budget: '$950K', 
    icon: <Brain size={24} />, 
    color: '#8b5cf6',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjCCVVt3rMPxIyGeUqMzTyhvVHWF8N5edEwS1ARC08hOYFDTx3-ljAFDT1Bky6AvSog9mrYkpLXsOvQfRSG2xusEElCmD1ULuBfY7VnXVTTc_4O5A7uwQR4T8gZ6Wm-6tR7NC3svMb6rSfJphYLBUwR90nmDg6I5MfVSlm0m-GSM2CZ984NgWQjlHt-HmEQwtTHSpUpVgIsJj4ojvKRdhPze73QwvxHWp9Z9H9_sIapMUL2VXklLCKazbUA8JEa7B5icXwDDp-HA'
  },
  { 
    name: 'Pediatrics', 
    head: 'Dr. Marcus Ray', 
    staffCount: 35, 
    occupancy: 94, 
    budget: '$820K', 
    icon: <Baby size={24} />, 
    color: '#f59e0b',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGTXuSXu64yRsCq5WNHf1b-jXHbAEOyfQUh7YLvqRCzLiomW9i8NNT5fN7Cb2JDD1JsTgDEoX0cH8CzQ9Jq1U2gPF7yOFBsA1wAwgPmcasofj3wB_OL7MHmHYzs-TnBBhOZGOG33Ln4j0FR_aAqW1eob2WVNJbNwPTW961AutFOGPpQf3X10huxvPLasGhk70xDFoOI7OJUHDZz-Tjh5g1IJcu5_dwxslSkNjKVJ-XxjxRoJRn6YMzD5khKu3oa-Zu3ZXydpR7i4'
  },
  { 
    name: 'Emergency', 
    head: 'Dr. James Lee', 
    staffCount: 56, 
    occupancy: 98, 
    budget: '$2.1M', 
    icon: <Activity size={24} />, 
    color: '#ef4444',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q'
  },
];

const iconMap: { [key: string]: any } = {
  Heart: <Heart size={24} />,
  Brain: <Brain size={24} />,
  Baby: <Baby size={24} />,
  Activity: <Activity size={24} />,
  Stethoscope: <Stethoscope size={24} />,
  Building2: <Building2 size={24} />
};

export default function Departments() {
  const [depts, setDepts] = useState(initialDepartments);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [newDept, setNewDept] = useState({
    name: '',
    head: '',
    budget: '',
    icon: 'Stethoscope',
    color: '#2b7cee'
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewDept({ name: '', head: '', budget: '', icon: 'Stethoscope', color: '#2b7cee' });
  };

  const handleAdd = () => {
    if (newDept.name && newDept.head) {
      setDepts([...depts, {
        ...newDept,
        staffCount: 0,
        occupancy: 0,
        icon: iconMap[newDept.icon],
        avatar: `https://picsum.photos/seed/${newDept.name}/200`
      }]);
      setSnackbar({ open: true, message: `Department "${newDept.name}" created successfully!` });
      handleClose();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Departments</Typography>
          <Typography variant="body1" color="text.secondary">Overview of hospital units and departmental performance.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={18} />} 
          sx={{ px: 3, py: 1.2 }}
          onClick={handleOpen}
        >
          Add Department
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add New Department
          <IconButton onClick={handleClose} size="small"><X size={20} /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField 
                fullWidth 
                label="Department Name" 
                value={newDept.name}
                onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                fullWidth 
                label="Department Head" 
                value={newDept.head}
                onChange={(e) => setNewDept({ ...newDept, head: e.target.value })}
              />
            </Grid>
            <Grid size={6}>
              <TextField 
                fullWidth 
                label="Annual Budget" 
                placeholder="e.g. $1.5M"
                value={newDept.budget}
                onChange={(e) => setNewDept({ ...newDept, budget: e.target.value })}
              />
            </Grid>
            <Grid size={6}>
              <TextField 
                fullWidth 
                select 
                label="Icon" 
                value={newDept.icon}
                onChange={(e) => setNewDept({ ...newDept, icon: e.target.value })}
              >
                {Object.keys(iconMap).map((key) => (
                  <MenuItem key={key} value={key}>{key}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newDept.name || !newDept.head}>Create Department</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {depts.map((dept, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={dept.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card sx={{ 
                height: '100%', 
                position: 'relative',
                '&:hover': { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transform: 'translateY(-4px)', transition: '0.3s' }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ p: 1.5, bgcolor: `${dept.color}15`, color: dept.color, borderRadius: 3 }}>
                      {dept.icon}
                    </Box>
                    <IconButton size="small"><MoreVertical size={20} /></IconButton>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{dept.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Avatar src={dept.avatar} sx={{ width: 24, height: 24 }} />
                    <Typography variant="body2" color="text.secondary">Head: <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{dept.head}</Box></Typography>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Staff Count</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Users size={16} color="#64748b" />
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{dept.staffCount}</Typography>
                      </Box>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Annual Budget</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{dept.budget}</Typography>
                    </Grid>
                  </Grid>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>Unit Occupancy</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: dept.occupancy > 90 ? 'error.main' : 'primary.main' }}>{dept.occupancy}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={dept.occupancy} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3, 
                        bgcolor: 'grey.100',
                        '& .MuiLinearProgress-bar': { bgcolor: dept.occupancy > 90 ? 'error.main' : dept.color }
                      }} 
                    />
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center' }}>
                  <Button fullWidth variant="text" size="small" sx={{ fontWeight: 700 }}>View Details</Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

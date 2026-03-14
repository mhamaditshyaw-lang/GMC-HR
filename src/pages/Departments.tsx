import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, LinearProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Building2, Users, MoreVertical, Plus, Stethoscope, Heart, Brain, Baby, Activity, X } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../api/client';

const iconMap: { [key: string]: React.ReactNode } = {
  Heart: <Heart size={24} />,
  Brain: <Brain size={24} />,
  Baby: <Baby size={24} />,
  Activity: <Activity size={24} />,
  Stethoscope: <Stethoscope size={24} />,
  Building2: <Building2 size={24} />
};

export default function Departments() {
  const [depts, setDepts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [newDept, setNewDept] = useState({ name: '', head: '', budget: '', icon_name: 'Stethoscope', color: '#2b7cee' });
  const [saving, setSaving] = useState(false);

  const loadDepts = () =>
    api.departments.list().then(data => { setDepts(data); setLoading(false); }).catch(() => setLoading(false));

  useEffect(() => { loadDepts(); }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewDept({ name: '', head: '', budget: '', icon_name: 'Stethoscope', color: '#2b7cee' });
  };

  const handleAdd = async () => {
    if (!newDept.name || !newDept.head) return;
    setSaving(true);
    try {
      await api.departments.create({
        name: newDept.name,
        head: newDept.head,
        budget: newDept.budget,
        icon_name: newDept.icon_name,
        color: newDept.color,
        staff_count: 0,
        occupancy: 0,
        avatar: `https://picsum.photos/seed/${newDept.name}/200`,
      });
      await loadDepts();
      setSnackbar({ open: true, message: `Department "${newDept.name}" created successfully!`, severity: 'success' });
      handleClose();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to create department', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Departments</Typography>
          <Typography variant="body1" color="text.secondary">Overview of hospital units and departmental performance.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus size={18} />} sx={{ px: 3, py: 1.2 }} onClick={handleOpen}>
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
              <TextField fullWidth label="Department Name" value={newDept.name}
                onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} />
            </Grid>
            <Grid size={12}>
              <TextField fullWidth label="Department Head" value={newDept.head}
                onChange={(e) => setNewDept({ ...newDept, head: e.target.value })} />
            </Grid>
            <Grid size={6}>
              <TextField fullWidth label="Annual Budget" placeholder="e.g. $1.5M" value={newDept.budget}
                onChange={(e) => setNewDept({ ...newDept, budget: e.target.value })} />
            </Grid>
            <Grid size={6}>
              <TextField fullWidth select label="Icon" value={newDept.icon_name}
                onChange={(e) => setNewDept({ ...newDept, icon_name: e.target.value })}>
                {Object.keys(iconMap).map((key) => (
                  <MenuItem key={key} value={key}>{key}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newDept.name || !newDept.head || saving}>
            {saving ? 'Creating...' : 'Create Department'}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {depts.map((dept, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={dept.id}>
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
                      {iconMap[dept.icon_name] || <Building2 size={24} />}
                    </Box>
                    <IconButton size="small"><MoreVertical size={20} /></IconButton>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{dept.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Avatar src={dept.avatar} sx={{ width: 24, height: 24 }} />
                    <Typography variant="body2" color="text.secondary">
                      Head: <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{dept.head}</Box>
                    </Typography>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Staff Count</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Users size={16} color="#64748b" />
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{dept.staff_count}</Typography>
                      </Box>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Annual Budget</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{dept.budget || 'N/A'}</Typography>
                    </Grid>
                  </Grid>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>Unit Occupancy</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: dept.occupancy > 90 ? 'error.main' : 'primary.main' }}>
                        {dept.occupancy}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={dept.occupancy || 0}
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
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

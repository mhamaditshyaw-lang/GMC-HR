import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
  useTheme,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Plus, Edit2, Trash2, Clock, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Mock departments
const DEPARTMENTS = [
  'Cardiology',
  'Emergency',
  'Pediatrics',
  'Surgery',
  'ICU',
  'General',
  'Neurology',
  'Orthopedics'
];

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  departments: string[];
}

const INITIAL_SHIFTS: Shift[] = [
  { id: '1', name: 'Morning Shift', startTime: '08:00', endTime: '16:00', departments: ['Cardiology', 'Emergency', 'Pediatrics', 'General'] },
  { id: '2', name: 'Evening Shift', startTime: '16:00', endTime: '00:00', departments: ['Emergency', 'ICU', 'Surgery'] },
  { id: '3', name: 'Night Shift', startTime: '00:00', endTime: '08:00', departments: ['Emergency', 'ICU'] },
];

export default function ShiftManagement() {
  const { t } = useLanguage();
  const theme = useTheme();
  const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS);
  const [departmentsList, setDepartmentsList] = useState<string[]>(DEPARTMENTS);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Shift, 'id'>>({
    name: '',
    startTime: '',
    endTime: '',
    departments: []
  });

  const handleOpenDialog = (shift?: Shift) => {
    if (shift) {
      setEditingShift(shift);
      setFormData({
        name: shift.name,
        startTime: shift.startTime,
        endTime: shift.endTime,
        departments: shift.departments
      });
    } else {
      setEditingShift(null);
      setFormData({
        name: '',
        startTime: '',
        endTime: '',
        departments: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingShift(null);
  };

  const handleSaveShift = () => {
    if (editingShift) {
      setShifts(shifts.map(s => s.id === editingShift.id ? { ...formData, id: s.id } : s));
    } else {
      const newShift: Shift = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setShifts([...shifts, newShift]);
    }
    handleCloseDialog();
  };

  const handleDeleteShift = (id: string) => {
    setShifts(shifts.filter(s => s.id !== id));
  };

  const handleDepartmentChange = (event: SelectChangeEvent<typeof formData.departments>) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      departments: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleAddDepartment = () => {
    if (newDepartmentName.trim() && !departmentsList.includes(newDepartmentName.trim())) {
      setDepartmentsList([...departmentsList, newDepartmentName.trim()]);
      setNewDepartmentName('');
    }
  };

  const handleDeleteDepartment = (deptToDelete: string) => {
    setDepartmentsList(departmentsList.filter(d => d !== deptToDelete));
    // Also remove from any shifts that have it assigned
    setShifts(shifts.map(shift => ({
      ...shift,
      departments: shift.departments.filter(d => d !== deptToDelete)
    })));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={28} color={theme.palette.primary.main} />
            {t('shiftManagement')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage work shifts and assign them to departments
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<Building2 size={20} />}
            onClick={() => setIsAddingDepartment(true)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {t('manageDepartments')}
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Plus size={20} />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {t('addShift')}
          </Button>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: theme.shadows[2] }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('shiftName')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('startTime')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('endTime')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('assignedDepartments')}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{t('actionsCol')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">{t('noShifts')}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                shifts.map((shift) => (
                  <TableRow key={shift.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{shift.name}</TableCell>
                    <TableCell>
                      <Chip label={shift.startTime} size="small" sx={{ bgcolor: 'primary.50', color: 'primary.700', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={shift.endTime} size="small" sx={{ bgcolor: 'error.50', color: 'error.700', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {shift.departments.map((dept) => (
                          <Chip key={dept} label={dept} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpenDialog(shift)}>
                        <Edit2 size={18} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteShift(shift.id)}>
                        <Trash2 size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingShift ? t('editShift') : t('createShift')}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label={t('shiftName')}
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Morning Shift"
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label={t('startTime')}
                type="time"
                fullWidth
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }} // 5 min
              />
              <TextField
                label={t('endTime')}
                type="time"
                fullWidth
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }} // 5 min
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel id="departments-label">{t('assignedDepartments')}</InputLabel>
              <Select<string[]>
                labelId="departments-label"
                multiple
                value={formData.departments}
                onChange={handleDepartmentChange}
                input={<OutlinedInput label={t('assignedDepartments')} />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {departmentsList.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            {t('cancel')}
          </Button>
          <Button 
            onClick={handleSaveShift} 
            variant="contained"
            disabled={!formData.name || !formData.startTime || !formData.endTime || formData.departments.length === 0}
          >
            {editingShift ? t('saveChanges') : t('createShift')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAddingDepartment} onClose={() => { setIsAddingDepartment(false); setNewDepartmentName(''); }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {t('manageDepartments')}
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
            {departmentsList.map(dept => (
              <ListItem 
                key={dept} 
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => handleDeleteDepartment(dept)}>
                    <Trash2 size={18} />
                  </IconButton>
                }
                sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}
              >
                <ListItemText primary={dept} />
              </ListItem>
            ))}
            {departmentsList.length === 0 && (
              <ListItem>
                <ListItemText primary={t('noShifts')} sx={{ color: 'text.secondary', textAlign: 'center' }} />
              </ListItem>
            )}
          </List>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 3 }}>
            <TextField
              size="small"
              label={t('addDepartment')}
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddDepartment();
                }
              }}
            />
            <Button 
              onClick={handleAddDepartment} 
              variant="contained"
              disabled={!newDepartmentName.trim()}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {t('add')}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => { setIsAddingDepartment(false); setNewDepartmentName(''); }} color="inherit">
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Button, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Pagination, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Search, Plus, Filter, LayoutGrid, List as ListIcon, Heart, Stethoscope, Brain, Baby, MoreVertical, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const staffRows = [
  { id: 1, name: 'Dr. Sarah Jenkins', role: 'Doctor', dept: 'Cardiology', exp: '12 Yrs', status: 'Active', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: 2, name: 'James Wilson', role: 'Nurse', dept: 'ICU', exp: '4 Yrs', status: 'On Leave', avatar: 'https://picsum.photos/seed/james/100/100' },
  { id: 3, name: 'Emily Chen', role: 'Administrator', dept: 'Admin', exp: '2 Yrs', status: 'Active', avatar: 'https://picsum.photos/seed/emily/100/100' },
  { id: 4, name: 'Dr. Marcus Ray', role: 'Doctor', dept: 'Pediatrics', exp: '8 Yrs', status: 'Part-Time', avatar: 'https://picsum.photos/seed/marcus/100/100' },
  { id: 5, name: 'Dr. Linda Kim', role: 'Doctor', dept: 'Neurology', exp: '15 Yrs', status: 'Active', avatar: 'https://picsum.photos/seed/linda/100/100' },
  { id: 6, name: 'Robert Fox', role: 'Technician', dept: 'Pathology', exp: '5 Yrs', status: 'Suspended', avatar: 'https://picsum.photos/seed/robert/100/100' },
];

export default function StaffDirectory() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: t('name'), 
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src={params.row.avatar} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{params.value}</Typography>
        </Box>
      )
    },
    { field: 'role', headerName: t('role'), flex: 1 },
    { field: 'dept', headerName: t('department'), flex: 1 },
    { field: 'exp', headerName: t('experience'), width: 120 },
    { 
      field: 'status', 
      headerName: t('statusCol'), 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value === 'Active' ? t('active') : params.value === 'On Leave' ? t('onLeave') : params.value === 'Suspended' ? t('suspended') : t('partTime')} 
          size="small" 
          sx={{ 
            fontWeight: 700, 
            fontSize: 10, 
            bgcolor: params.value === 'Active' ? 'success.light' : params.value === 'On Leave' ? 'warning.light' : 'error.light',
            color: params.value === 'Active' ? 'success.main' : params.value === 'On Leave' ? 'warning.main' : 'error.main',
          }} 
        />
      )
    },
    {
      field: 'actions',
      headerName: t('actionsCol'),
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button 
          size="small" 
          variant="text" 
          sx={{ fontWeight: 700 }}
          onClick={() => navigate('/profile', { state: { staffMember: params.row } })}
        >
          {t('view')}
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>{t('staffDirectory')}</Typography>
          <Typography variant="body1" color="text.secondary">{t('manageStaffAccess')}</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={18} />} 
          sx={{ px: 3, py: 1.2, width: { xs: '100%', sm: 'auto' } }}
          onClick={() => navigate('/staff/add')}
        >
          {t('addNewEmployee')}
        </Button>
      </Box>

      <Box sx={{ mb: 4, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', gap: 1 }}>
        <Button 
          size="small" 
          variant={viewMode === 'grid' ? 'contained' : 'text'} 
          onClick={() => setViewMode('grid')}
          sx={{ color: viewMode === 'grid' ? 'white' : 'text.secondary' }}
        >
          <LayoutGrid size={20} />
        </Button>
        <Button 
          size="small" 
          variant={viewMode === 'list' ? 'contained' : 'text'} 
          onClick={() => setViewMode('list')}
          sx={{ color: viewMode === 'list' ? 'white' : 'text.secondary' }}
        >
          <ListIcon size={20} />
        </Button>
      </Box>

      {viewMode === 'list' ? (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Card sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={staffRows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: { showQuickFilter: true }
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          </Card>
        </Box>
      ) : null}

      {viewMode === 'grid' || (viewMode === 'list' && isMobile) ? (
        <Grid container spacing={3}>
          {staffRows.map((person, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={person.name}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card sx={{ 
                  textAlign: 'center', 
                  position: 'relative',
                  '&:hover': { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transform: 'translateY(-4px)', transition: '0.3s' }
                }}>
                  <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Chip 
                      label={person.status === 'Active' ? t('active') : person.status === 'On Leave' ? t('onLeave') : person.status === 'Suspended' ? t('suspended') : t('partTime')} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: 10, 
                        textTransform: 'uppercase',
                        bgcolor: person.status === 'Active' ? 'success.light' : person.status === 'On Leave' ? 'warning.light' : person.status === 'Suspended' ? 'error.light' : 'grey.100',
                        color: person.status === 'Active' ? 'success.main' : person.status === 'On Leave' ? 'warning.main' : person.status === 'Suspended' ? 'error.main' : 'text.secondary',
                      }} 
                    />
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar 
                      src={person.avatar} 
                      sx={{ width: 96, height: 96, mx: 'auto', mb: 2, border: '4px solid', borderColor: 'background.paper' }} 
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{person.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{person.role}</Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <Stethoscope size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{person.dept}</Typography>
                      </Box>
                      <Box sx={{ width: 4, height: 4, bgcolor: 'grey.300', borderRadius: '50%', alignSelf: 'center' }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <Clock size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{person.exp} Exp</Typography>
                      </Box>
                    </Box>

                    <Button 
                      fullWidth 
                      variant="outlined" 
                      sx={{ fontWeight: 700 }}
                      onClick={() => navigate('/profile', { state: { staffMember: person } })}
                    >
                      {t('viewProfile')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : null}

      {(viewMode === 'grid' || isMobile) && (
        <Box sx={{ mt: 6, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t('showing')} <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>1</Box> {t('to')} <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>6</Box> {t('of')} <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>248</Box> {t('results')}
          </Typography>
          <Pagination count={42} color="primary" shape="rounded" size="small" siblingCount={0} />
        </Box>
      )}
    </Box>
  );
}

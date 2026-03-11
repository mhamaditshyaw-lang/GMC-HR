import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  InputAdornment, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Download, 
  MoreVertical,
  Shield,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { format, isAfter, isBefore, addDays, parseISO } from 'date-fns';

// Mock Data
const mockLicenses = [
  {
    id: '1',
    employeeName: 'Dr. Sarah Jenkins',
    role: 'Senior Cardiologist',
    department: 'Cardiology',
    licenseType: 'Medical License',
    licenseNumber: 'MD-12345678',
    issueDate: '2020-05-15',
    expiryDate: '2025-05-15',
    status: 'Active',
  },
  {
    id: '2',
    employeeName: 'Nurse John Doe',
    role: 'Registered Nurse',
    department: 'Emergency',
    licenseType: 'Nursing License',
    licenseNumber: 'RN-87654321',
    issueDate: '2021-08-10',
    expiryDate: '2024-08-10', // Expiring soon relative to current date if we assume 2024
    status: 'Expiring Soon',
  },
  {
    id: '3',
    employeeName: 'Dr. Emily Chen',
    role: 'Pediatrician',
    department: 'Pediatrics',
    licenseType: 'Board Certification',
    licenseNumber: 'BC-11223344',
    issueDate: '2019-03-20',
    expiryDate: '2024-03-20',
    status: 'Expired',
  },
  {
    id: '4',
    employeeName: 'James Wilson',
    role: 'Radiology Tech',
    department: 'Radiology',
    licenseType: 'Radiation Safety',
    licenseNumber: 'RS-99887766',
    issueDate: '2022-01-15',
    expiryDate: '2025-01-15',
    status: 'Active',
  },
  {
    id: '5',
    employeeName: 'Maria Garcia',
    role: 'Head Nurse',
    department: 'ICU',
    licenseType: 'ACLS Certification',
    licenseNumber: 'ACLS-554433',
    issueDate: '2023-06-01',
    expiryDate: '2025-06-01',
    status: 'Active',
  },
];

const StatCard = ({ title, value, icon, color, subtitle }: any) => (
  <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Box sx={{ 
        p: 1.5, 
        borderRadius: 2, 
        bgcolor: `${color}15`, 
        color: color 
      }}>
        {icon}
      </Box>
    </Box>
    {subtitle && (
      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    )}
  </Paper>
);

export default function Compliance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter Logic
  const filteredLicenses = mockLicenses.filter(license => {
    const matchesSearch = license.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || license.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || license.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Stats Calculation
  const totalLicenses = mockLicenses.length;
  const expiringSoon = mockLicenses.filter(l => l.status === 'Expiring Soon').length;
  const expired = mockLicenses.filter(l => l.status === 'Expired').length;
  const compliantCount = mockLicenses.filter(l => l.status === 'Active').length;
  const complianceRate = Math.round((compliantCount / totalLicenses) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Compliance & Licenses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor staff certifications, licenses, and regulatory requirements.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<FileText size={18} />}>
          Add License
        </Button>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Overall Compliance" 
            value={`${complianceRate}%`} 
            icon={<Shield size={24} />} 
            color="#10b981"
            subtitle={`${compliantCount} of ${totalLicenses} licenses active`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Expiring Soon" 
            value={expiringSoon} 
            icon={<AlertCircle size={24} />} 
            color="#f59e0b"
            subtitle="Within next 30 days"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Expired" 
            value={expired} 
            icon={<AlertTriangle size={24} />} 
            color="#ef4444"
            subtitle="Action required immediately"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Total Licenses" 
            value={totalLicenses} 
            icon={<FileText size={24} />} 
            color="#3b82f6"
            subtitle="Across all departments"
          />
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search staff or license number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#94a3b8" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <MenuItem value="All">All Departments</MenuItem>
                <MenuItem value="Cardiology">Cardiology</MenuItem>
                <MenuItem value="Emergency">Emergency</MenuItem>
                <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                <MenuItem value="Radiology">Radiology</MenuItem>
                <MenuItem value="ICU">ICU</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" startIcon={<Filter size={18} />}>
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>License Type</TableCell>
              <TableCell>License Number</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLicenses.map((license) => (
              <TableRow key={license.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {license.employeeName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {license.role}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{license.licenseType}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {license.licenseNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={license.department} size="small" variant="outlined" />
                </TableCell>
                <TableCell>{format(parseISO(license.issueDate), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    color={license.status === 'Expired' ? 'error.main' : license.status === 'Expiring Soon' ? 'warning.main' : 'text.primary'}
                    fontWeight={license.status !== 'Active' ? 600 : 400}
                  >
                    {format(parseISO(license.expiryDate), 'MMM d, yyyy')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={license.status} 
                    color={getStatusColor(license.status) as any} 
                    size="small" 
                    icon={
                      license.status === 'Active' ? <CheckCircle size={14} /> : 
                      license.status === 'Expired' ? <AlertTriangle size={14} /> : 
                      <AlertCircle size={14} />
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <Download size={18} />
                  </IconButton>
                  <IconButton size="small">
                    <MoreVertical size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredLicenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, opacity: 0.5 }}>
                    <FileText size={48} />
                    <Typography variant="h6">No licenses found</Typography>
                    <Typography variant="body2">Try adjusting your search or filters</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

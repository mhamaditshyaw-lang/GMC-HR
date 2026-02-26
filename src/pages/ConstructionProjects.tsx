import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Fab, 
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material';
import { Plus, MoreVertical, Building2, HardHat, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const projectsData = [
  { id: 1, name: 'New Wing Expansion', client: 'HCPA Administration', budget: 5000000, spent: 3200000, progress: 64, status: 'On Track' },
  { id: 2, name: 'Emergency Room Renovation', client: 'Public Health Dept', budget: 1200000, spent: 1150000, progress: 95, status: 'Near Completion' },
  { id: 3, name: 'Solar Panel Installation', client: 'Green Energy Initiative', budget: 800000, spent: 200000, progress: 25, status: 'Early Stage' },
  { id: 4, name: 'Parking Lot Paving', client: 'HCPA Facilities', budget: 350000, spent: 350000, progress: 100, status: 'Completed' },
  { id: 5, name: 'Laboratory Upgrade', client: 'Medical Research Foundation', budget: 2500000, spent: 1800000, progress: 72, status: 'On Track' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ConstructionProjects() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Construction Projects</Typography>
        <Typography variant="body1" color="text.secondary">Track ongoing building and infrastructure projects at HCPA.</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: 'primary.light', color: 'primary.main', borderRadius: 3 }}>
                <Building2 size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Total Projects</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{projectsData.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: 'success.light', color: 'success.main', borderRadius: 3 }}>
                <TrendingUp size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Total Budget</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatCurrency(projectsData.reduce((acc, p) => acc + p.budget, 0))}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: 'warning.light', color: 'warning.main', borderRadius: 3 }}>
                <HardHat size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Active Workers</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>124</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Project Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Budget</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Spent</TableCell>
                <TableCell sx={{ fontWeight: 700, width: '25%' }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectsData.map((project) => (
                <TableRow key={project.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{project.name}</TableCell>
                  <TableCell color="text.secondary">{project.client}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{formatCurrency(project.budget)}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{formatCurrency(project.spent)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={project.progress} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4, 
                            bgcolor: 'grey.100',
                            '& .MuiLinearProgress-bar': { borderRadius: 4 }
                          }} 
                        />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, minWidth: 35 }}>
                        {project.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={project.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: 10,
                        bgcolor: project.status === 'Completed' ? 'success.light' : project.status === 'On Track' ? 'primary.light' : 'warning.light',
                        color: project.status === 'Completed' ? 'success.main' : project.status === 'On Track' ? 'primary.main' : 'warning.main',
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ 
          position: 'fixed', 
          bottom: { xs: 80, md: 32 }, 
          right: 32,
          boxShadow: '0 8px 16px rgba(43, 124, 238, 0.3)'
        }}
      >
        <Plus />
      </Fab>
    </Box>
  );
}

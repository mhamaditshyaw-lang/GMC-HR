import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { ShieldCheck, Clock, CreditCard } from 'lucide-react';

export function Compliance() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Compliance & Licenses</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Monitor staff certifications and regulatory requirements.</Typography>
      <Card sx={{ p: 4, textAlign: 'center', border: '2px dashed #e2e8f0', bgcolor: 'transparent', boxShadow: 'none' }}>
        <ShieldCheck size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Compliance Module</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>This module is currently being updated to meet new healthcare standards.</Typography>
        <Button variant="contained">Run Compliance Audit</Button>
      </Card>
    </Box>
  );
}


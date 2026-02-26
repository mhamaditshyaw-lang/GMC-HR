import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, List, ListItem, ListItemText, Divider, Paper, IconButton } from '@mui/material';
import { CreditCard, Download, Receipt, Wallet, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function StaffPayroll() {
  const { t } = useLanguage();

  const payslips = [
    { id: 1, month: 'January 2026', amount: '$4,890', date: 'Jan 31, 2026' },
    { id: 2, month: 'December 2025', amount: '$5,120', date: 'Dec 31, 2025' },
    { id: 3, month: 'November 2025', amount: '$4,890', date: 'Nov 30, 2025' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('payroll')}</Typography>
        <Typography variant="body1" color="text.secondary">View your earnings and download payslips.</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Current Month Summary */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4, mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Current Month Breakdown (Feb 2026)</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="text.secondary">Base Salary</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>$4,500.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="text.secondary">Overtime (12 hrs)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>+$480.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="text.secondary">Bonuses</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>+$150.00</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="text.secondary">Tax Deductions</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'error.main' }}>-$240.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="text.secondary">Insurance</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'error.main' }}>-$100.00</Typography>
                </Box>
                <Box sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Net Salary</Typography>
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>$4,790.00</Typography>
                  </Box>
                  <Button variant="contained" startIcon={<Download size={18} />} sx={{ borderRadius: 2 }}>
                    {t('downloadPDF')}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* History */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Receipt size={20} color="#2b7cee" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('payslips')}</Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {payslips.map((slip, idx) => (
                <React.Fragment key={slip.id}>
                  <ListItem sx={{ py: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{slip.month}</Typography>
                      <Typography variant="caption" color="text.secondary">{slip.date}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{slip.amount}</Typography>
                      <IconButton size="small" color="primary"><Download size={16} /></IconButton>
                    </Box>
                  </ListItem>
                  {idx < payslips.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

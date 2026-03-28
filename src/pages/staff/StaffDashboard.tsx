import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import { Clock, Umbrella, CalendarClock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      pb: { xs: 12, md: 4 },
      minHeight: '100%'
    }}>
      {/* App Header Section - Native App Style */}
      <Box sx={{ mb: 3, display: { xs: 'block', md: 'none' } }}>
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.04em', color: 'text.primary' }}>
          {t('hello')}, Sarah
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Wednesday, Feb 25
        </Typography>
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={2.5}>
          {/* Main Dashboard Content */}

          {/* Upcoming Shift Card - Native App Style */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Card sx={{ 
                borderRadius: '40px', 
                border: 'none',
                boxShadow: '0 10px 25px -5px rgba(43, 124, 238, 0.15)',
                background: 'linear-gradient(135deg, #2b7cee 0%, #1e40af 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                py: 2
              }}>
                {/* Decorative Circle */}
                <Box sx={{ 
                  position: 'absolute', top: -20, right: -20, 
                  width: 150, height: 150, borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.05)', zIndex: 0 
                }} />
                
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Chip 
                      label={t('upcoming')} 
                      size="small" 
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: 11, px: 1 }} 
                    />
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <CalendarClock size={24} />
                    </Box>
                  </Box>
                  
                  <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em', fontSize: '2.5rem' }}>
                    16:00 - 08:00
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 600, mb: 4 }}>
                    ICU - Ward 4A • {t('today')}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.9, fontSize: 12 }}>
                      {t('colleaguesOnShift')} 4+
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      {[1, 2, 3].map((i) => (
                        <Avatar 
                          key={i}
                          src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                          sx={{ 
                            width: 32, height: 32, 
                            border: '2px solid #1e40af',
                            ml: i === 1 ? 0 : -1.5
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Quick Actions Grid - Native App Style */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: 2, 
              mt: 2,
              mb: 2
            }}>
              {[
                { label: t('requestLeave'), icon: <Umbrella size={24} />, color: '#ef4444', path: '/leave' },
                { label: t('swapShift'), icon: <Users size={24} />, color: '#f59e0b', path: '/roster' },
                { label: t('clockIn'), icon: <Clock size={24} />, color: '#10b981', path: '/attendance' }
              ].map((action) => (
                <Box 
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ 
                    width: 72, height: 72, borderRadius: '50%', 
                    bgcolor: 'background.paper', color: action.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mb: 1.5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    {action.icon}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'center', lineHeight: 1.2, color: 'text.secondary' }}>
                    {action.label.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word}
                        {i < action.label.split(' ').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}

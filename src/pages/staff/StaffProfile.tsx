import React, { useState, useRef } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Avatar, Divider, IconButton, Chip, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { Camera, Save, Phone, User as UserIcon, Heart, MapPin, ShieldCheck, Eye, Download, Upload, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

export default function StaffProfile() {
  const { t } = useLanguage();
  const { user: loggedInUser } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use staffMember from state if available (e.g. when HR views a profile), otherwise use logged-in user
  const state = location.state as { staffMember?: any } | null;
  const user = state?.staffMember || loggedInUser;
  const isViewingOther = !!state?.staffMember;

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Medical License', status: 'Valid', expiry: '2026-12-31', color: 'success' },
    { id: 2, name: 'Board Certification', status: 'Expiring Soon', expiry: '2026-03-25', color: 'warning' },
    { id: 3, name: 'ID Proof (Passport)', status: 'Valid', expiry: '2030-05-15', color: 'success' },
  ]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        status: 'Pending Verification',
        expiry: 'N/A',
        color: 'info'
      };
      setDocuments([...documents, newDoc]);
      setSnackbar({ open: true, message: `File "${file.name}" uploaded successfully (Mock)`, severity: 'success' });
    }
  };

  const handleView = (doc: any) => {
    setSelectedDoc(doc);
    setPreviewOpen(true);
  };

  const handleDownload = (doc: any) => {
    setSnackbar({ open: true, message: `Downloading ${doc.name}...`, severity: 'info' });
    // In a real app: window.location.href = doc.url;
  };

  const handleUpdate = (doc: any) => {
    setSelectedDoc(doc);
    handleUploadClick();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {isViewingOther ? `Profile: ${user?.name}` : t('personalDetails')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {isViewingOther ? `Viewing details for ${user?.name}.` : 'Update your personal information and emergency contacts.'}
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4, textAlign: 'center' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar 
                  src={user?.avatar}
                  sx={{ width: 120, height: 120, border: '4px solid #f1f5f9' }}
                />
                <IconButton 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 4, 
                    right: 4, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <Camera size={18} />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{user?.role.replace('_', ' ')}</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <UserIcon size={16} color="#64748b" />
                  <Typography variant="caption" color="text.secondary">ID: MEDICORE-2024-089</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={16} color="#64748b" />
                  <Typography variant="caption" color="text.secondary">Emergency Dept, Wing B</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>{t('personalDetails')}</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Full Name" defaultValue={user?.name} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Email" defaultValue={user?.email} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Phone Number" defaultValue="+1 (555) 123-4567" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Home Address" defaultValue="123 Medical Way, Health City" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Heart size={20} color="#ef4444" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('emergencyContact')}</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Contact Name" defaultValue="Maria Rivera" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Relationship" defaultValue="Spouse" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Emergency Phone" defaultValue="+1 (555) 987-6543" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {loggedInUser && (loggedInUser.role === UserRole.SUPER_ADMIN || loggedInUser.role === UserRole.HR_MANAGER) && (
            <Card sx={{ border: '1px solid #e2e8f0', borderRadius: 4, mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <ShieldCheck size={20} color="#2b7cee" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Documents & Licenses</Typography>
                </Box>
                <Grid container spacing={3}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  {documents.map((doc) => (
                    <Grid size={{ xs: 12 }} key={doc.name}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        border: '1px solid #f1f5f9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        gap: 2
                      }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{doc.name}</Typography>
                          <Typography variant="caption" color="text.secondary">Expires: {doc.expiry}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={doc.status} 
                            size="small" 
                            color={doc.color as any}
                            sx={{ fontWeight: 700, fontSize: 10, mr: 1 }}
                          />
                          <Tooltip title="View Document">
                            <IconButton size="small" color="primary" onClick={() => handleView(doc)}>
                              <Eye size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton size="small" color="primary" onClick={() => handleDownload(doc)}>
                              <Download size={18} />
                            </IconButton>
                          </Tooltip>
                          <Button size="small" variant="text" sx={{ fontWeight: 700 }} onClick={() => handleUpdate(doc)}>Update</Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                  <Grid size={{ xs: 12 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      onClick={handleUploadClick}
                      startIcon={<Upload size={18} />}
                      sx={{ 
                        py: 2, 
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: 'divider',
                        color: 'text.secondary',
                        '&:hover': { border: '2px dashed #2b7cee', color: 'primary.main', bgcolor: 'primary.light' }
                      }}
                    >
                      + Upload New Document
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<Save size={18} />} sx={{ px: 4, py: 1.2 }}>
              {t('saveChanges')}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog 
        open={previewOpen} 
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
          Secure Document Preview for {selectedDoc?.name}!
          <IconButton onClick={() => setPreviewOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ 
            height: 400, 
            bgcolor: 'grey.100', 
            borderRadius: 2, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px dashed',
            borderColor: 'grey.300'
          }}>
            <ShieldCheck size={64} color="#94a3b8" />
            <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
              Secure Document Preview for {selectedDoc?.name}!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Status: {selectedDoc?.status} | Expiry: {selectedDoc?.expiry}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setPreviewOpen(false)} color="inherit">Close</Button>
          <Button 
            variant="contained" 
            startIcon={<Download size={18} />}
            onClick={() => {
              handleDownload(selectedDoc);
              setPreviewOpen(false);
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

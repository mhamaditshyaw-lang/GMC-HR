import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Card, CardContent, Grid, TextField, Button, MenuItem, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import { Camera, ChevronRight, ChevronLeft, Save, User, Briefcase, ShieldCheck, FileText, UploadCloud, CheckCircle2, Trash2, Info, GraduationCap, FileCheck, Eye, X, Search, Bell, UserCheck, Edit2, Sun, MapPin, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

const steps = ['Personal Info', 'Job Details', 'Documents', 'Review'];

export default function AddEmployee() {
  const [activeStep, setActiveStep] = useState(0);
  const [declaration, setDeclaration] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 's.jenkins@hospital.org',
    phone: '+1 (555) 234-8901',
    gender: 'female',
    address: '742 Evergreen Terrace, Suite 10, Medical District, Springfield, IL 62704',
    department: 'cardiology',
    jobRole: 'doctor',
    employeeId: 'EMP-1029',
    joiningDate: '2024-03-01',
    employmentType: 'full-time',
    baseSalary: '185000',
    licenseNumber: 'MED-12345-89',
    issuingAuthority: 'State Medical Board',
    licenseExpiryDate: '2026-12-31'
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string, size: string, date?: string } }>({
    license: { name: 'medical_board_cert_2024.pdf', size: '2.4 MB', date: 'Dec 31, 2026' },
    passport: { name: 'passport_copy.jpg', size: '4.1 MB', date: 'Aug 15, 2030' },
    background: { name: 'clearance_report.pdf', size: '1.2 MB', date: 'Oct 20, 2023' }
  });
  const [viewingFile, setViewingFile] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleFileUpload = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [key]: { 
          name: file.name, 
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        }
      }));
    }
  };

  const removeFile = (key: string) => {
    setUploadedFiles(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  const FileUploadBox = ({ id, label, icon: Icon, description }: { id: string, label: string, icon: any, description: string }) => {
    const file = uploadedFiles[id];
    const inputId = `file-input-${id}`;

    if (file) {
      return (
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>{label}</Typography>
          <Box sx={{ 
            p: 2, border: '2px solid #2b7cee', borderRadius: 2, bgcolor: 'white',
            display: 'flex', alignItems: 'center', gap: 2
          }}>
            <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, color: 'primary.main' }}>
              <FileText size={24} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{file.name}</Typography>
              <Typography variant="caption" color="text.secondary">{file.size} • Uploaded</Typography>
            </Box>
            <CheckCircle2 size={20} color="#22c55e" />
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small" sx={{ color: 'primary.main' }} onClick={() => setViewingFile(file.name)} title="View Details">
                <Eye size={18} />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={() => removeFile(id)} title="Remove">
                <Trash2 size={18} />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      );
    }

    return (
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>{label}</Typography>
        <input
          type="file"
          id={inputId}
          style={{ display: 'none' }}
          onChange={handleFileUpload(id)}
        />
        <label htmlFor={inputId}>
          <Box sx={{ 
            p: 3, border: '2px dashed #e2e8f0', borderRadius: 2, bgcolor: 'grey.50',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
            cursor: 'pointer', '&:hover': { bgcolor: 'grey.100', borderColor: 'primary.main' }
          }}>
            <Icon size={24} color="#94a3b8" />
            <Typography variant="body2"><Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>Click to upload</Box> or drag and drop</Typography>
            <Typography variant="caption" color="text.secondary">{description}</Typography>
          </Box>
        </label>
      </Grid>
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      <Dialog open={!!viewingFile} onClose={() => setViewingFile(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Document Details
          <IconButton onClick={() => setViewingFile(null)} size="small"><X size={20} /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <FileText size={64} color="#2b7cee" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{viewingFile}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Document verified and encrypted. This file is stored securely in the hospital's HR database.
            </Typography>
            <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'left' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>METADATA</Typography>
              <Grid container spacing={1}>
                <Grid size={4}><Typography variant="caption" sx={{ fontWeight: 600 }}>Upload Date:</Typography></Grid>
                <Grid size={8}><Typography variant="caption">Feb 23, 2026</Typography></Grid>
                <Grid size={4}><Typography variant="caption" sx={{ fontWeight: 600 }}>Status:</Typography></Grid>
                <Grid size={8}><Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>VERIFIED</Typography></Grid>
                <Grid size={4}><Typography variant="caption" sx={{ fontWeight: 600 }}>Size:</Typography></Grid>
                <Grid size={8}><Typography variant="caption">2.4 MB</Typography></Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setViewingFile(null)} variant="outlined">Close</Button>
          <Button variant="contained">Download</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>Add New Employee</Typography>
          <Typography variant="body1" color="text.secondary">Register a new staff member to the hospital system.</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 }, width: { xs: '100%', sm: 'auto' } }}>
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, 
            bgcolor: 'grey.100', px: 2, py: 1, borderRadius: 2,
            width: 300
          }}>
            <Search size={18} color="#94a3b8" />
            <Typography variant="body2" color="text.secondary">Quick find...</Typography>
          </Box>
          <IconButton sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', display: { xs: 'none', sm: 'flex' } }}>
            <Bell size={20} />
          </IconButton>
        </Box>
      </Box>

      <Stepper activeStep={activeStep} orientation={window.innerWidth < 600 ? 'vertical' : 'horizontal'} sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar sx={{ width: 160, height: 160, mb: 2, bgcolor: 'grey.100', color: 'grey.400' }}>
                        <User size={64} />
                      </Avatar>
                      <IconButton 
                        sx={{ 
                          position: 'absolute', bottom: 20, right: 0, 
                          bgcolor: 'primary.main', color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' }
                        }}
                      >
                        <Camera size={20} />
                      </IconButton>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="First Name" placeholder="e.g. John" value={formData.firstName} onChange={handleInputChange('firstName')} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Last Name" placeholder="e.g. Doe" value={formData.lastName} onChange={handleInputChange('lastName')} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Email Address" placeholder="john.doe@hospital.com" value={formData.email} onChange={handleInputChange('email')} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Phone Number" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange('phone')} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth select label="Gender" value={formData.gender} onChange={handleInputChange('gender')}>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth multiline rows={3} label="Home Address" placeholder="Street, City, State, Zip" value={formData.address} onChange={handleInputChange('address')} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth select label="Department" value={formData.department} onChange={handleInputChange('department')}>
                      <MenuItem value="cardiology">Cardiology</MenuItem>
                      <MenuItem value="emergency">Emergency</MenuItem>
                      <MenuItem value="pediatrics">Pediatrics</MenuItem>
                      <MenuItem value="icu">ICU</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth select label="Job Role" value={formData.jobRole} onChange={handleInputChange('jobRole')}>
                      <MenuItem value="doctor">Doctor</MenuItem>
                      <MenuItem value="nurse">Nurse</MenuItem>
                      <MenuItem value="tech">Technician</MenuItem>
                      <MenuItem value="admin">Administrator</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Employee ID" placeholder="e.g. EMP-1029" value={formData.employeeId} onChange={handleInputChange('employeeId')} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth type="date" label="Joining Date" InputLabelProps={{ shrink: true }} value={formData.joiningDate} onChange={handleInputChange('joiningDate')} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth select label="Employment Type" value={formData.employmentType} onChange={handleInputChange('employmentType')}>
                      <MenuItem value="full-time">Full-time</MenuItem>
                      <MenuItem value="part-time">Part-time</MenuItem>
                      <MenuItem value="contract">Contract</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Base Salary" placeholder="Annual amount" value={formData.baseSalary} onChange={handleInputChange('baseSalary')} />
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Documents & Compliance</Typography>
                  <Typography variant="body2" color="text.secondary">Upload mandatory medical certifications and verify regulatory compliance details.</Typography>
                </Box>

                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <FileText size={18} color="#2b7cee" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>Required Documents</Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <FileUploadBox id="license" label="Medical License (Board Cert)" icon={FileText} description="Medical board certification" />
                    <FileUploadBox id="id" label="National ID / Passport" icon={UploadCloud} description="PDF, JPG, or PNG (max 10MB)" />
                    <FileUploadBox id="degrees" label="Academic Degrees" icon={GraduationCap} description="Certified copies only" />
                    <FileUploadBox id="background" label="Background Check Report" icon={FileCheck} description="Security clearance report" />
                  </Grid>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <ShieldCheck size={18} color="#2b7cee" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>Compliance Details</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField fullWidth label="License Number" placeholder="e.g. MED-12345-89" value={formData.licenseNumber} onChange={handleInputChange('licenseNumber')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField fullWidth label="Issuing Authority" placeholder="e.g. State Medical Board" value={formData.issuingAuthority} onChange={handleInputChange('issuingAuthority')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField fullWidth type="date" label="License Expiry Date" InputLabelProps={{ shrink: true }} value={formData.licenseExpiryDate} onChange={handleInputChange('licenseExpiryDate')} />
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Final Review</Typography>
                    <Typography variant="body2" color="text.secondary">Verify all details before finalizing onboarding process.</Typography>
                  </Box>
                  <Chip label="STEP 4 OF 4" size="small" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: 'primary.light', borderRadius: 1 }} />
                </Box>

                {/* Personal Information Section */}
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <User size={18} color="#94a3b8" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Personal Information</Typography>
                    </Box>
                    <Button startIcon={<Edit2 size={14} />} size="small" onClick={() => setActiveStep(0)} sx={{ fontWeight: 700 }}>EDIT</Button>
                  </Box>
                  <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Avatar 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9y7evbRG9tVWPoi7S7zwVW51A06Zao1MJIbU1l655XcK-J-cAPO1PWpj6EvqMB7tTAZ5S0hgA0yZfuIy_ARownrlKndSUNcQMerpqV-WeNksg0CXYFZ-ISq0znQbNrCUytV4Qc8V9CiBKzzR2hRAHjUz_5KnThE9By1qLdRUMjhKPrnkigznGlQJfjFxXWS6tAMScOgNy0m8nRPTXHLOEtByi5y2HZwi_fG6r54rGcrrRRbNAkZJXUVGQ74w8SfoakHk8LViDIbE" 
                        sx={{ width: 100, height: 100, borderRadius: 3 }} 
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Full Name</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.firstName} {formData.lastName}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Email Address</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.email}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Phone Number</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.phone}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 8 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Residential Address</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.address}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Gender</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

                {/* Employment Details Section */}
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Briefcase size={18} color="#94a3b8" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Employment Details</Typography>
                    </Box>
                    <Button startIcon={<Edit2 size={14} />} size="small" onClick={() => setActiveStep(1)} sx={{ fontWeight: 700 }}>EDIT</Button>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Job Title</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.jobRole.charAt(0).toUpperCase() + formData.jobRole.slice(1)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Department</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.department.charAt(0).toUpperCase() + formData.department.slice(1)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Employee ID</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.employeeId}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Joining Date</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.joiningDate}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Compliance Documents Section */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FileText size={18} color="#94a3b8" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Compliance Documents</Typography>
                    </Box>
                    <Button startIcon={<Edit2 size={14} />} size="small" onClick={() => setActiveStep(2)} sx={{ fontWeight: 700 }}>EDIT</Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(uploadedFiles).map(([key, doc]) => (
                      <Box key={key} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ p: 1, bgcolor: 'success.light', color: 'success.main', borderRadius: 1 }}>
                          <CheckCircle2 size={18} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{doc.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{doc.size}</Typography>
                        </Box>
                        {doc.date && (
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, fontSize: 10 }}>EXPIRY DATE</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{doc.date}</Typography>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {activeStep === 3 && (
            <Box sx={{ 
              mt: 4, p: 3, borderRadius: 3, bgcolor: 'primary.light', 
              border: '1px solid', borderColor: 'primary.main',
              display: 'flex', gap: 2, alignItems: 'flex-start'
            }}>
              <Checkbox 
                checked={declaration} 
                onChange={(e) => setDeclaration(e.target.checked)}
                sx={{ p: 0, mt: 0.5, color: 'primary.main' }} 
              />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Declaration & Accuracy</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                  I confirm that all provided information is accurate and verified according to hospital policy. I understand that any misrepresentation may result in disqualification or termination of the onboarding process.
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mt: 6, pt: 3, borderTop: '1px solid #f1f5f9', gap: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ChevronLeft size={18} />}
              sx={{ color: 'text.secondary', fontWeight: 600, order: { xs: 2, sm: 1 } }}
            >
              {activeStep === 3 ? 'Previous Step' : 'Previous'}
            </Button>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, order: { xs: 1, sm: 2 } }}>
              <Button variant="outlined" sx={{ fontWeight: 600, borderRadius: 2, px: 3 }}>Save as Draft</Button>
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  startIcon={<UserCheck size={18} />}
                  onClick={() => navigate('/staff')}
                  disabled={!declaration}
                  sx={{ px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, bgcolor: 'primary.main' }}
                >
                  Complete Onboarding
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  endIcon={<ChevronRight size={18} />}
                  onClick={handleNext}
                  sx={{ px: 4, py: 1.2, borderRadius: 2, fontWeight: 700 }}
                >
                  {activeStep === 2 ? 'Next: Review' : 'Continue'}
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ 
        mt: 4, p: 2, borderRadius: 2, bgcolor: 'primary.light', 
        display: 'flex', gap: 2, alignItems: 'flex-start',
        border: '1px solid', borderColor: 'primary.main', opacity: 0.9
      }}>
        <Info size={20} color="#2b7cee" style={{ marginTop: 2 }} />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>Compliance Check Required</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
            All uploaded documents must be original certified copies. Please ensure the <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>License Expiry Date</Box> is at least 6 months from today to prevent immediate compliance alerts.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

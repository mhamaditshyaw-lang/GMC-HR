import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar, 
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  ShieldCheck, 
  UserPlus, 
  MoreVertical, 
  Trash2, 
  Edit2,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { UserRole } from '../types';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

const INITIAL_USERS: UserData[] = [
  { id: '1', name: 'Alex Rivera', email: 'admin@medicore.com', role: UserRole.SUPER_ADMIN, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9y7evbRG9tVWPoi7S7zwVW51A06Zao1MJIbU1l655XcK-J-cAPO1PWpj6EvqMB7tTAZ5S0hgA0yZfuIy_ARownrlKndSUNcQMerpqV-WeNksg0CXYFZ-ISq0znQbNrCUytV4Qc8V9CiBKzzR2hRAHjUz_5KnThE9By1qLdRUMjhKPrnkigznGlQJfjFxXWS6tAMScOgNy0m8nRPTXHLOEtByi5y2HZwi_fG6r54rGcrrRRbNAkZJXUVGQ74w8SfoakHk8LViDIbE' },
  { id: '2', name: 'Sarah Jenkins', email: 'sarah.hr@medicore.com', role: UserRole.HR_MANAGER, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8' },
];

export default function AccessControl() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: UserRole.STAFF });

  const handleCreateUser = () => {
    const user: UserData = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: `https://picsum.photos/seed/${newUser.name}/100/100`
    };
    setUsers([...users, user]);
    setOpen(false);
    setNewUser({ name: '', email: '', role: UserRole.STAFF });
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN: return 'error';
      case UserRole.HR_MANAGER: return 'primary';
      case UserRole.DEPT_HEAD: return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{t('accessControl')}</Typography>
          <Typography variant="body1" color="text.secondary">Manage system users, roles, and permissions.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<UserPlus size={18} />} 
          onClick={() => setOpen(true)}
          sx={{ px: 3, py: 1.2 }}
        >
          {t('createUser')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>{t('username')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>{t('email')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>{t('role')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>{t('permissions')}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={user.avatar} sx={{ width: 36, height: 36 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role.replace('_', ' ')} 
                          size="small" 
                          color={getRoleColor(user.role)}
                          sx={{ fontWeight: 700, fontSize: 10 }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {user.role === UserRole.SUPER_ADMIN ? 'Full System Access' : 'Limited Access'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><Edit2 size={16} /></IconButton>
                        <IconButton size="small" color="error"><Trash2 size={16} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{t('createUser')}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField 
              fullWidth 
              label={t('username')} 
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField 
              fullWidth 
              label={t('email')} 
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              select
              fullWidth
              label={t('role')}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
            >
              {Object.values(UserRole).map((role) => (
                <MenuItem key={role} value={role}>
                  {role.replace('_', ' ')}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">{t('logout')}</Button>
          <Button variant="contained" onClick={handleCreateUser}>{t('createUser')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

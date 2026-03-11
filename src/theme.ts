import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#090a0b', // Almost black
      light: '#272a2e',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // Slate 500
      light: '#94a3b8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa', // Zinc 50
      paper: '#ffffff',
    },
    text: {
      primary: '#090a0b', // Zinc 950
      secondary: '#52525b', // Zinc 600
    },
    success: {
      main: '#059669', // Emerald 600
      light: '#ecfdf5', // Emerald 50
      dark: '#047857', // Emerald 700
      contrastText: '#065f46', // Emerald 800
    },
    warning: {
      main: '#d97706', // Amber 600
      light: '#fffbeb', // Amber 50
      dark: '#b45309', // Amber 700
      contrastText: '#92400e', // Amber 800
    },
    error: {
      main: '#e11d48', // Rose 600
      light: '#fff1f2', // Rose 50
      dark: '#be123c', // Rose 700
      contrastText: '#9f1239', // Rose 800
    },
    info: {
      main: '#2563eb', // Blue 600
      light: '#eff6ff', // Blue 50
      dark: '#1d4ed8', // Blue 700
      contrastText: '#1e40af', // Blue 800
    },
    divider: '#e4e4e7', // Zinc 200
  },
  typography: {
    fontFamily: '"Inter", "system-ui", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    body1: {
      letterSpacing: '-0.01em',
    },
    body2: {
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          background-color: #fafafa;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(180deg, #18181b 0%, #090a0b 100%)',
          color: '#ffffff',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          '&:hover': {
            background: 'linear-gradient(180deg, #272a2e 0%, #18181b 100%)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          },
        },
        outlined: {
          borderColor: '#e4e4e7',
          color: '#090a0b',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: '#f4f4f5',
            borderColor: '#d4d4d8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e4e4e7',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e4e4e7',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e4e4e7',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'collapse',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f4f4f5',
          padding: '16px',
          color: '#52525b',
        },
        head: {
          fontWeight: 500,
          color: '#71717a',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e4e4e7',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#f4f4f5',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          letterSpacing: '-0.01em',
        },
        colorSuccess: {
          backgroundColor: '#ecfdf5',
          color: '#065f46',
          border: '1px solid #a7f3d0',
        },
        colorWarning: {
          backgroundColor: '#fffbeb',
          color: '#92400e',
          border: '1px solid #fde68a',
        },
        colorError: {
          backgroundColor: '#fff1f2',
          color: '#9f1239',
          border: '1px solid #fecdd3',
        },
        colorInfo: {
          backgroundColor: '#eff6ff',
          color: '#1e40af',
          border: '1px solid #bfdbfe',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #ffffff',
          boxShadow: '0 0 0 1px #e4e4e7',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e4e4e7',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#ffffff',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: '#e4e4e7',
            },
            '&:hover fieldset': {
              borderColor: '#d4d4d8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#090a0b',
              borderWidth: '1px',
              boxShadow: '0 0 0 2px rgba(9, 10, 11, 0.1)',
            },
          },
        },
      },
    },
  },
});

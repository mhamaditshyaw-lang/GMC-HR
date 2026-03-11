import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';
type PrimaryColor = 'blue' | 'emerald' | 'violet' | 'amber' | 'rose';

interface ThemeContextType {
  mode: ThemeMode;
  primaryColor: PrimaryColor;
  toggleTheme: () => void;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorMap = {
  blue: { light: '#0f172a', dark: '#3b82f6' },
  emerald: { light: '#065f46', dark: '#10b981' },
  violet: { light: '#5b21b6', dark: '#8b5cf6' },
  amber: { light: '#92400e', dark: '#f59e0b' },
  rose: { light: '#9f1239', dark: '#f43f5e' },
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return (savedMode as ThemeMode) || 'dark';
  });

  const [primaryColor, setPrimaryColorState] = useState<PrimaryColor>(() => {
    const savedColor = localStorage.getItem('theme-color');
    return (savedColor as PrimaryColor) || 'blue';
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setPrimaryColor = (color: PrimaryColor) => {
    setPrimaryColorState(color);
    localStorage.setItem('theme-color', color);
  };

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  const theme = useMemo(
    () => {
      const colors = colorMap[primaryColor];
      const mainColor = mode === 'light' ? colors.light : colors.dark;

      return createTheme({
        palette: {
          mode,
          primary: {
            main: mainColor,
            light: mode === 'light' ? `${mainColor}cc` : `${mainColor}aa`,
            dark: mode === 'light' ? `${mainColor}ee` : `${mainColor}dd`,
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#8b5cf6',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#09090b',
            paper: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : '#18181b',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#f4f4f5',
            secondary: mode === 'light' ? '#475569' : '#a1a1aa',
          },
          success: {
            main: '#10b981',
          },
          warning: {
            main: '#f59e0b',
          },
          error: {
            main: '#ef4444',
          },
          grey: mode === 'light' ? {
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
          } : {
            50: '#18181b',
            100: '#27272a',
            200: '#3f3f46',
            300: '#52525b',
            400: '#71717a',
            500: '#a1a1aa',
            600: '#d4d4d8',
            700: '#e4e4e7',
            800: '#f4f4f5',
            900: '#fafafa',
          },
          divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
        },
        typography: {
          fontFamily: '"Inter", "Vazirmatn", "system-ui", sans-serif',
          h1: { fontWeight: 700, letterSpacing: '-0.04em' },
          h2: { fontWeight: 700, letterSpacing: '-0.03em' },
          h3: { fontWeight: 600, letterSpacing: '-0.02em' },
          h4: { fontWeight: 600, letterSpacing: '-0.02em' },
          h5: { fontWeight: 600, letterSpacing: '-0.01em' },
          h6: { fontWeight: 600, letterSpacing: '-0.01em' },
          button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === 'light' ? '#f8fafc' : '#09090b',
                color: mode === 'light' ? '#0f172a' : '#f4f4f5',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                padding: '10px 20px',
                boxShadow: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  boxShadow: 'none',
                },
              },
              containedPrimary: {
                background: mode === 'light' 
                  ? `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 100%)`
                  : `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}bb 100%)`,
                color: '#ffffff',
                boxShadow: mode === 'light'
                  ? `0 4px 12px ${mainColor}33, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                  : `0 4px 12px ${mainColor}44, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
              },
              outlined: {
                border: mode === 'light' ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : '#27272a',
                color: mode === 'light' ? '#0f172a' : '#f4f4f5',
                '&:hover': {
                  background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : '#3f3f46',
                  border: mode === 'light' ? '1px solid rgba(15, 23, 42, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)',
                }
              }
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 24,
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : '#18181b',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: mode === 'light' 
                  ? '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)'
                  : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
                backgroundImage: 'none',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : '#18181b',
                backdropFilter: 'blur(20px)',
              }
            }
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 24,
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : '#18181b',
                backdropFilter: 'blur(24px)',
                border: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: mode === 'light'
                  ? '0 24px 48px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)'
                  : '0 24px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
            },
          },
          MuiBackdrop: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.04)' : '1px solid rgba(255, 255, 255, 0.05)',
                padding: '16px 24px',
              },
              head: {
                fontWeight: 600,
                color: mode === 'light' ? '#64748b' : '#a1a1aa',
                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : '#27272a',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.75rem',
              },
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : '#27272a',
                },
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
                  borderRadius: 12,
                  background: mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : '#27272a',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease',
                  '& fieldset': {
                    borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mainColor,
                    borderWidth: '1px',
                  },
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 600,
              },
            },
          },
        },
      });
    },
    [mode, primaryColor]
  );

  return (
    <ThemeContext.Provider value={{ mode, primaryColor, toggleTheme, setPrimaryColor }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

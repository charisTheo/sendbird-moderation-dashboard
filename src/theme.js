import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = 64

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#6210CC',
    },
    secondary: {
      main: '#ff5722',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          alignItems: 'flex-start',
          height: APP_BAR_HEIGHT,
          justifyContent: 'center',
          color: '#fff',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.app-container': {
            minHeight: '100vh'
          },
          '&.page-container': {
            minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          minWidth: 240,
        }
      }
    },
  }
});

export default theme;

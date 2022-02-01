import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
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
          minHeight: 60,
          justifyContent: 'center'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          minWidth: 240,
        }
      }
    }
  }
});

export default theme;

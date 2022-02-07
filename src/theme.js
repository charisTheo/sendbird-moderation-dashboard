import { colors } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = 64

/**
 * @param {String} mode - 'dark' or 'light'
 */
function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      background: {
        paper: mode === 'dark' ? '#22144d' : colors.deepPurple[50],
        default: mode === 'dark' ? '#22144d' : colors.deepPurple[50],
      },
      primary: {
        main: mode === 'dark' ? '#ff5722' : '#6210CC',
      },
      secondary: {
        main: mode === 'dark' ? '#6210CC' : '#ff5722',
      },
      error: {
        main: red.A400,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          blockquote: {
            backgroundColor: mode === 'dark' ? '#6210CC60' : '#cccccc60',
            borderLeft: `5px solid ${mode === 'dark' ? '#6210CC' : '#cccccc'}`,
            padding: '1rem 2rem',
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            alignItems: 'center',
            flexDirection: 'row',
            height: APP_BAR_HEIGHT,
            justifyContent: 'space-between',
            color: '#fff',
            backgroundColor: '#6210CC'
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
      MuiTableCell: {
        styleOverrides: {
          root: {
            maxWidth: 180,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            '&[target="_blank"]::after': {
              content: '"↗"',
              display: 'inline-block',
              paddingLeft: 1,
              textDecoration: 'inherit'
            }
          }
        }
      },
    }
  })
}

export { getTheme }

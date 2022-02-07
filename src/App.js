import React, { useState, useMemo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';
import Nav from './components/nav';
import routes from './routes';

const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default function App() {
  const [mode, setMode] = useState(preferredColorScheme);
  const theme = useMemo(() => getTheme(mode), [mode])

  const onToggleTheme = () => setMode(mode === 'light' ? 'dark' : 'light')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        disableGutters={true}
        maxWidth={false}
        classes={{root: 'app-container'}}
      >
        <Router basename={process.env.PUBLIC_URL || ''}>
          <Nav toggleTheme={onToggleTheme} themeMode={mode} />
          <Routes>
            {routes.map(route => (
              <Route key={route.path} path={route.path} exact element={route.component()} />
            ))}
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

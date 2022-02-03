import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <CssBaseline />
      <App />
    </LocalizationProvider>
  </ThemeProvider>,
  document.querySelector('#root'),
);

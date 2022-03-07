import * as React from 'react';
import ReactDOM from 'react-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import App from './App';

ReactDOM.render(
  <LocalizationProvider dateAdapter={DateAdapter}>
    <App />
  </LocalizationProvider>,
  document.querySelector('#root'),
);

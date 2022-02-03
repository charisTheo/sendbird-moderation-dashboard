import * as React from 'react';
import Container from '@mui/material/Container';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav from './components/nav';
import routes from './routes';

export default function App() {
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      classes={{root: 'app-container'}}
    >
      <Router basename={process.env.PUBLIC_URL || ''}>
        <Nav />
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} exact element={route.component()} />
          ))}
        </Routes>
      </Router>
    </Container>
  );
}

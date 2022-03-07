import React from 'react';
import { Container, Typography } from '@mui/material';

const PageContainer = ({ title, children }) => {
  return (
    <Container sx={{ pt: 2 }} classes={{ root: 'page-container' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>

      {children}
    </Container>
  )
};

export default PageContainer;

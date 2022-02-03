import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { getLoginDetails } from '../utils';
import { useNavigate } from 'react-router-dom';

const PageContainer = ({title, children}) => {
  const auth = getLoginDetails()
  const navigate = useNavigate()

  useEffect(() => {
    if ((!auth || (!auth?.appId && !auth?.apiToken)) && window.location.pathname !== '/login') {
      navigate('/login')
    }
  }, [])

  return (
    <Container sx={{pt: 2}} classes={{root: 'page-container'}}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>

      {children}
    </Container>
  )
};

export default PageContainer;

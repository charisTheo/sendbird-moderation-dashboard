import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/pageContainer';
import { isLoggedIn, setLoginDetails } from '../utils';

const LoginPage = ({ title }) => {
  const navigate = useNavigate();
  const [appId, setAppId] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [error, setError] = useState(null);

  const canSubmit = appId && apiToken;

  const onSubmit = async () => {
    if (canSubmit) {
      // Try a network request to check that credentials are correct
      try {
        const response = await fetch(`https://api-${appId}.sendbird.com/v3/applications/`, {
          headers: {
            'Api-Token': apiToken
          }
        })
        if (response.status === 200)  {
          // save credentials to local storage
          setLoginDetails({appId, apiToken});
          navigate('/')
        } else if (response.status === 400)  {
          const json = await response.json()
          setError(json.message)
        }
      } catch (e) {
        console.error("LoginPage onSubmit:", e)
        setError('Authentication error! Please check your credentials and try again.')
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 5000)
    }
  }, [error])

  return (
    <PageContainer title={title}>
        <Alert
          severity="error"
          color="error"
          sx={{mx: 'auto'}}
          style={{width: 'fit-content', visibility: error ? 'visible' : 'hidden'}}
        >{error}</Alert>

      <Grid
        container
        rowSpacing={5}
        justifyContent='center'
        alignItems="center"
        direction="column"
        sx={{m: '2rem auto'}}
      >
        <Grid item>
          <Typography variant="h4" component="h2">Sendbird credentials</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            label="App ID"
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            label="API Token"
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            onClick={onSubmit}
            disabled={!canSubmit}
          >Submit</Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;

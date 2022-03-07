import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button, Typography, Alert } from '@mui/material';
import PageContainer from '../components/pageContainer';
import { getLoginDetails, setLoginDetails } from '../utils';
import { useNavigate } from 'react-router-dom';
const savedUserId = getLoginDetails()?.userId || '';

const LoginPage = ({ title }) => {
  const [userId, setUserId] = useState(savedUserId);
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);
  const canSubmit = userId && accessToken;
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (canSubmit) {
      // save user ID to local storage
      setLoginDetails({ userId });

      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ userId, accessToken }),
          headers: { 'Content-Type': 'application/json' }
        })
        // server will set a cookie with session token
        // and redirect to home page if login successful
        if (response.status !== 200) {
          const { message } = await response.json()
          setError(message)
        } else {
          const { token, profileUrl } = await response.json()
          // TODO render profile URL in top nav
          console.log("🚀 ~ file: login.js ~ line 33 ~ onSubmit ~ profileUrl", profileUrl)
          setLoginDetails({ userId, sessionToken: token })
          navigate('/')
        }
      } catch (e) {
        console.error("LoginPage onSubmit:", e)
        setError('Authentication error! Please check your credentials and try again.')
      }
    }
  }

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
        sx={{ mx: 'auto' }}
        style={{ width: 'fit-content', visibility: error ? 'visible' : 'hidden' }}
      >{error}</Alert>

      <Grid
        container
        rowSpacing={5}
        justifyContent='center'
        alignItems="center"
        direction="column"
        sx={{ m: '2rem auto' }}
      >
        <Grid item>
          <Typography variant="h4" component="h2">Sendbird credentials</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            label="User ID"
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            label="Access Token"
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

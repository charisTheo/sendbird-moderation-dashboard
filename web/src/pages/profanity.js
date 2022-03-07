import {
  Alert,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../components/pageContainer';
import ProfanityFilters from '../components/profanityFilters';
import ProfanityMessagesTable from '../components/profanityMessagesTable';
import { getAuthHeaders, openInDashboard } from '../utils';
import { DASHBOARD_LINK_TYPES } from '../utils/constants';

const PAGINATION = 15 // default

const getDefaultChannelType = () => {
  const hash = window.location.hash
  if (hash) {
    return hash.split('#channelType=')[1]
  }
  return DASHBOARD_LINK_TYPES.GROUP_CHANNELS
}

const ProfanityPage = ({ title }) => {
  const navigate = useNavigate()
  const { channelUrl: channelUrlParam } = useParams()
  const [channelUrl, setChannelUrl] = useState(channelUrlParam)
  const [messages, setMessages] = useState([]);
  const [channelType, setChannelType] = useState(getDefaultChannelType());
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setTimeout(setError, 6000)
    }
  }, [error])

  useEffect(() => {
    if (channelUrl) {
      fetchMessages()
      // remove channelUrl from url path
      navigate('/profanity', { replace: true })
    }
  }, [])

  const fetchMessages = useCallback(async () => {
    setIsLoading(true)
    // filter by datetime range and timeline reference
    const message_ts = date?.value ? date.value.valueOf() : moment() // now default
    const paginationLimit = `${date?.timeline === 'after' ? 'next_limit' : 'prev_limit'}=${PAGINATION}` // prev_limit default
    const url = `/api/profanities?type=${channelType}&channel_url=${channelUrl}&message_ts=${message_ts.valueOf()}&${paginationLimit}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      const data = await response.json();
      if (response.status === 200) {
        if (!data.messages.length) {
          setError('No messages found!')
        }
        setMessages(data.messages)
      } else {
        setError(data.message + ' Make sure the channel type is correct!')
        setMessages([])
      }
    } catch (error) {
      console.error(error)
      setError('Error while fetching messages. Please try again')
    }
    setIsLoading(false)
  }, [channelUrl, date, channelType]);

  return (
    <PageContainer title={title}>
      <Alert
        severity="error"
        color="error"
        sx={{ mx: 'auto', mb: 2 }}
        style={{ width: 'fit-content', visibility: error ? 'visible' : 'hidden' }}
      >{error}</Alert>

      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={4}>
          <TextField
            label="Channel URL"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            fullWidth
          />
        </Grid>
        {channelUrl &&
          <>
            <Grid item xs={4}>
              <FormControl>
                <RadioGroup
                  title='Channel type'
                  defaultValue={channelType}
                  value={channelType}
                  onChange={e => setChannelType(e.target.value)}
                >
                  <FormControlLabel
                    value={DASHBOARD_LINK_TYPES.GROUP_CHANNELS}
                    control={<Radio />}
                    label="Group channel"
                  />
                  <FormControlLabel
                    value={DASHBOARD_LINK_TYPES.OPEN_CHANNELS}
                    control={<Radio />}
                    label="Open channel"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item container xs={4} alignItems='center' sx={{ pl: 2, pt: 2 }}>
              <ProfanityFilters onDateSelect={setDate} />
            </Grid>
          </>
        }
      </Grid>

      {channelUrl && (
        <Grid
          container
          direction='column'
          sx={{ my: 2 }}
          spacing={2}
          alignItems='center'

        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchMessages}
            >View messages</Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => openInDashboard(channelType, channelUrl)}
              target="_blank"
              type="link"
              variant="outlined"
            >
              View channel↗
            </Button>
          </Grid>
        </Grid>
      )}

      {(channelUrl && !!messages.length) &&
        <ProfanityMessagesTable
          isLoading={isLoading}
          messages={messages}
          channelUrl={channelUrl}
          channelType={channelType}
        />
      }
    </PageContainer>
  );
};

export default ProfanityPage;

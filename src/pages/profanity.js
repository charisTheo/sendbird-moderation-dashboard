import { Alert, Button, Grid, TextField } from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../components/pageContainer';
import ProfanityFilters from '../components/profanityFilters';
import ProfanityMessagesTable from '../components/profanityMessagesTable';
import { getLinkToGroupChannel, getLoginDetails } from '../utils';

const PAGINATION = 15 // default

const ProfanityPage = ({ title }) => {
  const auth = getLoginDetails()
  const navigate = useNavigate()
  const { channelUrl: channelUrlParam } = useParams()
  const [channelUrl, setChannelUrl] = useState(channelUrlParam)
  const [messages, setMessages] = useState([]);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 5000)
    }
  }, [error])

  useEffect(() => {
    if (channelUrl) {
      fetchMessages()
      // remove channelUrl from url path
      navigate('/profanity')
    }
  }, [])

  const fetchMessages = useCallback(async () => {
    if (!auth) {
      return;
    }
    setIsLoading(true)

    // filter by datetime range and timeline reference
    const message_ts = date?.value ? date.value.valueOf() : moment() // now default
    const paginationLimit = `${date?.timeline === 'after' ? 'next_limit' : 'prev_limit'}=${PAGINATION}` // prev_limit default

    // Docs: https://sendbird.com/docs/chat/v3/platform-api/guides/report-content-and-subject#2-list-moderated-messages
    var url = `https://api-${auth.appId}.sendbird.com/v3/report/group_channels/${channelUrl}/profanity_messages?message_ts=${message_ts.valueOf()}&${paginationLimit}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Api-Token': auth.apiToken }
      })
      const data = await response.json();
      if (response.status === 200) {
        if (!data.messages.length) {
          setError('No messages found!')
        }
        setMessages(data.messages)
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.error(error)
      setError('Error while fetching messages. Please try again')
    }
    setIsLoading(false)
  }, [channelUrl, date]);

  return (
    <PageContainer title={title}>
      <Alert
        severity="error"
        color="error"
        sx={{mx: 'auto', mb: 2}}
        style={{width: 'fit-content', visibility: error ? 'visible' : 'hidden'}}
      >{error}</Alert>

      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={6}>
          <TextField
            label="Channel URL"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            fullWidth
          />
        </Grid>
        {channelUrl &&
          <Grid item xs={6}>
            <ProfanityFilters onDateSelect={setDate} />
          </Grid>
        }
      </Grid>

      {channelUrl && (
        <Grid
          container
          direction='column'
          sx={{my: 2}}
          spacing={2}
          alignItems='center'

        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchMessages}
            >Find messages</Button>
          </Grid>
          <Grid item>
            <Button
              href={getLinkToGroupChannel(channelUrl)}
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
        <ProfanityMessagesTable isLoading={isLoading} messages={messages} channelUrl={channelUrl} />
      }
    </PageContainer>
  );
};

export default ProfanityPage;

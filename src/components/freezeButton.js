import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import MessageIcon from '@mui/icons-material/Message';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { getLoginDetails } from '../utils';

const FreezeButton = ({ channel }) => {
  const [isFrozen, setIsFrozen] = useState(channel.freeze);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getLoginDetails()

  const checkFreeze = async () => {
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}
    `, {
      mathod: 'GET',
      headers: { 'Api-Token': auth.apiToken }
    });
    const data = await response.json();
    if (response.status === 200) {
      setIsFrozen(data.freeze);
    } else {
      console.error(data);
    }
    setIsLoading(false);
  }

  useEffect(checkFreeze, [])

  const handleFreezeToggle = async () => {
    setIsLoading(true);
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/freeze
    `, {
      method: 'PUT',
      headers: { 'Api-Token': auth.apiToken },
      body: JSON.stringify({freeze: !isFrozen})
    });
    if (response.status === 200) {
      setIsFrozen(!isFrozen);
    } else {
      const data = await response.json();
      console.error(data);
    }
    setIsLoading(false);
  }

  return (
    <LoadingButton
      loading={isLoading}
      variant={isFrozen ? 'outlined' : 'contained'}
      onClick={handleFreezeToggle}
      startIcon={isFrozen ? <MessageIcon /> : <SpeakerNotesOffIcon />}
    >
      {isFrozen ? 'Unfreeze channel' : 'Freeze channel'}
    </LoadingButton>
  )
};

export default FreezeButton;

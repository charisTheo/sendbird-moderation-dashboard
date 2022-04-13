import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import MessageIcon from '@mui/icons-material/Message';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { getAuthHeaders } from '../utils';

const FreezeButton = ({ channel, channelType }) => {
  const [isFrozen, setIsFrozen] = useState(channel.freeze);
  const [isLoading, setIsLoading] = useState(true);

  const checkFreeze = async () => {
    const response = await fetch(`/api/channels/?type=${channelType}&channelUrl=${channel.channel_url}`, {
      mathod: 'GET',
      headers: getAuthHeaders()
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
    const response = await fetch(`/api/freeze`, {
      method: 'PUT',
      body: JSON.stringify({
        type: channelType,
        freeze: !isFrozen,
        channelUrl: channel.channel_url
      }),
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (response.status === 200) {
      setIsFrozen(data.freeze);
    } else {
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

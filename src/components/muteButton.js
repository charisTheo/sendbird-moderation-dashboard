import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { getLoginDetails } from '../utils';

const MuteButton = ({ user, channel }) => {
  if (!user) {
    return null
  }
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getLoginDetails()

  const checkMute = async () => {
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/mute/${user.user_id}
    `, {
      mathod: 'GET',
      headers: { 'Api-Token': auth.apiToken }
    });
    const data = await response.json();
    if (response.status === 200) {
      setIsMuted(data.is_muted);
    } else {
      console.error(data)
    }
    setIsLoading(false);
  }

  useEffect(checkMute, [])

  const handleMuteToggle = async () => {
    setIsLoading(true);
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/mute${isMuted ? '/' + user.user_id : ''}
    `, {
      method: isMuted ? 'DELETE' : 'POST',
      headers: { 'Api-Token': auth.apiToken },
      body: isMuted ? undefined : JSON.stringify({user_id: user.user_id})
    });
    if (response.status === 200) {
      setIsMuted(!isMuted);
    } else {
      const data = await response.json();
      console.error(data);
    }
    setIsLoading(false);
  }

  return (
    <LoadingButton
      loading={isLoading}
      variant={isMuted ? 'outlined' : 'contained'}
      onClick={handleMuteToggle}
      startIcon={isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
    >
      {isMuted ? 'Unmute user' : 'Mute user'}
    </LoadingButton>
  )
};

export default MuteButton;

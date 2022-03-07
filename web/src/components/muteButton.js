import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { getAuthHeaders } from '../utils';

const MuteButton = ({ user, channel }) => {
  if (!user) {
    return null
  }
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkMute = async () => {
    const response = await fetch(`/api/mute?channelUrl=${channel.channel_url}&userId=${user.user_id}`, {
      mathod: 'GET',
      headers: getAuthHeaders()
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
    const response = await fetch(`/api/mute`, {
      method: 'POST',
      body: JSON.stringify({
        userId: user.user_id,
        channelUrl: channel.channel_url,
        isMuted
      }),
      headers: getAuthHeaders(),
    })

    const data = await response.json();
    if (response.status === 200) {
      setIsMuted(data.isMuted);
    } else {
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

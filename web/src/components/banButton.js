import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import { getAuthHeaders } from '../utils';

const BanButton = ({ user, channel }) => {
  if (!user) {
    return null
  }
  const [isBanned, setIsBanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkBan = async () => {
    const response = await fetch(`/api/ban?channelUrl=${channel.channel_url}&userId=${user.user_id}`, {
      mathod: 'GET',
      headers: getAuthHeaders()
    });
    if (response.status === 200) {
      const { isBanned } = await response.json();
      setIsBanned(isBanned);
    } else if (response.status === 400) {
      const { message } = await response.json();
      alert(message);
    } else {
      console.error(response);
    }
    setIsLoading(false);
  }

  useEffect(checkBan, [])

  const handleBanToggle = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/ban`, {
      method: 'POST',
      body: JSON.stringify({
        userId: user.user_id,
        channelUrl: channel.channel_url,
        isBanned
      }),
      headers: getAuthHeaders(),
    })

    const data = await response.json();
    if (response.status === 200) {
      setIsBanned(data.isBanned);
    } else {
      console.error(data);
    }
    setIsLoading(false);
  }

  return (
    <LoadingButton
      loading={isLoading}
      variant={isBanned ? 'outlined' : 'contained'}
      onClick={handleBanToggle}
      startIcon={isBanned ? <DoneIcon /> : <BlockIcon />}
    >
      {isBanned ? 'Unban user' : 'Ban user'}
    </LoadingButton>
  )
};

export default BanButton;

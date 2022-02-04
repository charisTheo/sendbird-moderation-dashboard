import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import { getLoginDetails } from '../utils';

const BanButton = ({ user, channel }) => {
  if (!user) {
    return null
  }
  const [isBanned, setIsBanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getLoginDetails()

  const checkBan = async () => {
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/ban/${user.user_id}
    `, {
      mathod: 'GET',
      headers: { 'Api-Token': auth.apiToken }
    });
    if (response.status === 200) {
      setIsBanned(true);
    } else if (response.status === 400) {
      setIsBanned(false);
    } else {
      console.error(response);
    }
    setIsLoading(false);
  }

  useEffect(checkBan, [])

  const handleBanToggle = async () => {
    setIsLoading(true);
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/ban${isBanned ? '/' + user.user_id : ''}
    `, {
      method: isBanned ? 'DELETE' : 'POST',
      headers: { 'Api-Token': auth.apiToken },
      body: isBanned ? undefined : JSON.stringify({user_id: user.user_id})
    });
    if (response.status === 200) {
      setIsBanned(!isBanned);
    } else {
      const data = await response.json();
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

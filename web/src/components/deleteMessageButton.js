import React, { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { getLoginDetails } from '../utils';

const DeleteMessageButton = ({message, channel}) => {
  if (!message) {
    return null
  }
  const [isDeleted, setIsDeleted] = useState(message.is_removed);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getLoginDetails()

  const checkDeleted = async () => {
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/messages/${message.message_id}
    `, {
      mathod: 'GET',
      headers: { 'Api-Token': auth.apiToken }
    });
    const data = await response.json();
    if (response.status === 200) {
      setIsDeleted(data.is_removed);
    } else if (response.status === 400) {
      setIsDeleted(true);
    } else {
      console.error(data);
    }
    setIsLoading(false);
  }

  useEffect(checkDeleted, [])

  const handleMessageDelete = async () => {
    setIsLoading(true);
    const response = await fetch(`
      https://api-${auth.appId}.sendbird.com/v3/group_channels/${channel.channel_url}/messages/${message.message_id}
    `, {
      method: 'DELETE',
      headers: { 'Api-Token': auth.apiToken }
    });
    if (response.status === 200) {
      setIsDeleted(true);
    } else {
      const data = await response.json();
      console.error(data);
    }
    setIsLoading(false);
  }

  return (
    <LoadingButton
      onClick={handleMessageDelete}
      variant={isDeleted ? 'outlined' : 'contained'}
      loading={isLoading}
      startIcon={<DeleteIcon />}
      disabled={isDeleted}
    >
      {isDeleted ? 'Message is deleted' : 'Delete message'}
    </LoadingButton>
  )
};

export default DeleteMessageButton;

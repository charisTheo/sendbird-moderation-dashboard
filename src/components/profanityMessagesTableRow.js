import React, { useState } from 'react';
import {
  Collapse,
  Grid,
  IconButton,
  Link,
  TableCell,
  TableRow
} from '@mui/material';
import Moment from 'react-moment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MuteButton from './muteButton';
import BanButton from './banButton';
import FreezeButton from './freezeButton';
import DeleteMessageButton from './deleteMessageButton';
import { getLinkToUser } from '../utils';


const ProfanityMessagesTableRow = ({ message, channel_url }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisibility] = useState(false);

  const toggleVisibility = () => setVisibility(!visible)

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => setOpen(!open)}
        hover
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link target="_blank" href={getLinkToUser(message.user_id)}>{message.user_id}</Link>
        </TableCell>
        <TableCell>{message.blocked_text}</TableCell>
        <TableCell>{message.replaced_text}</TableCell>
        <TableCell>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item xs={6}>
              "<i>{visible ? message.message_text : message.message_text.replaceAll(/./g, '*')}</i>"
            </Grid>
            <Grid item xs={6}>
              <IconButton onClick={toggleVisibility}>
                {visible ? <VisibilityIcon color='primary' /> : <VisibilityOffIcon color='primary' />}
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell><Moment>{message.message_ts}</Moment></TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container sx={{m: 2}} spacing={2} justifyContent='center'>
              <Grid item><MuteButton user={{user_id: message.user_id}} channel={{channel_url}} /></Grid>
              <Grid item><BanButton user={{user_id: message.user_id}} channel={{channel_url}} /></Grid>
              <Grid item><DeleteMessageButton message={message} channel={{channel_url}} /></Grid>
              <Grid item><FreezeButton channel={{channel_url}} /></Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
};

export default ProfanityMessagesTableRow;

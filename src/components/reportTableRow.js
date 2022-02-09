import React, { useState } from 'react';
import {
  Button,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import Moment from 'react-moment';
import { getLinkToGroupChannel, getLinkToUser } from '../utils';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuteButton from './muteButton';
import BanButton from './banButton';
import FreezeButton from './freezeButton';
import DeleteMessageButton from './deleteMessageButton';

const ReportTableRow = ({ type, report }) => {
  const [open, setOpen] = useState(false);

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
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link target="_blank" href={getLinkToUser(report.reporting_user?.user_id)}>
            {report.reporting_user?.user_id}
          </Link>
        </TableCell>
        <TableCell>
          {type === 'channel'
            ? <Link target="_blank" href={getLinkToGroupChannel(report.channel.channel_url)}>
                {report.channel.name}
              </Link>
            : <Link target="_blank" href={getLinkToUser(report.offending_user?.user_id)}>
                {report.offending_user?.user_id}
              </Link>
            }
        </TableCell>
        <TableCell><Moment>{report.created_at * 1000}</Moment></TableCell>
        <TableCell>
          <Chip label={report.report_category} color="secondary" variant="filled" />
        </TableCell>
        <TableCell>"<i>{report.report_description}</i>"</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="h5" component='h3' sx={{mt: 2, mb: 1}}>
              Channel name: <i>"{report.channel.name}"</i>
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  type="link"
                  variant="contained"
                  href={`profanity/${report.channel.channel_url}`}
                >
                  Channel profanities
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="link"
                  variant="contained"
                  target="_blank"
                  href={getLinkToGroupChannel(report.channel.channel_url)}
                >
                  View channel↗
                </Button>
              </Grid>
            </Grid>

            {type === 'message' && (
              <>
                <Typography variant="h5" component='h3' sx={{mt: 2, mb: 1}}>
                  Reported message: {report.reported_message?.file?.url
                    && <Link target="_blank" href={report.reported_message.file.url}>file</Link>
                  }
                </Typography>
                {report.reported_message?.message && (
                  <blockquote>{report.reported_message.message}</blockquote>
                )}
              </>
            )}
            <Typography variant="h5" component='h3' sx={{mt: 2, mb: 1}}>
              Description:
            </Typography>
            <blockquote>{report.report_description}</blockquote>
            <Grid container sx={{m: 2}} spacing={2} justifyContent='center'>
              <Grid item>
                <MuteButton user={report.offending_user} channel={report.channel} />
              </Grid>
              <Grid item>
                <BanButton user={report.offending_user} channel={report.channel} />
              </Grid>
              {report.reported_message && (
                <Grid item>
                  <DeleteMessageButton message={report.reported_message} channel={report.channel} />
                </Grid>
              )}
              <Grid item>
                <FreezeButton channel={report.channel} />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
};

export default ReportTableRow;

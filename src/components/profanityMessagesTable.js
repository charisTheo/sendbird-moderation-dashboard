import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { CircularProgress, Typography } from '@mui/material';
import ProfanityMessagesTableRow from './profanityMessagesTableRow';

const ProfanityMessagesTable = ({ channelUrl, messages, isLoading, channelType }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
      >
        Messages containing profanities
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ mb: '2rem' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>User ID</TableCell>
              <TableCell>Blocked text</TableCell>
              <TableCell>Replaced text</TableCell>
              <TableCell>Message text</TableCell>
              <TableCell>Sent at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && messages.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map((m, i) =>
              <ProfanityMessagesTableRow
                key={'message-' + i}
                message={m}
                channel_url={channelUrl}
                channelType={channelType}
              />
            )}
          </TableBody>
        </Table>

        {isLoading
          && <CircularProgress
            color='primary'
            sx={{ m: '2rem auto 0' }}
            style={{ display: 'block' }}
          />
        }

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={messages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default ProfanityMessagesTable
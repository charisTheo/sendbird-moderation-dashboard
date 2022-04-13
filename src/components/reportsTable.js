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
import ReportTableRow from './reportTableRow';

const ReportsTable = ({type, data, isLoading}) => {
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
        {type[0].toUpperCase() + type.substring(1, type.length)} reports
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{mb: '2rem'}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Reported by</TableCell>
              <TableCell>{type === 'channel' ? 'Reported Channel' : 'Reported user'}</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && data.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map((r, i) =>
              <ReportTableRow key={'report-' + i} report={r} type={type} />
            )}
          </TableBody>
        </Table>

        {isLoading
          && <CircularProgress
              color='primary'
              sx={{m: '2rem auto 0'}}
              style={{display: 'block'}}
            />
        }

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default ReportsTable
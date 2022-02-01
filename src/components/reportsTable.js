import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const ReportsTable = ({type, data}) => {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
      >
        {type[0].toUpperCase() + type.substring(1, type.length)} reports table
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reported by</TableCell>
              <TableCell align="right">Reported user</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((report, i) => (
              <TableRow
                key={'report-' + i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {report.reporting_user?.user_id}
                </TableCell>
                <TableCell align="right">{report.offending_user?.user_id}</TableCell>
                <TableCell align="right">{report.created_at}</TableCell>
                <TableCell align="right">{report.report_category}</TableCell>
                <TableCell align="right">"<i>{report.report_description}</i>"</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ReportsTable
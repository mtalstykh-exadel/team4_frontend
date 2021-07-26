import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './TestsDataForVerification.scss';

const TestsDataForVerification = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = ['ID', 'Level', 'Assigned', 'Test deadline', 'Priority', 'Action'];
  const testForVerification = [
    { id: 765987, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'medium' },
    { id: 765988, level: 'A2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'high' },
    { id: 765989, level: 'B1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'high' },
    { id: 765990, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'medium' },
    { id: 765991, level: 'C1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'low' },
    { id: 765992, level: 'B2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'high' },
    { id: 765993, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'medium' },
    { id: 765994, level: 'A2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'high' },
    { id: 765995, level: 'B1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'high' },
    { id: 765996, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'medium' },
    { id: 765997, level: 'C1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'low' },
    { id: 765998, level: 'B2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: 'high' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='tests-data-verification-wrapper'>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {rows.map((rowName) => {
                  return (
                    <TableCell key={rowName} align="left" style={{ fontWeight: 700 }}>{rowName}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{testForVerification.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell align="left">{row.level}</TableCell>
                  <TableCell align="left">{row.assignedDate}</TableCell>
                  <TableCell align="left">{row.testDeadlineDate}</TableCell>
                  <TableCell align="left">{row.priority}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" variant="outlined" size="small" style={{ width: 110, border: 'solid 2px #3F51B5' }} >
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={testForVerification.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TestsDataForVerification;

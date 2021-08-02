import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from '@material-ui/core';
import './TestsForVerificationTable.scss';

export const TestsForVerificationTable = () => {

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

  const tableHeadCells = rows.map((rowName) => {
    return (
      <TableCell className='font-primary base-color-elevated' key={rowName} align='left' style={{ fontWeight: 700 }}>{rowName}</TableCell>
    );
  });

  return (
    <div className='tests-data-verification-wrapper'>
      <Paper elevation={2}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {tableHeadCells}
              </TableRow>
            </TableHead>
            <TableBody>{testForVerification.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell className='font-primary' component='th' scope='row'>{row.id}</TableCell>
                  <TableCell className='font-primary' align='left'>{row.level}</TableCell>
                  <TableCell className='font-primary' align='left'>{row.assignedDate}</TableCell>
                  <TableCell className='font-primary' align='left'>{row.testDeadlineDate}</TableCell>
                  <TableCell className='font-primary' align='left'>{row.priority}</TableCell>
                  <TableCell className='font-primary' align='left'>
                    <Button color='primary' variant='outlined' size='small' style={{ width: 110}} >
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
          className='font-primary'
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
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

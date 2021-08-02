import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { filteredEmloyees } from './mock-data-employees';

export const EmployeesTable = () => {

  const rows = ['Name', 'Level', 'Test deadline', 'E-mail', 'Action', 'History'];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper elevation={2}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {rows.map((rowName) => {
                  return (
                    <TableCell className='font-primary base-color-elevated' key={rowName} align='left' style={{ fontWeight: 700 }}>{rowName}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{filteredEmloyees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell className='font-primary' component='th' scope='row'>{row.name}</TableCell>
                  <TableCell className='font-primary' align='left' size='small'>{row.level}</TableCell>
                  <TableCell className='font-primary' align='left' size='small'>{row.testDeadline}</TableCell>
                  <TableCell className='font-primary' align='left' size='small'>{row.mail}</TableCell>
                  <TableCell className='font-primary' align='left'>
                    {row.assigne ? <Button color='secondary' variant='outlined' size='small' style={{ width: 110 }} disabled type='search' className='btn-search' >
                      Deassign
                    </Button>
                      : <Button color='primary' variant='outlined' size='small' style={{ width: 110 }} type='search' className='btn-search' >
                        Assign test
                      </Button>}
                  </TableCell>
                  <TableCell align='left'>{<RestoreOutlinedIcon color='primary' className='archiveBtn' />}</TableCell>
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
          count={filteredEmloyees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

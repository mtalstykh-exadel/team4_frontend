import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { filteredEmloyees } from './mock-data-employees';
import { Trans } from '@lingui/macro';

export const EmployeesTable = () => {

  const rows = [['Name', 'Имя'], ['Level', 'Уровень'], ['Test deadline', 'Срок сдачи'], ['E-mail', 'Электронная почта'], ['Action', 'Действие'], ['History', 'История']];
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
                    <TableCell key={rowName} align='left'><Trans>{rowName[0]}{rowName[1]}</Trans></TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{filteredEmloyees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>{row.name}</TableCell>
                  <TableCell align='left' size='small'>{row.level}</TableCell>
                  <TableCell align='left' size='small'>{row.testDeadline}</TableCell>
                  <TableCell align='left' size='small'>{row.mail}</TableCell>
                  <TableCell align='left'>
                    {row.assigne ? <Button color='secondary' variant='outlined' size='small' style={{ width: 140 }} disabled type='search' className='btn-search' >
                      <Trans>Deassign</Trans>
                    </Button>
                      : <Button color='primary' variant='outlined' size='small' style={{ width: 140 }} type='search' className='btn-search' >
                        <Trans>Assign test</Trans>
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

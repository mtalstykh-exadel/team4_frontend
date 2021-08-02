import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from '@material-ui/core';
import './TestsForVerificationTable.scss';
import { Trans } from '@lingui/macro';

export const TestsForVerificationTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = [['ID','ID'], ['Level','Уровень'], ['Assigned','Дата назначения'], ['Test deadline', 'Крайний срок сдачи'], ['Priority', 'Приоритет'], ['Action','Действие']];
  const testForVerification = [
    { id: 765987, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['medium','средний'] },
    { id: 765988, level: 'A2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['high','высокий'] },
    { id: 765989, level: 'B1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['high','высокий'] },
    { id: 765990, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['medium','средний'] },
    { id: 765991, level: 'C1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['low', 'низкий'] },
    { id: 765992, level: 'B2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['high','высокий'] },
    { id: 765993, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['medium','средний'] },
    { id: 765994, level: 'A2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['high','высокий'] },
    { id: 765995, level: 'B1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['high','высокий'] },
    { id: 765996, level: 'A1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['medium','средний'] },
    { id: 765997, level: 'C1', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['low', 'низкий'] },
    { id: 765998, level: 'B2', assignedDate: '19 Jun 2021, 10:54', testDeadlineDate: '30 Jun 2021, 10:54', priority: ['high','высокий'] },
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
      <TableCell key={rowName} align='left' style={{ fontWeight: 700 }}><Trans>{rowName[0]}{rowName[1]}</Trans></TableCell>
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
                  <TableCell component='th' scope='row'>{row.id}</TableCell>
                  <TableCell align='left'>{row.level}</TableCell>
                  <TableCell align='left'>{row.assignedDate}</TableCell>
                  <TableCell align='left'>{row.testDeadlineDate}</TableCell>
                  <TableCell align='left'><Trans>{row.priority[0]}{row.priority[1]}</Trans></TableCell>
                  <TableCell align='left'>
                    <Button color='primary' variant='outlined' size='small' style={{ width: 110 }} >
                      <Trans>Verify</Trans>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={<Trans>Rows per page: </Trans>}
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

import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Modal } from '@material-ui/core';
import './TestsForVerificationTable.scss';
import { Trans } from '@lingui/macro';
import { TestsForVerificationModal } from './Modals/TestsForVerificationModal';

export const TestsForVerificationTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [levelAndID, setLevelAndID] = useState(['id','level']);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tableHeadCells = rows.map((rowName) => {
    return (
      <TableCell key={rowName} align='left'><Trans>{rowName[0]}{rowName[1]}</Trans></TableCell>
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
                    <Button color='primary'
                            variant='outlined'
                            size='small'
                            style={{ width: 110 }}
                            onClick={() => {
                              setLevelAndID([row.id,row.level]);
                              handleOpen();
                            }}
                    >
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          className='modal'>
          <div className='modal-content'>
            <TestsForVerificationModal id={levelAndID[0]} level={levelAndID[1]} handleClose={handleClose}/>
          </div>
        </Modal>
      </Paper>
    </div>
  );
};

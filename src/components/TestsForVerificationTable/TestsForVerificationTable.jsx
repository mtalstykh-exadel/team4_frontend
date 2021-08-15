import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Modal } from '@material-ui/core';

import './TestsForVerificationTable.scss';
import { Trans } from '@lingui/macro';
import { TestsForVerificationModal } from './Component/TestsForVerificationModal';

import { requestUnverifiedTests } from '../../store/actions/unverifiedTestActions';

import { requestReports } from '../../store/actions/unverifiedTestActions';
export const TestsForVerificationTable = () => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState('');

  useEffect(() => {
    dispatch(requestUnverifiedTests());
  }, []);

  const rows = [['ID','ID'], ['Level','Уровень'], ['Assigned','Дата назначения'], ['Test deadline', 'Крайний срок сдачи'], ['Priority', 'Приоритет'], ['Action','Действие']];
  const unverifiedTests = useSelector((state) => state.unverifiedTests);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    unverifiedTests.length < rowsPerPage && setPage(0);
  }, [unverifiedTests]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            <TableBody>{unverifiedTests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>{row.id}</TableCell>
                  <TableCell align='left'>{row.level}</TableCell>
                  <TableCell align='left'>{row.assignedDate}</TableCell>
                  <TableCell align='left'>{row.testDeadlineDate}</TableCell>
                  <TableCell align='left'><Trans>{row.priority}</Trans></TableCell>
                  <TableCell align='left'>
                    <Button color='primary'
                      className='button-standard'
                      variant='outlined'
                      size='small'
                      onClick={() => {
                        dispatch(requestUnverifiedTests())
                          .then(() => setTest(row))
                          .then(() => dispatch(requestReports(row.id))
                            .then(() => setOpen(true)));
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
          count={unverifiedTests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          className='modal'>
          <div className='modal-content'>
            {unverifiedTests.find((x) => x.id === test.id) ? <TestsForVerificationModal id={test.id} test={test} handleClose={() => setOpen(false)}/> : 'Test was deassigned'}
          </div>
        </Modal>
      </Paper>
    </div>
  );
};

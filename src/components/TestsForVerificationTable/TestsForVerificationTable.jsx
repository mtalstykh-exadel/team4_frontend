import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Modal } from '@material-ui/core';

import './TestsForVerificationTable.scss';
import { Trans } from '@lingui/macro';

import { TestsForVerificationModal } from './Component/TestsForVerificationModal';
import { TableRowTest } from './Component/tableRowTest/TableRowTest';
import { ModalWindowRemovedFromYourPost } from './ModalWindowRemovedFromYourPost/ModalWindowRemovedFromYourPost';

import { requestUnverifiedTests, requestGrades, requestReports } from '../../store/actions/unverifiedTestActions';

export const TestsForVerificationTable = () => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState('');

  useEffect(() => {
    dispatch(requestUnverifiedTests());
  }, []);

  const rows = [['ID','ID'], ['Level','Уровень'], ['Date started','Дата начала'], ['Date completed', 'Дата прохождения'], ['Priority', 'Приоритет'], ['Action','Действие']];
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

  const handleVerifyTest = (row) => {
    return dispatch(requestUnverifiedTests())
      .then(() => setTest(row))
      .then(() => dispatch(requestReports(row.id))
        .then(() => dispatch(requestGrades(row.id))
          .then(() => Promise.resolve(setOpen(true)))));
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
            <TableBody>{unverifiedTests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((test, index) => {
              return (
                <TableRowTest test={test} key={index} handleVerifyTest={handleVerifyTest}/>
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
            {unverifiedTests.find((unverifiedTest) => unverifiedTest.id === test.id) ?
              <TestsForVerificationModal id={test.id} test={test} handleClose={() => setOpen(false)}/> :
              <ModalWindowRemovedFromYourPost handleClose={() => setOpen(false)}/>}
          </div>
        </Modal>
      </Paper>
    </div>
  );
};

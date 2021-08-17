import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import moment from 'moment-timezone';
import { currentTest, testGrammarUserAnswers, testEassyUserAnswers, testListeningUserAnswers, testSpeakingAnswers } from '../../../constants/localStorageConstants';
import { startTestById } from '../../../api/start-test';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UserModalWindowBanningTest } from './UserModalWindowBanningOfPassingTest/UserModalWindowBanningOfPassingTest';

const TestsData = (props) => {
  const history = useHistory();

  const columns = [
    { id: 'level', label: ['Level', 'Уровень'], minWidth: 50, align: 'center' },
    { id: 'assigned', label: ['Assigned', 'Дата назначения'], minWidth: 130, align: 'center' },
    { id: 'deadline', label: ['Deadline', 'Срок прохождения'], minWidth: 130, align: 'center', },
    { id: 'verified', label: ['Date verified', 'Дата проверки'], minWidth: 130, align: 'center', },
    { id: 'status', label: ['Status', 'Статус'], minWidth: 40, align: 'center', },
    { id: 'evaluation', label: ['Result', 'Результат'], minWidth: 80, align: 'center', },
    { id: 'action', label: ['Action', 'Действие'], minWidth: 100, align: 'center', },
  ];

  const testsHistory = useSelector((state) => state.profile.testsHistory);

  const dateFormatter = (date) => {
    if (date) return moment(date).format('DD MMM YYYY, hh:mm');
    else null;
  };


  const filterRow = (row) => {
    const filteredRow = [];
    row.map((el) => {
      filteredRow.push(
        {
          ...el,
          assigned: el.assigned && dateFormatter(el.assigned),
          deadline: el.deadline && dateFormatter(el.deadline),
          verified: el.deadline && dateFormatter(el.verified),
          evaluation: el.evaluation ? el.evaluation > 20 ? 'passed' : 'not passed' : null,
          action: el.status === 'ASSIGNED' ? ['Take test', 'Пройти тест']
            : el.status === 'EXPIRED' || el.status === 'VERIFIED' ? ['Try again', 'Пройти заново']
              : el.status === 'STARTED' ? 'continue' : null
        }
      );
    });
    return filteredRow;
  };

  const formattedTestsHistory = testsHistory ? filterRow(testsHistory) : [];

  const filteredRows = formattedTestsHistory.filter((r) => props.filter ? r.level === props.filter : r);

  let keysForColumns = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={2}>
      <TableContainer>
        <UserModalWindowBanningTest open={open} handleClose={handleClose}/>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} >
                  <Trans>{column.label[0]}{column.label[1]}</Trans>
                </TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.testId} >
                    {columns.map((column) => {
                      ++keysForColumns;
                      const value = row[column.id];
                      return (
                        <TableCell key={keysForColumns} align={column.align} size='medium'>
                          {
                            column.id === 'action' && value ?
                              loading
                                ?
                                <CircularProgress className='border-primary' size='25px' />
                                :
                                <Button className='button-standard' color='primary' variant='contained'
                                  onClick={() => {
                                    setLoading(true);
                                    localStorage.removeItem(currentTest);
                                    localStorage.removeItem(testGrammarUserAnswers);
                                    localStorage.removeItem(testEassyUserAnswers);
                                    localStorage.removeItem(testListeningUserAnswers);
                                    localStorage.removeItem(testSpeakingAnswers);
                                    startTestById(row.testId)
                                      .then((response) => {
                                        localStorage.setItem(currentTest, JSON.stringify(response));
                                        history.push('/test');
                                        window.scrollTo(0, 0);
                                      })
                                      .catch((err) => {
                                        setLoading(false);
                                        if (err.code === 409) {
                                          handleOpen();
                                        }
                                      });
                                  }
                                  } >
                                  <Trans>Take Test</Trans>
                                </Button>
                              : Array.isArray(value) ? <Trans>{value[0]}{value[1]}</Trans> : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[10]} component='div' count={filteredRows.length} rowsPerPage={rowsPerPage}
        page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  );
};

TestsData.propTypes = {
  filter: PropTypes.any
};

export default TestsData;

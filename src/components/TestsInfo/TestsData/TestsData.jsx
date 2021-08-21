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
import moment from 'moment';
import { currentTest, testAudioAttempts, testEassyUserAnswers, testGrammarUserAnswers, testListeningUserAnswers, testSpeakingAnswers } from '../../../constants/localStorageConstants';
import { startTestById } from '../../../api/start-test';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UserModalWindowBanningTest } from './UserModalWindowBanningOfPassingTest/UserModalWindowBanningOfPassingTest';
import { ModalWindowTestCanceled } from '../ModalWindowTestCanceled/ModalWindowTestCanceled';

import { getTest } from '../../../api/get-test';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestUserTestsHistory } from '../../../store/actions/profileActions';
import getUserTests from '../../../api/user-tests';

const TestsData = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const columns = [
    { id: 'level', label: ['Level', 'Уровень'], minWidth: 50, align: 'center' },
    { id: 'assigned', label: ['Assigned', 'Дата назначения'], minWidth: 130, align: 'center' },
    { id: 'deadline', label: ['Deadline', 'Срок прохождения'], minWidth: 130, align: 'center', },
    { id: 'verified', label: ['Date verified', 'Дата проверки'], minWidth: 130, align: 'center', },
    { id: 'status', label: ['Status', 'Статус'], minWidth: 40, align: 'center', },
    { id: 'totalScore', label: ['Result', 'Результат'], minWidth: 80, align: 'center', },
    { id: 'action', label: ['Action', 'Действие'], minWidth: 100, align: 'center', },
  ];

  const testsHistory = useSelector((state) => state.profile.testsHistory);

  const dateFormatter = (date) => {
    if (date) return moment(date).format('DD MMM YYYY, hh:mm');
    else null;
  };

  const getResult = (testId) => {
    localStorage.setItem(currentTest, JSON.stringify({ id: testId }));
    history.push('/result');
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

  let keysForColumns = 0;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(rowsPerPage);
  const [open, setOpen] = useState(false);
  const [openDeassigned, setOpenDeassigned] = useState(false);

  useEffect(() => {
    dispatch(requestUserTestsHistory(page, rowsPerPage));
  }, []);

  useEffect(() => {
    handleCount();
  }, []);

  const handleCount = (newPage = page) => {
    getUserTests(newPage + 1, rowsPerPage)
      .then((response) => {
        if (response.length > 0) {
          setCount(count + response.length);
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    dispatch(requestUserTestsHistory(newPage, rowsPerPage));
    handleCount(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [loading, setLoading] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Paper elevation={2}>
      <TableContainer>
        <UserModalWindowBanningTest open={open} handleClose={handleClose} />
        <ModalWindowTestCanceled open={openDeassigned} handleClose={() => setOpenDeassigned(false)} />
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
              filteredRows.map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.testId} >
                    {columns.map((column) => {
                      keysForColumns++;
                      const value = row[column.id];
                      return (
                        <TableCell key={keysForColumns} align={column.align} size='medium'>
                          {
                            column.id === 'action' && value ?
                              loading && loading === row.testId
                                ?
                                <CircularProgress className='border-primary' size='25px' />
                                :
                                row.status === 'ASSIGNED'
                                  ?
                                  <Button className='button-standard' color='primary' variant='contained'
                                    onClick={() => {
                                      setLoading(row.testId);
                                      localStorage.removeItem(currentTest);
                                      localStorage.removeItem(testGrammarUserAnswers);
                                      localStorage.removeItem(testEassyUserAnswers);
                                      localStorage.removeItem(testListeningUserAnswers);
                                      localStorage.removeItem(testSpeakingAnswers);
                                      localStorage.setItem(testAudioAttempts, 3);
                                      startTestById(row.testId)
                                        .then((response) => {
                                          localStorage.setItem(currentTest, JSON.stringify(response));
                                          history.push('/test');
                                          window.scrollTo(0, 0);
                                        })
                                        .catch((err) => {
                                          setLoading(null);
                                          if (err.response.status === 409) {
                                            handleOpen();
                                          } else if (err.response.status === 404) {
                                            setOpenDeassigned(true);
                                          }
                                        });
                                    }
                                    } >
                                    <Trans>Take Test</Trans>
                                  </Button>
                                  :
                                  row.status === 'VERIFIED' ? <Button className='button-standard' color='primary' variant='contained'
                                    onClick={() => {
                                      setLoading(row.testId);
                                      getResult(row.testId);
                                      setLoading(null);
                                    }}
                                  >
                                    <Trans>View Results</Trans>
                                  </Button>
                                    :
                                    <Button className='button-standard' color='primary' variant='contained'
                                      onClick={() => {
                                        setLoading(row.testId);
                                        getTest(row.testId)
                                          .then((response) => {
                                            localStorage.setItem(testAudioAttempts, 1);
                                            localStorage.setItem(currentTest, JSON.stringify(response));
                                            history.push('/test');
                                            setLoading(null);
                                          });
                                      }} >
                                      <Trans>Continue</Trans>
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
      <TablePagination
        rowsPerPageOptions={[10]}
        component='div' count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  );
};

TestsData.propTypes = {
  filter: PropTypes.any
};

export default TestsData;

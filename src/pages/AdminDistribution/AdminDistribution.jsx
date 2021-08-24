import React, { useState, useEffect } from 'react';
import { userLanguageKey } from '@constants/localStorageConstants';
import { Redirect } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  Select, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import './AdminDistribution.scss';
import { changeButtonStyle, assignCoachTest, deassignCoachTest } from './ScriptsAdminDistributtion';
import { Trans } from '@lingui/macro';
import { useDispatch, useSelector } from 'react-redux';
import { requestQuestionsList } from '@actions/adminActions';
import getCoaches from '@api/get-coaches';
import { formatDate } from '@utils/data-formatter';
import { ModalWindowWarningTemplate } from './ModalWindowTemplate/ModalWindowWarningTemplate';

import { language_russian } from '@constants/languageConstants';
import { getUnverifiedTests } from '@api/unverifiedTests-fetch';

const AdminDistribution = (props) => {

  const dispatch = useDispatch();

  const columns = [
    { id: 'level', label: ['Level', 'Уровень'], minWidth: 73, align: 'right' },
    { id: 'Assigned', label: ['Assigned', 'Назначенный'], minWidth: 227, align: 'right' },
    { id: 'Deadline', label: ['Deadline', 'Срок сдачи'], minWidth: 227, align: 'right' },
    { id: 'Coach', label: ['Coach', 'Тренер'], minWidth: 434, align: 'right' },
    { id: 'action', label: ['Action', 'Действие'], minWidth: 270, align: 'right' },
  ];

  const rows = useSelector((state) => state.admin.testsList);

  const filteredRows = rows.filter((r) =>
    props.filter ? r.level === props.filter : r
  );

  let keysForColumns = 1;
  let keysForOptions = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(rowsPerPage);
  const role = useSelector((state) => state.jwt.role);
  const [coaches, setCoaches] = useState();
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState([]);
  const [count, setCount] = useState(rowsPerPage);

  useEffect(() => {
    getCoaches().then((response) => setCoaches(response));
  }, [getCoaches]);

  useEffect(() => {
    handleCount();
  }, []);

  const handleCount = (newPage = page) => {
    getUnverifiedTests(newPage + 1, rowsPerPage)
      .then((response) => {
        if (response.length > 0) {
          setCount(rowsPerPage * (newPage + 2));
        }
      });
  };

  let coachNames = [];

  if (coaches !== undefined) {
    coachNames = coaches.map((coach) => { return { name: coach.name, id: coach.id }; });
  }

  const handleChangePage = (event, newPage) => {
    dispatch(requestQuestionsList(newPage, rowsPerPage));
    if ( newPage > page) {
      handleCount(newPage);
    }
    window.scrollTo(0, 0);
    setPage(newPage);
    setTimeout(() => {
      handleChangeDeassignTest(rows);
    }, 0);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let assignSelect;
  let assignButton;

  const handleChangeDeassignTest = (rows) => {
    rows.map((unverifiedTest) => {
      unverifiedTest?.coach ? (
        assignSelect = document.getElementById('item-' + unverifiedTest.testId + '-select'),
        assignButton = document.getElementById('item-' + unverifiedTest.testId + '-button'),
        assignSelect !== null ? (
          assignSelect.value = unverifiedTest.coach.id,
          assignButton.textContent.toLowerCase() !== 'deassign' || assignButton.textContent.toLowerCase() !== 'отменить' ? (
            changeButtonStyle(unverifiedTest.testId)
          ) : (
            null
          )
        ) : (
          null
        )
      ) : (
        assignSelect = document.getElementById('item-' + unverifiedTest.testId + '-select'),
        assignButton = document.getElementById('item-' + unverifiedTest.testId + '-button'),
        assignSelect !== null ? (
          assignSelect.value === 'placeholder' ? (
            assignButton.textContent = localStorage.getItem(userLanguageKey) !== 'rus' ? 'ASSIGN' : 'НАЗНАЧИТЬ'
          ) : (
            null
          )
        ) : (
          null
        )
      );
    });
  };

  useEffect(() => {
    dispatch(requestQuestionsList(page, rowsPerPage));
  }, []);

  if (role !== 'ROLE_ADMIN') return <Redirect to='/' />;

  setTimeout(() => {
    handleChangeDeassignTest(rows);
  }, 0);

  return (
    <Layout pageWrapperClass='AdminDistribution'>
      <Paper elevation={2} className='paper'>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className='headItems font-primary base-color-elevated'
                    size='small'
                    key={column.id}
                    align={column.align}
                  >
                    <Trans>
                      {column.label[0]}
                      {column.label[1]}
                    </Trans>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.testId} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        keysForColumns++;
                        return (
                          <TableCell
                            className='font-primary'
                            key={keysForColumns}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            size='small'
                          >
                            {column.id === 'Assigned' ? (
                              row?.assigned ? (
                                <>
                                  {formatDate(row.assigned)}
                                </>
                              ) : (
                                null
                              )
                            ) : null}

                            {column.id === 'Deadline' ? (
                              row?.deadline ? (
                                <>
                                  {formatDate(row.deadline)}
                                </>
                              ) : (
                                null
                              )
                            ) : null}

                            {column.id === 'Coach' ? (
                              <Select id={'item-' + row.testId + '-select'} className='selectCoachNames font-primary'
                                native variant='outlined' defaultValue='placeholder'>
                                <option aria-label='None' value='placeholder' >
                                  {localStorage.getItem(userLanguageKey) !== language_russian ?
                                    (
                                      'name'
                                    ) : (
                                      'имя'
                                    )
                                  }
                                </option>
                                {coachNames.map((coachName) => {
                                  keysForOptions++;
                                  return (
                                    <option key={keysForOptions} value={coachName.id} id={coachName.id}>
                                      {coachName.name}
                                    </option>
                                  );
                                })}
                              </Select>
                            ) : null}

                            {column.id === 'action' ? (
                              <Button
                                id={'item-' + row.testId + '-button'}
                                className='buttonAssign button-standard'
                                variant='outlined'
                                size='small'
                                onClick={() => {
                                  const currentElement = document.getElementById('item-' + row.testId + '-button').textContent.toLowerCase();
                                  if (currentElement === 'assign' || currentElement === 'назначить') {
                                    assignCoachTest(row.testId, document.getElementById('item-' + row.testId + '-select').value)
                                      .then(() => changeButtonStyle(row.testId))
                                      .catch((err) => {
                                        setOpen(true);
                                        if (err.response && err.response.status === 409) {
                                          setModalText(['Coach not allowed to verify his own test', 'Тренеру не разрешено проверять свой тест']);
                                        } else if (err === 'No coach') {
                                          setModalText(['Choose a coach', 'Выберите тренера']);
                                        }
                                      });
                                  } else {
                                    deassignCoachTest(row.testId);
                                    changeButtonStyle(row.testId);
                                  }
                                }}
                              />
                            ) : (
                              value
                            )}
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
          className='font-primary'
          rowsPerPageOptions={[10]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalWindowWarningTemplate open={open} text={modalText} handleClose={() => { setOpen(false), handleChangeDeassignTest(rows); }} />
    </Layout>
  );
};

AdminDistribution.propTypes = {
  filter: PropTypes.any,
};

export default AdminDistribution;

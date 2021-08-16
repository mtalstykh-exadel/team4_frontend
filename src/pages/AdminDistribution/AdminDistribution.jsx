import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  Select, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import './AdminDistribution.scss';
import { assignTest } from './ScriptsAdminDistributtion';
import { Trans } from '@lingui/macro';
import { useDispatch, useSelector } from 'react-redux';
import { requestQuestionsList } from '../../store/actions/adminActions';
import getCoaches from '../../api/get-coaches';

const AdminDistribution = (props) => {

  const dispatch = useDispatch();

  const columns = [
    { id: 'level', label: ['Level', 'Уровень'], width: 83, align: 'right' },
    { id: 'startedAt', label: ['Assigned', 'Назначенный'], width: 237, align: 'right' },
    { id: 'completedAt', label: ['Deadline', 'Срок сдачи'], width: 237, align: 'right' },
    { id: 'Coach', label: ['Coach', 'Тренер'], width: 444, align: 'right' },
    { id: 'action', label: ['Action', 'Действие'], width: 270, align: 'right' },
  ];

  const rows = useSelector((state) => state.admin.testsList);

  const filteredRows = rows.filter((r) =>
    props.filter ? r.level === props.filter : r
  );

  let keysForColumns = 1;
  let keysForOptions = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const role = useSelector((state) => state.jwt.role);
  const [coaches, setCoaches] = useState();

  useEffect(() => {
    getCoaches().then((response) => setCoaches(response));
  }, [getCoaches]);

  let coachNames = [];

  if (coaches !== undefined) {
    coachNames = coaches.map((coach) => {return {name: coach.name, id: coach.id};});
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('перешел на другую страничку');
    dispatch(requestQuestionsList());
    handleChangeDeassignTest(rows); 
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDeassignTest = (rows) => {
    rows.map((unverifiedTest) => {
      unverifiedTest?.coach ? (
          assignTest(unverifiedTest.testId)
      ) : ( 
        null
      );
    });
  };

  useEffect(() => {
    dispatch(requestQuestionsList());
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            width={column.width + 'px'} 
                            size='small'
                          >
                            {column.id === 'Coach' ? (
                              <Select id={'item-' + row.testId + '-select'} className='selectCoachNames font-primary'
                                native variant='outlined' defaultValue='placeholder'>
                                <option aria-label='None' value='placeholder' >
                                  name
                                </option>
                                {coachNames.map((coachName) => {
                                  keysForOptions++;
                                  return (
                                    <option key={keysForOptions} value={coachName.name} id={coachName.id}>
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
                                  assignTest(row.testId);
                                }}
                              >
                                <Trans>
                                  Assign
                                </Trans>
                              </Button>
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
};

AdminDistribution.propTypes = {
  filter: PropTypes.any,
};

export default AdminDistribution;

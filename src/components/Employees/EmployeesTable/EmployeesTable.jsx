import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { Trans } from '@lingui/macro';
import { useDispatch, useSelector } from 'react-redux';
import { requestEmployeesList } from '../../../store/actions/employeesActions';
import PropTypes from 'prop-types';

export const EmployeesTable = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestEmployeesList());
  }, []);

  const filteredEmployees = useSelector((state) => state.employees.filteredEmployees);

  const filterEmployees = filteredEmployees ? filteredEmployees
    .filter((el) => props.userName ? props.userName.toLowerCase() === el.name.toLowerCase() : el)
    : [];

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

  useEffect(() => {
    filterEmployees.length < rowsPerPage && setPage(0);
  }, [filterEmployees]);

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
            <TableBody>{filterEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>{row.name}</TableCell>
                  <TableCell align='left' size='small'>{row.level}</TableCell>
                  <TableCell align='left' size='small'>{row.testDeadline}</TableCell>
                  <TableCell align='left' size='small'>{row.login}</TableCell>
                  <TableCell align='left'>
                    {row.assigne ? <Button color='secondary' variant='outlined' size='small' disabled type='search' className='btn-search button-standard' >
                      <Trans>Deassign</Trans>
                    </Button>
                      : <Button color='primary' variant='outlined' size='small' type='search' className='btn-search button-standard' >
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
          count={filterEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

EmployeesTable.propTypes = {
  userName: PropTypes.string
};

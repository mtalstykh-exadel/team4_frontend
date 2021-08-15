import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';

import { Trans } from '@lingui/macro';

import { requestEmployeesList, requestEmployeeHistory } from '../../../store/actions/employeesActions';
import { deassignTest } from '../../../api/employees-fetch';

import { HRmodalWindowViewingUserInformation } from './HRmodalWindowViewingUserInformation/HRmodalWindowViewingUserInformation';
import { HRmodalWindowTestAssignment } from './HRmodalWindows/HRmodalWindowTestAssignment';
import { HRmodalWindowTestDeassigned } from './HRmodalWindows/HRmodalTestDeassigned';

import { formatDate } from '../../../utils/data-formatter';

export const EmployeesTable = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestEmployeesList());
  }, []);

  const filteredEmployees = useSelector((state) => state.employees);

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

  const [row, setRow] = useState([]);


  const [open, setOpen] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openDeassigned, setOpenDeassigned] = useState(false);
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
            <TableBody>{filterEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row ) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>{row.name}</TableCell>
                  <TableCell align='left' size='small'>{row.assignedTest ? row.assignedTest.level : null}</TableCell>
                  <TableCell align='left' size='small'>{row.assignedTest ? formatDate(row.assignedTest.deadline) : null}</TableCell>
                  <TableCell align='left' size='small'>{row.login}</TableCell>
                  <TableCell align='left'>
                    {row.assignedTest ? <Button color='secondary' variant='outlined' size='small' type='search' className='btn-search button-standard'
                      onClick={() => deassignTest(row.assignedTest.testId)
                        .catch(() => setOpenDeassigned(true))
                        .then(() => dispatch(requestEmployeesList()))
                      }>
                      <Trans>Deassign</Trans>
                    </Button>
                      : <Button color='primary' variant='outlined' size='small' type='search' className='btn-search button-standard'
                        onClick={() => {
                          dispatch(requestEmployeesList())
                            .then(() => setRow(row))
                            .then(() => setOpen(true));
                        }}>
                        <Trans>Assign test</Trans>
                      </Button>}
                  </TableCell>
                  <TableCell align='left' onClick={() => {Promise.resolve(setRow(row))
                    .then(() => dispatch(requestEmployeeHistory(row.id)))
                    .then(() => setOpenHistory(true));}}>{<RestoreOutlinedIcon color='primary' className='archiveBtn icons-color-primary'/>}</TableCell>
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
        {<HRmodalWindowTestDeassigned open={openDeassigned} handleClose={() => setOpenDeassigned(false)}/>}
        {<HRmodalWindowTestAssignment test={row} open={open} handleClose={() => setOpen(false)}/>}
        {<HRmodalWindowViewingUserInformation test={row} open={openHistory} handleClose={() => setOpenHistory(false)}/>}
      </Paper>
    </div>
  );
};

EmployeesTable.propTypes = {
  userName: PropTypes.string
};


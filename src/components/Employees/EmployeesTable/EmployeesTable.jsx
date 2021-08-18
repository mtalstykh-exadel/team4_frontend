import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import { Trans } from '@lingui/macro';

import { requestEmployeesList, requestEmployeeHistory } from '../../../store/actions/employeesActions';
import { deassignTest } from '../../../api/employees-fetch';

import { HRmodalWindowViewingUserInformation } from './HRmodalWindowViewingUserInformation/HRmodalWindowViewingUserInformation';
import { HRmodalWindowTestAssignment } from './HRmodalWindows/HRmodalWindowTestAssignment';

import { ModalWindowWarningCannotAssign } from '../ModalWindowWarning/ModalWindowCannotAssign';
import { ModalWindowWarningCannotDeassign } from '../ModalWindowWarning/ModalWindowCannotDeassign';

import { TableEmployeeRow } from './TableEmployeeRow/TableEmployeeRow';

import { getEmployeesList } from '../../../api/employees-fetch';

export const EmployeesTable = (props) => {

  const dispatch = useDispatch();

  const filteredEmployees = useSelector((state) => state.employees);

  const filterEmployees = filteredEmployees ? filteredEmployees
    .filter((el) => props.userName ? props.userName.toLowerCase() === el.name.toLowerCase() : el)
    : [];

  const rows = [['Name', 'Имя'], ['Level', 'Уровень'], ['Test deadline', 'Срок сдачи'], ['E-mail', 'Электронная почта'], ['Action', 'Действие'], ['History', 'История']];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(rowsPerPage);

  const handleCount = (newPage = page) => {
    getEmployeesList(newPage + 1, rowsPerPage)
      .then((response) => {
        if (response !== []) {
          setCount(count + response.length);
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(requestEmployeesList(newPage, rowsPerPage));
    handleCount(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(requestEmployeesList(page, rowsPerPage));
  }, []);

  useEffect(() => {
    handleCount();
  }, []);

  const [employee, setEmployee] = useState([]);

  const [openAssign, setOpenAssign] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openDeassigned, setOpenDeassigned] = useState(false);
  const [openAssigned, setOpenAssigned] = useState(false);

  const handleDeassign = (test) => {
    return dispatch(requestEmployeesList())
      .then((state) => {
        const newEmployee = state.employee.find((x) => x.name === test.name);
        if (newEmployee && newEmployee.assignedTest) {
          deassignTest(test.assignedTest.testId)
            .then(() => dispatch(requestEmployeesList()));
        } else {
          setOpenDeassigned(true);
        }
      });
  };

  const handleAssign = (test) => {
    return dispatch(requestEmployeesList())
      .then((state) => {
        const newEmployee = state.employee.find((x) => x.name === test.name);
        if (newEmployee && !newEmployee.assignedTest) {
          setEmployee(test);
          setOpenAssign(true);
        } else {
          setOpenAssigned(true);
        }
      });
  };

  const handleHistory = (test) => {
    return Promise.resolve(setEmployee(test))
      .then(() => dispatch(requestEmployeeHistory(test.id)))
      .then(() => setOpenHistory(true));
  };

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
            <TableBody>{filterEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((filterEmployee, index ) => {
              return (
                <TableEmployeeRow
                  key={index}
                  handleAssign={handleAssign}
                  handleDeassign={handleDeassign}
                  handleHistory={handleHistory}
                  employee={filterEmployee}/>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={filterEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {<ModalWindowWarningCannotAssign open={openAssigned} handleClose={() => setOpenAssigned(false)}/>}
        {<HRmodalWindowTestAssignment test={employee} open={openAssign} handleClose={() => setOpenAssign(false)}/>}
        {<HRmodalWindowViewingUserInformation test={employee} open={openHistory} handleClose={() => setOpenHistory(false)}/>}
        {<ModalWindowWarningCannotDeassign open={openDeassigned} handleClose={() => setOpenDeassigned(false)}/>}
      </Paper>
    </div>
  );
};

EmployeesTable.propTypes = {
  userName: PropTypes.string
};

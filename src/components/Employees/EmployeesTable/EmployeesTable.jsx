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

import { requestEmployeesList, requestEmployeeHistory } from '@actions/employeesActions';
import { deassignTest } from '@api/employees-fetch';

import { HRmodalWindowViewingUserInformation } from './HRmodalWindowViewingUserInformation/HRmodalWindowViewingUserInformation';
import { HRmodalWindowTestAssignment } from './HRmodalWindows/HRmodalWindowTestAssignment';

import { ModalWindowWarningCannotAssign } from '../ModalWindowWarning/ModalWindowCannotAssign';
import { ModalWindowWarningCannotDeassign } from '../ModalWindowWarning/ModalWindowCannotDeassign';

import { TableEmployeeRow } from './TableEmployeeRow/TableEmployeeRow';

export const EmployeesTable = (props) => {

  const dispatch = useDispatch();

  const filteredEmployees = useSelector((state) => state.employees);

  const rows = [['Name', 'Имя'], ['Level', 'Уровень'], ['Test deadline', 'Срок сдачи'], ['E-mail', 'Электронная почта'], ['Action', 'Действие'], ['History', 'История']];

  const [employee, setEmployee] = useState([]);

  const [openAssign, setOpenAssign] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openDeassigned, setOpenDeassigned] = useState(false);
  const [openAssigned, setOpenAssigned] = useState(false);

  const handleChangePage = (event, newPage) => {
    if ( newPage > props.page) {
      props.handleCount(newPage);
    }
    dispatch(requestEmployeesList(props.userName, newPage, props.rowsPerPage));
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
    props.setPage(0);
  };

  useEffect(() => {
    dispatch(requestEmployeesList(props.userName, props.page, props.rowsPerPage));
  }, []);

  useEffect(() => {
    props.handleCount();
  }, []);

  const handleDeassign = (test) => {
    return deassignTest(test.assignedTest.testId)
      .then(() => dispatch(requestEmployeesList(props.userName, props.page, props.rowsPerPage)));
  };

  const handleAssign = (test) => {
    return dispatch(requestEmployeesList(props.userName, props.page, props.rowsPerPage))
      .then(() => setEmployee(test))
      .then(() => dispatch(requestEmployeesList(props.userName, props.page, props.rowsPerPage)))
      .then(() => setOpenAssign(true));
  };

  const handleHistory = (test) => {
    return Promise.resolve(setEmployee(test))
      .then(() => dispatch(requestEmployeeHistory(test.id, '', 0, 3)))
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
            <TableBody>{filteredEmployees && filteredEmployees.map((filterEmployee, index ) => {
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
          count={props.count}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {<ModalWindowWarningCannotAssign
          open={openAssigned}
          handleClose={() => setOpenAssigned(false)}/>}
        {<HRmodalWindowTestAssignment
          userName={props.userName}
          test={employee}
          open={openAssign}
          handleClose={() => setOpenAssign(false)}
          setOpenCantAssign={() => setOpenAssigned(true)}
          page={props.page}
          rowsPerPage={props.rowsPerPage}/>}
        {<HRmodalWindowViewingUserInformation
          test={employee}
          open={openHistory}
          handleClose={() => setOpenHistory(false)}/>}
        {<ModalWindowWarningCannotDeassign
          open={openDeassigned}
          handleClose={() => setOpenDeassigned(false)}/>}
      </Paper>
    </div>
  );
};

EmployeesTable.propTypes = {
  userName: PropTypes.string,
  page: PropTypes.any,
  setPage: PropTypes.any,
  rowsPerPage: PropTypes.any,
  setRowsPerPage: PropTypes.any,
  count: PropTypes.any,
  handleCount: PropTypes.any
};

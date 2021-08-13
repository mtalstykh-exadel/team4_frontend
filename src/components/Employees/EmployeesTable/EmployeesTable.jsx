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
import { requestEmployeesList } from '../../../store/actions/employeesActions';
import { HRmodalWindowViewingUserInformation } from './HRmodalWindowViewingUserInformation/HRmodalWindowViewingUserInformation';
import { HRmodalWindowTestAssignment } from './HRmodalWindows/HRmodalWindowTestAssignment';

// import { assignTest, deassignTest } from '../../../api/employees-fetch';


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


  const [open, setOpen] = React.useState(false);

  const [openHistory, setOpenHistory] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen12 = () => {
    setOpenHistory(true);
  };

  const handleClose12 = () => {
    setOpenHistory(false);
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
            <TableBody>{filterEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>{row.name}</TableCell>
                  <TableCell align='left' size='small'>{row.assignedTest ? row.assignedTest.level : null}</TableCell>
                  <TableCell align='left' size='small'>{row.assignedTest ? row.assignedTest.deadline[6] : null}</TableCell>
                  <TableCell align='left' size='small'>{row.login}</TableCell>
                  <TableCell align='left'>
                    {row.assignedTest ? <Button color='secondary' variant='outlined' size='small' type='search' className='btn-search button-standard'>
                      <Trans>Deassign</Trans>
                    </Button>
                      : <Button color='primary' variant='outlined' size='small' type='search' className='btn-search button-standard'
                        onClick={handleOpen}>
                        <Trans>Assign test</Trans>
                      </Button>}
                  </TableCell>
                  <TableCell align='left' onClick={() => handleOpen12}>{<RestoreOutlinedIcon color='primary' className='archiveBtn'/>}</TableCell>
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
        {<HRmodalWindowTestAssignment open={open} key={0} name={name} handleClose={handleClose}/>}
        {<HRmodalWindowViewingUserInformation open={openHistory} key={1} name={name} handleClose={handleClose12} gmail={'grgrgr'}/>}
      </Paper>
    </div>
  );
};

EmployeesTable.propTypes = {
  userName: PropTypes.string
};

/*
onClick={() => {deassignTest(row.assignedTest.testId)
  .then(() => {dispatch(requestEmployeesList());handleOpen;});}}>


onClick={() => {assignTest(row.id)
.then(() => dispatch(requestEmployeesList()));}}>
*/

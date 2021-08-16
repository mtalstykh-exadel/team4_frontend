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
import { AdminModalWindowWarningDeassign } from './AdminModalWindowWarningDeassign/AdminModalWindowWarningDeassign';

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


  const [name, setName] = React.useState('');
  const [gmail, setGmail] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
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
                <TableCell align='left' size='small'>{row.mail}</TableCell>
                <TableCell align='left'>
                  {row.assigne ?
                    <Button color='secondary' variant='outlined' size='small' style={{width: 140}} disabled
                      type='search' className='btn-search'>
                      <Trans>Deassign</Trans>
                    </Button>
                    : <Button color='primary' variant='outlined' size='small' style={{width: 140}} type='search'
                      className='btn-search' onClick={() => {
                        setName(row.name);
                        handleOpen();
                      }}>
                      <Trans>Assign test</Trans>
                    </Button>}
                </TableCell>
                <TableCell align='left'>{<RestoreOutlinedIcon className='icons-color-primary archiveBtn' onClick={() => {
                  setName(row.name);
                  setGmail(row.mail);
                  handleOpen();
                }}/> }</TableCell>
              </TableRow>
            );
          }
          )}
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
      {<HRmodalWindowViewingUserInformation open={open} key={1} name={name} handleClose={handleClose} gmail={gmail}/>}
      {<AdminModalWindowWarningDeassign open={open} key={2} handleClose={handleClose}/>}
    </Paper>
  );
};

EmployeesTable.propTypes = {
  userName: PropTypes.string
};

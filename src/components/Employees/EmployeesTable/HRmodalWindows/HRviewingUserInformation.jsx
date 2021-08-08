import React from 'react';
import '../../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import {FormControl, IconButton, MenuItem, Select} from '@material-ui/core';
import PropTypes from 'prop-types';
import './HRassignTest.scss';
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
import {filteredEmployees} from '../mock-data-employees';
import './HRviewingUserInformation.scss';

export const HRviewingUserInformation = ({name, gmail, handleClose}) => {
  const rows = ['Level', 'Assigned', 'Test deadline', 'Date verified', 'Status', 'Result'];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let itemKey = 0;
  const englishLevel = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const [filter, setFilter] = React.useState('null');


  const modalBody = <>
    <div className='information'>
      <div className='photo-test-level'>
        <img src='user.svg' className='photo'/>
        <div className='test-level-selector-wrapper'>
          <FormControl variant='outlined' className='level-selector'>
            <Select labelId='test-level-selector-label' label='Select the test level' id='select' className='item'>
              {englishLevel.map((item, index) => {
                itemKey++;
                return <MenuItem key={itemKey} value={index} className='item'
                                 onClick={() => {
                                   setFilter(item);
                                 }}> {item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='name-profession'>
        <div className='name'>{name}</div>
        <div className='profession'>front-end developer</div>
        <div className='gmail'>Email: {gmail}</div>
      </div>

    </div>
    <div className='container'>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {rows.map((rowName) => {
                return (
                  <TableCell key={rowName} align='left'>{rowName}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              if (filter === row.level) {
                return (
                  <TableRow key={row.id} className='row'>
                    <TableCell align='left' size='small'>{row.level}</TableCell>
                    <TableCell align='left' size='small'>19 Jun 2021, 10:54</TableCell>
                    <TableCell align='left' size='small'>{row.testDeadline}</TableCell>
                    <TableCell align='left' size='small'>24 Jul 2021, 10:54</TableCell>
                    <TableCell align='left' size='small'>assigned</TableCell>
                    <TableCell align='left' size='small'>passed</TableCell>
                  </TableRow>
                );
              } else if (filter === 'null') {
                return (
                  <TableRow key={row.id} className='row'>
                    <TableCell align='left' size='small'>{row.level}</TableCell>
                    <TableCell align='left' size='small'>19 Jun 2021, 10:54</TableCell>
                    <TableCell align='left' size='small'>{row.testDeadline}</TableCell>
                    <TableCell align='left' size='small'>24 Jul 2021, 10:54</TableCell>
                    <TableCell align='left' size='small'>assigned</TableCell>
                    <TableCell align='left' size='small'>passed</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component='div'
      count={filteredEmployees.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </>;


  return (
    <Paper elevation={2}>
      <div className='hr-modal'>
        <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
          <CloseIcon className='close-icon'/>
        </IconButton>
        {modalBody}
      </div>
    </Paper>);
};

HRviewingUserInformation.propTypes =
  {
    name: PropTypes.string,
    gmail: PropTypes.string,
    handleClose: PropTypes.func
  };

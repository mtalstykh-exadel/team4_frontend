import React from 'react';
import '../../../../styles/modal.scss';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import { FormControl, IconButton, MenuItem, Select} from '@material-ui/core';

import { Trans } from '@lingui/macro';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';


import {
  InputLabel,
  Avatar,
  Modal,
  Backdrop,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import './HRmodalWindowViewingUserInformation.scss';
import { filterLevelsShort, userHistoryHeader } from '../../../../constants/filterConstants';

export const HRmodalWindowViewingUserInformation = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const employee = useSelector((state) => state.employee);

  let itemKey = 0;

  const [filter, setFilter] = React.useState('');


  const filterEmployees = employee ? employee
    .filter((el) => filter ? filter.toLowerCase() === el.level.toLowerCase() : el)
    : [];

  const modalBody = <>
    <div className='info'>
      <div className='info-avatar-wrapper'>
        <Avatar src={props.test.avatar} className='info-avatar'/>
      </div>
      <div className='info-text'>
        <h2 className='bold info-name'>{props.test.name}</h2>
        <p><Trans>front-end developer</Trans></p>
        <p><Trans>Email: {props.test.login}</Trans></p>
      </div>
    </div>
    <FormControl variant='outlined' className='level-select' size='small'>
      <InputLabel id='select-label'><Trans>Level</Trans></InputLabel>
      <Select labelId='select-label' label='Select the test level' id='select' className='ggr'>
        {filterLevelsShort.map((item, index) => {
          itemKey++;
          return <MenuItem key={itemKey} value={index} className='item'
            onClick={() => {
              setFilter(item);
            }}> {item}</MenuItem>;
        })}
      </Select>
    </FormControl>
    <TableContainer >
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {userHistoryHeader.map((rowName) => {
              return (
                <TableCell className='base-color-elevated font-primary' key={rowName} align='left'>{rowName}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filterEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            {
              return (
                <TableRow key={row.id} className='row'>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.level}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{moment(row.completedAt).format('DD MMM YYYY, hh:mm')}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{moment(row.startedAt).format('DD MMM YYYY, hh:mm')}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.testDeadline}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.status}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.result}</TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      className='base-color-elevated font-primary'
      component='div'
      count={filterEmployees.length}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[]}
      labelRowsPerPage=''
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      options={{
        paging: false
      }}
    />
  </>;


  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color'>
        <div className='hr-modal-view-user-info'>
          <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
            <CloseIcon className='close-icon icons-color'/>
          </IconButton>
          {modalBody}
        </div>
      </div>
    </Modal>);
};

HRmodalWindowViewingUserInformation.propTypes =
  {
    test: PropTypes.any,
    open: PropTypes.bool,
    handleClose: PropTypes.func
  };

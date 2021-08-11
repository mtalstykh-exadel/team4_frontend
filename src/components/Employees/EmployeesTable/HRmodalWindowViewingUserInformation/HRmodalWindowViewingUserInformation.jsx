import React from 'react';
import '../../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import {FormControl, IconButton, MenuItem, Select} from '@material-ui/core';
import PropTypes from 'prop-types';

import ava from '../../../../assets/user.svg';

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
import {filteredEmployees} from '../mock-data-employees';
import './HRmodalWindowViewingUserInformation.scss';
import { filterLevelsShort, tableHeader } from '../../../../constants/constants';

export const HRmodalWindowViewingUserInformation = (props) => {
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

  const [filter, setFilter] = React.useState('null');


  const modalBody = <>
    <div className='info'>
      <div className='info-avatar-wrapper'>
        <Avatar src={ava} className='info-avatar'/>
      </div>
      <div className='info-text'>
        <h2 className='bold info-name'>{props.name}</h2>
        <p>front-end developer</p>
        <p>Email: {props.gmail}</p>
      </div>
    </div>
    <FormControl variant='outlined' className='level-select' size='small'>
      <InputLabel id='select-label'>Level</InputLabel>
      <Select labelId='select-label' label='Select the test level' id='select' className='item'>
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
            {tableHeader.map((rowName) => {
              return (
                <TableCell className='base-color-elevated font-primary' key={rowName} align='left'>{rowName}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            if (filter === row.level) {
              return (
                <TableRow key={row.id} className='row'>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.level}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>19 Jun 2021, 10:54</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.testDeadline}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>24 Jul 2021, 10:54</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>assigned</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>passed</TableCell>
                </TableRow>
              );
            } else if (filter === 'null') {
              return (
                <TableRow key={row.id} className='row'>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.level}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>19 Jun 2021, 10:54</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>{row.testDeadline}</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>24 Jul 2021, 10:54</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>assigned</TableCell>
                  <TableCell className='base-color-elevated font-primary' align='left' size='small'>passed</TableCell>
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
      count={filteredEmployees.length}
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
    open: PropTypes.bool,
    name: PropTypes.string,
    gmail: PropTypes.string,
    handleClose: PropTypes.func
  };

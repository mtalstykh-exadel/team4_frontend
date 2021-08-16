import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  TableCell,
  TableRow
} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import { formatDate } from '../../../../utils/data-formatter';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';

export const TableEmployeeRow = (props) => {

  const [loading, setLoading] = useState(false);

  return (
    <TableRow key={props.employee.id}>
      <TableCell component='th' scope='row'>{props.employee.name}</TableCell>
      <TableCell align='left' size='small'>{props.employee.assignedTest ? props.employee.assignedTest.level : null}</TableCell>
      <TableCell align='left' size='small'>{props.employee.assignedTest ? formatDate(props.employee.assignedTest.deadline) : null}</TableCell>
      <TableCell align='left' size='small'>{props.employee.login}</TableCell>
      <TableCell align='left'>
        {props.employee.assignedTest ? <Button color='secondary' variant='outlined' size='small' disabled={loading} type='search' className='btn-search button-standard'
          onClick={() => {
            setLoading(true);
            props.handleDeassign(props.employee)
              .then(() => setLoading(false));
          }}>
          {loading ? (
            <CircularProgress className='border-primary' size='23px' />
          ) : (
            <Trans>Deassign</Trans>
          )}
        </Button>
          : <Button color='primary' variant='outlined' size='small' type='search' className='btn-search button-standard'
            onClick={() => {
              setLoading(true);
              props.handleAssign(props.employee)
                .then(() => setLoading(false));
            }}>
            {loading ? (
              <CircularProgress className='border-primary' size='23px' />
            ) : (
              <Trans>Assign test</Trans>
            )}
          </Button>}
      </TableCell>
      <TableCell
        align='left'
        onClick={() => props.handleHistory(props.employee)}>{<RestoreOutlinedIcon color='primary' className='archiveBtn icons-color-primary'/>}</TableCell>
    </TableRow>
  );
};

TableEmployeeRow.propTypes = {
  employee: PropTypes.any,
  handleAssign: PropTypes.func,
  handleDeassign: PropTypes.func,
  handleHistory: PropTypes.func
};

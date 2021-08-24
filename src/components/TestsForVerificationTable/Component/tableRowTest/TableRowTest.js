import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import { formatDate } from '@utils/data-formatter';

import PropTypes from 'prop-types';

import { Trans } from '@lingui/macro';

const TableRowTest = (props) => {

  const [loading, setLoading] = useState(false);

  return (
    <TableRow key={props.test.testId}>
      <TableCell component='th' scope='row'>{props.test.testId}</TableCell>
      <TableCell align='left'>{props.test.level}</TableCell>
      <TableCell align='left'>{formatDate(props.test.startedAt)}</TableCell>
      <TableCell align='left'>{formatDate(props.test.completedAt)}</TableCell>
      <TableCell align='left'><Trans>{props.test.priority}</Trans></TableCell>
      <TableCell align='left'>
        <Button color='primary'
          className='button-standard'
          variant='outlined'
          disabled={loading}
          size='small'
          onClick={() => {
            setLoading(true);
            props.handleVerifyTest(props.test)
              .then(() => setLoading(false));
          }}
        >
          {loading ? (
            <CircularProgress className='border-primary' size='23px'/>
          ) : (
            <Trans>Verify</Trans>
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

TableRowTest.propTypes = {
  test: PropTypes.any,
  handleVerifyTest: PropTypes.func,
};

export { TableRowTest };

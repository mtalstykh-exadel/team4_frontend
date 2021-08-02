import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import { rows } from './rows';

const TestsData = (props) => {
  const columns = [
    { id: 'level', label: ['Level', 'Уровень'], minWidth: 50, align: 'center' },
    { id: 'assigned', label: ['Assigned', 'Дата назначения'], minWidth: 130, align: 'center' },
    { id: 'deadline', label: ['Deadline', 'Срок прохождения'], minWidth: 130, align: 'center', },
    { id: 'dateVerified', label: ['Date verified', 'Дата проверки'], minWidth: 130, align: 'center', },
    { id: 'status', label: ['Status', 'Статус'], minWidth: 40, align: 'center', },
    { id: 'result', label: ['Result', 'Результат'], minWidth: 80, align: 'center', },
    { id: 'action', label: ['Action', 'Действие'], minWidth: 100, align: 'center', },
  ];

  const filteredRows = rows.filter((r) => props.filter ? r.level === props.filter : r);

  const keysForColumns = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const testAction = (action) => {
    console.log(action);
  };

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell className='font-primary base-color-elevated' key={column.id} align={column.align} style={{ minWidth: column.minWidth }} >
                  <Trans>{column.label[0]}{column.label[1]}</Trans>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell className='font-primary' key={keysForColumns} align={column.align} size='small'>
                          {
                            column.id === 'action' ?
                              <Button color='primary' variant='contained' size='small'
                                onClick={() => testAction(row[column.id])} >
                                <Trans>{value[0]}{value[1]}</Trans>
                              </Button>
                              : Array.isArray(value) ? <Trans>{value[0]}{value[1]}</Trans> : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination className='font-primary' rowsPerPageOptions={[10]} component='div' count={filteredRows.length} rowsPerPage={rowsPerPage}
        page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  );
};

TestsData.propTypes = {
  filter: PropTypes.any
};

export default TestsData;

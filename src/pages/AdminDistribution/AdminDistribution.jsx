import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Select, Button } from '@material-ui/core';
import { rows } from '../../testData/rowsForAdminDistribution.js';
import { coaches } from './Coaches.js';
import PropTypes from 'prop-types';
import './AdminDistribution.scss';
import { Trans } from '@lingui/macro';

const AdminDistribution = (props) => {
  const columns = [
    { id: 'level', label: ['Level', 'Уровень'], width: 50, align: 'right' },
    { id: 'assigned', label: ['Assigned', 'Назначенный'], width: 130, align: 'right' },
    { id: 'deadline', label: ['Deadline', 'Срок сдачи'], width: 130, align: 'right' },
    { id: 'Coach', label: ['Coach', 'Тренер'], width: 345, align: 'right' },
    { id: 'action', label: ['Action', 'Действие'], width: 127, align: 'right' },
  ];

  const filteredRows = rows.filter((r) =>
    props.filter ? r.level === props.filter : r
  );

  let keysForColumns = 1;
  let keysForOptions = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='AdminDistribution'>
      <Layout>
        <Paper
          elevation={2}>
          <TableContainer className='paper'>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className='headItems font-primary base-color-elevated'
                      size='small'
                      key={column.id}
                      align={column.align}
                    >
                      <Trans>{column.label[0]}{column.label[1]}</Trans>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          keysForColumns++;
                          return (
                            <TableCell
                              className='font-primary'
                              key={keysForColumns}
                              align={column.align}
                              size='small'
                            >
                              {column.id === 'Coach' ? (
                                <Select
                                  className='selectCoachNames font-primary'
                                  native
                                  variant='outlined'
                                  defaultValue='placeholder'
                                  color='red'
                                >
                                  <option aria-label='None' value='placeholder'>name</option>
                                  {coaches.map((coachName) => {
                                    keysForOptions++;
                                    return (
                                      <option key={keysForOptions} value={coachName}>
                                        {coachName}
                                      </option>
                                    );
                                  })}
                                </Select>
                              ) : (
                                null
                              )}

                              {column.id === 'action' ? (
                                <Button
                                  className='buttonAssign'
                                  color='primary'
                                  variant='outlined'
                                  size='small'
                                >
                                  <Trans>{value[0]}{value[1]}</Trans>
                                </Button>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className='font-primary'
            rowsPerPageOptions={[10]}
            component='div'
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Layout >
    </div>
  );
};

AdminDistribution.propTypes = {
  filter: PropTypes.any,
};

export default AdminDistribution;

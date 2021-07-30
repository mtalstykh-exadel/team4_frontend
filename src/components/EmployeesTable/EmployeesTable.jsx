import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
export const EmployeesTable = () => {

  const filteredEmloyees = [
    {
      name: 'Ivanov Ivan',
      level: 'A2',
      testDeadline: '30 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Petrov Petr',
      level: 'A1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Sergeev Sergey',
      level: 'B1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Savchenko Mariya',
      level: 'A2',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Ivanov Ivan',
      level: 'A2',
      testDeadline: '30 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Petrov Petr',
      level: 'A1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Sergeev Sergey',
      level: 'B1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Savchenko Mariya',
      level: 'A2',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Ivanov Ivan',
      level: 'A2',
      testDeadline: '30 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Petrov Petr',
      level: 'A1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Sergeev Sergey',
      level: 'B1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Savchenko Mariya',
      level: 'A2',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Ivanov Ivan',
      level: 'A2',
      testDeadline: '30 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Petrov Petr',
      level: 'A1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Sergeev Sergey',
      level: 'B1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Savchenko Mariya',
      level: 'A2',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Ivanov Ivan',
      level: 'A2',
      testDeadline: '30 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Petrov Petr',
      level: 'A1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Sergeev Sergey',
      level: 'B1',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    },
    {
      name: 'Savchenko Mariya',
      level: 'A2',
      testDeadline: '24 Jul 2021, 10:54',
      mail: 'yaroslavsmirnov@gmail.com'
    }
  ];

  const rows = ['Name', 'Level', 'Test deadline', 'E-mail', 'Action', 'History'];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='edit-tests-data-wrapper'>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {rows.map((rowName) => {
                  return (
                    <TableCell key={rowName} align="left" style={{ fontWeight: 700 }}>{rowName}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{filteredEmloyees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="left" size='small'>{row.level}</TableCell>
                  <TableCell align="left" size='small'>{row.testDeadline}</TableCell>
                  <TableCell align="left" size='small'>{row.mail}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" variant="outlined" size="small" style={{ width: 110, border: 'solid 2px #3F51B5' }} type="search" className='btn-search' >
                      Assign test
                    </Button>
                  </TableCell>
                  <TableCell align="left">{<RestoreOutlinedIcon color='primary' className='archiveBtn' />}</TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredEmloyees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

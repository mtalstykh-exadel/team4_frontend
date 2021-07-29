import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Questions } from './mock-data-Questions';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import './EditTestsData.scss';

const EditTestsData = () => {

  const rows = ['ID', 'Question', 'Action', 'Add archive'];

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
      <Button color="primary" variant="contained" type="search" className='btn-add-question'>Add question</Button>
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
            <TableBody>{Questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell align="left">{row.question}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" variant="outlined" size="small" style={{ width: 110, border: 'solid 2px #3F51B5' }} type="search" className='btn-search'>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">{<ArchiveOutlinedIcon color='primary' fontSize='large' />}</TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EditTestsData;

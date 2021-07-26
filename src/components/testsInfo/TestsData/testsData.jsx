import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {rows} from './rows';
import PropTypes from 'prop-types';
import {Button, Modal} from '@material-ui/core';

const TestsData = (props) => {
  const columns = [
    {id: 'level', label: 'Level', minWidth: 50, align: 'center'},
    {id: 'assigned', label: 'Assigned', minWidth: 130, align: 'center'},
    {id: 'deadline', label: 'Deadline', minWidth: 130, align: 'center',},
    {id: 'dateVerified', label: 'Date verified', minWidth: 130, align: 'center',},
    {id: 'status', label: 'Status', minWidth: 40, align: 'center',},
    {id: 'result', label: 'Result', minWidth: 80, align: 'center',},
    {id: 'action', label: 'Action', minWidth: 100, align: 'center',},
  ];

  const filteredRows = rows.filter((r) => props.filter ? r.level === props.filter : r);

  let keysForColumns = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*  const testAction = (action) => {
     console.log(action);
   };*/
  const [open, setOpen] = React.useState(false);

  const time = '7.30';
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      keysForColumns++;
                      return (
                        <TableCell key={keysForColumns} align={column.align} size="small">
                          {
                            column.id === 'action' ?
                              <>
                                <Button variant="contained" color="primary" size='small'
                                  // onClick={() => testAction(row[column.id])} >
                                        onClick={handleOpen}>
                                  {value}
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="simple-modal-title"
                                  aria-describedby="simple-modal-description"
                                  className='modal'>
                                  <div className='modal-content' style={{padding: "40px", textAlign: "center"}}>
                                    You can't take the test anymore today. Come back tomorrow at {time}
                                  </div>
                                </Modal>
                              </>
                              : value
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
      <TablePagination rowsPerPageOptions={[10]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage}
                       page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
    </Paper>
  );
};

TestsData.propTypes = {
  filter: PropTypes.any
};

export default TestsData;

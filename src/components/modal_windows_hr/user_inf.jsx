import {Modal} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {rows} from '../testsInfo/TestsData/rows';
import TableHead from "@material-ui/core/TableHead";
import TestInfoSearchForm from "../testsInfo/TestsInfoSearchForm/TestsInfoSearchForm";
import './user_inf.scss';

const ViewingUserInf = ({name, gmail, img, status}) => {

  const [filter, setFilter] = useState(null);

  const columns = [
    {id: 'level', label: 'Level', minWidth: 50, align: 'center'},
    {id: 'assigned', label: 'Assigned', minWidth: 130, align: 'center'},
    {id: 'deadline', label: 'Deadline', minWidth: 130, align: 'center',},
    {id: 'dateVerified', label: 'Date verified', minWidth: 130, align: 'center',},
    {id: 'status', label: 'Status', minWidth: 40, align: 'center',},
    {id: 'result', label: 'Result', minWidth: 80, align: 'center',},
    {id: 'action', label: 'Action', minWidth: 100, align: 'center',},
  ];

  const filteredRows = rows.filter((r) => filter ? r.level === filter : r);

  let keysForColumns = 1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const testAction = (action) => {
    console.log(document.getElementById(action));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className='modal'>
        <div className='modal-content'>
          <div className='img-name'>
            <img src={img}/>
            {name}
          </div>
          <div className='status-gmail'>{status}</div>
          <div className='status-gmail'>{gmail}</div>
          <TestInfoSearchForm setFilter={setFilter}/>
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
                                    <Button variant="contained" color="primary" size='small'
                                            onClick={(e) => {
                                              testAction(e);
                                            }}>
                                      {value}
                                    </Button>
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
            <TablePagination rowsPerPageOptions={[3]} component="div" count={filteredRows.length}
                             rowsPerPage={rowsPerPage}
                             page={page} onPageChange={handleChangePage}
                             onRowsPerPageChange={handleChangeRowsPerPage}/>
          </Paper>
        </div>
      </Modal>

      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        size='small'
      >
        Assign Test
      < /Button>
    </>);
};

ViewingUserInf.propTypes =
  {
    name: PropTypes.any,
    gmail: PropTypes.any,
    img: PropTypes.any,
    status: PropTypes.any,
    filter: PropTypes.any
  };

export default ViewingUserInf;

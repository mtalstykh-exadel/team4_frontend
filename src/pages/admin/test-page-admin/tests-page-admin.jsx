import React, { useState } from "react";
import './test-page-admin.scss';
import Layout from '../../../components/layout/Layout.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { rows } from "./rows.js";
import PropTypes from "prop-types";
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  test228: {
    fontFamily: "Roboto bold",
    backgroundColor: "#ffffff",
    padding: "6 0 6 0",
  },
  SelectName: {
    fontFamily: "Roboto bold",
    color: "red"
  }
});

const AdminTestPage = (props) => {
  const columns = [
    { id: "level", label: "Level", maxWidth: 50, align: "center"},
    { id: "assigned", label: "Assigned", maxWidth: 130, align: "center" },
    { id: "deadline", label: "Deadline", maxWidth: 130, align: "center" },
    { id: "Coach", label: "Coach", maxWidth: 130, align: "center" },
    { id: 'action', label: 'Action', minWidth: 100, align: 'center', },
  ];

  const filteredRows = rows.filter((r) =>
    props.filter ? r.level === props.filter : r
  );

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

  const testAction = (action) => {
    console.log(action);
  };

  const classes = useStyles();

  return (
    <Layout>
      <Paper>
        <TableContainer className="paper">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className={classes.test228}
                    size="small"
                    key={column.id}
                    align={column.align} 
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        keysForColumns++;
                        return (
                          <TableCell
                            key={keysForColumns}
                            align={column.align}
                            size="small"
                          >

                          {column.id === "Coach" ? (
                            <>
                              <FormControl variant="outlined" className={classes.formControl}>
                                {/* <InputLabel htmlFor="outlined-age-native-simple">ADADA</InputLabel> */}
                                <Select
                                  native
                                  
                                  // value={state.age}
                                  // onChange={handleChange}
                                  // label="Age"
                                  inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                  }}
                                >
                                  <option aria-label="None" value="" className={classes.SelectName}>placeholder</option>
                                  <option value={10}>Ten</option>
                                  <option value={20}>Twenty</option>
                                  <option value={30}>Thirty</option>
                                </Select>
                              </FormControl>
                            </>
                          ) : (
                            console.log("ayf")
                          )}

                          {column.id === "action" ? (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => testAction(row[column.id])}
                            >
                              {value}
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
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
};

AdminTestPage.propTypes = {
  filter: PropTypes.any,
};

export default AdminTestPage;

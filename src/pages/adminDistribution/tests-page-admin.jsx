import React, { useState } from "react";
import Layout from '../../components/Layout/Layout.js';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { rows } from "./rows.js";
import { coaches } from "../../testData/Coaches.js";
import PropTypes from "prop-types";
import Select from '@material-ui/core/Select';
import { Button } from "@material-ui/core";
import './test-page-admin.scss';

const AdminTestPage = (props) => {
  const columns = [
    { id: "level", label: "Level", width: 50, align: "right" },
    { id: "assigned", label: "Assigned", width: 130, align: "right" },
    { id: "deadline", label: "Deadline", width: 130, align: "right" },
    { id: "Coach", label: "Coach", width: 345, align: "right" },
    { id: "action", label: "Action", width: 127, align: "right" },
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

  const testAction = (action) => {
    console.log(action);
  };

  return (
    <div className="AdminTestPage">
      <Layout>
        <Paper>
          <TableContainer className="paper">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className="headItems"
                      size="small"
                      key={column.id}
                      align={column.align}
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
                                <Select
                                  className="selectCoachNames"
                                  native
                                  variant="outlined"
                                  defaultValue="placeholder"
                                  color="red"
                                >
                                  <option aria-label="None" value="placeholder">name</option>
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
                                console.log('false')
                              )}

                              {column.id === "action" ? (
                                <Button
                                  className="buttonAssign"
                                  variant="outlined"
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
      </Layout >
    </div>
  );
};

AdminTestPage.propTypes = {
  filter: PropTypes.any,
};

export default AdminTestPage;

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Select, Button } from "@material-ui/core";
import { rows } from "../../testData/rowsForAdminDistribution.js";
import { coaches } from "./Coaches.js";
import PropTypes from "prop-types";
import "./AdminDistribution.scss";
import { AssignTest } from "./adminDistributtion.js";

const AdminDistribution = (props) => {
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


  {rows.map((row) => (
    console.log(row?.Coach)
  ));}

  return (
    <div className="AdminDistribution">
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
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index} >
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
                                  id={"item-" + index + "-select"}
                                  className="selectCoachNames"
                                  native
                                  variant="outlined"
                                  defaultValue="placeholder"
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
                                null
                              )}

                              {column.id === "action" ? (
                                <Button
                                  id={"item-" + index + "-button"}
                                  className="buttonAssign"
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  onClick={() => {
                                    AssignTest(index);
                                  }}
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

AdminDistribution.propTypes = {
  filter: PropTypes.any,
};

export default AdminDistribution;

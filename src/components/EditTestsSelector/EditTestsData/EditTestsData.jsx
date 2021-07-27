import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import './EditTestsData.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { archiveQuestions, requestQuestionsList } from '../../../store/actions/coachActions';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const EditTestsData = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestQuestionsList());
  }, []);
  const questions = useSelector((state) => state.coach.questions);

  const filteredQuestions = questions ? questions
    .filter((el) => props.level ? props.level === el.level : el)
    .filter((el) => props.module ? props.module === el.module : el)
    .filter((el) => props.questId && !!Number(props.questId) ? Number(props.questId) === el.id : el)
    : [];

  const rows = ['ID', '', 'Question', 'Action', 'Add archive'];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const archiveTheQuestion = (questId) => {
    dispatch(archiveQuestions(questId));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    filteredQuestions.length < rowsPerPage && setPage(0);
  }, [filteredQuestions]);

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
            <TableBody>{filteredQuestions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell component="th" scope="row" padding='none' size='small'>
                    {
                      row.module === 'Listening'
                        ? <PlayCircleOutlineIcon color='primary' cursor='pointer' />
                        : null
                    }
                  </TableCell>
                  <TableCell align="left" size='small'>{row.question}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" variant="outlined" size="small" style={{ width: 110, border: 'solid 2px #3F51B5' }} type="search" className='btn-search'>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">{<ArchiveOutlinedIcon color='primary' className='archiveBtn' onClick={() => archiveTheQuestion(row.id)} />}</TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredQuestions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

EditTestsData.propTypes = {
  level: PropTypes.any,
  module: PropTypes.any,
  questId: PropTypes.any
};

export default EditTestsData;

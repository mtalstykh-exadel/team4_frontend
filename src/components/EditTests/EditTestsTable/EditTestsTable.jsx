import React, { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import './EditTestsTable.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { archiveQuestion, requestQuestionsList } from '../../../store/actions/coachActions';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Trans } from '@lingui/macro';

export const EditTestsTable = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestQuestionsList());
  }, []);
  const questions = useSelector((state) => state.coach.questions);

  const filteredQuestions = questions ? questions
    .filter((el) => props.level ? props.level === el.level : el)
    .filter((el) => props.module ? props.module === el.module : el)
    .filter((el) => props.questionId && !!Number(props.questionId) ? Number(props.questionId) === el.id : el)
    : [];

  const rows = ['ID',
    ['Player', 'Проигрователь'],
    ['Question', 'Вопрос'],
    ['Action', 'Действие'],
    ['Archive', 'Архив']];

  const filteredRows = [];
  if (props.module !== 'Listening') {
    rows.filter((el) => {
      Array.isArray(el)
        ? el[0] !== 'Player' && filteredRows.push(el)
        : el !== 'Player' && filteredRows.push(el);
    });
  } else {
    rows.map((el) => filteredRows.push(el));
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const archiveTheQuestion = (questionId) => {
    dispatch(archiveQuestion(questionId));
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
      <Button color='primary' variant='contained' type='search' className='btn-add-question'><Trans>Add question</Trans></Button>
      <Paper elevation={2}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {filteredRows.map((rowName) => {
                  return (
                    <TableCell key={rowName} align='left' className='tableRowHeading'>{Array.isArray(rowName)
                      ? <Trans>{rowName[0]}{rowName[1]}</Trans>
                      : rowName}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{filteredQuestions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>{row.id}</TableCell>
                  {
                    row.module === 'Listening'
                      ? <TableCell component='th' scope='row' size='small'>
                        <PlayCircleOutlineIcon className='icons-color-primary' />
                      </TableCell>
                      : null
                  }
                  <TableCell align='left' size='small'>{row.question}</TableCell>
                  <TableCell align='left'>
                    <Button color='primary' variant='outlined' size='small' style={{ width: 140 }} type='search' className='btn-search'>
                      <Trans>Edit</Trans>
                    </Button>
                  </TableCell>
                  <TableCell align='left'>{<ArchiveOutlinedIcon className='archiveBtn icons-color-primary' onClick={() => archiveTheQuestion(row.id)} />}</TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={<Trans>Rows per page: </Trans>}
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
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

EditTestsTable.propTypes = {
  level: PropTypes.any,
  module: PropTypes.any,
  questionId: PropTypes.any
};

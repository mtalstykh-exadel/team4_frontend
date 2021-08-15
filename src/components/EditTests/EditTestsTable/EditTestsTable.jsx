import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  Modal
} from '@material-ui/core';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import './EditTestsTable.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { archiveQuestion, removeQuestionForEdit } from '../../../store/actions/coachActions';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Trans } from '@lingui/macro';
import { ModalWindowWarningArchive } from './ModalWindowWarningArchive/ModalWindowWarningArchive';

export const EditTestsTable = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const queryString = require('query-string');

  const questions = useSelector((state) => state.coach.questions);
  const question = useSelector((state) => state.coach.question);

  const filteredQuestions = Number(props.questionId) > 0 && questions && question
    ? questions.filter((el) => el.id === question.id) : Number(props.questionId) > 0
      ? question ? [question] : [] : questions ? questions : [];

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

  const handleClickEdit = (path, id) => {
    dispatch(removeQuestionForEdit());
    history.push({
      pathname: path,
      search: queryString.stringify({
        id: id,
        module: props.module
      })
    });
  };

  useEffect(() => {
    filteredQuestions.length < rowsPerPage && setPage(0);
  }, [filteredQuestions]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='edit-tests-data-wrapper'>
      <Button color='primary' variant='contained' type='search' onClick={() => handleClickEdit('/add-test-modules')}
        className='btn-add-question button-standard'>
        <Trans>Add question</Trans>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <Paper elevation={2}>
          <div className='modal-content'>
            <ModalWindowWarningArchive handleClose={handleClose} />
          </div>
        </Paper>
      </Modal>
      <Paper elevation={2}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {filteredRows.map((rowName) => {
                  return (
                    <TableCell key={rowName} align='center' className='tableRowHeading'>{Array.isArray(rowName)
                      ? <Trans>{rowName[0]}{rowName[1]}</Trans>
                      : rowName}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{filteredQuestions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              debugger;
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' align='center' scope='row'>{row.id}</TableCell>
                  {
                    props.module === 'Listening'
                      ? <TableCell component='th' align='center' scope='row' size='small'>
                        <PlayCircleOutlineIcon className='icons-color-primary' />
                      </TableCell>
                      : null
                  }
                  <TableCell align='left' size='small'>{row.questionBody ? row.questionBody : row.topic}</TableCell>
                  <TableCell align='center'>
                    <Button color='primary' variant='outlined' size='small' style={{ width: 110 }} type='search'
                      onClick={() => handleClickEdit('/edit-test-modules', row.id)} className='btn-search button-standard'>
                      <Trans>Edit</Trans>
                    </Button>
                  </TableCell>
                  <TableCell align='center'>{<ArchiveOutlinedIcon className='archiveBtn icons-color-primary'
                    onClick={() => {
                      archiveTheQuestion(row.id);
                      handleOpen();
                    }} />}</TableCell>
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
  module: PropTypes.any,
  questionId: PropTypes.any,
};

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
  Backdrop,
} from '@material-ui/core';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import './EditTestsTable.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  archiveQuestion,
  removeQuestionForEdit,
} from '../../../store/actions/coachActions';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Trans } from '@lingui/macro';
import { ModalWindowWarningArchive } from './ModalWindowWarningArchive/ModalWindowWarningArchive';

import { requestListeningQuestionsList, requestQuestionsList } from '../../../store/actions/coachActions';

export const EditTestsTable = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const queryString = require('query-string');

  const questions = useSelector((state) => state.coach.questions);
  const question = useSelector((state) => state.coach.question);

  const filteredQuestions =
    Number(props.questionId) > 0 && questions && question
      ? questions.filter((el) => el.id === question.id)
      : Number(props.questionId) > 0
        ? question && question.module === props.module
          ? [question]
          : []
        : questions
          ? questions
          : [];

  const rows = [
    'ID',
    ['Player', 'Проигрователь'],
    ['Question', 'Вопрос'],
    ['Action', 'Действие'],
    ['Archive', 'Архив'],
    ['Dearchive', 'Разархивировать'],
  ];

  const filteredRows = [];
  rows.map((el) => {
    const arg = Array.isArray(el) ? el[0] : el;
    if (props.status === 'UNARCHIVED' && arg === 'Dearchive') {
      return;
    }
    if (props.status === 'ARCHIVED' && arg === 'Archive') {
      return;
    }
    if (props.module !== 'Listening' && arg === 'Player') {
      return;
    }
    filteredRows.push(el);
  });

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
    if (props.module === 'Listening') {
      dispatch(requestListeningQuestionsList(props.level, props.status, newPage, props.rowsPerPage));
    } else {
      dispatch(requestQuestionsList(props.level, props.module.toUpperCase(), props.status, newPage, props.rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
    props.setPage(0);
  };

  const handleClickEdit = (path, id) => {
    dispatch(removeQuestionForEdit());
    history.push({
      pathname: path,
      search: queryString.stringify({
        id,
        module: props.module,
      }),
    });
  };

  const [open, setOpen] = React.useState(false);
  const [archiveId, setArchiveId] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (archiving) => {
    if (archiving) {
      dispatch(
        archiveQuestion(archiveId, props.level, props.module.toUpperCase())
      );
    }
    setOpen(false);
  };

  return (
    <div className='edit-tests-data-wrapper'>
      <Button
        color='primary'
        variant='contained'
        type='search'
        onClick={() => handleClickEdit('/add-test-modules')}
        className='btn-add-question button-standard'
      >
        {props.module === 'Grammar' ? (
          <Trans>Add question</Trans>
        ) : (
          <Trans>Add topic</Trans>
        )}
      </Button>
      <Modal
        open={open}
        onClose={() => handleClose(false)}
        BackdropComponent={Backdrop}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'
      >
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
                  return rowName[0] === 'Question' ? (
                    <TableCell
                      key={rowName}
                      align='left'
                      className='tableRowHeading'
                    >
                      {Array.isArray(rowName) ? (
                        <Trans>
                          {rowName[0]}
                          {rowName[1]}
                        </Trans>
                      ) : (
                        rowName
                      )}
                    </TableCell>
                  ) : (
                    <TableCell
                      key={rowName}
                      align='center'
                      className='tableRowHeading'
                    >
                      {Array.isArray(rowName) ? (
                        <Trans>
                          {rowName[0]}
                          {rowName[1]}
                        </Trans>
                      ) : (
                        rowName
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuestions
                .map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component='th' align='center' scope='row'>
                        {row.id}
                      </TableCell>
                      {props.module === 'Listening' ? (
                        <TableCell
                          component='th'
                          align='center'
                          scope='row'
                          size='small'
                        >
                          <PlayCircleOutlineIcon className='icons-color-primary' />
                        </TableCell>
                      ) : null}
                      <TableCell align='left' size='small'>
                        {row.questionBody ? row.questionBody : row.topic}
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          color='primary'
                          variant='outlined'
                          size='small'
                          style={{ width: 110 }}
                          type='search'
                          onClick={() =>
                            handleClickEdit('/edit-test-modules', row.id)
                          }
                          className='btn-search button-standard'
                        >
                          <Trans>Edit</Trans>
                        </Button>
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <ArchiveOutlinedIcon
                            className='archiveBtn icons-color-primary'
                            onClick={() => {
                              setArchiveId(row.id);
                              handleOpen();
                            }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={<Trans>Rows per page: </Trans>}
          rowsPerPageOptions={[10]}
          component='div'
          count={props.count}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
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
  questionId: PropTypes.any,
  status: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  setPage: PropTypes.any,
  setRowsPerPage: PropTypes.any,
  count: PropTypes.any,
};

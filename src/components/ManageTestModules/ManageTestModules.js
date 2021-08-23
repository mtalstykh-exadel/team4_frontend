import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Backdrop, Button, Modal, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { Trans } from '@lingui/macro';

import '../../styles/modal.scss';
import './ManageTestModules.scss';

import { ManageGrammar } from './ManageGrammar/ManageGrammar';
import { ManageListening } from './ManageListening/ManageListening';
import { ManageTopic } from './ManageTopic/ManageTopic';

import { filterLevelsShort, filterModules } from '../../constants/filterConstants';
import { FilterFormControl } from '../FormControl/formControl';

import { questionModuleDataEmpty, listeningModuleDataEmpty, topicModuleDataEmpty } from './data/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { removeQuestionForEdit } from '../../store/actions/coachActions';
import { ModalWindowSuccessulUpdate } from './ModalWindowSuccessulUpdate/ModalWindowSuccessulUpdate';
import { testSpeakingFile } from '../../constants/localStorageConstants';

export const ManageModule = (props) => {
  const dispatch = useDispatch();

  const question = useSelector((state) => state.coach.question);

  const history = useHistory();

  const location = useLocation();
  const [moduleData, setModuleData] = useState('');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [readyModules, setReadyModules] = useState(false);
  const [audio, setAudio] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push({
      pathname: 'edit-tests'
    });
  };

  const onSubmit = () => {
    if (submitting) {
      if (formik.values.module === 'Listening') {
        const reader = new FileReader();
        reader.onload = (event) => {
          localStorage.setItem(testSpeakingFile, event.target.result);
        };
        reader.readAsDataURL(audio);
      }
      props.sendQuestionToEditOrAdd(moduleData, formik.values.module, audio);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { level: props.level, module: props.module },
    validationSchema: null, onSubmit
  });

  const removeQuestion = () => {
    dispatch(removeQuestionForEdit());
  };

  const handleModuleChange = () => {
    setReady(false);
    setModuleData('');
  };

  useEffect(() => {
    if (props.module === 'Listening' || formik.values.module === 'Listening') {
      const isReady = moduleData ? moduleData.questions.every((el) => {
        return el.questionBody && el.answers.every((el) => {
          return el.answer && el.correct !== undefined;
        });
      }) : null;
      setReady(isReady);
    }
  }, [moduleData]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <Paper elevation={2}>
          <div className='modal-content'>
            <ModalWindowSuccessulUpdate handleClose={handleClose} /></div>
        </Paper>
      </Modal>
      <form onSubmit={formik.handleSubmit} className='modifyTest'>
        <div className='form-control-wrapper'>
          {location.pathname === '/add-test-modules' ?
            <>
              <FilterFormControl
                value={formik.values.level}
                filterName='level'
                filterData={filterLevelsShort}
                onChange={formik.handleChange} />
              <FilterFormControl
                value={formik.values.module}
                filterName='module'
                filterData={filterModules}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleModuleChange();
                }} />
            </>
            : question && <>
              <span className='questionInfo'><Trans>Level: </Trans>{question.level}</span>
              <span className='questionInfo'><Trans>Module: </Trans>{question.module}</span>
              <span className='questionInfo'><Trans>Question-ID: </Trans>{question.id}</span>
            </>
          }
        </div>
        <div className='module-wrapper'>
          {formik.values.module === 'Grammar' ?
            <ManageGrammar
              handleModule={setModuleData}
              handleReady={setReady}
              level={formik.values.level}
              dataType={props.dataType}
              moduleData={location.pathname === '/add-test-modules' ? questionModuleDataEmpty : question} />
            : null}
          {formik.values.module === 'Listening' ?
            <ManageListening
              handleModule={setModuleData}
              handleReady={setReadyModules}
              handleAudio={setAudio}
              ready={ready}
              dataType={props.dataType}
              level={formik.values.level}
              moduleData={location.pathname === '/add-test-modules' ? listeningModuleDataEmpty : question}
            /> : null}
          {formik.values.module === 'Speaking' ?
            <ManageTopic
              moduleDescription={
                location.pathname === '/add-test-modules'
                  ? <Trans>'Add topic for an Speaking'</Trans>
                  : props.dataType ? <Trans>'Topic for an Speaking'</Trans>
                    : <Trans>'Edit topic for an Speaking'</Trans>
              }
              handleModule={setModuleData}
              level={<Trans>{formik.values.level}</Trans>}
              dataType={props.dataType}
              handleReady={setReady}
              module={<Trans>{formik.values.module}</Trans>}
              moduleData={location.pathname === '/add-test-modules' ? topicModuleDataEmpty : question}
            /> : null}
          {formik.values.module === 'Essay' ?
            <ManageTopic
              moduleDescription={
                location.pathname === '/add-test-modules'
                  ? <Trans>'Add topic for an Essay'</Trans>
                  : props.dataType ? <Trans>'Topic for an Essay'</Trans>
                    : <Trans>'Edit topic for an Essay'</Trans>
              }
              handleModule={setModuleData}
              level={formik.values.level}
              handleReady={setReady}
              dataType={props.dataType}
              module={formik.values.module}
              moduleData={location.pathname === '/add-test-modules' ? topicModuleDataEmpty : question}
            /> : null}
        </div>
        <div className='module-buttons-wrapper'>
          <Button
            className='module-buttons'
            color='primary'
            variant='outlined'
            onClick={removeQuestion}
            component={Link}
            to={'/edit-tests'}>
            <Trans>Back</Trans>
          </Button>
          {formik.values.module !== '' ?
            <Button
              onClick={
                () => {
                  handleOpen();
                  setSubmitting(true);
                }
              }
              className='module-buttons'
              color='primary'
              variant='contained'
              type='submit'
              value='submit'
              disabled={props.dataType ? props.dataType : props.module === 'Listening' || formik.values.module === 'Listening'
                ? !(ready && readyModules) : !ready}>
              <Trans>Save</Trans>
            </Button> : null}
        </div>
      </form>
    </>
  );
};

ManageModule.propTypes = {
  level: PropTypes.any,
  dataType: PropTypes.any,
  module: PropTypes.any,
  sendQuestionToEditOrAdd: PropTypes.any,
};

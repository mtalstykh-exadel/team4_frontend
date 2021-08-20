import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Modal, Paper } from '@material-ui/core';
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

export const ManageModule = (props) => {
  const dispatch = useDispatch();

  const question = useSelector((state) => state.coach.question);

  // const history = useHistory();

  const location = useLocation();
  const [moduleData, setModuleData] = useState('');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // history.push({
    //   pathname: 'edit-tests'
    // });
  };

  const onSubmit = () => {
    if (submitting) {
      props.sendQuestionToEditOrAdd(moduleData, formik.values.module);
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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
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
              <span className='questionInfo'>Level: {question.level}</span>
              <span className='questionInfo'>Module: {question.module}</span>
              <span className='questionInfo'>Question-ID: {question.id}</span>
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
              handleReady={setReady}
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
              level={formik.values.level}
              dataType={props.dataType}
              handleReady={setReady}
              module={formik.values.module}
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
              disabled={props.dataType ? props.dataType : !ready}>
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

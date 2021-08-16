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

import { filterLevelsLong, filterModules } from '../../constants/filterConstants';
import { FilterFormControl } from '../FormControl/formControl';

import { questionModuleData, questionModuleDataEmpty, listeningModuleData, listeningModuleDataEmpty, topicData } from './data/dummyData';
import { ModalWindowSuccessulUpdate } from './ModalWindowSuccessulUpdate/ModalWindowSuccessulUpdate';

export const ManageModule = () => {

  const location = useLocation();
  const [moduleData, setModuleData] = useState('');
  const [audioFile, setAduioFile] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values) => {
    return { values, module: moduleData, file: audioFile };
  };

  const formik = useFormik({
    initialValues: { level: '', module: '' },
    validationSchema: null, onSubmit
  });

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
          <FilterFormControl
            value={formik.values.level}
            filterName='level'
            filterData={filterLevelsLong}
            onChange={formik.handleChange} />
          <FilterFormControl
            value={formik.values.module}
            filterName='module'
            filterData={filterModules}
            onChange={formik.handleChange} />
        </div>
        <div className='module-wrapper'>
          {formik.values.module === 'Grammar' ?
            <ManageGrammar
              handleModule={setModuleData}
              moduleData={location.pathname === '/add-test-modules' ? questionModuleDataEmpty : questionModuleData}
            /> : null}
          {formik.values.module === 'Listening' ?
            <ManageListening
              handleModule={setModuleData}
              handleAudio={setAduioFile}
              moduleData={location.pathname === '/add-test-modules' ? listeningModuleDataEmpty : listeningModuleData}
            /> : null}
          {formik.values.module === 'Speaking' ?
            <ManageTopic
              moduleDescription={<Trans>'Add topic for an Speaking'</Trans>}
              handleModule={setModuleData}
              moduleData={location.pathname === '/add-test-modules' ? '' : topicData}
            /> : null}
          {formik.values.module === 'Essay' ?
            <ManageTopic
              moduleDescription={<Trans>'Add topic for an Essay'</Trans>}
              handleModule={setModuleData}
              moduleData={location.pathname === '/add-test-modules' ? '' : topicData}
            /> : null}
        </div>
        <div className='module-buttons-wrapper'>
          <Button
            className='module-buttons'
            color='primary'
            variant='outlined'
            component={Link}
            to={'/edit-tests'}>
            <Trans>Back</Trans>
          </Button>
          {formik.values.module !== '' ?
            <Button
              onClick={handleOpen}
              className='module-buttons'
              color='primary'
              variant='contained'
              type='submit'
              value='submit'
              disabled={formik.values.module === 'Listening' && !audioFile ? true : false}>
              <Trans>Save</Trans>
            </Button> : null}
        </div>
      </form>
    </>
  );
};

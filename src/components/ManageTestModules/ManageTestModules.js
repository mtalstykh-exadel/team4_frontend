import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Trans } from '@lingui/macro';

import './ManageTestModules.scss';

import { ManageGrammar } from './ManageGrammar/ManageGrammars';
import { ManageListening } from './ManageListening/ManageListenings';
import { ManageTopic } from './ManageTopic/ManageTopics';

import { filterLevels, filterModules } from '../../constants/constants';
import { FilterFormControl } from '../FormControl/formControl';

import { questionModuleData, questionModuleDataEmpty, listeningModuleData, listeningModuleDataEmpty, topicData } from './data/dummyData';

export const ManageModule = () => {

  const location = useLocation();
  const [moduleData, setModuleData] = useState('');
  const [audioFile, setAduioFile] = useState();

  const onSubmit = (values) => {
    return {values, module: moduleData, file: audioFile};
  };

  const formik = useFormik({
    initialValues: { level: '', module: ''},
    validationSchema: null, onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit} className='modifyTest'>
      <div className='form-control-wrapper'>
        <FilterFormControl
          value={formik.values.level}
          filterName='level'
          filterData={filterLevels}
          onChange={formik.handleChange}/>
        <FilterFormControl
          value={formik.values.module}
          filterName='module'
          filterData={filterModules}
          onChange={formik.handleChange}/>
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
  );
};

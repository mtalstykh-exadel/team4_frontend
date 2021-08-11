import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Trans } from '@lingui/macro';

import './ManageTestModules.scss';

import { ManageGrammar } from './ManageGrammar/ManageGrammar';
import { ManageListening } from './ManageListening/ManageListening';
import { ManageTopic } from './ManageTopic/ManageTopic';

import { filterLevels, filterModules } from '../../constants/constants';
import { FilterFormControl } from '../FormControl/formControl';

import { questionModuleDataEmpty, listeningModuleDataEmpty } from './data/dummyData';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ManageModule = (props) => {

  const question = useSelector((state) => state.coach.question);

  const location = useLocation();
  const [moduleData, setModuleData] = useState('');
  const [audioFile, setAduioFile] = useState();

  const onSubmit = (values) => {
    return { values, module: moduleData, file: audioFile };
  };

  const formik = useFormik({
    initialValues: { level: props.level, module: props.module },
    validationSchema: null, onSubmit
  });

  console.log(question);

  return (
    <form onSubmit={formik.handleSubmit} className='modifyTest'>
      <div className='form-control-wrapper'>
        {location.pathname === '/add-test-modules' ?
          <>
            <FilterFormControl
              value={formik.values.level}
              filterName='level'
              filterData={filterLevels}
              onChange={formik.handleChange} />
            <FilterFormControl
              value={formik.values.module}
              filterName='module'
              filterData={filterModules}
              onChange={formik.handleChange} />
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
            moduleData={location.pathname === '/add-test-modules' ? questionModuleDataEmpty : question} />
          : null}
        {formik.values.module === 'Listening' ?
          <ManageListening
            handleModule={setModuleData}
            handleAudio={setAduioFile}
            moduleData={location.pathname === '/add-test-modules' ? listeningModuleDataEmpty : question}
          /> : null}
        {formik.values.module === 'Speaking' ?
          <ManageTopic
            moduleDescription={
              location.pathname === '/add-test-modules'
                ? <Trans>'Add topic for an Speaking'</Trans>
                : <Trans>'Edit topic for an Speaking'</Trans>
            }
            handleModule={setModuleData}
            moduleData={location.pathname === '/add-test-modules' ? '' : question}
          /> : null}
        {formik.values.module === 'Essay' ?
          <ManageTopic
            moduleDescription={
              location.pathname === '/add-test-modules'
                ? <Trans>'Add topic for an Essay'</Trans>
                : <Trans>'Edit topic for an Essay'</Trans>
            }
            handleModule={setModuleData}
            moduleData={location.pathname === '/add-test-modules' ? '' : question}
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

ManageModule.propTypes = {
  level: PropTypes.any,
  module: PropTypes.any,
};

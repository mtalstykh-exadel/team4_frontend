import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.scss';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginData } from '@actions/loginActions';
import { CircularProgress } from '@material-ui/core';
import { switchLang } from '@utils/lang-service';
import { Trans } from '@lingui/macro';

// filtering and checking what the user has entered into forms
const validationSchema = Yup.object().shape({
  email: Yup.string().email('E').required('R'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const submit = (values, { setSubmitting }) => {
    dispatch(fetchLoginData(values));
    setSubmitting(false);
  };

  const changeLang = (e) => {
    e.currentTarget.outerText === 'EN' ? switchLang('eng') : switchLang('rus');
  };
  return (
    <div className='loginForm'>
      <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={submit} >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete='off' >
            {/* field for email */}
            <div className='fieldsWrapper'>
              <TextField label='Email' variant='outlined' type='email' name='email' error={error ? true : false}
                onChange={handleChange} onBlur={handleBlur} value={values.email} className='textFields' />
            </div>
            {errors.email && touched.email ? errors.email === 'R'
              ? <Trans>Required field</Trans>
              : <Trans>Invalid email</Trans> : null}

            {/* field for password */}
            <div className='fieldsWrapper'>
              <TextField label='Password' variant='outlined' type='password' name='password' error={error ? true : false}
                onChange={handleChange} onBlur={handleBlur} value={values.password} className='textFields' autoComplete='on' />
            </div>
            {errors.password && touched.password ? <Trans>Required field</Trans> : null}
            {error && <Trans>Your email or password is incorrect. Please try again</Trans>}
            {/* button for submitting */}

            <div className='fieldsWrapper'>
              <Button color='primary' variant='contained' type='submit' className='loginButton'
                disabled={isSubmitting || !!errors.email || !!errors.password || loading} >
                {loading ? <CircularProgress className='border-primary'/> : <Trans>Log in</Trans>}
              </Button>
            </div>
          </form>
        )}
      </Formik>

      <div className='langSwitcher'>
        <span className='langItem' onClick={changeLang}>
          EN
        </span>
        <span className='langItem' onClick={changeLang}>
          RU
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

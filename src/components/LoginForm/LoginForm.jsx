import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LoginForm.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginData } from "../../store/actions/loginActions";
import { languageChange } from "../../store/actions/headerActions";
import { CircularProgress } from "@material-ui/core";

// filtering and checking what the user has entered into forms
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const error = useSelector((state) => state.login.error);
  const loading = useSelector((state) => state.login.loading);

  const dispatch = useDispatch();

  // function 'submit' where will be all actions after submitting
  const submit = (values, { setSubmitting }) => {
    dispatch(fetchLoginData(values));
    setSubmitting(false);
  };

  const changeLang = (e) => {
    e.currentTarget.outerText === ' RU' ? languageChange('russian') : languageChange('english');
  };
  return (
    <div className="loginForm">
      <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={submit} >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete="off" >
            {/* form for email */}
            <div className="fieldsWrapper">
              <TextField id="outlined-basic" label="Mail" variant="outlined" type="email" name="email"
                onChange={handleChange} onBlur={handleBlur} value={values.email} className='textFields' />
            </div>
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            {/* form for password */}
            <div className="fieldsWrapper">
              <TextField id="outlined-basic" label="Password" variant="outlined" type="password" name="password"
                onChange={handleChange} onBlur={handleBlur} value={values.password} className='textFields' />
            </div>
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            {error && <div>Your email or password is incorrect. Please try again</div>}
            {/* button for submitting */}

            <div className="fieldsWrapper">
              <Button variant="contained" color="primary" type="submit" className='loginButton'
                disabled={isSubmitting || !!errors.email || !!errors.password || loading} >
                {loading ? <CircularProgress /> : <>Log in</>}
              </Button>
            </div>
          </form>
        )}
      </Formik>

      <div className='langSwitcher'>
        <span className='langItem' onClick={changeLang}>EN</span>
        <span className='langItem' onClick={changeLang}>RU</span>
      </div>
    </div>
  );
};

export default LoginForm;

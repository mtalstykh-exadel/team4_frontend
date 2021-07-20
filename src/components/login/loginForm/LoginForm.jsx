import React from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./loginForm.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import preloader from "../../../assets/gif/preloader.gif";
import { fetchLoginData } from "../../../store/actions/loginActions";

// filtering and checking what the user has entered into forms
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();

  // styles from material ui
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  const classes = useStyles();

  // function 'submit' where will be all actions after submitting
  const submit = (values, { setSubmitting }) => {
    dispatch(fetchLoginData(values));
    setSubmitting(false);
  };
  return (
    <div className="loginForm">
      {loading && <img src={preloader} />}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            {/* form for email */}
            <div className="fieldsWrapper">
              <TextField
                id="outlined-basic"
                label="Mail"
                variant="outlined"
                type="email"
                name="email"
                error={error ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            {/* form for password */}
            <div className="fieldsWrapper">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                error={error ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            {/* button for submitting */}
            <div className="fieldsWrapper">
              <Button
                className="primary-contained"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

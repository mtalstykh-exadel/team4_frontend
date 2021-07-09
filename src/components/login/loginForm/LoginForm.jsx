import React from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './loginForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUserData } from '../../../store/reducers/login-reducer';
import * as Yup from 'yup';

//filtering and checking what the user has entered into forms
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required')
});

const LoginForm = () => {

    const stateEmail = useSelector((state) => state.login.email);
    const statePassword = useSelector((state) => state.login.password);
    const stateIsAuth = useSelector((state) => state.login.isAuth);
    console.log(stateEmail);
    console.log(statePassword);
    console.log(stateIsAuth);

    const dispatch = useDispatch();

    //styles from material ui
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const classes = useStyles();

    // function 'submit' where will be all actions after submitting
    const submit = (values, { setSubmitting }) => {
        alert(values.email, values.password);
        dispatch(setAuthUserData(values.email, values.password));
        setSubmitting(false);
    };

    return <div className='loginForm'>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema}
            onSubmit={submit} >

            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (

                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    {/* form for email */}
                    <div>
                        <TextField id="outlined-basic" label="Mail" variant="outlined" type="email"
                            name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                    </div>
                    {errors.email && touched.email && errors.email}

                    {/* form for password */}
                    <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                            name="password" onChange={handleChange} onBlur={handleBlur}
                            value={values.password} />
                    </div>
                    {errors.password && touched.password && errors.password}

                    {/* button for submitting */}
                    <div>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            Log in
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    </div>;
};

export default LoginForm;

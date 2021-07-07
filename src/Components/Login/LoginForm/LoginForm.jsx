import React from 'react'
//importing Formik
import { Formik } from 'formik';

const LoginForm = () => {
    // function 'submit' where will be all actions after submitting
    const submit = (values, { setSubmitting }) => {
        alert(`${values.email} ${values.password}`)
        setSubmitting(false)
    }

    //filtering and checking what the user has entered into forms
    const validators = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) errors.password = 'Required'
        if (/[а-яё]/i.test(values.password)) {
            errors.password = 'You can use only latin letters(a-z), numbers(0-9), and special symbols'
        }
        return errors;
    }

    return <div>
        {/* using formik */}
        <Formik initialValues={{ email: '', password: '' }} validate={validators}
            onSubmit={submit} >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
                <form onSubmit={handleSubmit}>
                    {/* form for email */}
                    <div>
                        <input type="email" name="email" onChange={handleChange} onBlur={handleBlur}
                            value={values.email} />
                    </div>
                    {errors.email && touched.email && errors.email}
                    {/* form for password */}
                    <div>
                        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur}
                            value={values.password} />
                    </div>
                    {errors.password && touched.password && errors.password}
                    {/* button for submitting */}
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    </div>
}

export default LoginForm
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const ChnagePassword = () => {
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Required').min(8, 'Password must be at least 8 characters long')
            .max(15, 'Password must be at most 15 characters long'),
        newPassword: Yup.string().required('Required').min(8, 'Password must be at least 8 characters long')
            .max(15, 'Password must be at most 15 characters long')
    })
    const handelSubmit = (values) => {
        axios.put('http://localhost:3300/auth/change-pass', values, {
            headers: {
                token: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            console.log(response)
        })
    }


    return (
        <div className='changePass'>
            <h1>Chnage Password</h1>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handelSubmit}
            >
                <Form className='changePass--form'>
                    <label>old password</label>
                    <Field name='oldPassword' type='password' />
                    <ErrorMessage name='oldPassword' component="span" />
                    <label>new password</label>
                    <Field name='newPassword' type='password' />
                    <ErrorMessage name='newPassword' component="span" />
                    <button type='submit'>Submit</button>
                </Form>


            </Formik>
        </div>
    )
}

export default ChnagePassword
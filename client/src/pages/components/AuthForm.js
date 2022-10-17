import { ErrorMessage, Field, Formik, Form } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import "./AuthForm.css"
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../helpers/AuthContext'

const AuthForm = (props) => {
    const navigate = useNavigate()
    const ctx = useContext(AuthContext)
    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters long')
            .max(15, 'Password must be at most 15 characters long')
    })
    const onSubmitForLogin = (values) => {
        axios.post(props.apiLink, values)
            .then(response => {
                if (response.data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.error,
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                } else {
                    localStorage.setItem('accessToken', response.data.token);
                    console.log(response.data.token)
                    ctx.setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        isLogin: true
                    })
                    navigate('/')

                }
            })

    }
    const onSubmitForRegistraion = (values) => {
        axios.post(props.apiLink, values).then((response) => {
            console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'Registration was successful',
                text: 'You can login now',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='registration container'>
            <Formik
                initialValues={initialValues}
                onSubmit={props.sendToken ? onSubmitForLogin : onSubmitForRegistraion}
                validationSchema={validationSchema}
            >
                <Form className='registration-form conatiner-form'>
                    <label htmlFor='username'>Username</label>
                    <Field type='text' id='username' name='username' autoComplete="off" />
                    <ErrorMessage name='username' component='span' />
                    <label htmlFor='password'>Password</label>
                    <Field type='password' id='password' name='password' autoComplete="off" />
                    <ErrorMessage name='password' component='span' />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>

        </div>
    )
}

export default AuthForm
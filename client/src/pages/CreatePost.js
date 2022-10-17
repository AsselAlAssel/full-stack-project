import React, { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import "./CreatePost.css"
import axios from 'axios'
import Swal from 'sweetalert2'


export const CreatePost = () => {
    const ctx = useContext(AuthContext);
    let username = ctx.AuthState.username;
    username = username ? username : "xxxxxx"

    const navigate = useNavigate()
    const initialValues = {
        title: '',
        postText: '',
    }
    const onSubmit = (data) => {
        axios.post('http://localhost:3300/posts', { ...data, username: username, UserId: ctx.AuthState.id }, {
            headers: {
                "token": localStorage.getItem("accessToken")
            }

        }).then(res => {
            if (res.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.error,
                })
                navigate('/login');
            } else {
                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )
                navigate('/')
            }
        })

    }
    const validate = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        postText: Yup.string().required('Post text is required'),
    })



    return (
        <div className='createPosts' >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validate}

            >
                <Form className='form' >
                    <label htmlFor="username">Username</label>
                    <Field id="username" value={username} placeholder="Username" />
                    <ErrorMessage name="username" component="span" />
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" placeholder="Title" />
                    <ErrorMessage name="title" component="span" />
                    <label htmlFor="postText">Post Text</label>
                    <Field id="postText" name="postText" placeholder="Post Text" />
                    <ErrorMessage name="postText" component="span" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik >

        </div >
    )
}

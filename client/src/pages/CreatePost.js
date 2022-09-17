import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import "./CreatePost.css"
import axios from 'axios'
import Swal from 'sweetalert2'


export const CreatePost = () => {
    const initialValues = {
        title: '',
        postText: '',
        username: ''
    }
    const onSubmit = (data) => {
        axios.post('http://localhost:3300/posts', data)
            .then(res => console.log("good"))
        Swal.fire({
            title: 'Added successfully',
            text: 'Go To Home Page and see your post',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    }
    const validate = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        postText: Yup.string().required('Post text is required'),
        username: Yup.string().min(3).max(20).required('Username is required')
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
                    <Field id="username" name="username" placeholder="Username" />
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

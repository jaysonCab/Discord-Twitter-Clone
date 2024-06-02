import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup" //Restricts inputs common in industry
import axios from "axios";
import {useNavigate} from "react-router-dom"


function CreatePosts() {

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  //Sets restrictions on user input based on yup command library   
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().max(360).required(),
    username: Yup.string().required()
  });

  let navigate = useNavigate();
  //Create post button activate
  const onSubmit = (data) => {
    axios.post("http://localhost:1111/posts", data).then((response) => {  //Data passes the body, body being the content of posts
      navigate("/");
    });
  };

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>
            Title: 
          </label>
          <ErrorMessage name="title" component="span"/>
          <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="title" //Same as column name on database
            placeholder="Enter Title Here !"
          />

          <label>
            Post: 
          </label>
          <ErrorMessage name="postText" component="span"/>
          <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="postText" //Same as column name on database
            placeholder="Enter Main Post Here !"
          />

          <label>
            Username: 
          </label>
          <ErrorMessage name="username" component="span"/>
          <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="username" //Same as column name on database
            placeholder="Enter Username Here !"
          />

          <button type="submit">
            Create Post!
          </button>


        </Form>
      </Formik>
    </div>
  )
}

export default CreatePosts

import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup" //Restricts inputs common in industry
import axios from "axios";


function Registration() {

  const initialValues = {
    username: "",
    password: "",
  };

  //Sets restrictions on user input based on yup command library   
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(3).max(15),
    password: Yup.string().required(),
  });

  //data object has username password data same as insomnia
  const onSubmit = (data) => {
    axios.post("http://localhost:1111/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
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

          <label>
            Password: 
          </label>
          <ErrorMessage name="password" component="span"/>
          <Field 
            autocomplete="off"
            type="password"
            id="inputCreatePost" 
            name="password" //Same as column name on database
            placeholder="Enter Password Here !"
          />


          <button type="submit">
            Create Account!
          </button>


        </Form>
      </Formik>
    </div>
  )
}

export default Registration

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  Input,
  FormControl
 } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import register from '../../api/auth/register';

const RegisterView = ({ isLoggedIn, error }) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object({
       username: Yup.string()
         .max(15, 'Must be 15 characters or less')
         .required('Required'),
       password: Yup.string().required('Password is required'),
       passwordConfirmation: Yup.string()
       . oneOf([Yup.ref('password'), null], 'Passwords must match'),
       email: Yup.string().email('Invalid email address').required('Required'),
     }),
    onSubmit: values => {
      register(values).then(res => {
        console.log("Registered!")
      }, reason =>
        console.log("Error: ", reason));
    },
  });
  return (
      <form onSubmit={formik.handleSubmit}>
        <Box maxW="md" borderWidth="1px" borderRadius="lg" bg="#111" m="0 auto" p="1em">
          <FormControl id="username">
            <Input mb="1em"
              pr="4.5rem"
              type="text"
              placeholder="Enter username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
         <div>{formik.errors.username}</div>
       ) : null}
          </FormControl>
          <FormControl id="email">
            <Input mb="1em"
              pr="4.5rem"
              type="text"
              placeholder="Enter valid e-mail address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
          </FormControl>
          <InputGroup size="md">
            <FormControl id="password">
              <Input mb="1em"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
           <div>{formik.errors.password}</div>
         ) : null}
            </FormControl>
            <InputRightElement width="4.5rem">
              <FontAwesomeIcon icon={faEye} onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </FontAwesomeIcon>
            </InputRightElement>
          </InputGroup>
          <InputGroup size="md">
            <FormControl id="passwordConfirmation">
              <Input mb="1em"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Repeat password"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
           <div>{formik.errors.passwordConfirmation}</div>
         ) : null}
            </FormControl>
            <InputRightElement width="4.5rem">
              <FontAwesomeIcon icon={faEye} onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </FontAwesomeIcon>
            </InputRightElement>
          </InputGroup>
          <ButtonGroup>
            <Button type="submit">
               Submit
            </Button>
          </ButtonGroup>
        </Box>
    </form>
  )
}

export default RegisterView;

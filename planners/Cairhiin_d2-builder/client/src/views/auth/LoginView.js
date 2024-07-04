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
import login from '../../api/auth/login';

const LoginView = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
       username: Yup.string()
         .max(15, 'Must be 15 characters or less')
         .required('Required'),
       password: Yup.string().required('Password is required')
     }),
    onSubmit: values => {
      login(values).then(user => {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(user));
          console.log("Logged in,", user.username);
        },
        reason =>
          console.log("Error: ", reason)
      );
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
          <ButtonGroup>
            <Button type="submit">
               Submit
            </Button>
          </ButtonGroup>
        </Box>
    </form>
  )
}

export default LoginView;

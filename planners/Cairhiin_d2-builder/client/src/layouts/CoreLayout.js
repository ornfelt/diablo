import React, { useState, useEffect  } from 'react';
import {
  Box,
  Grid,
  GridItem
} from "@chakra-ui/react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ROUTES from '../routes';
import NavBar from "./NavBar";
import './CoreLayout.css';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
  <Route {...rest} render={(props) => (
    isLoggedIn === true
      ? <Component {...props} />
      : <Redirect to='/login' />
    )} />
  );
}

const CoreLayout = () => {
  const [user, loginUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    user && loginUser(user);
  }, [loginUser]);

  const isLoggedIn = typeof user !== "undefined" && user.username ? true : false;

  return (
    <div id="coreLayout">
      <NavBar id="header" isLoggedIn={isLoggedIn} />
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box></Box>
        <GridItem colSpan={3} colStart={2} colEnd={5} mt="15em">
          <Box w="100%" textAlign="center" id="main">
            <Switch>
              {
                ROUTES.map((route, index) => (
                    !!route.protected ?
                      <PrivateRoute
                        key={index}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        isLoggedIn = {isLoggedIn}
                      /> :
                      <Route
                        key={index}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                      />
                  )
                )
              }
            </Switch>
          </Box>
        </GridItem>
        <Box></Box>
      </Grid>
      <Box w="100%" textAlign="center" id="footer">
        <img src='/images/Diablo-2-Resurrected-Logo.png' alt="Diablo 2 Resurrected Logo" width="20%" />
      </Box>
    </div>
  );
};

export default CoreLayout;

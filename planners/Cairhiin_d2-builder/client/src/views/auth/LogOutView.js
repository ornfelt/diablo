import React, { Component } from 'react';
import { Box } from '@chakra-ui/react';

class LogOutView extends Component {

  componentDidMount() {
    if (typeof localStorage !== 'undefined' &&
      localStorage.user) {
        delete localStorage.user;
      }
  }
  render() {
    return (
      <Box maxW="md" borderWidth="1px" borderRadius="lg" bg="#111" m="0 auto" p="1em">
        <p>You've successfully logged out!</p>
      </Box>
    )
  }
}

export default LogOutView;

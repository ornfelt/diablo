import React from 'react';
import {Linking, View} from 'react-native';
import {Button, Text} from '../components';
import Config from 'react-native-config';

const t = 'b';
const url = `${Config.BUNGIE_LOGIN_URL}?client_id=${Config.BUNGIE_CLIENT_ID}&response_type=code&state=${t}`;

const Login = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Please log in via Bungie</Text>
      <Button
        onPress={() => {
          Linking.openURL(url);
        }}>
        <Button.Text>Login</Button.Text>
      </Button>
    </View>
  );
};

export default Login;

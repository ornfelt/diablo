import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {Spinner, Text} from '../components';
import {TokenProps} from '../helpers/types';
import {AuthContext} from '../components/authProvider';
import {getToken} from '../helpers/token';

const Token = ({route}: TokenProps) => {
  const {setAuth} = useContext(AuthContext);

  useEffect(() => {
    const applyToken = async () => {
      const token = await getToken(route.params.code);
      setAuth(token);
    };
    applyToken();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Spinner size="large" />
      <Text>Fetching token</Text>
    </View>
  );
};

export default Token;

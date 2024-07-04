/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import Home from './src/pages/home';

import {GluestackUIProvider, Icon} from './src/components';
import {config} from './gluestack-ui.config';
import {AuthContext, AuthProvider} from './src/components/authProvider';
import Login from './src/pages/login';
import {ActivityIndicator} from 'react-native';
import Token from './src/pages/token';
import {RootStackParamList} from './src/helpers/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LogOut} from 'lucide-react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Triumphs"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Exotics"
        component={Home}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {auth, setAuth} = useContext(AuthContext);

  const linking = {
    prefixes: ['d2planner://'],
    config: {
      screens: {
        Login: {
          path: 'login',
        },
        Token: {
          path: 'callback/',
        },
      },
    },
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <GluestackUIProvider config={config.theme}>
        <Stack.Navigator>
          {auth ? (
            <Stack.Screen
              name="D2Planner"
              component={TabNavigation}
              options={{
                headerRight: () => <Icon as={LogOut} onPress={logout} />,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Token"
                component={Token}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;

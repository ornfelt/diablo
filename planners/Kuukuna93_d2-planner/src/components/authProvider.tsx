import React, {createContext, useEffect, useState} from 'react';
import {retrieveData, storeData} from '../helpers/storage';

export interface BungieToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_expires_in: string;
  mebmership_id: string;
}

interface AuthContextType {
  auth: BungieToken | null;
  setAuth: (auth: BungieToken | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: async (auth: BungieToken | null): Promise<void> => {
    return;
  },
});

const AuthProvider = ({children}: any) => {
  const [auth, setAuthState] = useState<BungieToken | null>(null);

  const getAuthState = async () => {
    try {
      const authDataString = await retrieveData('auth');
      const authData: BungieToken = JSON.parse(authDataString || '{}');
      setAuthState(authData);
    } catch (error) {
      setAuthState(null);
    }
  };

  const setAuth = async (auth: BungieToken | null) => {
    try {
      await storeData('auth', JSON.stringify(auth));
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};

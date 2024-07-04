import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  D2Planner: undefined;
  Login: undefined;
  Token: {code: string; state: string};
};

export type TokenProps = NativeStackScreenProps<RootStackParamList, 'Token'>;

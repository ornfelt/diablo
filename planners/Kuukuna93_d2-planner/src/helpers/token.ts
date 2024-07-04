import Config from 'react-native-config';
import {BungieToken} from '../components/authProvider';

export const getToken = async (code: string): Promise<BungieToken> => {
  const response = await fetch(`${Config.BUNGIE_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: '44906',
    }).toString(),
  });
  return await response.json();
};

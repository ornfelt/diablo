import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const retrieveData = async (key: string): Promise<string | null> => {
  return await AsyncStorage.getItem(key);
};

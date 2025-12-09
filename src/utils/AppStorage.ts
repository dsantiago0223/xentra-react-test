import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const get = async (key: string) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
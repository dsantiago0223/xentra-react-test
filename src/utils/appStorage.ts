import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async save(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  },
  async get(key: string) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  },
};

import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.tokenKey = `${namespace}:accessToken`;
  }

 async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(this.tokenKey);
      return token;
    } catch (e) {
      console.error('Couldnt get accessToken:', e);
      return null;
    }
  }

  async setAccessToken(accessToken) {
     try {
      await AsyncStorage.setItem(this.tokenKey, accessToken);
    } catch (e) {
      console.error('Couldnt set accessToken:', e);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(this.tokenKey);
    } catch (e) {
      console.error('Couldnt remove accessToken:', e);
    }
  }
}

export default AuthStorage;
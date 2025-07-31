import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    flexDirection: 'row',
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
  <AppBarTab title="Repositories" to="/" />
  <AppBarTab title="Sign in" to="/signin" />
  </View>;
};

export default AppBar;
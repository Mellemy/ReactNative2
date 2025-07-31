import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    flexDirection: 'row',
  },
   scroll: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return <View style={styles.container}>
  <ScrollView horizontal style={styles.scroll}>
  <AppBarTab title="Repositories" to="/" />
  <AppBarTab title="Sign in" to="/signin" />
  </ScrollView>
  </View>;
};

export default AppBar;
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
  <AppBarTab title="Test 3" to="/ttest3" />
  <AppBarTab title="Test 4" to="/test4" />
  <AppBarTab title="Test 5" to="/test5" />
  <AppBarTab title="Test 6" to="/test6" />
  </ScrollView>
  </View>;
};

export default AppBar;
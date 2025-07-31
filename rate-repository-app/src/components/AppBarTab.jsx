import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable style={styles.tab}>
      <Text color="primary" fontWeight="bold" fontSize="heading">
        {title}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;

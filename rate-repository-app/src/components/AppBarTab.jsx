import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
});

const AppBarTab = ({ title, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text color="primary" fontWeight="bold" fontSize="heading">
          {title}
        </Text>
      </Pressable>
    );
  }
 return (
    <Link to={to} style={styles.tab}>
      <Text color="primary" fontWeight="bold" fontSize="heading">
        {title}
      </Text>
    </Link>
  );
};

export default AppBarTab;

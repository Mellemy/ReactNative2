import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
      paddingVertical: 5,
    marginBottom: 15,
  },
   bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Picture: {
    width: 55,
    height: 55,
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  Language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingHorizontal: 6,
     paddingVertical: 5,
    marginTop: 8,
  },
  numbers: {
    alignItems: 'center',
  },
});

const thousands = (count) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.Picture} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.Language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.numbers}>
          <Text fontWeight="bold">{thousands(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.numbers}>
          <Text fontWeight="bold">{thousands(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.numbers}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.numbers}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

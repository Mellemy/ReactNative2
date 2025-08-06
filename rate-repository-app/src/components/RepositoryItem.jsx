import { View, Image, StyleSheet, Pressable, Button, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { thousands } from '../utils/format';

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

const RepositoryItem = ({ item, showGithubButton = false, onPress }) => {
  return (
    <Pressable onPress={onPress}>
    <View style={styles.container} testID="repositoryItem">
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
        {showGithubButton && (
         <Button
          title="Open in GitHub"
            onPress={() => Linking.openURL(item.url)}
          />
        )}
      </View>
    </View>
    </Pressable>
  );
};

export default RepositoryItem;

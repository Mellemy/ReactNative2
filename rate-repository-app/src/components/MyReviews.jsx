import React from 'react';
import { FlatList, View, StyleSheet} from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';
import { format } from 'date-fns';
import Text from './Text';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 10,
    backgroundColor: '#eee',
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  rateSymbol: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#50133aff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  date: {
    color: '#45484bff',
    marginBottom: 5,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
      const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rateSymbol}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewDetails}>
        <Text fontWeight="bold">
          {review.repository.fullName}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { user, loading } = useCurrentUser(true);

  if (loading) return <Text>Loading...</Text>;

  const reviews = user?.reviews?.edges?.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.container}
    />
  );
};

export default MyReviews;

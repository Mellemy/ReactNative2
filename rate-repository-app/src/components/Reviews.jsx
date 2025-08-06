import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  rateSymbol: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor:  '#50133aff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
  },
  date: {
    color: '#45484bff',
    marginBottom: 5,
  },
});

const Reviews = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.rateSymbol}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold" style={styles.username}>
          {review.user.username}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default Reviews;
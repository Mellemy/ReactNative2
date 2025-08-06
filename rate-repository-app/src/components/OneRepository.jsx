import { useParams } from 'react-router-native';
import { useQuery, gql } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './Reviews';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const OneRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  
 const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);
  return (
    <FlatList
      data={data.repository.reviews.edges.map(edge => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton />
      )}
    />
  );
};


export default OneRepository;

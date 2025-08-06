import { useParams } from 'react-router-native';
import { useQuery, gql } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { View, ActivityIndicator } from 'react-native';

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

  return (
    <View>
      <RepositoryItem item={data.repository} showGithubButton />
    </View>
  );
};

export default OneRepository;

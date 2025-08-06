import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER = gql`
  query GetCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return {
    user: data?.me,
    loading,
    error,
  };
};

export default useCurrentUser;
